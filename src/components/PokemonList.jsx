import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { getPokemons, deletePokemon } from '../services/pokemonService';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(false);
  const [systemOn, setSystemOn] = useState(false);

  useEffect(() => {
    if (systemOn) {
      fetchData();
    }
  }, [systemOn]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPokemons();
      setPokemons(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePowerOn = () => {
    setBooting(true);
    setTimeout(() => {
      setBooting(false);
      setSystemOn(true);
    }, 1500);
  };

  const handleDelete = async (id) => {
    try {
      await deletePokemon(id);
      setPokemons(pokemons.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pokedex-screen-wrapper">
      <div className={`pokedex-large-standby ${booting ? 'system-booting' : ''} ${systemOn ? 'screen-active' : ''}`}>
        {!systemOn && !booting && (
          <Button onClick={handlePowerOn} className="pokedex-trigger-btn">
            Enceder Pokedex
          </Button>
        )}

        {booting && (
          <div className="terminal-loader-content">
            <span className="neon-text-green">INICIALIZANDO SISTEMA...</span>
            <div className="progress-bar-simulation"></div>
            <div className="crt-scanline"></div>
          </div>
        )}

        {systemOn && (
          <div className="pokemon-grid-layout elastic-cards-entrance">
            {loading ? (
              <div className="terminal-loader-content">
                <CircularProgress sx={{ color: '#00ff41' }} />
                <span className="neon-subtext">CARGANDO REGISTROS...</span>
              </div>
            ) : (
              pokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}