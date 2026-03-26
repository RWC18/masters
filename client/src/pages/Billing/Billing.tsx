import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import { colors } from '../../constants/styles';
import { fetchWallet, purchasePack, WalletResponse } from '../../redux/Actions/billingActions';
import { setUser } from '../../redux/Actions/mainActions';
import { useTranslation } from 'react-i18next';

const Billing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.main.user);
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activePack, setActivePack] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const loadWallet = useCallback(async () => {
    setLoading(true);
    const data = await fetchWallet();
    if (!data) {
      setError(t('billing.loadError'));
    } else {
      setWallet(data);
      setError('');
    }
    setLoading(false);
  }, [t]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadWallet();
  }, [user, navigate, loadWallet]);

  if (!user) return null;

  return (
    <Box sx={{ maxWidth: 1100, margin: '0 auto', px: 2, pb: 6 }}>
      <Typography sx={{ fontSize: { xs: 28, md: 42 }, fontWeight: 800, color: colors.ORANGE_LIGHT, mb: 1 }}>
        {t('billing.title')}
      </Typography>
      <Typography sx={{ color: colors.TEXT_GRAY, mb: 3 }}>
        {t('billing.subtitle')}
      </Typography>

      <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.08)' }}>
        <Typography sx={{ color: colors.TEXT_GRAY, fontSize: 14 }}>{t('billing.currentBalance')}</Typography>
        <Typography sx={{ color: colors.ORANGE_LIGHT, fontSize: 34, fontWeight: 800 }}>
          {wallet?.balance ?? user?.credits ?? 0} {t('billing.credits')}
        </Typography>
      </Paper>

      {error && (
        <Typography sx={{ color: '#ff6666', mb: 2 }}>{error}</Typography>
      )}

      <Grid container spacing={2}>
        {(wallet?.packs || []).map((pack) => (
          <Grid item xs={12} sm={6} md={3} key={pack.id}>
            <Paper sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: colors.ORANGE_LIGHT }}>
                {pack.credits} {t('billing.credits')}
              </Typography>
              <Typography sx={{ color: colors.TEXT_GRAY, mb: 2 }}>
                ${pack.price_usd.toFixed(2)}
              </Typography>
              <Button
                title={t('billing.buyNow')}
                handleClick={async () => {
                  setActivePack(pack.id);
                  const res = await purchasePack(pack.id);
                  setActivePack(null);
                  if (res.ok) {
                    const nextBalance = typeof res.balance === 'number' ? res.balance : wallet?.balance || 0;
                    dispatch<any>(setUser({ ...user, credits: nextBalance }));
                    loadWallet();
                  } else {
                    setError(res.message || t('billing.purchaseError'));
                  }
                }}
                textColor={colors.TEXT_DARK}
                bgColor={colors.ORANGE_ACTIVE}
                hoverColor={colors.ORANGE_LIGHT}
                isDisabled={loading}
                isLoading={activePack === pack.id}
                styles={{ width: '100%' }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography sx={{ color: colors.ORANGE_LIGHT, fontSize: 20, fontWeight: 700, mb: 1 }}>
          {t('billing.usageTitle')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Typography sx={{ color: colors.TEXT_WHITE, fontWeight: 700 }}>{t('history.tabs.t2i')}</Typography>
              <Typography sx={{ color: colors.TEXT_GRAY }}>{t('billing.t2iUsage')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Typography sx={{ color: colors.TEXT_WHITE, fontWeight: 700 }}>{t('history.tabs.avatar')}</Typography>
              <Typography sx={{ color: colors.TEXT_GRAY }}>{t('billing.avatarUsage')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Typography sx={{ color: colors.TEXT_WHITE, fontWeight: 700 }}>{t('history.tabs.logo')}</Typography>
              <Typography sx={{ color: colors.TEXT_GRAY }}>{t('billing.logoUsage')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Typography sx={{ color: colors.TEXT_WHITE, fontWeight: 700 }}>{t('history.tabs.removebg')}</Typography>
              <Typography sx={{ color: colors.TEXT_GRAY }}>{t('billing.removeBgUsage')}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography sx={{ color: colors.ORANGE_LIGHT, fontSize: 20, fontWeight: 700, mb: 1 }}>
          {t('billing.recentTransactions')}
        </Typography>
        {(wallet?.transactions || []).slice(0, 12).map((tx) => (
          <Paper key={tx._id} sx={{ p: 1.5, mb: 1, bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Typography sx={{ color: colors.TEXT_WHITE, fontSize: 14 }}>
              {tx.reason} - {tx.amount > 0 ? `+${tx.amount}` : tx.amount} {t('billing.credits')} - {t('billing.balance')}: {tx.balance_after}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Billing;

