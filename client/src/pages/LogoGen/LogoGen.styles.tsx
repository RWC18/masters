import { colors as styleColors } from '../../constants/styles';

export const LogoGenStyles = {
  container: {
    padding: { md: '12px 64px', xs: '8px 32px' },
  },
  title: {
    color: styleColors.ORANGE_LIGHT,
    textAlign: 'center',
    fontSize: { md: '48px', xs: '32px' },
    fontWeight: '900',
  },
  titleAccent: {
    color: styleColors.TEXT_WHITE,
    textAlign: 'center',
    fontSize: { md: '48px', xs: '32px' },
    fontWeight: '900',
  },
  description: {
    color: styleColors.TEXT_GRAY,
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
  selectionContainer: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: '42px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  colorsGrid: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'top',
    width: '80%',
    marginTop: '32px',
    marginBottom: '32px',
  },
  generateButtonContainer: {
    display: { md: 'flex', xs: 'none' },
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '28px',
    marginBottom: '28px',
  },
};

