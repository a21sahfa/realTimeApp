// App.jsx

import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './komponenter/navbar.jsx'; // Navigationsfältet (syns överallt)

import HomePage from './pages/HomePage.jsx';         // Startsidan
import RegisterPage from './pages/RegisterPage.jsx'; // Registreringssida
import LoginPage from './pages/LoginPage.jsx';       // Inloggningssida
import ProfilePage from './pages/ProfilePage.jsx';   // Profil-sida
import SettingsPage from './pages/SettingsPage.jsx'; // Inställningar

import { axiosInstance } from './lib/axios.js'; // Axios-instans (om du behöver göra requests)
import { useAuthStore } from './store/useAuthStore.js'; // Zustand store för auth-state

import { Loader } from "lucide-react"; // Laddningsikon
import { Toaster } from 'react-hot-toast'; // Toast-notiser

const App = () => { // Huvudkomponenten för appen

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore(); // Tar in auth-relaterade state och funktioner

  console.log({onlineUsers});
  useEffect(() => {
    checkAuth(); // Körs när appen laddas för att kolla om användaren är inloggad
  }, [checkAuth]);

  console.log({ authUser }); // För debugging – visar authUser i konsolen

  // Om vi håller på att kolla autentisering och authUser inte finns än → visa laddningsspinner
  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size={10} animate-spin" />
    </div>
  );

  return (
    <div >
      <Navbar /> {/* Visa navbar oavsett vilken sida man är på */}
      
      <Routes>
        {/* Endast tillgänglig om man är inloggad, annars skickas man till /login */}
        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login" />} />

        {/* Om användaren INTE är inloggad → visa register. Annars → tillbaka till startsidan */}
        <Route path="/register" element={ !authUser ? <RegisterPage /> : <Navigate to="/" />} />

        {/* Samma princip som register */}
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" />} />

        {/* Settings-sidan visas alltid – du kan lägga till skydd här om du vill */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* Profil-sidan kräver att användaren är inloggad */}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      {/* Toast-meddelanden (t.ex. "konto skapades") visas med Toaster-komponenten */}
      <Toaster />
    </div>
  );
};

export default App;
