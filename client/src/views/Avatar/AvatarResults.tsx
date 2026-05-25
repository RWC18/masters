'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { Box, Typography } from '@mui/material';
import ZoomImage from '../../components/ZoomImage/ZoomImage';
import {
  genAvatar,
  setAvatarPrompt,
  setAvatarStyle,
  uploaderAvatar,
} from '../../redux/Actions/avatarActions';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ToolPageStyles } from '../shared/ToolPage.styles';
import ToolResultsHeader from '../shared/ToolResultsHeader';
import ControlPanel from './components/ControlPanel';
import ResultsPanel from './components/ResultsPanel';
import StylesSection from './components/StylesSection';
import { MALE_PRESETS, FEMALE_PRESETS } from './Avatar.presets';
import { AVATAR_GENERATION_ENABLED } from '../../constants/constants';
import GenerationErrorAlert from '../../components/GenerationErrorAlert/GenerationErrorAlert';
import { useAvatarResultsConstants } from './AvatarResults.constants';

const getStylePrompt = (styleId: string | null): string | undefined => {
  if (!styleId) return undefined;
  const all = [...MALE_PRESETS, ...FEMALE_PRESETS];
  return all.find((p) => p.id === styleId)?.prompt;
};

const AvatarResults = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const c = useAvatarResultsConstants();

  const prompt = useSelector((state: any) => state.avatar.prompt);
  const loading = useSelector((state: any) => state.avatar.loading);
  const error = useSelector((state: any) => state.avatar.error);
  const results = useSelector((state: any) => state.avatar.results);
  const image_url = useSelector((state: any) => state.avatar.image_url);
  const selectedStyle = useSelector((state: any) => state.avatar.selectedStyle);
  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);

  const imageUrls = (results || [])
    .map((r: any) => (typeof r === 'string' ? r : r?.url))
    .filter(Boolean) as string[];
  const zoomedIndex = zoomedImageUrl ? imageUrls.indexOf(zoomedImageUrl) : -1;

  const handlePromptChange = (value: string) => {
    dispatch<any>(setAvatarPrompt(value));
  };

  const handleImageChange = async (file: File) => {
    if (file) {
      await dispatch<any>(uploaderAvatar(file));
    }
  };

  const handleStyleSelect = (styleId: string | null) => {
    dispatch<any>(setAvatarStyle(styleId));
  };

  const handleGenerate = () => {
    if (!AVATAR_GENERATION_ENABLED || !image_url) return;
    const stylePrompt = getStylePrompt(selectedStyle);
    const effectivePrompt = prompt.trim() || (stylePrompt ? 'portrait' : '');
    if (!effectivePrompt && !stylePrompt) return;

    dispatch<any>(genAvatar(effectivePrompt, image_url, stylePrompt));
  };

  return (
    <Box sx={ToolPageStyles.resultsPage}>
      {zoomedImageUrl && zoomedIndex >= 0 && (
        <ZoomImage
          url={zoomedImageUrl}
          handleClose={() => setZoomedImageUrl(null)}
          images={imageUrls.length > 1 ? imageUrls : undefined}
          initialIndex={zoomedIndex}
        />
      )}
      {loading && <Loading />}

      <ToolResultsHeader
        eyebrow={t('products.avatar.title')}
        titleMain={c.title.main}
        titleAccent={c.title.accent}
        titleEnd={c.title.end}
      />

      <GenerationErrorAlert message={error} />

      <Box sx={ToolPageStyles.resultsWorkspace}>
        <Box sx={ToolPageStyles.resultsLayout}>
          <ControlPanel
            prompt={prompt}
            imageUrl={image_url}
            selectedStyle={selectedStyle}
            onPromptChange={handlePromptChange}
            onImageChange={handleImageChange}
            onGenerate={handleGenerate}
          />
          <ResultsPanel results={results || []} onZoom={setZoomedImageUrl} />
        </Box>

        <Box sx={ToolPageStyles.resultsStylesBand}>
          <Typography
            sx={{
              ...ToolPageStyles.stylesSectionTitle,
              textAlign: 'center',
              mb: 2,
            }}
          >
            {t('t2i.stylesLabel')}
          </Typography>
          <StylesSection
            selectedStyle={selectedStyle}
            onStyleSelect={handleStyleSelect}
            compact
            embedded
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AvatarResults;
