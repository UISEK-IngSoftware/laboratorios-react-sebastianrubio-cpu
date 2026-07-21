import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'; 
import { savePokemon, fetchPokemonById, updatePokemon } from '../services/pokemonService';
import './PokemonForm.css';
import Spinner from './spinner';

export default function PokemonForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState(null);
    const [booting, setBooting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        weight: '',
        height: ''
    });
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            fetchPokemonById(id)
                .then((data) => {
                    setFormData({
                        name: data.name || '',
                        type: data.type || '',
                        weight: data.weight !== null ? data.weight : '',
                        height: data.height !== null ? data.height : ''
                    });
                })
                .catch((err) => {
                    setError(err);
                    alert("No se pudo obtener la información del Pokémon para editar.");
                    navigate('/');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id, isEditMode, navigate]);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPicture(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!formData.name || !formData.type) {
            alert("Error de validación: El Nombre y el Tipo son parámetros obligatorios.");
            return;
        }

        const dataToSend = new FormData();
        dataToSend.append('name', formData.name);
        dataToSend.append('type', formData.type);
        dataToSend.append('weight', formData.weight);
        dataToSend.append('height', formData.height);

        if (picture) {
            dataToSend.append('picture', picture);
        }

        try {
            setLoading(true);
            if (isEditMode) {
                await updatePokemon(id, dataToSend);
                alert("¡Actualización completada con éxito!");
            } else {
                await savePokemon(dataToSend);
                alert("¡Registro completado! El espécimen se ha guardado.");
            }
            navigate('/'); 
        } catch (err) {
            setError(err);
            alert("Error de red: Operación rechazada por el servidor.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner />
            </Box>
        );
    }

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
                {isEditMode ? `[ Modificar Espécimen N° ${id} ]` : '[ Registro de Espécimen ]'}
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField 
                    label="Nombre" 
                    name="name" 
                    variant="outlined" 
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                    InputLabelProps={isEditMode ? { shrink: true } : {}}
                />
                
                <TextField 
                    label="Tipo" 
                    name="type"
                    variant="outlined" 
                    fullWidth
                    value={formData.type}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                    InputLabelProps={isEditMode ? { shrink: true } : {}}
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
                    InputLabelProps={isEditMode ? { shrink: true } : {}}
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
                    InputLabelProps={isEditMode ? { shrink: true } : {}}
                />
                
                <div className="file-input-container">
                    <label className="file-input-label">
                        {isEditMode ? "Reemplazar Fotografía (Opcional):" : "Fotografía de Registro:"}
                    </label>
                    <input 
                        type='file' 
                        name='picture' 
                        accept='image/*' 
                        onChange={handleFileChange} 
                        className="pokedex-file-input"
                    />
                </div>
                
                <Button 
                    variant="contained" 
                    type='submit' 
                    sx={{
                        backgroundColor: isEditMode ? '#00cbff' : '#28a745',
                        color: isEditMode ? '#000000' : '#ffffff',
                        border: isEditMode ? '2px solid #0099bc' : '2px solid #1e7e34',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        padding: '10px',
                        '&:hover': {
                            backgroundColor: isEditMode ? '#0099bc' : '#218838',
                            color: '#ffffff'
                        }
                    }}
                >
                    {isEditMode ? "Guardar Cambios" : "Guardar en Base de Datos"}
                </Button>
            </Box>
        </Box>
    );
}