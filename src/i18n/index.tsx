import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Lang } from '../lib/format';
import { en, type MessageKey } from './en';
import { sq } from './sq';

export type { Lang, MessageKey };

const DICTS = { sq, en } as const;
const STORAGE_KEY = 'bp.lang';

export type Vars = Record<string, string | number>;

interface I18n {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: MessageKey, vars?: Vars) => string;
}

const Ctx = createContext<I18n | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'sq' || saved === 'en') return saved;
  } catch {
    /* storage unavailable: fall through */
  }
  return 'sq';
}

export function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (m, name: string) => (name in vars ? String(vars[name]) : m));
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${DICTS[lang]['app.title']} · ${lang === 'sq' ? 'Siguria e Informacionit' : 'Information Security'}`;
  }, [lang]);

  const value = useMemo<I18n>(
    () => ({ lang, setLang, t: (key, vars) => interpolate(DICTS[lang][key], vars) }),
    [lang, setLang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
