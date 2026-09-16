import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Calendar, AlertTriangle, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import './ComplianceCalendar.css';

const COMPLIANCE_ITEMS = [
  {
    id: 'COMP-001',
    name: 'FSSAI License Renewal',
    dueDate: '15 Oct 2026',
    status: 'Upcoming',
    daysLeft: 60,
    department: 'FSSAI',
    type: 'Renewal',
  },
  {
    id: 'COMP-002',
    name: 'Annual Environmental Report Submission',
    dueDate: '30 Aug 2026',
    status: 'Urgent',
    daysLeft: 14,
    department: 'MPCB',
    type: 'Reporting',
  },
  {
    id: 'COMP-003',
    name: 'Fire Safety Audit Certificate',
    dueDate: '01 Jan 2027',
    status: 'Safe',
    daysLeft: 138,
    department: 'Fire Department',
    type: 'Audit',
  }
];

export function ComplianceCalendar() {
  return (
    <DashboardLayout>
      <div className="compliance-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Compliance & Renewals</h1>
            <p className="page-subtitle">Track upcoming renewals, reporting deadlines, and compliance requirements.</p>
          </div>
          <Button variant="outline">
            <Calendar size={18} style={{ marginRight: '6px' }} /> Sync with Calendar
          </Button>
        </div>

        <div className="compliance-alerts">
          <Card className="alert-card urgent">
            <CardContent className="alert-content">
              <AlertTriangle size={24} className="alert-icon text-danger" />
              <div className="alert-text">
                <h4>Action Required: Upcoming Deadline</h4>
                <p>Your Annual Environmental Report is due in 14 days. Failure to submit may result in penalties.</p>
              </div>
              <Button variant="primary" size="sm">File Now</Button>
            </CardContent>
          </Card>
        </div>

        <div className="compliance-list">
          {COMPLIANCE_ITEMS.map((item) => (
            <Card key={item.id} className="comp-card">
              <CardContent className="comp-content">
                <div className="comp-date-box">
                  <span className="month">{item.dueDate.split(' ')[1]}</span>
                  <span className="day">{item.dueDate.split(' ')[0]}</span>
                  <span className="year">{item.dueDate.split(' ')[2]}</span>
                </div>
                
                <div className="comp-details">
                  <div className="comp-type-badge">{item.type}</div>
                  <h3>{item.name}</h3>
                  <span className="comp-dept">{item.department}</span>
                </div>

                <div className="comp-status-col">
                  <span className={`comp-status-badge ${item.status.toLowerCase()}`}>
                    {item.status === 'Safe' && <CheckCircle2 size={14} />}
                    {item.status === 'Urgent' && <AlertTriangle size={14} />}
                    {item.daysLeft} Days Left
                  </span>
                </div>

                <div className="comp-action">
                  <Button variant="outline" size="sm">
                    View Details <ArrowRight size={14} style={{ marginLeft: '4px' }}/>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
