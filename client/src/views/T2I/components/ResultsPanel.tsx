import { Box, Typography } from '@mui/material';
import React from 'react';
import ToolResultCard from '../../shared/ToolResultCard';
import { ToolPageStyles } from '../../shared/ToolPage.styles';
import { useTranslation } from 'react-i18next';

interface ResultsPanelProps {
  results: Array<{ id: string; url: string } | string>;
  onZoom: (url: string) => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, onZoom }) => {
  const { t } = useTranslation();
  const items = (results || [])
    .map((r) => (typeof r === 'string' ? { id: r, url: r } : r))
    .filter((r) => r?.url);

  return (
    <Box sx={ToolPageStyles.resultsArea}>
      {items.length === 0 ? (
        <Box sx={{ ...ToolPageStyles.emptyResults, flex: 1 }}>
          <Typography>{t('t2i.emptyResults')}</Typography>
        </Box>
      ) : (
        <Box sx={ToolPageStyles.resultsGrid}>
          {items.map((image) => (
            <ToolResultCard
              key={image.id || image.url}
              imageUrl={image.url}
              onZoom={onZoom}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ResultsPanel;
