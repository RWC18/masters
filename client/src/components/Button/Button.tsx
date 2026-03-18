import { Box, Typography, useTheme } from '@mui/material';
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
}: Props) => {
  const theme = useTheme();

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
          backgroundColor: !isDisabled ? hoverColor : bgColor,
          transform: !isDisabled ? 'scale(.98)' : 'none',
        },
        cursor: !isDisabled ? 'pointer' : 'not-allowed',
        opacity: isDisabled ? 0.55 : 1,
        pointerEvents: isDisabled ? 'none' : 'auto',
        ...styles,
      }}
      onClick={() => (!isDisabled ? handleClick() : null)}
    >
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
    </Box>
  );
};

export default Button;
