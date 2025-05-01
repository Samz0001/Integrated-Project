// src/main.tsx (or index.tsx)
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
import LandingPage from './LandingPage.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import SignUp from './pages/Register.tsx';
import EmotionHistory from './pages/EmotionHistory.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Your main app (protected, if you check auth inside App) */}
          <Route path="/app" element={<App />} />
          <Route path ="/login" element={<Login/>} />
          <Route path ="/register" element={<SignUp  />} />
          <Route path = "/history" element= {<EmotionHistory/>}/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
