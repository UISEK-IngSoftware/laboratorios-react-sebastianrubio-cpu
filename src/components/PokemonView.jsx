import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TikTokPokedex.css';

const TikTokPokedex = () => {
    const [pokemons, setPokemons] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://192.168.100.15:8000/api/pokemons/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPokemons(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar pokemones', err);
                setLoading(false);
            }
        };
        fetchPokemons();
    }, []);

    const handleWheel = (e) => {
        if (e.deltaY > 0) {
            setCurrentIndex((prev) => (prev < pokemons.length - 1 ? prev + 1 : prev));
        } else {
            setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
    };

    if (loading) return <div className="tiktok-loading">CARGANDO DATOS DE POKEDEX...</div>;
    if (pokemons.length === 0) return <div className="tiktok-loading">NO HAY REGISTROS DISPONIBLES.</div>;

    const currentPokemon = pokemons[currentIndex];

    return (
        <div className="tiktok-container" onWheel={handleWheel}>
            <div className="pokedex-tiktok-card">
                <div className="pokedex-screen-top">
                    <span className="poke-id">N° {currentPokemon.id}</span>
                    <span className="poke-type">{currentPokemon.type}</span>
                </div>
                
                <div className="pokedex-image-container">
                    <img 
                        src={currentPokemon.picture || 'https://via.placeholder.com/300'} 
                        alt={currentPokemon.name} 
                        className="poke-tiktok-img"
                    />
                </div>

                <div className="pokedex-info-panel">
                    <h2>{currentPokemon.name}</h2>
                    <div className="poke-stats-row">
                        <span>ALTURA: {currentPokemon.height}m</span>
                        <span>PESO: {currentPokemon.weight}kg</span>
                    </div>
                </div>

                <div className="tiktok-scroll-indicator">
                    <span>↓ Desliza o usa la rueda para siguiente</span>
                </div>
            </div>
        </div>
    );
};

export default TikTokPokedex;