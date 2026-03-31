import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setCookie, getCookie, removeCookie } from '../api/cookies';
import { authService } from '../api/authService';
import api from "../api/axios"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [ user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const fetchUser = useCallback(async () => {
    const token = getCookie('token');
    if(!token){
       setLoading(false);
      return null;
    }
    setLoading(true);
    try{
        const userProfile = await api.get('/user/profile');
        setUser(userProfile.user || userProfile); // Interceptor returns .data naturally 
    }
    catch(err){
      console.error(err);
      return null;
    }
    finally{
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(email, password);
      const token = response?.token ?? response?.data?.token ?? response?.accessToken ?? response?.data?.accessToken;
      const adminData = response?.admin ?? response?.data?.admin ?? null;

      if (!token) {
        throw new Error('Login response missing token');
      }

      setCookie('token', token, {
        expires: 7,
        sameSite: 'Strict',
        secure: typeof window !== 'undefined' && window.location.protocol === 'https:'
      });
      setAdmin(adminData || { id: 'dev', name: 'Admin', role: 'admin' });
      setUser(adminData || { id: 'dev', name: 'Admin', role: 'admin' });
      toast.success('Login successful!');
      setLoading(false);
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      throw new Error(errorMsg);
    }
  };

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      removeCookie('token');
      setAdmin(null);
      setError(null);
      setLoading(false);
    }
  }, []);



  const value = {
    admin,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    setAdmin,
    user, setUser
  };

  return (
    <AuthContext.Provider value={value}>
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

export default AuthContext;
