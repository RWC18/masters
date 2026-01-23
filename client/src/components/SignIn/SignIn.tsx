import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { LOGIN_POPUP_TABS } from '../../constants/constants'
import { SignInStyles } from './SignIn.styles'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'

const Login = () => {
    const [activeTab, setActiveTab] = useState(LOGIN_POPUP_TABS.LOGIN);
  return (
      <Box sx={SignInStyles.root}>
      <Box sx={SignInStyles.background}/>
      <Box sx={SignInStyles.container}>
            <Box sx={SignInStyles.tabs}>
                {
                    Object.values(LOGIN_POPUP_TABS).map((tab) => (
                        <Typography sx={SignInStyles.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>{tab.toUpperCase()}</Typography>
                    ))
                }
            </Box>
            <Box sx={SignInStyles.form(activeTab === LOGIN_POPUP_TABS.LOGIN)}> <LoginForm /> </Box>
            <Box sx={SignInStyles.form(activeTab === LOGIN_POPUP_TABS.REGISTER)}> <RegisterForm /> </Box>
        </Box>  </Box>
  )
}

export default Login    