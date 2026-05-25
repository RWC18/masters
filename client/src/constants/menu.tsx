import { useTranslation } from 'react-i18next';

export type MenuItem =
  | { title: string; type: 'scroll'; url: string }
  | { title: string; type: 'route'; path: string };

export const useMenuItems = (): MenuItem[] => {
  const { t } = useTranslation();
  return [
    { title: t('menu.aboutUs'), type: 'scroll', url: 'about' },
    { title: t('menu.products'), type: 'scroll', url: 'products' },
  ];
};
