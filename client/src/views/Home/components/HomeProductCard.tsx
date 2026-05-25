'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import LayersClearOutlined from '@mui/icons-material/LayersClearOutlined';
import DesignServicesOutlined from '@mui/icons-material/DesignServicesOutlined';
import FaceRetouchingNaturalOutlined from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button/Button';
import Login from '../../../components/SignIn/SignIn';
import { colors } from '../../../constants/styles';
import {
  setPopUpContent,
  setPopUpStatus,
} from '../../../redux/Actions/mainActions';
import { HomeStyles } from '../Home.styles';

const visualIcons: Record<string, React.ElementType> = {
  't2i.png': AutoAwesomeOutlined,
  'i2i.png': LayersClearOutlined,
  'logogen.png': DesignServicesOutlined,
  'avatar.png': FaceRetouchingNaturalOutlined,
};

interface HomeProductCardProps {
  title: string;
  url: string;
  thumbnail: string;
  description: string;
  isActive: boolean;
  reverse?: boolean;
}

const HomeProductCard = ({
  title,
  url,
  thumbnail,
  description,
  isActive,
  reverse,
}: HomeProductCardProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.main.user);
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = visualIcons[thumbnail] || AutoAwesomeOutlined;

  const handleClick = () => {
    if (!isActive) return;
    if (user) {
      router.push(url);
      return;
    }
    dispatch<any>(setPopUpStatus(true));
    dispatch<any>(setPopUpContent(<Login />));
  };

  return (
    <Box sx={HomeStyles.productCard(isActive)}>
      <Box
        sx={{
          order: { xs: 2, md: reverse ? 2 : 1 },
        }}
      >
        <Box sx={HomeStyles.productVisual}>
          {!imgError ? (
            <Box
              component="img"
              src={`/products-v2/${thumbnail}`}
              alt={title}
              sx={HomeStyles.productVisualImg}
              onError={() => setImgError(true)}
            />
          ) : (
            <FallbackIcon sx={HomeStyles.productVisualFallback} />
          )}
        </Box>
      </Box>
      <Box sx={{ order: { xs: 1, md: reverse ? 1 : 2 } }}>
        <Typography sx={HomeStyles.productTag}>
          {isActive ? t('home.productActive') : t('common.comingSoon')}
        </Typography>
        <Typography component="h3" sx={HomeStyles.productTitle}>
          {title}
        </Typography>
        <Typography sx={HomeStyles.productDescription}>
          {description}
        </Typography>
        <Button
          isDisabled={!isActive}
          title={isActive ? t('common.generate') : t('common.comingSoon')}
          handleClick={handleClick}
          textColor={colors.TEXT_DARK}
          bgColor={colors.ORANGE_ACTIVE}
          hoverColor={colors.ORANGE_LIGHT}
        />
      </Box>
    </Box>
  );
};

export default HomeProductCard;
