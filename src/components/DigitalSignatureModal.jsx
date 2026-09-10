import React, { useState } from 'react';
import { ShieldCheck, Usb, Loader2, KeyRound, X } from 'lucide-react';
import { Button } from './Button';
import confetti from 'canvas-confetti';
import './DigitalSignatureModal.css';

export function DigitalSignatureModal({ isOpen, onClose, onSignComplete }) {
  const [pin, setPin] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSign = () => {
    if (pin.length < 4) {
      setError('Invalid PIN. Please enter a 4-digit token PIN.');
      return;
    }
    setError('');
    setIsSigning(true);

    // Mock cryptographic signing delay
    setTimeout(() => {
      setIsSigning(false);
      
      // Confetti Explosion
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#2563eb', '#16a34a', '#eab308']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#2563eb', '#16a34a', '#eab308']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      onSignComplete();
    }, 2000);
  };

  return (
    <div className="dsc-modal-overlay">
      <div className="dsc-modal fade-in-scale">
        <button className="icon-btn close-btn" onClick={onClose} disabled={isSigning}>
          <X size={20} />
        </button>

        <div className="dsc-modal-header text-center">
          <div className="dsc-icon-wrapper">
            <ShieldCheck size={40} className="text-primary" />
          </div>
          <h2>Digital Signature Required</h2>
          <p className="text-muted" style={{ margin: 0, marginTop: '8px' }}>Please insert your DSC Token and enter the PIN to sign this approval.</p>
        </div>

        <div className="dsc-modal-body">
          <div className="dsc-token-status">
            <Usb size={24} className="text-success" />
            <span>Token Detected: <strong>ePass2003 (Officer_001)</strong></span>
          </div>

          <div className="form-group">
            <label><KeyRound size={16} style={{marginRight:'8px', verticalAlign:'text-bottom'}}/> Token PIN</label>
            <input 
              type="password" 
              className="form-input text-center" 
              placeholder="••••" 
              maxLength={8}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError('');
              }}
              disabled={isSigning}
              style={{ fontSize: '1.5rem', letterSpacing: '0.5em' }}
            />
            {error && <p className="text-error text-xs" style={{marginTop:'4px'}}>{error}</p>}
          </div>
        </div>

        <div className="dsc-modal-footer">
          <Button variant="outline" onClick={onClose} disabled={isSigning}>Cancel</Button>
          <Button variant="primary" onClick={handleSign} disabled={isSigning} style={{ minWidth: '140px' }}>
            {isSigning ? (
              <><Loader2 size={18} className="spin" style={{marginRight:'8px'}}/> Signing...</>
            ) : (
              'Sign & Approve'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
