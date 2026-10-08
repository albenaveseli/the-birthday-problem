import { describe, expect, it } from 'vitest';
import { collisionAttack, preimageAttack, runExperiment, yuvalAttack } from './attacks';
import { CONTRACTS, choiceCount, parseTemplate, renderVariant } from './contracts';
import { sha256Hex } from './hash';

const prefixBits = (hex: string, k: number) => BigInt('0x' + hex) >> BigInt(256 - k);

describe('collision attack', () => {
  it('finds two different messages with the same truncated hash', () => {
    for (const k of [8, 16, 24]) {
      const r = collisionAttack(k)!;
      expect(r.a.message).not.toBe(r.b.message);
      expect(r.a.hash).toBe(sha256Hex(r.a.message));
      expect(r.b.hash).toBe(sha256Hex(r.b.message));
      expect(prefixBits(r.a.hash, k)).toBe(prefixBits(r.b.hash, k));
      expect(r.a.hash).not.toBe(r.b.hash);
    }
  });

  it('respects maxAttempts', () => {
    expect(collisionAttack(40, { maxAttempts: 10 })).toBeNull();
  });

  it('is reproducible with a fixed nonce', () => {
    expect(collisionAttack(16, { nonce: 'x' })).toMatchObject({ attempts: collisionAttack(16, { nonce: 'x' })!.attempts });
  });
});

describe('preimage attack', () => {
  it('finds a different message matching the target prefix', () => {
    const r = preimageAttack(12)!;
    expect(r.found.message).not.toBe(r.target.message);
    expect(prefixBits(r.found.hash, 12)).toBe(prefixBits(r.target.hash, 12));
  });
});

describe('scaling experiment', () => {
  it('collision work grows like 2^(k/2), preimage like 2^k', () => {
    const pts = runExperiment({ collisionBits: [8, 16], preimageBits: [8, 12], trials: 30 }, () => {});
    const get = (kind: string, bits: number) => pts.find((p) => p.kind === kind && p.bits === bits)!.meanAttempts;
    // +8 bits => ~16x more collision work (2^4); allow wide statistical margin
    const cRatio = get('collision', 16) / get('collision', 8);
    expect(cRatio).toBeGreaterThan(8);
    expect(cRatio).toBeLessThan(32);
    // +4 bits => ~16x more preimage work
    const pRatio = get('preimage', 12) / get('preimage', 8);
    expect(pRatio).toBeGreaterThan(6);
    expect(pRatio).toBeLessThan(40);
  });
});

describe('contracts', () => {
  it('parses choice points', () => {
    const segs = parseTemplate('A {x|y} B{ |  }C');
    expect(segs).toEqual(['A ', ['x', 'y'], ' B', [' ', '  '], 'C']);
    expect(renderVariant(segs, 0)).toBe('A x B C');
    expect(renderVariant(segs, 3)).toBe('A y B  C');
  });

  for (const lang of ['sq', 'en'] as const) {
    it(`${lang} templates have >= 24 choice points and distinct variants`, () => {
      for (const tpl of [CONTRACTS[lang].fair, CONTRACTS[lang].fraud]) {
        const segs = parseTemplate(tpl);
        expect(choiceCount(segs)).toBeGreaterThanOrEqual(24);
        expect(tpl).not.toMatch(/\{[^|}]*\}/); // no malformed choices
        const seen = new Set(Array.from({ length: 64 }, (_, i) => renderVariant(segs, i)));
        expect(seen.size).toBe(64);
      }
    });
  }
});

describe("Yuval's attack", () => {
  it('finds a fair and a fraudulent contract with the same truncated hash', () => {
    const k = 24;
    const { fair, fraud } = CONTRACTS.en;
    const r = yuvalAttack(k, fair, fraud)!;
    const fairText = renderVariant(parseTemplate(fair), r.fairIndex);
    const fraudText = renderVariant(parseTemplate(fraud), r.fraudIndex);
    expect(fairText).toContain('€1,000');
    expect(fraudText).toContain('€100,000');
    expect(r.fairHash).toBe(sha256Hex(fairText));
    expect(r.fraudHash).toBe(sha256Hex(fraudText));
    expect(prefixBits(r.fairHash, k)).toBe(prefixBits(r.fraudHash, k));
    expect(r.fairVariantsTried).toBe(2 ** 12);
  });
});
