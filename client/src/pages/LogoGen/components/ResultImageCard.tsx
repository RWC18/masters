import { Box, Grid } from '@mui/material';
import React from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { colors as styleColors } from '../../../constants/styles';
import { LogoGenResultsStyles } from '../LogoGenResults.styles';
import { forceDownload } from '../../../redux/Actions/mainActions';

interface ResultImageCardProps {
  imageUrl: string;
  onZoom: (url: string) => void;
}

const ResultImageCard: React.FC<ResultImageCardProps> = ({
  imageUrl,
  onZoom,
}) => {
  return (
    <Box
      sx={{
        ...LogoGenResultsStyles.imageCard,
        background: `url('${imageUrl}')`,
      }}
    >
      <Box sx={LogoGenResultsStyles.actionButtons}>
        <Grid container alignItems={'center'} spacing={1}>
          <Grid
            item
            sx={LogoGenResultsStyles.actionButton}
            onClick={() => forceDownload(imageUrl)}
          >
            <Box sx={LogoGenResultsStyles.actionIconContainer}>
              <CloudDownloadIcon
                htmlColor={styleColors.TEXT_DARK}
                fontSize='small'
              />
            </Box>
          </Grid>
          <Grid
            item
            sx={LogoGenResultsStyles.actionButton}
            onClick={() => onZoom(imageUrl)}
          >
            <Box sx={LogoGenResultsStyles.actionIconContainer}>
              <ZoomInIcon htmlColor={styleColors.TEXT_DARK} fontSize='small' />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResultImageCard;

