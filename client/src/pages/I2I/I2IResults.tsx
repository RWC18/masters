import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { Box, Grid } from '@mui/material';
import ZoomImage from '../../components/ZoomImage/ZoomImage';
import {
  genI2img,
  setSelectedStylesI2i,
  setI2iPrompt,
  uploaderI2I,
} from '../../redux/Actions/i2iActions';
import { useNavigate } from 'react-router-dom';
import { I2IResultsStyles } from './I2IResults.styles';
import MobileTitle from './components/MobileTitle';
import ControlPanel from './components/ControlPanel';
import ResultsPanel from './components/ResultsPanel';

const I2IResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prompt = useSelector((state: any) => state.i2i.prompt);
  const loading = useSelector((state: any) => state.i2i.loading);
  const results = useSelector((state: any) => state.i2i.results);
  const selectedStyles = useSelector((state: any) => state.i2i.selectedStyles);
  const image_url = useSelector((state: any) => state.i2i.image_url);
  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [zoomStatus, setZoomStatus] = useState(false);
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);

  const handlePromptChange = (value: string) => {
    dispatch<any>(setI2iPrompt(value));
  };

  const handleImageChange = async (file: File) => {
    if (file) {
      await dispatch<any>(uploaderI2I(file));
    }
  };

  const handleStyleSelect = (style: {
    prompt: string;
    thumbnail: string;
    title: string;
  }) => {
    dispatch<any>(setSelectedStylesI2i(style));
  };

  const handleGenerate = () => {
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

  const handleZoom = (url: string) => {
    setZoomedImageUrl(url);
    setZoomStatus(true);
  };

  const handleCloseZoom = () => {
    setZoomStatus(false);
  };

  return (
    <Box sx={I2IResultsStyles.container}>
      {zoomedImageUrl && zoomStatus && (
        <ZoomImage url={zoomedImageUrl} handleClose={handleCloseZoom} />
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
          selectedStyles={selectedStyles}
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

export default I2IResults;
