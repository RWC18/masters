import { Box, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../../constants/styles';
import { LegalSelectionsStyles } from './LegalSelections.styles';

interface Props {
  title: string;
  description: string;
}

const LegalSections = ({ title, description }: Props) => {
  return (
    <Box sx={LegalSelectionsStyles.container}>
      <Typography
        sx={LegalSelectionsStyles.title}
      >
        {title}
      </Typography>
      <Typography
        sx={LegalSelectionsStyles.description}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default LegalSections;
