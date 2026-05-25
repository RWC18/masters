'use client';

import { Box } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors } from '../../../constants/styles';
import CreditsBadge from '../../shared/CreditsBadge';
import { ToolPageStyles } from '../../shared/ToolPage.styles';
import { useT2IResultsConstants } from '../T2IResults.constants';
import { useTranslation } from 'react-i18next';

interface ControlPanelProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  prompt,
  onPromptChange,
  onGenerate,
}) => {
  const c = useT2IResultsConstants();
  const { t } = useTranslation();
  const canGenerate = prompt.trim().length > 0;

  return (
    <Box sx={ToolPageStyles.controlsCard}>
      <Box sx={ToolPageStyles.controlsCardBadge}>
        <CreditsBadge label={t('billing.t2iUsage')} />
      </Box>
      <Input
        placeholder={c.inputPlaceholder}
        value={prompt}
        handleChange={onPromptChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && canGenerate) onGenerate();
        }}
      />
      <Button
        title={c.generateButton}
        handleClick={onGenerate}
        textColor={colors.TEXT_DARK}
        bgColor={colors.ORANGE_ACTIVE}
        padding="14px 0px"
        hoverColor={colors.ORANGE_LIGHT}
        isDisabled={!canGenerate}
        styles={{ width: '100%' }}
      />
    </Box>
  );
};

export default ControlPanel;
