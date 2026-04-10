import { createTheme } from '@mui/material/styles';

// Requested palettes:
// - Dark: base #012641, highlight #EE005A
// - Light: base #FAF0CA, highlight #0D3B66

const DARK_BASE = '#012641';
const DARK_PAPER = '#1f4058';
const DARK_HIGHLIGHT = '#EE005A';
const DARK_HIGHLIGHT_LIGHT = '#FF8533';

const LIGHT_BASE = '#FAF0CA';
const LIGHT_PAPER = '#fbf4d7';
const LIGHT_HIGHLIGHT = '#0D3B66';
const LIGHT_HIGHLIGHT_LIGHT = '#E06820';

export const getAppTheme = (mode: 'dark' | 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? DARK_HIGHLIGHT : LIGHT_HIGHLIGHT,
        light: mode === 'dark' ? DARK_HIGHLIGHT_LIGHT : LIGHT_HIGHLIGHT_LIGHT,
      },
      ...(mode === 'dark'
        ? {
          background: {
            default: DARK_BASE,
            paper: DARK_PAPER,
          },
          text: {
            primary: '#ffffff',
            secondary: '#B7B7B7',
          },
        }
        : {
          background: {
            default: LIGHT_BASE,
            paper: LIGHT_PAPER,
          },
          text: {
            primary: '#0D3B66',
            secondary: '#555555',
          },
        }),
    },
    typography: {
      fontFamily: 'inherit',
    },
  });

