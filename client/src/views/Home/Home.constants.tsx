import { useTranslation } from 'react-i18next';

export const useHomeConstants = () => {
  const { t } = useTranslation();
  return {
    hero: {
      badge: t('home.heroBadge'),
      title: t('home.heroTitle'),
      titleAccent: t('home.heroAccent'),
      description: t('home.heroDescription'),
      ctaStart: t('home.ctaStart'),
      ctaExplore: t('home.ctaExplore'),
    },
    showcase: [
      { value: t('home.showcase.toolsValue'), label: t('home.showcase.tools') },
      { value: t('home.showcase.fastValue'), label: t('home.showcase.fast') },
      {
        value: t('home.showcase.qualityValue'),
        label: t('home.showcase.quality'),
      },
      {
        value: t('home.showcase.secureValue'),
        label: t('home.showcase.secure'),
      },
    ],
    about: {
      eyebrow: t('home.aboutEyebrow'),
      title: t('home.aboutTitle'),
      description: t('home.aboutDescription'),
    },
    products: {
      eyebrow: t('home.productsEyebrow'),
      title: t('home.productsTitle'),
      subtitle: t('home.productsSubtitle'),
    },
    footer: {
      logoAlt: 'logo VAi',
      tagline: t('home.footerTagline'),
      navTitle: t('home.footerNav'),
      toolsTitle: t('home.footerTools'),
      accountTitle: t('home.footerAccount'),
      history: t('header.history'),
      billing: t('header.billing'),
      copyright: (year: number) => t('home.copyright', { year }),
    },
  };
};
