import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { Box, Grid } from '@mui/material';
import ZoomImage from '../../components/ZoomImage/ZoomImage';
import { genLogo } from '../../redux/Actions/logoGenActions';
import { useNavigate } from 'react-router-dom';
import { LogoGenResultsStyles } from './LogoGenResults.styles';
import ResultsHeader from './components/ResultsHeader';
import ResultsGrid from './components/ResultsGrid';
import ActionButtons from './components/ActionButtons';

const LogoGenResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { results, loading, brandname, tagline, colors, industries, count } =
    useSelector((state: any) => state.logo);
  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [zoomStatus, setZoomStatus] = useState(false);
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);

  const handleZoom = (url: string) => {
    setZoomedImageUrl(url);
    setZoomStatus(true);
  };

  const handleCloseZoom = () => {
    setZoomStatus(false);
  };

  const handleBack = () => {
    navigate('/logo-gen');
  };

  const handleRegenerate = () => {
    dispatch<any>(
      genLogo(
        {
          tagline: tagline,
          text_prompt: brandname,
          industries: industries,
          palettes: colors,
        },
        count
      )
    );
  };

  return (
    <Box sx={LogoGenResultsStyles.container}>
      {zoomedImageUrl && zoomStatus && (
        <ZoomImage url={zoomedImageUrl} handleClose={handleCloseZoom} />
      )}
      <ResultsHeader />
      {loading && <Loading />}
      <Grid container justifyContent={'center'} alignItems={'center'}>
        {results && results.length > 0 && (
          <>
            <ResultsGrid results={results} onZoom={handleZoom} />
            <ActionButtons onBack={handleBack} onRegenerate={handleRegenerate} />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default LogoGenResults;
