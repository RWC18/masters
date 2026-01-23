import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { HomeStyles } from '../Home.styles';
import { HOME_CONSTANTS } from '../Home.constants';

const HeroSection = () => {
  return (
    <Box sx={HomeStyles.container}>
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Grid item md={8} lg={8} xs={12} sm={12}>
          <Typography sx={HomeStyles.heroTitle}>
            {HOME_CONSTANTS.hero.title}{' '}
            <Typography component={'span'} sx={HomeStyles.heroTitleAccent}>
              {' '}
              <br />
              {HOME_CONSTANTS.hero.titleAccent}
            </Typography>
          </Typography>
          <Typography sx={HomeStyles.heroDescription}>
            {HOME_CONSTANTS.hero.description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;

