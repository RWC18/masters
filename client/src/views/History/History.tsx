'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, IconButton, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { forceDownload } from '../../redux/Actions/mainActions';
import ZoomImage from '../../components/ZoomImage/ZoomImage';
import {
  fetchHistory,
  HistoryItem,
  HistoryToolName,
} from '../../redux/Actions/historyActions';
import { HistoryStyles } from './History.styles';

const getDetailGridColumns = (count: number, isMobile: boolean): number =>
  isMobile ? 2 : (count === 4 ? 2 : count >= 5 || count === 3 ? 3 : Math.min(count, 2) || 1);

const TOOLS: { id: HistoryToolName; labelKey: string }[] = [
  { id: 't2i', labelKey: 'history.tabs.t2i' },
  { id: 'avatar', labelKey: 'history.tabs.avatar' },
  { id: 'logo', labelKey: 'history.tabs.logo' },
  { id: 'removebg', labelKey: 'history.tabs.removebg' },
];

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

const getImagesFromItem = (item: HistoryItem): string[] => {
  const r = item.result;
  if (r.result_url) return [r.result_url];
  const imgs = r.images;
  if (Array.isArray(imgs)) return imgs.filter((u): u is string => typeof u === 'string');
  return [];
};

const getPreviewUrl = (item: HistoryItem): string | null => {
  const urls = getImagesFromItem(item);
  return urls[0] || null;
};

const getSubtitle = (item: HistoryItem): string => {
  const r = item.result;
  if (r.prompt && typeof r.prompt === 'string') return r.prompt;
  if (r.brand_name && typeof r.brand_name === 'string') return r.brand_name;
  return '';
};

const History: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const user = useSelector((state: any) => state.main.user);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<HistoryToolName>('t2i');
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    const data = await fetchHistory();
    setHistory(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    loadHistory();
  }, [user, router, loadHistory]);

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const filtered = history.filter((item) => item.tool_name === tab);
  const isEmpty = !loading && filtered.length === 0;

  const handleTabChange = (_: React.SyntheticEvent, value: HistoryToolName) => {
    setTab(value);
  };

  if (!user) return null;

  const detailImages = selectedItem ? getImagesFromItem(selectedItem) : [];
  const detailTitle = selectedItem ? getSubtitle(selectedItem) : '';
  const detailColumns = getDetailGridColumns(detailImages.length, isMobile);

  return (
    <Box sx={HistoryStyles.container}>
      {zoomedIndex !== null && detailImages[zoomedIndex] && (
        <ZoomImage
          url={detailImages[zoomedIndex]}
          handleClose={() => setZoomedIndex(null)}
          images={detailImages.length > 1 ? detailImages : undefined}
          initialIndex={zoomedIndex}
        />
      )}
      {selectedItem && (
        <Box
          sx={HistoryStyles.detailBackdrop}
          onClick={() => setSelectedItem(null)}
          role="presentation"
        >
          <Box
            sx={HistoryStyles.detailPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <Box sx={HistoryStyles.detailHeader}>
              <Typography sx={HistoryStyles.detailTitle}>
                {detailTitle || t('history.generation')}
              </Typography>
              <IconButton
                aria-label="Close"
                onClick={() => setSelectedItem(null)}
                size="small"
                sx={HistoryStyles.detailCloseBtn}
              >
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Box>
            <Box
              sx={{
                ...HistoryStyles.detailGrid,
                gridTemplateColumns: `repeat(${detailColumns}, 1fr)`,
              }}
            >
              {detailImages.map((url, i) => (
                <Box key={i} sx={HistoryStyles.detailImageWrap}>
                  <img
                    src={url}
                    alt=""
                    style={HistoryStyles.detailImage as React.CSSProperties}
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedIndex(i);
                    }}
                  />
                  <Box
                    className="detailDownload"
                    sx={HistoryStyles.detailDownload}
                    onClick={(e) => {
                      e.stopPropagation();
                      forceDownload(url);
                    }}
                  >
                    <CloudDownloadIcon sx={{ fontSize: 18, mr: 0.5 }} />
                    {t('removeBg.download')}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '4px', marginBottom: { md: '8px', xs: '4px' } }}>
        <Typography sx={HistoryStyles.title}>{t('history.title')}</Typography>
        <Typography sx={HistoryStyles.titleAccent}>{t('history.titleAccent')}</Typography>
      </Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        sx={HistoryStyles.tabsRoot}
        variant="scrollable"
        scrollButtons="auto"
      >
        {TOOLS.map(({ id, labelKey }) => (
          <Tab key={id} value={id} label={t(labelKey)} />
        ))}
      </Tabs>

      {loading && (
        <Typography sx={HistoryStyles.loadingState}>
          {t('history.loading')}
        </Typography>
      )}

      {!loading && isEmpty && (
        <Typography sx={HistoryStyles.emptyState}>
          {t('history.empty')}
        </Typography>
      )}

      {!loading && !isEmpty && (
        <Grid container spacing={3} sx={HistoryStyles.grid}>
          {filtered.map((item) => {
            const preview = getPreviewUrl(item);
            const images = getImagesFromItem(item);
            const subtitle = getSubtitle(item);
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <Box
                  sx={HistoryStyles.card}
                  onClick={() => setSelectedItem(item)}
                >
                  <Box position="relative" sx={{ cursor: 'pointer' }}>
                    {images.length > 1 ? (
                      <Box sx={HistoryStyles.thumbGrid}>
                        {images.slice(0, 4).map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt=""
                            style={HistoryStyles.thumb as React.CSSProperties}
                          />
                        ))}
                      </Box>
                    ) : (
                      preview && (
                        <img
                          src={preview}
                          alt=""
                          style={HistoryStyles.cardImage as React.CSSProperties}
                        />
                      )
                    )}
                  </Box>
                  <Box sx={HistoryStyles.cardBody}>
                    <Typography sx={HistoryStyles.cardDate}>
                      {formatDate(item.createdAt)}
                    </Typography>
                    {subtitle && (
                      <Typography sx={HistoryStyles.cardPrompt}>
                        {subtitle}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default History;
