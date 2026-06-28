// src/components/PokemonList.jsx
import { useState } from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import { fetchPokemons } from "../services/pokemonService";
import PokemonCard from "./PokemonCard";
import "./PokemonList.css";

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleOpenPokedex = () => {
        setIsAnimating(true);

        // Retraso controlado para procesar la animación CRT de encendido
        setTimeout(() => {
            fetchPokemons()
                .then((data) => {
                    if (Array.isArray(data)) {
                        setPokemons(data);
                    } else if (data && Array.isArray(data.results)) {
                        setPokemons(data.results);
                    } else {
                        setPokemons([]);
                    }
                    setIsOpen(true);
                    setIsAnimating(false);
                })
                .catch((error) => {
                    alert("Error crítico al enlazar con la base de datos.");
                    console.error(error);
                    setIsAnimating(false);
                });
        }, 1500); // 1.5 segundos de animación de arranque
    };

    if (!isOpen) {
        return (
            <Box className="pokedex-screen-wrapper">
                <Box 
                    className={`pokedex-large-standby ${isAnimating ? "system-booting" : ""}`}
                >
                    {isAnimating ? (
                        <Box className="terminal-loader-content">
                            <div className="crt-scanline"></div>
                            <Typography variant="h5" className="neon-text-green">
                                INITIALIZING POKÉDEX...
                            </Typography>
                            <Typography variant="body2" className="neon-subtext">
                                LOADING ARCHIVES FROM DB_SQLITE3...
                            </Typography>
                            <div className="progress-bar-simulation"></div>
                        </Box>
                    ) : (
                        <Button 
                            variant="contained"
                            onClick={handleOpenPokedex}
                            className="pokedex-trigger-btn"
                        >
                            Abir Pokédex
                        </Button>
                    )}
                </Box>
            </Box>
        );
    }

    return (
        <Grid container spacing={2} className="elastic-cards-entrance">
            {Array.isArray(pokemons) && pokemons.map((pokemonItem) => (
                <Grid key={pokemonItem.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <PokemonCard pokemon={pokemonItem} />
                </Grid>
            ))}
        </Grid>
    );
}