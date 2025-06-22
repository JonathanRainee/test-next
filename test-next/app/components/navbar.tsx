'use client'

import React from 'react';
import { AppBar, Box, Button, InputBase, Toolbar, Typography } from '@mui/material';
import { useUserContext } from '../context/userContext';
import { useRouter } from 'next/navigation';
import { logout } from '../services/authService';
import { NavBarProps } from '../types/navbarProps';

export default function NavBar({ productName, onSearchChange }: NavBarProps) {
  const router = useRouter();
  const {logoutUser} = useUserContext();

  function toCartPage(){
    router.push('../main')
  }

  const handleLogout = async () => {
    logoutUser();
    await logout();
    router.push('/');
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor:'pointer' }} onClick={()=>toCartPage()}>
          Cart Dashboard
        </Typography>

        <Box
          sx={{
            position: 'relative',
            borderRadius: 1,
            backgroundColor: '#f0f0f0',
            mr: 2,
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <InputBase
            placeholder="Search..."
            sx={{
              color: 'inherit',
              pl: 2,
              pr: 2,
              width: 300,
            }}
            value={productName}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Box>

        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
