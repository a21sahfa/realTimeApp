// App.jsx

import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './komponenter/navbar.jsx'; // Make sure Navbar is capitalized

import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import { axiosInstance } from './Lib/axios.js';
import { useAuthStore } from './store/useAuthStore.js';
import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast';
const App = () => {  // Rename from navbar to App
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });

  if(isCheckingAuth && !authUser) return (

    <div className='flex items-center justify-center h-screen'>
      <Loader className="size={10} animate-spin" />
    </div>
  );

  return (
    <div>
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={ authUser ?  <HomePage /> : <Navigate to="/login" />} />
        <Route path="/register" element={ !authUser ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ?  <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
