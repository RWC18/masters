'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CreditPacksPanel from '../CreditPacksPanel/CreditPacksPanel';
import { fetchWallet, WalletResponse } from '../../redux/Actions/billingActions';
import { closePaymentPopUp } from '../../redux/Actions/mainActions';
import { PaymentPopUpStyles } from './PaymentPopUp.styles';

const PaymentPopUp: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.main.paymentPopUpOpen);
  const meta = useSelector((state: any) => state.main.paymentPopUpMeta);
  const user = useSelector((state: any) => state.main.user);

  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    if (!isOpen) return;
    loadWallet();
  }, [isOpen, loadWallet]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch<any>(closePaymentPopUp());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dispatch]);

  const balance = wallet?.balance ?? meta?.balance ?? user?.credits ?? 0;
  const required = meta?.required;

  const handleClose = () => {
    dispatch<any>(closePaymentPopUp());
  };

  return (
    <Box
      sx={PaymentPopUpStyles.backdrop(isOpen)}
      onClick={handleClose}
      role="presentation"
    >
      <Box
        sx={PaymentPopUpStyles.panel}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-popup-title"
      >
        <CancelIcon
          onClick={handleClose}
          sx={PaymentPopUpStyles.closeBtn}
          fontSize="large"
          aria-label="Close"
        />
        <Typography id="payment-popup-title" sx={PaymentPopUpStyles.title}>
          {t('payment.title')}
        </Typography>
        <Typography sx={PaymentPopUpStyles.subtitle}>
          {required
            ? t('payment.subtitleRequired', {
                required,
                balance,
              })
            : t('payment.subtitle')}
        </Typography>

        <Paper
          sx={{
            p: 2,
            mb: 2,
            bgcolor: 'background.paper',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            {t('billing.currentBalance')}
          </Typography>
          <Typography sx={PaymentPopUpStyles.balance}>
            {balance} {t('billing.credits')}
          </Typography>
        </Paper>

        {error && (
          <Typography sx={PaymentPopUpStyles.error}>{error}</Typography>
        )}

        {!loading && (
          <CreditPacksPanel
            packs={wallet?.packs || []}
            balance={balance}
            onBalanceChange={(next) => {
              setWallet((prev) =>
                prev ? { ...prev, balance: next } : prev
              );
              setError('');
            }}
            onPurchaseError={(msg) => setError(msg)}
          />
        )}

        {loading && (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
            {t('payment.loading')}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PaymentPopUp;
