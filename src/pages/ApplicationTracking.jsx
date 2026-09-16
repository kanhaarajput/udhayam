import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { FileText, Clock, CheckCircle2, MessageSquare, AlertTriangle, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './ApplicationTracking.css';

export function ApplicationTracking() {
  const checklist = useAppStore((state) => state.generatedChecklist);
  
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
                    <Button variant="primary" size="sm">
                      <MessageSquare size={16} style={{ marginRight: '6px' }} /> View & Reply to Query
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">View Application Details</Button>
                  )}
                  {app.status === 'approved' && (
                    <Button variant="primary" size="sm">Download Certificate</Button>
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
      </div>
    </DashboardLayout>
  );
}
