import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  genI2img,
  setSelectedStylesI2i,
  setI2iPrompt,
  uploaderI2I,
} from '../../redux/Actions/i2iActions';
import Loading from '../../components/Loading/Loading';
import { I2IStyles } from './I2I.styles';
import HeaderSection from './components/HeaderSection';
import InputSection from './components/InputSection';
import StylesSection from './components/StylesSection';

const I2I = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prompt = useSelector((state: any) => state.i2i.prompt);
  const loading = useSelector((state: any) => state.i2i.loading);
  const selectedStyles = useSelector((state: any) => state.i2i.selectedStyles);
  const image_url = useSelector((state: any) => state.i2i.image_url);
  const user = useSelector((state: any) => state.main.user);

  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handlePromptChange = (value: string) => {
    dispatch<any>(setI2iPrompt(value));
  };

  const handleStyleSelect = (style: {
    prompt: string;
    thumbnail: string;
    title: string;
  }) => {
    dispatch<any>(setSelectedStylesI2i(style));
  };

  const handleImageChange = async (file: File) => {
    if (file) {
      setImageLoading(true);
      await dispatch<any>(uploaderI2I(file));
      setImageLoading(false);
    }
  };

  const handleGenerate = () => {
    navigate('/i2i/results');
    const styles = selectedStyles.map(
      (style: {
        prompt: string;
        thumbnail: string;
        title: string;
      }) => style.prompt
    );
    dispatch<any>(
      genI2img(prompt + ', ' + styles.join(', '), image_url)
    );
  };

  return (
    <Box sx={I2IStyles.container}>
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
        selectedStyles={selectedStyles}
        onStyleSelect={handleStyleSelect}
      />
    </Box>
  );
};

export default I2I;
