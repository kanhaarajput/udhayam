import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Calendar, Clock, MapPin, UserCheck, Search, CheckCircle2, X } from 'lucide-react';
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
  const navigate = useNavigate();
  const [inspections, setInspections] = useState(INSPECTIONS);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedIns, setSelectedIns] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '', reason: '' });

  const handleReschedule = () => {
    if (!rescheduleData.date || !rescheduleData.time || !rescheduleData.reason) {
      toast.error('Please fill in all fields.');
      return;
    }
    const updated = inspections.map(ins => {
      if (ins.id === selectedIns.id) {
        return { ...ins, status: 'Reschedule Requested' };
      }
      return ins;
    });
    setInspections(updated);
    setShowRescheduleModal(false);
    toast.success('Reschedule request submitted to department.');
  };

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
          {inspections.map((ins) => (
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
                    <Button variant="outline" size="sm" onClick={() => { setSelectedIns(ins); setShowRescheduleModal(true); }}>Request Reschedule</Button>
                    <Button variant="primary" size="sm" onClick={() => navigate('/upload-documents')}>Prepare Documents for Visit</Button>
                  </div>
                )}
                
                {ins.status === 'Completed' && (
                  <div className="ins-actions">
                    <Button variant="outline" size="sm" onClick={() => { setSelectedIns(ins); setShowReportModal(true); }}>View Inspection Report</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reschedule Modal */}
        {showRescheduleModal && selectedIns && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px' }}>
              <div className="modal-header">
                <h2>Request Reschedule</h2>
                <button className="btn-icon" onClick={() => setShowRescheduleModal(false)}><X size={20} /></button>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                  Propose a new date for the <strong>{selectedIns.type}</strong>. Note that this requires officer approval.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Proposed Date</label>
                    <input 
                      type="date" 
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                      value={rescheduleData.date}
                      onChange={(e) => setRescheduleData({...rescheduleData, date: e.target.value})}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Proposed Time</label>
                    <input 
                      type="time" 
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                      value={rescheduleData.time}
                      onChange={(e) => setRescheduleData({...rescheduleData, time: e.target.value})}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Reason for Reschedule</label>
                  <textarea 
                    rows={3} 
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'none' }}
                    placeholder="Briefly explain why you need to reschedule..."
                    value={rescheduleData.reason}
                    onChange={(e) => setRescheduleData({...rescheduleData, reason: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setShowRescheduleModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleReschedule}>Submit Request</Button>
              </div>
            </div>
          </div>
        )}

        {/* Report Modal */}
        {showReportModal && selectedIns && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '600px' }}>
              <div className="modal-header">
                <h2>Inspection Report</h2>
                <button className="btn-icon" onClick={() => setShowReportModal(false)}><X size={20} /></button>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{selectedIns.type}</h3>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Conducted on {selectedIns.date} by {selectedIns.officer}</span>
                </div>
                
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#0f172a' }}>Auditor's Findings</h4>
                <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
                  Site visited and inspected. Fire suppression systems are installed and functional. Exit pathways are clear of obstruction.
                  Mock drill records were verified and found to be up to date. Overall compliance is satisfactory.
                </p>

                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '16px', borderRadius: '8px', color: '#065f46', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} />
                  <strong>Conclusion:</strong> Passed / NOC Granted
                </div>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setShowReportModal(false)}>Close</Button>
                <Button variant="primary" onClick={() => { setShowReportModal(false); toast.success('Report downloaded.'); }}>Download PDF</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
