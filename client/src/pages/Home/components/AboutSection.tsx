import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { usePluses } from '../../../constants/pluses';
import { HomeStyles } from '../Home.styles';
import { useHomeConstants } from '../Home.constants';
import PlusCard from './PlusCard';

const AboutSection = () => {
  const HOME_CONSTANTS = useHomeConstants();
  const pluses = usePluses();

  return (
    <Box sx={HomeStyles.container}>
      <Typography id='about' sx={HomeStyles.sectionTitle}>
        {HOME_CONSTANTS.about.title}
      </Typography>
      <Typography sx={HomeStyles.sectionDescription}>
        {HOME_CONSTANTS.about.description}
      </Typography>
      <Grid
        container
        justifyContent={'space-between'}
        spacing={5}
        alignItems={'stretch'}
        marginTop={{ md: '32px', xs: '12px' }}
      >
        {pluses.map(
          (
            plus: { title: string; description: string; icon: JSX.Element },
            id: number
          ) => (
            <Grid item md={4} sm={4} lg={4} xs={12} key={id}>
              <PlusCard
                title={plus.title}
                description={plus.description}
                icon={plus.icon}
              />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default AboutSection;

