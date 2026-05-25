import { Box, Typography } from '@mui/material';
import React from 'react';
import { genColors } from '../../../constants/genColors';
import OneColor from '../Colors';
import { LogoGenStyles } from '../LogoGen.styles';
import { useTranslation } from 'react-i18next';

interface ColorsSectionProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorsSection: React.FC<ColorsSectionProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        sx={{
          ...LogoGenStyles.colorsSectionTitle,
          textAlign: 'center',
          mb: 1.5,
        }}
      >
        {t('logoGen.colorsLabel')}
      </Typography>
      <Box sx={LogoGenStyles.colorsGrid}>
        {genColors.map((clr: { title: string; thumbnail: string }) => (
          <Box key={clr.title} sx={LogoGenStyles.colorItem}>
            <OneColor
              color={clr}
              isActive={selectedColor === clr.title}
              onSelect={() => onColorSelect(clr.title)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ColorsSection;
