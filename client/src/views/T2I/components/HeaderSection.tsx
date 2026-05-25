import React from 'react';
import ToolPageHeader from '../../shared/ToolPageHeader';
import { useT2IConstants } from '../T2I.constants';
import { useTranslation } from 'react-i18next';

const HeaderSection = () => {
  const c = useT2IConstants();
  const { t } = useTranslation();

  return (
    <ToolPageHeader
      eyebrow={t('products.t2i.title')}
      titleMain={c.title.main}
      titleAccent={c.title.accent}
      titleEnd={c.title.end}
      description={c.description}
    />
  );
};

export default HeaderSection;
