import { AUTHORS, REFERENCES, REPO_URL } from '../config';
import { useI18n } from '../i18n';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container">
        <p>{t('footer.course')}</p>
        <p>
          {t('footer.authors')}: {AUTHORS.join(', ')} ·{' '}
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            {t('footer.source')}
          </a>
        </p>
        <p className="small muted">{t('footer.ai')}</p>
        <h3 style={{ marginTop: 24 }}>{t('footer.refs')}</h3>
        <ul>
          {REFERENCES.map((r) => (
            <li key={r.label}>
              {r.url ? (
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.label}
                </a>
              ) : (
                r.label
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
