import { useTranslation } from 'react-i18next';

export const useMenuItems = () => {
  const { t } = useTranslation();
  return [
    { title: t('menu.aboutUs'), url: 'about' },
    { title: t('menu.products'), url: 'products' },
  ];
};
