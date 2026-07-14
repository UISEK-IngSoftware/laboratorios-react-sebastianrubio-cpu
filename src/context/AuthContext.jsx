import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const OAUTH_TOKEN_URL = 'http://127.0.0.1:8000/o/token/';
// Reemplaza esto con el Client ID real generado en tu panel de administración de Django (Application Manager)
const CLIENT_ID = 'TU_CLIENT_ID_DE_DJANGO'; 

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  const login = async (username, password) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', CLIENT_ID);

    try {
      const response = await axios.post(OAUTH_TOKEN_URL, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        if (response.data.refresh_token) {
          localStorage.setItem('refresh_token', response.data.refresh_token);
        }
        setToken(response.data.access_token);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error("Error de autenticación OAuth:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error_description || "Credenciales incorrectas o servidor caído.");
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