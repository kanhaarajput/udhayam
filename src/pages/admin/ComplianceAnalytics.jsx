import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Card, CardContent } from '../../components/Card';
import { ShieldCheck, Calendar, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import './ComplianceAnalytics.css';

const COMPLIANCE_STATS = {
  activeBusinesses: '45,210',
  compliant: '38,450',
  pendingRenewal: '4,100',
  nonCompliant: '2,660'
};

const EXPIRING_SOON = [
  { type: 'Fire NOC', count: 1240, urgent: 450 },
  { type: 'MPCB Consent to Operate', count: 890, urgent: 120 },
  { type: 'Factory License', count: 1850, urgent: 300 }
];

export function ComplianceAnalytics() {
  return (
    <AdminLayout>
      <div className="compliance-analytics-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Compliance & Renewals</h1>
            <p className="page-subtitle">Monitor statewide business compliance and upcoming renewal cycles.</p>
          </div>
        </div>

        {/* Top Stats */}
        <div className="ca-stats-grid">
          <Card className="ca-stat-card">
            <CardContent className="ca-stat-content">
              <div className="ca-stat-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                <ShieldCheck size={24} />
              </div>
              <div className="ca-stat-info">
                <span className="ca-val">{COMPLIANCE_STATS.activeBusinesses}</span>
                <span className="ca-lbl">Tracked Businesses</span>
              </div>
            </CardContent>
          </Card>
          <Card className="ca-stat-card">
            <CardContent className="ca-stat-content">
              <div className="ca-stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
                <CheckCircle2 size={24} />
              </div>
              <div className="ca-stat-info">
                <span className="ca-val">{COMPLIANCE_STATS.compliant}</span>
                <span className="ca-lbl">Fully Compliant</span>
              </div>
            </CardContent>
          </Card>
          <Card className="ca-stat-card">
            <CardContent className="ca-stat-content">
              <div className="ca-stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}>
                <Calendar size={24} />
              </div>
              <div className="ca-stat-info">
                <span className="ca-val">{COMPLIANCE_STATS.pendingRenewal}</span>
                <span className="ca-lbl">Upcoming Renewals</span>
              </div>
            </CardContent>
          </Card>
          <Card className="ca-stat-card">
            <CardContent className="ca-stat-content">
              <div className="ca-stat-icon" style={{ background: '#fef2f2', color: '#ef4444' }}>
                <AlertTriangle size={24} />
              </div>
              <div className="ca-stat-info">
                <span className="ca-val">{COMPLIANCE_STATS.nonCompliant}</span>
                <span className="ca-lbl">Non-Compliant</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="ca-sections-grid">
          {/* Renewals Table */}
          <Card className="ca-section-card">
            <CardContent className="ca-section-content">
              <h3>Upcoming Major Renewals (Next 30 Days)</h3>
              <table className="ca-table">
                <thead>
                  <tr>
                    <th>Approval Type</th>
                    <th>Total Expiring</th>
                    <th>Urgent (&lt; 7 Days)</th>
                  </tr>
                </thead>
                <tbody>
                  {EXPIRING_SOON.map((item, idx) => (
                    <tr key={idx}>
                      <td className="font-semibold"><FileText size={14} style={{ display: 'inline', marginRight: '6px' }}/> {item.type}</td>
                      <td>{item.count}</td>
                      <td className="text-danger font-semibold">{item.urgent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Non-Compliance Breakdown */}
          <Card className="ca-section-card">
            <CardContent className="ca-section-content">
              <h3>Non-Compliance Hotspots</h3>
              <div className="hotspot-list">
                <div className="hotspot-item">
                  <div className="hs-info">
                    <span className="hs-name">Pune Region</span>
                    <span className="hs-meta">Highest rate of lapsed Factory Licenses</span>
                  </div>
                  <span className="hs-val text-danger">850 Lapsed</span>
                </div>
                <div className="hotspot-item">
                  <div className="hs-info">
                    <span className="hs-name">Chemical Manufacturing Sector</span>
                    <span className="hs-meta">Delayed Environmental Audits</span>
                  </div>
                  <span className="hs-val text-warning">420 Overdue</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
