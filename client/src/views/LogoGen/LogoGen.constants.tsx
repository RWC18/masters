import { useTranslation } from 'react-i18next';

export const useLogoGenConstants = () => {
  const { t } = useTranslation();
  return {
    title: {
      main: t('logoGen.titleMain'),
      accent: t('logoGen.titleAccent'),
      end: t('logoGen.titleEnd'),
    },
    description: t('logoGen.description'),
    brandnamePlaceholder: t('logoGen.brandPlaceholder'),
    descriptionPlaceholder: t('logoGen.descPlaceholder'),
    generateButton: t('logoGen.generate'),
  };
};
