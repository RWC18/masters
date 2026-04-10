import { useTranslation } from 'react-i18next';

export const useAvatarConstants = () => {
  const { t } = useTranslation();
  return {
    title: {
      main: t('avatar.titleMain'),
      accent: t('avatar.titleAccent'),
      end: t('avatar.titleEnd'),
    },
    description: t('avatar.description'),
    inputPlaceholder: t('avatar.placeholder'),
    generateButton: t('avatar.generate'),
  };
};
