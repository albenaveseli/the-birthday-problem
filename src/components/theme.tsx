import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'bp.theme';

/** Chart colours, mirroring the CSS tokens in styles.css (SVG attributes can't use CSS vars reliably). */
const PALETTE = {
  light: {
    collision: '#2a78d6',
    preimage: '#eb6834',
    ink: '#0b0b0b',
    ink2: '#52514e',
    muted: '#6f6d68',
    grid: '#e1e0d9',
    axis: '#c3c2b7',
    surface: '#fcfcfb',
  },
  dark: {
    collision: '#3987e5',
    preimage: '#d95926',
    ink: '#ffffff',
    ink2: '#c3c2b7',
    muted: '#9a988f',
    grid: '#2c2c2a',
    axis: '#383835',
    surface: '#1a1a19',
  },
} as const;

export type ChartColors = (typeof PALETTE)[Theme];

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
  colors: ChartColors;
}

const Ctx = createContext<ThemeCtx | null>(null);

function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function savedTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [override, setOverride] = useState<Theme | null>(savedTheme);
  const [system, setSystem] = useState<Theme>(systemTheme);

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return;
    const onChange = () => setSystem(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const theme = override ?? system;

  useEffect(() => {
    if (override) document.documentElement.dataset.theme = override;
    else delete document.documentElement.dataset.theme;
  }, [override]);

  const value = useMemo<ThemeCtx>(
    () => ({
      theme,
      colors: PALETTE[theme],
      toggle: () => {
        const next: Theme = theme === 'dark' ? 'light' : 'dark';
        setOverride(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* ignore */
        }
      },
    }),
    [theme],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
