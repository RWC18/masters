import { Box } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import React from 'react';
import { colors } from '../../constants/styles';
import { forceDownload } from '../../redux/Actions/mainActions';
import { ToolPageStyles } from './ToolPage.styles';

interface ToolResultCardProps {
  imageUrl: string;
  onZoom: (url: string) => void;
  alwaysShowActions?: boolean;
}

const ToolResultCard = ({
  imageUrl,
  onZoom,
  alwaysShowActions,
}: ToolResultCardProps) => (
  <Box
    sx={{
      ...ToolPageStyles.imageCard,
      backgroundImage: `url('${imageUrl}')`,
    }}
  >
    <Box
      className="tool-result-actions"
      sx={{
        ...ToolPageStyles.imageActions,
        ...(alwaysShowActions ? ToolPageStyles.imageActionsVisible : {}),
      }}
    >
      <Box
        sx={ToolPageStyles.actionIconBtn}
        onClick={(e) => {
          e.stopPropagation();
          forceDownload(imageUrl);
        }}
        role="button"
        aria-label="Download"
      >
        <CloudDownloadIcon sx={{ fontSize: 18, color: colors.TEXT_WHITE }} />
      </Box>
      <Box
        sx={ToolPageStyles.actionIconBtn}
        onClick={(e) => {
          e.stopPropagation();
          onZoom(imageUrl);
        }}
        role="button"
        aria-label="Zoom"
      >
        <ZoomInIcon sx={{ fontSize: 18, color: colors.TEXT_WHITE }} />
      </Box>
    </Box>
  </Box>
);

export default ToolResultCard;
