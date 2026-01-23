import React from 'react';
import { TextField } from '@mui/material';
import { InputStyles } from './Input.styles';

interface Props {
  value: string;
  handleChange: (value: string) => void;
  placeholder: string;
  onBlur?: () => void;
  styles?: any;
  size?: 'small' | 'medium';

  type?: React.InputHTMLAttributes<unknown>['type'];
}

const Input = ({ value, placeholder, handleChange, styles, size, type, onBlur }: Props) => {
  return (
    <TextField
      placeholder={placeholder}
      onBlur={onBlur}
      value={value}
      onChange={(e: any) => handleChange(e.target.value)}
      variant='outlined'
      color='info'
      size={size || 'medium'}
      type={type || 'text'}
      fullWidth
      sx={{ ...InputStyles.inputField, ...styles }}
    />
  );
};

export default Input;
