import { useI18n } from '../i18n';
import { LOG10_2, durationFromLog10, fmtInt, fmtNum, sciFromLog10 } from '../lib/format';

/** Number given by its log10. Small values are written out, large ones as m × 10^e. */
export function Big({ log10, approx = false }: { log10: number; approx?: boolean }) {
  const { lang } = useI18n();
  const prefix = approx ? '≈ ' : '';
  if (log10 < 6) return <>{prefix + fmtInt(10 ** log10, lang)}</>;
  const { mantissa, exponent } = sciFromLog10(log10);
  return (
    <span className="nowrap">
      {prefix}
      {fmtNum(mantissa, lang, 1)} × 10<sup>{exponent}</sup>
    </span>
  );
}

export function BigFromLog2({ log2, approx }: { log2: number; approx?: boolean }) {
  return <Big log10={log2 * LOG10_2} approx={approx} />;
}

/** 2^bits, with one decimal if bits is not an integer. */
export function Pow2({ bits, approx = false }: { bits: number; approx?: boolean }) {
  const { lang } = useI18n();
  const b = Number.isInteger(bits) ? String(bits) : fmtNum(bits, lang, 1);
  return (
    <span className="nowrap">
      {approx ? '≈ ' : ''}2<sup>{b}</sup>
    </span>
  );
}

/** Human-readable duration from log10(seconds). */
export function Duration({ log10Seconds }: { log10Seconds: number }) {
  const { lang, t } = useI18n();
  if (!Number.isFinite(log10Seconds)) return <>–</>;
  if (log10Seconds < -3) return <>{`< 1 ${t('unit.ms')}`}</>;
  const { log10Value, unit } = durationFromLog10(log10Seconds);
  const label = t(`unit.${unit}`);
  if (log10Value < 5) {
    const v = 10 ** log10Value;
    return <span className="nowrap">{`${fmtNum(v, lang, v < 10 ? 1 : 0)} ${label}`}</span>;
  }
  const { mantissa, exponent } = sciFromLog10(log10Value);
  return (
    <span className="nowrap">
      {fmtNum(mantissa, lang, 1)} × 10<sup>{exponent}</sup> {label}
    </span>
  );
}

export function DurationMs({ ms }: { ms: number }) {
  return <Duration log10Seconds={Math.log10(Math.max(ms, 0.0001) / 1000)} />;
}
