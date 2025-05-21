'use client';
import Image from 'next/image';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Stack,
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {

  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const router = useRouter();

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:4000/auth/signin', {
        email,
        password,
      });
      document.cookie = `token=${data.token}; path=/`;
      document.cookie = `userId=${data.user._id}; path=/`;
      document.cookie = `role=${data.user.role}; path=/`;
      router.push('/appointment');
    } catch (error) {
      setApiError(error.response?.data?.message || 'An error occurred. Sign-in failed');
    }
  };

  return (
    <Container className="flex flex-col items-center h-screen justify-center min-h-screen p-4 ">
      <Stack
        display={'flex'}
        direction={'row'}
        className="items-center justify-between gap-2 w-full"
      >
        <Box className="hidden h-full w-0 sm:w-[30%] md:w-[50%] lg:w-full md:flex items-center justify-center  transition-all duration-500 ease-in-out">
          <Image
            aria-hidden
            src="/dentora-pro-login-screen.png"
            alt="Dentora Pro Logon Screen"
            priority
            width={515}
            height={785}
            className="
            border rounded-lg
      transition-all duration-500 ease-in-out
      lg:opacity-100
      md:opacity-50
      sm:opacity-30
      opacity-0
      md:hover:opacity-85
      md:hover:scale-95
      md:hover:border-4
      md:hover:border-sky-500
      md:hover:rounded-4xl
        lg:translate-x-0
      md:translate-x-[-50%]
      sm:translate-x-[-100%]
    "
          />
        </Box>
        <Stack
          display={'flex'}
          direction={'column'}
          spacing={1}
          justifyContent={'center'}
          alignItems={'center'}
          className="h-screen w-full flex items-center justify-center"
          sx={{
            backgroundImage: {
              sm: 'url(/dentora-pro-login-screen-02.png)',
              md: 'none',
            },
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {showLogin ? (
            <Box className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
              <Typography variant="h5" className="text-center mb-4">
                Sign in to Dentora Pro
              </Typography>
              <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  fullWidth
                  margin="normal"
                />
                {apiError && (
                  <Typography color="error" variant="body2" className="text-center">
                    {apiError}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<LoginIcon />}
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => setShowLogin(false)}
                  className="mt-2"
                >
                  Back
                </Button>
              </form>
            </Box>
          ) : (
            <>
              <Box className="flex items-center gap-2">
                <Paper sx={{ padding: 0.5 }} elevation={1}>
                  <HealthAndSafetyIcon
                    sx={{
                      fontSize: '3rem',
                    }}
                  />
                </Paper>
                <Typography
                  className="text-5xl font-bold text-sky-500 text-center"
                  variant="h3"
                  component="h1"
                  fontWeight={700}
                  fontSize={'3rem'}
                  fontFamily={'var(--font-inter)'}
                >
                  Dentora Pro
                </Typography>
              </Box>
              <Box className="flex flex-col items-center justify-center">
                <Typography
                  variant="body1"
                  fontFamily={'var(--font-inter)'}
                  sx={{ width: '100%', maxWidth: '600px' }}
                  textAlign={'center'}
                  fontSize={'1rem'}
                  color={'#ffffff'}
                  fontWeight={400}
                  className="text-center"
                  marginTop={2}
                  marginBottom={4}
                >
                  Dentora Pro is a powerful and flexible web application designed to streamline appointment management for dental clinics, offering an intuitive and efficient scheduling experience.
                </Typography>
                <Box className="flex gap-4">
                  <Button
                    onClick={() => setShowLogin(true)}
                    className="mt-4"
                    variant="outlined"
                    startIcon={<LoginIcon />}
                    sx={{ color: '#ffffff', borderColor: '#ffffff' }}
                  >
                    Login
                  </Button>
                  <Button
                    href="/signup"
                    className="mt-4"
                    variant="outlined"
                    startIcon={<HowToRegIcon />}
                    sx={{ color: '#ffffff', borderColor: '#ffffff' }}
                  >
                    Sign up
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Stack>
      </Stack>
      <footer className="absolute bottom-0 right-0 left-0 flex items-center justify-center"></footer>
      <AppBar
        position="fixed"
        sx={{ top: 'auto', bottom: 0 }}
        color="transparent"
      >
        <Toolbar>
          <Typography
            variant="body2"
            style={{
              display: 'flex',
              textAlign: 'center',
              gap: '0.5rem',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              fontFamily: 'var(--font-inter-ui)',
              fontSize: '0.875rem',
              fontWeight: 400,
              color: '#ffffff',
            }}
          >
            © {new Date().getFullYear()} Proudly created by
            <a
              className="pl- flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://codecrafterslabs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              codecrafterslabs.com →
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
