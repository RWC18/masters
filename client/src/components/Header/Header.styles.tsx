import { current } from "@reduxjs/toolkit";
import { colors } from "../../constants/styles";

export const HeaderStyles = {
  container: (scrolling: boolean) => ({
    padding: { md: '22px 64px', xs: '12px 32px' },
    width: '100%',
    position: 'fixed',
    background: scrolling ? '#00000070' : 'transparent',
    backdropFilter: 'blur(10px)',
    transition: '.5s',
    zIndex: '19',
  }),
  logo: {
    width: '60px',
    cursor: 'pointer',
  },
  menuItem: {
    cursor: 'pointer',
    color: colors.TEXT_GRAY,
    fontSize: '16px',
    fontWeight: '500',
    transition: '.5s',
    '&:hover': {
      color: colors.ORANGE_LIGHT,
      transform: 'scale(1.05)',
    },
  },
  button: {
    padding: '8px 32px',
  },
  user: {
    fontSize: '12px',
    fontWeight: '500',
    color: colors.ORANGE_ACTIVE,
    border: `1px solid ${colors.ORANGE_ACTIVE}`,
    padding: '8px 16px',
    borderRadius: '50px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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