import React from 'react';
import HeroSection from './components/HeroSection';
import BannerSection from './components/BannerSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import FooterSection from './components/FooterSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <BannerSection />
      <AboutSection />
      <ProductsSection />
      <FooterSection />
    </>
  );
};

export default Home;
