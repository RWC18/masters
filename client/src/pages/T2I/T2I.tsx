import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  genT2img,
  setSelectedStylesT2i,
  setT2iPrompt,
} from '../../redux/Actions/t2iActions';
import Loading from '../../components/Loading/Loading';
import { T2IStyles } from './T2I.styles';
import HeaderSection from './components/HeaderSection';
import InputSection from './components/InputSection';
import StylesSection from './components/StylesSection';

const T2I = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prompt = useSelector((state: any) => state.t2i.prompt);
  const loading = useSelector((state: any) => state.t2i.loading);
  const selectedStyles = useSelector((state: any) => state.t2i.selectedStyles);
  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handlePromptChange = (value: string) => {
    dispatch<any>(setT2iPrompt(value));
  };

  const handleStyleSelect = (style: {
    prompt: string;
    thumbnail: string;
    title: string;
  }) => {
    dispatch<any>(setSelectedStylesT2i(style));
  };

  const handleGenerate = () => {
    navigate('/t2i/results');
    const styles = selectedStyles.map(
      (style: {
        prompt: string;
        thumbnail: string;
        title: string;
      }) => style.prompt
    );
    dispatch<any>(genT2img(prompt + ', ' + styles.join(', ')));
  };

  return (
    <Box sx={T2IStyles.container}>
      {loading && <Loading />}
      <HeaderSection />
      <InputSection
        prompt={prompt}
        onPromptChange={handlePromptChange}
        onGenerate={handleGenerate}
      />
      <StylesSection
        selectedStyles={selectedStyles}
        onStyleSelect={handleStyleSelect}
      />
    </Box>
  );
};

export default T2I;
