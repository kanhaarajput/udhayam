import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { Clock, AlertTriangle, XCircle, ArrowRight, ShieldAlert, X } from 'lucide-react';
import './SLAMonitor.css';

const SLA_DATA = [
  {
    id: 'APP-2026-021',
    applicant: 'Apex Industries',
    approval: 'Factory License',
    submitted: '01 Aug 2026',
    deadline: '15 Aug 2026',
    status: 'Overdue',
    daysOverdue: 3,
    officer: 'You'
  },
  {
    id: 'APP-2026-089',
    applicant: 'GreenTech Manufacturing',
    approval: 'Pollution NOC',
    submitted: '10 Aug 2026',
    deadline: '20 Aug 2026',
    status: 'At Risk',
    daysLeft: 2,
    officer: 'You'
  }
];

export function SLAMonitor() {
  const navigate = useNavigate();
  const [showEscalationModal, setShowEscalationModal] = useState(false);

  return (
    <OfficerLayout>
      <div className="sla-monitor-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">SLA Monitor</h1>
            <p className="page-subtitle">Track applications at risk of breaching Service Level Agreements.</p>
          </div>
          <Button variant="outline" onClick={() => setShowEscalationModal(true)}>
            <ShieldAlert size={16} style={{ marginRight: '6px' }} /> Escalation Matrix
          </Button>
        </div>

        <div className="sla-dashboard-grid">
          <Card className="sla-stat-card overdue">
            <CardContent className="sla-stat-content">
              <XCircle size={32} />
              <div className="sla-stat-text">
                <h2>1</h2>
                <span>Applications Overdue</span>
              </div>
            </CardContent>
          </Card>
          <Card className="sla-stat-card at-risk">
            <CardContent className="sla-stat-content">
              <AlertTriangle size={32} />
              <div className="sla-stat-text">
                <h2>3</h2>
                <span>Nearing Deadline (≤ 5 days)</span>
              </div>
            </CardContent>
          </Card>
          <Card className="sla-stat-card safe">
            <CardContent className="sla-stat-content">
              <Clock size={32} />
              <div className="sla-stat-text">
                <h2>42</h2>
                <span>On Track</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="sla-table-container">
          <h3>Applications Requiring Immediate Attention</h3>
          <table className="sla-table">
            <thead>
              <tr>
                <th>Application</th>
                <th>Applicant</th>
                <th>Submitted</th>
                <th>SLA Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {SLA_DATA.map(app => (
                <tr key={app.id} className={`sla-row ${app.status.toLowerCase().replace(' ', '-')}`}>
                  <td>
                    <span className="app-id-text">{app.id}</span>
                    <span className="app-type-text">{app.approval}</span>
                  </td>
                  <td className="font-semibold">{app.applicant}</td>
                  <td>{app.submitted}</td>
                  <td className="font-semibold">{app.deadline}</td>
                  <td>
                    {app.status === 'Overdue' ? (
                      <span className="sla-badge overdue">
                        Overdue by {app.daysOverdue} days
                      </span>
                    ) : (
                      <span className="sla-badge at-risk">
                        {app.daysLeft} days left
                      </span>
                    )}
                  </td>
                  <td>
                    <Button variant="outline" size="sm" onClick={() => navigate('/officer/review')}>
                      Process Now <ArrowRight size={14} style={{ marginLeft: '4px' }}/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Escalation Matrix Modal */}
        {showEscalationModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '600px' }}>
              <div className="modal-header">
                <h2>Escalation Matrix</h2>
                <button className="btn-icon" onClick={() => setShowEscalationModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#475569' }}>
                  Standard operating procedure for handling applications that breach SLA deadlines.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid #fecaca', background: '#fef2f2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700, color: '#dc2626' }}>Level 1: Officer Alert</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#991b1b', background: '#fee2e2', padding: '2px 8px', borderRadius: '12px' }}>Day 0 to +2</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#7f1d1d' }}>
                      Application is flagged in red on the SLA Monitor. Automated email reminder sent to the assigned processing officer.
                    </p>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid #fed7aa', background: '#fff7ed' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700, color: '#c2410c' }}>Level 2: Supervisor Escalation</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#9a3412', background: '#ffedd5', padding: '2px 8px', borderRadius: '12px' }}>Day +3 to +5</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#7c2d12' }}>
                      Application is escalated to the Department Supervisor. Justification must be provided in the system for the delay.
                    </p>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#f9fafb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700, color: '#1f2937' }}>Level 3: HOD & Admin Review</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', background: '#e5e7eb', padding: '2px 8px', borderRadius: '12px' }}>Day +5 onwards</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#4b5563' }}>
                      Case is forwarded to the Head of Department (HOD) and flagged in the Admin Dashboard Bottleneck Monitor. Penalty protocols may initiate.
                    </p>
                  </div>

                </div>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="primary" onClick={() => setShowEscalationModal(false)}>Close Matrix</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </OfficerLayout>
  );
}
