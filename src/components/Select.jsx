import React from 'react';
import './Input.css'; // Reusing the Input styles for consistency
import { ChevronDown } from 'lucide-react';

export function Select({ label, options, className = '', ...props }) {
  return (
    <div className={`input-container ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <div style={{ position: 'relative' }}>
        <select className="input-field" style={{ appearance: 'none', paddingRight: '40px' }} {...props}>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}>
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
}
