import { ToolPageStyles } from '../shared/ToolPage.styles';
import { colors } from '../../constants/styles';

export const RemoveBgStyles = {
  container: ToolPageStyles.page,
  ...ToolPageStyles,
  uploadArea: ToolPageStyles.uploadZone,
  uploadText: ToolPageStyles.uploadText,
  sliderContainer: {
    ...ToolPageStyles.sliderWrap,
    position: 'relative',
    userSelect: 'none',
  },
  sliderImage: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  sliderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    overflow: 'hidden',
  },
  sliderHandle: {
    position: 'absolute',
    top: 0,
    width: '4px',
    height: '100%',
    backgroundColor: colors.ORANGE_LIGHT,
    cursor: 'ew-resize',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderKnob: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: colors.ORANGE_LIGHT,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  sliderLabel: {
    position: 'absolute',
    bottom: 12,
    px: 1.5,
    py: 0.5,
    borderRadius: '8px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: colors.TEXT_WHITE,
    fontSize: 13,
    fontWeight: 600,
    zIndex: 5,
    pointerEvents: 'none',
  },
  buttonsContainer: ToolPageStyles.actionsRow,
  checkerboard: {
    backgroundColor: '#fff',
    backgroundImage:
      'linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)',
    backgroundSize: '16px 16px',
    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
  },
};
