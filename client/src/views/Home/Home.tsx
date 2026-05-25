'use client';

import { Box } from '@mui/material';
import React from 'react';
import HeroSection from './components/HeroSection';
import BannerSection from './components/BannerSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import FooterSection from './components/FooterSection';
import { HomeStyles } from './Home.styles';

const Home = () => (
  <Box component="main" sx={HomeStyles.page}>
    <HeroSection />
    <BannerSection />
    <AboutSection />
    <ProductsSection />
    <FooterSection />
  </Box>
);

export default Home;
