import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ArtisanProfile, MOCK_USER } from '@/constants/mockData';
import { authService, LoginParams, SignUpParams, VerifyOTPParams } from '@/services/auth/authService';

interface AuthContextType {
  user: ArtisanProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (params: LoginParams) => Promise<{ success: boolean; message?: string }>;
  signup: (params: SignUpParams) => Promise<{ success: boolean; message?: string }>;
  verifyOTP: (params: VerifyOTPParams) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<ArtisanProfile>) => Promise<ArtisanProfile>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ArtisanProfile | null>(MOCK_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Sync current session state
    const currentUser = authService.getCurrentUser();
    const authed = authService.isAuthenticated();
    setUser(currentUser);
    setIsAuthenticated(authed);
  }, []);

  const login = async (params: LoginParams) => {
    setIsLoading(true);
    try {
      const res = await authService.login(params);
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (params: SignUpParams) => {
    setIsLoading(true);
    try {
      const res = await authService.signup(params);
      if (res.success && res.user) {
        setUser(res.user);
      }
      return { success: res.success, message: res.message };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (params: VerifyOTPParams) => {
    setIsLoading(true);
    try {
      const res = await authService.verifyOTP(params);
      if (res.success && res.user) {
        setUser(res.user);
        setIsAuthenticated(true);
      }
      return { success: res.success, message: res.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<ArtisanProfile>) => {
    const updated = await authService.updateProfile(updates);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        verifyOTP,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
