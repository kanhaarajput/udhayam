import React, { useState } from 'react';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { Calendar, Clock, MapPin, UserCheck, CheckCircle2, AlertTriangle, Building2, Search } from 'lucide-react';
import './OfficialInspections.css';

const MOCK_INSPECTIONS = [
  {
    id: 'INS-2026-089',
    appId: 'APP-2026-089',
    applicant: 'GreenTech Manufacturing',
    type: 'Site Environmental Audit',
    date: '24 Aug 2026',
    time: '10:30 AM',
    location: 'Pune MIDC, Plot 42',
    inspector: 'Anil Deshmukh',
    status: 'Scheduled',
    risk: 'Medium'
  },
  {
    id: 'INS-2026-042',
    appId: 'APP-2026-042',
    applicant: 'BlueSky Chemicals',
    type: 'Air Quality Check',
    date: '12 Aug 2026',
    time: '02:00 PM',
    location: 'Nashik MIDC',
    inspector: 'Rajesh Patil',
    status: 'Completed',
    risk: 'High'
  },
  {
    id: 'INS-2026-091',
    appId: 'APP-2026-091',
    applicant: 'Desai Foods Pvt Ltd',
    type: 'Water Discharge Audit',
    date: 'Not Scheduled',
    time: '-',
    location: 'Thane Industrial Area',
    inspector: 'Unassigned',
    status: 'Pending Scheduling',
    risk: 'Low'
  }
];

export function OfficialInspections() {
  const [inspections, setInspections] = useState(MOCK_INSPECTIONS);

  return (
    <OfficerLayout>
      <div className="off-inspections-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Inspection Management</h1>
            <p className="page-subtitle">Schedule site visits, assign inspectors, and review audit reports.</p>
          </div>
          <Button variant="primary">
            <Calendar size={16} style={{ marginRight: '6px' }}/> Schedule New Inspection
          </Button>
        </div>

        <div className="ins-filters">
          <div className="search-box">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search by Applicant, ID, or Location..." />
          </div>
          <select className="filter-select">
            <option>All Statuses</option>
            <option>Pending Scheduling</option>
            <option>Scheduled</option>
            <option>Completed</option>
          </select>
          <select className="filter-select">
            <option>All Inspectors</option>
            <option>Anil Deshmukh</option>
            <option>Rajesh Patil</option>
            <option>Unassigned</option>
          </select>
        </div>

        <div className="off-ins-grid">
          {inspections.map((ins) => (
            <Card key={ins.id} className="off-ins-card">
              <CardContent className="off-ins-content">
                <div className="off-ins-header">
                  <span className={`off-ins-status ${ins.status.toLowerCase().replace(' ', '-')}`}>
                    {ins.status}
                  </span>
                  <span className={`risk-badge risk-${ins.risk.toLowerCase()}`}>
                    {ins.risk} Risk
                  </span>
                </div>

                <div className="off-ins-main-info">
                  <h3>{ins.applicant}</h3>
                  <span className="app-id">{ins.appId} • {ins.type}</span>
                </div>

                <div className="off-ins-details">
                  <div className="detail-row">
                    <Calendar size={14} className="text-muted" />
                    <span>{ins.date} {ins.time !== '-' && `• ${ins.time}`}</span>
                  </div>
                  <div className="detail-row">
                    <MapPin size={14} className="text-muted" />
                    <span>{ins.location}</span>
                  </div>
                  <div className="detail-row">
                    <UserCheck size={14} className="text-muted" />
                    <span className={ins.inspector === 'Unassigned' ? 'text-warning font-semibold' : ''}>
                      {ins.inspector}
                    </span>
                  </div>
                </div>

                <div className="off-ins-actions">
                  {ins.status === 'Pending Scheduling' && (
                    <Button variant="primary" size="sm" style={{ width: '100%' }}>
                      Assign & Schedule
                    </Button>
                  )}
                  {ins.status === 'Scheduled' && (
                    <Button variant="outline" size="sm" style={{ width: '100%' }}>
                      Reschedule
                    </Button>
                  )}
                  {ins.status === 'Completed' && (
                    <Button variant="outline" size="sm" style={{ width: '100%', borderColor: '#10b981', color: '#059669' }}>
                      <CheckCircle2 size={16} style={{ marginRight: '6px' }}/> View Audit Report
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </OfficerLayout>
  );
}
