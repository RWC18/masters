import { Box, Grid } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors } from '../../../constants/styles';
import { I2IStyles } from '../I2I.styles';
import { I2I_CONSTANTS } from '../I2I.constants';
import ImageUploadSection from './ImageUploadSection';

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
  return (
    <Box sx={I2IStyles.inputContainer}>
      <Grid container spacing={2} sx={I2IStyles.inputGrid}>
        <ImageUploadSection imageUrl={imageUrl} onImageChange={onImageChange} />
        <Grid item xs={9} sm={9} md={4} lg={4}>
          <Input
            placeholder={I2I_CONSTANTS.inputPlaceholder}
            value={prompt}
            handleChange={onPromptChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1}>
          <Button
            title={I2I_CONSTANTS.generateButton}
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

