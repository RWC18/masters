import { Typography } from '@mui/material';
import React from 'react';
import { T2IStyles } from '../T2I.styles';
import { T2I_CONSTANTS } from '../T2I.constants';

const HeaderSection = () => {
  return (
    <>
      <Typography sx={T2IStyles.title}>
        {T2I_CONSTANTS.title.main}{' '}
        <Typography component={'span'} sx={T2IStyles.titleAccent}>
          {T2I_CONSTANTS.title.accent}
        </Typography>{' '}
        {T2I_CONSTANTS.title.end}
      </Typography>
      <Typography sx={T2IStyles.description}>
        {T2I_CONSTANTS.description}
      </Typography>
    </>
  );
};

export default HeaderSection;

