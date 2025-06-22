import React from 'react'
import { SnackbarProps } from '../types/snackBarProps'
import { Snackbar as MuiSnackbar } from '@mui/material';

export default function Snackbar({text, open, onClose,}:SnackbarProps){
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => onClose(false)}
      message={text}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    />
  )
}