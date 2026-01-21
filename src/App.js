import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has a token on load
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  if (loading) return null; // Or a loading spinner

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <Signup setAuth={setAuth} /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

