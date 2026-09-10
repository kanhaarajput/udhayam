import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--primary-800)', color: 'white', padding: 'var(--spacing-3xl) 0 var(--spacing-xl)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-2xl)', marginBottom: 'var(--spacing-3xl)' }}>
          <div>
            <h3 style={{ fontSize: 'var(--text-xl)', color: 'white', marginBottom: 'var(--spacing-md)' }}>UdyamOne</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
              One Platform. A Stronger Maharashtra. Empowering industries, catalyzing growth, and fostering innovation.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--spacing-md)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <li><Link to="/about" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', transition: 'color 0.2s' }}>About Us</Link></li>
              <li><Link to="/schemes" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', transition: 'color 0.2s' }}>Schemes & Incentives</Link></li>
              <li><Link to="/departments" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', transition: 'color 0.2s' }}>Departments</Link></li>
              <li><Link to="/faq" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', transition: 'color 0.2s' }}>Help & FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--spacing-md)' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <li style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Toll Free: 1800-XXX-XXXX</li>
              <li style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Email: support@udyamone.maharashtra.gov.in</li>
              <li style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Mantralaya, Mumbai, Maharashtra</li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', margin: 0 }}>
            &copy; {new Date().getFullYear()} Government of Maharashtra. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <Link to="/privacy" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
