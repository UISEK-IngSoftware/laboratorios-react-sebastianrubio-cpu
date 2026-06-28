// src/services/pokemonService.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("VALOR ACTUAL DE BASE_URL:", BASE_URL);

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPokemons = async () => {
    const response = await apiClient.get ('/pokemons/');
    return response.data;
}

// NUEVA FUNCIÓN: Envía los datos del nuevo espécimen al backend de Django
export const savePokemon = async (formData) => {
    const response = await apiClient.post('/pokemons/', formData, {
        headers: {
            // Obligatorio para indicarle al servidor que procese un archivo binario (imagen)
            'Content-Type': 'multipart/form-data', 
        },
    });
    return response.data;
}