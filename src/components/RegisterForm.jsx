import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validatePassword = (pass) => {
        if (pass.length < 8) return "Mínimo 8 caracteres.";
        if (!/[A-Z]/.test(pass)) return "Debe incluir al menos una mayúscula.";
        if (!/\d/.test(pass)) return "Debe incluir al menos un número.";
        return null;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const passError = validatePassword(password);
        if (passError) {
            setError(passError);
            return;
        }

        try {
            await axios.post('http://192.168.100.15:8000/api/register/', {
                username,
                email,
                password
            });

            setSuccess('Registro exitoso. Redirigindo al acceso...');
            setTimeout(() => {
                if (onRegisterSuccess) onRegisterSuccess();
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.error || 'Error al registrar la cuenta en el sistema.');
        }
    };

    return (
        <div className="tech-login-wrapper">
            <div className="tech-login-card">
                <div className="tech-card-header">
                    <div className="scanner-line-effect"></div>
                    <h2>NEW USER REGISTRATION</h2>
                    <p>CREDENCIALES DE NUEVO ACCESO</p>
                </div>
                
                <form onSubmit={handleRegister} className="tech-form">
                    <div className="tech-input-field">
                        <input 
                            type="text" 
                            placeholder="NUEVO USUARIO"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="tech-input-field">
                        <input 
                            type="email" 
                            placeholder="CORREO ELECTRÓNICO"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="tech-input-field">
                        <input 
                            type="password" 
                            placeholder="CONTRASEÑA (Mín. 8 chars, 1 mayús, 1 número)"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    {error && <div className="tech-error-box">{error}</div>}
                    {success && <div className="tech-success-box" style={{color: '#00ffcc', marginBottom: '10px', fontSize: '0.9rem'}}>{success}</div>}
                    
                    <button type="submit" className="tech-submit-btn">
                        REGISTRARSE
                    </button>

                    <button 
                        type="button" 
                        className="tech-submit-btn" 
                        style={{marginTop: '10px', background: 'transparent', border: '1px solid #00ffcc'}}
                        onClick={onSwitchToLogin}
                    >
                        VOLVER AL LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;