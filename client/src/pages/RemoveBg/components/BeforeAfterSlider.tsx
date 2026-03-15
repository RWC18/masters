import React, { useRef, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { RemoveBgStyles } from '../RemoveBg.styles';

interface BeforeAfterSliderProps {
  originalUrl: string;
  resultUrl: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  originalUrl,
  resultUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  return (
    <Box
      ref={containerRef}
      sx={RemoveBgStyles.sliderContainer}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* Result (background removed) - full width behind */}
      <Box sx={RemoveBgStyles.checkerboard}>
        <img
          src={resultUrl}
          alt='Result'
          style={{ display: 'block', width: '100%', height: 'auto' }}
          draggable={false}
        />
      </Box>

      {/* Original - clipped from left */}
      <Box
        sx={{
          ...RemoveBgStyles.sliderOverlay,
          width: `${sliderPos}%`,
        }}
      >
        <img
          src={originalUrl}
          alt='Original'
          style={{
            display: 'block',
            width: containerRef.current
              ? `${containerRef.current.offsetWidth}px`
              : '100%',
            height: 'auto',
            maxWidth: 'none',
          }}
          draggable={false}
        />
      </Box>

      {/* Slider handle */}
      <Box
        sx={{
          ...RemoveBgStyles.sliderHandle,
          left: `${sliderPos}%`,
          transform: 'translateX(-50%)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <Box sx={RemoveBgStyles.sliderKnob}>
          <CompareArrowsIcon fontSize='small' sx={{ color: '#020202' }} />
        </Box>
      </Box>

      {/* Labels */}
      <Typography sx={{ ...RemoveBgStyles.sliderLabel, left: '12px' }}>
        Original
      </Typography>
      <Typography sx={{ ...RemoveBgStyles.sliderLabel, right: '12px' }}>
        Removed
      </Typography>
    </Box>
  );
};

export default BeforeAfterSlider;
