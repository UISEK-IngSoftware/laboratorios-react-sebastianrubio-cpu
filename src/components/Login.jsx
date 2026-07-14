import { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '350px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        border: '2px solid #555',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)'
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          fontFamily: 'monospace', 
          color: '#39ff14', 
          textAlign: 'center',
          textShadow: '0 0 5px #39ff14'
        }}
      >
        SISTEMA DE ACCESO
      </Typography>

      {error && <Alert severity="error" variant="filled" sx={{ fontSize: '12px' }}>{error}</Alert>}

      <TextField
        label="Usuario de la Pokédex"
        variant="filled"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        InputLabelProps={{ style: { color: '#888', fontFamily: 'monospace' } }}
        inputProps={{ style: { color: '#fff', fontFamily: 'monospace' } }}
        sx={{ backgroundColor: '#2b2b2b', borderRadius: '4px' }}
      />

      <TextField
        label="Contraseña"
        type="password"
        variant="filled"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        InputLabelProps={{ style: { color: '#888', fontFamily: 'monospace' } }}
        inputProps={{ style: { color: '#fff', fontFamily: 'monospace' } }}
        sx={{ backgroundColor: '#2b2b2b', borderRadius: '4px' }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          backgroundColor: '#39ff14',
          color: '#000',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          '&:hover': {
            backgroundColor: '#2bc40f',
          }
        }}
      >
        {loading ? 'CONECTANDO...' : 'INICIAR SESIÓN'}
      </Button>
    </Box>
  );
}