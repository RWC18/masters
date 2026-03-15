import { useTranslation } from 'react-i18next';

export const useT2IConstants = () => {
  const { t } = useTranslation();
  return {
    title: {
      main: t('t2i.titleMain'),
      accent: t('t2i.titleAccent'),
      end: t('t2i.titleEnd'),
    },
    description: t('t2i.description'),
    inputPlaceholder: t('t2i.placeholder'),
    generateButton: t('t2i.generate'),
  };
};
