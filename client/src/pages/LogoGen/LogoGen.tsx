import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  genLogo,
  setLogoBrandname,
  setLogoTagline,
  setSelectedColorLogoGen,
  setSelectedIndustryLogoGen,
} from '../../redux/Actions/logoGenActions';
import Loading from '../../components/Loading/Loading';
import { LogoGenStyles } from './LogoGen.styles';
import HeaderSection from './components/HeaderSection';
import InputSection from './components/InputSection';
import IndustriesSection from './components/IndustriesSection';
import ColorsSection from './components/ColorsSection';
import GenerateButtonSection from './components/GenerateButtonSection';

const LogoGen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { brandname, tagline, colors, industries, count, loading } =
    useSelector((state: any) => state.logo);
  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleBrandnameChange = (value: string) => {
    dispatch<any>(setLogoBrandname(value));
  };

  const handleTaglineChange = (value: string) => {
    dispatch<any>(setLogoTagline(value));
  };

  const handleIndustrySelect = (industryId: string) => {
    dispatch<any>(setSelectedIndustryLogoGen(industryId));
  };

  const handleColorSelect = (color: string) => {
    dispatch<any>(setSelectedColorLogoGen(color));
  };

  const handleGenerate = () => {
    navigate('/logo-gen/results');
    dispatch<any>(
      genLogo(
        {
          tagline: tagline,
          text_prompt: brandname,
          industries: industries,
          palettes: colors,
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
        tagline={tagline}
        colors={colors}
        industries={industries}
        onBrandnameChange={handleBrandnameChange}
        onTaglineChange={handleTaglineChange}
        onGenerate={handleGenerate}
      />
      <Box sx={LogoGenStyles.selectionContainer}>
        <IndustriesSection
          selectedIndustry={industries[0] || ''}
          onIndustrySelect={handleIndustrySelect}
        />
        <ColorsSection
          selectedColor={colors[0] || ''}
          onColorSelect={handleColorSelect}
        />
      </Box>
      <GenerateButtonSection
        brandname={brandname}
        colors={colors}
        industries={industries}
        onGenerate={handleGenerate}
      />
    </Box>
  );
};

export default LogoGen;
