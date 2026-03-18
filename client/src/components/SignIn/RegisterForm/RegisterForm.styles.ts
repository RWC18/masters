export const RegisterFormStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '14px', md: '20px' },
    width: '100%',
    maxWidth: '350px',
    padding: { xs: '16px 0', md: '20px 10px' },
    transition: '.5s',
  },
  inputs: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '50px',
      backgroundColor: '#fff',
      padding: '0 10px',
      '& .MuiOutlinedInput-input': { color: '#020202' },
      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.23)' },
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.4)' },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#0A8A9A', borderWidth: '2px' },
    },
    '& .MuiInputBase-input::placeholder': { color: '#666', opacity: 1 },
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