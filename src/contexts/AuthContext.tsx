"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from '@/lib/axios'; // Importing the axios instance
interface User {
  id: string;
  name: string | null;
  email: string;
 // role: string;
 // profileCompleted?: boolean;
}
const DEV_MODE = true; // Set to false to re-enable real authentication
const MOCK_USER = {
  id: 'dev-user-123',
  name: 'Development User',
  email: 'd.com',
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/auth/login', '/auth/signup', '/'];



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEV_MODE ? MOCK_USER : null); //null
  const [loading, setLoading] = useState(!DEV_MODE);
  const router = useRouter();
  const pathname = usePathname();

  // const checkAuth = async () => 
  //   try {
  //     const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/verify', {
      
  //     });
      
  //     if (response.data.ok) {
  //       setUser(response.data.data);
  //     } else {
  //       setUser(null);
  //     }
    
  //   } catch (error) {
  //     console.log('Auth check failed:', error);
  //     setUser(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // Redirect logic
  useEffect(() => {
    if (!loading) {
      const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
      
      if (!user && !isPublicRoute) {
        // User is not authenticated and trying to access protected route
        router.push('/auth/login');
      } else if (user && (pathname === '/auth/login' || pathname === '/auth/signup')) {
        // User is authenticated but on login/signup page
        router.push('/dashboard');
      }
    }
  }, [user, loading, pathname, router]);

  const login = async (email: string, password: string): Promise<boolean> => {
       if (DEV_MODE) {
      console.log("Login function called in dev mode. No action taken.");
      setUser(MOCK_USER); // Ensure mock user is set
      router.push('/dashboard');
      return true;
    }
    try {
     

      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
        email,
        password,
        
      }, );
      
      
      if (response.data.ok) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
        setUser(response.data.data);
        return true;
      } else {
        return false;
      }
      
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
      if (DEV_MODE) {
      console.log("Logout function called in dev mode. No action taken.");
      setUser(null); // Clear the mock user
      router.push('/auth/login');
      return;
    }
    try {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/logout', {}, {
        
      });
      localStorage.removeItem('accessToken'); // Clear access token on logout
      

    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      router.push('/auth/login');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
