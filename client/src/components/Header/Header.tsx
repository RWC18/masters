'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { colors } from '../../constants/styles';
import { MenuItem, useMenuItems } from '../../constants/menu';
import { HeaderStyles } from './Header.styles';
import Button from '../Button/Button';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { setPopUpContent, setPopUpStatus, setUser } from '../../redux/Actions/mainActions';
import {
  LogoutOutlined,
  Menu as MenuIcon,
  HistoryOutlined,
  AccountBalanceWalletOutlined,
  BoltOutlined,
  Close as CloseIcon,
} from '@mui/icons-material';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const userInitial = (name?: string) => {
  if (!name) return '?';
  return name.trim().charAt(0).toUpperCase();
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

  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    dispatch<any>(setPopUpStatus(true));
    dispatch<any>(setPopUpContent(<Login />));
  };

  const handleLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
    dispatch<any>(setUser(null));
    setDrawerOpen(false);
    router.push('/');
  };

  const goHomeOrScroll = (target?: string) => {
    if (pathname === '/') {
      scrollTO(target || 'undef');
    } else {
      router.push('/');
    }
    setDrawerOpen(false);
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.type === 'route') {
      router.push(item.path);
      setDrawerOpen(false);
      return;
    }
    goHomeOrScroll(item.url);
  };

  const isRouteActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  const navActive = (item: MenuItem) =>
    item.type === 'route' && isRouteActive(item.path);

  const renderDrawerItem = (
    label: string,
    onClick: () => void,
    icon: React.ReactNode,
    active?: boolean
  ) => (
    <Box
      key={label}
      sx={HeaderStyles.drawerItem(active)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {icon}
      {label}
    </Box>
  );

  return (
    <Box component="header" sx={HeaderStyles.shell(scrolling)}>
      <Drawer
        anchor="right"
        open={drawerOpen && isMobile}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: HeaderStyles.mobileDrawer }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
          }}
        >
          <Box sx={HeaderStyles.drawerHeader}>
            <Box
              component="img"
              src="/logo.svg"
              alt="VAi"
              sx={HeaderStyles.drawerLogo}
              onClick={() => {
                pathname === '/' ? scrollTO('undef') : router.push('/');
                setDrawerOpen(false);
              }}
            />
            <IconButton
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
              sx={{ color: colors.ORANGE_ACTIVE }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {user ? (
            <Box sx={HeaderStyles.drawerUserCard}>
              <Box sx={HeaderStyles.drawerUserRow}>
                <Box sx={HeaderStyles.userAvatar}>
                  {userInitial(user.full_name)}
                </Box>
                <Box sx={HeaderStyles.drawerUserMeta}>
                  <Typography sx={HeaderStyles.drawerUserName}>
                    {user.full_name}
                  </Typography>
                  {user.email && (
                    <Typography sx={HeaderStyles.drawerUserEmail}>
                      {user.email}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box
                sx={HeaderStyles.drawerCreditsBtn}
                onClick={() => {
                  router.push('/billing');
                  setDrawerOpen(false);
                }}
                role="button"
                tabIndex={0}
              >
                <BoltOutlined sx={{ fontSize: 18 }} />
                {user.credits || 0} {t('billing.credits')} · {t('header.topUp')}
              </Box>
              <Box sx={HeaderStyles.drawerQuickActions}>
                <Box
                  sx={HeaderStyles.drawerQuickAction(isRouteActive('/history'))}
                  onClick={() => {
                    router.push('/history');
                    setDrawerOpen(false);
                  }}
                >
                  <HistoryOutlined sx={{ fontSize: 22 }} />
                  {t('header.history')}
                </Box>
                <Box
                  sx={HeaderStyles.drawerQuickAction(isRouteActive('/billing'))}
                  onClick={() => {
                    router.push('/billing');
                    setDrawerOpen(false);
                  }}
                >
                  <AccountBalanceWalletOutlined sx={{ fontSize: 22 }} />
                  {t('header.billing')}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box sx={HeaderStyles.drawerGuestCard}>
              <Typography
                sx={{ fontWeight: 700, fontSize: 16, color: colors.TEXT_WHITE, mb: 0.5 }}
              >
                {t('header.welcome')}
              </Typography>
              <Typography sx={{ fontSize: 13, color: colors.TEXT_GRAY }}>
                {t('header.guestHint')}
              </Typography>
            </Box>
          )}

          <Box sx={HeaderStyles.drawerSection}>
            <Typography sx={HeaderStyles.drawerSectionTitle}>
              {t('header.navSection')}
            </Typography>
            {menuItems.map((item) =>
              renderDrawerItem(
                item.title,
                () => handleMenuClick(item),
                <BoltOutlined sx={{ fontSize: 20, opacity: 0.85 }} />,
                navActive(item)
              )
            )}
          </Box>

          <Box sx={{ ...HeaderStyles.drawerSection, mt: 0.5 }}>
            <Typography sx={HeaderStyles.drawerSectionTitle}>
              {t('header.settingsSection')}
            </Typography>
            <Box sx={HeaderStyles.drawerSettingsCard}>
              <Box sx={HeaderStyles.drawerSettingsRow}>
                <Typography sx={HeaderStyles.drawerSettingsLabel}>
                  {t('header.theme')}
                </Typography>
                <ThemeSwitch />
              </Box>
              <Box sx={{ pt: 1 }}>
                <Typography
                  sx={{ ...HeaderStyles.drawerSettingsLabel, mb: 1, display: 'block' }}
                >
                  {t('header.language')}
                </Typography>
                <LanguageSelector variant="drawer" />
              </Box>
            </Box>
          </Box>

          {user && (
            <Box sx={{ ...HeaderStyles.drawerSection, pb: 2 }}>
              <Box
                sx={HeaderStyles.drawerLogoutItem}
                onClick={handleLogout}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleLogout()}
              >
                <LogoutOutlined sx={{ fontSize: 20 }} />
                {t('header.logout')}
              </Box>
            </Box>
          )}

          {!user && (
            <Box sx={HeaderStyles.drawerFooter}>
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
                styles={{ width: '100%' }}
              />
            </Box>
          )}
        </Box>
      </Drawer>

      <Box sx={HeaderStyles.inner}>
        <Box sx={HeaderStyles.left}>
          <Box
            component="img"
            src="/logo.svg"
            alt="VAi"
            sx={HeaderStyles.logo}
            onClick={() =>
              pathname === '/' ? scrollTO('undef') : router.push('/')
            }
          />
          <Box sx={HeaderStyles.nav}>
            {menuItems.map((item) => (
              <Typography
                key={item.type === 'route' ? item.path : item.url}
                component="span"
                sx={HeaderStyles.navLink(navActive(item))}
                onClick={() => handleMenuClick(item)}
              >
                {item.title}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={HeaderStyles.right}>
          {user && (
            <Box
              sx={HeaderStyles.mobileCredits}
              onClick={() => router.push('/billing')}
            >
              <BoltOutlined sx={{ fontSize: 14, mr: 0.25 }} />
              {user.credits || 0}
            </Box>
          )}

          <Box sx={HeaderStyles.rightDesktop}>
            <ThemeSwitch />
            <LanguageSelector />
            {user && (
              <>
                <Box sx={HeaderStyles.divider} />
                <Typography
                  component="span"
                  sx={HeaderStyles.accountLink(isRouteActive('/history'))}
                  onClick={() => router.push('/history')}
                >
                  <HistoryOutlined sx={{ fontSize: 18 }} />
                  {t('header.history')}
                </Typography>
                <Typography
                  component="span"
                  sx={HeaderStyles.accountLink(isRouteActive('/billing'))}
                  onClick={() => router.push('/billing')}
                >
                  <AccountBalanceWalletOutlined sx={{ fontSize: 18 }} />
                  {t('header.billing')}
                </Typography>
                <Box
                  sx={HeaderStyles.creditsPill}
                  onClick={() => router.push('/billing')}
                >
                  <BoltOutlined sx={{ fontSize: 16 }} />
                  {user.credits || 0} {t('billing.credits')}
                </Box>
                <Box sx={HeaderStyles.userChip}>
                  <Box sx={HeaderStyles.userAvatar}>
                    {userInitial(user.full_name)}
                  </Box>
                  <Typography component="span" sx={HeaderStyles.userName}>
                    {user.full_name}
                  </Typography>
                  <IconButton
                    aria-label={t('header.logout')}
                    onClick={handleLogout}
                    size="small"
                    sx={HeaderStyles.logoutBtn}
                  >
                    <LogoutOutlined fontSize="small" />
                  </IconButton>
                </Box>
              </>
            )}
            {!user && (
              <Button
                title={t('header.login')}
                handleClick={handleLogin}
                textColor={colors.TEXT_DARK}
                bgColor={colors.ORANGE_ACTIVE}
                hoverColor={colors.ORANGE_LIGHT}
                isDisabled={false}
                styles={{ padding: '10px 28px' }}
              />
            )}
          </Box>

          <IconButton
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            sx={HeaderStyles.menuBtn}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
