'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';
import { HomeStyles } from '../Home.styles';
import { useHomeConstants } from '../Home.constants';

const BannerSection = () => {
  const HOME = useHomeConstants();

  return (
    <Box component="section" sx={HomeStyles.showcase} aria-label="Highlights">
      <Box sx={HomeStyles.showcaseGrid}>
        {HOME.showcase.map((item, i) => (
          <Box key={i} sx={HomeStyles.showcaseCard}>
            <Typography sx={HomeStyles.showcaseValue}>
              {item.value}
            </Typography>
            <Typography sx={HomeStyles.showcaseLabel}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BannerSection;
