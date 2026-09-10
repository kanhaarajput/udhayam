import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Settings, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import './auth.css';

export function Login() {
  const [role, setRole] = useState('entrepreneur');
  const [step, setStep] = useState(1); // 1 = credentials, 2 = OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleInitialLogin = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    // Mock network request
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
      setCountdown(30);
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value !== '' && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleFinalLogin = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast.success('Login Successful! Welcome back.');
      if (role === 'entrepreneur') {
        navigate('/dashboard');
      } else {
        navigate('/officer/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-form-side">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
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
          
          {step === 1 ? (
            <>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Login to your account</p>
            </>
          ) : (
            <div className="fade-in-up">
              <div className="auth-back-btn" onClick={() => setStep(1)}>
                <ArrowLeft size={16} style={{ marginRight: '4px' }} /> Back
              </div>
              <div className="otp-icon-wrapper" style={{ marginTop: 'var(--spacing-xl)' }}>
                <ShieldCheck size={48} className="text-primary" />
              </div>
              <h1 className="auth-title" style={{ marginTop: 'var(--spacing-lg)' }}>Two-Step Verification</h1>
              <p className="auth-subtitle">We sent a 6-digit code to your registered mobile number ending in ****1234.</p>
            </div>
          )}
        </div>

        {step === 1 ? (
          <div className="fade-in">
            <div className="auth-role-toggle">
              <button 
                type="button"
                className={`role-btn ${role === 'entrepreneur' ? 'active' : ''}`}
                onClick={() => setRole('entrepreneur')}
              >
                Entrepreneur
              </button>
              <button 
                type="button"
                className={`role-btn ${role === 'official' ? 'active' : ''}`}
                onClick={() => setRole('official')}
              >
                Government Official
              </button>
            </div>

            <form className="auth-form" onSubmit={handleInitialLogin}>
              <Input 
                label="Email or Mobile Number" 
                placeholder="Enter email or mobile number" 
                type="text"
                required
              />
              <Input 
                label="Password" 
                placeholder="Enter your password" 
                type="password"
                required
              />
              
              <div className="auth-options" style={{ justifyContent: 'flex-end' }}>
                <Link to="/forgot-password" className="auth-link" style={{ fontWeight: 500 }}>
                  Forgot Password?
                </Link>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                type="submit"
                style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
                disabled={isVerifying}
              >
                {isVerifying ? <><Loader2 size={18} className="spin" style={{marginRight:'8px'}}/> Authenticating...</> : 'Continue'}
              </Button>
            </form>

            <div className="auth-footer">
              Don't have an account? <Link to="/register" className="auth-link">Register</Link>
            </div>
          </div>
        ) : (
          <form className="auth-form fade-in" onSubmit={handleFinalLogin}>
            <div className="otp-input-group">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  maxLength="1"
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  disabled={isVerifying}
                />
              ))}
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              type="submit"
              style={{ width: '100%', marginTop: 'var(--spacing-xl)' }}
              disabled={isVerifying || otp.join('').length < 6}
            >
              {isVerifying ? <><Loader2 size={18} className="spin" style={{marginRight:'8px'}}/> Verifying...</> : 'Verify & Login'}
            </Button>
            
            <div className="auth-footer" style={{ marginTop: 'var(--spacing-xl)' }}>
              {countdown > 0 ? (
                <span className="text-muted">Resend OTP in 00:{countdown.toString().padStart(2, '0')}</span>
              ) : (
                <button type="button" className="auth-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => setCountdown(30)}>Resend OTP</button>
              )}
            </div>
          </form>
        )}
      </div>

      <div className="auth-image-side">
        <img src="/login-bg.jpg" alt="Maharashtra Fort" className="auth-bg-image" />
        <div className="auth-image-overlay">
          <h2 className="auth-image-text">
            Industries Prosper,<br />
            <span style={{ color: 'var(--accent-500)' }}>Maharashtra</span><br />
            Progresses
          </h2>
        </div>
      </div>
    </div>
  );
}
