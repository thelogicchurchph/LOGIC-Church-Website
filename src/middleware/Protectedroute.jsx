import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AdminAuthContext';
import Preloader from '../components/Proloader';

export default function ProtectedRoute({ children, redirectTo = '/forum/login' }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <Preloader />
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
}
