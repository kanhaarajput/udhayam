import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { ArrowLeft, FileText, Clock } from 'lucide-react';
import './ApplicationReview.css';

export function ApplicationReview() {
  const navigate = useNavigate();

  return (
    <OfficerLayout>
      <div className="review-page">
        <div className="details-header" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <Button variant="ghost" size="sm" onClick={() => navigate('/officer/dashboard')} style={{ paddingLeft: 0 }}>
            <ArrowLeft size={16} style={{ marginRight: '4px' }} /> Back to Dashboard
          </Button>
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 className="page-title">Application Review: APP-2023-8901 (Fire NOC)</h1>
              <p className="page-subtitle">Submitted by ABC Foods Pvt. Ltd. on Oct 25, 2023</p>
            </div>
            <Badge variant="warning">Pending Review</Badge>
          </div>
        </div>

        <div className="review-grid">
          {/* Ent Details */}
          <Card className="details-card">
            <CardContent>
              <h3 className="section-title">Entrepreneur Details</h3>
              <div className="info-row">
                <span className="info-label">Company Name</span>
                <span className="info-value">ABC Foods Pvt. Ltd.</span>
              </div>
              <div className="info-row">
                <span className="info-label">PAN Number</span>
                <span className="info-value">AABCA1234D</span>
              </div>
              <div className="info-row">
                <span className="info-label">Industry Sector</span>
                <span className="info-value">Food Processing</span>
              </div>
              <div className="info-row">
                <span className="info-label">Constitution Type</span>
                <span className="info-value">Private Limited</span>
              </div>
            </CardContent>
          </Card>

          {/* Docs */}
          <Card className="docs-card">
            <CardContent>
              <h3 className="section-title">Submitted Documents</h3>
              <div className="doc-list-review">
                <div className="doc-row">
                  <div className="doc-name"><FileText size={18}/> Company Registration</div>
                  <Badge variant="warning"><Clock size={12} style={{marginRight:'4px'}}/> Pending Verification</Badge>
                </div>
                <div className="doc-row">
                  <div className="doc-name"><FileText size={18}/> Site Plan</div>
                  <Badge variant="warning"><Clock size={12} style={{marginRight:'4px'}}/> Pending Verification</Badge>
                </div>
                <div className="doc-row">
                  <div className="doc-name"><FileText size={18}/> Building Plan</div>
                  <Badge variant="warning"><Clock size={12} style={{marginRight:'4px'}}/> Pending Verification</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="review-actions">
          <Button variant="primary" size="lg" onClick={() => navigate('/officer/verify')}>
            Start Verification Process
          </Button>
        </div>
      </div>
    </OfficerLayout>
  );
}
