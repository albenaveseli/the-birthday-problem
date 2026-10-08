# The Birthday Problem · Problemi i ditëlindjes

An interactive web app that explains the birthday paradox and why it matters for
cryptographic hash functions. Built for the **Information Security** course
(Siguria e Informacionit), FIEK, University of Prishtina.

Authors: Nehar Jashari, Albena Veseli.

The UI is in Albanian by default, with an English toggle.

## What's inside

| Step | Section | What the student does |
|---|---|---|
| 1 | **The paradox** | Guesses the answer, moves a slider, fills a 365-day calendar with random birthdays, simulates 10,000 rooms. The chart compares "any two match" (collision) with "someone matches *you*" (preimage). |
| 2 | **Any N** | Generalises from 365 days to N = 2^k: one universal curve, √N rule, table for MD5 / SHA-1 / SHA-256. |
| 3 | **Hash lab** | Runs a real birthday attack and a real preimage attack on SHA-256 truncated to k bits, live in the browser (Web Worker). "Race both" shows the 2^(k/2) vs 2^k gap. An experiment plots measured work against theory. |
| 4 | **In practice** | Rule of thumb (n-bit hash → n/2-bit collision security), time-to-break table with an attacker-speed selector, real cases (MD5/Flame, SHAttered, Sweet32, AES-GCM nonces, UUIDs). |
| 5 | **Yuval's attack** | Mallory generates variants of a fair and a fraudulent contract (synonyms + invisible double spaces) until two share a truncated hash; Alice's real ECDSA P-256 signature then verifies on both. |

## Quick start

Requires Node.js 20.19+ (22 recommended).

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests (Vitest)
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Project structure

```
src/
  lib/                pure logic, unit-tested (*.test.ts next to each file)
    birthday.ts       probabilities, approximations, Monte Carlo
    hash.ts           SHA-256 (@noble/hashes), truncation to k bits, fast message encoder
    attacks.ts        collision, preimage, scaling experiment, Yuval's attack
    contracts.ts      contract templates with {a|b} choice points (sq + en)
    signature.ts      ECDSA P-256 sign/verify over a truncated digest (Web Crypto)
    format.ts         number/date formatting (Albanian done by hand, see below)
  workers/            Web Worker that runs the attacks off the main thread
  hooks/              useAttackWorker: start / stop / progress for a worker run
  i18n/               sq.ts (default) and en.ts; TypeScript enforces identical keys
  components/         shared UI: sliders, tiles, legends, header, footer, theme
  sections/           one file per step (S1Paradox … S5Yuval)
  config.ts           authors, repo URL, references (footer)
```

### Notes for developers

- **Truncated SHA-256 as a toy hash.** Taking the first k bits of SHA-256 gives a
  function with N = 2^k outputs that behaves like a random oracle, so real attacks
  finish in seconds for k ≤ 40.
- **Speed.** Hashing runs at roughly 300–500k hashes/s per worker. The preimage attack
  at k = 24 takes about a minute; at k = 32 the panel shows an ETA of hours, which is the point.
- **Strings.** Translation strings support a tiny markup: `**bold**`, `*italic*`,
  `` `code` ``, `^{sup}`, `_{sub}`, plus `{placeholders}`.
- **Albanian formatting.** Chrome ships no Intl data for Albanian and silently falls
  back to English, so `src/lib/format.ts` formats numbers (`12 345,6`) and month names by hand.
- **Charts** use Recharts with colours from `src/components/theme.tsx`, which mirror the
  CSS tokens in `src/styles.css` (light + dark).

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` tests, builds and publishes on every push to `main`.
One-time setup: **Settings → Pages → Source: GitHub Actions**. The app will be at
`https://<user>.github.io/the-birthday-problem/`.

## References

- Birthday problem / birthday attack (Wikipedia)
- G. Yuval, "How to Swindle Rabin", *Cryptologia* 3(3), 1979
- M. Stevens et al., SHAttered, 2017 · G. Leurent & T. Peyrin, SHA-1 is a Shambles, 2020
- K. Bhargavan & G. Leurent, Sweet32, 2016
- NIST SP 800-38D (GCM)
