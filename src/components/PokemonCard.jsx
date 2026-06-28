import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

export default function PokemonCard({ pokemon }) {
  const mediaUrl = import.meta.env.VITE_API_MEDIA_URL;
  const imageUrl = pokemon.picture ? `${mediaUrl}/${pokemon.picture}` : 'https://via.placeholder.com/150';

  // Mapeo básico de colores según el tipo para el badge informativo
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
          borderColor: '#00cbff' // Efecto de escaneo celeste al pasar el mouse
        }
      }}
    >
      {/* Contenedor de la imagen simulando un visor secundario */}
      <Box sx={{ p: 2, backgroundColor: '#58ab93', margin: '10px', borderRadius: '6px', border: '2px solid #3b7565' }}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={pokemon.name}
          sx={{ objectFit: 'contain', filter: 'drop-shadow(2px 4px 6px black)' }}
        />
      </Box>

      <CardContent sx={{ pt: 0 }}>
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

        {/* Badge de tipo de elemento */}
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
            letterSpacing: '1px'
          }}
        >
          {pokemon.type || 'Desconocido'}
        </Box>
      </CardContent>
    </Card>
  );
}