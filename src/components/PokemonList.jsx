import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { fetchPokemons } from "../services/pokemonService";
import PokemonCard from "./PokemonCard";

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetchPokemons()
            .then((data) => {
                // Registro de depuración para confirmar qué llega del backend
                console.log("Datos recibidos de la API:", data);

                // Caso 1: La API devuelve un array plano directo
                if (Array.isArray(data)) {
                    setPokemons(data);
                } 
                // Caso 2: La API devuelve una estructura paginada típica de Django (DRF)
                else if (data && Array.isArray(data.results)) {
                    setPokemons(data.results);
                } 
                // Caso de seguridad: Si no cumple ningún formato válido
                else {
                    console.error("El backend no entregó un formato de array válido:", data);
                    setPokemons([]);
                }
            })
            .catch((error) => {
                alert("Error obteniendo pokemons. Por favor, inténtelo de nuevo más tarde.");
                console.error("Error obteniendo pokemons:", error);
            });
    }, []);

    return (
        <Grid container spacing={2}>
            {/* Validación defensiva previa al mapeo */}
            {Array.isArray(pokemons) && pokemons.map((pokemonItem) => (
                <Grid key={pokemonItem.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <PokemonCard pokemon={pokemonItem} />
                </Grid>
            ))}
        </Grid>
    );
}