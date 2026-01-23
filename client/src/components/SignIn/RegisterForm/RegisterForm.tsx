import { Alert, Box } from "@mui/material"
import { RegisterFormStyles } from "./RegisterForm.styles"
import Input from "../../Input/Input"
import Button from "../../Button/Button"
import { colors } from "../../../constants/styles"
import { registerUser, setPopUpStatus, signInUser } from "../../../redux/Actions/mainActions"
import { LOCALSTORAGE_KEYS } from "../../../constants/constants"
import { getUser } from "../../../redux/Actions/mainActions"
import { setUser } from "../../../redux/Actions/mainActions"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { IUserRegistration } from "../../../redux/types"

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCheckPasswordMatch = () => {
    if (password.trim() === confirmPassword.trim()) {
      return true;
    } 
    return false;
  }

  const dispatch = useDispatch();
  
  const handleRegister = async () => {
    setError(null); 
    const isPasswordMatch = handleCheckPasswordMatch();
    if (!isPasswordMatch) {
      setError("Passwords do not match");
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
  }

    const isButtonDisabled = () => {
      if (email.trim() === '' || password.trim() === '' || fullName.trim() === '' || confirmPassword.trim() === '') {
        return true;
      }
      return false;
    }
  
  return (
    <Box sx={RegisterFormStyles.container}>
        <Input value={email} placeholder='Email' handleChange={setEmail} styles={RegisterFormStyles.inputs} size={'small'} />
        <Input
          value={fullName}
          placeholder='Full Name'
          handleChange={setFullName}
          styles={RegisterFormStyles.inputs}
          size={'small'}
        />
        <Input
          value={password}
          placeholder='Password'
          handleChange={setPassword}
          styles={RegisterFormStyles.inputs}
          size={'small'}
          type='password'
        />
        <Input
          value={confirmPassword}
          placeholder='Confirm Password'
          handleChange={setConfirmPassword}
          styles={RegisterFormStyles.inputs}
          size={'small'}
          type='password'
        />
        <Button
          handleClick={handleRegister}
          title='Register'
          bgColor={colors.ORANGE_ACTIVE}
          hoverColor={colors.GRAY_DARK}
          textColor={colors.TEXT_DARK}
          isDisabled={isButtonDisabled()}
          styles={RegisterFormStyles.button}
        />
        <Alert severity="error" sx={RegisterFormStyles.error(error !== null)}>
          {error}
        </Alert>
    </Box>
  )
}

export default RegisterForm