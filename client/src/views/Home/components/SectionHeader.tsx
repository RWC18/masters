import { Box, Typography } from '@mui/material';
import React from 'react';
import { HomeStyles } from '../Home.styles';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  centered?: boolean;
}

const SectionHeader = ({
  eyebrow,
  title,
  description,
  id,
  centered = false,
}: SectionHeaderProps) => (
  <Box
    id={id}
    sx={{ textAlign: centered ? 'center' : 'left', mb: description ? 0 : 2 }}
  >
    <Typography sx={HomeStyles.sectionEyebrow}>{eyebrow}</Typography>
    <Typography sx={HomeStyles.sectionTitle}>{title}</Typography>
    {description && (
      <Typography
        sx={{
          ...HomeStyles.sectionDescription,
          mx: centered ? 'auto' : 0,
        }}
      >
        {description}
      </Typography>
    )}
  </Box>
);

export default SectionHeader;
