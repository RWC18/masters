import React from 'react';
import ToolPageHeader from '../../shared/ToolPageHeader';
import { useLogoGenResultsConstants } from '../LogoGenResults.constants';
import { useTranslation } from 'react-i18next';

const ResultsHeader = () => {
  const c = useLogoGenResultsConstants();
  const { t } = useTranslation();

  return (
    <ToolPageHeader
      eyebrow={t('products.logoGen.title')}
      titleMain={c.title.main}
      titleAccent={c.title.accent}
    />
  );
};

export default ResultsHeader;
