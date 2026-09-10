import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Stepper } from '../components/Stepper';
import { FileText, Upload, CheckCircle2, Info } from 'lucide-react';
import './DocumentUpload.css';

export function DocumentUpload() {
  const navigate = useNavigate();
  const steps = ['Documents', 'Verify', 'Forms', 'Submit'];

  return (
    <DashboardLayout>
      <div className="upload-page">
        <div className="page-header">
          <h1 className="page-title">Upload Documents</h1>
          <p className="page-subtitle">Please upload the required documents for Fire NOC</p>
        </div>

        <Stepper steps={steps} currentStep={1} />

        <div className="upload-grid">
          {/* Left Column: Document List */}
          <Card className="docs-list-card">
            <CardContent>
              <h3 className="section-title">Required Documents</h3>
              <div className="doc-item">
                <div className="doc-info">
                  <div className="doc-icon"><FileText size={20} /></div>
                  <div>
                    <h4 className="doc-name">Company Registration Certificate</h4>
                    <p className="doc-meta">PDF/JPG, Max 10MB</p>
                  </div>
                </div>
                <div className="doc-status uploaded">
                  <CheckCircle2 size={16} /> Uploaded
                </div>
              </div>
              
              <div className="doc-item">
                <div className="doc-info">
                  <div className="doc-icon"><FileText size={20} /></div>
                  <div>
                    <h4 className="doc-name">Site Plan</h4>
                    <p className="doc-meta">DWG/PDF, Max 50MB</p>
                  </div>
                </div>
                <Button variant="primary" size="sm" className="btn-upload">
                  <Upload size={16} /> Upload
                </Button>
              </div>

              <div className="doc-item">
                <div className="doc-info">
                  <div className="doc-icon"><FileText size={20} /></div>
                  <div>
                    <h4 className="doc-name">Building Plan</h4>
                    <p className="doc-meta">DWG/PDF, Max 50MB</p>
                  </div>
                </div>
                <Button variant="primary" size="sm" className="btn-upload">
                  <Upload size={16} /> Upload
                </Button>
              </div>

              <div className="doc-item">
                <div className="doc-info">
                  <div className="doc-icon"><FileText size={20} /></div>
                  <div>
                    <h4 className="doc-name">Ownership / Lease Document</h4>
                    <p className="doc-meta">PDF, Max 10MB</p>
                  </div>
                </div>
                <div className="doc-status uploaded">
                  <CheckCircle2 size={16} /> Uploaded
                </div>
              </div>
              
              <div className="form-actions" style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="ghost">Back</Button>
                <Button variant="primary" onClick={() => navigate('/document-validation')}>Save & Continue</Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Guidelines */}
          <div className="guidelines-column">
            <Card className="guidelines-card">
              <CardContent>
                <div className="guidelines-header">
                  <Info size={20} color="var(--primary-600)" />
                  <h3>Document Guidelines</h3>
                </div>
                <ul className="guidelines-list">
                  <li><strong>File Formats:</strong> Use PDF, JPG, PNG, or DWG for plans.</li>
                  <li><strong>Size Limit:</strong> Max file size 50MB for plans; others under 10MB.</li>
                  <li><strong>Clarity:</strong> Ensure all documents are clear, legible, and current.</li>
                  <li><strong>Consistency:</strong> Information must match your business profile exactly.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
