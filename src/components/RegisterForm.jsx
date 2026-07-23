import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onNavigateLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('LAS CONTRASEÑAS NO COINCIDEN.');
            return;
        }

        setIsLoading(true);

        try {
            await axios.post('http://localhost:8000/api/register/', {
                username,
                email,
                password
            });
            setSuccess('REGISTRO EXITOSO. REDIRIGIENDO...');
            setTimeout(() => {
                if (onNavigateLogin) {
                    onNavigateLogin();
                }
            }, 1200);
        } catch (err) {
            setError('ERROR EN EL REGISTRO. VERIFIQUE LOS DATOS.');
            setIsLoading(false);
        }
    };

    return (
        <div className="tech-login-wrapper">
            <div className="tech-login-card">
                <div className="scanner-line-effect"></div>
                <div className="tech-card-header">
                    <h2>USER REGISTRATION</h2>
                    <p>CREAR NUEVA CREDENCIAL</p>
                </div>
                
                <form onSubmit={handleRegister} className="tech-form">
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
                            type="email" 
                            placeholder="CORREO ELECTRÓNICO"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
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
                    <div className="tech-input-field">
                        <input 
                            type="password" 
                            placeholder="CONFIRMAR CLAVE"
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                            disabled={isLoading}
                        />
                    </div>
                    
                    {error && <div className="tech-error-box">{error}</div>}
                    {success && <div style={{ color: '#40c057', fontSize: '13px', textAlign: 'left', marginBottom: '18px', fontFamily: 'monospace' }}>{success}</div>}
                    
                    <button type="submit" className="tech-submit-btn" disabled={isLoading}>
                        {isLoading && <span className="tech-spinner"></span>}
                        {isLoading ? 'REGISTRANDO...' : 'REGISTRAR'}
                    </button>
                    
                    {onNavigateLogin && (
                        <button 
                            type="button" 
                            className="tech-secondary-btn" 
                            onClick={onNavigateLogin}
                            disabled={isLoading}
                        >
                            VOLVER AL LOGIN
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;