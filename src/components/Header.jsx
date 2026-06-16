import { AppBar, Toolbar, Container } from "@mui/material";
import pokedexLogo from "../assets/pokedex-logo.png";

export default function Header() {
  return (
 
    <Container>
        <div className="header PokemonCard">
            <AppBar position="static">
                <Toolbar>
                    <div className="image-container">
                        <img src={pokedexLogo} alt="Pokedex Logo" height={150} />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    </Container>
  );
}