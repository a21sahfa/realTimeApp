// App.jsx

import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './komponenter/navbar.jsx';

import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

import { axiosInstance } from './lib/axios.js';
import { useAuthStore } from './store/useAuthStore.js';

import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <Loader className="w-10 h-10 animate-spin text-gray-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </div>
  );
};

export default App;
