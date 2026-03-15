import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../constants/styles';
import { AvatarStyles } from '../Avatar.styles';
import {
  MALE_PRESETS,
  FEMALE_PRESETS,
  GenderTab,
  AvatarPreset,
} from '../Avatar.presets';

interface StylesSectionProps {
  selectedStyle: string | null;
  onStyleSelect: (styleId: string | null) => void;
}

const StylesSection: React.FC<StylesSectionProps> = ({
  selectedStyle,
  onStyleSelect,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<GenderTab>('male');

  const presets = activeTab === 'male' ? MALE_PRESETS : FEMALE_PRESETS;

  const handleSelect = (preset: AvatarPreset) => {
    onStyleSelect(selectedStyle === preset.id ? null : preset.id);
  };

  return (
    <>
      <Box sx={AvatarStyles.tabsContainer}>
        <Box
          sx={activeTab === 'male' ? AvatarStyles.tabActive : AvatarStyles.tab}
          onClick={() => {
            setActiveTab('male');
            onStyleSelect(null);
          }}
        >
          {t('avatar.male')}
        </Box>
        <Box
          sx={activeTab === 'female' ? AvatarStyles.tabActive : AvatarStyles.tab}
          onClick={() => {
            setActiveTab('female');
            onStyleSelect(null);
          }}
        >
          {t('avatar.female')}
        </Box>
      </Box>

      <Box sx={AvatarStyles.stylesContainer}>
        <Grid
          container
          sx={AvatarStyles.stylesGrid}
          spacing={{ md: 6, xs: 1 }}
        >
          {presets.map((preset) => {
            const isSelected = selectedStyle === preset.id;
            return (
              <Grid item sm={4} md={2} lg={2} xs={4} key={preset.id}>
                <Grid
                  container
                  onClick={() => handleSelect(preset)}
                  alignItems={'center'}
                  flexDirection={'column'}
                  spacing={1}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      '& .emoji-circle': {
                        transform: 'scale(.95)',
                      },
                    },
                  }}
                >
                  <Grid item>
                    <Box
                      className={'emoji-circle'}
                      sx={{
                        border: `3px solid ${
                          isSelected ? colors.ORANGE_LIGHT : 'transparent'
                        }`,
                        borderRadius: '50%',
                        padding: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: '.5s',
                        justifyContent: 'center',
                      }}
                    >
                      <Box sx={AvatarStyles.emojiCircle}>
                        {preset.emoji}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        color: isSelected ? colors.ORANGE_LIGHT : colors.TEXT_WHITE,
                        textAlign: 'center',
                        width: '100%',
                        transition: '.5s',
                      }}
                    >
                      {t(preset.labelKey)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default StylesSection;
