import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './PokemonCard.css';

export default function PokemonCard({ pokemon }) {
  return (
    <Card className="pokemon-card">  
      <CardMedia
        component="img"
        height={300}
        image={pokemon.image}
        alt={pokemon.name}
        
      />
      <CardContent>
        <Typography variant="h5" component="div">
            {pokemon.name}
        </Typography>
        
        <Typography variant="h5" component="div">
            {pokemon.name}
        </Typography>

      </CardContent>
    </Card>
  );
}