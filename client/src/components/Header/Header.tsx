import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { colors } from '../../constants/styles';
import { useMenuItems } from '../../constants/menu';
import { HeaderStyles } from './Header.styles';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setPopUpContent, setPopUpStatus, setUser } from '../../redux/Actions/mainActions';
import {   LogoutOutlined } from '@mui/icons-material';
import Login from '../SignIn/SignIn';
import { LOCALSTORAGE_KEYS } from '../../constants/constants';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';

export const scrollTO = (id: string) => {
  const violation = document.getElementById(id) as any;
  if (violation) {
    window.scrollTo({
      top: violation.offsetTop - 100,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

const Header = () => {
  const menuItems = useMenuItems();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const user = useSelector((state: any) => state.main.user);


  const handleLogin = async () => {
        dispatch<any>(setPopUpStatus(true));
        dispatch<any>(setPopUpContent(<Login />));
  };

  const handleLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
    dispatch<any>(setUser(null));
  }

  return (
    <Box sx={HeaderStyles.container(scrolling)}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={{ md: 6, xs: 1 }}
      >
        <Grid item xs>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="center"
            spacing={{ md: 4, xs: 1 }}
          >
            <Grid item>
              <Box
                component="img"
                src="/logo.svg"
                alt="logo VAi"
                sx={HeaderStyles.logo}
                onClick={() =>
                  location.pathname === '/' ? scrollTO('undef') : navigate('/')
                }
              />
            </Grid>
            <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                {menuItems.map((menuItem: { title: string; url: string }) => (
                  <Grid item key={menuItem.url}>
                    <Typography
                      sx={HeaderStyles.menuItem}
                      onClick={() =>
                        location.pathname === '/'
                          ? scrollTO(menuItem.url)
                          : navigate('/')
                      }
                    >
                      {menuItem.title}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={{ md: 2, xs: 1 }}>
            <Grid item>
              <LanguageSelector />
            </Grid>
            {user && (
              <Grid item>
                <Typography
                  sx={HeaderStyles.menuItem}
                  onClick={() => navigate('/history')}
                >
                  {t('header.history')}
                </Typography>
              </Grid>
            )}
            <Grid item>
              {user ? (
                <Typography sx={HeaderStyles.user} component="span">
                  <Box component="span" sx={HeaderStyles.userName}>
                    {user.full_name}
                  </Box>
                  <LogoutOutlined
                    sx={HeaderStyles.logoutIcon}
                    fontSize="small"
                    onClick={() => handleLogout()}
                  />
                </Typography>
              ) : (
                <Button
                  title={t('header.login')}
                  handleClick={() => handleLogin()}
                  textColor={colors.TEXT_DARK}
                  bgColor={colors.ORANGE_ACTIVE}
                  hoverColor={colors.ORANGE_LIGHT}
                  isDisabled={false}
                  styles={HeaderStyles.button}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
