import { Grid } from '@mui/material';
import React from 'react';
import ResultImageCard from './ResultImageCard';
import { LogoGenResultsStyles } from '../LogoGenResults.styles';

interface ResultsGridProps {
  results: Array<{ id: string; result_cdn_url: string }>;
  onZoom: (url: string) => void;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, onZoom }) => {
  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Grid item xs={12} sm={12} lg={8} md={8}>
        <Grid
          container
          sx={LogoGenResultsStyles.resultsGrid}
          spacing={4}
        >
          {results.map((image: any) => (
            <Grid item xs={6} sm={6} lg={4} md={4} key={image.id}>
              <ResultImageCard
                imageUrl={image.result_cdn_url}
                onZoom={onZoom}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResultsGrid;

