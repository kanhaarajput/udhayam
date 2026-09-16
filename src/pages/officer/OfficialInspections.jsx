import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { Calendar, Clock, MapPin, UserCheck, CheckCircle2, AlertTriangle, Building2, Search, X, FileText } from 'lucide-react';
import { BUNDLED_INSPECTION } from '../../data/mockData';
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
  const [selectedIns, setSelectedIns] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showNewScheduleModal, setShowNewScheduleModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Form state for scheduling existing inspection
  const [scheduleData, setScheduleData] = useState({ date: '', time: '', inspector: 'Anil Deshmukh' });
  
  // Form state for new inspection
  const [newScheduleData, setNewScheduleData] = useState({ 
    applicant: '', 
    type: 'Site Environmental Audit', 
    location: '', 
    date: '', 
    time: '', 
    inspector: 'Unassigned',
    risk: 'Low'
  });

  const handleOpenSchedule = (ins) => {
    setSelectedIns(ins);
    setScheduleData({
      date: ins.date === 'Not Scheduled' ? '' : ins.date,
      time: ins.time === '-' ? '' : ins.time,
      inspector: ins.inspector === 'Unassigned' ? 'Anil Deshmukh' : ins.inspector
    });
    setShowScheduleModal(true);
  };

  const handleSaveSchedule = () => {
    if (!scheduleData.date || !scheduleData.time) {
      toast.error('Please select a date and time.');
      return;
    }
    setInspections(inspections.map(ins => {
      if (ins.id === selectedIns.id) {
        return {
          ...ins,
          date: scheduleData.date,
          time: scheduleData.time,
          inspector: scheduleData.inspector,
          status: 'Scheduled'
        };
      }
      return ins;
    }));
    toast.success('Inspection scheduled successfully.');
    setShowScheduleModal(false);
  };

  const handleSaveNewSchedule = () => {
    if (!newScheduleData.applicant || !newScheduleData.location) {
      toast.error('Please fill in applicant and location.');
      return;
    }
    
    const newIns = {
      id: `INS-2026-${Math.floor(Math.random() * 900) + 100}`,
      appId: `APP-2026-${Math.floor(Math.random() * 900) + 100}`,
      applicant: newScheduleData.applicant,
      type: newScheduleData.type,
      location: newScheduleData.location,
      date: newScheduleData.date || 'Not Scheduled',
      time: newScheduleData.time || '-',
      inspector: newScheduleData.inspector,
      status: newScheduleData.date ? 'Scheduled' : 'Pending Scheduling',
      risk: newScheduleData.risk
    };
    
    setInspections([newIns, ...inspections]);
    toast.success('New inspection created successfully.');
    setShowNewScheduleModal(false);
    setNewScheduleData({ applicant: '', type: 'Site Environmental Audit', location: '', date: '', time: '', inspector: 'Unassigned', risk: 'Low' });
  };

  const handleOpenReport = (ins) => {
    setSelectedIns(ins);
    setShowReportModal(true);
  };

  return (
    <OfficerLayout>
      <div className="off-inspections-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Inspection Management</h1>
            <p className="page-subtitle">Schedule site visits, assign inspectors, and review audit reports.</p>
          </div>
          <Button variant="primary" onClick={() => setShowNewScheduleModal(true)}>
            <Calendar size={16} style={{ marginRight: '6px' }}/> Schedule New Inspection
          </Button>
        </div>

        <Card className="bundled-ins-card" style={{ marginBottom: '24px', background: 'linear-gradient(to right, #f0f9ff, #e0f2fe)', border: '1px solid #bae6fd' }}>
          <CardContent style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ background: '#0284c7', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>AI SUGGESTION</span>
                  <h3 style={{ margin: 0, color: '#0f172a' }}>Bundled Inspection Available</h3>
                </div>
                <p style={{ margin: '0 0 16px 0', color: '#334155', fontSize: '15px' }}>
                  <strong>{BUNDLED_INSPECTION.applicant}</strong> has overlapping inspection requirements.
                </p>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '14px' }}>
                    <Building2 size={16} /> <span>{BUNDLED_INSPECTION.departments.join(' + ')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '14px' }}>
                    <Calendar size={16} /> <span>Suggested: {BUNDLED_INSPECTION.suggestedDate}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '14px', fontWeight: '600' }}>
                    <CheckCircle2 size={16} /> <span>{BUNDLED_INSPECTION.savingsInsight}</span>
                  </div>
                </div>
              </div>
              <Button variant="primary" onClick={() => toast.success('Bundled inspection scheduled successfully!')}>
                Confirm Bundled Inspection
              </Button>
            </div>
          </CardContent>
        </Card>

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
                    <Button variant="primary" size="sm" style={{ width: '100%' }} onClick={() => handleOpenSchedule(ins)}>
                      Assign & Schedule
                    </Button>
                  )}
                  {ins.status === 'Scheduled' && (
                    <Button variant="outline" size="sm" style={{ width: '100%' }} onClick={() => handleOpenSchedule(ins)}>
                      Reschedule
                    </Button>
                  )}
                  {ins.status === 'Completed' && (
                    <Button variant="outline" size="sm" style={{ width: '100%', borderColor: '#10b981', color: '#059669' }} onClick={() => handleOpenReport(ins)}>
                      <CheckCircle2 size={16} style={{ marginRight: '6px' }}/> View Audit Report
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Schedule NEW Inspection Modal */}
        {showNewScheduleModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '500px' }}>
              <div className="modal-header">
                <h2>Create New Inspection</h2>
                <button className="btn-icon" onClick={() => setShowNewScheduleModal(false)}><X size={20} /></button>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Applicant / Company Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Acme Corp"
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    value={newScheduleData.applicant}
                    onChange={(e) => setNewScheduleData({...newScheduleData, applicant: e.target.value})}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Plot 12, Industrial Area"
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    value={newScheduleData.location}
                    onChange={(e) => setNewScheduleData({...newScheduleData, location: e.target.value})}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Inspection Type</label>
                    <select 
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                      value={newScheduleData.type}
                      onChange={(e) => setNewScheduleData({...newScheduleData, type: e.target.value})}
                    >
                      <option>Site Environmental Audit</option>
                      <option>Air Quality Check</option>
                      <option>Water Discharge Audit</option>
                      <option>Safety Compliance</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Risk Level</label>
                    <select 
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                      value={newScheduleData.risk}
                      onChange={(e) => setNewScheduleData({...newScheduleData, risk: e.target.value})}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Date (Optional)</label>
                    <input 
                      type="date" 
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                      value={newScheduleData.date}
                      onChange={(e) => setNewScheduleData({...newScheduleData, date: e.target.value})}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Time (Optional)</label>
                    <input 
                      type="time" 
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                      value={newScheduleData.time}
                      onChange={(e) => setNewScheduleData({...newScheduleData, time: e.target.value})}
                    />
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Assign Inspector (Optional)</label>
                  <select 
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    value={newScheduleData.inspector}
                    onChange={(e) => setNewScheduleData({...newScheduleData, inspector: e.target.value})}
                  >
                    <option value="Unassigned">Leave Unassigned</option>
                    <option value="Anil Deshmukh">Anil Deshmukh</option>
                    <option value="Rajesh Patil">Rajesh Patil</option>
                    <option value="Sunita Rao">Sunita Rao</option>
                  </select>
                </div>

              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setShowNewScheduleModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleSaveNewSchedule}>Create Inspection</Button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Existing Modal */}
        {showScheduleModal && selectedIns && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px' }}>
              <div className="modal-header">
                <h2>{selectedIns.status === 'Scheduled' ? 'Reschedule' : 'Schedule'} Inspection</h2>
                <button className="btn-icon" onClick={() => setShowScheduleModal(false)}><X size={20} /></button>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
                  Assigning for <strong>{selectedIns.applicant}</strong> ({selectedIns.appId}).
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Inspector</label>
                  <select 
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    value={scheduleData.inspector}
                    onChange={(e) => setScheduleData({...scheduleData, inspector: e.target.value})}
                  >
                    <option value="Anil Deshmukh">Anil Deshmukh</option>
                    <option value="Rajesh Patil">Rajesh Patil</option>
                    <option value="Sunita Rao">Sunita Rao</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Date</label>
                    <input 
                      type="date" 
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                      value={scheduleData.date}
                      onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Time</label>
                    <input 
                      type="time" 
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                      value={scheduleData.time}
                      onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setShowScheduleModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleSaveSchedule}>Confirm Schedule</Button>
              </div>
            </div>
          </div>
        )}

        {/* Audit Report Modal */}
        {showReportModal && selectedIns && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '500px' }}>
              <div className="modal-header">
                <h2>Audit Report</h2>
                <button className="btn-icon" onClick={() => setShowReportModal(false)}><X size={20} /></button>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '50%', color: '#10b981' }}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0f172a' }}>{selectedIns.type} Report</h3>
                    <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#64748b' }}>
                      Conducted on {selectedIns.date} by {selectedIns.inspector} at {selectedIns.location}.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>Passed</span>
                      <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>Score: 92/100</span>
                    </div>
                  </div>
                </div>
                
                <h4 style={{ margin: '24px 0 8px 0', fontSize: '14px', color: '#334155' }}>Inspector Notes</h4>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                  Facility meets all required environmental standards. Air filtration units are fully operational and documented maintenance logs were provided. No significant hazards detected.
                </p>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setShowReportModal(false)}>Close</Button>
                <Button variant="primary" onClick={() => { toast.success('Report downloaded.'); setShowReportModal(false); }}>Download PDF</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </OfficerLayout>
  );
}
