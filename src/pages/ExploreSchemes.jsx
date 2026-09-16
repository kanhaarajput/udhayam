import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { ShieldAlert, TrendingUp, Filter, CheckCircle2, Search, ArrowRight, X, FileText, Download } from 'lucide-react';
import { SUGGESTED_SCHEMES } from '../data/mockData';
import './ExploreSchemes.css';

export function ExploreSchemes() {
  const [appliedSchemes, setAppliedSchemes] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const handleApply = () => {
    if (selectedScheme) {
      setAppliedSchemes([...appliedSchemes, selectedScheme.id || 'ZED-001']);
      setShowApplyModal(false);
      toast.success('Successfully applied for the scheme!');
    }
  };

  return (
    <DashboardLayout>
      <div className="schemes-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Schemes & Incentives</h1>
            <p className="page-subtitle">Discover government subsidies and incentives tailored for your business.</p>
          </div>
          <Button variant="outline">
            <Filter size={18} style={{ marginRight: '6px' }} /> Filter Schemes
          </Button>
        </div>

        <div className="schemes-search-bar">
          <Search size={20} className="text-muted" />
          <input type="text" placeholder="Search by scheme name, sector, or keyword..." />
        </div>

        <div className="schemes-grid">
          {SUGGESTED_SCHEMES.map((scheme) => (
            <Card key={scheme.id} className="scheme-full-card">
              <CardContent className="scheme-full-content">
                <div className="sfc-header">
                  <div className="sfc-dept-badge">{scheme.department}</div>
                  <span className="sfc-match-badge">
                    <CheckCircle2 size={14} /> High Eligibility Match
                  </span>
                </div>
                
                <h3 className="sfc-title">{scheme.name}</h3>
                <p className="sfc-desc">{scheme.shortDesc}</p>

                <div className="sfc-highlights">
                  <div className="sfc-highlight-item">
                    <TrendingUp size={16} className="text-primary" />
                    <span><strong>Benefit:</strong> Up to ₹50 Lakhs Subsidy</span>
                  </div>
                  <div className="sfc-highlight-item">
                    <CheckCircle2 size={16} className="text-success" />
                    <span><strong>Eligibility:</strong> {scheme.eligibility}</span>
                  </div>
                </div>

                <div className="sfc-actions">
                  {appliedSchemes.includes(scheme.id) ? (
                    <Button variant="outline" style={{ width: '100%', borderColor: '#10b981', color: '#10b981' }} disabled>
                      Applied <CheckCircle2 size={16} style={{ marginLeft: '6px' }} />
                    </Button>
                  ) : (
                    <Button variant="primary" style={{ width: '100%' }} onClick={() => { setSelectedScheme(scheme); setShowApplyModal(true); }}>
                      Apply for Scheme <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                    </Button>
                  )}
                  <Button variant="outline" style={{ width: '100%' }} onClick={() => { setSelectedScheme(scheme); setShowGuidelinesModal(true); }}>
                    Read Guidelines
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Additional Mock Scheme */}
          <Card className="scheme-full-card">
            <CardContent className="scheme-full-content">
              <div className="sfc-header">
                <div className="sfc-dept-badge">Ministry of MSME</div>
                <span className="sfc-match-badge" style={{ background: '#f8fafc', color: '#475569' }}>
                  Potential Match
                </span>
              </div>
              
              <h3 className="sfc-title">Zero Defect Zero Effect (ZED) Scheme</h3>
              <p className="sfc-desc">Financial assistance for MSMEs to adopt Zero Defect manufacturing processes and improve quality standards.</p>

              <div className="sfc-highlights">
                <div className="sfc-highlight-item">
                  <TrendingUp size={16} className="text-primary" />
                  <span><strong>Benefit:</strong> 80% Subsidy on Certification</span>
                </div>
                <div className="sfc-highlight-item">
                  <CheckCircle2 size={16} className="text-success" />
                  <span><strong>Eligibility:</strong> Registered MSME</span>
                </div>
              </div>

              <div className="sfc-actions">
                {appliedSchemes.includes('ZED-001') ? (
                  <Button variant="outline" style={{ width: '100%', borderColor: '#10b981', color: '#10b981' }} disabled>
                    Applied <CheckCircle2 size={16} style={{ marginLeft: '6px' }} />
                  </Button>
                ) : (
                  <Button variant="primary" style={{ width: '100%' }} onClick={() => { setSelectedScheme({ id: 'ZED-001', name: 'Zero Defect Zero Effect (ZED) Scheme' }); setShowApplyModal(true); }}>
                    Apply for Scheme <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                  </Button>
                )}
                <Button variant="outline" style={{ width: '100%' }} onClick={() => { setSelectedScheme({ name: 'Zero Defect Zero Effect (ZED) Scheme' }); setShowGuidelinesModal(true); }}>
                  Read Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Apply Modal */}
        {showApplyModal && selectedScheme && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '500px' }}>
              <div className="modal-header">
                <h2>Confirm Application</h2>
                <button className="btn-icon" onClick={() => setShowApplyModal(false)}><X size={20} /></button>
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#334155', lineHeight: 1.5 }}>
                  You are about to apply for <strong>{selectedScheme.name}</strong>. 
                </p>
                <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
                  Your business profile data and submitted documents will be automatically shared with the nodal agency for initial screening.
                </p>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px' }} defaultChecked />
                    I confirm that the information provided in my profile is true and correct.
                  </label>
                </div>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setShowApplyModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleApply}>Submit Application</Button>
              </div>
            </div>
          </div>
        )}

        {/* Guidelines Modal */}
        {showGuidelinesModal && selectedScheme && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '700px', height: '80vh' }}>
              <div className="modal-header">
                <h2>Scheme Guidelines</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button variant="outline" size="sm" onClick={() => toast.success('Guidelines downloaded.')}>
                    <Download size={14} style={{ marginRight: '6px' }} /> Download PDF
                  </Button>
                  <button className="btn-icon" onClick={() => setShowGuidelinesModal(false)}><X size={20} /></button>
                </div>
              </div>
              <div style={{ padding: '24px', overflowY: 'auto', flexGrow: 1, background: '#f8fafc' }}>
                <div style={{ background: 'white', padding: '40px', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', minHeight: '100%' }}>
                  <h1 style={{ textAlign: 'center', marginBottom: '8px' }}>{selectedScheme.name}</h1>
                  <h3 style={{ textAlign: 'center', color: '#64748b', marginTop: 0, marginBottom: '32px' }}>Official Policy Guidelines 2026-27</h3>
                  
                  <h4>1. Introduction</h4>
                  <p style={{ lineHeight: 1.6, color: '#334155' }}>
                    The scheme aims to provide financial assistance to MSMEs to promote sustainable and quality-driven manufacturing practices.
                    It supports technology upgradation, green certifications, and export competitiveness.
                  </p>

                  <h4>2. Eligibility Criteria</h4>
                  <ul style={{ lineHeight: 1.6, color: '#334155' }}>
                    <li>Must be a registered MSME under the Udyam portal.</li>
                    <li>Must have at least 3 years of operational history.</li>
                    <li>Valid Consent to Operate (CTO) from State Pollution Control Board.</li>
                  </ul>

                  <h4>3. Quantum of Assistance</h4>
                  <p style={{ lineHeight: 1.6, color: '#334155' }}>
                    Eligible enterprises will receive a one-time capital subsidy of up to 25% on approved plant and machinery, 
                    capped at ₹50 Lakhs per enterprise.
                  </p>
                  
                  {/* Fake PDF look */}
                  <div style={{ marginTop: '60px', borderTop: '2px dashed #e2e8f0', paddingTop: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>
                    --- End of Document ---
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
