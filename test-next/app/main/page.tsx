'use client';

import { Button, Box, Typography, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';
import ProtectedRoute from '../components/protectedRoute';

export default function MainPage() {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {user, logout} = useUser();

  useEffect(() => {
    if (localStorage.getItem('loginSuccess') === 'true') {
      setOpenSnackbar(true);
      localStorage.removeItem('loginSuccess');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loginSuccess'); 
    localStorage.setItem('logoutSuccess', 'true');
    router.push('/');
  };

  return (
    <ProtectedRoute>

      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Button variant="contained" color="error" onClick={logout}>
          Logout
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          message="Login successful!"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
      </Box>
    </ProtectedRoute>
  );
}
