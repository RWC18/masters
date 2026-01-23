import { Box, Grid } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors } from '../../../constants/styles';
import { T2IStyles } from '../T2I.styles';
import { T2I_CONSTANTS } from '../T2I.constants';

interface InputSectionProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  prompt,
  onPromptChange,
  onGenerate,
}) => {
  return (
    <Box sx={T2IStyles.inputContainer}>
      <Grid container spacing={2} sx={T2IStyles.inputGrid}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Input
            placeholder={T2I_CONSTANTS.inputPlaceholder}
            value={prompt}
            handleChange={onPromptChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1}>
          <Button
            title={T2I_CONSTANTS.generateButton}
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

