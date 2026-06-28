// src/components/PokemonCard.jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deletePokemon } from '../services/pokemonService';

export default function PokemonCard({ pokemon, onDeleteSuccess }) {
  const navigate = useNavigate();
  const imageUrl = pokemon.image || pokemon.picture || 'https://via.placeholder.com/150';

  const getTypeColor = (type) => {
    const colors = {
      fire: '#ff4422',
      water: '#3399ff',
      grass: '#77cc55',
      electric: '#ffcc33',
      bug: '#aabb22',
      normal: '#aaaa99'
    };
    return colors[type?.toLowerCase()] || '#666666';
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Está seguro de eliminar a ${pokemon.name} de la base de datos de forma permanente?`)) {
      try {
        await deletePokemon(pokemon.id);
        alert("Registro eliminado exitosamente.");
        if (onDeleteSuccess) onDeleteSuccess(); // Dispara la recarga de datos en la lista
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el registro. Verifique la conexión con el servidor.");
      }
    }
  };

  return (
    <Card 
      sx={{ 
        backgroundColor: '#1a1a1a', 
        border: '3px solid #333', 
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        transition: 'transform 0.2s, border-color 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          borderColor: '#00cbff' 
        }
      }}
    >
      <Box sx={{ p: 2, backgroundColor: '#58ab93', margin: '10px', borderRadius: '6px', border: '2px solid #3b7565' }}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl} 
          alt={pokemon.name}
          sx={{ objectFit: 'contain', filter: 'drop-shadow(2px 4px 6px black)' }}
        />
      </Box>

      <CardContent sx={{ pt: 0, pb: '10px !important' }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          sx={{ 
            fontFamily: 'monospace', 
            color: '#ffffff', 
            fontWeight: 'bold',
            textTransform: 'capitalize' 
          }}
        >
          N° {pokemon.id || '??'} - {pokemon.name}
        </Typography>

        <Box 
          sx={{ 
            display: 'inline-block', 
            backgroundColor: getTypeColor(pokemon.type), 
            color: '#fff', 
            px: 1.5, 
            py: 0.5, 
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            mb: 2
          }}
        >
          {pokemon.type || 'Desconocido'}
        </Box>

        {/* Panel de control interno de la tarjeta (Modificar / Eliminar) */}
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => navigate(`/edit/${pokemon.id}`)}
            sx={{ 
              flex: 1, 
              color: '#00cbff', 
              borderColor: '#00cbff',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              '&:hover': { borderColor: '#ffffff', color: '#ffffff' }
            }}
          >
            Editar
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            color="error"
            onClick={handleDelete}
            sx={{ 
              flex: 1, 
              fontFamily: 'monospace',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#ff4422', color: '#ffffff' }
            }}
          >
            Borrar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}