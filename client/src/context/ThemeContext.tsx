import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LOCALSTORAGE_KEYS } from '../constants/constants';

export type ThemeMode = 'dark' | 'light';

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const stored = (): ThemeMode => {
  try {
    const v = localStorage.getItem(LOCALSTORAGE_KEYS.THEME_MODE);
    if (v === 'light' || v === 'dark') return v;
  } catch {}
  return 'dark';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(stored);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      localStorage.setItem(LOCALSTORAGE_KEYS.THEME_MODE, next);
    } catch {}
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(LOCALSTORAGE_KEYS.THEME_MODE, next);
      } catch {}
      return next;
    });
  }, []);

  const value = useMemo(() => ({ mode, setMode, toggleMode }), [mode, setMode, toggleMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeMode = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeProvider');
  return ctx;
};
