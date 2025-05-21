import React from 'react';
import { Formik, Form } from 'formik';
import { SignUpFormProps, SignUpFormValues } from './Forms.types';
import { SignUpSchema } from './ValidationSchemas';
import { Button, Box, Stack } from '@mui/material';
import { CustomTextField } from './CustomTextField';

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const initialValues: SignUpFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUpSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="w-screen max-w-lg p-4 min-h-96">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              p: 3,
            }}
          >
            <Stack direction="row" spacing={2}>
              <CustomTextField
                name="firstName"
                label="First Name"
                type="text"
              />
              <CustomTextField
                name="lastName"
                label="Last Name"
                type="text"
              />
            </Stack>
            <CustomTextField
              name="email"
              label="Email"
              type="email"
            />
            <CustomTextField
              name="password"
              label="Password"
              type="password"
            />
            <CustomTextField
              name="confirmPassword"
              label="Confirm Password"
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
              Sign Up
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
