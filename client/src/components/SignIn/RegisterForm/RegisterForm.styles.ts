import { LoginFormStyles } from '../LoginForm/LoginForm.styles';

export const RegisterFormStyles = {
  container: {
    ...LoginFormStyles.container,
    gap: 1.25,
  },
  inputs: LoginFormStyles.inputs,
  button: LoginFormStyles.button,
  error: LoginFormStyles.error,
};
