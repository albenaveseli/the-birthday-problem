import { describe, expect, it } from 'vitest';
import { signAndVerify, truncatedDigestBytes } from './signature';

describe('signature demo', () => {
  it('truncates digests to k bits', () => {
    expect(Array.from(truncatedDigestBytes('abcdef12', 16))).toEqual([0xab, 0xcd]);
    expect(Array.from(truncatedDigestBytes('abcdef12', 12))).toEqual([0xab, 0xc0]);
  });

  it('a signature over a truncated digest verifies on a colliding document', async () => {
    // same first 24 bits, different afterwards
    const r = await signAndVerify('aabbcc11', 'aabbcc99', 24);
    expect(r.validOnFair).toBe(true);
    expect(r.validOnFraud).toBe(true);
  });

  it('and fails when the digests differ', async () => {
    const r = await signAndVerify('aabbcc11', 'aabbcd11', 24);
    expect(r.validOnFraud).toBe(false);
  });
});
