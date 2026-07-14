// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="pokedex-header-container">
      
      {/* Panel físico clásico de la Pokédex */}
      <div className="pokedex-hardware-bar">
        <div className="led-panel">
          <div className="main-blue-led"></div>
          <div className="small-leds">
            <div className="led red"></div>
            <div className="led yellow"></div>
            <div className="led green"></div>
          </div>
        </div>

        <nav className="pokedex-navigation">
          {isAuthenticated && (
            <>
              <Button 
                component={Link} 
                to="/" 
                variant="contained" 
                sx={{ 
                  backgroundColor: '#232323', 
                  border: '2px solid #555', 
                  marginRight: '10px',
                  fontFamily: 'monospace',
                  fontWeight: 'bold'
                }}
              >
                Ver Pokédex
              </Button>
              <Button 
                component={Link} 
                to="/add" 
                variant="contained" 
                sx={{ 
                  backgroundColor: '#28a745', 
                  border: '2px solid #1e7e34',
                  marginRight: '10px',
                  fontFamily: 'monospace',
                  fontWeight: 'bold'
                }}
              >
                + Subir Datos
              </Button>
              <Button 
                onClick={logout}
                variant="contained" 
                sx={{ 
                  backgroundColor: '#d32f2f', 
                  border: '2px solid #9a0007',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#9a0007'
                  }
                }}
              >
                Cerrar Sesión
              </Button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}