'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        // Redirect to role-specific dashboard
        switch (user.role) {
          case 'ADMIN':
            router.push('/dashboard/admin');
            break;
          case 'STAFF':
            router.push('/dashboard/staff');
            break;
          case 'STUDENT':
          default:
            router.push('/dashboard/student');
            break;
        }
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return null; // Redirection handled in useEffect
}
