import { Box } from '@mui/material';
import React from 'react';
import Button from '../../../components/Button/Button';
import { colors } from '../../../constants/styles';
import { ToolPageStyles } from '../../shared/ToolPage.styles';
import { useLogoGenResultsConstants } from '../LogoGenResults.constants';

interface ActionButtonsProps {
  onBack: () => void;
  onRegenerate: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onBack,
  onRegenerate,
}) => {
  const c = useLogoGenResultsConstants();

  return (
    <Box sx={ToolPageStyles.actionsRow}>
      <Box sx={{ minWidth: 140 }}>
        <Button
          title={c.backButton}
          handleClick={onBack}
          textColor={colors.TEXT_WHITE}
          bgColor="rgba(255,255,255,0.08)"
          padding="14px 24px"
          hoverColor={colors.GRAY_DARK}
          isDisabled={false}
        />
      </Box>
      <Box sx={{ minWidth: 160 }}>
        <Button
          title={c.regenerateButton}
          handleClick={onRegenerate}
          textColor={colors.TEXT_DARK}
          bgColor={colors.ORANGE_ACTIVE}
          padding="14px 24px"
          hoverColor={colors.ORANGE_LIGHT}
          isDisabled={false}
        />
      </Box>
    </Box>
  );
};

export default ActionButtons;
