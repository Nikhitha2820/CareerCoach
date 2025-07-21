import React, { JSX } from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthForm } from './components/authorisation-components/AuthForm';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Add React Router imports
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/Dashboard';
// Import Dashboard (create a simple Dashboard component if not present)

// ProtectedRoute component
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = sessionStorage.getItem("userLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<AuthForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
             /> 
            {/* Optionally, redirect root to login or dashboard */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;