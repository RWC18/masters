import { Typography } from '@mui/material';
import React from 'react';
import { LogoGenStyles } from '../LogoGen.styles';
import { useLogoGenConstants } from '../LogoGen.constants';

const HeaderSection = () => {
  const LOGO_GEN_CONSTANTS = useLogoGenConstants();

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

