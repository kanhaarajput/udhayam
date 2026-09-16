import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { SECTORS, PROJECT_SIZES, LOCATIONS, STAGES, SECTOR_CHECKLISTS } from '../data/mockData';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Shield, ChevronLeft, Loader2, Sparkles } from 'lucide-react';
import './Onboarding.css';

export function Onboarding() {
  const navigate = useNavigate();
  const setBusinessFormData = useAppStore((state) => state.setBusinessFormData);
  const setGeneratedChecklist = useAppStore((state) => state.setGeneratedChecklist);

  const [formData, setFormData] = useState({
    sector: '',
    projectSize: '',
    location: '',
    stage: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const isFormValid = formData.sector && formData.projectSize && formData.location && formData.stage;

  const handleGenerate = () => {
    if (!isFormValid) return;

    setIsGenerating(true);
    setBusinessFormData(formData);

    // Simulate Rules Engine + RAG processing
    setTimeout(() => {
      const checklist = SECTOR_CHECKLISTS[formData.sector] || [];
      setGeneratedChecklist(checklist.map(item => ({ ...item })));
      setIsGenerating(false);
      navigate('/checklist');
    }, 2000);
  };

  if (isGenerating) {
    return (
      <div className="onboarding-container centered">
        <div className="generating-screen">
          <div className="generating-spinner">
            <Sparkles size={32} className="sparkle-animate" />
          </div>
          <h2>Analyzing Your Business Profile</h2>
          <p>Our Rules Engine is cross-referencing regulations, identifying applicable approvals, and generating your personalized compliance checklist...</p>
          <div className="generating-steps">
            <div className="gen-step active">
              <div className="gen-dot"></div>
              <span>Matching sector regulations</span>
            </div>
            <div className="gen-step active" style={{ animationDelay: '0.5s' }}>
              <div className="gen-dot"></div>
              <span>Checking location-specific rules</span>
            </div>
            <div className="gen-step" style={{ animationDelay: '1s' }}>
              <div className="gen-dot"></div>
              <span>Building compliance checklist</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-container centered">
      <div className="onboarding-content-wrapper">
        <div className="onboarding-step">
          <div className="step-icon-wrapper">
            <Shield size={32} />
          </div>
          <h1 className="step-title">Tell Us About Your Business</h1>
          <p className="step-subtitle">
            We'll use this information to identify every approval, license, and NOC your project needs.
          </p>

          <Card className="onboarding-card">
            <CardContent className="onboarding-form">
              <div className="form-group">
                <label>Business / Sector</label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                >
                  <option value="">Select your sector</option>
                  {SECTORS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Project Size</label>
                <select
                  value={formData.projectSize}
                  onChange={(e) => setFormData({ ...formData, projectSize: e.target.value })}
                >
                  <option value="">Select project size</option>
                  {PROJECT_SIZES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                >
                  <option value="">Select location type</option>
                  {LOCATIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Stage of Operation</label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                >
                  <option value="">Select stage</option>
                  {STAGES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="onboarding-footer">
          <Button variant="outline" onClick={() => navigate('/login')} className="btn-back">
            <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Back
          </Button>
          <Button
            variant="primary"
            onClick={handleGenerate}
            className="btn-next"
            disabled={!isFormValid}
          >
            {isGenerating ? (
              <><Loader2 size={18} className="spin" style={{ marginRight: '8px' }} /> Generating...</>
            ) : (
              <><Sparkles size={18} style={{ marginRight: '8px' }} /> Generate Checklist</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
