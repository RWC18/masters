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

  const { results, loading, brandname, tagline, colors, count } =
    useSelector((state: any) => state.logo);
  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);

  const imageUrls = (results || []).map((r: any) => (typeof r === 'string' ? r : r?.url)).filter(Boolean) as string[];
  const zoomedIndex = zoomedImageUrl ? imageUrls.indexOf(zoomedImageUrl) : -1;

  const handleZoom = (url: string) => {
    setZoomedImageUrl(url);
  };

  const handleCloseZoom = () => {
    setZoomedImageUrl(null);
  };

  const handleBack = () => {
    navigate('/logo-gen');
  };

  const handleRegenerate = () => {
    dispatch<any>(
      genLogo(
        {
          brand_name: brandname,
          business_description: tagline,
          color_tone: colors[0] || 'Auto',
        },
        count
      )
    );
  };

  return (
    <Box sx={LogoGenResultsStyles.container}>
      {zoomedImageUrl && zoomedIndex >= 0 && (
        <ZoomImage
          url={zoomedImageUrl}
          handleClose={handleCloseZoom}
          images={imageUrls.length > 1 ? imageUrls : undefined}
          initialIndex={zoomedIndex}
        />
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
