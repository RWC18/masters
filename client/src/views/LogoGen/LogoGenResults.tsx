'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { Box } from '@mui/material';
import ZoomImage from '../../components/ZoomImage/ZoomImage';
import { genLogo } from '../../redux/Actions/logoGenActions';
import { useRouter } from 'next/navigation';
import { ToolPageStyles } from '../shared/ToolPage.styles';
import { extractImageUrlsFromPayload } from '../../lib/normalizeGenerationImages';
import ResultsHeader from './components/ResultsHeader';
import ResultsGrid from './components/ResultsGrid';
import ActionButtons from './components/ActionButtons';
import GenerationErrorAlert from '../../components/GenerationErrorAlert/GenerationErrorAlert';

const LogoGenResults = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { results, loading, error, brandname, tagline, colors, count } =
    useSelector((state: any) => state.logo);
  const user = useSelector((state: any) => state.main.user);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);

  const imageUrls = extractImageUrlsFromPayload(results);
  const zoomedIndex = zoomedImageUrl ? imageUrls.indexOf(zoomedImageUrl) : -1;

  const handleBack = () => router.push('/logo-gen');

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

  const hasResults = imageUrls.length > 0;

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
      <ResultsHeader />
      <GenerationErrorAlert message={error} />
      {loading && <Loading />}
      <Box sx={ToolPageStyles.resultsWorkspace}>
        <ResultsGrid results={results} onZoom={setZoomedImageUrl} />
        {hasResults && (
          <ActionButtons
            onBack={handleBack}
            onRegenerate={handleRegenerate}
          />
        )}
      </Box>
    </Box>
  );
};

export default LogoGenResults;
