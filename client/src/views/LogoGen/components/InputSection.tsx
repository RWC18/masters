'use client';

import { Box } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors } from '../../../constants/styles';
import { ToolPageStyles } from '../../shared/ToolPage.styles';
import CreditsBadge from '../../shared/CreditsBadge';
import { useLogoGenConstants } from '../LogoGen.constants';
import { useTranslation } from 'react-i18next';

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
  const c = useLogoGenConstants();
  const { t } = useTranslation();
  const isDisabled = brandname.trim().length === 0;

  return (
    <Box
      sx={{ ...ToolPageStyles.panelSection, ...ToolPageStyles.centeredContent }}
    >
      <CreditsBadge label={t('billing.logoUsage')} />
      <Box sx={ToolPageStyles.panel}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 1.5,
          }}
        >
          <Input
            placeholder={c.brandnamePlaceholder}
            value={brandname}
            handleChange={onBrandnameChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isDisabled) onGenerate();
            }}
          />
          <Input
            placeholder={c.descriptionPlaceholder}
            value={description}
            handleChange={onDescriptionChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isDisabled) onGenerate();
            }}
          />
        </Box>
        <Box sx={{ mt: 2, width: '100%' }}>
          <Button
            title={c.generateButton}
            handleClick={onGenerate}
            textColor={colors.TEXT_DARK}
            bgColor={colors.ORANGE_ACTIVE}
            padding="14px 0px"
            hoverColor={colors.ORANGE_LIGHT}
            isDisabled={isDisabled}
            styles={{ width: '100%' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default InputSection;
