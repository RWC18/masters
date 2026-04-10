'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { Box, Grid } from '@mui/material';
import ZoomImage from '../../components/ZoomImage/ZoomImage';
import {
  genAvatar,
  setAvatarPrompt,
  setAvatarStyle,
  uploaderAvatar,
} from '../../redux/Actions/avatarActions';
import { useRouter } from 'next/navigation';
import { AvatarResultsStyles } from './AvatarResults.styles';
import MobileTitle from './components/MobileTitle';
import ControlPanel from './components/ControlPanel';
import ResultsPanel from './components/ResultsPanel';
import { MALE_PRESETS, FEMALE_PRESETS } from './Avatar.presets';

const getStylePrompt = (styleId: string | null): string | undefined => {
  if (!styleId) return undefined;
  const all = [...MALE_PRESETS, ...FEMALE_PRESETS];
  return all.find((p) => p.id === styleId)?.prompt;
};

const AvatarResults = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const prompt = useSelector((state: any) => state.avatar.prompt);
  const loading = useSelector((state: any) => state.avatar.loading);
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

  const imageUrls = (results || []).map((r: any) => (typeof r === 'string' ? r : r?.url)).filter(Boolean) as string[];
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
    dispatch<any>(genAvatar(prompt, image_url, getStylePrompt(selectedStyle)));
  };

  const handleZoom = (url: string) => {
    setZoomedImageUrl(url);
  };

  const handleCloseZoom = () => {
    setZoomedImageUrl(null);
  };

  return (
    <Box sx={AvatarResultsStyles.container}>
      {zoomedImageUrl && zoomedIndex >= 0 && (
        <ZoomImage
          url={zoomedImageUrl}
          handleClose={handleCloseZoom}
          images={imageUrls.length > 1 ? imageUrls : undefined}
          initialIndex={zoomedIndex}
        />
      )}
      {loading && <Loading />}
      <MobileTitle />
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        flexDirection={{ md: 'row', xs: 'column-reverse' }}
      >
        <ControlPanel
          prompt={prompt}
          imageUrl={image_url}
          selectedStyle={selectedStyle}
          onPromptChange={handlePromptChange}
          onImageChange={handleImageChange}
          onStyleSelect={handleStyleSelect}
          onGenerate={handleGenerate}
        />
        <ResultsPanel results={results || []} onZoom={handleZoom} />
      </Grid>
    </Box>
  );
};

export default AvatarResults;
