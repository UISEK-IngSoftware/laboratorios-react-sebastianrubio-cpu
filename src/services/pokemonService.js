// src/services/pokemonService.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

/* 
   CRUD 
   */

export const fetchPokemons = async () => {
  const response = await apiClient.get('/pokemons/');
  return response.data;
};

export const savePokemon = async (formData) => {
  const response = await apiClient.post('/pokemons/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
  return response.data;
};

// Obtiene los detalles de un único espécimen para la edición
export const fetchPokemonById = async (id) => {
  const response = await apiClient.get(`/pokemons/${id}//`);
  return response.data;
};

// Actualizaciones parciales mediante HTTP PATCH
export const updatePokemon = async (id, formData) => {
  const response = await apiClient.patch(`/pokemons/${id}//`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Eliminación del registro en la base de datos
export const deletePokemon = async (id) => {
  const response = await apiClient.delete(`/pokemons/${id}//`);
  return response.data;
};