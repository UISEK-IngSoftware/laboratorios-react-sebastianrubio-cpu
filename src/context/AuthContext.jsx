// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { loginUser } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }
        setToken(data.access_token);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error("Error en flujo de autenticación:", error.message);
      throw error; // Propaga el error para que LoginForm pueda renderizar el mensaje
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}