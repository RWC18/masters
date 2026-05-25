'use client';

import React, { useMemo, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { colors } from '../../constants/styles';
import {
  CreditPack,
  purchasePack,
} from '../../redux/Actions/billingActions';
import { setUser } from '../../redux/Actions/mainActions';

interface CreditPacksPanelProps {
  packs: CreditPack[];
  balance: number;
  onBalanceChange?: (balance: number) => void;
  onPurchaseError?: (message: string) => void;
  compact?: boolean;
}

const CreditPacksPanel: React.FC<CreditPacksPanelProps> = ({
  packs,
  balance,
  onBalanceChange,
  onPurchaseError,
  compact = false,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.main.user);
  const [activePack, setActivePack] = useState<string | null>(null);

  const bestValueId = useMemo(() => {
    if (!packs.length) return null;
    let best = packs[0];
    let bestRate = best.price_usd / best.credits;
    for (const p of packs) {
      const rate = p.price_usd / p.credits;
      if (rate < bestRate) {
        bestRate = rate;
        best = p;
      }
    }
    return best.id;
  }, [packs]);

  if (!packs.length) {
    return (
      <Box
        sx={{
          py: 4,
          textAlign: 'center',
          borderRadius: '16px',
          border: '1px dashed rgba(255,255,255,0.15)',
        }}
      >
        <Typography sx={{ color: colors.TEXT_GRAY }}>
          {t('billing.noPacks')}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {packs.map((pack) => {
        const isBest = pack.id === bestValueId;
        const perCredit = (pack.price_usd / pack.credits).toFixed(3);

        return (
          <Grid item xs={12} sm={6} md={compact ? 6 : 3} key={pack.id}>
            <Box
              sx={{
                position: 'relative',
                height: '100%',
                p: 2.5,
                borderRadius: '20px',
                bgcolor: 'background.paper',
                border: isBest
                  ? '1px solid rgba(255, 140, 80, 0.5)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: isBest
                  ? '0 16px 40px rgba(255, 100, 50, 0.12)'
                  : 'none',
                background: isBest
                  ? 'linear-gradient(160deg, rgba(255,140,80,0.1) 0%, transparent 55%)'
                  : 'background.paper',
                transition: 'transform 0.25s, box-shadow 0.25s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.2)',
                },
              }}
            >
              {isBest && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1,
                    py: 0.35,
                    borderRadius: '999px',
                    bgcolor: 'rgba(255, 140, 80, 0.2)',
                    border: '1px solid rgba(255, 140, 80, 0.4)',
                  }}
                >
                  <LocalOfferOutlinedIcon
                    sx={{ fontSize: 14, color: colors.ORANGE_LIGHT }}
                  />
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: colors.ORANGE_LIGHT,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {t('billing.bestValue')}
                  </Typography>
                </Box>
              )}

              <Typography
                sx={{
                  fontSize: { xs: 32, md: 36 },
                  fontWeight: 800,
                  color: colors.ORANGE_LIGHT,
                  lineHeight: 1,
                  mt: isBest ? 2 : 0,
                }}
              >
                {pack.credits}
              </Typography>
              <Typography
                sx={{
                  color: colors.TEXT_GRAY,
                  fontSize: 13,
                  fontWeight: 600,
                  mb: 1.5,
                }}
              >
                {t('billing.credits')}
              </Typography>

              <Typography
                sx={{
                  color: colors.TEXT_WHITE,
                  fontSize: 22,
                  fontWeight: 700,
                  mb: 0.5,
                }}
              >
                ${pack.price_usd.toFixed(2)}
              </Typography>
              <Typography
                sx={{ color: colors.TEXT_GRAY, fontSize: 12, mb: 2 }}
              >
                {t('billing.perCredit', { price: perCredit })}
              </Typography>

              <Button
                title={t('billing.buyNow')}
                handleClick={async () => {
                  setActivePack(pack.id);
                  const res = await purchasePack(pack.id);
                  setActivePack(null);
                  if (res.ok) {
                    const nextBalance =
                      typeof res.balance === 'number' ? res.balance : balance;
                    if (user) {
                      dispatch<any>(
                        setUser({ ...user, credits: nextBalance })
                      );
                    }
                    onBalanceChange?.(nextBalance);
                  } else {
                    onPurchaseError?.(
                      res.message || t('billing.purchaseError')
                    );
                  }
                }}
                textColor={colors.TEXT_DARK}
                bgColor={colors.ORANGE_ACTIVE}
                hoverColor={colors.ORANGE_LIGHT}
                isDisabled={!!activePack}
                isLoading={activePack === pack.id}
                styles={{ width: '100%' }}
              />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CreditPacksPanel;
