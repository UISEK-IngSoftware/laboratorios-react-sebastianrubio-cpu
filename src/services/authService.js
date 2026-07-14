// src/services/authService.js
import axios from 'axios';

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://127.0.0.1:8000';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID; 
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET; 

const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", // Requerido por Django-OAuth-Toolkit
  },
});

export const loginUser = async (username, password) => {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', CLIENT_ID);
    if (CLIENT_SECRET) {
      params.append('client_secret', CLIENT_SECRET);
    }

    const response = await authClient.post("/o/token/", params);
    return response.data; // Retorna todo el objeto { access_token, refresh_token, ... }
  } catch (error) {
    throw new Error(error.response?.data?.error_description || "Credenciales incorrectas o servidor caído.");
  }
};