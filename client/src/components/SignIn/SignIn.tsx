'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { LOGIN_POPUP_TABS } from '../../constants/constants';
import { SignInStyles } from './SignIn.styles';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(LOGIN_POPUP_TABS.LOGIN);
  const tabLabels: Record<string, string> = {
    [LOGIN_POPUP_TABS.LOGIN]: t('auth.login'),
    [LOGIN_POPUP_TABS.REGISTER]: t('auth.register'),
  };

  return (
    <Box sx={SignInStyles.root}>
      <Box sx={SignInStyles.hero}>
        <Box
          component="img"
          src="/logo.svg"
          alt="VAi"
          sx={SignInStyles.logo}
        />
        <Typography sx={SignInStyles.heroTitle}>
          {t('auth.welcomeTitle')}
        </Typography>
        <Typography sx={SignInStyles.heroSubtitle}>
          {t('auth.welcomeSubtitle')}
        </Typography>
      </Box>
      <Box sx={SignInStyles.formSide}>
        <Box sx={SignInStyles.tabs}>
          {Object.values(LOGIN_POPUP_TABS).map((tab) => (
            <Typography
              key={tab}
              sx={SignInStyles.tab(activeTab === tab)}
              onClick={() => setActiveTab(tab)}
            >
              {tabLabels[tab]}
            </Typography>
          ))}
        </Box>
        <Box sx={SignInStyles.form(activeTab === LOGIN_POPUP_TABS.LOGIN)}>
          <LoginForm />
        </Box>
        <Box sx={SignInStyles.form(activeTab === LOGIN_POPUP_TABS.REGISTER)}>
          <RegisterForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
