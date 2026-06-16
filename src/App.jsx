import { Container, Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { pokemons } from './data/pokemons'; // Importación de tus datos locales

function App() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        align="center" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: '#1976d2', mb: 4 }}
      >
        Pokédex Regional
      </Typography>
      
      <Grid container spacing={4}>
        {pokemons.map((pokemon) => (
          <Grid item key={pokemon.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
              {/* Contenedor gris de fondo para resaltar el sprite */}
              <Box sx={{ bgcolor: '#f5f5f5', p: 3, display: 'flex', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  image={pokemon.image}
                  alt={pokemon.name}
                  sx={{ width: 130, height: 130, objectFit: 'contain' }}
                />
              </Box>
              
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  #{String(pokemon.id).padStart(3, '0')}
                </Typography>
                
                <Typography variant="h5" component="h2" sx={{ textTransform: 'capitalize', my: 1, fontWeight: 'medium' }}>
                  {pokemon.name}
                </Typography>
                
                {/* Badge dinámico basado en el tipo de Pokémon */}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 1, 
                    display: 'inline-block', 
                    bgcolor: pokemon.type === 'grass' ? '#4caf50' : pokemon.type === 'fire' ? '#f44336' : '#2196f3',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  {pokemon.type}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;

export default App
