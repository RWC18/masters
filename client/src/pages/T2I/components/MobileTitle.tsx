import { Box, Typography } from '@mui/material';
import React from 'react';
import { T2IResultsStyles } from '../T2IResults.styles';
import { T2I_RESULTS_CONSTANTS } from '../T2IResults.constants';

const MobileTitle = () => {
  return (
    <Box sx={T2IResultsStyles.mobileTitle}>
      <Typography sx={T2IResultsStyles.title}>
        {T2I_RESULTS_CONSTANTS.title.main}
        <Typography component={'span'} sx={T2IResultsStyles.titleAccent}>
          {' '}
          {T2I_RESULTS_CONSTANTS.title.accent}{' '}
        </Typography>
        {T2I_RESULTS_CONSTANTS.title.end}
      </Typography>
    </Box>
  );
};

export default MobileTitle;

