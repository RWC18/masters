'use client';

import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import {
  genLogo,
  setLogoBrandname,
  setLogoTagline,
  setSelectedColorLogoGen,
} from '../../redux/Actions/logoGenActions';
import Loading from '../../components/Loading/Loading';
import { LogoGenStyles } from './LogoGen.styles';
import HeaderSection from './components/HeaderSection';
import InputSection from './components/InputSection';
import ColorsSection from './components/ColorsSection';
import GenerateButtonSection from './components/GenerateButtonSection';

const LogoGen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { brandname, tagline, colors, count, loading } =
    useSelector((state: any) => state.logo);
  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handleBrandnameChange = (value: string) => {
    dispatch<any>(setLogoBrandname(value));
  };

  const handleDescriptionChange = (value: string) => {
    dispatch<any>(setLogoTagline(value));
  };

  const handleColorSelect = (color: string) => {
    dispatch<any>(setSelectedColorLogoGen(color));
  };

  const handleGenerate = () => {
    router.push('/logo-gen/results');
    dispatch<any>(
      genLogo(
        {
          brand_name: brandname,
          business_description: tagline,
          color_tone: colors[0] || 'Auto',
        },
        count
      )
    );
  };

  return (
    <Box sx={LogoGenStyles.container}>
      {loading && <Loading />}
      <HeaderSection />
      <InputSection
        brandname={brandname}
        description={tagline}
        onBrandnameChange={handleBrandnameChange}
        onDescriptionChange={handleDescriptionChange}
        onGenerate={handleGenerate}
      />
      <Box sx={LogoGenStyles.selectionContainer}>
        <ColorsSection
          selectedColor={colors[0] || ''}
          onColorSelect={handleColorSelect}
        />
      </Box>
      <GenerateButtonSection
        brandname={brandname}
        onGenerate={handleGenerate}
      />
    </Box>
  );
};

export default LogoGen;
