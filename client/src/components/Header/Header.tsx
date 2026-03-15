import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { colors } from '../../constants/styles';
import { useMenuItems } from '../../constants/menu';
import { HeaderStyles } from './Header.styles';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setPopUpContent, setPopUpStatus, setUser, signInUser } from '../../redux/Actions/mainActions';
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
    <Box
      sx={HeaderStyles.container(scrolling)}
    >
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        spacing={6}
      >
        <Grid item>
          <Grid
            container
            justifyContent={'flex-start'}
            alignItems={'center'}
            spacing={4}
          >
            <Grid item>
              <img
                src='/logo.svg'
                alt='logo VAi'
                style={HeaderStyles.logo}
                onClick={() =>
                  location.pathname === '/' ? scrollTO('undef') : navigate('/')
                }
              />
          </Grid>
        <Grid item>
          <Grid
            container
            justifyContent={'flex-start'}
            alignItems={'center'}
            spacing={4}
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
        <Grid container alignItems={'center'} spacing={2}>
          <Grid item>
            <LanguageSelector />
          </Grid>
          <Grid item>
            {user ? (
              <Typography sx={HeaderStyles.user}
              >{user.full_name}
              <LogoutOutlined sx={HeaderStyles.logoutIcon} fontSize='small' onClick={() => handleLogout()}/>
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
