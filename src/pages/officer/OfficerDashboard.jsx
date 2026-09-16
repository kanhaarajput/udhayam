import React, { useState, useEffect } from 'react';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { REVIEW_QUEUE } from '../../data/mockData';
import { useAppStore } from '../../store/useAppStore';
import toast from 'react-hot-toast';
import {
  Clock, CheckCircle2, XCircle, MessageSquare, FileText, AlertTriangle,
  ChevronDown, ChevronUp, MapPin, Building2, Calendar, ArrowRight
} from 'lucide-react';
import './OfficerDashboard.css';

const STATUS_COLORS = {
  'Pending Review': { color: '#f59e0b', bg: '#fefce8' },
  'Under Inspection': { color: '#3b82f6', bg: '#eff6ff' },
  'Approved': { color: '#10b981', bg: '#ecfdf5' },
  'Rejected': { color: '#ef4444', bg: '#fef2f2' },
  'Query Raised': { color: '#8b5cf6', bg: '#f5f3ff' },
};

const DOC_STATUS_COLORS = {
  'Verified': { color: '#10b981', icon: CheckCircle2 },
  'Flagged': { color: '#ef4444', icon: AlertTriangle },
  'Pending Review': { color: '#f59e0b', icon: Clock },
};

export function OfficerDashboard() {
  const [queue, setQueue] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const addNotification = useAppStore((state) => state.addNotification);

  useEffect(() => {
    setQueue([...REVIEW_QUEUE]);
  }, []);

  const handleApprove = (id) => {
    setQueue(prev => prev.map(app =>
      app.id === id ? { ...app, status: 'Approved' } : app
    ));
    const app = queue.find(a => a.id === id);
    toast.success(`${app.approval} approved for ${app.applicant}`);
    addNotification({
      title: 'Application Approved',
      message: `${app.approval} for ${app.applicant} has been approved.`,
      type: 'success',
    });
  };

  const handleReject = (id) => {
    setQueue(prev => prev.map(app =>
      app.id === id ? { ...app, status: 'Rejected' } : app
    ));
    const app = queue.find(a => a.id === id);
    toast.error(`${app.approval} rejected for ${app.applicant}`);
  };

  const handleQuery = (id) => {
    setQueue(prev => prev.map(app =>
      app.id === id ? { ...app, status: 'Query Raised' } : app
    ));
    const app = queue.find(a => a.id === id);
    toast(`Query raised for ${app.applicant}`, { icon: '❓' });
  };

  const pendingCount = queue.filter(a => a.status === 'Pending Review').length;
  const inspectionCount = queue.filter(a => a.status === 'Under Inspection').length;
  const approvedCount = queue.filter(a => a.status === 'Approved').length;

  return (
    <OfficerLayout>
      <div className="officer-dashboard">
        {/* Header */}
        <div className="od-header">
          <div>
            <h1>Review Queue</h1>
            <p>Department: MPCB — Maharashtra Pollution Control Board</p>
          </div>
        </div>

        {/* Stats */}
        <div className="od-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div className="od-stat">
            <FileText size={20} style={{ color: '#8b5cf6' }} />
            <div>
              <span className="od-stat-value">{pendingCount}</span>
              <span className="od-stat-label">New Applications</span>
            </div>
          </div>
          <div className="od-stat">
            <Clock size={20} style={{ color: '#f59e0b' }} />
            <div>
              <span className="od-stat-value">{queue.filter(a => a.status === 'Pending Review' || a.status === 'Under Inspection').length}</span>
              <span className="od-stat-label">Under Review</span>
            </div>
          </div>
          <div className="od-stat">
            <AlertTriangle size={20} style={{ color: '#ef4444' }} />
            <div>
              <span className="od-stat-value">{queue.filter(a => a.slaDaysLeft > 0 && a.slaDaysLeft <= 5).length}</span>
              <span className="od-stat-label">SLA At Risk</span>
            </div>
          </div>
          <div className="od-stat">
            <XCircle size={20} style={{ color: '#dc2626' }} />
            <div>
              <span className="od-stat-value">{queue.filter(a => a.slaDaysLeft < 0).length}</span>
              <span className="od-stat-label">Overdue</span>
            </div>
          </div>
          <div className="od-stat">
            <MapPin size={20} style={{ color: '#3b82f6' }} />
            <div>
              <span className="od-stat-value">{inspectionCount}</span>
              <span className="od-stat-label">Inspections Today</span>
            </div>
          </div>
          <div className="od-stat">
            <MessageSquare size={20} style={{ color: '#6366f1' }} />
            <div>
              <span className="od-stat-value">{queue.filter(a => a.status === 'Query Raised').length}</span>
              <span className="od-stat-label">Pending Queries</span>
            </div>
          </div>
        </div>

        {/* Queue List */}
        <div className="od-queue">
          {queue.map((app) => {
            const isExpanded = expandedId === app.id;
            const sc = STATUS_COLORS[app.status] || STATUS_COLORS['Pending Review'];

            return (
              <Card key={app.id} className={`od-card ${isExpanded ? 'expanded' : ''}`}>
                <button
                  className="od-card-header"
                  onClick={() => setExpandedId(isExpanded ? null : app.id)}
                >
                  <div className="od-card-left">
                    <span className="od-app-id">{app.id}</span>
                    <h3>{app.applicant}</h3>
                    <span className="od-app-type">{app.approval} • {app.sector}</span>
                  </div>
                  <div className="od-card-right">
                    <span className="od-sla-tag" style={{
                      color: app.slaDaysLeft <= 5 ? '#ef4444' : '#64748b',
                      fontWeight: app.slaDaysLeft <= 5 ? 700 : 500,
                    }}>
                      <Clock size={14} /> {app.slaDaysLeft} days left
                    </span>
                    <span className="od-status-badge" style={{ color: sc.color, background: sc.bg }}>
                      {app.status}
                    </span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="od-card-body">
                    {/* Details Row */}
                    <div className="od-details-row">
                      <div className="od-detail">
                        <MapPin size={14} />
                        <span>{app.location}</span>
                      </div>
                      <div className="od-detail">
                        <Building2 size={14} />
                        <span>{app.projectSize}</span>
                      </div>
                      <div className="od-detail">
                        <Calendar size={14} />
                        <span>Submitted: {app.submittedDate}</span>
                      </div>
                      <div className="od-detail">
                        <Clock size={14} />
                        <span>Deadline: {app.slaDeadline}</span>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="od-documents">
                      <h4><FileText size={14} /> Uploaded Documents</h4>
                      <div className="od-doc-list">
                        {app.documents.map((doc, i) => {
                          const dsc = DOC_STATUS_COLORS[doc.status] || DOC_STATUS_COLORS['Pending Review'];
                          const DocIcon = dsc.icon;
                          return (
                            <div key={i} className="od-doc-item">
                              <div className="od-doc-info">
                                <FileText size={14} style={{ color: '#94a3b8' }} />
                                <span>{doc.name}</span>
                              </div>
                              <div className="od-doc-status" style={{ color: dsc.color }}>
                                <DocIcon size={14} />
                                <span>{doc.status}</span>
                              </div>
                              {doc.issue && (
                                <span className="od-doc-issue">{doc.issue}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {app.status !== 'Approved' && app.status !== 'Rejected' && (
                      <div className="od-actions">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprove(app.id)}
                          style={{ background: '#10b981', borderColor: '#10b981' }}
                        >
                          <CheckCircle2 size={16} style={{ marginRight: '6px' }} /> Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(app.id)}
                          style={{ color: '#ef4444', borderColor: '#ef4444' }}
                        >
                          <XCircle size={16} style={{ marginRight: '6px' }} /> Reject
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuery(app.id)}
                        >
                          <MessageSquare size={16} style={{ marginRight: '6px' }} /> Raise Query
                        </Button>
                      </div>
                    )}

                    {app.status === 'Approved' && (
                      <div className="od-approved-banner">
                        <CheckCircle2 size={18} />
                        <span>This application has been approved</span>
                      </div>
                    )}

                    {app.status === 'Rejected' && (
                      <div className="od-rejected-banner">
                        <XCircle size={18} />
                        <span>This application has been rejected</span>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </OfficerLayout>
  );
}
