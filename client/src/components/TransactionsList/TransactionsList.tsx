'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { useTranslation } from 'react-i18next';
import { colors } from '../../constants/styles';
import { CreditTransaction } from '../../redux/Actions/billingActions';

const typeMeta = {
  purchase: {
    icon: AddCircleOutlineIcon,
    bg: 'rgba(76, 175, 80, 0.18)',
    color: '#6ee7a0',
    amountColor: '#6ee7a0',
  },
  spend: {
    icon: RemoveCircleOutlineIcon,
    bg: 'rgba(255, 120, 80, 0.15)',
    color: colors.ORANGE_LIGHT,
    amountColor: '#ff8a7a',
  },
  refund: {
    icon: ReplayIcon,
    bg: 'rgba(100, 181, 246, 0.15)',
    color: '#90caf9',
    amountColor: '#90caf9',
  },
} as const;

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
};

const toolLabelKey = (tool?: string) => {
  if (!tool) return null;
  const keys: Record<string, string> = {
    t2i: 'history.tabs.t2i',
    avatar: 'history.tabs.avatar',
    logo: 'history.tabs.logo',
    removebg: 'history.tabs.removebg',
  };
  return keys[tool] || null;
};

interface TransactionsListProps {
  transactions: CreditTransaction[];
  emptyLabel: string;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  emptyLabel,
}) => {
  const { t } = useTranslation();

  if (!transactions.length) {
    return (
      <Typography sx={{ py: 5, textAlign: 'center', color: colors.TEXT_GRAY }}>
        {emptyLabel}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {transactions.map((tx, index) => {
        const meta = typeMeta[tx.type] || typeMeta.spend;
        const Icon = meta.icon;
        const toolKey = toolLabelKey(tx.tool_name);
        const typeLabel = t(`billing.txType.${tx.type}`);
        const amountPrefix = tx.amount > 0 ? '+' : '';

        return (
          <Box
            key={tx._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              borderRadius: '14px',
              bgcolor: 'background.paper',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'border-color 0.2s, transform 0.2s',
              '&:hover': {
                borderColor: 'rgba(255, 140, 80, 0.35)',
                transform: 'translateY(-1px)',
              },
              animation: 'fadeIn 0.35s ease',
              animationDelay: `${Math.min(index, 8) * 40}ms`,
              animationFillMode: 'both',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(6px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: meta.bg,
                flexShrink: 0,
              }}
            >
              <Icon sx={{ fontSize: 22, color: meta.color }} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  color: colors.TEXT_WHITE,
                  fontWeight: 600,
                  fontSize: 15,
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {tx.reason}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.75,
                  mt: 0.5,
                  alignItems: 'center',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    px: 1,
                    py: 0.25,
                    borderRadius: '6px',
                    bgcolor: meta.bg,
                    color: meta.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {typeLabel}
                </Box>
                {toolKey && (
                  <Typography
                    component="span"
                    sx={{ fontSize: 12, color: colors.TEXT_GRAY }}
                  >
                    {t(toolKey)}
                  </Typography>
                )}
                <Typography
                  component="span"
                  sx={{ fontSize: 12, color: colors.TEXT_GRAY }}
                >
                  {formatDate(tx.createdAt)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: meta.amountColor,
                  lineHeight: 1.2,
                }}
              >
                {amountPrefix}
                {tx.amount}
              </Typography>
              <Typography sx={{ fontSize: 11, color: colors.TEXT_GRAY, mt: 0.25 }}>
                {t('billing.balance')}: {tx.balance_after}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default TransactionsList;
