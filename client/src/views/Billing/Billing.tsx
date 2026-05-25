'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Grid, Typography } from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import LayersClearOutlinedIcon from '@mui/icons-material/LayersClearOutlined';
import HistoryIcon from '@mui/icons-material/History';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import CreditPacksPanel from '../../components/CreditPacksPanel/CreditPacksPanel';
import TransactionsPopUp from '../../components/TransactionsPopUp/TransactionsPopUp';
import { colors } from '../../constants/styles';
import { fetchWallet, WalletResponse } from '../../redux/Actions/billingActions';
import { useTranslation } from 'react-i18next';
import { BillingStyles } from './Billing.styles';

const USAGE_TOOLS = [
  {
    key: 't2i',
    titleKey: 'history.tabs.t2i',
    usageKey: 'billing.t2iUsage',
    icon: AutoAwesomeOutlinedIcon,
    tint: 'rgba(255, 140, 80, 0.15)',
  },
  {
    key: 'avatar',
    titleKey: 'history.tabs.avatar',
    usageKey: 'billing.avatarUsage',
    icon: FaceRetouchingNaturalOutlinedIcon,
    tint: 'rgba(120, 200, 255, 0.15)',
  },
  {
    key: 'logo',
    titleKey: 'history.tabs.logo',
    usageKey: 'billing.logoUsage',
    icon: DesignServicesOutlinedIcon,
    tint: 'rgba(180, 140, 255, 0.15)',
  },
  {
    key: 'removebg',
    titleKey: 'history.tabs.removebg',
    usageKey: 'billing.removeBgUsage',
    icon: LayersClearOutlinedIcon,
    tint: 'rgba(100, 220, 180, 0.15)',
  },
] as const;

const Billing = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useSelector((state: any) => state.main.user);
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [transactionsOpen, setTransactionsOpen] = useState(false);

  const loadWallet = useCallback(async () => {
    const data = await fetchWallet();
    if (!data) {
      setError(t('billing.loadError'));
    } else {
      setWallet(data);
      setError('');
    }
  }, [t]);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    loadWallet();
  }, [user, router, loadWallet]);

  if (!user) return null;

  const balance = wallet?.balance ?? user?.credits ?? 0;
  const transactions = wallet?.transactions || [];
  const txCount = transactions.length;

  return (
    <Box sx={BillingStyles.page}>
      <Box sx={{ mb: 1 }}>
        <Typography component="h1" sx={BillingStyles.title}>
          {t('billing.title')}
        </Typography>
        <Typography component="span" sx={BillingStyles.titleAccent}>
          {' '}
          & {t('billing.titleAccent')}
        </Typography>
      </Box>
      <Typography sx={BillingStyles.subtitle}>{t('billing.subtitle')}</Typography>

      <Grid container spacing={2} sx={BillingStyles.heroGrid}>
        <Grid item xs={12} md={8}>
          <Box sx={BillingStyles.balanceCard}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 2,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box>
                <Typography sx={BillingStyles.balanceLabel}>
                  {t('billing.currentBalance')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <Typography component="span" sx={BillingStyles.balanceValue}>
                    {balance}
                  </Typography>
                  <Typography component="span" sx={BillingStyles.balanceUnit}>
                    {t('billing.credits')}
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: colors.TEXT_GRAY, fontSize: 14, mt: 2, maxWidth: 360 }}
                >
                  {t('billing.balanceHint')}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(255, 140, 80, 0.18)',
                  flexShrink: 0,
                }}
              >
                <AccountBalanceWalletOutlinedIcon
                  sx={{ fontSize: 30, color: colors.ORANGE_LIGHT }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={BillingStyles.historyCard}
            onClick={() => setTransactionsOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setTransactionsOpen(true);
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  bgcolor: 'rgba(255, 140, 80, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HistoryIcon sx={{ color: colors.ORANGE_LIGHT }} />
              </Box>
              <Box>
                <Typography
                  sx={{ color: colors.TEXT_WHITE, fontWeight: 700, fontSize: 15 }}
                >
                  {t('billing.viewTransactions')}
                </Typography>
                <Typography sx={{ color: colors.TEXT_GRAY, fontSize: 13 }}>
                  {txCount > 0
                    ? t('billing.transactionsPreview', { count: txCount })
                    : t('billing.transactionsEmpty')}
                </Typography>
              </Box>
            </Box>
            <ChevronRightIcon sx={{ color: colors.ORANGE_LIGHT }} />
          </Box>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <ShoppingBagOutlinedIcon sx={{ color: colors.ORANGE_LIGHT, fontSize: 22 }} />
          <Typography sx={BillingStyles.sectionTitle}>
            {t('billing.packsTitle')}
          </Typography>
        </Box>
        <Typography sx={BillingStyles.sectionDesc}>
          {t('billing.packsSubtitle')}
        </Typography>
        <CreditPacksPanel
          packs={wallet?.packs || []}
          balance={balance}
          onBalanceChange={() => loadWallet()}
          onPurchaseError={(msg) => setError(msg)}
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <InfoOutlinedIcon sx={{ color: colors.ORANGE_LIGHT, fontSize: 22 }} />
          <Typography sx={BillingStyles.sectionTitle}>
            {t('billing.usageTitle')}
          </Typography>
        </Box>
        <Typography sx={{ ...BillingStyles.sectionDesc, mb: 2 }}>
          {t('billing.usageSubtitle')}
        </Typography>
        <Grid container spacing={2}>
          {USAGE_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={tool.key}>
                <Box sx={BillingStyles.usageCard}>
                  <Box sx={BillingStyles.usageIconWrap(tool.tint)}>
                    <Icon sx={{ fontSize: 22, color: colors.ORANGE_LIGHT }} />
                  </Box>
                  <Typography
                    sx={{ color: colors.TEXT_WHITE, fontWeight: 700, fontSize: 15 }}
                  >
                    {t(tool.titleKey)}
                  </Typography>
                  <Box component="span" sx={BillingStyles.usageCost}>
                    {t(tool.usageKey)}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <TransactionsPopUp
        isOpen={transactionsOpen}
        onClose={() => setTransactionsOpen(false)}
        transactions={transactions}
      />
    </Box>
  );
};

export default Billing;
