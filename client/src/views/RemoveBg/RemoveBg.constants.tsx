import { useTranslation } from 'react-i18next';

export const useRemoveBgConstants = () => {
  const { t } = useTranslation();
  return {
    title: {
      main: t('removeBg.titleMain'),
      accent: t('removeBg.titleAccent'),
      end: '',
    },
    description: t('removeBg.description'),
    uploadButton: t('removeBg.upload'),
    downloadButton: t('removeBg.download'),
    resetButton: t('removeBg.reset'),
    error: t('removeBg.error'),
  };
};
