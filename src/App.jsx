// src/App.jsx
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonForm from './components/PokemonForm';
import LoginForm from './components/LoginForm';
import pokemonBanner from './assets/pokemon-23.svg'; // Importación del logo SVG
import './App.css';

// Componente para proteger las rutas privadas
function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

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
                            {/* Ruta Pública de Autenticación */}
                            <Route path="/login" element={<LoginForm />} />

                            {/* Rutas Protegidas por Autenticación */}
                            <Route path="/" element={
                                <PrivateRoute>
                                    <PokemonList />
                                </PrivateRoute>
                            } />
                            <Route path="/add" element={
                                <PrivateRoute>
                                    <PokemonForm />
                                </PrivateRoute>
                            } />
                            <Route path="/edit/:id" element={
                                <PrivateRoute>
                                    <PokemonForm />
                                </PrivateRoute>
                            } />

                            {/* Comportamiento por defecto (redirección) */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </div>
            </Container>
        </BrowserRouter>
    );
}

export default App;