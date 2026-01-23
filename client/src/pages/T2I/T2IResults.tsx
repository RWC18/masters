import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { Box, Grid } from '@mui/material';
import ZoomImage from '../../components/ZoomImage/ZoomImage';
import {
  genT2img,
  setSelectedStylesT2i,
  setT2iPrompt,
} from '../../redux/Actions/t2iActions';
import { useNavigate } from 'react-router-dom';
import { T2IResultsStyles } from './T2IResults.styles';
import MobileTitle from './components/MobileTitle';
import ControlPanel from './components/ControlPanel';
import ResultsPanel from './components/ResultsPanel';

const T2IResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prompt = useSelector((state: any) => state.t2i.prompt);
  const loading = useSelector((state: any) => state.t2i.loading);
  const results = useSelector((state: any) => state.t2i.results);
  const selectedStyles = useSelector((state: any) => state.t2i.selectedStyles);
  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [zoomStatus, setZoomStatus] = useState(false);
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);

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
    const styles = selectedStyles.map(
      (style: {
        prompt: string;
        thumbnail: string;
        title: string;
      }) => style.prompt
    );
    dispatch<any>(genT2img(prompt + ', ' + styles.join(', ')));
  };

  const handleZoom = (url: string) => {
    setZoomedImageUrl(url);
    setZoomStatus(true);
  };

  const handleCloseZoom = () => {
    setZoomStatus(false);
  };

  return (
    <Box sx={T2IResultsStyles.container}>
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
          selectedStyles={selectedStyles}
          onPromptChange={handlePromptChange}
          onStyleSelect={handleStyleSelect}
          onGenerate={handleGenerate}
        />
        <ResultsPanel results={results || []} onZoom={handleZoom} />
      </Grid>
    </Box>
  );
};

export default T2IResults;
