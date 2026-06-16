import { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios'; // Importación de la dependencia HTTP

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reemplaza con la URL local de tu servidor Django (ej. http://127.0.0.1:8000/api/pokemons/)
    axios.get('http://TU_API_URL/api/pokemons/')
      .then((response) => {
        // Asumiendo que tu API devuelve un array directo o un objeto con los resultados
        setPokemons(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al conectar con la Pokédex API:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* El resto del mapeo de la interfaz se mantiene idéntico al Paso 1 */}
    </Container>
  );
}