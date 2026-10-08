import { useI18n, type MessageKey } from '../i18n';
import { useTheme } from './theme';

const LINKS: Array<[string, MessageKey]> = [
  ['paradox', 'nav.s1'],
  ['any-n', 'nav.s2'],
  ['hash-lab', 'nav.s3'],
  ['practice', 'nav.s4'],
  ['yuval', 'nav.s5'],
];

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#top">
          {t('app.title')}
        </a>
        <nav className="nav" aria-label="Sections">
          {LINKS.map(([id, key], i) => (
            <a key={id} href={`#${id}`}>
              <span className="num">{i + 1}</span>
              {t(key)}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <div className="segmented" role="group" aria-label={t('ui.language')}>
            <button aria-pressed={lang === 'sq'} onClick={() => setLang('sq')} lang="sq">
              SQ
            </button>
            <button aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">
              EN
            </button>
          </div>
          <button className="icon-btn" onClick={toggle} aria-label={t('ui.theme')} title={t('ui.theme')}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
);
