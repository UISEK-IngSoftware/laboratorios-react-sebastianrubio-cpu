import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const params = new URLSearchParams();
            params.append('grant_type', 'password');
            params.append('client_id', 'he2RuUe9l5q910DyxBMTemXzaoiU9tVxpU4HM4Du');
            params.append('username', username);
            params.append('password', password);

            const response = await axios.post('http://localhost:8000/api/oauth/token/', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            
            if (onLoginSuccess) {
                onLoginSuccess(response.data);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(JSON.stringify(err.response.data));
            } else {
                setError('Error de conexión con el servidor');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Pokédex Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Usuario:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default LoginForm;