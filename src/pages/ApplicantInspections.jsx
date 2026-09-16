import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Calendar, Clock, MapPin, UserCheck, Search, CheckCircle2 } from 'lucide-react';
import './ApplicantInspections.css';

const INSPECTIONS = [
  {
    id: 'INS-2026-089',
    type: 'Site Environmental Audit',
    department: 'MPCB (Pollution Control)',
    date: '24 Aug 2026',
    time: '10:30 AM',
    location: 'Pune MIDC, Plot 42',
    officer: 'Anil Deshmukh',
    status: 'Scheduled',
  },
  {
    id: 'INS-2026-042',
    type: 'Fire Safety Clearance',
    department: 'Fire Department',
    date: '12 Aug 2026',
    time: '02:00 PM',
    location: 'Pune MIDC, Plot 42',
    officer: 'Sanjay Patil',
    status: 'Completed',
  }
];

export function ApplicantInspections() {
  return (
    <DashboardLayout>
      <div className="inspections-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">My Inspections</h1>
            <p className="page-subtitle">View and manage upcoming site visits from department officials.</p>
          </div>
        </div>

        <div className="inspections-list">
          {INSPECTIONS.map((ins) => (
            <Card key={ins.id} className="inspection-card">
              <CardContent className="inspection-content">
                <div className="ins-header">
                  <div className="ins-title-group">
                    <div className="ins-icon">
                      <Search size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3>{ins.type}</h3>
                      <span className="ins-dept">{ins.department} • {ins.id}</span>
                    </div>
                  </div>
                  <span className={`ins-status ${ins.status.toLowerCase()}`}>
                    {ins.status === 'Completed' && <CheckCircle2 size={14} style={{ marginRight: '4px' }}/>}
                    {ins.status}
                  </span>
                </div>

                <div className="ins-details-grid">
                  <div className="ins-detail-item">
                    <Calendar size={16} />
                    <div>
                      <span className="label">Date</span>
                      <span className="value">{ins.date}</span>
                    </div>
                  </div>
                  <div className="ins-detail-item">
                    <Clock size={16} />
                    <div>
                      <span className="label">Time</span>
                      <span className="value">{ins.time}</span>
                    </div>
                  </div>
                  <div className="ins-detail-item">
                    <MapPin size={16} />
                    <div>
                      <span className="label">Location</span>
                      <span className="value">{ins.location}</span>
                    </div>
                  </div>
                  <div className="ins-detail-item">
                    <UserCheck size={16} />
                    <div>
                      <span className="label">Assigned Officer</span>
                      <span className="value">{ins.officer}</span>
                    </div>
                  </div>
                </div>

                {ins.status === 'Scheduled' && (
                  <div className="ins-actions">
                    <Button variant="outline" size="sm">Request Reschedule</Button>
                    <Button variant="primary" size="sm">Prepare Documents for Visit</Button>
                  </div>
                )}
                
                {ins.status === 'Completed' && (
                  <div className="ins-actions">
                    <Button variant="outline" size="sm">View Inspection Report</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
