import { Container } from '@mui/material';
import './App.css';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonForm from './components/PokemonForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
                        </Routes>
                    </div>
                </div>
            </Container>
        </BrowserRouter>
    );
}

export default App;