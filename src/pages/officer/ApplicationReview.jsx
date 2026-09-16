import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { FileText, CheckCircle2, XCircle, AlertCircle, Eye, ShieldCheck, MessageSquare, X } from 'lucide-react';
import './ApplicationReview.css';

const MOCK_DOCS = [
  { id: 'doc1', name: 'Factory Layout Plan', type: 'PDF', size: '2.4 MB', status: 'Pending Review' },
  { id: 'doc2', name: 'Fire Safety Certificate', type: 'PDF', size: '1.1 MB', status: 'Pending Review' },
  { id: 'doc3', name: 'Director KYC', type: 'JPG', size: '0.5 MB', status: 'Verified' },
  { id: 'doc4', name: 'Land Ownership Proof', type: 'PDF', size: '4.2 MB', status: 'Flagged', reason: 'Blurry scan on page 2' }
];

export function ApplicationReview() {
  const navigate = useNavigate();
  const [docs, setDocs] = useState(MOCK_DOCS);
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);
  
  // Modals state
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleVerify = (id) => {
    setDocs(prevDocs => prevDocs.map(d => d.id === id ? { ...d, status: 'Verified', reason: null } : d));
    if (selectedDoc.id === id) setSelectedDoc(prev => ({ ...prev, status: 'Verified', reason: null }));
    toast.success('Document marked as Verified.');
  };

  const handleReject = () => {
    if (!rejectReason) {
      toast.error('Please enter a reason for rejection.');
      return;
    }
    const id = selectedDoc.id;
    setDocs(prevDocs => prevDocs.map(d => d.id === id ? { ...d, status: 'Flagged', reason: rejectReason } : d));
    setSelectedDoc(prev => ({ ...prev, status: 'Flagged', reason: rejectReason }));
    toast.error('Document flagged.');
    setShowRejectModal(false);
    setRejectReason('');
  };

  const submitQuery = () => {
    if (!queryText) return;
    toast.success('Query sent to applicant successfully.');
    setShowQueryModal(false);
    setQueryText('');
  };

  const approveApplication = () => {
    toast.success('Application Approved successfully!');
    setShowApproveModal(false);
    navigate('/officer/dashboard');
  };

  return (
    <OfficerLayout>
      <div className="review-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Document Review</h1>
            <p className="page-subtitle">Verify submitted documents for APP-2026-089 (GreenTech Manufacturing).</p>
          </div>
          <div className="review-actions-top">
            <Button variant="outline" onClick={() => setShowQueryModal(true)}>
              <MessageSquare size={16} style={{ marginRight: '6px' }}/> Raise Query
            </Button>
            <Button variant="primary" onClick={() => setShowApproveModal(true)} style={{ background: '#10b981', borderColor: '#10b981' }}>
              <ShieldCheck size={16} style={{ marginRight: '6px' }}/> Approve Application
            </Button>
          </div>
        </div>

        <div className="review-workspace">
          {/* Document List (Sidebar) */}
          <div className="doc-sidebar">
            <h3>Submitted Documents</h3>
            <div className="doc-list-scroll">
              {docs.map(doc => (
                <div 
                  key={doc.id} 
                  className={`doc-list-item ${selectedDoc.id === doc.id ? 'active' : ''}`}
                  onClick={() => setSelectedDoc(doc)}
                >
                  <div className="doc-item-icon">
                    <FileText size={18} />
                  </div>
                  <div className="doc-item-info">
                    <span className="doc-item-name">{doc.name}</span>
                    <span className="doc-item-meta">{doc.size} • {doc.type}</span>
                  </div>
                  <div className="doc-item-status">
                    {doc.status === 'Verified' && <CheckCircle2 size={16} className="text-success" />}
                    {doc.status === 'Flagged' && <AlertCircle size={16} className="text-danger" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Viewer (Main) */}
          <Card className="doc-viewer-card">
            <div className="viewer-header">
              <div className="vh-info">
                <h3>{selectedDoc.name}</h3>
                <span className={`vh-badge ${selectedDoc.status.toLowerCase().replace(' ', '-')}`}>
                  {selectedDoc.status}
                </span>
              </div>
              <div className="vh-actions" style={{ position: 'relative', zIndex: 50 }}>
                <Button variant="outline" size="sm" onClick={() => setShowRejectModal(true)} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                  <XCircle size={16} style={{ marginRight: '6px', pointerEvents: 'none' }} /> Reject
                </Button>
                <Button variant="primary" size="sm" onClick={() => handleVerify(selectedDoc.id)} style={{ background: '#10b981', borderColor: '#10b981' }}>
                  <CheckCircle2 size={16} style={{ marginRight: '6px', pointerEvents: 'none' }} /> Verify
                </Button>
              </div>
            </div>
            <CardContent className="viewer-content">
              {/* Simulated Document Viewer */}
              <div className="viewer-placeholder">
                <FileText size={48} className="text-muted" />
                <p>Previewing <strong>{selectedDoc.name}</strong></p>
                {selectedDoc.status === 'Flagged' && (
                  <div className="viewer-alert">
                    <AlertCircle size={16} /> <strong>Flagged:</strong> {selectedDoc.reason}
                  </div>
                )}
                <Button variant="outline" className="mt-4" onClick={() => window.open('#', '_blank')}>
                  <Eye size={16} style={{ marginRight: '6px' }}/> Open in New Tab
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Raise Query Modal */}
        {showQueryModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px' }}>
              <div className="modal-header">
                <h2>Raise Query</h2>
                <button className="btn-icon" onClick={() => setShowQueryModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#334155' }}>
                  Send a clarification request to the applicant regarding <strong>{selectedDoc.name}</strong>.
                </p>
                <textarea 
                  style={{ width: '100%', height: '100px', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} 
                  placeholder="Type your query here..."
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setShowQueryModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={submitQuery}>Send Query</Button>
              </div>
            </div>
          </div>
        )}

        {/* Approve Application Modal */}
        {showApproveModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '450px' }}>
              <div className="modal-header">
                <h2>Approve Application</h2>
                <button className="btn-icon" onClick={() => setShowApproveModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#ecfdf5', padding: '16px', borderRadius: '8px', color: '#065f46' }}>
                  <ShieldCheck size={32} />
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Confirm Approval</h4>
                    <p style={{ margin: 0, fontSize: '14px' }}>Are you sure you want to approve APP-2026-089? This action cannot be undone.</p>
                  </div>
                </div>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setShowApproveModal(false)}>Cancel</Button>
                <Button variant="primary" style={{ background: '#10b981', borderColor: '#10b981' }} onClick={approveApplication}>Confirm & Approve</Button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Document Modal */}
        {showRejectModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px' }}>
              <div className="modal-header">
                <h2>Reject Document</h2>
                <button className="btn-icon" onClick={() => setShowRejectModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#334155' }}>
                  Please provide a reason for flagging <strong>{selectedDoc.name}</strong>. This will be visible to the applicant.
                </p>
                <textarea 
                  style={{ width: '100%', height: '100px', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} 
                  placeholder="e.g. Blurry scan, missing signature..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setShowRejectModal(false)}>Cancel</Button>
                <Button variant="primary" style={{ background: '#ef4444', borderColor: '#ef4444' }} onClick={handleReject}>Confirm Rejection</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </OfficerLayout>
  );
}
