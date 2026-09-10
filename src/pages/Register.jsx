import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Settings, CheckCircle2, Clock, Map, TrendingUp } from 'lucide-react';
import './auth.css';

export function Register() {
  const [role, setRole] = useState('entrepreneur');
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-form-side">
        <div className="auth-header" style={{ marginBottom: 'var(--spacing-xl)' }}>
          <Link to="/" className="auth-logo" style={{ marginBottom: 'var(--spacing-md)' }}>
            <Settings size={32} color="var(--primary-700)" />
            <div style={{ textAlign: 'left', lineHeight: 1 }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-800)' }}>
                Udyam<span style={{ color: 'var(--secondary-600)' }}>One</span>
              </span>
              <div style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                GOVERNMENT OF MAHARASHTRA
              </div>
            </div>
          </Link>
          <h1 className="auth-title" style={{ fontSize: 'var(--text-2xl)' }}>Create Your Account</h1>
          <p className="auth-subtitle">Join Maharashtra's industrial ecosystem</p>
        </div>

        <div className="auth-role-toggle" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <button 
            className={`role-btn ${role === 'entrepreneur' ? 'active' : ''}`}
            onClick={() => setRole('entrepreneur')}
          >
            Entrepreneur
          </button>
          <button 
            className={`role-btn ${role === 'official' ? 'active' : ''}`}
            onClick={() => setRole('official')}
          >
            Government Official
          </button>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <Input label="Full Name" placeholder="Enter your full name" type="text" />
          <Input label="Email" placeholder="Enter your email" type="email" />
          <Input label="Mobile Number" placeholder="Enter mobile number" type="tel" />
          <Input label="Password" placeholder="Create a password" type="password" />
          
          <div className="auth-options" style={{ marginTop: 'var(--spacing-xs)' }}>
            <label className="checkbox-group">
              <input type="checkbox" />
              <span>I agree to the <Link to="/terms" className="auth-link">Terms & Conditions</Link></span>
            </label>
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            style={{ width: '100%', marginTop: 'var(--spacing-sm)' }}
            onClick={() => navigate('/profile')}
          >
            Register
          </Button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </div>
      </div>

      <div className="auth-info-side">
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className="info-feature">
            <div className="info-icon-wrapper">
              <CheckCircle2 size={24} />
            </div>
            <div className="info-content">
              <h3>One Platform</h3>
              <p>Apply for multiple approvals and licenses from a single unified dashboard.</p>
            </div>
          </div>
          
          <div className="info-feature">
            <div className="info-icon-wrapper">
              <Clock size={24} />
            </div>
            <div className="info-content">
              <h3>Track in Real Time</h3>
              <p>Monitor your application status and receive notifications instantly.</p>
            </div>
          </div>

          <div className="info-feature">
            <div className="info-icon-wrapper">
              <Map size={24} />
            </div>
            <div className="info-content">
              <h3>Scheme Recommendations</h3>
              <p>Get personalized scheme suggestions based on your business profile.</p>
            </div>
          </div>

          <div className="info-feature">
            <div className="info-icon-wrapper">
              <TrendingUp size={24} />
            </div>
            <div className="info-content">
              <h3>Grow Your Business</h3>
              <p>Access government support and resources to scale your enterprise.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
