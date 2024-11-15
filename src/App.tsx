import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/ThemeContext';
import { AuthProvider } from './hooks/AuthContext';
import LandingPage from './components/LandingPage';
import MultiStepRegistration from './components/auth/MultiStepRegistration';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './components/SignIn';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<MultiStepRegistration />} />
            <Route path="/login" element={<SignIn />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/event-registration" element={<RegistrationForm />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;