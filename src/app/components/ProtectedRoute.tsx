'use client';
import { useAuth } from '../auth/context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsChecked(true);
      if (!isAuthenticated) {
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isChecked) {
    return null; 
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
