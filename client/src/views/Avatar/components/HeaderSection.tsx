import React from 'react';
import ToolPageHeader from '../../shared/ToolPageHeader';
import { useAvatarConstants } from '../Avatar.constants';
import { useTranslation } from 'react-i18next';

const HeaderSection = () => {
  const c = useAvatarConstants();
  const { t } = useTranslation();

  return (
    <ToolPageHeader
      eyebrow={t('products.avatar.title')}
      titleMain={c.title.main}
      titleAccent={c.title.accent}
      titleEnd={c.title.end}
      description={c.description}
    />
  );
};

export default HeaderSection;
