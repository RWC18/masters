'use client';

import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useTranslation } from 'react-i18next';
import { CreditTransaction } from '../../redux/Actions/billingActions';
import TransactionsList from '../TransactionsList/TransactionsList';
import { TransactionsPopUpStyles } from './TransactionsPopUp.styles';

interface TransactionsPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: CreditTransaction[];
}

const TransactionsPopUp: React.FC<TransactionsPopUpProps> = ({
  isOpen,
  onClose,
  transactions,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Box
      sx={TransactionsPopUpStyles.backdrop(isOpen)}
      onClick={onClose}
      role="presentation"
    >
      <Box
        sx={TransactionsPopUpStyles.panel}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="transactions-popup-title"
      >
        <CancelIcon
          onClick={onClose}
          sx={TransactionsPopUpStyles.closeBtn}
          fontSize="large"
          aria-label="Close"
        />

        <Box sx={TransactionsPopUpStyles.header}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255, 140, 80, 0.15)',
              }}
            >
              <ReceiptLongIcon sx={{ color: 'primary.light', fontSize: 26 }} />
            </Box>
            <Box>
              <Typography id="transactions-popup-title" sx={TransactionsPopUpStyles.title}>
                {t('billing.recentTransactions')}
              </Typography>
              <Typography sx={TransactionsPopUpStyles.subtitle}>
                {t('billing.transactionsSubtitle', { count: transactions.length })}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={TransactionsPopUpStyles.list}>
          <TransactionsList
            transactions={transactions}
            emptyLabel={t('billing.transactionsEmpty')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionsPopUp;
