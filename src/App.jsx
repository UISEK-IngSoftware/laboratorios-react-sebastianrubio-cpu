import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonForm from './components/PokemonForm';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? <PokemonList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/add" 
            element={isAuthenticated ? <PokemonForm /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/edit/:id" 
            element={isAuthenticated ? <PokemonForm /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;