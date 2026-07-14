// src/services/pokemonService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/pokemons/'; // Ajusta esta ruta según tus URLs de Django

export const pokemonService = {
  // Obtener todos los pokémons
  getAll: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
         throw new Error('Error al obtener los Pokémon de la API');
    }
    return await response.json();
  },

  // Crear un nuevo pokémon (debe manejar FormData si vas a subir imágenes)
  create: async (pokemonData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      // Si envías JSON:
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemonData),
      
      /* NOTA: Si vas a enviar imágenes (File) desde tu formulario, 
      DEBES usar FormData y NO pasar el header 'Content-Type' manualmente.
      Ejemplo:
      body: pokemonData // Donde pokemonData es una instancia de FormData
      */
    });
    if (!response.ok) {
        throw new Error('Error al crear el Pokémon');
    }
    return await response.json();
  },

  // Eliminar un pokémon
  delete: async (id) => {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar el Pokémon');
    }
    return true;
  }
};