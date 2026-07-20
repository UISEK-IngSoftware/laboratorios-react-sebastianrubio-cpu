import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonForm from './components/PokemonForm';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);

  useEffect(() => {
    // 1. Verificación pasiva: ¿El usuario ya tiene sesión local?
    if (localStorage.getItem('access_token')) {
      setIsAuthenticated(true);
    }

    // 2. Verificación activa: ¿GitHub nos redirigió de vuelta con un código?
    const queryParams = new URLSearchParams(window.location.search);
    const githubCode = queryParams.get('code');

    if (githubCode && !isAuthenticated) {
      setIsProcessingAuth(true);
      
      // Limpiamos la URL visualmente para ocultar el código de autorización
      window.history.replaceState({}, document.title, "/");

      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      // Intercambiamos el código por los JWT en nuestro backend
      axios.post(`${baseUrl}/auth/github/`, { code: githubCode })
        .then((res) => {
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.error("Fallo al validar código con el servidor:", err);
          alert("Error de autenticación. Verifica que tu Client ID y Secret coincidan.");
        })
        .finally(() => {
          setIsProcessingAuth(false);
        });
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  if (isProcessingAuth) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Validando credenciales en el servidor...</h2>;
  }

  // Cortafuegos de UI
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Interfaz Protegida
  return (
    <div className="App">
      <Header />
      <div style={{ textAlign: 'right', padding: '10px' }}>
        <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Cerrar Sesión</button>
      </div>
      <main>
        <PokemonForm />
        <PokemonList />
      </main>
    </div>
  );
}

export default App;