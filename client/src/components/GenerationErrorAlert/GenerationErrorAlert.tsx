'use client';

import React from 'react';
import { Alert, Box } from '@mui/material';
import { ToolPageStyles } from '../../views/shared/ToolPage.styles';

interface GenerationErrorAlertProps {
  message: string | null;
}

const GenerationErrorAlert: React.FC<GenerationErrorAlertProps> = ({
  message,
}) => {
  if (!message) return null;

  return (
    <Box sx={ToolPageStyles.alertWrap}>
      <Alert
        severity="error"
        sx={{
          borderRadius: '14px',
          bgcolor: 'rgba(198, 40, 40, 0.1)',
          color: 'error.light',
          border: '1px solid rgba(198, 40, 40, 0.28)',
          '& .MuiAlert-icon': { color: 'error.light' },
        }}
      >
        {message}
      </Alert>
    </Box>
  );
};

export default GenerationErrorAlert;
