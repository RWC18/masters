import React from 'react'

import { Box } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';

import { PopUpStyles } from './PopUp.styles'

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const PopUp = ({ isOpen, onClose, children }: Props) => {
  return (
    <>
    <Box sx={PopUpStyles.container(isOpen)}/>
    <Box sx={PopUpStyles.content(isOpen)}>
        <Box sx={PopUpStyles.actions}>
            <CancelIcon onClick={onClose} sx={PopUpStyles.cancelIcon} fontSize='large' />
        </Box>
        {children}
    </Box>
    </>
   
  )
}

export default PopUp