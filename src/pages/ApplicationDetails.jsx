import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ArrowLeft, CheckCircle2, Circle, Clock, FileText, Download } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './ApplicationDetails.css';

export function ApplicationDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const applications = useAppStore(state => state.applications);
  
  // Find the app, or fallback to the first one just in case
  const appData = applications.find(a => a.id === id) || applications[0];
  const isApproved = appData.status === 'Approved';

  return (
    <DashboardLayout>
      <div className="details-page">
        <div className="details-header">
          <Button variant="ghost" size="sm" onClick={() => navigate('/tracking')} style={{ paddingLeft: 0 }}>
            <ArrowLeft size={16} style={{ marginRight: '4px' }} /> Back to Tracking
          </Button>
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 className="page-title">{appData.type} - {appData.id}</h1>
              <p className="page-subtitle">Submitted on {appData.date} by {appData.entName}</p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
              {isApproved && (
                <Button variant="primary" onClick={() => navigate(`/certificate/${appData.id}`)}>
                  <Download size={16} style={{ marginRight: '8px' }} /> Download Certificate
                </Button>
              )}
              <Badge variant={appData.variant}>{appData.status}</Badge>
            </div>
          </div>
        </div>

        <div className="details-grid">
          {/* Left Column: Timeline */}
          <Card className="timeline-card">
            <CardContent>
              <h3 className="section-title">Application Status</h3>
              <div className="timeline">
                <div className="timeline-item completed">
                  <div className="timeline-icon"><CheckCircle2 size={24} /></div>
                  <div className="timeline-content">
                    <h4>Application Submitted</h4>
                    <p>{appData.date} - Successfully received.</p>
                  </div>
                </div>
                
                {/* Dynamically render steps based on status */}
                <div className="timeline-item completed">
                  <div className="timeline-icon"><CheckCircle2 size={24} /></div>
                  <div className="timeline-content">
                    <h4>Document Verification</h4>
                    <p>Documents verified by system.</p>
                  </div>
                </div>

                <div className={`timeline-item ${isApproved ? 'completed' : 'active'}`}>
                  <div className="timeline-icon">{isApproved ? <CheckCircle2 size={24} /> : <Clock size={24} />}</div>
                  <div className="timeline-content">
                    <h4>Officer Review</h4>
                    <p>{isApproved ? 'Review completed successfully.' : 'Pending - Under review by officer.'}</p>
                  </div>
                </div>

                <div className={`timeline-item ${isApproved ? 'completed' : 'pending'}`}>
                  <div className="timeline-icon">{isApproved ? <CheckCircle2 size={24} /> : <Circle size={24} />}</div>
                  <div className="timeline-content">
                    <h4>Final Approval</h4>
                    <p>{isApproved ? 'Application Approved!' : 'Pending Final Decision'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Details */}
          <div className="side-details">
            <Card className="info-card">
              <CardContent>
                <h3 className="section-title">Payment Information</h3>
                <div className="info-row">
                  <span className="info-label">Application Fee</span>
                  <span className="info-value">₹ 5,000</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Payment Status</span>
                  <span className="info-value text-success font-medium">Completed</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Transaction ID</span>
                  <span className="info-value">TXN987654321</span>
                </div>
              </CardContent>
            </Card>

            <Card className="docs-card" style={{ marginTop: 'var(--spacing-xl)' }}>
              <CardContent>
                <h3 className="section-title">Submitted Documents</h3>
                <ul className="docs-list">
                  <li><FileText size={16} /> Company Registration Certificate</li>
                  <li><FileText size={16} /> Site Plan</li>
                  <li><FileText size={16} /> Building Plan</li>
                  <li><FileText size={16} /> Ownership Document</li>
                </ul>
                <Button variant="outline" size="sm" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>View All Documents</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
