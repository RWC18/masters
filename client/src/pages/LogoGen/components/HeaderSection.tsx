import { Typography } from '@mui/material';
import React from 'react';
import { LogoGenStyles } from '../LogoGen.styles';
import { LOGO_GEN_CONSTANTS } from '../LogoGen.constants';

const HeaderSection = () => {
  return (
    <>
      <Typography sx={LogoGenStyles.title}>
        {LOGO_GEN_CONSTANTS.title.main}{' '}
        <Typography component={'span'} sx={LogoGenStyles.titleAccent}>
          {LOGO_GEN_CONSTANTS.title.accent}
        </Typography>{' '}
        {LOGO_GEN_CONSTANTS.title.end}
      </Typography>
      <Typography sx={LogoGenStyles.description}>
        {LOGO_GEN_CONSTANTS.description}
      </Typography>
    </>
  );
};

export default HeaderSection;

