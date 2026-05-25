import { Box } from '@mui/material';
import BoltOutlined from '@mui/icons-material/BoltOutlined';
import React from 'react';
import { ToolPageStyles } from './ToolPage.styles';

interface CreditsBadgeProps {
  label: string;
}

const CreditsBadge = ({ label }: CreditsBadgeProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
    <Box sx={ToolPageStyles.creditsBadge}>
      <BoltOutlined sx={ToolPageStyles.creditsIcon} />
      {label}
    </Box>
  </Box>
);

export default CreditsBadge;
