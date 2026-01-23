import { Typography } from '@mui/material';
import React from 'react';
import { LogoGenResultsStyles } from '../LogoGenResults.styles';
import { LOGO_GEN_RESULTS_CONSTANTS } from '../LogoGenResults.constants';

const ResultsHeader = () => {
  return (
    <Typography sx={LogoGenResultsStyles.title}>
      {LOGO_GEN_RESULTS_CONSTANTS.title.main}{' '}
      <Typography component={'span'} sx={LogoGenResultsStyles.titleAccent}>
        {LOGO_GEN_RESULTS_CONSTANTS.title.accent}
      </Typography>
    </Typography>
  );
};

export default ResultsHeader;

