import React, { useEffect } from 'react'

import { Box } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';

import { PopUpStyles } from './PopUp.styles'

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

  return (
    <>
    <Box sx={PopUpStyles.container(isOpen)}/>
    <Box sx={PopUpStyles.content(isOpen)} role="dialog" aria-modal="true">
        <Box sx={PopUpStyles.actions}>
            <CancelIcon onClick={onClose} sx={PopUpStyles.cancelIcon} fontSize='large' aria-label="Close" />
        </Box>
        {isOpen && children}
    </Box>
    </>
   
  )
}

export default PopUp