import { Grid } from '@mui/material';
import React from 'react';
import Button from '../../../components/Button/Button';
import { colors as styleColors } from '../../../constants/styles';
import { LogoGenStyles } from '../LogoGen.styles';
import { LOGO_GEN_CONSTANTS } from '../LogoGen.constants';

interface GenerateButtonSectionProps {
  brandname: string;
  colors: string[];
  industries: string[];
  onGenerate: () => void;
}

const GenerateButtonSection: React.FC<GenerateButtonSectionProps> = ({
  brandname,
  colors,
  industries,
  onGenerate,
}) => {
  const isDisabled =
    brandname.trim().length === 0 ||
    colors.length === 0 ||
    industries.length === 0;

  return (
    <Grid container sx={LogoGenStyles.generateButtonContainer}>
      <Grid item md={1} sm={1} lg={1} xs={12}>
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
  );
};

export default GenerateButtonSection;

