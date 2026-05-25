import { Box, Typography } from '@mui/material';
import React from 'react';
import { ToolPageStyles } from '../../shared/ToolPage.styles';
import { useT2IResultsConstants } from '../T2IResults.constants';

const MobileTitle = () => {
  const c = useT2IResultsConstants();

  return (
    <Box sx={ToolPageStyles.mobileTitle}>
      <Typography sx={ToolPageStyles.sidebarTitle}>
        {c.title.main}{' '}
        <Typography component="span" sx={ToolPageStyles.sidebarTitleAccent}>
          {c.title.accent}
        </Typography>{' '}
        {c.title.end}
      </Typography>
    </Box>
  );
};

export default MobileTitle;
