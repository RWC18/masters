import { colors } from '../../constants/styles';

export const AvatarStyles = {
  container: {
    padding: { md: '12px 64px', xs: '8px 32px' },
  },
  title: {
    color: colors.ORANGE_LIGHT,
    textAlign: 'center',
    fontSize: { md: '48px', xs: '32px' },
    fontWeight: '900',
  },
  titleAccent: {
    color: colors.TEXT_WHITE,
    textAlign: 'center',
    fontSize: { md: '48px', xs: '32px' },
    fontWeight: '900',
  },
  description: {
    color: colors.TEXT_GRAY,
    textAlign: 'center',
    fontSize: { md: '18px', xs: '16px' },
    fontWeight: '300',
  },
  inputContainer: {
    marginTop: { md: '24px', xs: '18px' },
  },
  inputGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadButton: {
    border: `1px solid ${colors.TEXT_GRAY}`,
    width: { md: '80%', xs: '100%' },
    aspectRatio: '1/1',
    borderRadius: '12px',
    transition: '.5s',
    cursor: 'pointer',
    '&:hover': {
      border: `1px solid ${colors.ORANGE_LIGHT}`,
      '& svg': {
        fill: colors.ORANGE_LIGHT,
      },
    },
  },
  imagePreview: {
    background: 'center center / contain',
    backgroundRepeat: 'no-repeat',
    width: { md: '80%', xs: '100%' },
    cursor: 'pointer',
    aspectRatio: '1/1',
  },
  stylesContainer: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: '42px',
  },
  stylesGrid: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'top',
    width: { md: '60%', xs: '100%' },
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '4px',
    marginBottom: '8px',
    marginTop: '32px',
  },
  tab: {
    padding: '8px 28px',
    borderRadius: '8px',
    cursor: 'pointer',
    color: colors.TEXT_GRAY,
    fontSize: '14px',
    fontWeight: '500',
    transition: '.25s',
    userSelect: 'none',
    '&:hover': {
      color: colors.TEXT_WHITE,
    },
  },
  tabActive: {
    padding: '8px 28px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: colors.ORANGE_ACTIVE,
    color: colors.TEXT_DARK,
    fontSize: '14px',
    fontWeight: '700',
    transition: '.25s',
    userSelect: 'none',
  },
  emojiCircle: {
    width: { md: '80px', xs: '64px' },
    height: { md: '80px', xs: '64px' },
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    fontSize: { md: '36px', xs: '28px' },
    transition: '.5s',
  },
};
