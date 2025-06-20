'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, SnackbarCloseReason, Snackbar, IconButton } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormInput } from './types/loginTypes';
import { loginValidationSchemas } from './schemas/loginSchema';
import { useApiRequest } from './hooks/useApiRequest';
import { UserResponse } from './response/userResponse';
import { useRouter } from 'next/navigation';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useUser } from './context/userContext';


export default function Home() {


  const router = useRouter();
  const {sendRequest, data, error, loading} = useApiRequest<UserResponse[]>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const {setUser} = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginFormInput>({
    resolver: yupResolver(loginValidationSchemas)
  });


  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const onSubmit: SubmitHandler<loginFormInput> = async (form: loginFormInput) => {
    console.log('Logging in with:', form);
    const res = await sendRequest({
      method: 'GET',
      url: 'https://fakestoreapi.com/users'
    })
    if(res){
      const users = res.data as UserResponse[];
      const foundUser = res.data.find(
        (user) => user.username === form.username && user.password === form.password
      )
      
      if(foundUser){
        console.log("users: ", foundUser)
        router.push('/main')
        localStorage.setItem('loginSuccess', 'true');
        setUser(foundUser);
        
      }else{
        setLoginError("Wrong credentials");
      }
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

          {(error || loginError) && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error || loginError}
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
        
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Logout successful!"
        />
      </Paper>
    </Box>
  );
}