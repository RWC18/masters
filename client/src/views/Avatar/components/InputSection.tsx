'use client';

import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors } from '../../../constants/styles';
import { ToolPageStyles } from '../../shared/ToolPage.styles';
import CreditsBadge from '../../shared/CreditsBadge';
import { useAvatarConstants } from '../Avatar.constants';
import { useTranslation } from 'react-i18next';
import { AVATAR_GENERATION_ENABLED } from '../../../constants/constants';
import ImageUploadSection from './ImageUploadSection';

interface InputSectionProps {
  prompt: string;
  imageUrl: string | null;
  selectedStyle: string | null;
  onPromptChange: (value: string) => void;
  onImageChange: (file: File) => void;
  onGenerate: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  prompt,
  imageUrl,
  selectedStyle,
  onPromptChange,
  onImageChange,
  onGenerate,
}) => {
  const c = useAvatarConstants();
  const { t } = useTranslation();
  const canGenerate =
    AVATAR_GENERATION_ENABLED &&
    !!imageUrl &&
    (prompt.trim().length > 0 || !!selectedStyle);

  return (
    <Box sx={ToolPageStyles.panelSection}>
      <CreditsBadge label={t('billing.avatarUsage')} />
      <Box sx={ToolPageStyles.panel}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <ImageUploadSection
              imageUrl={imageUrl}
              onImageChange={onImageChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input
              placeholder={c.inputPlaceholder}
              value={prompt}
              handleChange={onPromptChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canGenerate) onGenerate();
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
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
            />
          </Grid>
        </Grid>
        {!canGenerate && (
          <Typography
            sx={{
              color: colors.TEXT_GRAY,
              fontSize: 13,
              textAlign: 'center',
              mt: 1.5,
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
    </Box>
  );
};

export default InputSection;
