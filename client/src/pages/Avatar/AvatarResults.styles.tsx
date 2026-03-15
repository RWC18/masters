import { colors } from '../../constants/styles';

export const AvatarResultsStyles = {
  container: {
    padding: { md: '12px 154px 12px 64px', xs: '8px 32px' },
  },
  mobileTitle: {
    display: { md: 'none', xs: 'flex' },
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.ORANGE_LIGHT,
    fontSize: { md: '48px', xs: '32px' },
    fontWeight: '900',
    marginBottom: '18px',
  },
  titleAccent: {
    color: colors.TEXT_WHITE,
    fontSize: { md: '48px', xs: '32px' },
    fontWeight: '900',
  },
  desktopTitle: {
    color: colors.ORANGE_LIGHT,
    fontSize: { md: '48px', xs: '0' },
    fontWeight: '900',
    marginBottom: '18px',
  },
  desktopTitleAccent: {
    color: colors.TEXT_WHITE,
    fontSize: { md: '48px', xs: '0' },
    fontWeight: '900',
  },
  inputContainer: {
    marginTop: '18px',
  },
  imagePreview: {
    background: 'center center / contain',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    aspectRatio: '1/1',
  },
  imageCard: {
    background: 'center center',
    width: '100%',
    aspectRatio: '1/1',
    overflow: 'hidden',
    backgroundSize: '100%',
    backgroundPosition: 'center center',
    transition: '.5s',
    borderRadius: '16px',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      backgroundSize: '105%',
      '& div': {
        transform: 'translate(0)',
      },
    },
  },
  actionButtons: {
    position: 'absolute',
    right: 6,
    top: 6,
    transform: 'translate(110%)',
    transition: '.5s',
  },
  actionButton: {
    transition: '.3s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(.95)',
    },
  },
  actionIconContainer: {
    backgroundColor: colors.ORANGE_LIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    borderRadius: '50px',
    boxShadow: `0px 0px 4px 0px ${colors.TEXT_DARK}`,
  },
};
