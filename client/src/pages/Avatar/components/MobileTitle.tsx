import { Box, Typography } from '@mui/material';
import React from 'react';
import { AvatarResultsStyles } from '../AvatarResults.styles';
import { useAvatarResultsConstants } from '../AvatarResults.constants';

const MobileTitle = () => {
  const AVATAR_RESULTS_CONSTANTS = useAvatarResultsConstants();

  return (
    <Box sx={AvatarResultsStyles.mobileTitle}>
      <Typography sx={AvatarResultsStyles.title}>
        {AVATAR_RESULTS_CONSTANTS.title.main}
        <Typography component={'span'} sx={AvatarResultsStyles.titleAccent}>
          {' '}
          {AVATAR_RESULTS_CONSTANTS.title.accent}{' '}
        </Typography>
        {AVATAR_RESULTS_CONSTANTS.title.end}
      </Typography>
    </Box>
  );
};

export default MobileTitle;
