import React from 'react';
import './Input.css';

export function Input({ label, error, className = '', id, ...props }) {
  const inputId = id || Math.random().toString(36).substr(2, 9);
  
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={inputId} className="input-label">{label}</label>}
      <input 
        id={inputId}
        className={`input-field ${error ? 'input-error' : ''}`} 
        {...props} 
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}
