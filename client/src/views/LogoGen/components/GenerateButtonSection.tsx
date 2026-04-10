import { Grid } from '@mui/material';
import React from 'react';
import Button from '../../../components/Button/Button';
import { colors as styleColors } from '../../../constants/styles';
import { LogoGenStyles } from '../LogoGen.styles';
import { useLogoGenConstants } from '../LogoGen.constants';

interface GenerateButtonSectionProps {
  brandname: string;
  onGenerate: () => void;
}

const GenerateButtonSection: React.FC<GenerateButtonSectionProps> = ({
  brandname,
  onGenerate,
}) => {
  const LOGO_GEN_CONSTANTS = useLogoGenConstants();
  const isDisabled = brandname.trim().length === 0;

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

