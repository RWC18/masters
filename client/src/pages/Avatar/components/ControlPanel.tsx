import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors } from '../../../constants/styles';
import { AvatarResultsStyles } from '../AvatarResults.styles';
import { useAvatarResultsConstants } from '../AvatarResults.constants';
import StylesSection from './StylesSection';

interface ControlPanelProps {
  prompt: string;
  imageUrl: string | null;
  selectedStyle: string | null;
  onPromptChange: (value: string) => void;
  onImageChange: (file: File) => void;
  onStyleSelect: (styleId: string | null) => void;
  onGenerate: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  prompt,
  imageUrl,
  selectedStyle,
  onPromptChange,
  onImageChange,
  onStyleSelect,
  onGenerate,
}) => {
  const AVATAR_RESULTS_CONSTANTS = useAvatarResultsConstants();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <Grid item xs={12} sm={12} lg={5} md={5}>
      <Typography sx={AvatarResultsStyles.desktopTitle}>
        {AVATAR_RESULTS_CONSTANTS.title.main}
        <Typography component={'span'} sx={AvatarResultsStyles.desktopTitleAccent}>
          {' '}
          {AVATAR_RESULTS_CONSTANTS.title.accent}{' '}
        </Typography>
        {AVATAR_RESULTS_CONSTANTS.title.end}
      </Typography>
      <Input
        placeholder={AVATAR_RESULTS_CONSTANTS.inputPlaceholder}
        value={prompt}
        handleChange={onPromptChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && prompt.trim().length > 0) onGenerate();
        }}
      />
      <StylesSection
        selectedStyle={selectedStyle}
        onStyleSelect={onStyleSelect}
        compact
      />
      <Box sx={AvatarResultsStyles.inputContainer}>
        <Grid
          container
          spacing={2}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Grid item lg={2} md={2} sm={3} xs={3}>
            <input
              accept='image/*'
              id='image-upload'
              type='file'
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor='image-upload'>
              <Box
                sx={{
                  ...AvatarResultsStyles.imagePreview,
                  background: imageUrl
                    ? `url(${imageUrl}) center center / contain`
                    : 'none',
                }}
              />
            </label>
          </Grid>
          <Grid item lg={10} md={10} sm={9} xs={9}>
            <Button
              title={AVATAR_RESULTS_CONSTANTS.generateButton}
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
    </Grid>
  );
};

export default ControlPanel;
