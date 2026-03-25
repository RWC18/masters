import { Box, Grid } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors as styleColors } from '../../../constants/styles';
import { LogoGenStyles } from '../LogoGen.styles';
import { useLogoGenConstants } from '../LogoGen.constants';

interface InputSectionProps {
  brandname: string;
  description: string;
  onBrandnameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onGenerate: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  brandname,
  description,
  onBrandnameChange,
  onDescriptionChange,
  onGenerate,
}) => {
  const LOGO_GEN_CONSTANTS = useLogoGenConstants();
  const isDisabled = brandname.trim().length === 0;

  return (
    <Box sx={LogoGenStyles.inputContainer}>
      <Grid container spacing={2} sx={LogoGenStyles.inputGrid}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Input
            placeholder={LOGO_GEN_CONSTANTS.brandnamePlaceholder}
            value={brandname}
            handleChange={onBrandnameChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && brandname.trim().length > 0) onGenerate();
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Input
            placeholder={LOGO_GEN_CONSTANTS.descriptionPlaceholder}
            value={description}
            handleChange={onDescriptionChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && brandname.trim().length > 0) onGenerate();
            }}
          />
        </Grid>
        <Grid
          item
          md={0}
          sm={12}
          lg={0}
          xs={12}
          sx={{
            display: { md: 'none', xs: 'block' },
          }}
        >
          <Button
            title={LOGO_GEN_CONSTANTS.generateButton}
            handleClick={onGenerate}
            textColor={styleColors.TEXT_DARK}
            bgColor={styleColors.ORANGE_ACTIVE}
            padding='14px 0px'
            hoverColor={styleColors.ORANGE_LIGHT}
            isDisabled={isDisabled}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputSection;

