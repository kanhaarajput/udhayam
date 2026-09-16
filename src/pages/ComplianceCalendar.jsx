import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Calendar, AlertTriangle, FileText, CheckCircle2, ArrowRight, X, Upload } from 'lucide-react';
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
  const [items, setItems] = useState(COMPLIANCE_ITEMS);
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const handleFileSubmit = () => {
    const updated = items.map(item => {
      if (item.id === selectedItem.id) {
        return { ...item, status: 'Safe', daysLeft: 365, dueDate: '30 Aug 2027' };
      }
      return item;
    });
    setItems(updated);
    setShowFileModal(false);
    toast.success(`${selectedItem.name} filed successfully!`);
  };

  return (
    <DashboardLayout>
      <div className="compliance-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Compliance & Renewals</h1>
            <p className="page-subtitle">Track upcoming renewals, reporting deadlines, and compliance requirements.</p>
          </div>
          <Button variant="outline" onClick={() => toast.success('Calendar synced successfully.')}>
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
              <Button variant="primary" size="sm" onClick={() => { setSelectedItem(items.find(i => i.id === 'COMP-002')); setShowFileModal(true); }}>File Now</Button>
            </CardContent>
          </Card>
        </div>

        <div className="compliance-list">
          {items.map((item) => (
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
                  <Button variant="outline" size="sm" onClick={() => { setSelectedItem(item); setShowFileModal(true); }}>
                    {item.status === 'Safe' ? 'View Details' : 'File Now'} <ArrowRight size={14} style={{ marginLeft: '4px' }}/>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </div>

        {/* File Modal */}
        {showFileModal && selectedItem && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '500px' }}>
              <div className="modal-header">
                <h2>{selectedItem.status === 'Safe' ? 'Filing Details' : 'File Compliance Report'}</h2>
                <button className="btn-icon" onClick={() => setShowFileModal(false)}><X size={20} /></button>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{selectedItem.name}</h3>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Department: {selectedItem.department} • Due: {selectedItem.dueDate}</span>
                </div>
                
                {selectedItem.status !== 'Safe' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '32px', textAlign: 'center', background: '#f8fafc' }}>
                      <Upload size={24} style={{ color: '#94a3b8', marginBottom: '8px' }} />
                      <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600, color: '#334155' }}>Upload Signed Report Document</p>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>PDF, DOCX up to 10MB</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Remarks (Optional)</label>
                      <textarea 
                        rows={3} 
                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'none' }}
                        placeholder="Add any additional notes..."
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', background: '#ecfdf5', padding: '16px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                    <CheckCircle2 size={20} />
                    <strong>Status:</strong> Filed & Approved for current cycle.
                  </div>
                )}

              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setShowFileModal(false)}>Cancel</Button>
                {selectedItem.status !== 'Safe' && (
                  <Button variant="primary" onClick={handleFileSubmit}>Submit Filing</Button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
