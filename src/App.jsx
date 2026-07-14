import { useState, useEffect } from 'react';
import { pokemonService } from './services/pokemonService';
import PokemonList from './components/PokemonList';
import PokemonForm from './components/PokemonForm';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  // Cargar pokémons al montar el componente
  useEffect(() => {
    pokemonService.getAll()
      .then(data => setPokemons(data))
      .catch(err => {
        console.error(err);
        setError("No se pudo conectar con el servidor backend.");
      });
  }, []);

  const handleAddPokemon = async (newPokemon) => {
    try {
      const created = await pokemonService.create(newPokemon);
      setPokemons([...pokemons, created]);
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  return (
    <div className="App">
      <h1>Pokedex Administrador</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <PokemonForm onAdd={handleAddPokemon} />
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default App;