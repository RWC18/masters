import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from 'react-compare-slider';
import { RemoveBgStyles } from '../RemoveBg.styles';
import { colors } from '../../../constants/styles';

interface BeforeAfterSliderProps {
  originalUrl: string;
  resultUrl: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  originalUrl,
  resultUrl,
}) => {
  const [position, setPosition] = useState(50);

  return (
    <Box sx={RemoveBgStyles.sliderContainer}>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={originalUrl}
            alt='Original'
            style={{ objectFit: 'contain' }}
          />
        }
        itemTwo={
          <Box sx={{ ...RemoveBgStyles.checkerboard, width: '100%', height: '100%', minHeight: '200px' }}>
            <ReactCompareSliderImage
              src={resultUrl}
              alt='Result'
              style={{ objectFit: 'contain' }}
            />
          </Box>
        }
        position={position}
        onPositionChange={setPosition}
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              borderColor: colors.ORANGE_LIGHT,
              backgroundColor: colors.ORANGE_LIGHT,
              color: colors.TEXT_DARK,
              width: '38px',
              height: '38px',
            }}
            linesStyle={{ color: colors.ORANGE_LIGHT }}
          />
        }
        style={{ width: '100%', height: 'auto', minHeight: '200px' }}
      />
    </Box>
  );
};

export default BeforeAfterSlider;
