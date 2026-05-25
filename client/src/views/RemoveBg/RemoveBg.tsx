'use client';

import React, { useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { uploadAndRemoveBg, resetRemoveBg } from '../../redux/Actions/removeBgActions';
import { forceDownload } from '../../redux/Actions/mainActions';
import Loading from '../../components/Loading/Loading';
import Button from '../../components/Button/Button';
import { colors } from '../../constants/styles';
import { RemoveBgStyles } from './RemoveBg.styles';
import { useRemoveBgConstants } from './RemoveBg.constants';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import GenerationErrorAlert from '../../components/GenerationErrorAlert/GenerationErrorAlert';
import ToolPageHeader from '../shared/ToolPageHeader';
import CreditsBadge from '../shared/CreditsBadge';
import { ToolPageStyles } from '../shared/ToolPage.styles';
import { useTranslation } from 'react-i18next';

const RemoveBg = () => {
  const { t } = useTranslation();
  const c = useRemoveBgConstants();
  const dispatch = useDispatch();
  const router = useRouter();

  const { originalImage, resultImage, loading, error } = useSelector(
    (state: any) => state.removeBg
  );
  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
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

      <ToolPageHeader
        eyebrow={t('products.removeBg.title')}
        titleMain={c.title.main}
        titleAccent={c.title.accent}
        description={c.description}
      />

      <CreditsBadge label={t('billing.removeBgUsage')} />

      {!hasResult && !loading && (
        <label htmlFor="removebg-upload">
          <input
            accept="image/*"
            id="removebg-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
          <Box sx={RemoveBgStyles.uploadArea}>
            <IconButton component="span">
              <CloudUploadIcon
                sx={{ fontSize: 48, color: colors.ORANGE_LIGHT }}
              />
            </IconButton>
            <Typography sx={RemoveBgStyles.uploadText}>
              {c.uploadButton}
            </Typography>
          </Box>
        </label>
      )}

      {hasResult && (
        <Box sx={ToolPageStyles.panelSection}>
          <BeforeAfterSlider
            originalUrl={originalImage}
            resultUrl={resultImage}
          />
          <Box sx={RemoveBgStyles.buttonsContainer}>
            <Button
              title={c.downloadButton}
              handleClick={() => forceDownload(resultImage)}
              textColor={colors.TEXT_DARK}
              bgColor={colors.ORANGE_ACTIVE}
              padding="14px 32px"
              hoverColor={colors.ORANGE_LIGHT}
              isDisabled={false}
            />
            <Button
              title={c.resetButton}
              handleClick={handleReset}
              textColor={colors.TEXT_WHITE}
              bgColor="rgba(255,255,255,0.08)"
              padding="14px 32px"
              hoverColor={colors.GRAY_DARK}
              isDisabled={false}
            />
          </Box>
        </Box>
      )}

      <GenerationErrorAlert message={error} />
    </Box>
  );
};

export default RemoveBg;
