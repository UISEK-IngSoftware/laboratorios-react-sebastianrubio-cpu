import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './Header.css';

export default function Header({ isAuthenticated, onLogout }) {
  return (
    <>
      <div className="pokedex-hover-zone" />
      <div className="pokedex-header-container">
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
               Subir Datos
            </Button>
            {isAuthenticated && (
              <Button 
                onClick={onLogout}
                variant="contained" 
                sx={{ 
                  backgroundColor: '#dc3545', 
                  border: '2px solid #bd2130',
                  fontFamily: 'monospace',
                  fontWeight: 'bold'
                }}
              >
                 Salir
              </Button>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}