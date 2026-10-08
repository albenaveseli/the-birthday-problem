import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { T } from './components/Text';
import { useI18n } from './i18n';
import { S1Paradox } from './sections/S1Paradox';
import { S2General } from './sections/S2General';
import { S3HashLab } from './sections/S3HashLab';
import { S4RealWorld } from './sections/S4RealWorld';
import { S5Yuval } from './sections/S5Yuval';

export default function App() {
  const { t } = useI18n();
  return (
    <>
      <Header />
      <main id="top">
        <div className="hero">
          <div className="container">
            <h1>{t('app.title')}</h1>
            <p className="subtitle">{t('app.subtitle')}</p>
            <p className="lead">
              <T k="app.lead" />
            </p>
            <a className="btn" href="#paradox" style={{ display: 'inline-block', textDecoration: 'none' }}>
              {t('app.start')}
            </a>
          </div>
        </div>
        <S1Paradox />
        <S2General />
        <S3HashLab />
        <S4RealWorld />
        <S5Yuval />
      </main>
      <Footer />
    </>
  );
}
