"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface ProfileRequiredRouteProps {
  children: React.ReactNode;
}

export default function ProfileRequiredRoute({ children }: ProfileRequiredRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && user && !user.profileCompleted) {
      // If user is authenticated but profile not completed, redirect to profile edit
      if (pathname !== '/profileEdit' && pathname !== '/userProfile/profileEdit') {
        router.push('/profileEdit');
      }
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect from AuthContext
  }

  if (!user.profileCompleted && pathname !== '/profileEdit' && pathname !== '/userProfile/profileEdit') {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
