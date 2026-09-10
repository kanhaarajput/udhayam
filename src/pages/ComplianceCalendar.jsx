import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle, 
  FileText, ShieldAlert, FileSignature, ArrowRight
} from 'lucide-react';
import './ComplianceCalendar.css';

// Calculate relative dates for realism
const today = new Date();
const addDays = (days) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

const COMPLIANCE_EVENTS = [
  {
    id: 'evt-1',
    title: 'GSTR-3B Monthly Return Filing',
    type: 'Filing',
    department: 'GST Department',
    dueDate: addDays(-2), // Overdue
    status: 'overdue',
    priority: 'high',
    description: 'Mandatory monthly self-declaration for GST liabilities.',
    icon: FileText
  },
  {
    id: 'evt-2',
    title: 'Fire Safety NOC Renewal',
    type: 'Renewal',
    department: 'Municipal Corporation',
    dueDate: addDays(12), // Upcoming
    status: 'upcoming',
    priority: 'high',
    description: 'Annual renewal of Fire Safety Certificate for the manufacturing facility.',
    icon: ShieldAlert
  },
  {
    id: 'evt-3',
    title: 'EPFO Monthly Contribution',
    type: 'Filing',
    department: 'Ministry of Labour',
    dueDate: addDays(15), // Upcoming
    status: 'upcoming',
    priority: 'medium',
    description: 'Provident fund contribution filing for all registered employees.',
    icon: FileSignature
  },
  {
    id: 'evt-4',
    title: 'Annual Environmental Audit',
    type: 'Audit',
    department: 'Pollution Control Board',
    dueDate: addDays(45), // Upcoming
    status: 'upcoming',
    priority: 'medium',
    description: 'Submission of environmental statement (Form V) for the financial year.',
    icon: CheckCircle
  },
  {
    id: 'evt-5',
    title: 'Trade License Renewal',
    type: 'Renewal',
    department: 'Local Municipality',
    dueDate: addDays(60), // Upcoming
    status: 'upcoming',
    priority: 'low',
    description: 'Standard renewal of the municipal trade license.',
    icon: FileText
  }
];

export function ComplianceCalendar() {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'upcoming', 'overdue'

  const filteredEvents = useMemo(() => {
    let events = [...COMPLIANCE_EVENTS];
    
    // Sort by Date (Closest first, overdue at the top)
    events.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    if (activeFilter !== 'all') {
      events = events.filter(e => e.status === activeFilter);
    }
    
    return events;
  }, [activeFilter]);

  const stats = {
    total: COMPLIANCE_EVENTS.length,
    overdue: COMPLIANCE_EVENTS.filter(e => e.status === 'overdue').length,
    upcoming: COMPLIANCE_EVENTS.filter(e => e.status === 'upcoming').length,
  };

  const getPriorityColor = (priority, status) => {
    if (status === 'overdue') return 'var(--error-500)';
    if (priority === 'high') return 'var(--warning-500)';
    if (priority === 'medium') return 'var(--primary-500)';
    return 'var(--text-muted)';
  };

  const formatDate = (dateStr) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-IN', options);
  };

  return (
    <DashboardLayout>
      <div className="compliance-container">
        
        {/* Header section */}
        <div className="compliance-header">
          <div className="compliance-title-wrapper">
            <h1 className="page-title">Compliance Engine</h1>
            <p className="page-subtitle">Track regulatory deadlines, renewals, and statutory filings.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="compliance-stats-grid">
          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-icon-wrapper blue"><CalendarIcon size={24} /></div>
              <div className="stat-info">
                <h3>{stats.total}</h3>
                <p>Total Tracked Events</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-icon-wrapper red"><AlertTriangle size={24} /></div>
              <div className="stat-info">
                <h3>{stats.overdue}</h3>
                <p>Overdue Actions</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-icon-wrapper orange"><Clock size={24} /></div>
              <div className="stat-info">
                <h3>{stats.upcoming}</h3>
                <p>Upcoming (Next 60 Days)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Section */}
        <Card className="timeline-card">
          <div className="timeline-header">
            <h3>Regulatory Timeline</h3>
            <div className="timeline-filters">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Events
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveFilter('upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'overdue' ? 'active' : ''}`}
                onClick={() => setActiveFilter('overdue')}
              >
                Overdue ({stats.overdue})
              </button>
            </div>
          </div>

          <CardContent className="timeline-content">
            {filteredEvents.length > 0 ? (
              <div className="timeline-wrapper">
                {filteredEvents.map((event, index) => {
                  const Icon = event.icon;
                  const iconColor = getPriorityColor(event.priority, event.status);
                  
                  return (
                    <div key={event.id} className={`timeline-item ${event.status === 'overdue' ? 'is-overdue' : ''}`}>
                      {/* Left: Date */}
                      <div className="timeline-date">
                        <span className="date-main">{formatDate(event.dueDate)}</span>
                        {event.status === 'overdue' && <span className="date-sub text-error">Overdue by {Math.abs(Math.floor((new Date(event.dueDate) - today) / (1000 * 60 * 60 * 24)))} days</span>}
                        {event.status === 'upcoming' && <span className="date-sub">Due in {Math.ceil((new Date(event.dueDate) - today) / (1000 * 60 * 60 * 24))} days</span>}
                      </div>

                      {/* Center: Line & Node */}
                      <div className="timeline-node-wrapper">
                        <div className="timeline-line" style={{ bottom: index === filteredEvents.length - 1 ? '50%' : '-50%' }}></div>
                        <div className="timeline-node" style={{ borderColor: iconColor, backgroundColor: event.status === 'overdue' ? 'var(--error-50)' : 'var(--surface-color)' }}>
                          <Icon size={16} color={iconColor} />
                        </div>
                      </div>

                      {/* Right: Card Content */}
                      <div className="timeline-card-content">
                        <div className="timeline-card-header">
                          <div>
                            <span className="event-type">{event.type}</span>
                            <h4>{event.title}</h4>
                          </div>
                          <span className="event-department">{event.department}</span>
                        </div>
                        <p className="event-desc">{event.description}</p>
                        <div className="event-actions">
                          {event.status === 'overdue' ? (
                            <Button variant="primary" style={{ backgroundColor: 'var(--error-600)', borderColor: 'var(--error-600)' }}>
                              Resolve Immediately <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                            </Button>
                          ) : (
                            <Button variant="outline">
                              Initiate {event.type} <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-timeline">
                <CheckCircle size={48} color="var(--success-500)" style={{ marginBottom: '16px' }} />
                <h3>You're all caught up!</h3>
                <p>No {activeFilter} compliance events found for this period.</p>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}
