import React from 'react';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { AlertTriangle, Shield, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
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
                  <Button variant="primary" style={{ width: '100%' }}>
                    Detailed Assessment <ChevronRight size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </OfficerLayout>
  );
}
