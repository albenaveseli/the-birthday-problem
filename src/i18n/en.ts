/**
 * English strings. This file defines the set of keys; sq.ts must provide the same keys
 * (TypeScript enforces it).
 *
 * Mini-markup supported in strings: **bold**, *italic*, `code`, ^{superscript}, _{subscript}.
 * Placeholders: {name}. A blank line starts a new paragraph (in <Prose>).
 */
export const en = {
  'app.title': 'The Birthday Problem',
  'app.subtitle': 'and why it decides how long a cryptographic hash must be',
  'app.lead':
    'In a room of just 23 people, the chance that two share a birthday is better than 50%. The same counter-intuitive math is the reason a 256-bit hash gives only 128 bits of security against collisions.',
  'app.start': 'Start exploring',

  'nav.s1': 'Paradox',
  'nav.s2': 'Any N',
  'nav.s3': 'Hash lab',
  'nav.s4': 'In practice',
  'nav.s5': "Yuval's attack",
  'ui.language': 'Language',
  'ui.theme': 'Switch light / dark theme',
  'ui.step': 'Step {n}',

  /* ---------------------------------- 1 ---------------------------------- */
  's1.title': 'How many people until two share a birthday?',
  's1.guess.q':
    'Before you look: how many people must be in a room for the chance of a shared birthday to exceed 50%?',
  's1.guess.placeholder': 'Your guess',
  's1.guess.reveal': 'Reveal',
  's1.guess.answer': 'The answer is **23**.',
  's1.guess.high':
    'You guessed {guess}. Most people guess far too high: intuition counts *people*, but the math counts *pairs*.',
  's1.guess.close': 'Well done, {guess} is close. Most people guess 100 or more.',
  's1.guess.low': 'You guessed {guess}, a bit low, but closer than most people get.',
  's1.why':
    'Each new person has to avoid **every** birthday already in the room. With n people there are n(n−1)/2 pairs, and each pair has a 1/365 chance of matching. 23 people already form **253 pairs**.\n\nIt is easier to compute the chance that *nobody* matches and subtract it from 1:',
  's1.f.none': 'P(nobody matches)',
  's1.f.match': 'P(match)',
  's1.slider': 'People in the room',
  's1.tile.any': 'Any two share a birthday',
  's1.tile.yours': 'Someone shares *your* birthday',
  's1.tile.pairs': 'Pairs in the room',
  's1.chart.title': 'Probability vs. number of people',
  's1.chart.any': 'Any two match (collision)',
  's1.chart.yours': 'Someone matches you (preimage)',
  's1.chart.x': 'People in the room',
  's1.insight':
    'Look at the gap between the two curves. Finding **any** match is much easier than matching **one specific** value: 23 people for the first, 253 others for the second. That gap is exactly the difference between a hash **collision** and a **preimage**.',
  's1.room.title': 'Try it: fill a room',
  's1.room.fill': 'Fill the room with {n} people',
  's1.room.empty': 'Press the button to place people on the calendar.',
  's1.room.found': 'Match! Person {a} and person {b} were both born on {date}.',
  's1.room.more': '+ {count} more shared days',
  's1.room.none': 'No shared birthday this time. Try again.',
  's1.room.one': 'One person',
  's1.room.many': 'Shared birthday',
  's1.room.sim': 'Simulate {rooms} rooms',
  's1.room.simResult': '{rate} of {rooms} rooms had a shared birthday. Theory: {theory}.',

  /* ---------------------------------- 2 ---------------------------------- */
  's2.title': 'From 365 days to any N',
  's2.intro':
    'Nothing in the argument depends on birthdays. If values are drawn uniformly from N possibilities (days, ID numbers, hash outputs), the chance of a repeat after n draws is approximately:',
  's2.after':
    'So a 50% chance of a collision needs only **n ≈ 1.18·√N** draws: the **square root** of the space. Matching one *specific* value instead needs about **0.69·N** tries.',
  's2.slider': 'Output size',
  's2.bitsValue': '{bits} bits',
  's2.tile.N': 'Possible values N',
  's2.tile.coll': 'Draws for 50% collision',
  's2.tile.pre': 'Tries for 50% preimage',
  's2.tile.ratio': "Attacker's shortcut",
  's2.tile.ratioNote': 'times less work',
  's2.chart.title': 'One curve for every N',
  's2.chart.desc':
    'Plotted against n/√N, the collision probability follows the same curve whatever the size of the space.',
  's2.chart.approx': 'Approximation, any N',
  's2.chart.exact': 'Exact, N = 365',
  's2.table.space': 'Space',
  's2.table.coll': '50% collision after',
  's2.table.pre': '50% preimage after',
  's2.row.days': 'Birthdays (365 days)',
  's2.row.b32': '32-bit value',
  's2.row.b64': '64-bit value',
  's2.row.md5': 'MD5 (128 bits)',
  's2.row.sha1': 'SHA-1 (160 bits)',
  's2.row.sha256': 'SHA-256 (256 bits)',

  /* ---------------------------------- 3 ---------------------------------- */
  's3.title': 'Hash collision lab',
  's3.intro':
    'A cryptographic hash maps any input to a fixed-size fingerprint. Full SHA-256 has 256 output bits, far too many to attack. So we **truncate** SHA-256 to its first k bits. That gives a toy hash with N = 2^{k} outputs that behaves like the real thing, only smaller. Every hash below is computed live in your browser.',
  's3.def.collision':
    '**Collision:** find *any* two different messages with the same hash. Expected work ≈ 2^{k/2}.',
  's3.def.preimage':
    '**Second preimage:** given *one* message, find a different one with the same hash. Expected work ≈ 2^{k}.',
  's3.bits': 'Hash size k',
  's3.run.collision': 'Run birthday attack',
  's3.run.preimage': 'Run preimage attack',
  's3.run.race': 'Race both',
  's3.stop': 'Stop',
  's3.panel.collision': 'Birthday attack (collision)',
  's3.panel.preimage': 'Preimage attack',
  's3.attempts': 'Hashes computed',
  's3.expected': 'Expected (average)',
  's3.rate': 'Speed',
  's3.rateValue': '{rate} hashes/s',
  's3.eta': 'Expected time at this speed',
  's3.status.idle': 'Not started',
  's3.status.running': 'Running…',
  's3.status.stopped': 'Stopped',
  's3.status.done': 'Found after {attempts} hashes in {time}',
  's3.msgA': 'Message A',
  's3.msgB': 'Message B',
  's3.target': 'Target message',
  's3.match': 'Matching message',
  's3.highlight':
    'Highlighted: the first {k} bits, the only part our toy hash looks at. The full SHA-256 values are still different.',
  's3.exp.title': 'How does the work grow?',
  's3.exp.desc':
    'Run each attack {trials} times for many values of k and plot the average work on a log scale. The collision line climbs 1 step for every 2 bits; the preimage line climbs 1 step for every bit. That factor of 2 in the exponent is the whole story.',
  's3.exp.run': 'Run experiment',
  's3.exp.running': 'Measuring k = {bits}…',
  's3.exp.collision': 'Collision, measured',
  's3.exp.preimage': 'Preimage, measured',
  's3.exp.theoryC': 'Theory: k/2',
  's3.exp.theoryP': 'Theory: k',
  's3.exp.x': 'Hash size k (bits)',
  's3.exp.y': 'log₂(hashes computed)',
  's3.exp.note':
    'Preimage is measured only up to k = 16. Beyond that it takes too long in a browser, which is exactly the point.',

  /* ---------------------------------- 4 ---------------------------------- */
  's4.title': 'Why it matters in practice',
  's4.rule':
    '**Rule of thumb:** an n-bit hash gives at most n/2 bits of collision resistance. To get 128-bit security against collisions you need a hash of at least 256 bits.',
  's4.speed': 'Attacker speed',
  's4.speed.cpu': 'One CPU core',
  's4.speed.gpu': 'One GPU',
  's4.speed.cluster': 'GPU cluster',
  's4.speed.state': 'Hypothetical superpower',
  's4.th.fn': 'Function',
  's4.th.out': 'Output',
  's4.th.res': 'Collision resistance',
  's4.th.time': 'Generic attack time',
  's4.th.known': 'Known attacks',
  's4.bits': '{bits} bits',
  's4.broken': 'Broken',
  's4.secure': 'Secure',
  's4.known.md5':
    'Collisions in seconds on a laptop (Wang et al., 2004). Used to forge a Microsoft code-signing certificate for the Flame malware (2012).',
  's4.known.sha1':
    'SHAttered (2017): first public collision, about 2^{63} SHA-1 computations. Chosen-prefix collision “SHA-1 is a Shambles” (2020).',
  's4.known.none': 'Nothing better than the generic birthday attack.',
  's4.timeNote':
    'Time to reach a 50% chance with a generic birthday attack. For comparison, the universe is about 1.4 × 10^{10} years old.',
  's4.cards.title': 'Where else the birthday bound shows up',
  's4.card.sig.title': 'Digital signatures',
  's4.card.sig':
    'A signature signs the **hash** of a document. A collision lets an attacker swap one document for another without invalidating the signature. See step 5.',
  's4.card.sweet32.title': 'Sweet32 (2016)',
  's4.card.sweet32':
    '64-bit block ciphers such as 3DES and Blowfish start producing repeated blocks after about 2^{32} blocks (≈ 32 GB) under one key. Researchers used this to recover secret cookies from HTTPS traffic.',
  's4.card.gcm.title': 'AES-GCM nonces',
  's4.card.gcm':
    'With random 96-bit nonces, NIST SP 800-38D limits a key to 2^{32} messages so the chance of a repeated nonce stays negligible. A single repeat breaks GCM authentication.',
  's4.card.uuid.title': 'Random IDs',
  's4.card.uuid':
    'A random UUID (version 4) has 122 random bits. You would need about 2.7 × 10^{18} of them for a 50% chance of a duplicate.',

  /* ---------------------------------- 5 ---------------------------------- */
  's5.title': "Yuval's attack: forging a signature",
  's5.intro':
    'In 1979 Gideon Yuval showed how the birthday paradox breaks digital signatures. Mallory wants Alice to sign a fair contract, then present a fraudulent one with the same signature.',
  's5.step1':
    'Mallory writes many harmless variants of the **fair** contract: “will” or “shall”, one space or two. Every variant means the same thing, but each has a different hash.',
  's5.step2':
    'He does the same with the **fraudulent** contract, until one variant has the same hash as some fair variant.',
  's5.step3': 'Alice reads the fair contract and signs its hash.',
  's5.step4': "Mallory attaches Alice's signature to the fraudulent contract. Same hash, so the signature verifies.",
  's5.why':
    'Each contract here has {choices} choice points, so 2^{{choices}} variants. Mallory only needs about 2^{k/2} of each, not 2^{k}.',
  's5.run': 'Search for a matching pair',
  's5.phase.fair': 'Hashing fair variants…',
  's5.phase.fraud': 'Hashing fraudulent variants…',
  's5.fair': 'Fair contract (Alice signs this)',
  's5.fraud': 'Fraudulent contract (Mallory presents this)',
  's5.variant': 'Variant #{i}',
  's5.showInvisible': 'Show invisible changes (double spaces)',
  's5.legend': 'Highlighted words are choice points; ␣ marks an extra space.',
  's5.result':
    'Found after {fair} fair + {fraud} fraudulent variants, in {time}. Matching one *fixed* contract by brute force would take about {brute} variants instead.',
  's5.sigOk': "Alice's signature verifies on both contracts",
  's5.defense':
    '**Defences:** use a hash of at least 256 bits, and never sign exactly what someone else prepared: add something unpredictable of your own (for example a random value) before signing. That ruins Mallory’s precomputed table.',
  's5.placeholder': 'Press the button to let Mallory search for a matching pair of contracts.',

  /* -------------------------------- footer -------------------------------- */
  'footer.course': 'Information Security · MSc Computer and Software Engineering (FIEK), University of Prishtina',
  'footer.authors': 'Authors',
  'footer.refs': 'References',
  'footer.source': 'Source code',
  'footer.ai': 'Co-Authored-By: Claude Opus 5.5 (Anthropic)',

  /* --------------------------------- units -------------------------------- */
  'unit.ms': 'ms',
  'unit.s': 's',
  'unit.min': 'min',
  'unit.h': 'hours',
  'unit.d': 'days',
  'unit.y': 'years',
  'unit.instant': 'instant',
};

export type MessageKey = keyof typeof en;
export type Messages = Record<MessageKey, string>;
