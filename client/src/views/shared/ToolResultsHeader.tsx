import { Box, Typography } from '@mui/material';
import React from 'react';
import { ToolPageStyles } from './ToolPage.styles';

interface ToolResultsHeaderProps {
  eyebrow?: string;
  titleMain: string;
  titleAccent?: string;
  titleEnd?: string;
}

const ToolResultsHeader = ({
  eyebrow,
  titleMain,
  titleAccent,
  titleEnd,
}: ToolResultsHeaderProps) => (
  <Box sx={ToolPageStyles.resultsPageHeader}>
    {eyebrow && (
      <Typography sx={ToolPageStyles.eyebrow}>{eyebrow}</Typography>
    )}
    <Typography component="h1" sx={ToolPageStyles.resultsPageTitle}>
      {titleMain}
      {titleAccent && (
        <>
          {' '}
          <Typography component="span" sx={ToolPageStyles.resultsPageTitleAccent}>
            {titleAccent}
          </Typography>
        </>
      )}
      {titleEnd && <> {titleEnd}</>}
    </Typography>
  </Box>
);

export default ToolResultsHeader;
