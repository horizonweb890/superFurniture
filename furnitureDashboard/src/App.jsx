// src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './common/SideBar';
import { MainSidebar } from './common/MainSideBar';
import Navbar from './common/Navbar';
import Dashboard from './page/mainDashboard/Dashboard';
import LoginPage from './page/auth/Login';
import { AuthProvider } from './page/auth/AuthContext';
import ProtectedRoute from './page/auth/ProtectedRoute';
import CategoryPage from './page/category/form';
import Index from './page/items/Index';
import Contact from './page/contact/Contact';

export const request = "https://www.horizoncart.com";

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (token && isLoginPage) {
      navigate('/');
    }
  }, [token, isLoginPage, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {!isLoginPage && <MainSidebar />}
      <div className="flex-1 flex flex-col">
        {!isLoginPage && <Navbar />}
        <div className="p-4 flex-1 overflow-auto">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/category" element={<CategoryPage />} />
            <Route
              path="/items"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename="/sub">
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
