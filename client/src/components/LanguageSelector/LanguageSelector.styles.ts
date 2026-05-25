import { colors, themeVars } from '../../constants/styles';

export const LanguageSelectorStyles = {
  root: {
    position: 'relative',
    userSelect: 'none',
  },
  trigger: (open: boolean) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.75,
    cursor: 'pointer',
    px: 1.25,
    py: 0.75,
    borderRadius: '10px',
    bgcolor: open ? themeVars.accentBg : themeVars.surface,
    border: open
      ? `1px solid ${themeVars.accentBorder}`
      : `1px solid ${themeVars.border}`,
    transition: 'all 0.2s',
    '&:hover': {
      bgcolor: themeVars.accentBg,
      borderColor: themeVars.accentBorder,
    },
  }),
  triggerFlag: {
    fontSize: 18,
    lineHeight: 1,
  },
  triggerLabel: {
    color: colors.TEXT_WHITE,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.04em',
  },
  chevron: (open: boolean) => ({
    fontSize: 18,
    color: colors.TEXT_GRAY,
    transition: 'transform 0.2s',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
  menuWrap: {
    position: 'absolute',
    top: '100%',
    right: 0,
    pt: 0.75,
    zIndex: 1100,
  },
  menu: {
    minWidth: 168,
    py: 0.75,
    borderRadius: '14px',
    bgcolor: colors.BG_PAPER,
    border: `1px solid ${themeVars.border}`,
    boxShadow: themeVars.shadow,
    overflow: 'hidden',
  },
  menuItem: (active: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1.25,
    px: 1.5,
    py: 1.1,
    mx: 0.75,
    borderRadius: '10px',
    cursor: 'pointer',
    bgcolor: active ? themeVars.accentBg : 'transparent',
    transition: 'background-color 0.2s',
    '&:hover': {
      bgcolor: active ? themeVars.accentBg : themeVars.hover,
    },
  }),
  menuFlag: {
    fontSize: 20,
    lineHeight: 1,
  },
  menuText: (active: boolean) => ({
    flex: 1,
    color: active ? colors.ORANGE_LIGHT : colors.TEXT_GRAY,
    fontSize: 14,
    fontWeight: active ? 700 : 500,
  }),
  check: {
    fontSize: 16,
    color: colors.ORANGE_ACTIVE,
    fontWeight: 700,
  },
  drawerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.75,
  },
  drawerItem: (active: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1.25,
    px: 1.5,
    py: 1.25,
    borderRadius: '12px',
    cursor: 'pointer',
    bgcolor: active ? themeVars.accentBg : themeVars.surface,
    border: active
      ? `1px solid ${themeVars.accentBorder}`
      : `1px solid ${themeVars.borderSubtle}`,
    transition: 'all 0.2s',
    '&:hover': {
      bgcolor: themeVars.accentBg,
    },
  }),
};
