import { themeVars } from '../../constants/themeVars';

export const InputStyles = {
  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '50px',
      backgroundColor: themeVars.inputBg,
      padding: '0 20px',
      '& .MuiOutlinedInput-input': {
        color: themeVars.inputText,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: themeVars.border,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: themeVars.accentBorder,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: themeVars.primary,
        borderWidth: '2px',
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: themeVars.textSecondary,
      opacity: 1,
    },
  },
};
