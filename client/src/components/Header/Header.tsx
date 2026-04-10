'use client';

import React, { useEffect, useState } from 'react';
import { Box, Drawer, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { colors } from '../../constants/styles';
import { useMenuItems } from '../../constants/menu';
import { HeaderStyles } from './Header.styles';
import Button from '../Button/Button';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { setPopUpContent, setPopUpStatus, setUser } from '../../redux/Actions/mainActions';
import { LogoutOutlined, Menu as MenuIcon } from '@mui/icons-material';
import Login from '../SignIn/SignIn';
import { LOCALSTORAGE_KEYS } from '../../constants/constants';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';

export const scrollTO = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 100,
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
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [scrolling, setScrolling] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const headerBg = scrolling
    ? theme.palette.mode === 'dark'
      ? 'rgba(1, 38, 65, 0.72)'
      : 'rgba(250, 240, 202, 0.92)'
    : 'transparent';

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
    setDrawerOpen(false);
  };

  const goHomeOrScroll = (target?: string) => {
    if (pathname === '/') {
      scrollTO(target || 'undef');
    } else {
      router.push('/');
    }
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ ...HeaderStyles.container(scrolling), background: headerBg }}>
      {isMobile && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: HeaderStyles.mobileDrawer }}
        >
          <Box sx={HeaderStyles.mobileDrawerInner}>
            <Box sx={HeaderStyles.mobileDrawerTopRow}>
              <ThemeSwitch />
              <LanguageSelector />
            </Box>

            {menuItems.map((menuItem: { title: string; url: string }) => (
              <Typography
                key={menuItem.url}
                sx={HeaderStyles.mobileDrawerItem}
                onClick={() => goHomeOrScroll(menuItem.url)}
              >
                {menuItem.title}
              </Typography>
            ))}

            {user && (
              <>
                <Typography sx={HeaderStyles.mobileDrawerItem} onClick={() => { router.push('/history'); setDrawerOpen(false); }}>
                  {t('header.history')}
                </Typography>
                <Typography sx={HeaderStyles.mobileDrawerItem} onClick={() => { router.push('/billing'); setDrawerOpen(false); }}>
                  {t('header.billing')}
                </Typography>
                <Typography sx={{ ...HeaderStyles.mobileDrawerItem, color: colors.ORANGE_LIGHT }}>
                  {t('header.credits')}: {user.credits || 0}
                </Typography>
                <Typography sx={HeaderStyles.mobileUserName}>
                  {user.full_name}
                </Typography>
                <Typography sx={HeaderStyles.mobileDrawerItem} onClick={handleLogout}>
                  <LogoutOutlined sx={{ fontSize: 18, mr: 1 }} />
                  Logout
                </Typography>
              </>
            )}

            {!user && (
              <Button
                title={t('header.login')}
                handleClick={() => {
                  handleLogin();
                  setDrawerOpen(false);
                }}
                textColor={colors.TEXT_DARK}
                bgColor={colors.ORANGE_ACTIVE}
                hoverColor={colors.ORANGE_LIGHT}
                isDisabled={false}
                styles={{ width: '100%', marginTop: '8px' }}
              />
            )}
          </Box>
        </Drawer>
      )}

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
                  pathname === '/' ? scrollTO('undef') : router.push('/')
                }
              />
            </Grid>
            <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                {menuItems.map((menuItem: { title: string; url: string }) => (
                  <Grid item key={menuItem.url}>
                    <Typography
                      sx={{ ...HeaderStyles.menuItem, color: theme.palette.text.secondary }}
            onClick={() =>
                  pathname === '/'
                    ? scrollTO(menuItem.url)
                    : router.push('/')
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
        <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
          <Grid container alignItems="center" spacing={{ md: 2, xs: 1 }}>
            <Grid item>
              <ThemeSwitch />
            </Grid>
            <Grid item>
              <LanguageSelector />
            </Grid>
            {user && (
              <Grid item>
                <Typography
                  sx={{ ...HeaderStyles.menuItem, color: theme.palette.text.secondary }}
                  onClick={() => router.push('/history')}
                >
                  {t('header.history')}
                </Typography>
              </Grid>
            )}
            {user && (
              <Grid item>
                <Typography
                  sx={{ ...HeaderStyles.menuItem, color: theme.palette.text.secondary }}
                  onClick={() => router.push('/billing')}
                >
                  {t('header.billing')}
                </Typography>
              </Grid>
            )}
            {user && (
              <Grid item>
                <Typography sx={{ ...HeaderStyles.menuItem, color: colors.ORANGE_LIGHT }}>
                  {t('header.credits')}: {user.credits || 0}
                </Typography>
              </Grid>
            )}
            <Grid item>
              {user ? (
                <Typography sx={HeaderStyles.user} component="span">
                  <Box component="span" sx={HeaderStyles.userName}>
                    {user.full_name}
                  </Box>
                  <IconButton
                    aria-label="Logout"
                    onClick={() => handleLogout()}
                    size="small"
                    sx={{ p: 0.5 }}
                  >
                    <LogoutOutlined sx={HeaderStyles.logoutIcon} fontSize="small" />
                  </IconButton>
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
        <Grid item sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            aria-label="open menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ color: theme.palette.text.primary }}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
