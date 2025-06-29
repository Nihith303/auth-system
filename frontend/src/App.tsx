import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AuthPage: React.FC = () => {
  const [showSignup, setShowSignup] = useState(false);
  return showSignup ? (
    <SignupForm onSwitchToLogin={() => setShowSignup(false)} />
  ) : (
    <LoginForm onSwitchToSignup={() => setShowSignup(true)} />
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
