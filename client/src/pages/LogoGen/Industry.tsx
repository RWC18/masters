import React from 'react';
import { Grid, Typography } from '@mui/material';
import { colors } from '../../constants/styles';

interface Props {
  industry: {
    icon: JSX.Element;
    title: string;
    id: string;
  };
  onSelect: () => void;
  isActive: boolean;
}

const Industry = ({ industry, onSelect, isActive }: Props) => {
  return (
    <Grid
      container
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      onClick={() => onSelect()}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          '& svg': {
            fill: colors.ORANGE_LIGHT,
          },
          '& .title': {
            color: colors.ORANGE_LIGHT,
          },
        },
      }}
    >
      <Grid
        item
        sx={{
          width: '80px',
          height: '80px',
          transition: '.3s',
          borderRadius: isActive ? '12px' : '2px',
          border: isActive
            ? `2px solid ${colors.ORANGE_LIGHT}`
            : '1px solid transparent',
          marginBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& svg': {
            width: '54px',
            height: '54px',
            fill: isActive ? colors.ORANGE_LIGHT : colors.TEXT_GRAY,
            transition: '.3s',
          },
        }}
      >
        {industry.icon}
      </Grid>
      <Grid item>
        <Typography
          className='title'
          sx={{
            transition: '.3s',
            textAlign: 'center',
            color: isActive ? colors.ORANGE_LIGHT : colors.TEXT_GRAY,
          }}
        >
          {industry.title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Industry;
