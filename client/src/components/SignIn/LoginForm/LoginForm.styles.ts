import { colors, themeVars } from '../../../constants/styles';

const inputRoot = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    bgcolor: themeVars.surfaceElevated,
    color: colors.TEXT_WHITE,
    '& .MuiOutlinedInput-input': { py: 1.35 },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: themeVars.border,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: themeVars.accentBorder,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.ORANGE_ACTIVE,
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: colors.TEXT_GRAY,
    opacity: 1,
  },
};

export const LoginFormStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    width: '100%',
  },
  inputs: inputRoot,
  button: {
    width: '100%',
    mt: 0.5,
    borderRadius: '12px',
    py: 1.25,
  },
  error: (hasError: boolean) => ({
    width: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    maxHeight: hasError ? 120 : 0,
    opacity: hasError ? 1 : 0,
    transition: 'max-height 0.25s, opacity 0.25s',
    '& .MuiAlert-message': { fontSize: 13 },
  }),
};
