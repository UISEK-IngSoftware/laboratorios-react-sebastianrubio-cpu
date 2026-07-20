import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import PokemonList from './components/PokemonList';
import Header from './components/Header';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
    };

    return (
        <div className="app-container">
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <main>
                {isAuthenticated ? (
                    <PokemonList />
                ) : (
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                )}
            </main>
        </div>
    );
};

export default App;