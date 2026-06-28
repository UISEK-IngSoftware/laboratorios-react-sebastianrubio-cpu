import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './Header.css';

export default function Header() {
  return (
    <div className="pokedex-header">
      {/* Luces de hardware de la Pokédex */}
      <div className="led-panel">
        <div className="main-blue-led"></div>
        <div className="small-leds">
          <div className="led red"></div>
          <div className="led yellow"></div>
          <div className="led green"></div>
        </div>
      </div>

      <h1 className="pokedex-title">Pokédex</h1>

      <nav>
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          style={{ backgroundColor: '#232323', border: '2px solid #555', marginRight: '10px' }}
        >
          Lista
        </Button>
        <Button 
          component={Link} 
          to="/add" 
          variant="contained" 
          style={{ backgroundColor: '#28a745', border: '2px solid #1e7e34' }}
        >
          + Añadir
        </Button>
      </nav>
    </div>
  );
}