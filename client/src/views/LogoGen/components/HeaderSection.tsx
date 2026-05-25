import React from 'react';
import ToolPageHeader from '../../shared/ToolPageHeader';
import { useLogoGenConstants } from '../LogoGen.constants';
import { useTranslation } from 'react-i18next';

const HeaderSection = () => {
  const c = useLogoGenConstants();
  const { t } = useTranslation();

  return (
    <ToolPageHeader
      eyebrow={t('products.logoGen.title')}
      titleMain={c.title.main}
      titleAccent={c.title.accent}
      titleEnd={c.title.end}
      description={c.description}
    />
  );
};

export default HeaderSection;
