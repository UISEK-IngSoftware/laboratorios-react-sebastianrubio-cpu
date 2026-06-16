import { Container, Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { pokemons } from './data/pokemons'; 
import Header from './components/Header';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <>
      <Header />
      <Container>
        <PokemonList />
      </Container>
    </>
  );
}

export default App;