'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '../../utils/api';

type AuthContextType = {
  isAuthenticated: boolean;
  user: { id: string; email: string; role?: string } | null;
  token: string | null;
  login: (user: { id: string; email: string; role?: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; email: string; role?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch('/api/auth/token', { credentials: 'include' });
        if (response.ok) {
          const { token } = await response.json();
          setToken(token);
        }
      } catch (err) {
        console.error('Failed to fetch token:', err);
      }
    };
    getToken();
  }, []);

  const login = (newUser: { id: string; email: string; role?: string }) => {
    setUser(newUser);
    router.push('/appointments');
  };

  const logout = async () => {
    await fetchAPI('/auth/logout', 'POST');
    setToken(null);
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
