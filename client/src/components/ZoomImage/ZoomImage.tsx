import React, { useEffect } from 'react';

import { Box, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { colors } from '../../constants/styles';
import { forceDownload } from '../../redux/Actions/mainActions';

interface Props {
  url: string;
  handleClose: () => void;
}

const ZoomImage = ({ url, handleClose }: Props) => {
  useEffect(() => {
    document.addEventListener('keydown', keydownFunction, false);
    return () => {
      document.removeEventListener('keydown', keydownFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  const keydownFunction = (event: any) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        zIndex: 20,
        justifyContent: 'center',
        backdropFilter: 'blur(15px)',
        backgroundColor: '#00000070',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: 15,
          top: 15,
        }}
      >
        <Grid container alignItems={'center'} spacing={1}>
          <Grid
            item
            sx={{
              transition: '.3s',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(.95)',
              },
            }}
            onClick={() => forceDownload(url)}
          >
            <CloudDownloadIcon htmlColor={colors.TEXT_WHITE} fontSize='large' />
          </Grid>
          <Grid
            item
            sx={{
              transition: '.3s',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(.95)',
              },
            }}
            onClick={() => handleClose()}
          >
            <CloseIcon htmlColor={colors.TEXT_WHITE} fontSize='large' />
          </Grid>
        </Grid>
      </Box>
      <Box width={{ md: '40%', xs: '80%' }}>
        <img
          src={url}
          width={'100%'}
          style={{ borderRadius: '16px' }}
          alt={url}
        />
      </Box>
    </Box>
  );
};

export default ZoomImage;
