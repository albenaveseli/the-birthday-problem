import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { CounterMessages, randomNonce, sha256Bytes, sha256Hex, splitHexAtBits, truncBits, utf8ToBytes } from './hash';

describe('sha256', () => {
  it('matches the standard test vector', () => {
    expect(sha256Hex('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  });

  it('matches Node crypto on Albanian text', () => {
    const s = 'Përshëndetje nga Prishtina! ëç';
    expect(sha256Hex(s)).toBe(createHash('sha256').update(s, 'utf8').digest('hex'));
  });
});

describe('truncBits', () => {
  const digest = Uint8Array.from([0xab, 0xcd, 0xef, 0x12, 0x34, 0x56, 0x78]);
  it('takes the leading bits', () => {
    expect(truncBits(digest, 4)).toBe(0xa);
    expect(truncBits(digest, 8)).toBe(0xab);
    expect(truncBits(digest, 12)).toBe(0xabc);
    expect(truncBits(digest, 32)).toBe(0xabcdef12);
    expect(truncBits(digest, 48)).toBe(0xabcdef123456);
    expect(truncBits(digest, 1)).toBe(1);
  });
  it('rejects out-of-range k', () => {
    expect(() => truncBits(digest, 0)).toThrow();
    expect(() => truncBits(digest, 49)).toThrow();
  });
});

describe('CounterMessages', () => {
  it('produces the same bytes as encoding the text', () => {
    const m = new CounterMessages('msg-ë-');
    for (const i of [0, 1, 9, 10, 99, 12345, 9007199254740]) {
      expect(Array.from(m.bytes(i))).toEqual(Array.from(utf8ToBytes(m.text(i))));
      expect(sha256Bytes(m.bytes(i))).toEqual(sha256Bytes(utf8ToBytes(`msg-ë-${i}`)));
    }
  });
});

describe('helpers', () => {
  it('randomNonce has the requested length and is hex', () => {
    expect(randomNonce(8)).toMatch(/^[0-9a-f]{8}$/);
    expect(randomNonce(5)).toMatch(/^[0-9a-f]{5}$/);
  });
  it('splitHexAtBits', () => {
    expect(splitHexAtBits('abcdef', 8)).toEqual(['ab', 'cdef']);
  });
});
