import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Stepper } from '../components/Stepper';
import { Info, Upload, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppStore } from '../store/useAppStore';
import './SubmitApplication.css';

export function SubmitApplication() {
  const navigate = useNavigate();
  const addApplication = useAppStore((state) => state.addApplication);
  const steps = ['Business Details', 'Location', 'Documents', 'Review'];
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form State Mock
  const [formData, setFormData] = useState({
    businessName: '',
    registrationType: 'Private Limited',
    panNumber: '',
    address: '',
    city: '',
    pincode: '',
    zone: 'Industrial',
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const newAppId = `APP-2023-${Math.floor(1000 + Math.random() * 9000)}`;
    addApplication({
      id: newAppId,
      type: 'Fire NOC',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending Review',
      variant: 'warning',
      entName: formData.businessName || 'New Enterprise'
    });
    toast.success('Application submitted successfully!');
    navigate('/tracking');
  };

  return (
    <DashboardLayout>
      <div className="submit-page">
        <div className="page-header">
          <h1 className="page-title">Submit Application</h1>
          <p className="page-subtitle">Complete the wizard to apply for Fire NOC</p>
        </div>

        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        <Card className="submit-card glass-panel">
          <CardContent>
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="wizard-step animate-fade-in">
                <h2 className="step-title">1. Business Details</h2>
                <div className="form-group">
                  <label>Business Name</label>
                  <input type="text" className="form-input" placeholder="e.g. Acme Corp" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Registration Type</label>
                  <select className="form-input" value={formData.registrationType} onChange={e => setFormData({...formData, registrationType: e.target.value})}>
                    <option>Private Limited</option>
                    <option>Sole Proprietorship</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>PAN Number</label>
                  <input type="text" className="form-input" placeholder="ABCDE1234F" value={formData.panNumber} onChange={e => setFormData({...formData, panNumber: e.target.value})} />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="wizard-step animate-fade-in">
                <h2 className="step-title">2. Location Data</h2>
                <div className="form-group">
                  <label>Complete Address</label>
                  <textarea className="form-input" rows="3" placeholder="Plot No. 42..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group" style={{flex: 1}}>
                    <label>City</label>
                    <input type="text" className="form-input" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="form-group" style={{flex: 1}}>
                    <label>Pincode</label>
                    <input type="text" className="form-input" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Zone Type</label>
                  <select className="form-input" value={formData.zone} onChange={e => setFormData({...formData, zone: e.target.value})}>
                    <option>Industrial</option>
                    <option>Commercial</option>
                    <option>Residential</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="wizard-step animate-fade-in">
                <h2 className="step-title">3. Document Upload</h2>
                <div className="upload-box">
                  <Upload size={32} color="var(--primary-500)" style={{marginBottom: '12px'}} />
                  <p style={{margin: '0 0 12px 0', color: 'var(--text-secondary)'}}>Drag and drop your Site Plan PDF here</p>
                  <Button variant="outline" size="sm">Browse Files</Button>
                </div>
                <div className="upload-box">
                  <Upload size={32} color="var(--primary-500)" style={{marginBottom: '12px'}} />
                  <p style={{margin: '0 0 12px 0', color: 'var(--text-secondary)'}}>Drag and drop your Company Registration PDF here</p>
                  <Button variant="outline" size="sm">Browse Files</Button>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div className="wizard-step animate-fade-in">
                <h2 className="step-title">4. Review & Submit</h2>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Approval</span>
                    <span className="summary-value">Fire NOC</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Department</span>
                    <span className="summary-value">Fire Department</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Application Fee</span>
                    <span className="summary-value">₹ 5,000</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Estimated Timeline</span>
                    <span className="summary-value">15 Working Days</span>
                  </div>
                </div>

                <div className="declaration-box">
                  <label className="checkbox-group">
                    <input type="checkbox" defaultChecked />
                    <span>I hereby declare that the information provided is true and correct to the best of my knowledge.</span>
                  </label>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="wizard-controls">
              <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1}>Back</Button>
              {currentStep < 4 ? (
                <Button variant="primary" onClick={handleNext}>Next Step</Button>
              ) : (
                <Button variant="primary" onClick={handleSubmit}><CheckCircle2 size={18} style={{marginRight: '8px'}}/> Proceed to Payment</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
