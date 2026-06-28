// src/components/PokemonForm.jsx
import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Para redireccionar tras guardar
import { savePokemon } from '../services/pokemonService';
import './PokemonForm.css';

export default function PokemonForm() {
    const navigate = useNavigate();

    // 1. Estados locales para el control de los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        weight: '',
        height: ''
    });
    const [picture, setPicture] = useState(null);

    // Estilos personalizados para la legibilidad en modo oscuro
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

    // 2. Manejador de cambios para campos de texto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 3. Manejador específico para la extracción del archivo binario
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPicture(e.target.files[0]);
        }
    };

    // 4. Interceptor del evento Submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Detiene la recarga automática de la página por defecto del navegador

        // Validación defensiva básica antes de contactar al servidor
        if (!formData.name || !formData.type) {
            alert("Error de validación: El Nombre y el Tipo son parámetros obligatorios.");
            return;
        }

        // Construcción de la carga útil usando FormData debido al archivo adjunto
        const dataToSend = new FormData();
        dataToSend.append('name', formData.name);
        dataToSend.append('type', formData.type);
        dataToSend.append('weight', formData.weight);
        dataToSend.append('height', formData.height);
        
        if (picture) {
            dataToSend.append('picture', picture); // Adjunta el archivo binario si el usuario lo seleccionó
        }

        try {
            await savePokemon(dataToSend);
            alert("¡Registro completado! El espécimen se ha guardado en la base de datos.");
            navigate('/'); // Redirecciona de forma automática a la vista de la lista para verificar los cambios
        } catch (error) {
            console.error("Fallo crítico al guardar en la base de datos:", error);
            alert("Error de red: No se pudo consolidar el registro. Revise la consola del navegador.");
        }
    };

    return (
        <Box sx={{ p: 1 }}>
            <Typography 
                variant="h5" 
                gutterBottom
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: 3,
                    textShadow: '1px 1px 2px #000'
                }}
            >
                [ Registro de Espécimen ]
            </Typography>
            
            <Box
                component="form"
                onSubmit={handleSubmit} // Vinculación del interceptor de guardado
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <TextField 
                    label="Nombre" 
                    name="name" // Mapeo correlativo con la propiedad del estado
                    variant="outlined" 
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                />
                
                <TextField 
                    label="Tipo" 
                    name="type"
                    variant="outlined" 
                    fullWidth
                    value={formData.type}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                />
                
                <TextField 
                    label="Peso (kg)" 
                    name="weight"
                    variant="outlined" 
                    type="number" 
                    fullWidth
                    value={formData.weight}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                />
                
                <TextField 
                    label="Altura (m)" 
                    name="height"
                    variant="outlined" 
                    type="number" 
                    fullWidth
                    value={formData.height}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                />
                
                <div className="file-input-container">
                    <label className="file-input-label">Fotografía de Registro:</label>
                    <input 
                        type='file' 
                        name='picture' 
                        accept='image/*' 
                        onChange={handleFileChange} // Captura del binario de la imagen
                        className="pokedex-file-input"
                    />
                </div>
                
                <Button 
                    variant="contained" 
                    type='submit' // Gatilla el evento onSubmit definido en el Box contenedor
                    sx={{
                        backgroundColor: '#28a745',
                        border: '2px solid #1e7e34',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        padding: '10px',
                        '&:hover': {
                            backgroundColor: '#218838',
                        }
                    }}
                >
                    Guardar en Base de Datos
                </Button>
            </Box>
        </Box>
    );
}