import { Box, Typography } from '@mui/material';
import React from 'react';
import { I2IResultsStyles } from '../I2IResults.styles';
import { I2I_RESULTS_CONSTANTS } from '../I2IResults.constants';

const MobileTitle = () => {
  return (
    <Box sx={I2IResultsStyles.mobileTitle}>
      <Typography sx={I2IResultsStyles.title}>
        {I2I_RESULTS_CONSTANTS.title.main}
        <Typography component={'span'} sx={I2IResultsStyles.titleAccent}>
          {' '}
          {I2I_RESULTS_CONSTANTS.title.accent}{' '}
        </Typography>
        {I2I_RESULTS_CONSTANTS.title.end}
      </Typography>
    </Box>
  );
};

export default MobileTitle;

