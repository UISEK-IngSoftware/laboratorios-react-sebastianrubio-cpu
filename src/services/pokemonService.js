import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

const getAuthHeaders = (isMultipart = false) => {
    const token = localStorage.getItem('access_token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    if (isMultipart) {
        headers['Content-Type'] = 'multipart/form-data';
    }
    return headers;
};

export const getPokemons = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}pokemons/`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('❌', error);
        throw error;
    }
};

export const fetchPokemonById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}pokemons/${id}/`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('❌', error);
        throw error;
    }
};

export const savePokemon = async (pokemonData, id = null) => {
    try {
        const formData = new FormData();
        Object.keys(pokemonData).forEach(key => {
            if (pokemonData[key] !== null && pokemonData[key] !== undefined) {
                formData.append(key, pokemonData[key]);
            }
        });

        const pokemonId = id || pokemonData.id;
        const url = pokemonId ? `${API_BASE_URL}pokemons/${pokemonId}/` : `${API_BASE_URL}pokemons/`;
        const method = pokemonId ? 'put' : 'post';

        const response = await axios({
            method: method,
            url: url,
            data: formData,
            headers: getAuthHeaders(true)
        });
        return response.data;
    } catch (error) {
        console.error('❌', error);
        throw error;
    }
};

export const createPokemon = async (pokemonData) => {
    return savePokemon(pokemonData);
};

export const updatePokemon = async (id, pokemonData) => {
    return savePokemon(pokemonData, id);
};

export const deletePokemon = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}pokemons/${id}/`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('❌', error);
        throw error;
    }
};