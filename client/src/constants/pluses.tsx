import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { useTranslation } from 'react-i18next';

const iconSx = { width: '32px', height: '32px' };

export const usePluses = () => {
  const { t } = useTranslation();
  return [
    {
      title: t('pluses.intuitiveInterface.title'),
      description: t('pluses.intuitiveInterface.description'),
      icon: <TouchAppOutlinedIcon htmlColor={'#000'} sx={iconSx} />,
    },
    {
      title: t('pluses.aiPowered.title'),
      description: t('pluses.aiPowered.description'),
      icon: <FlashOnOutlinedIcon htmlColor={'#000'} sx={iconSx} />,
    },
    {
      title: t('pluses.endless.title'),
      description: t('pluses.endless.description'),
      icon: <PaletteOutlinedIcon htmlColor={'#000'} sx={iconSx} />,
    },
    {
      title: t('pluses.timeSaving.title'),
      description: t('pluses.timeSaving.description'),
      icon: <AccessTimeOutlinedIcon htmlColor={'#000'} sx={iconSx} />,
    },
    {
      title: t('pluses.quality.title'),
      description: t('pluses.quality.description'),
      icon: <StarOutlinedIcon htmlColor={'#000'} sx={iconSx} />,
    },
    {
      title: t('pluses.security.title'),
      description: t('pluses.security.description'),
      icon: <SecurityOutlinedIcon htmlColor={'#000'} sx={iconSx} />,
    },
  ];
};
