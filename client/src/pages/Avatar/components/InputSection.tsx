import { Box, Grid } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors } from '../../../constants/styles';
import { AvatarStyles } from '../Avatar.styles';
import { useAvatarConstants } from '../Avatar.constants';
import ImageUploadSection from './ImageUploadSection';
import { useTranslation } from 'react-i18next';

interface InputSectionProps {
  prompt: string;
  imageUrl: string | null;
  onPromptChange: (value: string) => void;
  onImageChange: (file: File) => void;
  onGenerate: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  prompt,
  imageUrl,
  onPromptChange,
  onImageChange,
  onGenerate,
}) => {
  const AVATAR_CONSTANTS = useAvatarConstants();
  const { t } = useTranslation();

  return (
    <Box sx={AvatarStyles.inputContainer}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            px: 1.5,
            py: 0.75,
            mb: 1.25,
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.14)',
            backgroundColor: 'background.paper',
            color: colors.TEXT_GRAY,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          <Box component="span" sx={{ color: colors.ORANGE_LIGHT }}>⚡</Box>
          {t('billing.avatarUsage')}
        </Box>
      </Box>
      <Grid container spacing={2} sx={AvatarStyles.inputGrid}>
        <ImageUploadSection imageUrl={imageUrl} onImageChange={onImageChange} />
        <Grid item xs={9} sm={9} md={4} lg={4}>
          <Input
            placeholder={AVATAR_CONSTANTS.inputPlaceholder}
            value={prompt}
            handleChange={onPromptChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && prompt.trim().length > 0) onGenerate();
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1}>
          <Button
            title={AVATAR_CONSTANTS.generateButton}
            handleClick={onGenerate}
            textColor={colors.TEXT_DARK}
            bgColor={colors.ORANGE_ACTIVE}
            padding='14px 0px'
            hoverColor={colors.ORANGE_LIGHT}
            isDisabled={prompt.trim().length <= 0}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputSection;
