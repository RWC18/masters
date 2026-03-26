import React, { useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { uploadAndRemoveBg, resetRemoveBg } from '../../redux/Actions/removeBgActions';
import { forceDownload } from '../../redux/Actions/mainActions';
import Loading from '../../components/Loading/Loading';
import Button from '../../components/Button/Button';
import { colors } from '../../constants/styles';
import { RemoveBgStyles } from './RemoveBg.styles';
import { useRemoveBgConstants } from './RemoveBg.constants';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import { useTranslation } from 'react-i18next';

const RemoveBg = () => {
  const { t } = useTranslation();
  const REMOVE_BG_CONSTANTS = useRemoveBgConstants();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { originalImage, resultImage, loading, error } = useSelector(
    (state: any) => state.removeBg
  );
  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch<any>(uploadAndRemoveBg(e.target.files[0]));
    }
  };

  const handleReset = () => {
    dispatch<any>(resetRemoveBg());
  };

  const hasResult = originalImage && resultImage;

  return (
    <Box sx={RemoveBgStyles.container}>
      {loading && <Loading />}

      <Typography sx={RemoveBgStyles.title}>
        {REMOVE_BG_CONSTANTS.title.main}{' '}
        <Typography component={'span'} sx={RemoveBgStyles.titleAccent}>
          {REMOVE_BG_CONSTANTS.title.accent}
        </Typography>
      </Typography>
      <Typography sx={RemoveBgStyles.description}>
        {REMOVE_BG_CONSTANTS.description}
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            px: 1.5,
            py: 0.75,
            mb: 2,
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.14)',
            backgroundColor: 'background.paper',
            color: colors.TEXT_GRAY,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          <Box component="span" sx={{ color: colors.ORANGE_LIGHT }}>⚡</Box>
          {t('billing.removeBgUsage')}
        </Box>
      </Box>

      {!hasResult && !loading && (
        <label htmlFor='removebg-upload'>
          <input
            accept='image/*'
            id='removebg-upload'
            type='file'
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
          <Box sx={RemoveBgStyles.uploadArea}>
            <IconButton component='span'>
              <CloudUploadIcon
                sx={{ fontSize: 48, color: colors.TEXT_GRAY }}
              />
            </IconButton>
            <Typography sx={RemoveBgStyles.uploadText}>
              {REMOVE_BG_CONSTANTS.uploadButton}
            </Typography>
          </Box>
        </label>
      )}

      {hasResult && (
        <>
          <BeforeAfterSlider
            originalUrl={originalImage}
            resultUrl={resultImage}
          />
          <Box sx={RemoveBgStyles.buttonsContainer}>
            <Button
              title={REMOVE_BG_CONSTANTS.downloadButton}
              handleClick={() => forceDownload(resultImage)}
              textColor={colors.TEXT_DARK}
              bgColor={colors.ORANGE_ACTIVE}
              padding='14px 32px'
              hoverColor={colors.ORANGE_LIGHT}
              isDisabled={false}
            />
            <Button
              title={REMOVE_BG_CONSTANTS.resetButton}
              handleClick={handleReset}
              textColor={colors.TEXT_WHITE}
              bgColor={'transparent'}
              padding='14px 32px'
              hoverColor={colors.GRAY_DARK}
              isDisabled={false}
            />
          </Box>
        </>
      )}

      {error && (
        <Typography sx={{ color: 'red', textAlign: 'center', marginTop: '16px' }}>
          {REMOVE_BG_CONSTANTS.error}
        </Typography>
      )}
    </Box>
  );
};

export default RemoveBg;
