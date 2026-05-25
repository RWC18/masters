'use client';

import { Box, Typography } from '@mui/material';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button/Button';
import { scrollTO } from '../../../components/Header/Header';
import Login from '../../../components/SignIn/SignIn';
import { colors } from '../../../constants/styles';
import {
  setPopUpContent,
  setPopUpStatus,
} from '../../../redux/Actions/mainActions';
import { HomeStyles } from '../Home.styles';
import { useHomeConstants } from '../Home.constants';

const HeroSection = () => {
  const HOME = useHomeConstants();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.main.user);

  const handleStart = () => {
    if (user) {
      router.push('/t2i');
      return;
    }
    dispatch<any>(setPopUpStatus(true));
    dispatch<any>(setPopUpContent(<Login />));
  };

  return (
    <Box component="section" sx={HomeStyles.hero}>
      <Box sx={HomeStyles.heroGlow} />
      <Box sx={HomeStyles.heroInner}>
        <Typography sx={HomeStyles.heroBadge}>
          <AutoAwesomeOutlined sx={{ fontSize: 16 }} />
          {HOME.hero.badge}
        </Typography>
        <Typography component="h1" sx={HomeStyles.heroTitle}>
          {HOME.hero.title}
          <Typography component="span" sx={HomeStyles.heroTitleAccent}>
            {HOME.hero.titleAccent}
          </Typography>
        </Typography>
        <Typography sx={HomeStyles.heroDescription}>
          {HOME.hero.description}
        </Typography>
        <Box sx={HomeStyles.heroActions}>
          <Button
            title={HOME.hero.ctaStart}
            handleClick={handleStart}
            textColor={colors.TEXT_DARK}
            bgColor={colors.ORANGE_ACTIVE}
            hoverColor={colors.ORANGE_LIGHT}
            isDisabled={false}
          />
          <Box
            component="button"
            sx={HomeStyles.heroSecondaryBtn}
            onClick={() => scrollTO('products')}
          >
            {HOME.hero.ctaExplore}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
