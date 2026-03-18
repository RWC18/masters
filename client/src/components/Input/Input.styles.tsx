export const InputStyles = {
  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '50px',
      backgroundColor: '#fff',
      padding: '0 20px',
      '& .MuiOutlinedInput-input': {
        color: '#020202',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0,0,0,0.23)',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0,0,0,0.4)',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0A8A9A',
        borderWidth: '2px',
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#666',
      opacity: 1,
    },
  },
};