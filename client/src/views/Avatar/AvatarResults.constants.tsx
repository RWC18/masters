import { useTranslation } from 'react-i18next';

export const useAvatarResultsConstants = () => {
  const { t } = useTranslation();
  return {
    title: {
      main: t('avatar.titleMain'),
      accent: t('avatar.titleAccent'),
      end: t('avatar.titleEnd'),
    },
    inputPlaceholder: t('avatar.placeholder'),
    generateButton: t('avatar.generate'),
  };
};
