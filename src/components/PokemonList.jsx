import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
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
            Encender Pokedex
          </Button>
        )}

        {booting && (
          <div className="terminal-loader-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <span className="neon-text-green" style={{ marginBottom: '15px' }}>INICIALIZANDO SISTEMA...</span>
            <span className="tech-spinner-lg"></span>
            <div className="crt-scanline"></div>
          </div>
        )}

        {systemOn && (
          <div className="pokemon-grid-layout elastic-cards-entrance">
            {loading ? (
              <div className="terminal-loader-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '300px' }}>
                <span className="tech-spinner-lg"></span>
                <span className="neon-subtext" style={{ marginTop: '15px', color: '#4dadf7', fontFamily: 'monospace', letterSpacing: '1px' }}>CARGANDO REGISTROS...</span>
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