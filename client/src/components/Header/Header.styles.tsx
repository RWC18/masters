import { colors } from "../../constants/styles";

export const HeaderStyles = {
  container: (scrolling: boolean) => ({
    padding: { md: '22px 64px', xs: '8px 16px' },
    width: '100%',
    position: 'fixed',
    background: scrolling ? '#00000070' : 'transparent',
    backdropFilter: 'blur(10px)',
    transition: '.5s',
    zIndex: '19',
  }),
  logo: {
    width: { xs: '40px', md: '60px' },
    cursor: 'pointer',
  },
  menuItem: {
    cursor: 'pointer',
    color: colors.TEXT_GRAY,
    fontSize: { md: '16px', xs: '13px' },
    fontWeight: '500',
    transition: '.5s',
    '&:hover': {
      color: colors.ORANGE_LIGHT,
      transform: 'scale(1.05)',
    },
  },
  button: {
    padding: { md: '8px 32px', xs: '6px 16px' },
    fontSize: { xs: '13px', md: 'inherit' },
  },
  user: {
    fontSize: { md: '13px', xs: '12px' },
    fontWeight: '500',
    color: colors.ORANGE_ACTIVE,
    border: `1px solid ${colors.ORANGE_ACTIVE}`,
    padding: { md: '8px 14px', xs: '6px 8px' },
    borderRadius: '50px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: { md: '8px', xs: '4px' },
    maxWidth: { xs: '140px', sm: 'none' },
  },
  userName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: { xs: '72px', sm: 'none' },
  },
  logoutIcon: {
    cursor: 'pointer',
    currentColor: 'inherit',
    transition: '.5s',
    '&:hover': {
        transform: 'scale(.98)',
      },
  }
};