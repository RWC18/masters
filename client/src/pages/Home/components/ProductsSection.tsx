import { Box, Typography } from '@mui/material';
import React from 'react';
import { products } from '../../../constants/products';
import Product from '../../../components/Product/Product';
import { HomeStyles } from '../Home.styles';
import { HOME_CONSTANTS } from '../Home.constants';

const ProductsSection = () => {
  return (
    <Box sx={HomeStyles.container}>
      <Box sx={HomeStyles.productsContainer}>
        <Typography id='products' sx={HomeStyles.sectionTitle}>
          {HOME_CONSTANTS.products.title}
        </Typography>
        {products.map(
          (
            product: {
              title: string;
              url: string;
              thumbnail: string;
              description: string;
            },
            id
          ) => (
            <Product {...product} reverse={(id + 1) % 2 === 0} key={id} />
          )
        )}
      </Box>
    </Box>
  );
};

export default ProductsSection;

