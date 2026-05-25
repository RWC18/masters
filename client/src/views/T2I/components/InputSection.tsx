'use client';

import { Box } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors } from '../../../constants/styles';
import { ToolPageStyles } from '../../shared/ToolPage.styles';
import CreditsBadge from '../../shared/CreditsBadge';
import { useT2IConstants } from '../T2I.constants';
import { useTranslation } from 'react-i18next';

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
  const c = useT2IConstants();
  const { t } = useTranslation();
  const canGenerate = prompt.trim().length > 0;

  return (
    <Box sx={{ ...ToolPageStyles.panelSection, ...ToolPageStyles.centeredContent }}>
      <CreditsBadge label={t('billing.t2iUsage')} />
      <Box sx={ToolPageStyles.panel}>
        <Box sx={ToolPageStyles.inputRow}>
          <Box sx={ToolPageStyles.inputGrow}>
            <Input
              placeholder={c.inputPlaceholder}
              value={prompt}
              handleChange={onPromptChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canGenerate) onGenerate();
              }}
            />
          </Box>
          <Box sx={{ minWidth: { md: 160 }, width: { xs: '100%', md: 'auto' } }}>
            <Button
              title={c.generateButton}
              handleClick={onGenerate}
              textColor={colors.TEXT_DARK}
              bgColor={colors.ORANGE_ACTIVE}
              padding="14px 0px"
              hoverColor={colors.ORANGE_LIGHT}
              isDisabled={!canGenerate}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InputSection;
