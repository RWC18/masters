import { Box, Grid } from '@mui/material';
import React from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { colors } from '../../../constants/styles';
import { forceDownload } from '../../../redux/Actions/mainActions';
import { I2IResultsStyles } from '../I2IResults.styles';

interface ResultsPanelProps {
  results: Array<{ id: string; url: string }>;
  onZoom: (url: string) => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, onZoom }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      lg={5}
      md={5}
      width={{ md: 'auto', xs: '100%' }}
    >
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        spacing={{ md: 4, xs: 2 }}
      >
        {results &&
          results.map((image: any) => (
            <Grid item xs={6} sm={6} lg={6} md={6} key={image.id}>
              <Box
                sx={{
                  ...I2IResultsStyles.imageCard,
                  background: `url('${image.url}')`,
                }}
              >
                <Box sx={I2IResultsStyles.actionButtons}>
                  <Grid container alignItems={'center'} spacing={1}>
                    <Grid
                      item
                      sx={I2IResultsStyles.actionButton}
                      onClick={() => forceDownload(image.url)}
                    >
                      <Box sx={I2IResultsStyles.actionIconContainer}>
                        <CloudDownloadIcon
                          htmlColor={colors.TEXT_DARK}
                          fontSize='small'
                        />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      sx={I2IResultsStyles.actionButton}
                      onClick={() => onZoom(image.url)}
                    >
                      <Box sx={I2IResultsStyles.actionIconContainer}>
                        <ZoomInIcon
                          htmlColor={colors.TEXT_DARK}
                          fontSize='small'
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default ResultsPanel;

