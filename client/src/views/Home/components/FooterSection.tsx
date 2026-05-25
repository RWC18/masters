'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MenuItem, useMenuItems } from '../../../constants/menu';
import { useProducts } from '../../../constants/products';
import { scrollTO } from '../../../components/Header/Header';
import { HomeStyles } from '../Home.styles';
import { useHomeConstants } from '../Home.constants';
import Login from '../../../components/SignIn/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPopUpContent,
  setPopUpStatus,
} from '../../../redux/Actions/mainActions';

const FooterSection = () => {
  const router = useRouter();
  const HOME = useHomeConstants();
  const menuItems = useMenuItems();
  const products = useProducts();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.main.user);

  const handleNav = (item: MenuItem) => {
    if (item.type === 'route') {
      if (user) router.push(item.path);
      else {
        dispatch<any>(setPopUpStatus(true));
        dispatch<any>(setPopUpContent(<Login />));
      }
      return;
    }
    scrollTO(item.url);
  };

  const handleProduct = (url: string) => {
    if (user) router.push(url);
    else {
      dispatch<any>(setPopUpStatus(true));
      dispatch<any>(setPopUpContent(<Login />));
    }
  };

  return (
    <Box component="footer" sx={HomeStyles.footer}>
      <Box sx={HomeStyles.footerInner}>
        <Box sx={HomeStyles.footerTop}>
          <Box sx={HomeStyles.footerBrand}>
            <Box
              component="img"
              src="/logo.svg"
              alt={HOME.footer.logoAlt}
              sx={HomeStyles.footerLogo}
              onClick={() => scrollTO('undef')}
            />
            <Typography sx={HomeStyles.footerTagline}>
              {HOME.footer.tagline}
            </Typography>
          </Box>
          <Box sx={HomeStyles.footerLinks}>
            <Box>
              <Typography sx={HomeStyles.footerColTitle}>
                {HOME.footer.navTitle}
              </Typography>
              {menuItems.map((item) => (
                <Typography
                  key={item.title}
                  sx={HomeStyles.footerLink}
                  onClick={() => handleNav(item)}
                >
                  {item.title}
                </Typography>
              ))}
            </Box>
            <Box>
              <Typography sx={HomeStyles.footerColTitle}>
                {HOME.footer.toolsTitle}
              </Typography>
              {products.map((product) => (
                <Typography
                  key={product.url}
                  sx={HomeStyles.footerLink}
                  onClick={() => handleProduct(product.url)}
                >
                  {product.title}
                </Typography>
              ))}
            </Box>
            <Box>
              <Typography sx={HomeStyles.footerColTitle}>
                {HOME.footer.accountTitle}
              </Typography>
              <Typography
                sx={HomeStyles.footerLink}
                onClick={() => (user ? router.push('/history') : handleProduct('/history'))}
              >
                {HOME.footer.history}
              </Typography>
              <Typography
                sx={HomeStyles.footerLink}
                onClick={() => (user ? router.push('/billing') : handleProduct('/billing'))}
              >
                {HOME.footer.billing}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={HomeStyles.footerBottom}>
          <Typography sx={HomeStyles.footerCopyright}>
            {HOME.footer.copyright(new Date().getFullYear())}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterSection;
