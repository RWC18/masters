import { Alert, Box } from "@mui/material"
import { LoginFormStyles } from "./LoginForm.styles"
import Input from "../../Input/Input"
import Button from "../../Button/Button"
import { colors } from "../../../constants/styles"
import { setPopUpStatus, signInUser } from "../../../redux/Actions/mainActions"
import { LOCALSTORAGE_KEYS } from "../../../constants/constants"
import { getUser } from "../../../redux/Actions/mainActions"
import { setUser } from "../../../redux/Actions/mainActions"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const LoginForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  
  const handleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      setError(null);
      const singInResponse = await signInUser({ email: email, password: password });
      if (singInResponse.status && singInResponse.result.access_token) {
        localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, singInResponse.result.access_token);
        const userResponse = await getUser(singInResponse.result.access_token);
        if (userResponse.status && userResponse.result) {
          dispatch<any>(setUser(userResponse.result));
          dispatch<any>(setPopUpStatus(false))
          setError(null);
          setEmail('');
          setPassword('');
        }
      }
      if (singInResponse.status === false) {
        setError(singInResponse.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

    const isButtonDisabled = () => {
    if (email.trim() === '' || password.trim() === '') {
        return true;
    }
    return isLoading;
    }

  return (
    <Box sx={LoginFormStyles.container}>
        <Input
          value={email}
          placeholder={t('auth.email')}
          handleChange={setEmail}
          styles={LoginFormStyles.inputs}
          size={'small'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isButtonDisabled()) {
              handleLogin();
            }
          }}
        />
        <Input
          value={password}
          placeholder={t('auth.password')}
          handleChange={setPassword}
          styles={LoginFormStyles.inputs}
          size={'small'}
          type='password'
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isButtonDisabled()) {
              handleLogin();
            }
          }}
        />
        <Button
          handleClick={handleLogin}
          title={t('auth.login')}
          bgColor={colors.ORANGE_ACTIVE}
          hoverColor={colors.GRAY_DARK}
          textColor={colors.TEXT_DARK}
          isDisabled={isButtonDisabled()}
          isLoading={isLoading}
          styles={LoginFormStyles.button}
        />
          <Alert severity="error"  sx={LoginFormStyles.error(error !== null)}>
            {error}
          </Alert>
    </Box>
  )
}

export default LoginForm