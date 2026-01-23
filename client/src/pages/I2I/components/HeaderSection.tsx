import { Typography } from '@mui/material';
import React from 'react';
import { I2IStyles } from '../I2I.styles';
import { I2I_CONSTANTS } from '../I2I.constants';

const HeaderSection = () => {
  return (
    <>
      <Typography sx={I2IStyles.title}>
        {I2I_CONSTANTS.title.main}{' '}
        <Typography component={'span'} sx={I2IStyles.titleAccent}>
          {I2I_CONSTANTS.title.accent}
        </Typography>{' '}
        {I2I_CONSTANTS.title.end}
      </Typography>
      <Typography sx={I2IStyles.description}>
        {I2I_CONSTANTS.description}
      </Typography>
    </>
  );
};

export default HeaderSection;

