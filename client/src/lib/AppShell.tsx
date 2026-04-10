'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useThemeMode } from '../context/ThemeContext';
import { getAppTheme } from '../theme';
import Header from '../components/Header/Header';
import PopUp from '../components/PopUp/PopUp';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setPopUpStatus, setUser } from '../redux/Actions/mainActions';
import { LOCALSTORAGE_KEYS } from '../constants/constants';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { mode } = useThemeMode();
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  useEffect(() => {
    const r = document.documentElement;
    r.style.backgroundColor = theme.palette.background.default;
    r.style.setProperty('--app-text-primary', theme.palette.text.primary);
    r.style.setProperty('--app-text-secondary', theme.palette.text.secondary);
    r.style.setProperty('--app-primary', theme.palette.primary.main);
    r.style.setProperty('--app-primary-light', theme.palette.primary.light);
    r.style.setProperty('--app-bg', theme.palette.background.default);
    r.style.setProperty('--app-bg-paper', theme.palette.background.paper);
    r.style.setProperty(
      '--app-on-primary',
      theme.palette.getContrastText(theme.palette.primary.main)
    );
    r.style.setProperty(
      '--app-overlay',
      theme.palette.mode === 'dark'
        ? 'rgba(1, 38, 65, 0.78)'
        : 'rgba(13, 59, 102, 0.35)'
    );
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
