import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../../constants/styles';
import { CheckCircle } from '@mui/icons-material';

interface Props {
  color: {
    thumbnail: string;
    title: string;
  };
  onSelect: () => void;
  isActive: boolean;
}

const OneColor = ({ color, onSelect, isActive }: Props) => {
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
          '& .title': {
            color: colors.ORANGE_LIGHT,
          },
        },
      }}
    >
      <Grid
        item
        sx={{
          width: '110px',
          height: '80px',
          transition: '.2s',
          borderRadius: '12px',
          border: isActive
            ? `1px solid ${colors.ORANGE_LIGHT}`
            : '0px solid transparent',
          marginBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `url(/colors/${color.thumbnail})`,
          backgroundPosition: 'center',
          position: 'relative',
          backgroundSize: '110%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '.3s',
            opacity: isActive ? '1' : '0',
            '& svg': {
              fill: colors.ORANGE_LIGHT,
            },
          }}
        >
          <CheckCircle />
        </Box>
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
          {color.title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OneColor;
