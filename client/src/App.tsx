import React, { useCallback, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import Home from './pages/Home/Home';
import T2I from './pages/T2I/T2I';
import Header from './components/Header/Header';
import Legal from './pages/Legal/Legal';
import T2IResults from './pages/T2I/T2IResults';
import Avatar from './pages/Avatar/Avatar';
import AvatarResults from './pages/Avatar/AvatarResults';
import LogoGen from './pages/LogoGen/LogoGen';
import LogoGenResults from './pages/LogoGen/LogoGenResults';
import RemoveBg from './pages/RemoveBg/RemoveBg';
import History from './pages/History/History';
import { LOCALSTORAGE_KEYS } from './constants/constants';
import { getUser, setPopUpStatus, setUser } from './redux/Actions/mainActions';
import { useDispatch, useSelector } from 'react-redux';
import PopUp from './components/PopUp/PopUp';
import { useThemeMode } from './context/ThemeContext';
import { getAppTheme } from './theme';

function App() {
  const dispatch = useDispatch();
  const { mode } = useThemeMode();
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  if (typeof document !== 'undefined') {
    const r = document.documentElement;
    r.style.backgroundColor = theme.palette.background.default;
    r.style.setProperty('--app-text-primary', theme.palette.text.primary);
    r.style.setProperty('--app-text-secondary', theme.palette.text.secondary);
    r.style.setProperty('--app-primary', theme.palette.primary.main);
    r.style.setProperty('--app-primary-light', theme.palette.primary.light);
    r.style.setProperty('--app-bg', theme.palette.background.default);
    r.style.setProperty('--app-bg-paper', theme.palette.background.paper);
    r.style.setProperty('--app-on-primary', theme.palette.getContrastText(theme.palette.primary.main));
    r.style.setProperty(
      '--app-overlay',
      theme.palette.mode === 'dark'
        ? 'rgba(1, 38, 65, 0.78)'
        : 'rgba(13, 59, 102, 0.35)'
    );
  }

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
      <Router>
        <Header />
        <PopUp isOpen={popUpStatus} onClose={() => dispatch<any>(setPopUpStatus(false))} >
          {popUpContent}
        </PopUp>
        <Box paddingTop="90px" sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
        <Routes>
          <Route
            path={'/'}
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path={'/t2i'}
            element={
              <>
                <T2I />
              </>
            }
          />
          <Route
            path={'/t2i/results'}
            element={
              <>
                <T2IResults />
              </>
            }
          />
          <Route
            path={'/avatar'}
            element={
              <>
                <Avatar />
              </>
            }
          />
          <Route
            path='/logo-gen'
            element={
              <>
                <LogoGen />
              </>
            }
          />
          <Route
            path='/logo-gen/results'
            element={
              <>
                <LogoGenResults />
              </>
            }
          />
          <Route
            path={'/avatar/results'}
            element={
              <>
                <AvatarResults />
              </>
            }
          />
          <Route
            path={'/remove-bg'}
            element={
              <>
                <RemoveBg />
              </>
            }
          />
          <Route
            path={'/history'}
            element={
              <>
                <History />
              </>
            }
          />
          <Route
            path={'/legal'}
            element={
              <>
                <Legal />
              </>
            }
          />
        </Routes>
        </Box>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
