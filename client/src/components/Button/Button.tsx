import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import React from 'react';
import { colors } from '../../constants/styles';

interface Props {
  title: string;
  handleClick: () => void;
  textColor: string;
  bgColor: string;
  hoverColor: string;
  padding?: string;
  isDisabled: boolean;
  styles?: any
  isLoading?: boolean;
}

const Button = ({
  title,
  textColor,
  bgColor,
  handleClick,
  hoverColor,
  padding,
  isDisabled,
  styles,
  isLoading,
}: Props) => {
  const theme = useTheme();
  const disabledResolved = isDisabled || isLoading;

  // If the button uses primary background, pick a readable text color automatically.
  const isPrimaryBg =
    bgColor === colors.ORANGE_ACTIVE || String(bgColor).includes('--app-primary');
  const resolvedTextColor = isPrimaryBg
    ? theme.palette.mode === 'dark'
      ? '#020202'
      : '#ffffff'
    : textColor;

  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        borderRadius: '50px',
        padding: padding || { md: '12px 64px', xs: '8px 32px' },
        transition: '.5s',
        '&:hover': {
          backgroundColor: !disabledResolved ? hoverColor : bgColor,
          transform: !disabledResolved ? 'scale(.98)' : 'none',
        },
        cursor: !disabledResolved ? 'pointer' : 'not-allowed',
        opacity: disabledResolved ? 0.55 : 1,
        pointerEvents: disabledResolved ? 'none' : 'auto',
        ...styles,
      }}
      role='button'
      tabIndex={disabledResolved ? -1 : 0}
      aria-disabled={disabledResolved}
      onClick={() => (!disabledResolved ? handleClick() : null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !disabledResolved) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {isLoading ? (
        <CircularProgress size={22} sx={{ color: resolvedTextColor }} />
      ) : (
        <Typography
          sx={{
            color: resolvedTextColor,
            fontSize: '18px',
            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default Button;
