/**
 * The attacks themselves, as plain synchronous functions. They run inside a Web
 * Worker in the app (see src/workers/attack.worker.ts) and directly in unit tests.
 */
import { CounterMessages, bytesToHex, randomNonce, sha256Bytes, truncBits, utf8ToBytes } from './hash';
import { choiceCount, parseTemplate, renderVariant } from './contracts';

export interface Progress {
  attempts: number;
  elapsedMs: number;
}

export interface AttackOptions {
  onProgress?: (p: Progress) => void;
  /** Stop and return null after this many hashes. */
  maxAttempts?: number;
  /** Fixed message prefix (tests). Defaults to a random nonce so every run differs. */
  nonce?: string;
}

export interface HashedMessage {
  message: string;
  hash: string; // full SHA-256, hex
}

export interface CollisionResult {
  kind: 'collision';
  bits: number;
  attempts: number;
  elapsedMs: number;
  a: HashedMessage;
  b: HashedMessage;
}

export interface PreimageResult {
  kind: 'preimage';
  bits: number;
  attempts: number;
  elapsedMs: number;
  target: HashedMessage;
  found: HashedMessage;
}

const PROGRESS_EVERY_MS = 100;

function makeTicker(onProgress: AttackOptions['onProgress']) {
  const t0 = performance.now();
  let lastReport = t0;
  return {
    elapsed: () => performance.now() - t0,
    /** call every few thousand iterations */
    tick(attempts: number) {
      if (!onProgress) return;
      const now = performance.now();
      if (now - lastReport >= PROGRESS_EVERY_MS) {
        lastReport = now;
        onProgress({ attempts, elapsedMs: now - t0 });
      }
    },
  };
}

function hashed(message: string): HashedMessage {
  return { message, hash: bytesToHex(sha256Bytes(utf8ToBytes(message))) };
}

/**
 * Birthday attack: hash messages m_0, m_1, ... and remember every truncated hash.
 * Stops at the first time two DIFFERENT messages share the same k-bit hash.
 * Expected work ≈ 1.25 · 2^(k/2).
 */
export function collisionAttack(bits: number, opts: AttackOptions = {}): CollisionResult | null {
  const msgs = new CounterMessages(`msg-${opts.nonce ?? randomNonce()}-`);
  const seen = new Map<number, number>();
  const ticker = makeTicker(opts.onProgress);
  const max = opts.maxAttempts ?? Infinity;

  for (let i = 0; i < max; i++) {
    const h = truncBits(sha256Bytes(msgs.bytes(i)), bits);
    const j = seen.get(h);
    if (j !== undefined) {
      return {
        kind: 'collision',
        bits,
        attempts: i + 1,
        elapsedMs: ticker.elapsed(),
        a: hashed(msgs.text(j)),
        b: hashed(msgs.text(i)),
      };
    }
    seen.set(h, i);
    if ((i & 4095) === 0) ticker.tick(i + 1);
  }
  return null;
}

/**
 * (Second-)preimage attack: given ONE target hash, try messages until one matches it.
 * Expected work ≈ 2^k.
 */
export function preimageAttack(bits: number, opts: AttackOptions & { target?: string } = {}): PreimageResult | null {
  const nonce = opts.nonce ?? randomNonce();
  const target = hashed(opts.target ?? `target-${nonce}`);
  const targetBits = truncBits(hexToBytes(target.hash.slice(0, 12)), bits);
  const msgs = new CounterMessages(`try-${nonce}-`);
  const ticker = makeTicker(opts.onProgress);
  const max = opts.maxAttempts ?? Infinity;

  for (let i = 0; i < max; i++) {
    if (truncBits(sha256Bytes(msgs.bytes(i)), bits) === targetBits) {
      return {
        kind: 'preimage',
        bits,
        attempts: i + 1,
        elapsedMs: ticker.elapsed(),
        target,
        found: hashed(msgs.text(i)),
      };
    }
    if ((i & 4095) === 0) ticker.tick(i + 1);
  }
  return null;
}

