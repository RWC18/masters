import { colors } from '../../constants/styles';

export const T2IStyles = {
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

