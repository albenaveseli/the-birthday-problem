/**
 * A real digital signature (ECDSA P-256 via the Web Crypto API) over a k-bit
 * truncated SHA-256 digest. It shows the point of Yuval's attack concretely:
 * the signature only covers the digest, so it verifies on ANY document with the
 * same digest.
 */

/** First k bits of a hex digest as bytes (remaining bits of the last byte zeroed). */
export function truncatedDigestBytes(hex: string, bits: number): Uint8Array {
  const nBytes = Math.ceil(bits / 8);
  const out = new Uint8Array(nBytes);
  for (let i = 0; i < nBytes; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  const extra = nBytes * 8 - bits;
  if (extra) out[nBytes - 1] &= 0xff << extra;
  return out;
}

const ALG = { name: 'ECDSA', namedCurve: 'P-256' } as const;
const SIGN = { name: 'ECDSA', hash: 'SHA-256' } as const;

export interface SignatureDemo {
  signatureHex: string;
  validOnFair: boolean;
  validOnFraud: boolean;
}

/** Alice signs the fair contract's digest; we then verify the signature on both contracts. */
export async function signAndVerify(fairHashHex: string, fraudHashHex: string, bits: number): Promise<SignatureDemo> {
  const keys = (await crypto.subtle.generateKey(ALG, false, ['sign', 'verify'])) as CryptoKeyPair;
  const fairDigest = truncatedDigestBytes(fairHashHex, bits);
  const fraudDigest = truncatedDigestBytes(fraudHashHex, bits);
  const sig = await crypto.subtle.sign(SIGN, keys.privateKey, fairDigest as BufferSource);
  const [validOnFair, validOnFraud] = await Promise.all([
    crypto.subtle.verify(SIGN, keys.publicKey, sig, fairDigest as BufferSource),
    crypto.subtle.verify(SIGN, keys.publicKey, sig, fraudDigest as BufferSource),
  ]);
  const signatureHex = Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
  return { signatureHex, validOnFair, validOnFraud };
}
