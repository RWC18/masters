import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../constants/styles';
import { AvatarStyles } from '../Avatar.styles';
import { AvatarResultsStyles } from '../AvatarResults.styles';
import {
  MALE_PRESETS,
  FEMALE_PRESETS,
  GenderTab,
  AvatarPreset,
} from '../Avatar.presets';

interface StylesSectionProps {
  selectedStyle: string | null;
  onStyleSelect: (styleId: string | null) => void;
  compact?: boolean;
}

const StylesSection: React.FC<StylesSectionProps> = ({
  selectedStyle,
  onStyleSelect,
  compact = false,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<GenderTab>('male');

  const presets = activeTab === 'male' ? MALE_PRESETS : FEMALE_PRESETS;

  const tabsContainerSx = compact ? AvatarResultsStyles.stylesTabsContainer : AvatarStyles.tabsContainer;
  const stylesContainerSx = compact ? AvatarResultsStyles.stylesContainer : AvatarStyles.stylesContainer;
  const stylesGridSx = compact ? AvatarResultsStyles.stylesGrid : AvatarStyles.stylesGrid;
  const tabSx = (active: boolean) =>
    active
      ? (compact ? AvatarResultsStyles.tabActive : AvatarStyles.tabActive)
      : (compact ? AvatarResultsStyles.tab : AvatarStyles.tab);
  const emojiCircleSx = compact ? AvatarResultsStyles.emojiCircle : AvatarStyles.emojiCircle;

  const handleSelect = (preset: AvatarPreset) => {
    onStyleSelect(selectedStyle === preset.id ? null : preset.id);
  };

  return (
    <>
      <Box sx={tabsContainerSx}>
        <Box
          sx={tabSx(activeTab === 'male')}
          onClick={() => {
            setActiveTab('male');
            onStyleSelect(null);
          }}
        >
          {t('avatar.male')}
        </Box>
        <Box
          sx={tabSx(activeTab === 'female')}
          onClick={() => {
            setActiveTab('female');
            onStyleSelect(null);
          }}
        >
          {t('avatar.female')}
        </Box>
      </Box>

      <Box sx={stylesContainerSx}>
        <Grid
          container
          sx={stylesGridSx}
          spacing={compact ? { md: 1, xs: 1 } : { md: 6, xs: 1 }}
        >
          {presets.map((preset) => {
            const isSelected = selectedStyle === preset.id;
            return (
              <Grid
                item
                key={preset.id}
                xs={compact ? 3 : 4}
                sm={compact ? 2 : 4}
                md={compact ? 2 : 2}
                lg={compact ? 2 : 2}
              >
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
                        padding: compact ? '3px' : '5px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: '.5s',
                        justifyContent: 'center',
                      }}
                    >
                      <Box sx={emojiCircleSx}>
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
                        fontSize: compact ? '11px' : 'inherit',
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
