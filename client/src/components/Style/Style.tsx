import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../../constants/styles';

interface Props {
  title: string;
  thumbnail: string;
  onSelect: () => void;
  isSelected: boolean;
}

const Style = ({ title, thumbnail, onSelect, isSelected }: Props) => {
  return (
    <Grid
      container
      onClick={() => onSelect()}
      alignItems={'center'}
      flexDirection={'column'}
      spacing={1}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          '& .img': {
            transform: 'scale(.95)',
          },
        },
      }}
    >
      <Grid item>
        <Box
          className={'img'}
          sx={{
            border: `3px solid ${
              isSelected ? colors.ORANGE_LIGHT : 'transparent'
            }`,
            borderRadius: '50%',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            transition: '.5s',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src={`/styles-v2/${thumbnail}`}
            alt={title}
            sx={{
              width: { xs: 64, sm: 72 },
              height: { xs: 64, sm: 72 },
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>
      </Grid>
      <Grid item>
        <Typography
          sx={{
            color: isSelected ? colors.ORANGE_LIGHT : colors.TEXT_WHITE,
            textAlign: 'center',
            width: '100%',
            transition: '.5s',
          }}
        >
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Style;
