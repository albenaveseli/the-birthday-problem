import { Fragment, type ReactNode } from 'react';
import { useI18n, type MessageKey, type Vars } from '../i18n';

/**
 * Renders the tiny markup used in translation strings:
 * **bold**, *italic*, `code`, ^{superscript}, _{subscript}.
 */
export function renderMarkup(text: string): ReactNode[] {
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\^\{[^}]+\}|_\{[^}]+\})/g;
  return text.split(re).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith('^{')) return <sup key={i}>{part.slice(2, -1)}</sup>;
    if (part.startsWith('_{')) return <sub key={i}>{part.slice(2, -1)}</sub>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Inline translated text. */
export function T({ k, vars }: { k: MessageKey; vars?: Vars }) {
  const { t } = useI18n();
  return <>{renderMarkup(t(k, vars))}</>;
}

/** Translated text split into paragraphs on blank lines. */
export function Prose({ k, vars, className }: { k: MessageKey; vars?: Vars; className?: string }) {
  const { t } = useI18n();
  return (
    <>
      {t(k, vars)
        .split(/\n\n+/)
        .map((p, i) => (
          <p key={i} className={className}>
            {renderMarkup(p)}
          </p>
        ))}
    </>
  );
}

/**
 * Like <T>, but placeholders listed in `nodes` are replaced by React elements
 * (e.g. a formatted duration with superscripts).
 */
export function TNodes({ k, vars, nodes }: { k: MessageKey; vars?: Vars; nodes: Record<string, ReactNode> }) {
  const { t } = useI18n();
  const parts = t(k, vars).split(/\{(\w+)\}/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Fragment key={i}>{part in nodes ? nodes[part] : `{${part}}`}</Fragment>
        ) : (
          <Fragment key={i}>{renderMarkup(part)}</Fragment>
        ),
      )}
    </>
  );
}
