import { Box, Typography } from '@mui/material';
import React from 'react';

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
  return (
    <Box
      sx={{
        backgroundColor: !isDisabled ? bgColor : `${bgColor}70`,
        borderRadius: '50px',
        padding: padding || { md: '12px 64px', xs: '8px 32px' },
        transition: '.5s',
        '&:hover': {
          backgroundColor: !isDisabled ? hoverColor : `${bgColor}70`,
          transform: 'scale(.98)',
        },
        cursor: !isDisabled ? 'pointer' : 'not-allowed',
        ...styles,
      }}
      onClick={() => (!isDisabled ? handleClick() : null)}
    >
      <Typography
        sx={{
          color: textColor,
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
