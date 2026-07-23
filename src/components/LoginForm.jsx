import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess, onNavigateRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const params = new URLSearchParams();
            params.append('grant_type', 'password');
            params.append('client_id', 'z3XZ46t4D2WlJWJAkhYGrXHePWg8ss5VR7r7riMV');
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
            setError(err.response ? ' ACCESO DENEGADO: CREDENCIALES NO VÁLIDAS' : ' FALLO DE CONEXIÓN DE RED');
            setIsLoading(false);
        }
    };

    return (
        <div className="tech-login-wrapper">
            <div className="tech-login-card">
                <div className="scanner-line-effect"></div>
                <div className="tech-card-header">
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
                            disabled={isLoading}
                        />
                    </div>
                    <div className="tech-input-field">
                        <input 
                            type="password" 
                            placeholder="CLAVE DE ENTRADA"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            disabled={isLoading}
                        />
                    </div>
                    
                    {error && <div className="tech-error-box">{error}</div>}
                    
                    <button type="submit" className="tech-submit-btn" disabled={isLoading}>
                        {isLoading && <span className="tech-spinner"></span>}
                        {isLoading ? 'AUTENTICANDO...' : 'ENTRAR'}
                    </button>
                    
                    {onNavigateRegister && (
                        <button 
                            type="button" 
                            className="tech-secondary-btn" 
                            onClick={onNavigateRegister}
                            disabled={isLoading}
                        >
                            REGISTRO
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginForm;