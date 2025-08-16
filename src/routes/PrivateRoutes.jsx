import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../hooks/UseAuth';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  // Use the useLocation hook to get the current location
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner text-accent"></span>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default PrivateRoutes;
