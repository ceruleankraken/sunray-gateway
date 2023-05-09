import AppLayout from "@/layout/AppLayout"
import BottomBarComponent from "@/layout/BottomBar"
import { Box, Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { LoginFormPropsRequest, useLogin } from "@/hooks/auth/use-login";
import { useSelector } from 'react-redux';
import { getAccessToken } from "@/stores/features/auth.slice";
import { LoadingButton } from "@mui/lab";

const SignInPage: NextPage = () => {
  
  const accessToken = useSelector(getAccessToken);
  const router = useRouter();

  useEffect(() => {
    if ((!!accessToken === true) && router.pathname !== '/')
      router.replace('/login', undefined, { shallow: true });
  }, [(!!accessToken === true), '/login', router]);


  const { mutate: submitLogin, isLoading } = useLogin();
  
  // const router = useRouter();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });

    const formData: LoginFormPropsRequest = {
      username: data.get('username')?.toString() || '',
      password: data.get('password')?.toString() || ''
    }
    submitLogin(formData);

    // router.replace('/');
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              fullWidth
              type    = "submit"
              loading = {isLoading}
              variant = "contained"
              sx      = {{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2"> */}
                <Link href="#">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" align="center" marginTop={5}>
              {'Copyright © '}
              <Link href="https://mui.com/">
                Your Website
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default SignInPage;