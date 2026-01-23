import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../../../constants/menu';
import { products } from '../../../constants/products';
import { scrollTO } from '../../../components/Header/Header';
import { HomeStyles } from '../Home.styles';
import { HOME_CONSTANTS } from '../Home.constants';

const FooterSection = () => {
  const navigate = useNavigate();

  return (
    <Box sx={HomeStyles.footer}>
      <Grid
        container
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={{ md: 'row', xs: 'column' }}
      >
        <Grid item>
          <img
            src='/logo.svg'
            alt={HOME_CONSTANTS.footer.logoAlt}
            style={HomeStyles.footerLogo}
            onClick={() => scrollTO('undef')}
          />
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={2}
            flexDirection={{ md: 'row', xs: 'column' }}
          >
            {menuItems.map((menuItem: { title: string; url: string }) => (
              <Grid item key={menuItem.title}>
                <Typography
                  onClick={() => scrollTO(menuItem.url)}
                  sx={HomeStyles.footerMenuItem}
                >
                  {menuItem.title}
                </Typography>
              </Grid>
            ))}
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
                <Grid item key={id}>
                  <Typography
                    onClick={() => navigate(product.url)}
                    sx={HomeStyles.footerMenuItem}
                  >
                    {product.title}
                  </Typography>
                </Grid>
              )
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Typography sx={HomeStyles.footerCopyright}>
            {HOME_CONSTANTS.footer.copyright(new Date().getFullYear())}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FooterSection;

