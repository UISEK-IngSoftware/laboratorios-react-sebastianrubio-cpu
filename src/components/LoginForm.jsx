// src/components/LoginForm.jsx
import { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
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
      navigate('/'); // Redirige a la Pokédex una vez autenticado con éxito
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#444444', borderWidth: '2px' },
      '&:hover fieldset': { borderColor: '#00cbff' },
      '&.Mui-focused fieldset': { borderColor: '#00cbff' },
      '& input': { color: '#ffffff', fontFamily: 'monospace' },
    },
    '& .MuiInputLabel-root': { color: '#888888', fontFamily: 'monospace' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#00cbff' },
  };

  return (
    <Box sx={{ p: 2, maxWidth: '400px', margin: '0 auto' }}>
      <Typography 
        variant="h5" 
        gutterBottom
        sx={{
          fontFamily: 'monospace',
          fontWeight: 'bold',
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          textAlign: 'center',
          marginBottom: 3,
          textShadow: '1px 1px 2px #000'
        }}
      >
        [ ACCESO REQUERIDO ]
      </Typography>

      {error && (
        <Alert 
          severity="error" 
          variant="outlined" 
          sx={{ 
            color: '#ff4d4d', 
            borderColor: '#ff4d4d', 
            backgroundColor: 'transparent',
            fontFamily: 'monospace',
            marginBottom: 3 
          }}
        >
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField 
          label="Usuario" 
          name="username" 
          variant="outlined" 
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={textFieldStyles}
          required
        />
        
        <TextField 
          label="Contraseña" 
          name="password"
          type="password"
          variant="outlined" 
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={textFieldStyles}
          required
        />

        <Button 
          variant="contained" 
          type='submit' 
          disabled={loading}
          sx={{
            backgroundColor: '#00cbff',
            color: '#000000',
            border: '2px solid #0099bc',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            fontSize: '1rem',
            padding: '10px',
            '&:hover': {
              backgroundColor: '#0099bc',
              color: '#ffffff'
            },
            '&.Mui-disabled': {
              backgroundColor: '#333333',
              color: '#666666',
              borderColor: '#222222'
            }
          }}
        >
          {loading ? "Sincronizando..." : "Conectar Pokédex"}
        </Button>
      </Box>
    </Box>
  );
}