/**
 * Hashing helpers. We use real SHA-256 (from @noble/hashes, synchronous and fast
 * enough to run hundreds of thousands of hashes per second in a Web Worker) and
 * TRUNCATE it to k bits. A k-bit truncated SHA-256 behaves like a random function
 * with N = 2^k outputs, so it lets us run real attacks at a scale a laptop can finish.
 */
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex, utf8ToBytes } from '@noble/hashes/utils.js';

export const MAX_TRUNC_BITS = 48; // keeps truncated values below 2^53 (exact JS integers)

export function sha256Bytes(data: Uint8Array): Uint8Array {
  return sha256(data);
}

export function sha256Hex(text: string): string {
  return bytesToHex(sha256(utf8ToBytes(text)));
}

export { bytesToHex, utf8ToBytes };

/** First k bits of a digest as an integer (1 <= k <= 48). */
export function truncBits(digest: Uint8Array, k: number): number {
  if (k < 1 || k > MAX_TRUNC_BITS) throw new RangeError(`k must be in 1..${MAX_TRUNC_BITS}`);
  const nBytes = Math.ceil(k / 8);
  let v = 0;
  for (let j = 0; j < nBytes; j++) v = v * 256 + digest[j];
  return Math.floor(v / 2 ** (nBytes * 8 - k));
}

/** Random hex string from the platform CSPRNG (browser, worker and Node all have it). */
export function randomNonce(hexChars = 8): string {
  const bytes = new Uint8Array(Math.ceil(hexChars / 2));
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes).slice(0, hexChars);
}

/**
 * Produces messages "<prefix><counter>" as bytes without allocating a string per
 * message. This roughly doubles hashing throughput in the attack loops.
 */
export class CounterMessages {
  private readonly buf: Uint8Array;
  private readonly prefixLen: number;

  constructor(readonly prefix: string) {
    const p = utf8ToBytes(prefix);
    this.prefixLen = p.length;
    this.buf = new Uint8Array(p.length + 20);
    this.buf.set(p);
  }

  /** Bytes of message i (view into an internal buffer; valid until the next call). */
  bytes(i: number): Uint8Array {
    let len = 0;
    const digits = this.buf;
    const start = this.prefixLen;
    if (i === 0) {
      digits[start] = 48;
      len = 1;
    } else {
      let x = i;
      while (x > 0) {
        digits[start + len++] = 48 + (x % 10);
        x = Math.floor(x / 10);
      }
      // reverse the digits in place
      for (let a = start, b = start + len - 1; a < b; a++, b--) {
        const t = digits[a];
        digits[a] = digits[b];
        digits[b] = t;
      }
    }
    return digits.subarray(0, start + len);
  }

  text(i: number): string {
    return this.prefix + String(i);
  }
}

/**
 * Splits a hex digest into the part covered by the first k bits and the rest,
 * for highlighting in the UI. k should be a multiple of 4.
 */
export function splitHexAtBits(hex: string, k: number): [string, string] {
  const chars = Math.floor(k / 4);
  return [hex.slice(0, chars), hex.slice(chars)];
}
