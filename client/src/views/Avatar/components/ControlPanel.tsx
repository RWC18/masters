'use client';

import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors, themeVars } from '../../../constants/styles';
import CreditsBadge from '../../shared/CreditsBadge';
import { ToolPageStyles } from '../../shared/ToolPage.styles';
import { useAvatarResultsConstants } from '../AvatarResults.constants';
import { useTranslation } from 'react-i18next';
import { AVATAR_GENERATION_ENABLED } from '../../../constants/constants';

interface ControlPanelProps {
  prompt: string;
  imageUrl: string | null;
  selectedStyle: string | null;
  onPromptChange: (value: string) => void;
  onImageChange: (file: File) => void;
  onGenerate: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  prompt,
  imageUrl,
  selectedStyle,
  onPromptChange,
  onImageChange,
  onGenerate,
}) => {
  const c = useAvatarResultsConstants();
  const { t } = useTranslation();
  const canGenerate =
    AVATAR_GENERATION_ENABLED &&
    !!imageUrl &&
    (prompt.trim().length > 0 || !!selectedStyle);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <Box sx={ToolPageStyles.controlsCard}>
      <Box sx={ToolPageStyles.controlsCardBadge}>
        <CreditsBadge label={t('billing.avatarUsage')} />
      </Box>
      <Grid container spacing={1.5} alignItems="center">
        <Grid item xs={4}>
          <input
            accept="image/*"
            id="image-upload-results"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <label htmlFor="image-upload-results">
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: '14px',
                border: `1px dashed ${colors.ORANGE_ACTIVE}`,
                bgcolor: themeVars.surface,
                backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
              }}
            />
          </label>
        </Grid>
        <Grid item xs={8}>
          <Input
            placeholder={c.inputPlaceholder}
            value={prompt}
            handleChange={onPromptChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && canGenerate) onGenerate();
            }}
          />
        </Grid>
      </Grid>
      <Button
        title={
          AVATAR_GENERATION_ENABLED
            ? c.generateButton
            : t('common.comingSoon')
        }
        handleClick={onGenerate}
        textColor={colors.TEXT_DARK}
        bgColor={colors.ORANGE_ACTIVE}
        padding="14px 0px"
        hoverColor={colors.ORANGE_LIGHT}
        isDisabled={!canGenerate}
        styles={{ width: '100%' }}
      />
      {!canGenerate && (
        <Typography
          sx={{
            fontSize: 13,
            color: colors.TEXT_GRAY,
            textAlign: 'center',
          }}
        >
          {!AVATAR_GENERATION_ENABLED
            ? t('common.comingSoon')
            : !imageUrl
              ? t('avatar.uploadRequired')
              : t('avatar.promptOrStyleRequired')}
        </Typography>
      )}
    </Box>
  );
};

export default ControlPanel;
