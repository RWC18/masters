import { colors } from '../../constants/styles';

export const I2IStyles = {
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
};