/* ----------------------------- Scaling experiment ----------------------------- */

export interface ExperimentPoint {
  kind: 'collision' | 'preimage';
  bits: number;
  trials: number;
  meanAttempts: number;
}

export interface ExperimentPlan {
  collisionBits: number[];
  preimageBits: number[];
  trials: number;
}

export const DEFAULT_EXPERIMENT: ExperimentPlan = {
  collisionBits: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
  preimageBits: [4, 6, 8, 10, 12, 14, 16],
  trials: 10,
};

/** Runs both attacks for many k and reports the mean work for each k as it finishes. */
export function runExperiment(plan: ExperimentPlan, onPoint: (p: ExperimentPoint) => void): ExperimentPoint[] {
  const points: ExperimentPoint[] = [];
  const jobs: Array<['collision' | 'preimage', number]> = [];
  // interleave so the chart fills in left-to-right for both series
  const maxLen = Math.max(plan.collisionBits.length, plan.preimageBits.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < plan.collisionBits.length) jobs.push(['collision', plan.collisionBits[i]]);
    if (i < plan.preimageBits.length) jobs.push(['preimage', plan.preimageBits[i]]);
  }
  for (const [kind, bits] of jobs) {
    let total = 0;
    for (let t = 0; t < plan.trials; t++) {
      const r = kind === 'collision' ? collisionAttack(bits) : preimageAttack(bits);
      total += r!.attempts;
    }
    const p = { kind, bits, trials: plan.trials, meanAttempts: total / plan.trials };
    points.push(p);
    onPoint(p);
  }
  return points;
}

/* ------------------------------- Yuval's attack ------------------------------- */

export interface YuvalResult {
  kind: 'yuval';
  bits: number;
  fairIndex: number;
  fraudIndex: number;
  fairHash: string;
  fraudHash: string;
  fairVariantsTried: number;
  fraudVariantsTried: number;
  elapsedMs: number;
}

export interface YuvalProgress extends Progress {
  phase: 'fair' | 'fraud';
}

/**
 * Yuval (1979): to make someone sign a fraudulent contract,
 *  1. generate 2^(k/2) harmless variants of the FAIR contract and store their hashes;
 *  2. generate variants of the FRAUDULENT contract until one hash matches a stored one.
 * Expected total work ≈ 2 · 2^(k/2) instead of 2^k.
 */
export function yuvalAttack(
  bits: number,
  fairTemplate: string,
  fraudTemplate: string,
  onProgress?: (p: YuvalProgress) => void,
): YuvalResult | null {
  const fair = parseTemplate(fairTemplate);
  const fraud = parseTemplate(fraudTemplate);
  const fairCount = Math.min(2 ** Math.ceil(bits / 2), 2 ** choiceCount(fair));
  const fraudMax = 2 ** choiceCount(fraud);

  let phase: 'fair' | 'fraud' = 'fair';
  const ticker = makeTicker(onProgress && ((p) => onProgress({ ...p, phase })));
  const table = new Map<number, number>();

  for (let i = 0; i < fairCount; i++) {
    const h = truncBits(sha256Bytes(utf8ToBytes(renderVariant(fair, i))), bits);
    if (!table.has(h)) table.set(h, i);
    if ((i & 1023) === 0) ticker.tick(i + 1);
  }

  phase = 'fraud';
  for (let j = 0; j < fraudMax; j++) {
    const text = renderVariant(fraud, j);
    const h = truncBits(sha256Bytes(utf8ToBytes(text)), bits);
    const i = table.get(h);
    if (i !== undefined) {
      return {
        kind: 'yuval',
        bits,
        fairIndex: i,
        fraudIndex: j,
        fairHash: hashed(renderVariant(fair, i)).hash,
        fraudHash: hashed(text).hash,
        fairVariantsTried: fairCount,
        fraudVariantsTried: j + 1,
        elapsedMs: ticker.elapsed(),
      };
    }
    if ((j & 1023) === 0) ticker.tick(fairCount + j + 1);
  }
  return null;
}

function hexToBytes(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}
