import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Stepper } from '../components/Stepper';
import { CheckCircle2, AlertCircle, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import './DocumentValidation.css';

export function DocumentValidation() {
  const navigate = useNavigate();
  const steps = ['Documents', 'Verify', 'Forms', 'Submit'];

  return (
    <DashboardLayout>
      <div className="validation-page">
        <div className="page-header">
          <h1 className="page-title">AI Document Validation</h1>
          <p className="page-subtitle">Our AI is verifying your uploaded documents for Fire NOC</p>
        </div>

        <Stepper steps={steps} currentStep={2} />

        <div className="validation-grid">
          {/* Left Column: Document Preview */}
          <Card className="preview-card">
            <div className="preview-header">
              <h3>Uploaded Document</h3>
            </div>
            <div className="preview-content">
              <img src="/cert-incorporation.jpg" alt="Document Preview" className="document-image" />
            </div>
          </Card>

          {/* Right Column: AI Validation Results */}
          <Card className="results-card">
            <CardContent>
              <h3 className="section-title">AI Validation Results</h3>
              
              <ul className="validation-list">
                <li><CheckCircle2 size={18} className="text-success" /> Document is readable</li>
                <li><CheckCircle2 size={18} className="text-success" /> Company name matches</li>
                <li><CheckCircle2 size={18} className="text-success" /> CIN number found</li>
                <li><CheckCircle2 size={18} className="text-success" /> Address verified</li>
                <li><CheckCircle2 size={18} className="text-success" /> Document is valid</li>
                <li><CheckCircle2 size={18} className="text-success" /> All required fields present</li>
              </ul>

              <div className="validation-alert success">
                <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
                <span><strong>Document looks good!</strong><br/>You can proceed to submit.</span>
              </div>

              <div className="form-actions" style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="ghost">Re-upload</Button>
                <Button variant="primary" onClick={() => navigate('/submit-application')}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
