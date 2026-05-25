import { Box } from '@mui/material';
import React from 'react';
import { useProducts } from '../../../constants/products';
import { HomeStyles } from '../Home.styles';
import { useHomeConstants } from '../Home.constants';
import HomeProductCard from './HomeProductCard';
import SectionHeader from './SectionHeader';

const ProductsSection = () => {
  const HOME = useHomeConstants();
  const products = useProducts();

  return (
    <Box component="section" sx={HomeStyles.section}>
      <SectionHeader
        id="products"
        eyebrow={HOME.products.eyebrow}
        title={HOME.products.title}
        description={HOME.products.subtitle}
        centered
      />
      <Box sx={HomeStyles.productsGrid}>
        {products.map((product, id) => (
          <HomeProductCard
            key={product.url}
            {...product}
            reverse={id % 2 === 1}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductsSection;
