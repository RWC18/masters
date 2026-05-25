import { Box, Typography } from '@mui/material';
import React from 'react';
import { genStylesV2 } from '../../../constants/genStyles';
import Style from '../../../components/Style/Style';
import { ToolPageStyles } from '../../shared/ToolPage.styles';
import { useTranslation } from 'react-i18next';

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
  embedded?: boolean;
}

const StylesSection: React.FC<StylesSectionProps> = ({
  selectedStyles,
  onStyleSelect,
  embedded = false,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        ...ToolPageStyles.stylesSection,
        ...(embedded ? { mt: 0 } : {}),
      }}
    >
      <Typography sx={ToolPageStyles.stylesSectionTitle}>
        {t('t2i.stylesLabel')}
      </Typography>
      <Box sx={ToolPageStyles.artStylesGrid}>
        {genStylesV2.map((style) => (
          <Box key={style.title} sx={ToolPageStyles.artStyleItem}>
            <Style
              title={style.title}
              thumbnail={style.thumbnail}
              isSelected={selectedStyles.some((s) => s.title === style.title)}
              onSelect={() => onStyleSelect(style)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StylesSection;
