import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { AlertTriangle, Shield, CheckCircle2, ChevronRight, Activity, X, Zap, FileText } from 'lucide-react';
import './RiskReview.css';

const RISK_DATA = [
  {
    id: 'APP-2026-089',
    applicant: 'GreenTech Manufacturing',
    type: 'Factory License',
    risk: 'High',
    score: 85,
    factors: [
      'Category A polluting industry',
      'High volume water usage',
      'First-time applicant'
    ]
  },
  {
    id: 'APP-2026-112',
    applicant: 'BlueSky Chemicals',
    type: 'Pollution Control NOC',
    risk: 'Medium',
    score: 55,
    factors: [
      'Chemical storage on site',
      'Previous minor compliance delays'
    ]
  },
  {
    id: 'APP-2026-145',
    applicant: 'Sunrise IT Park',
    type: 'Building Plan Approval',
    risk: 'Low',
    score: 15,
    factors: [
      'Green building certified',
      'Renewable energy used'
    ]
  }
];

export function RiskReview() {
  const [selectedApp, setSelectedApp] = useState(null);
  const navigate = useNavigate();

  return (
    <OfficerLayout>
      <div className="risk-review-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Risk Assessment</h1>
            <p className="page-subtitle">AI-assisted risk categorization for pending applications.</p>
          </div>
          <div className="risk-legend">
            <span className="legend-item"><span className="legend-dot high"></span> High (&gt;75)</span>
            <span className="legend-item"><span className="legend-dot medium"></span> Med (40-75)</span>
            <span className="legend-item"><span className="legend-dot low"></span> Low (&lt;40)</span>
          </div>
        </div>

        <div className="risk-grid">
          {RISK_DATA.map(app => (
            <Card key={app.id} className={`risk-card risk-${app.risk.toLowerCase()}`}>
              <CardContent className="risk-content">
                <div className="risk-header">
                  <div className="rh-info">
                    <span className="rh-id">{app.id}</span>
                    <h3 className="rh-applicant">{app.applicant}</h3>
                    <span className="rh-type">{app.type}</span>
                  </div>
                  <div className={`risk-score-circle ${app.risk.toLowerCase()}`}>
                    <span className="rs-val">{app.score}</span>
                    <span className="rs-label">Risk Score</span>
                  </div>
                </div>

                <div className="risk-factors">
                  <h4><Activity size={14} /> Identified Risk Factors</h4>
                  <ul>
                    {app.factors.map((factor, idx) => (
                      <li key={idx}>
                        <AlertTriangle size={12} className="factor-icon" /> {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="risk-actions">
                  <Button variant="primary" style={{ width: '100%' }} onClick={() => setSelectedApp(app)}>
                    Detailed Assessment <ChevronRight size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Assessment Modal */}
        {selectedApp && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '600px' }}>
              <div className="modal-header">
                <h2>Detailed AI Risk Assessment</h2>
                <button className="btn-icon" onClick={() => setSelectedApp(null)}><X size={20} /></button>
              </div>
              <div style={{ padding: '24px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#0f172a' }}>{selectedApp.applicant}</h3>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>{selectedApp.id} • {selectedApp.type}</span>
                  </div>
                  <div style={{ 
                    background: selectedApp.risk === 'High' ? '#fee2e2' : selectedApp.risk === 'Medium' ? '#fef3c7' : '#dcfce7',
                    color: selectedApp.risk === 'High' ? '#b91c1c' : selectedApp.risk === 'Medium' ? '#b45309' : '#15803d',
                    padding: '8px 16px', borderRadius: '8px', textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1 }}>{selectedApp.score}</div>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, marginTop: '2px' }}>Risk Score</div>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#6366f1', fontWeight: 600 }}>
                    <Zap size={18} /> AI Analysis Summary
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
                    Based on historical data and predictive modeling, this application falls into the <strong>{selectedApp.risk}</strong> risk category. 
                    {selectedApp.risk === 'High' ? ' Immediate manual inspection and rigorous document verification are strongly recommended prior to approval.' 
                    : selectedApp.risk === 'Medium' ? ' Standard verification procedures apply. Pay special attention to compliance history.' 
                    : ' Application profile matches high-compliance historical models. Fast-track approval is recommended.'}
                  </p>
                </div>

                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#0f172a' }}>Detected Risk Factors</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedApp.factors.map((factor, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ marginTop: '2px', color: selectedApp.risk === 'High' ? '#ef4444' : selectedApp.risk === 'Medium' ? '#f59e0b' : '#10b981' }}>
                        <AlertTriangle size={16} />
                      </div>
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155', display: 'block' }}>{factor}</span>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>Automated flag raised during initial document scan.</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="outline" onClick={() => setSelectedApp(null)}>Close</Button>
                <Button variant="primary" onClick={() => navigate('/officer/review')}>Proceed to Review</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </OfficerLayout>
  );
}
