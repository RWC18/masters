/**
 * Theme-aware colors. Use these in styles so dark/light mode work.
 * --app-* are set in App.tsx from the current theme.
 */
export const colors = {
  /** Main text – white in dark mode, dark in light mode */
  TEXT_WHITE: 'var(--app-text-primary, #fff)',
  /** Inverse text (e.g. on primary buttons) – always dark */
  TEXT_DARK: '#020202',
  /** Secondary text – gray in dark, darker gray in light */
  TEXT_GRAY: 'var(--app-text-secondary, #B7B7B7)',
  /** Primary accent – cyan in dark, teal in light */
  ORANGE_ACTIVE: 'var(--app-primary, #79EBFC)',
  ORANGE_LIGHT: 'var(--app-primary-light, #99F7F0)',
  /** Text/icon color on primary background */
  ON_PRIMARY: 'var(--app-on-primary, #000)',
  GRAY_LIGHT: '#B2B1B1',
  GRAY_DARK: '#555555',
  /** Panel/card background – dark in dark mode, white in light */
  BG_PAPER: 'var(--app-bg-paper, #0a0a0a)',
};
