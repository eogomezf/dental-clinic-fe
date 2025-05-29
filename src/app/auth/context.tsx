'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '../../utils/api';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { id: string; email: string; role?: string } | null;
  token: string | null;
  login: (user: { id: string; email: string; role?: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; email: string; role?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch('/api/auth/token', { credentials: 'include' });
        if (response.ok) {
          const { token } = await response.json();
          setToken(token);
        } else {
          setToken(null);
        }
      } catch (err) {
        console.error('Failed to fetch token:', err);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    getToken();
  }, []);

  const login = (newUser: { id: string; email: string; role?: string }) => {
    setUser(newUser);
    setIsLoading(false);
    router.push('/appointments');
  };

  const logout = async () => {
    try {
      await fetchAPI('/auth/logout', 'POST');
    } catch (err) {
      console.error('Logout failed:', err);
    }
    setToken(null);
    setUser(null);
    setIsLoading(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, isLoading, user, token, login, logout }}>
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
