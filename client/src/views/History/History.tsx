'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import LayersClearOutlinedIcon from '@mui/icons-material/LayersClearOutlined';
import { forceDownload } from '../../redux/Actions/mainActions';
import { LOCALSTORAGE_KEYS } from '../../constants/constants';
import ZoomImage from '../../components/ZoomImage/ZoomImage';
import {
  fetchHistory,
  HistoryItem,
  HistoryToolName,
} from '../../redux/Actions/historyActions';
import { colors } from '../../constants/styles';
import { HistoryStyles } from './History.styles';

const TOOL_CONFIG: {
  id: HistoryToolName;
  labelKey: string;
  icon: React.ElementType;
}[] = [
  { id: 't2i', labelKey: 'history.tabs.t2i', icon: AutoAwesomeOutlinedIcon },
  {
    id: 'avatar',
    labelKey: 'history.tabs.avatar',
    icon: FaceRetouchingNaturalOutlinedIcon,
  },
  { id: 'logo', labelKey: 'history.tabs.logo', icon: DesignServicesOutlinedIcon },
  {
    id: 'removebg',
    labelKey: 'history.tabs.removebg',
    icon: LayersClearOutlinedIcon,
  },
];

const getDetailGridColumns = (count: number, isMobile: boolean): number =>
  isMobile ? 2 : count === 4 ? 2 : count >= 5 || count === 3 ? 3 : Math.min(count, 2) || 1;

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
      const token = localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
      if (!token) router.push('/');
      return;
    }
    loadHistory();
  }, [user, router, loadHistory]);

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zoomedIndex === null) {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, zoomedIndex]);

  const countsByTool = useMemo(() => {
    const map: Record<HistoryToolName, number> = {
      t2i: 0,
      avatar: 0,
      logo: 0,
      removebg: 0,
    };
    history.forEach((item) => {
      map[item.tool_name] = (map[item.tool_name] || 0) + 1;
    });
    return map;
  }, [history]);

  const filtered = history.filter((item) => item.tool_name === tab);
  const isEmpty = !loading && filtered.length === 0;
  const activeTool = TOOL_CONFIG.find((c) => c.id === tab);

  if (!user) {
    const hasToken =
      typeof window !== 'undefined' &&
      !!localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
    if (hasToken) {
      return (
        <Box sx={HistoryStyles.page}>
          <Box sx={HistoryStyles.stateBox}>
            <CircularProgress size={36} sx={{ color: colors.ORANGE_LIGHT }} />
            <Typography sx={{ color: colors.TEXT_GRAY, mt: 2 }}>
              {t('history.loading')}
            </Typography>
          </Box>
        </Box>
      );
    }
    return null;
  }

  const detailImages = selectedItem ? getImagesFromItem(selectedItem) : [];
  const detailTitle = selectedItem ? getSubtitle(selectedItem) : '';
  const detailColumns = getDetailGridColumns(detailImages.length, isMobile);
  const selectedToolLabel = selectedItem
    ? TOOL_CONFIG.find((c) => c.id === selectedItem.tool_name)
    : null;

  return (
    <Box sx={HistoryStyles.page}>
      {selectedItem && (
        <Box
          sx={HistoryStyles.detailBackdrop}
          onClick={() => setSelectedItem(null)}
          role="presentation"
        >
          <Box
            sx={HistoryStyles.detailPanel}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <Box sx={HistoryStyles.detailHeader}>
              <Box sx={{ minWidth: 0 }}>
                {selectedToolLabel && (
                  <Typography component="span" sx={HistoryStyles.detailToolChip}>
                    {t(selectedToolLabel.labelKey)}
                  </Typography>
                )}
                <Typography sx={HistoryStyles.detailTitle}>
                  {detailTitle || t('history.generation')}
                </Typography>
              </Box>
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
                    className="cardImage"
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
                    <CloudDownloadIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    {t('removeBg.download')}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {zoomedIndex !== null && detailImages[zoomedIndex] && (
        <ZoomImage
          url={detailImages[zoomedIndex]}
          handleClose={() => setZoomedIndex(null)}
          images={detailImages.length > 1 ? detailImages : undefined}
          initialIndex={zoomedIndex}
        />
      )}

      <Typography component="h1" sx={HistoryStyles.title}>
        {t('history.title')}
      </Typography>
      <Typography component="span" sx={HistoryStyles.titleAccent}>
        {' '}
        {t('history.titleAccent')}
      </Typography>
      <Typography sx={HistoryStyles.subtitle}>{t('history.description')}</Typography>

      <Box sx={HistoryStyles.tabsWrap}>
        {TOOL_CONFIG.map(({ id, labelKey, icon: Icon }) => (
          <Box
            key={id}
            component="button"
            type="button"
            onClick={() => setTab(id)}
            sx={HistoryStyles.tabPill(tab === id)}
          >
            <Icon sx={{ fontSize: 18 }} />
            {t(labelKey)}
            {countsByTool[id] > 0 && (
              <Box
                component="span"
                sx={{
                  ml: 0.25,
                  fontSize: 11,
                  opacity: tab === id ? 0.85 : 0.6,
                }}
              >
                ({countsByTool[id]})
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {!loading && !isEmpty && (
        <Box sx={HistoryStyles.countBadge}>
          <PhotoLibraryOutlinedIcon sx={{ fontSize: 16 }} />
          {t('history.itemCount', { count: filtered.length })}
          {activeTool && ` · ${t(activeTool.labelKey)}`}
        </Box>
      )}

      {loading && (
        <Box sx={HistoryStyles.stateBox}>
          <CircularProgress size={36} sx={{ color: colors.ORANGE_LIGHT, mb: 2 }} />
          <Typography sx={{ color: colors.TEXT_GRAY }}>{t('history.loading')}</Typography>
        </Box>
      )}

      {!loading && isEmpty && (
        <Box sx={HistoryStyles.stateBox}>
          <Box sx={HistoryStyles.stateIconWrap}>
            <HistoryOutlinedIcon sx={{ fontSize: 32, color: colors.ORANGE_LIGHT }} />
          </Box>
          <Typography
            sx={{ color: colors.TEXT_WHITE, fontWeight: 700, fontSize: 18, mb: 1 }}
          >
            {t('history.empty')}
          </Typography>
          <Typography sx={{ color: colors.TEXT_GRAY, fontSize: 14, maxWidth: 360, mx: 'auto' }}>
            {t('history.emptyHint')}
          </Typography>
        </Box>
      )}

      {!loading && !isEmpty && (
        <Grid container spacing={2.5} sx={HistoryStyles.grid}>
          {filtered.map((item) => {
            const preview = getPreviewUrl(item);
            const images = getImagesFromItem(item);
            const subtitle = getSubtitle(item);
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <Box sx={HistoryStyles.card} onClick={() => setSelectedItem(item)}>
                  <Box sx={HistoryStyles.cardMedia}>
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
                          className="cardImage"
                          style={HistoryStyles.cardImage as React.CSSProperties}
                        />
                      )
                    )}
                    {images.length > 1 && (
                      <Box sx={HistoryStyles.imageCountChip}>
                        {t('history.imageCount', { count: images.length })}
                      </Box>
                    )}
                    <Box className="cardHoverOverlay" sx={HistoryStyles.cardHoverOverlay}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.75,
                          color: colors.TEXT_WHITE,
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
                        {t('history.viewDetails')}
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={HistoryStyles.cardBody}>
                    <Typography sx={HistoryStyles.cardDate}>
                      {formatDate(item.createdAt)}
                    </Typography>
                    {subtitle ? (
                      <Typography sx={HistoryStyles.cardPrompt}>{subtitle}</Typography>
                    ) : (
                      <Typography sx={{ ...HistoryStyles.cardPrompt, opacity: 0.5 }}>
                        {t('history.generation')}
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
