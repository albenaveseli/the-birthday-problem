import type { Messages } from './en';

/** Albanian strings (default language). Must define every key in en.ts. */
export const sq: Messages = {
  'app.title': 'Problemi i ditëlindjes',
  'app.subtitle': 'dhe pse ai përcakton sa i gjatë duhet të jetë një hash kriptografik',
  'app.lead':
    'Në një dhomë me vetëm 23 njerëz, gjasat që dy prej tyre të kenë ditëlindjen në të njëjtën ditë janë mbi 50%. E njëjta matematikë kundërintuitive është arsyeja pse një hash 256-bitësh ofron vetëm 128 bite siguri kundër përplasjeve.',
  'app.start': 'Filloni eksplorimin',

  'nav.s1': 'Paradoksi',
  'nav.s2': 'Për çdo N',
  'nav.s3': 'Laboratori',
  'nav.s4': 'Në praktikë',
  'nav.s5': 'Sulmi i Yuval-it',
  'ui.language': 'Gjuha',
  'ui.theme': 'Ndrysho temën e çelët / të errët',
  'ui.step': 'Hapi {n}',

  /* ---------------------------------- 1 ---------------------------------- */
  's1.title': 'Sa njerëz duhen që dy të kenë të njëjtën ditëlindje?',
  's1.guess.q':
    'Para se të shikoni: sa njerëz duhet të jenë në një dhomë që gjasat për një ditëlindje të përbashkët të kalojnë 50%?',
  's1.guess.placeholder': 'Supozimi juaj',
  's1.guess.reveal': 'Zbulo',
  's1.guess.answer': 'Përgjigjja është **23**.',
  's1.guess.high':
    'Ju supozuat {guess}. Shumica e njerëzve japin një numër shumë më të madh: intuita numëron *njerëzit*, ndërsa matematika numëron *çiftet*.',
  's1.guess.close': 'Bravo, {guess} është afër. Shumica supozojnë 100 ose më shumë.',
  's1.guess.low': 'Ju supozuat {guess}, pak më poshtë, por më afër se shumica.',
  's1.why':
    'Çdo person i ri duhet të shmangë **secilën** ditëlindje që është tashmë në dhomë. Me n njerëz ka n(n−1)/2 çifte, dhe secili çift ka 1/365 gjasa të përputhet. 23 njerëz formojnë tashmë **253 çifte**.\n\nMë e lehtë është të llogaritet probabiliteti që *askush* të mos përputhet dhe pastaj ta zbresim nga 1:',
  's1.f.none': 'P(askush nuk përputhet)',
  's1.f.match': 'P(përputhje)',
  's1.slider': 'Njerëz në dhomë',
  's1.tile.any': 'Dy njerëz çfarëdo kanë të njëjtën ditëlindje',
  's1.tile.yours': 'Dikush e ka *ditëlindjen tuaj*',
  's1.tile.pairs': 'Çifte në dhomë',
  's1.chart.title': 'Probabiliteti sipas numrit të njerëzve',
  's1.chart.any': 'Dy çfarëdo përputhen (përplasje)',
  's1.chart.yours': 'Dikush përputhet me ju (paraimazh)',
  's1.chart.x': 'Njerëz në dhomë',
  's1.insight':
    'Vini re hendekun mes dy kurbave. Të gjesh **çfarëdo** përputhjeje është shumë më e lehtë se të përputhesh me **një vlerë të caktuar**: 23 njerëz për të parën, 253 të tjerë për të dytën. Ky hendek është pikërisht dallimi mes një **përplasjeje** dhe një **paraimazhi** të hash-it.',
  's1.room.title': 'Provojeni: mbushni një dhomë',
  's1.room.fill': 'Mbushni dhomën me {n} njerëz',
  's1.room.empty': 'Shtypni butonin për t’i vendosur njerëzit në kalendar.',
  's1.room.found': 'Përputhje! Personi {a} dhe personi {b} kanë lindur të dy më {date}.',
  's1.room.more': '+ {count} ditë të tjera të përbashkëta',
  's1.room.none': 'Asnjë ditëlindje e përbashkët këtë herë. Provoni përsëri.',
  's1.room.one': 'Një person',
  's1.room.many': 'Ditëlindje e përbashkët',
  's1.room.sim': 'Simuloni {rooms} dhoma',
  's1.room.simResult': '{rate} e {rooms} dhomave kishin një ditëlindje të përbashkët. Teoria: {theory}.',

  /* ---------------------------------- 2 ---------------------------------- */
  's2.title': 'Nga 365 ditë në çdo N',
  's2.intro':
    'Asgjë në këtë arsyetim nuk varet nga ditëlindjet. Nëse vlerat zgjidhen në mënyrë uniforme nga N mundësi (ditë, numra identifikues, dalje të një hash-i), probabiliteti i një përsëritjeje pas n tërheqjeve është afërsisht:',
  's2.after':
    'Pra, për 50% gjasa përplasjeje mjaftojnë vetëm **n ≈ 1,18·√N** tërheqje: **rrënja katrore** e hapësirës. Për t’u përputhur me një vlerë *të caktuar* duhen rreth **0,69·N** prova.',
  's2.slider': 'Madhësia e daljes',
  's2.bitsValue': '{bits} bite',
  's2.tile.N': 'Vlera të mundshme N',
  's2.tile.coll': 'Tërheqje për 50% përplasje',
  's2.tile.pre': 'Prova për 50% paraimazh',
  's2.tile.ratio': 'Shkurtesa e sulmuesit',
  's2.tile.ratioNote': 'herë më pak punë',
  's2.chart.title': 'Një kurbë për çdo N',
  's2.chart.desc':
    'Kur vizatohet kundrejt n/√N, probabiliteti i përplasjes ndjek të njëjtën kurbë, pavarësisht nga madhësia e hapësirës.',
  's2.chart.approx': 'Përafrimi, çdo N',
  's2.chart.exact': 'Saktë, N = 365',
  's2.table.space': 'Hapësira',
  's2.table.coll': '50% përplasje pas',
  's2.table.pre': '50% paraimazh pas',
  's2.row.days': 'Ditëlindjet (365 ditë)',
  's2.row.b32': 'Vlerë 32-bitëshe',
  's2.row.b64': 'Vlerë 64-bitëshe',
  's2.row.md5': 'MD5 (128 bite)',
  's2.row.sha1': 'SHA-1 (160 bite)',
  's2.row.sha256': 'SHA-256 (256 bite)',

  /* ---------------------------------- 3 ---------------------------------- */
  's3.title': 'Laboratori i përplasjeve të hash-it',
  's3.intro':
    'Një funksion hash kriptografik e shndërron çdo hyrje në një “gjurmë” me madhësi fikse. SHA-256 i plotë ka 256 bite dalje, shumë më tepër se ç’mund të sulmohet. Prandaj e **shkurtojmë** SHA-256 në k bitet e para. Kështu fitojmë një hash lodër me N = 2^{k} dalje, që sillet si funksioni i vërtetë, vetëm më i vogël. Çdo hash më poshtë llogaritet drejtpërdrejt në shfletuesin tuaj.',
  's3.def.collision':
    '**Përplasje (collision):** gjeni *çfarëdo* dy mesazhe të ndryshme me të njëjtin hash. Puna e pritur ≈ 2^{k/2}.',
  's3.def.preimage':
    '**Paraimazh i dytë (second preimage):** për *një* mesazh të dhënë, gjeni një mesazh tjetër me të njëjtin hash. Puna e pritur ≈ 2^{k}.',
  's3.bits': 'Madhësia e hash-it k',
  's3.run.collision': 'Nis sulmin e ditëlindjes',
  's3.run.preimage': 'Nis sulmin e paraimazhit',
  's3.run.race': 'Garë mes të dyjave',
  's3.stop': 'Ndalo',
  's3.panel.collision': 'Sulmi i ditëlindjes (përplasje)',
  's3.panel.preimage': 'Sulmi i paraimazhit',
  's3.attempts': 'Hash-e të llogaritur',
  's3.expected': 'E pritur (mesatarisht)',
  's3.rate': 'Shpejtësia',
  's3.rateValue': '{rate} hash/s',
  's3.eta': 'Koha e pritur me këtë shpejtësi',
  's3.status.idle': 'Nuk ka filluar',
  's3.status.running': 'Në ekzekutim…',
  's3.status.stopped': 'U ndal',
  's3.status.done': 'U gjet pas {attempts} hash-eve, për {time}',
  's3.msgA': 'Mesazhi A',
  's3.msgB': 'Mesazhi B',
  's3.target': 'Mesazhi i synuar',
  's3.match': 'Mesazhi që përputhet',
  's3.highlight':
    'E theksuar: {k} bitet e para, e vetmja pjesë që shikon hash-i ynë lodër. Vlerat e plota SHA-256 mbeten të ndryshme.',
  's3.exp.title': 'Si rritet puna?',
  's3.exp.desc':
    'Ekzekutojmë secilin sulm {trials} herë për shumë vlera të k dhe vizatojmë punën mesatare në shkallë logaritmike. Vija e përplasjes ngjitet 1 shkallë për çdo 2 bite; vija e paraimazhit ngjitet 1 shkallë për çdo bit. Ai faktor 2 në eksponent është e gjithë historia.',
  's3.exp.run': 'Nis eksperimentin',
  's3.exp.running': 'Duke matur k = {bits}…',
  's3.exp.collision': 'Përplasja, e matur',
  's3.exp.preimage': 'Paraimazhi, i matur',
  's3.exp.theoryC': 'Teoria: k/2',
  's3.exp.theoryP': 'Teoria: k',
  's3.exp.x': 'Madhësia e hash-it k (bite)',
  's3.exp.y': 'log₂(hash-e të llogaritur)',
  's3.exp.note':
    'Paraimazhi matet vetëm deri në k = 16. Përtej kësaj zgjat shumë në shfletues, dhe pikërisht kjo është poenta.',

  /* ---------------------------------- 4 ---------------------------------- */
  's4.title': 'Pse ka rëndësi në praktikë',
  's4.rule':
    '**Rregull praktik:** një hash n-bitësh ofron të shumtën n/2 bite rezistencë ndaj përplasjeve. Për 128 bite siguri kundër përplasjeve ju duhet një hash me të paktën 256 bite.',
  's4.speed': 'Shpejtësia e sulmuesit',
  's4.speed.cpu': 'Një bërthamë CPU',
  's4.speed.gpu': 'Një GPU',
  's4.speed.cluster': 'Grup GPU-sh',
  's4.speed.state': 'Fuqi hipotetike',
  's4.th.fn': 'Funksioni',
  's4.th.out': 'Dalja',
  's4.th.res': 'Rezistenca ndaj përplasjeve',
  's4.th.time': 'Koha e sulmit gjenerik',
  's4.th.known': 'Sulme të njohura',
  's4.bits': '{bits} bite',
  's4.broken': 'I thyer',
  's4.secure': 'I sigurt',
  's4.known.md5':
    'Përplasje brenda sekondash në një laptop (Wang et al., 2004). U përdor për të falsifikuar një certifikatë nënshkrimi kodi të Microsoft-it për malware-in Flame (2012).',
  's4.known.sha1':
    'SHAttered (2017): përplasja e parë publike, rreth 2^{63} llogaritje SHA-1. Përplasje me parashtesë të zgjedhur “SHA-1 is a Shambles” (2020).',
  's4.known.none': 'Asgjë më e mirë se sulmi gjenerik i ditëlindjes.',
  's4.timeNote':
    'Koha për të arritur 50% gjasa me një sulm gjenerik të ditëlindjes. Për krahasim, universi është rreth 1,4 × 10^{10} vjeç.',
  's4.cards.title': 'Ku tjetër shfaqet kufiri i ditëlindjes',
  's4.card.sig.title': 'Nënshkrimet digjitale',
  's4.card.sig':
    'Nënshkrimi nënshkruan **hash-in** e dokumentit. Një përplasje i lejon sulmuesit të zëvendësojë një dokument me një tjetër pa e prishur nënshkrimin. Shihni hapin 5.',
  's4.card.sweet32.title': 'Sweet32 (2016)',
  's4.card.sweet32':
    'Shifrat me blloqe 64-bitëshe si 3DES dhe Blowfish fillojnë të prodhojnë blloqe të përsëritura pas rreth 2^{32} blloqeve (≈ 32 GB) me të njëjtin çelës. Studiuesit e shfrytëzuan këtë për të nxjerrë cookie sekrete nga trafiku HTTPS.',
  's4.card.gcm.title': 'Nonce-t në AES-GCM',
  's4.card.gcm':
    'Me nonce të rastësishme 96-bitëshe, NIST SP 800-38D e kufizon një çelës në 2^{32} mesazhe, që gjasat për një nonce të përsëritur të mbeten të papërfillshme. Një përsëritje e vetme e thyen autentikimin e GCM-së.',
  's4.card.uuid.title': 'Identifikuesit e rastësishëm',
  's4.card.uuid':
    'Një UUID i rastësishëm (versioni 4) ka 122 bite të rastësishme. Do t’ju duheshin rreth 2,7 × 10^{18} të tillë për 50% gjasa që të ketë një dublikatë.',

  /* ---------------------------------- 5 ---------------------------------- */
  's5.title': 'Sulmi i Yuval-it: falsifikimi i një nënshkrimi',
  's5.intro':
    'Më 1979, Gideon Yuval tregoi se si paradoksi i ditëlindjes i thyen nënshkrimet digjitale. Mallory dëshiron që Alice të nënshkruajë një kontratë të ndershme, e pastaj të paraqesë një kontratë mashtruese me të njëjtin nënshkrim.',
  's5.step1':
    'Mallory shkruan shumë variante të padëmshme të kontratës **së ndershme**: “do të” ose “duhet të”, një hapësirë ose dy. Çdo variant ka të njëjtin kuptim, por secili ka hash tjetër.',
  's5.step2':
    'Bën të njëjtën gjë me kontratën **mashtruese**, derisa një variant të ketë të njëjtin hash me ndonjë variant të ndershëm.',
  's5.step3': 'Alice e lexon kontratën e ndershme dhe nënshkruan hash-in e saj.',
  's5.step4':
    'Mallory ia bashkëngjit nënshkrimin e Alice-s kontratës mashtruese. Hash-i është i njëjtë, prandaj nënshkrimi verifikohet.',
  's5.why':
    'Secila kontratë këtu ka {choices} pika zgjedhjeje, pra 2^{{choices}} variante. Mallory-t i duhen vetëm rreth 2^{k/2} nga secila, jo 2^{k}.',
  's5.run': 'Kërko një çift që përputhet',
  's5.phase.fair': 'Duke llogaritur hash-et e varianteve të ndershme…',
  's5.phase.fraud': 'Duke llogaritur hash-et e varianteve mashtruese…',
  's5.fair': 'Kontrata e ndershme (Alice nënshkruan këtë)',
  's5.fraud': 'Kontrata mashtruese (Mallory paraqet këtë)',
  's5.variant': 'Varianti #{i}',
  's5.showInvisible': 'Shfaq ndryshimet e padukshme (hapësirat e dyfishta)',
  's5.legend': 'Fjalët e theksuara janë pika zgjedhjeje; ␣ shënon një hapësirë shtesë.',
  's5.result':
    'U gjet pas {fair} varianteve të ndershme + {fraud} mashtruese, për {time}. Për t’u përputhur me një kontratë *fikse* me forcë brutale do të duheshin rreth {brute} variante.',
  's5.sigOk': 'Nënshkrimi i Alice-s verifikohet në të dy kontratat',
  's5.defense':
    '**Mbrojtja:** përdorni një hash me të paktën 256 bite dhe mos nënshkruani kurrë saktësisht atë që ka përgatitur dikush tjetër: shtoni diçka të paparashikueshme tuajën (p.sh. një vlerë të rastësishme) para nënshkrimit. Kjo ia prish Mallory-t tabelën e parallogaritur.',
  's5.placeholder': 'Shtypni butonin që Mallory të kërkojë një çift kontratash që përputhen.',

  /* -------------------------------- footer -------------------------------- */
  'footer.course': 'Siguria e Informacionit · Fakulteti i Inxhinierisë Elektrike dhe Kompjuterike (FIEK), Universiteti i Prishtinës',
  'footer.authors': 'Autorët',
  'footer.refs': 'Referenca',
  'footer.source': 'Kodi burimor',
  'footer.ai': 'Co-Authored-By: Claude Opus 5.5 (Anthropic)',

  /* --------------------------------- units -------------------------------- */
  'unit.ms': 'ms',
  'unit.s': 's',
  'unit.min': 'min',
  'unit.h': 'orë',
  'unit.d': 'ditë',
  'unit.y': 'vjet',
  'unit.instant': 'menjëherë',
};
