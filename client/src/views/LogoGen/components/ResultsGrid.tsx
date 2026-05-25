import { Box } from '@mui/material';
import React from 'react';
import ResultImageCard from './ResultImageCard';
import { ToolPageStyles } from '../../shared/ToolPage.styles';

interface ResultsGridProps {
  results: Array<{ id: string; url: string } | string>;
  onZoom: (url: string) => void;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, onZoom }) => {
  const items = (results || [])
    .map((r) => (typeof r === 'string' ? { id: r, url: r } : r))
    .filter((r) => r?.url);

  return (
    <Box sx={ToolPageStyles.resultsArea}>
      <Box sx={ToolPageStyles.resultsGridWide}>
        {items.map((image) => (
          <ResultImageCard
            key={image.id || image.url}
            imageUrl={image.url}
            onZoom={onZoom}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ResultsGrid;
