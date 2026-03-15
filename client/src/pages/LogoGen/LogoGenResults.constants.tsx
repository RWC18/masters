import { useTranslation } from 'react-i18next';

export const useLogoGenResultsConstants = () => {
  const { t } = useTranslation();
  return {
    title: {
      main: t('logoGen.resultMain'),
      accent: t('logoGen.resultAccent'),
    },
    backButton: t('logoGen.back'),
    regenerateButton: t('logoGen.regenerate'),
  };
};
