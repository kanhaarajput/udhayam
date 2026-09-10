import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';
import { Settings } from 'lucide-react'; // Using Settings as a placeholder for the gear in the logo

export function Navbar() {
  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="logo-icon">
            <Settings size={28} className="icon-gear" />
            <span className="icon-u">U</span>
            <span className="icon-1">1</span>
          </div>
          <div className="logo-text">
            <span className="logo-title">UdyamOne</span>
            <span className="logo-subtitle">A STRONGER MAHARASHTRA</span>
          </div>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/schemes" className="nav-link">Schemes</Link>
          <Link to="/departments" className="nav-link">Departments</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="navbar-actions">
          <Link to="/login">
            <Button variant="ghost" className="btn-login">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="accent" className="btn-register">Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
