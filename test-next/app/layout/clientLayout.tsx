'use client'; 

import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { UserProvider } from '../context/userContext';
import theme from '../theme/theme';
import { ProductProvider } from '../context/productContext';
import { CartProvider } from '../context/cartContext';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            {children}
          </ProductProvider>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
