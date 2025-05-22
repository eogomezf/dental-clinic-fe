'use client';
import React, { useState } from 'react';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FormsTab from './FormsTab';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { SignInFormValues, SignUpFormValues } from './Forms.types';
import { Box, Paper, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';

const FormsWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (values: SignInFormValues) => {
    try {
      const { data } = await axios.post('http://localhost:4000/auth/signin', {
        email: values.email,
        password: values.password
      });
      document.cookie = `token=${data.token}; path=/`;
      document.cookie = `userId=${data.user._id}; path=/`;
      document.cookie = `role=${data.user.role}; path=/`;
      
      const appointmentsRes = await axios.get('http://localhost:4000/appointment', {
        headers: {
          'x-access-token': data.token,
        },
      });
  
      console.log('Appointments:', appointmentsRes.data); 
    } catch (err: AxiosError) {
      let errorMessage: string;
      if (err.response) {
        errorMessage = err.response.data?.message || 'Sign-in failed. Please try again.';
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection.';
      } else {
        errorMessage = 'An unexpected error occurred. Please try again.';
      }
      setError(errorMessage);
      console.error('Sign-in error:', errorMessage);
    }
  };

  const handleSignUp = (values: SignUpFormValues) => {
    console.log('Sign Up:', values);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: 'auto',
            width: '100%',
            maxWidth: '450px',
            gap: 2,
            mb: 4,
          }}
        >
          <Paper sx={{ padding: 0.5 }} elevation={1}>
            <HealthAndSafetyIcon
              sx={{
                fontSize: '2rem',
                color: 'primary.main',
              }}
            />
          </Paper>
          <Typography
            className="text-5xl font-bold text-sky-500 text-center"
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '2rem' },
              color: 'primary.main',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Dentora Pro
          </Typography>
        </Box>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <FormsTab
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
        >
          {activeTab === 0 ? (
            <SignInForm onSubmit={handleSignIn} />
          ) : (
            <SignUpForm onSubmit={handleSignUp} />
          )}
        </FormsTab>
      </Box>
    </Box>
  );
};

export default FormsWrapper;
