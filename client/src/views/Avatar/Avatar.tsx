'use client';

import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import {
  genAvatar,
  setAvatarPrompt,
  setAvatarStyle,
  uploaderAvatar,
} from '../../redux/Actions/avatarActions';
import Loading from '../../components/Loading/Loading';
import { AvatarStyles } from './Avatar.styles';
import HeaderSection from './components/HeaderSection';
import InputSection from './components/InputSection';
import StylesSection from './components/StylesSection';
import { MALE_PRESETS, FEMALE_PRESETS } from './Avatar.presets';

const getStylePrompt = (styleId: string | null): string | undefined => {
  if (!styleId) return undefined;
  const all = [...MALE_PRESETS, ...FEMALE_PRESETS];
  return all.find((p) => p.id === styleId)?.prompt;
};

const Avatar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const prompt = useSelector((state: any) => state.avatar.prompt);
  const loading = useSelector((state: any) => state.avatar.loading);
  const image_url = useSelector((state: any) => state.avatar.image_url);
  const selectedStyle = useSelector((state: any) => state.avatar.selectedStyle);
  const user = useSelector((state: any) => state.main.user);

  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handlePromptChange = (value: string) => {
    dispatch<any>(setAvatarPrompt(value));
  };

  const handleImageChange = async (file: File) => {
    if (file) {
      setImageLoading(true);
      await dispatch<any>(uploaderAvatar(file));
      setImageLoading(false);
    }
  };

  const handleStyleSelect = (styleId: string | null) => {
    dispatch<any>(setAvatarStyle(styleId));
  };

  const handleGenerate = () => {
    router.push('/avatar/results');
    dispatch<any>(genAvatar(prompt, image_url, getStylePrompt(selectedStyle)));
  };

  return (
    <Box sx={AvatarStyles.container}>
      {imageLoading && <Loading />}
      {loading && <Loading />}
      <HeaderSection />
      <InputSection
        prompt={prompt}
        imageUrl={image_url}
        onPromptChange={handlePromptChange}
        onImageChange={handleImageChange}
        onGenerate={handleGenerate}
      />
      <StylesSection
        selectedStyle={selectedStyle}
        onStyleSelect={handleStyleSelect}
      />
    </Box>
  );
};

export default Avatar;
