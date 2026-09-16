import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { useAppStore } from '../store/useAppStore';
import { SUGGESTED_SCHEMES, SECTORS } from '../data/mockData';
import {
  AlertTriangle, CheckCircle2, Clock, ArrowRight, FileText,
  Lightbulb, ChevronRight, ClipboardList, Upload, MessageSquare, TrendingUp
} from 'lucide-react';
import './Dashboard.css';

const STATUS_CONFIG = {
  'not-started': { label: 'Not Started', color: '#94a3b8', bg: '#f1f5f9' },
  'in-progress': { label: 'In Progress', color: '#f59e0b', bg: '#fefce8' },
  'approved': { label: 'Approved', color: '#10b981', bg: '#ecfdf5' },
};

export function Dashboard() {
  const navigate = useNavigate();
  const checklist = useAppStore((state) => state.generatedChecklist);
  const formData = useAppStore((state) => state.businessFormData);

  const sectorLabel = SECTORS.find(s => s.value === formData.sector)?.label || 'Your Business';
  const totalItems = checklist.length;
  const approved = checklist.filter(i => i.status === 'approved').length;
  const inProgress = checklist.filter(i => i.status === 'in-progress').length;
  const pending = totalItems - approved - inProgress;
  const progressPercent = totalItems > 0 ? Math.round(((approved + inProgress * 0.5) / totalItems) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="dashboard-page">

        {/* SLA Alert Banner */}
        <div className="sla-alert-banner">
          <AlertTriangle size={18} />
          <span><strong>MPCB Consent to Establish</strong> — Review deadline in <strong>2 days</strong>. Ensure all documents are submitted to avoid SLA breach.</span>
          <Button variant="ghost" size="sm" onClick={() => navigate('/checklist')} style={{ flexShrink: 0 }}>
            View Details <ArrowRight size={14} style={{ marginLeft: '4px' }} />
          </Button>
        </div>

        {/* Header */}
        <div className="dashboard-page-header">
          <div>
            <h1 className="page-title">Unified Dashboard</h1>
            <p className="page-subtitle">
              {sectorLabel} — {totalItems} approvals tracked
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <Card className="stat-card">
            <CardContent className="stat-content">
              <span className="stat-value" style={{ color: '#3b82f6' }}>{totalItems}</span>
              <span className="stat-label">Total Approvals</span>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <span className="stat-value" style={{ color: '#10b981' }}>{approved}</span>
              <span className="stat-label">Approved</span>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <span className="stat-value" style={{ color: '#f59e0b' }}>{inProgress}</span>
              <span className="stat-label">In Progress</span>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <span className="stat-value" style={{ color: '#ef4444' }}>{pending}</span>
              <span className="stat-label">Pending</span>
            </CardContent>
          </Card>
        </div>

        {/* Progress Stepper */}
        <Card>
          <CardContent style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Application Progress</span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#0d9488' }}>{progressPercent}%</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </CardContent>
        </Card>

        <div className="dashboard-grid">
          {/* Approvals Table */}
          <div className="dashboard-main-col">
            <Card>
              <div className="card-header-row">
                <h3>Approval Status</h3>
                <Button variant="ghost" size="sm" onClick={() => navigate('/checklist')}>
                  View Full Checklist <ChevronRight size={14} />
                </Button>
              </div>
              <div className="approvals-table">
                <div className="at-header">
                  <span>Approval</span>
                  <span>Department</span>
                  <span>SLA (days)</span>
                  <span>Status</span>
                </div>
                {checklist.map((item) => {
                  const sc = STATUS_CONFIG[item.status];
                  return (
                    <div key={item.id} className="at-row">
                      <span className="at-name">{item.name}</span>
                      <span className="at-dept">{item.department}</span>
                      <span className="at-sla">{item.sladays}</span>
                      <span className="at-status" style={{ color: sc.color, background: sc.bg }}>
                        {sc.label}
                      </span>
                    </div>
                  );
                })}
                {checklist.length === 0 && (
                  <div className="at-empty">
                    <p>No checklist generated yet. <a onClick={() => navigate('/onboarding')}>Generate one now →</a></p>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="quick-actions-row">
              <Card className="qa-card" onClick={() => navigate('/checklist')}>
                <CardContent className="qa-content">
                  <ClipboardList size={20} />
                  <span>View Checklist</span>
                </CardContent>
              </Card>
              <Card className="qa-card" onClick={() => navigate('/upload-documents')}>
                <CardContent className="qa-content">
                  <Upload size={20} />
                  <span>Upload Documents</span>
                </CardContent>
              </Card>
              <Card className="qa-card" onClick={() => navigate('/helpdesk')}>
                <CardContent className="qa-content">
                  <MessageSquare size={20} />
                  <span>Ask a Question</span>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar: Suggested Schemes */}
          <div className="dashboard-side-col">
            <Card>
              <div className="card-header-row">
                <h3><Lightbulb size={18} style={{ marginRight: '8px', color: '#f59e0b' }} /> Suggested Schemes</h3>
              </div>
              <div className="schemes-list">
                {SUGGESTED_SCHEMES.map((scheme) => (
                  <div key={scheme.id} className="scheme-card">
                    <h4>{scheme.name}</h4>
                    <p>{scheme.shortDesc}</p>
                    <span className="scheme-eligibility">
                      <TrendingUp size={12} /> {scheme.eligibility}
                    </span>
                    <span className="scheme-dept">{scheme.department}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
