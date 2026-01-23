import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { LoadingStyles } from './Loading.styles';

const Loading = () => {
  return (
    <Box sx={LoadingStyles.container}>
      <CircularProgress color='info' size={'52px'} />
    </Box>
  );
};

export default Loading;
