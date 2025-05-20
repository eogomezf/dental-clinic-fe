'use client';
import React from 'react';
import { Formik, Form, useField } from 'formik';
import { SignInFormProps, SignInFormValues } from './Forms.types';
import { SignInSchema } from './ValidationSchemas';
import { Box, TextField, Button } from '@mui/material';

const MyTextField: React.FC<{
  name: string;
  label: string;
  type?: string;
}> = ({ label, type = 'text', ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      {...field}
      type={type}
      label={label}
      fullWidth
      variant="outlined"
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
          '& fieldset': {
            borderColor: 'primary.main',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'primary.main',
        },
      }}
    />
  );
};

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const initialValues: SignInFormValues = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={onSubmit}
    >
      <Form className="w-screen max-w-lg p-4 min-h-96">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            p: 3,
          }}
        >
          <MyTextField name="email" label="Email" />
          <MyTextField
            name="password"
            label="Password"
            type="password"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 2,
              mt: 2,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default SignInForm;
