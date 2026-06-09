import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useSegments } from 'expo-router';

type AuthContextType = {
  signIn: (token: string, refreshToken?: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Load token from storage on boot
    async function loadToken() {
      try {
        const storedToken = await SecureStore.getItemAsync('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (e) {
        console.error('Failed to load token', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadToken();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!token && !inAuthGroup) {
      // Redirect to login
      router.replace('/login');
    } else if (token && inAuthGroup) {
      // Redirect to app
      router.replace('/(tabs)');
    }
  }, [token, segments, isLoading]);

  const signIn = async (newToken: string, newRefreshToken?: string) => {
    await SecureStore.setItemAsync('token', newToken);
    if (newRefreshToken) await SecureStore.setItemAsync('refreshToken', newRefreshToken);
    setToken(newToken);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('refreshToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoading, token }}>
      {children}
    </AuthContext.Provider>
  );
}
