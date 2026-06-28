// src/App.jsx
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonForm from './components/PokemonForm';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Container maxWidth="md">
                {/* Chasis exterior rojo de la Pokédex */}
                <div className="pokedex-frame">
                    <Header />
                    
                    {/* Pantalla interna LCD del dispositivo */}
                    <div className="pokedex-screen">
                        <Routes>
                            <Route path="/" element={<PokemonList />} />
                            <Route path="/add" element={<PokemonForm />} />
                            {/* NUEVA RUTA: Mapea el id del espécimen a modificar */}
                            <Route path="/edit/:id" element={<PokemonForm />} />
                        </Routes>
                    </div>
                </div>
            </Container>
        </BrowserRouter>
    );
}

export default App;