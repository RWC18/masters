import { useTranslation } from 'react-i18next';

export const useProducts = () => {
  const { t } = useTranslation();
  return [
    {
      title: t('products.t2i.title'),
      description: t('products.t2i.description'),
      url: '/t2i',
      thumbnail: 't2i.png',
    },
    {
      title: t('products.avatar.title'),
      description: t('products.avatar.description'),
      url: '/avatar',
      thumbnail: 'avatar.png',
    },
    {
      title: t('products.removeBg.title'),
      description: t('products.removeBg.description'),
      url: '/remove-bg',
      thumbnail: 'i2i.png',
    },
    {
      title: t('products.logoGen.title'),
      description: t('products.logoGen.description'),
      url: '/logo-gen',
      thumbnail: 'logogen.png',
    },
  ];
};
