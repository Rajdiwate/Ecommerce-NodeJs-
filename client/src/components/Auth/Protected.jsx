import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/customHooks/useAuth';

const Protected = ({ children }) => {
  const { isAuthenticated, loading , getCurrentUser} = useAuth()

  useEffect(()=>{
  } , [isAuthenticated])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default Protected;