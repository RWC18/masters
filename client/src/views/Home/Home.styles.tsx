import { colors } from '../../constants/styles';

export const HomeStyles = {
  container: {
    padding: { md: '24px 64px', xs: '12px 32px' },
  },
  heroTitle: {
    marginBottom: { md: '32px', xs: '12px' },
    marginTop: { md: '32px', xs: '12px' },
    color: colors.TEXT_WHITE,
    fontSize: { md: '64px', xs: '32px' },
    fontWeight: '800',
    textAlign: 'center',
  },
  heroTitleAccent: {
    color: colors.ORANGE_LIGHT,
    fontSize: { md: '64px', xs: '32px' },
    fontWeight: '800',
  },
  heroDescription: {
    color: colors.TEXT_GRAY,
    fontSize: { md: '32px', xs: '18px' },
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: { md: '32px', xs: '12px' },
  },
  banner: {
    height: '400px',
    backgroundImage: `url("/landing/banner.png")`,
    backgroundAttachment: { md: 'fixed', xs: 'default' },
    backgroundSize: { md: 'cover', xs: 'contain' },
    backgroundRepeat: { md: 'repeat', xs: 'no-repeat' },
    backgroundPosition: 'top',
  },
  sectionTitle: {
    color: colors.TEXT_WHITE,
    fontSize: { md: '48px', xs: '24px' },
    fontWeight: '800',
    textAlign: 'center',
    marginTop: { md: '54px', xs: '22px' },
    marginBottom: '24px',
  },
  sectionDescription: {
    color: colors.TEXT_GRAY,
    fontSize: { md: '24px', xs: '16px' },
    fontWeight: '300',
    textAlign: 'center',
  },
  plusCard: {
    border: `1px solid ${colors.GRAY_LIGHT}50`,
    padding: { md: '24px 32px', xs: '18px' },
    borderRadius: '16px',
    transition: '.5s',
    height: '100%',
    '&:hover': {
      border: `1px solid ${colors.ORANGE_LIGHT}`,
      transform: 'scale(1.02)',
    },
  },
  plusIconContainer: {
    backgroundColor: colors.ORANGE_ACTIVE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: { md: '52px', xs: '48px' },
    height: { md: '52px', xs: '48px' },
    borderRadius: { md: '12px', xs: '8px' },
    marginBottom: { md: '12px', xs: '8px' },
  },
  plusTitle: {
    color: colors.ORANGE_LIGHT,
    fontSize: { md: '32px', xs: '20px' },
    fontWeight: '700',
    marginBottom: '12px',
  },
  plusDescription: {
    color: colors.TEXT_GRAY,
    fontSize: { md: '24px', xs: '16px' },
    fontWeight: '300',
  },
  productsContainer: {
    marginTop: { md: '64px', xs: '32px' },
  },
  footer: {
    padding: { md: '24px 64px', xs: '12px 32px' },
    borderTop: `1px solid ${colors.ORANGE_LIGHT}`,
  },
  footerLogo: {
    width: '60px',
    cursor: 'pointer',
  },
  footerMenuItem: {
    textAlign: 'center',
    color: colors.TEXT_GRAY,
    transition: '.3s',
    fontSize: { md: '18px', xs: '12px' },
    marginTop: { md: '0px', xs: '8px' },
    marginBottom: { md: '0px', xs: '8px' },
    cursor: 'pointer',
    '&:hover': {
      color: colors.ORANGE_LIGHT,
    },
  },
  footerCopyright: {
    color: colors.TEXT_GRAY,
    fontSize: { md: '12px', xs: '8px' },
  },
};

