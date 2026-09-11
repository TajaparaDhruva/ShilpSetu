import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER } from '@/constants/mockData';
import { authService } from '@/services/auth/authService';import { jsx as _jsx } from "react/jsx-runtime";












const AuthContext = /*#__PURE__*/createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(MOCK_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Sync current session state
    const currentUser = authService.getCurrentUser();
    const authed = authService.isAuthenticated();
    setUser(currentUser);
    setIsAuthenticated(authed);
  }, []);

  const login = async (params) => {
    setIsLoading(true);
    try {
      const res = await authService.login(params);
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (params) => {
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

  const verifyOTP = async (params) => {
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

  const updateProfile = async (updates) => {
    const updated = await authService.updateProfile(updates);
    setUser(updated);
    return updated;
  };

  return (/*#__PURE__*/
    _jsx(AuthContext.Provider, {
      value: {
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        verifyOTP,
        logout,
        updateProfile
      }, children:

      children }
    ));

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};