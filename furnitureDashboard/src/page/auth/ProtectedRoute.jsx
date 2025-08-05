// src/page/auth/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If there is a token, render the protected component
  return children;
};

export default ProtectedRoute;
