// src/App.jsx
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonForm from './components/PokemonForm';
import pokemonBanner from './assets/pokemon-23.svg'; // Importación del logo SVG
import './App.css';

function App() {
    return (
        <BrowserRouter>
            {/* Barra azul rectangular superior de tamaño moderado */}
            <div className="pokemon-top-blue-bar">
                <img 
                    src={pokemonBanner} 
                    alt="Pokémon" 
                    className="pokemon-logo-inside-bar" 
                />
            </div>

            <Container maxWidth="md">
                {/* Chasis de la Pokédex */}
                <div className="pokedex-frame">
                    <Header />
                    
                    {/* Pantalla interna LCD */}
                    <div className="pokedex-screen">
                        <Routes>
                            <Route path="/" element={<PokemonList />} />
                            <Route path="/add" element={<PokemonForm />} />
                            <Route path="/edit/:id" element={<PokemonForm />} />
                        </Routes>
                    </div>
                </div>
            </Container>
        </BrowserRouter>
    );
}

export default App;