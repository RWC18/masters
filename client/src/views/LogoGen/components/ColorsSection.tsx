import { Grid } from '@mui/material';
import React from 'react';
import { genColors } from '../../../constants/genColors';
import OneColor from '../Colors';
import { LogoGenStyles } from '../LogoGen.styles';

interface ColorsSectionProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorsSection: React.FC<ColorsSectionProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  return (
    <Grid
      container
      sx={LogoGenStyles.colorsGrid}
      spacing={0}
      columns={{ md: 11, xs: 2 }}
    >
      {genColors.map((clr: { title: string; thumbnail: string }) => (
        <Grid item sm={1} md={1} lg={1} xs={1} key={clr.title}>
          <OneColor
            color={clr}
            isActive={selectedColor === clr.title}
            onSelect={() => onColorSelect(clr.title)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorsSection;

