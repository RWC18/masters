import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ResultImageCard from './ResultImageCard';
import { ToolPageStyles } from '../../shared/ToolPage.styles';
import { toGenerationImageItems } from '../../../lib/normalizeGenerationImages';

interface ResultsGridProps {
  results: unknown;
  onZoom: (url: string) => void;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, onZoom }) => {
  const { t } = useTranslation();
  const items = toGenerationImageItems(results);

  return (
    <Box sx={ToolPageStyles.resultsArea}>
      {items.length === 0 ? (
        <Box sx={{ ...ToolPageStyles.emptyResults, flex: 1 }}>
          <Typography>{t('logoGen.emptyResults')}</Typography>
        </Box>
      ) : (
        <Box sx={ToolPageStyles.resultsGridLogo}>
          {items.map((image) => (
            <ResultImageCard
              key={image.id}
              imageUrl={image.url}
              onZoom={onZoom}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ResultsGrid;
