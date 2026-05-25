import { Box, Typography } from '@mui/material';
import React from 'react';
import { ToolPageStyles } from './ToolPage.styles';

interface ToolPageHeaderProps {
  eyebrow?: string;
  titleMain: string;
  titleAccent?: string;
  titleEnd?: string;
  description?: string;
}

const ToolPageHeader = ({
  eyebrow,
  titleMain,
  titleAccent,
  titleEnd,
  description,
}: ToolPageHeaderProps) => (
  <Box sx={ToolPageStyles.header}>
    {eyebrow && (
      <Typography sx={ToolPageStyles.eyebrow}>{eyebrow}</Typography>
    )}
    <Typography component="h1" sx={ToolPageStyles.title}>
      {titleMain}
      {titleAccent && (
        <>
          {' '}
          <Typography component="span" sx={ToolPageStyles.titleAccent}>
            {titleAccent}
          </Typography>
        </>
      )}
      {titleEnd && <> {titleEnd}</>}
    </Typography>
    {description && (
      <Typography sx={ToolPageStyles.description}>{description}</Typography>
    )}
  </Box>
);

export default ToolPageHeader;
