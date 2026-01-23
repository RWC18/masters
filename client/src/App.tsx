import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import T2I from './pages/T2I/T2I';
import Header from './components/Header/Header';
import { Box, Typography } from '@mui/material';
import Legal from './pages/Legal/Legal';
import T2IResults from './pages/T2I/T2IResults';
import I2I from './pages/I2I/I2I';
import I2IResults from './pages/I2I/I2IResults';
import LogoGen from './pages/LogoGen/LogoGen';
import LogoGenResults from './pages/LogoGen/LogoGenResults';
import { LOCALSTORAGE_KEYS } from './constants/constants';
import { getUser, setPopUpStatus, setUser } from './redux/Actions/mainActions';
import { useDispatch, useSelector } from 'react-redux';
import PopUp from './components/PopUp/PopUp';

function App() {
  const dispatch = useDispatch();
  const getUserAfterRefresh = async () => {
    const access_token = localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
    if (access_token) {
      const userResponse = await getUser(access_token);
      dispatch<any>(setUser(userResponse.result));
    }
  }

  useEffect(() => {
    getUserAfterRefresh();
  }, []);

  const popUpStatus = useSelector((state: any) => state.main.popUpStatus);
  const popUpContent = useSelector((state: any) => state.main.popUpContent);

  return (
    <Router>
      <Header />
      <PopUp isOpen={popUpStatus} onClose={() => dispatch<any>(setPopUpStatus(false))} >
        {popUpContent}
      </PopUp>
        
      <Box paddingTop={'90px'}>
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
            path={'/i2i'}
            element={
              <>
                <I2I />
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
            path={'/i2i/results'}
            element={
              <>
                <I2IResults />
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
  );
}

export default App;
