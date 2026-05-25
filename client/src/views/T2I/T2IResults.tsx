'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { Box } from '@mui/material';
import ZoomImage from '../../components/ZoomImage/ZoomImage';
import {
  genT2img,
  setSelectedStylesT2i,
  setT2iPrompt,
} from '../../redux/Actions/t2iActions';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ToolPageStyles } from '../shared/ToolPage.styles';
import ToolResultsHeader from '../shared/ToolResultsHeader';
import ControlPanel from './components/ControlPanel';
import ResultsPanel from './components/ResultsPanel';
import StylesSection from './components/StylesSection';
import GenerationErrorAlert from '../../components/GenerationErrorAlert/GenerationErrorAlert';
import { useT2IResultsConstants } from './T2IResults.constants';

const T2IResults = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const c = useT2IResultsConstants();

  const prompt = useSelector((state: any) => state.t2i.prompt);
  const loading = useSelector((state: any) => state.t2i.loading);
  const error = useSelector((state: any) => state.t2i.error);
  const results = useSelector((state: any) => state.t2i.results);
  const selectedStyles = useSelector((state: any) => state.t2i.selectedStyles);
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
      (style: { prompt: string }) => style.prompt
    );
    dispatch<any>(genT2img(prompt + ', ' + styles.join(', ')));
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
        eyebrow={t('products.t2i.title')}
        titleMain={c.title.main}
        titleAccent={c.title.accent}
        titleEnd={c.title.end}
      />

      <GenerationErrorAlert message={error} />

      <Box sx={ToolPageStyles.resultsWorkspace}>
        <Box sx={ToolPageStyles.resultsLayout}>
          <ControlPanel
            prompt={prompt}
            onPromptChange={handlePromptChange}
            onGenerate={handleGenerate}
          />
          <ResultsPanel
            results={results || []}
            onZoom={setZoomedImageUrl}
          />
        </Box>

        <Box sx={ToolPageStyles.resultsStylesBand}>
          <StylesSection
            selectedStyles={selectedStyles}
            onStyleSelect={handleStyleSelect}
            embedded
          />
        </Box>
      </Box>
    </Box>
  );
};

export default T2IResults;
