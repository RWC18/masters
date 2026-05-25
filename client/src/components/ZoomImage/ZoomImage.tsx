'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ZoomInMapOutlinedIcon from '@mui/icons-material/ZoomInMapOutlined';
import { useTranslation } from 'react-i18next';
import { forceDownload } from '../../redux/Actions/mainActions';
import { ZoomImageStyles } from './ZoomImage.styles';

interface Props {
  url: string;
  handleClose: () => void;
  images?: string[];
  initialIndex?: number;
}

const ZoomImage = ({ url, handleClose, images, initialIndex = 0 }: Props) => {
  const { t } = useTranslation();
  const hasSlider = Array.isArray(images) && images.length > 1;
  const [index, setIndex] = useState(
    hasSlider && images ? Math.min(initialIndex, images.length - 1) : 0
  );
  const currentUrl = hasSlider && images ? images[index] : url;

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
        if (event.key === 'ArrowLeft') {
          setIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
        }
        if (event.key === 'ArrowRight') {
          setIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
        }
      }
    },
    [handleClose, hasSlider, images]
  );

  useEffect(() => {
    document.addEventListener('keydown', keydownFunction, false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', keydownFunction, false);
      document.body.style.overflow = prevOverflow;
    };
  }, [keydownFunction]);

  const goPrev = () =>
    hasSlider && images && setIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  const goNext = () =>
    hasSlider && images && setIndex((i) => (i >= images.length - 1 ? 0 : i + 1));

  return (
    <Box
      sx={ZoomImageStyles.backdrop}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('zoom.title')}
    >
      <Box sx={ZoomImageStyles.toolbar} onClick={(e) => e.stopPropagation()}>
        <Box sx={ZoomImageStyles.toolbarGroup}>
          <ZoomInMapOutlinedIcon sx={{ fontSize: 20, color: 'primary.light', ml: 0.5 }} />
          <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: 14, pr: 1 }}>
            {t('zoom.title')}
          </Typography>
          {hasSlider && images && (
            <Box component="span" sx={ZoomImageStyles.counter}>
              {t('zoom.counter', { current: index + 1, total: images.length })}
            </Box>
          )}
        </Box>

        <Box sx={ZoomImageStyles.toolbarGroup}>
          <IconButton
            aria-label={t('zoom.download')}
            onClick={() => forceDownload(currentUrl)}
            sx={ZoomImageStyles.iconBtnPrimary}
          >
            <CloudDownloadIcon />
          </IconButton>
          <IconButton
            aria-label={t('zoom.close')}
            onClick={handleClose}
            sx={ZoomImageStyles.iconBtn}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={ZoomImageStyles.stage} onClick={(e) => e.stopPropagation()}>
        {hasSlider && images && images.length > 1 && (
          <IconButton
            onClick={goPrev}
            aria-label={t('zoom.previous')}
            sx={ZoomImageStyles.navBtn}
          >
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        )}

        <Box sx={ZoomImageStyles.frame}>
          <Box
            component="img"
            src={currentUrl}
            alt=""
            sx={ZoomImageStyles.image}
          />
        </Box>

        {hasSlider && images && images.length > 1 && (
          <IconButton
            onClick={goNext}
            aria-label={t('zoom.next')}
            sx={ZoomImageStyles.navBtn}
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        )}
      </Box>

      {hasSlider && images && images.length > 1 && (
        <Box sx={ZoomImageStyles.thumbStrip} onClick={(e) => e.stopPropagation()}>
          {images.map((imgUrl, i) => (
            <Box
              key={`${imgUrl}-${i}`}
              sx={ZoomImageStyles.thumb(i === index)}
              onClick={() => setIndex(i)}
              role="button"
              tabIndex={0}
              aria-label={t('zoom.goTo', { n: i + 1 })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIndex(i);
              }}
            >
              <Box
                component="img"
                src={imgUrl}
                alt=""
                sx={ZoomImageStyles.thumbImg}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ZoomImage;
