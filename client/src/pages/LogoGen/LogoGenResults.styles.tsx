import { colors as styleColors } from '../../constants/styles';

export const LogoGenResultsStyles = {
  container: {
    padding: { md: '12px 154px 12px 64px', xs: '8px 32px' },
  },
  title: {
    color: styleColors.TEXT_WHITE,
    fontSize: { md: '48px', xs: '32px' },
    fontWeight: '900',
    marginBottom: '18px',
    textAlign: 'center',
  },
  titleAccent: {
    color: styleColors.ORANGE_LIGHT,
    fontSize: { md: '48px', xs: '32px' },
    fontWeight: '900',
  },
  resultsGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    border: `1px solid ${styleColors.ORANGE_LIGHT}`,
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      transform: 'scale(0.98)',
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
    backgroundColor: styleColors.ORANGE_LIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    borderRadius: '50px',
    boxShadow: `0px 0px 4px 0px ${styleColors.TEXT_DARK}`,
  },
  buttonsContainer: {
    marginTop: '24px',
  },
  buttonsGrid: {
    justifyContent: 'flex-end',
    width: '100%',
  },
};

