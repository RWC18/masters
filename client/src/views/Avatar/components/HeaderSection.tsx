import { Typography } from '@mui/material';
import React from 'react';
import { AvatarStyles } from '../Avatar.styles';
import { useAvatarConstants } from '../Avatar.constants';

const HeaderSection = () => {
  const AVATAR_CONSTANTS = useAvatarConstants();

  return (
    <>
      <Typography sx={AvatarStyles.title}>
        {AVATAR_CONSTANTS.title.main}{' '}
        <Typography component={'span'} sx={AvatarStyles.titleAccent}>
          {AVATAR_CONSTANTS.title.accent}
        </Typography>{' '}
        {AVATAR_CONSTANTS.title.end}
      </Typography>
      <Typography sx={AvatarStyles.description}>
        {AVATAR_CONSTANTS.description}
      </Typography>
    </>
  );
};

export default HeaderSection;
