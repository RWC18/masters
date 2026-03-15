import React, { useCallback, useEffect, useState } from 'react';

import { Box, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { colors } from '../../constants/styles';
import { forceDownload } from '../../redux/Actions/mainActions';

interface Props {
  url: string;
  handleClose: () => void;
  /** When provided, show prev/next slider for multiple images */
  images?: string[];
  initialIndex?: number;
}

const ZoomImage = ({ url, handleClose, images, initialIndex = 0 }: Props) => {
  const hasSlider = Array.isArray(images) && images.length > 1;
  const [index, setIndex] = useState(hasSlider ? Math.min(initialIndex, images.length - 1) : 0);
  const currentUrl = hasSlider ? images[index] : url;

  useEffect(() => {
    if (hasSlider && images) {
      setIndex(Math.min(initialIndex, images.length - 1));
    }
  }, [hasSlider, images, initialIndex]);

  const keydownFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
      if (hasSlider && images) {
        if (event.key === 'ArrowLeft') setIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
        if (event.key === 'ArrowRight') setIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
      }
    },
    [handleClose, hasSlider, images]
  );

  useEffect(() => {
    document.addEventListener('keydown', keydownFunction, false);
    return () => document.removeEventListener('keydown', keydownFunction, false);
  }, [keydownFunction]);

  const goPrev = () =>
    hasSlider && images && setIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  const goNext = () =>
    hasSlider && images && setIndex((i) => (i >= images.length - 1 ? 0 : i + 1));

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        zIndex: 24,
        justifyContent: 'center',
        backdropFilter: 'blur(15px)',
        backgroundColor: '#00000070',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: 15,
          top: 15,
        }}
      >
        <Grid container alignItems="center" spacing={1}>
          <Grid
            item
            sx={{
              transition: '.3s',
              cursor: 'pointer',
              '&:hover': { transform: 'scale(.95)' },
            }}
            onClick={() => forceDownload(currentUrl)}
          >
            <CloudDownloadIcon htmlColor={colors.TEXT_WHITE} fontSize="large" />
          </Grid>
          <Grid
            item
            sx={{
              transition: '.3s',
              cursor: 'pointer',
              '&:hover': { transform: 'scale(.95)' },
            }}
            onClick={handleClose}
          >
            <CloseIcon htmlColor={colors.TEXT_WHITE} fontSize="large" />
          </Grid>
        </Grid>
      </Box>

      {hasSlider && images && images.length > 1 && (
        <IconButton
          onClick={goPrev}
          sx={{
            position: 'absolute',
            left: { xs: 8, md: 24 },
            color: colors.TEXT_WHITE,
            backgroundColor: 'rgba(0,0,0,0.4)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
            zIndex: 1,
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
      )}

      <Box width={{ md: '40%', xs: '85%' }} sx={{ position: 'relative' }}>
        <img
          src={currentUrl}
          width="100%"
          style={{ borderRadius: '16px' }}
          alt=""
        />
      </Box>

      {hasSlider && images && images.length > 1 && (
        <IconButton
          onClick={goNext}
          sx={{
            position: 'absolute',
            right: { xs: 8, md: 24 },
            color: colors.TEXT_WHITE,
            backgroundColor: 'rgba(0,0,0,0.4)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
            zIndex: 1,
          }}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>
      )}

      {hasSlider && images && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            color: colors.TEXT_WHITE,
            fontSize: '14px',
          }}
        >
          {index + 1} / {images.length}
        </Box>
      )}
    </Box>
  );
};

export default ZoomImage;
