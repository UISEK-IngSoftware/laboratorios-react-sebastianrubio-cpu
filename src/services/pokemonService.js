import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar de forma dinámica el Bearer token almacenado
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

export const fetchPokemons = async () => {
    const response = await apiClient.get('/pokemons/');
    return response.data;
}

export const savePokemon = async (formData) => {
    const response = await apiClient.post('/pokemons/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    });
    return response.data;
}

export const fetchPokemonById = async (id) => {
    const response = await apiClient.get(`/pokemons/${id}/`);
    return response.data;
}

export const updatePokemon = async (id, formData) => {
    const response = await apiClient.patch(`/pokemons/${id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export const deletePokemon = async (id) => {
    const response = await apiClient.delete(`/pokemons/${id}/`);
    return response.data;
}