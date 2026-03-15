import { colors } from "../../../constants/styles"

export const LoginFormStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '16px', md: '20px' },
    width: '100%',
    maxWidth: '350px',
    padding: { xs: '16px 0', md: '20px 10px' },
    transition: '.5s',
  },
  inputs: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
        borderRadius: '50px', // Adjust the value as needed
        backgroundColor: colors.TEXT_WHITE, // Set the background color
        padding: '0 10px',
      },
  },
  button: {
    width: '100%',
    padding: '6px',
  },    
  error: (hasError: boolean) => ({
    width: '100%',
    padding: hasError ? '6px' : '0px',
    overflow: 'hidden',
    maxHeight: hasError ? '500px' : '0px',
    transition: '.5s',
  })
}