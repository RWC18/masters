import { Grid } from '@mui/material';
import React from 'react';
import Button from '../../../components/Button/Button';
import { colors as styleColors } from '../../../constants/styles';
import { LogoGenResultsStyles } from '../LogoGenResults.styles';
import { useLogoGenResultsConstants } from '../LogoGenResults.constants';

interface ActionButtonsProps {
  onBack: () => void;
  onRegenerate: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onBack,
  onRegenerate,
}) => {
  const LOGO_GEN_RESULTS_CONSTANTS = useLogoGenResultsConstants();

  return (
    <Grid item xs={12} sm={12} lg={8} md={8} sx={LogoGenResultsStyles.buttonsContainer}>
      <Grid container sx={LogoGenResultsStyles.buttonsGrid}>
        <Grid item xs={3} sm={3} lg={2} md={2} marginRight={'12px'}>
          <Button
            title={LOGO_GEN_RESULTS_CONSTANTS.backButton}
            handleClick={onBack}
            textColor={styleColors.TEXT_DARK}
            bgColor={styleColors.GRAY_LIGHT}
            padding='14px 0px'
            hoverColor={styleColors.GRAY_DARK}
            isDisabled={false}
          />
        </Grid>
        <Grid item xs={5} sm={5} lg={3} md={3}>
          <Button
            title={LOGO_GEN_RESULTS_CONSTANTS.regenerateButton}
            handleClick={onRegenerate}
            textColor={styleColors.TEXT_DARK}
            bgColor={styleColors.ORANGE_ACTIVE}
            padding='14px 0px'
            hoverColor={styleColors.ORANGE_LIGHT}
            isDisabled={false}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ActionButtons;

