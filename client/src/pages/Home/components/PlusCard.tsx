import { Box, Typography } from '@mui/material';
import React from 'react';
import { HomeStyles } from '../Home.styles';

interface PlusCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const PlusCard: React.FC<PlusCardProps> = ({ title, description, icon }) => {
  return (
    <Box sx={HomeStyles.plusCard}>
      <Box sx={HomeStyles.plusIconContainer}>{icon}</Box>
      <Typography sx={HomeStyles.plusTitle}>{title}</Typography>
      <Typography sx={HomeStyles.plusDescription}>{description}</Typography>
    </Box>
  );
};

export default PlusCard;

