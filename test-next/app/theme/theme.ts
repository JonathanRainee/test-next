'use client'

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 14,
    h6: { fontSize: '1.2rem' },
    body2: { fontSize: '0.9rem' },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          textAlign: 'center'
        },
      },
    },
  },
});

export default theme;
