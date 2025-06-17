// components/FormsTab.tsx
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface FormsTabProps {
  children: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const FormsTab: React.FC<FormsTabProps> = ({
  children,
  value,
  onChange,
}) => {
  return (
    <div className="relative items-center justify-center flex flex-col overflow-hidden h-full max-h-screen w-full">
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '450px',
          marginTop: '4',
        }}
      >
        <Tabs
          value={value}
          onChange={onChange}
          variant="fullWidth"
          aria-label="sign in and sign up tabs"
          sx={{
            '& .MuiTab-root': {
              padding: '12px 16px',
              minWidth: '200px',
              width: '50%',
              fontSize: '1rem',
              fontWeight: 600,
            },
          }}
        >
          <Tab
            label="Sign In"
            data-testid="sign-in-tab"
            className="font-medium w-full text-2xl"
            sx={{
              color: value === 0 ? 'yellow' : 'gray',
              width: '100%',
              textAlign: 'center',
            }}
          />
          <Tab
            label="Sign Up"
            data-testid="sign-up-tab"
            className="font-medium"
            sx={{
              color: value === 1 ? 'yellow' : 'gray',
              width: '100%',
              textAlign: 'center',
            }}
          />
        </Tabs>
      </Box>
      <Box sx={{ padding: 3 }}>{children}</Box>
    </div>
  );
};

export default FormsTab;
