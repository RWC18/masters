import { useTranslation } from 'react-i18next';

export const useHomeConstants = () => {
  const { t } = useTranslation();
  return {
    hero: {
      title: t('home.heroTitle'),
      titleAccent: t('home.heroAccent'),
      description: t('home.heroDescription'),
    },
    about: {
      title: t('home.aboutTitle'),
      description: t('home.aboutDescription'),
    },
    products: {
      title: t('home.productsTitle'),
    },
    footer: {
      logoAlt: 'logo VAi',
      copyright: (year: number) => t('home.copyright', { year }),
    },
  };
};
