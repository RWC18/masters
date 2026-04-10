import { Alert, Box } from "@mui/material"
import { RegisterFormStyles } from "./RegisterForm.styles"
import Input from "../../Input/Input"
import Button from "../../Button/Button"
import { colors } from "../../../constants/styles"
import { registerUser, setPopUpStatus, setUser } from "../../../redux/Actions/mainActions"
import { LOCALSTORAGE_KEYS } from "../../../constants/constants"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { IUserRegistration } from "../../../redux/types"
import { useTranslation } from "react-i18next"

const RegisterForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckPasswordMatch = () => {
    if (password.trim() === confirmPassword.trim()) {
      return true;
    } 
    return false;
  }

  const dispatch = useDispatch();
  
  const isButtonDisabled = () => {
    if (email.trim() === '' || password.trim() === '' || fullName.trim() === '' || confirmPassword.trim() === '') {
      return true;
    }
    return isLoading;
  }

  const handleRegister = async () => {
    if (isLoading) return;
    if (isButtonDisabled()) return;

    if (!email.includes('@')) {
      setError(t('auth.invalidEmail'));
      return;
    }
    if (password.length < 8) {
      setError(t('auth.passwordTooShort'));
      return;
    }

    setError(null); 
    setIsLoading(true);

    try {
      const isPasswordMatch = handleCheckPasswordMatch();
      if (!isPasswordMatch) {
        setError(t('auth.passwordMismatch'));
        return;
      }

      const userData: IUserRegistration = {
        email: email,
        password: password,
        full_name: fullName,
      };

      const registerResponse = await registerUser(userData);
      if (registerResponse.status && registerResponse.data) {
        dispatch<any>(setUser(registerResponse.data));
        localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, registerResponse.data.access_token);
        dispatch<any>(setPopUpStatus(false))
        setError(null);
        setEmail('');
        setPassword('');
        setFullName('');
        setConfirmPassword('');
      } else {
        setError(registerResponse.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Box sx={RegisterFormStyles.container}>
        <Input
          value={email}
          placeholder={t('auth.email')}
          handleChange={setEmail}
          styles={RegisterFormStyles.inputs}
          size={'small'}
          type='email'
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isButtonDisabled()) handleRegister();
          }}
        />
        <Input
          value={fullName}
          placeholder={t('auth.fullName')}
          handleChange={setFullName}
          styles={RegisterFormStyles.inputs}
          size={'small'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isButtonDisabled()) handleRegister();
          }}
        />
        <Input
          value={password}
          placeholder={t('auth.password')}
          handleChange={setPassword}
          styles={RegisterFormStyles.inputs}
          size={'small'}
          type='password'
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isButtonDisabled()) handleRegister();
          }}
        />
        <Input
          value={confirmPassword}
          placeholder={t('auth.confirmPassword')}
          handleChange={setConfirmPassword}
          styles={RegisterFormStyles.inputs}
          size={'small'}
          type='password'
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isButtonDisabled()) handleRegister();
          }}
        />
        <Button
          handleClick={handleRegister}
          title={t('auth.register')}
          bgColor={colors.ORANGE_ACTIVE}
          hoverColor={colors.GRAY_DARK}
          textColor={colors.TEXT_DARK}
          isDisabled={isButtonDisabled()}
          isLoading={isLoading}
          styles={RegisterFormStyles.button}
        />
        <Alert severity="error" sx={RegisterFormStyles.error(error !== null)}>
          {error}
        </Alert>
    </Box>
  )
}

export default RegisterForm