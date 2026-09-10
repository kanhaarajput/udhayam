import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Building2, Blocks, BellRing, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import './Onboarding.css';

export function Onboarding() {
  const navigate = useNavigate();
  const completeOnboarding = useAppStore(state => state.completeOnboarding);
  
  const [step, setStep] = useState(1);
  const [isProvisioning, setIsProvisioning] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    companyName: 'My Awesome Company',
    registrationType: 'Private Limited',
    connectDigiLocker: true,
    connectTally: false,
    notifyEmail: true,
    notifySms: true
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const finishOnboarding = () => {
    setIsProvisioning(true);
    
    // Simulate workspace provisioning delay
    setTimeout(() => {
      completeOnboarding({
        businessProfile: {
          companyName: formData.companyName,
          registrationType: formData.registrationType
        },
        notifications: {
          email: formData.notifyEmail,
          sms: formData.notifySms
        }
      });
      navigate('/dashboard');
    }, 2500);
  };

  if (isProvisioning) {
    return (
      <div className="onboarding-container centered">
        <div className="provisioning-screen fade-in-up">
          <div className="spinner-large"></div>
          <h2>Provisioning Workspace</h2>
          <p>Setting up your secure enterprise dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-container">
      
      {/* Progress Bar Header */}
      <div className="onboarding-header">
        <div className="onboarding-brand">
          <img src="/logo.png" alt="UdyamOne Logo" style={{ height: '32px', width: 'auto' }} onError={(e) => {e.target.style.display='none'}} />
          <h2>UdyamOne</h2>
        </div>
        <div className="progress-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>
      </div>

      <div className="onboarding-content-wrapper fade-in-up" key={step}>
        
        {/* Step 1: Business Profile */}
        {step === 1 && (
          <div className="onboarding-step">
            <div className="step-icon-wrapper"><Building2 size={32} /></div>
            <h1 className="step-title">Welcome to UdyamOne!</h1>
            <p className="step-subtitle">Let's start by setting up your business profile.</p>

            <Card className="onboarding-card">
              <CardContent className="onboarding-form">
                <div className="form-group">
                  <label>Company Name</label>
                  <input 
                    type="text" 
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="e.g. ABC Foods Pvt. Ltd."
                  />
                </div>
                <div className="form-group">
                  <label>Registration Type</label>
                  <select 
                    value={formData.registrationType}
                    onChange={(e) => setFormData({...formData, registrationType: e.target.value})}
                  >
                    <option value="Private Limited">Private Limited</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="LLP">LLP</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Integrations */}
        {step === 2 && (
          <div className="onboarding-step">
            <div className="step-icon-wrapper"><Blocks size={32} /></div>
            <h1 className="step-title">Connect Your Data</h1>
            <p className="step-subtitle">Connect third-party apps to instantly populate your dashboard.</p>

            <div className="onboarding-integration-grid">
              <label className={`integration-select-card ${formData.connectDigiLocker ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={formData.connectDigiLocker}
                  onChange={(e) => setFormData({...formData, connectDigiLocker: e.target.checked})}
                />
                <div className="int-content">
                  <h4>DigiLocker</h4>
                  <p>Auto-sync KYC documents</p>
                </div>
                <div className="int-check"><CheckCircle2 size={20} /></div>
              </label>

              <label className={`integration-select-card ${formData.connectTally ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={formData.connectTally}
                  onChange={(e) => setFormData({...formData, connectTally: e.target.checked})}
                />
                <div className="int-content">
                  <h4>Tally ERP9</h4>
                  <p>Sync accounting data</p>
                </div>
                <div className="int-check"><CheckCircle2 size={20} /></div>
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Notifications */}
        {step === 3 && (
          <div className="onboarding-step">
            <div className="step-icon-wrapper"><BellRing size={32} /></div>
            <h1 className="step-title">Stay Informed</h1>
            <p className="step-subtitle">How should we notify you about expiring licenses and approvals?</p>

            <Card className="onboarding-card">
              <CardContent className="onboarding-form">
                <label className="checkbox-row">
                  <input 
                    type="checkbox" 
                    checked={formData.notifyEmail}
                    onChange={(e) => setFormData({...formData, notifyEmail: e.target.checked})}
                  />
                  <div className="checkbox-text">
                    <strong>Email Alerts</strong>
                    <span>Receive detailed weekly compliance summaries.</span>
                  </div>
                </label>
                <div className="form-divider"></div>
                <label className="checkbox-row">
                  <input 
                    type="checkbox" 
                    checked={formData.notifySms}
                    onChange={(e) => setFormData({...formData, notifySms: e.target.checked})}
                  />
                  <div className="checkbox-text">
                    <strong>SMS Notifications</strong>
                    <span>Receive instant alerts for urgent officer queries.</span>
                  </div>
                </label>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="onboarding-footer">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack} className="btn-back">
              <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Back
            </Button>
          ) : <div></div>}
          
          <Button variant="primary" onClick={handleNext} className="btn-next">
            {step === 3 ? 'Launch Dashboard' : 'Continue'} 
            {step < 3 && <ChevronRight size={16} style={{ marginLeft: '4px' }} />}
          </Button>
        </div>

      </div>
    </div>
  );
}
