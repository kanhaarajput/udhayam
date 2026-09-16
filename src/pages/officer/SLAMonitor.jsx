import React from 'react';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { Clock, AlertTriangle, XCircle, ArrowRight, ShieldAlert } from 'lucide-react';
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
  return (
    <OfficerLayout>
      <div className="sla-monitor-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">SLA Monitor</h1>
            <p className="page-subtitle">Track applications at risk of breaching Service Level Agreements.</p>
          </div>
          <Button variant="outline">
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
                    <Button variant="outline" size="sm">
                      Process Now <ArrowRight size={14} style={{ marginLeft: '4px' }}/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </OfficerLayout>
  );
}
