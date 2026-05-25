import { Box, Typography } from '@mui/material';
import React from 'react';
import ToolResultCard from '../../shared/ToolResultCard';
import { ToolPageStyles } from '../../shared/ToolPage.styles';
import { useTranslation } from 'react-i18next';

interface ResultsPanelProps {
  results: string[];
  onZoom: (url: string) => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, onZoom }) => {
  const { t } = useTranslation();
  const items = (results || []).filter(Boolean);

  return (
    <Box sx={ToolPageStyles.resultsArea}>
      {items.length === 0 ? (
        <Box sx={ToolPageStyles.emptyResults}>
          <Typography>{t('avatar.emptyResults')}</Typography>
        </Box>
      ) : (
        <Box sx={ToolPageStyles.resultsGrid}>
          {items.map((url, index) => (
            <ToolResultCard key={`${url}-${index}`} imageUrl={url} onZoom={onZoom} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ResultsPanel;
