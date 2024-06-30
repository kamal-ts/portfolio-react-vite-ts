import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  // Define any additional props here if needed
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
