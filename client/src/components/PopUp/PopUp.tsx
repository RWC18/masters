import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { PopUpStyles } from './PopUp.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopUp = ({ isOpen, onClose, children }: Props) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <Box sx={PopUpStyles.container(isOpen)} onClick={onClose} aria-hidden />
      <Box
        sx={PopUpStyles.content(isOpen)}
        role="presentation"
        onClick={onClose}
      >
        <Box
          sx={PopUpStyles.panel}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <Box sx={PopUpStyles.actions}>
            <CancelIcon
              onClick={onClose}
              sx={PopUpStyles.cancelIcon}
              fontSize="large"
              aria-label="Close"
            />
          </Box>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default PopUp;
