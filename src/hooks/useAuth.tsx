import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';
import { userStorage } from '../utils/storage';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = userStorage.get();
    setUser(savedUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - in real app, this would be an API call
    if (email === 'admin@dentalcenter.com' && password === 'admin123') {
      const demoUser: User = {
        id: '1',
        email,
        firstName: 'Dr. John',
        lastName: 'Smith',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      
      setUser(demoUser);
      userStorage.set(demoUser);
      return true;
    }

    if(email === 'vikasgup074@gmail.com' && password === '12345678') {
      const demoUser: User = {
        id: '2',
        email,
        firstName: 'Dr. Vikas',
        lastName: 'Gupta',
        role: 'dentist',
        createdAt: new Date().toISOString(),
      };
      
      setUser(demoUser);
      userStorage.set(demoUser);
      return true;
    }
  
    return false;
  };

  const logout = (): void => {
    setUser(null);
    userStorage.clear();
  };

  return {
    user,
    isLoading,
    login,
    logout,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};