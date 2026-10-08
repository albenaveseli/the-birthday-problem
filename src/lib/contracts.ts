/**
 * Contract templates for Yuval's birthday attack on digital signatures.
 *
 * Template syntax: `{a|b}` is a choice point with two interchangeable alternatives.
 * Choice points are either synonyms ("will" / "shall") or invisible whitespace
 * (one space / two spaces). With c choice points a template has 2^c variants that
 * all mean the same thing but hash differently.
 */

export type Segment = string | readonly [string, string];

export interface ContractTemplates {
  fair: string;
  fraud: string;
}

export function parseTemplate(template: string): Segment[] {
  const out: Segment[] = [];
  const re = /\{([^{}|]*)\|([^{}|]*)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(template))) {
    if (m.index > last) out.push(template.slice(last, m.index));
    out.push([m[1], m[2]] as const);
    last = re.lastIndex;
  }
  if (last < template.length) out.push(template.slice(last));
  return out;
}

export function choiceCount(segments: Segment[]): number {
  return segments.filter((s) => typeof s !== 'string').length;
}

/** Variant `index`: bit j of the index picks the alternative of choice point j. */
export function renderVariant(segments: Segment[], index: number): string {
  let s = '';
  let j = 0;
  for (const seg of segments) {
    if (typeof seg === 'string') s += seg;
    else s += seg[bit(index, j++)];
  }
  return s;
}

export interface VariantPart {
  text: string;
  /** undefined for fixed text, otherwise which alternative was used */
  choice?: 0 | 1;
  /** true when the choice point only changes whitespace */
  whitespace?: boolean;
}

/** Same as renderVariant, but keeps the structure so the UI can highlight choices. */
export function variantParts(segments: Segment[], index: number): VariantPart[] {
  let j = 0;
  return segments.map((seg) => {
    if (typeof seg === 'string') return { text: seg };
    const choice = bit(index, j++) as 0 | 1;
    return { text: seg[choice], choice, whitespace: seg[0].trim() === '' && seg[1].trim() === '' };
  });
}

function bit(index: number, j: number): number {
  return Math.floor(index / 2 ** j) % 2;
}

/* ------------------------------------------------------------------------- */
/* Templates. Keep >= 24 choice points per template so k <= 40 always works.  */
/* ------------------------------------------------------------------------- */

const WS = '{ |  }'; // one space or two spaces: invisible in most renderings

export const CONTRACTS: Record<'sq' | 'en', ContractTemplates> = {
  en: {
    fair: [
      '{This|The present} agreement is {made|entered into} between Alice ("the Client") and Mallory ("the Contractor").',
      'The Contractor {will|shall} {build|develop} a website for the Client {within|in no more than} 30 days.',
      'The Client {will|shall} pay the Contractor {a total of|the sum of} €1,000 {after|upon} {delivery|completion} of the work.',
      "{Either|Each} party may {cancel|terminate} this agreement with 14 days' {written|prior written} notice.",
      '{Any|All} {disputes|disagreements} {will|shall} be {resolved|settled} {in|before} the courts of Prishtina.',
      '{This|The} agreement {takes effect|enters into force} on the date {of signing|it is signed}.',
    ].join(WS),
    fraud: [
      '{This|The present} agreement is {made|entered into} between Alice ("the Client") and Mallory ("the Contractor").',
      'The Contractor {will|shall} {build|develop} a website for the Client {at a time of its choosing|whenever it sees fit}.',
      'The Client {will|shall} pay the Contractor {a total of|the sum of} €100,000 {before|prior to} {the start|commencement} of the work.',
      '{Only the Contractor|The Contractor alone} may {cancel|terminate} this agreement, {without|with no} notice.',
      '{Any|All} {disputes|disagreements} {will|shall} be {resolved|settled} {in|before} the courts of Prishtina.',
      '{This|The} agreement {takes effect|enters into force} on the date {of signing|it is signed}.',
    ].join(WS),
  },
  sq: {
    fair: [
      '{Kjo marrëveshje|Kjo kontratë} {lidhet|nënshkruhet} ndërmjet palëve: Alice („Klienti”) dhe Mallory („Kontraktori”).',
      'Kontraktori {do të|duhet të} {ndërtojë|zhvillojë} një {ueb-faqe|faqe interneti} për Klientin {brenda 30 ditëve|brenda një afati prej 30 ditësh}.',
      "Klienti {do t'i paguajë|duhet t'i paguajë} Kontraktorit {shumën|një shumë} prej 1.000 € pas {dorëzimit|përfundimit} të punës.",
      '{Secila|Cilado} palë mund ta {anulojë|ndërpresë} këtë {marrëveshje|kontratë} me njoftim {me shkrim|paraprak me shkrim} 14 ditë përpara.',
      '{Çdo mosmarrëveshje|Çdo kontest} {do të zgjidhet|zgjidhet} {nga gjykatat|në gjykatat} {kompetente|përkatëse} të Prishtinës.',
      '{Kjo marrëveshje|Kjo kontratë} {hyn në fuqi|fillon të zbatohet} {në ditën e nënshkrimit|nga dita e nënshkrimit}.',
    ].join(WS),
    fraud: [
      '{Kjo marrëveshje|Kjo kontratë} {lidhet|nënshkruhet} ndërmjet palëve: Alice („Klienti”) dhe Mallory („Kontraktori”).',
      'Kontraktori {do të|duhet të} {ndërtojë|zhvillojë} një {ueb-faqe|faqe interneti} për Klientin {kur ta shohë të arsyeshme|në një kohë sipas zgjedhjes së tij}.',
      "Klienti {do t'i paguajë|duhet t'i paguajë} Kontraktorit {shumën|një shumë} prej 100.000 € {para|përpara} {fillimit|nisjes} të punës.",
      '{Vetëm Kontraktori|Vetëm Kontraktori, dhe askush tjetër,} mund ta {anulojë|ndërpresë} këtë {marrëveshje|kontratë} {pa|pa asnjë} njoftim paraprak.',
      '{Çdo mosmarrëveshje|Çdo kontest} {do të zgjidhet|zgjidhet} {nga gjykatat|në gjykatat} {kompetente|përkatëse} të Prishtinës.',
      '{Kjo marrëveshje|Kjo kontratë} {hyn në fuqi|fillon të zbatohet} {në ditën e nënshkrimit|nga dita e nënshkrimit}.',
    ].join(WS),
  },
};
