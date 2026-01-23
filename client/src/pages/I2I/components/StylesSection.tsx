import { Box, Grid } from '@mui/material';
import React from 'react';
import { genStylesV2 } from '../../../constants/genStyles';
import Style from '../../../components/Style/Style';
import { I2IStyles } from '../I2I.styles';

interface StylesSectionProps {
  selectedStyles: Array<{
    prompt: string;
    thumbnail: string;
    title: string;
  }>;
  onStyleSelect: (style: {
    prompt: string;
    thumbnail: string;
    title: string;
  }) => void;
}

const StylesSection: React.FC<StylesSectionProps> = ({
  selectedStyles,
  onStyleSelect,
}) => {
  return (
    <Box sx={I2IStyles.stylesContainer}>
      <Grid container sx={I2IStyles.stylesGrid} spacing={{ md: 6, xs: 1 }}>
        {genStylesV2.map(
          (style: { prompt: string; title: string; thumbnail: string }) => (
            <Grid item sm={4} md={2} lg={2} xs={4} key={style.title}>
              <Style
                title={style.title}
                thumbnail={style.thumbnail}
                isSelected={selectedStyles.includes(style)}
                onSelect={() => onStyleSelect(style)}
              />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default StylesSection;

