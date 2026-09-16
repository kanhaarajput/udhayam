import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { FileText, Clock, CheckCircle2, MessageSquare, AlertTriangle, ChevronRight, X, Download } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './ApplicationTracking.css';

export function ApplicationTracking() {
  const navigate = useNavigate();
  const checklist = useAppStore((state) => state.generatedChecklist);
  const [selectedApp, setSelectedApp] = useState(null);

  const handleDownload = () => {
    toast.success('Certificate downloaded successfully!');
  };
  
  // Simulated tracking data mapping
  const trackedApps = checklist.map((app, index) => ({
    ...app,
    appId: `APP-${202600 + index}`,
    submittedDate: '15 Aug 2026',
    slaDate: '30 Aug 2026',
    queries: index === 0 ? 1 : 0,
    steps: [
      { name: 'Application Submitted', status: 'completed', date: '15 Aug 2026' },
      { name: 'Document Verification', status: app.status === 'approved' ? 'completed' : 'in-progress', date: app.status === 'approved' ? '18 Aug 2026' : null },
      { name: 'Site Inspection', status: app.status === 'approved' ? 'completed' : 'pending', date: null },
      { name: 'Final Approval', status: app.status === 'approved' ? 'completed' : 'pending', date: null }
    ]
  }));

  return (
    <DashboardLayout>
      <div className="tracking-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">My Applications</h1>
            <p className="page-subtitle">Track the real-time status of your submitted applications.</p>
          </div>
        </div>

        <div className="tracking-list">
          {trackedApps.map((app) => (
            <Card key={app.id} className="tracking-card">
              <CardContent className="tracking-content">
                <div className="tc-header">
                  <div className="tc-title-group">
                    <FileText size={20} className="text-primary" />
                    <div>
                      <h3>{app.name}</h3>
                      <span className="tc-id">{app.appId} • {app.department}</span>
                    </div>
                  </div>
                  <div className="tc-status-group">
                    {app.queries > 0 && (
                      <span className="query-badge">
                        <AlertTriangle size={14} /> Action Required: Reply to Query
                      </span>
                    )}
                    <span className={`status-badge ${app.status}`}>
                      {app.status === 'approved' && <CheckCircle2 size={14}/>}
                      {app.status === 'in-progress' && <Clock size={14}/>}
                      {app.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="tc-details">
                  <div className="tc-detail-item">
                    <span className="label">Submitted On</span>
                    <span className="value">{app.submittedDate}</span>
                  </div>
                  <div className="tc-detail-item">
                    <span className="label">SLA Deadline</span>
                    <span className="value">{app.slaDate}</span>
                  </div>
                  <div className="tc-detail-item">
                    <span className="label">Expected Completion</span>
                    <span className="value sla-safe">Within {app.sladays} days</span>
                  </div>
                </div>

                <div className="tc-timeline">
                  {app.steps.map((step, idx) => (
                    <div key={idx} className={`timeline-step ${step.status}`}>
                      <div className="step-indicator"></div>
                      <div className="step-info">
                        <span className="step-name">{step.name}</span>
                        {step.date && <span className="step-date">{step.date}</span>}
                      </div>
                      {idx < app.steps.length - 1 && <div className="step-connector"></div>}
                    </div>
                  ))}
                </div>

                <div className="tc-actions">
                  {app.queries > 0 ? (
                    <Button variant="primary" size="sm" onClick={() => navigate('/helpdesk')}>
                      <MessageSquare size={16} style={{ marginRight: '6px' }} /> View & Reply to Query
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>View Application Details</Button>
                  )}
                  {app.status === 'approved' && (
                    <Button variant="primary" size="sm" onClick={handleDownload}>
                      <Download size={14} style={{ marginRight: '6px' }} /> Download Certificate
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {trackedApps.length === 0 && (
            <div className="empty-state">
              <p>No applications tracked yet.</p>
            </div>
          )}
        </div>

        {/* Application Details Modal */}
        {selectedApp && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '500px' }}>
              <div className="modal-header">
                <h2>Application Details</h2>
                <button className="btn-icon" onClick={() => setSelectedApp(null)}><X size={20} /></button>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{selectedApp.name}</h3>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{selectedApp.appId} • {selectedApp.department}</span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Status</span>
                    <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: '#0f172a' }}>{selectedApp.status.replace('-', ' ').toUpperCase()}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Submitted On</span>
                    <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: '#0f172a' }}>{selectedApp.submittedDate}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Estimated Completion</span>
                    <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: '#10b981' }}>{selectedApp.slaDate}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Documents Attached</span>
                    <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: '#0f172a' }}>4 Files Verified</p>
                  </div>
                </div>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="primary" onClick={() => setSelectedApp(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
