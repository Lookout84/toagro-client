import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@store/hooks';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};