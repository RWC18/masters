import { colors } from "../../constants/styles";

export const PopUpStyles = {
  container: (isOpen: boolean) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    backgroundColor: '#00000070',
    zIndex: 20,
    display: isOpen ? 'block' : 'none',
  }),
  content: (isOpen: boolean) => ({
    position: 'fixed',
    top: isOpen ? '0%' : '-100%',
    overflow: 'auto',
    left: '0%',
    width: '100%',
    height: '100%',
    backgroundColor: colors.BG_PAPER,
    color: colors.TEXT_WHITE,
    zIndex: 21,
    WebkitOverflowScrolling: 'touch',
  }),
  actions: {
    position: 'absolute',
    right: { xs: '12px', md: '24px' },
    top: { xs: '12px', md: '24px' },
    zIndex: 22,
  },
  cancelIcon: {
    cursor: 'pointer',
    color: colors.ORANGE_ACTIVE,
  },
};