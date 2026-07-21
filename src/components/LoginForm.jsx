import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import Spinner from './spinner';

const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('grant_type', 'password');
            params.append('client_id', '21i5cCFdLVhBdLCQ6F7ZoJXttCQY3fQb6QsKA8f4');
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
            setError(err.response ? ' Acceso denegado: Credenciales no válidas' : ' Fallo de conexión de red');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner />
            </Box>
        );
    }

    return (
        <div className="tech-login-wrapper">
            <div className="tech-login-card">
                <div className="tech-card-header">
                    <div className="scanner-line-effect"></div>
                    <h2>SYSTEM ACCESS</h2>
                    <p>AUTENTICACIÓN REQUERIDA (OAUTH 2.0)</p>
                </div>
                
                <form onSubmit={handleLogin} className="tech-form">
                    <div className="tech-input-field">
                        <input 
                            type="text" 
                            placeholder="ID DE USUARIO"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="tech-input-field">
                        <input 
                            type="password" 
                            placeholder="CLAVE DE ENTRADA"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    {error && <div className="tech-error-box">{error}</div>}
                    
                    <button type="submit" className="tech-submit-btn">
                         ENTRAR
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;