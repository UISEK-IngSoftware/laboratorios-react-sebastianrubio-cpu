import React, { useState } from 'react';

// Se elimina la prop onAuthSuccess, ya que el componente se desmontará durante la redirección.
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = () => {
    setIsLoading(true);
    
    // Configuración estricta para el flujo de GitHub
    const clientId = 'Ov23likwZH3eFzuhDbEn'; // Reemplaza con tu Client ID de GitHub
    const redirectUri = 'http://localhost:5173/'; // Debe coincidir exactamente con la de la consola de GitHub
    
    // scope=user:email es fundamental para asegurar que GitHub comparta el correo del perfil
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    
    // Redirección dura fuera de la aplicación React
    window.location.href = githubAuthUrl;
  };

  return (
    <div className="login-form-wrapper" style={styles.wrapper}>
      <div className="login-box" style={styles.box}>
        <h2 style={styles.heading}>Acceso Restringido</h2>
        <p style={styles.text}>
          El sistema requiere verificación de identidad para manipular la base de datos de Pokémons.
        </p>

        <button 
          onClick={handleGitHubLogin} 
          disabled={isLoading} 
          style={isLoading ? { ...styles.button, opacity: 0.7 } : styles.button}
        >
          {isLoading ? 'Redirigiendo a GitHub...' : 'Autenticar con GitHub OAuth 2.0'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    backgroundColor: '#f5f5f5',
  },
  box: {
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    marginTop: 0,
    color: '#333333',
  },
  text: {
    color: '#666666',
    marginBottom: '24px',
    fontSize: '14px',
  },
  button: {
    // Se cambia el color azul de Google (#4285F4) por el gris oscuro corporativo de GitHub
    backgroundColor: '#24292e',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.2s ease',
  }
};

export default LoginForm;