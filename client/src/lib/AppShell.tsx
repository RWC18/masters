'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useThemeMode } from '../context/ThemeContext';
import { getAppTheme } from '../theme';
import Header from '../components/Header/Header';
import PopUp from '../components/PopUp/PopUp';
import PaymentPopUp from '../components/PaymentPopUp/PaymentPopUp';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setPopUpStatus, setUser } from '../redux/Actions/mainActions';
import { LOCALSTORAGE_KEYS } from '../constants/constants';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { mode } = useThemeMode();
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  useEffect(() => {
    const r = document.documentElement;
    const isDark = theme.palette.mode === 'dark';
    const primary = theme.palette.primary.main;
    const bgDefault = theme.palette.background.default;
    const bgPaper = theme.palette.background.paper;

    r.style.backgroundColor = bgDefault;
    r.style.setProperty('--app-text-primary', theme.palette.text.primary);
    r.style.setProperty('--app-text-secondary', theme.palette.text.secondary);
    r.style.setProperty('--app-primary', primary);
    r.style.setProperty('--app-primary-light', theme.palette.primary.light);
    r.style.setProperty('--app-bg', bgDefault);
    r.style.setProperty('--app-bg-paper', bgPaper);
    r.style.setProperty(
      '--app-on-primary',
      theme.palette.getContrastText(primary)
    );
    r.style.setProperty(
      '--app-overlay',
      isDark ? alpha('#012641', 0.78) : alpha('#0D3B66', 0.35)
    );

    r.style.setProperty(
      '--app-header-bg',
      isDark ? alpha('#012641', 0.72) : alpha(bgDefault, 0.88)
    );
    r.style.setProperty(
      '--app-header-bg-scrolled',
      isDark ? alpha('#012641', 0.94) : alpha(bgPaper, 0.96)
    );
    r.style.setProperty(
      '--app-header-border',
      isDark
        ? 'rgba(255, 255, 255, 0.08)'
        : alpha(theme.palette.text.primary, 0.12)
    );

    r.style.setProperty(
      '--app-border',
      isDark ? 'rgba(255, 255, 255, 0.12)' : alpha('#0D3B66', 0.16)
    );
    r.style.setProperty(
      '--app-border-subtle',
      isDark ? 'rgba(255, 255, 255, 0.06)' : alpha('#0D3B66', 0.1)
    );
    r.style.setProperty(
      '--app-surface',
      isDark ? 'rgba(255, 255, 255, 0.04)' : alpha('#0D3B66', 0.04)
    );
    r.style.setProperty(
      '--app-surface-elevated',
      isDark ? 'rgba(255, 255, 255, 0.07)' : alpha('#ffffff', 0.85)
    );
    r.style.setProperty(
      '--app-hover',
      isDark ? 'rgba(255, 255, 255, 0.06)' : alpha('#0D3B66', 0.06)
    );
    r.style.setProperty('--app-accent-bg', alpha(primary, 0.12));
    r.style.setProperty('--app-accent-border', alpha(primary, 0.32));
    r.style.setProperty(
      '--app-shadow',
      isDark ? '0 8px 32px rgba(0, 0, 0, 0.35)' : '0 8px 24px rgba(13, 59, 102, 0.12)'
    );
    r.style.setProperty(
      '--app-input-bg',
      isDark ? alpha('#ffffff', 0.95) : '#ffffff'
    );
    r.style.setProperty('--app-input-text', isDark ? '#020202' : '#0D3B66');
  }, [theme]);

  const getUserAfterRefresh = useCallback(async () => {
    const access_token = localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
    if (access_token) {
      const userResponse = await getUser(access_token);
      dispatch<any>(setUser(userResponse.result));
    }
  }, [dispatch]);

  useEffect(() => {
    getUserAfterRefresh();
  }, [getUserAfterRefresh]);

  const popUpStatus = useSelector((state: any) => state.main.popUpStatus);
  const popUpContent = useSelector((state: any) => state.main.popUpContent);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <PopUp
        isOpen={popUpStatus}
        onClose={() => dispatch<any>(setPopUpStatus(false))}
      >
        {popUpContent}
      </PopUp>
      <PaymentPopUp />
      <Box
        paddingTop="90px"
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </MuiThemeProvider>
  );
}
