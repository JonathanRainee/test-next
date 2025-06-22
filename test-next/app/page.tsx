'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormInput } from './types/loginTypes';
import { loginValidationSchemas } from './schemas/loginSchema';
import { useApiRequest } from './hooks/useApiRequest';
import { UserToken } from './types/authType';
import { useRouter } from 'next/navigation';
import { useUserContext } from './context/userContext';
import { loginUser } from './services/authService';
import Snackbar from './components/snackbar';


export default function Home() {


  const router = useRouter();
  const {sendRequest, data, error, loading} = useApiRequest<UserToken>();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const {setUser} = useUserContext();
  const { register, handleSubmit, formState: { errors,isSubmitting }} = useForm<loginFormInput>({
    resolver: yupResolver(loginValidationSchemas)
  });

  const onSubmit: SubmitHandler<loginFormInput> = async (form: loginFormInput) => {
    const user = await loginUser(form, sendRequest);
    if(user){
      setUser(user);
      router.push('/main')
      localStorage.setItem('loginSuccess', 'true');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('logoutSuccess') === 'true') {
      setOpenSnackbar(true);
      localStorage.removeItem('logoutSuccess');
    }
  }, []);


  return (
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
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
             sx={{
              '& input:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 1000px white inset',
                WebkitTextFillColor: 'black'
              },
              '& input:-webkit-focused': {
                WebkitBoxShadow: '0 0 0 1000px white inset',
                WebkitTextFillColor: 'black'
              }
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {(error) && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <Snackbar text='Logout successful!' open={openSnackbar} onClose={setOpenSnackbar}/>
      </Paper>
    </Box>
  );
}