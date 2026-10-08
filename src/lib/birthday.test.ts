import { describe, expect, it } from 'vitest';
import {
  expectedCollisionAttempts,
  log2SamplesForCollision,
  log2TriesForPreimage,
  mulberry32,
  pairs,
  peopleForCollision,
  peopleForMatchYours,
  probCollisionApprox,
  probCollisionExact,
  probMatchYours,
  randomBirthdays,
  sharedBirthdays,
  simulateRooms,
} from './birthday';

describe('classic birthday problem', () => {
  it('23 people give just over 50%', () => {
    expect(probCollisionExact(22)).toBeLessThan(0.5);
    expect(probCollisionExact(23)).toBeCloseTo(0.5073, 4);
    expect(peopleForCollision(0.5)).toBe(23);
  });

  it('70 people give ~99.9%', () => {
    expect(probCollisionExact(70)).toBeCloseTo(0.99916, 4);
  });

  it('edge cases', () => {
    expect(probCollisionExact(0)).toBe(0);
    expect(probCollisionExact(1)).toBe(0);
    expect(probCollisionExact(366)).toBe(1);
  });

  it('23 people form 253 pairs', () => {
    expect(pairs(23)).toBe(253);
  });

  it('matching YOUR birthday needs ~253 other people', () => {
    expect(probMatchYours(23)).toBeCloseTo(0.0586, 3);
    expect(peopleForMatchYours(0.5)).toBe(254); // you + 253 others
    expect(probMatchYours(254)).toBeGreaterThanOrEqual(0.5);
    expect(probMatchYours(253)).toBeLessThan(0.5);
  });

  it('approximation is close to the exact value', () => {
    for (const n of [10, 23, 40, 60]) {
      expect(Math.abs(probCollisionApprox(n, 365) - probCollisionExact(n))).toBeLessThan(0.02);
    }
  });
});

describe('generalised to N = 2^bits', () => {
  it('50% collision needs ~1.1774·√N samples', () => {
    expect(2 ** (log2SamplesForCollision(64) - 32)).toBeCloseTo(1.1774, 3);
    expect(log2SamplesForCollision(256)).toBeCloseTo(128.235, 2);
  });

  it('50% preimage needs ~0.693·N tries', () => {
    expect(2 ** (log2TriesForPreimage(64) - 64)).toBeCloseTo(Math.LN2, 6);
  });

  it('mean collision work is sqrt(pi N / 2)', () => {
    expect(expectedCollisionAttempts(32)).toBeCloseTo(82137.5, 0);
  });
});

describe('simulation', () => {
  it('finds shared birthdays', () => {
    const shared = sharedBirthdays([5, 10, 5, 200, 10, 10]);
    expect(shared.get(5)).toEqual([0, 2]);
    expect(shared.get(10)).toEqual([1, 4, 5]);
    expect(shared.has(200)).toBe(false);
  });

  it('random birthdays are in range', () => {
    const days = randomBirthdays(1000, mulberry32(1));
    expect(Math.min(...days)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...days)).toBeLessThan(365);
  });

  it('Monte Carlo agrees with the formula', () => {
    const p = simulateRooms(23, 20000, mulberry32(42));
    expect(p).toBeGreaterThan(0.48);
    expect(p).toBeLessThan(0.53);
  });
});
