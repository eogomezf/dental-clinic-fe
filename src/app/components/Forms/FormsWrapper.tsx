'use client';
import React, { useEffect, useState, useTransition } from 'react';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useActionState } from 'react';
import { useAuth } from '../../auth/context';
import FormsTab from './FormsTab';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import type { SignInFormValues, SignUpFormValues } from './Forms.types';
import { Box, Paper, Typography } from '@mui/material';
import { signInAction } from '../../login/server-actions';
import { useRouter } from 'next/navigation';

const FormsWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated, isLoading } = useAuth();
  const [state, formAction, isPending] = useActionState(signInAction, { success: false, error: null, user: undefined });
  const [isSubmitting, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/appointments');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (state.success && state.user) {
      login(state.user);
    } else if (state.error) {
      let errorMessage: string = state.error;
      if (errorMessage === 'Failed to fetch') {
        errorMessage = 'Network error. Please check your connection.';
      } else if (errorMessage.includes('Invalid credentials') || errorMessage.includes('email provided does not match')) {
        errorMessage = 'Invalid email or password';
      } else {
        errorMessage = 'An unexpected error occurred. Please try again.';
      }
      setError(errorMessage);
    }
  }, [state, login]);
  
  const handleSignIn = async (values: SignInFormValues) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    startTransition(() => {
      formAction(formData);
    });
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
            <SignInForm onSubmit={handleSignIn}  isSubmitting={isPending || isSubmitting} />
          ) : (
            <SignUpForm onSubmit={handleSignUp} />
          )}
        </FormsTab>
      </Box>
    </Box>
  );
};

export default FormsWrapper;
