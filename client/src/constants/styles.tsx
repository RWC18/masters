import { themeVars } from './themeVars';

/**
 * Theme-aware colors. Use these in styles so dark/light mode work.
 * --app-* are set on :root in AppShell from the current MUI theme.
 */
export const colors = {
  /** Main text – light in dark mode, navy in light mode */
  TEXT_WHITE: themeVars.textPrimary,
  /** Text on primary-filled controls */
  TEXT_DARK: themeVars.onPrimary,
  /** Secondary / muted text */
  TEXT_GRAY: themeVars.textSecondary,
  ORANGE_ACTIVE: themeVars.primary,
  ORANGE_LIGHT: themeVars.primaryLight,
  ON_PRIMARY: themeVars.onPrimary,
  GRAY_LIGHT: '#B2B1B1',
  GRAY_DARK: '#555555',
  BG_PAPER: themeVars.bgPaper,
};

export { themeVars };
