import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { ArrowLeft, CheckCircle2, MessageSquare, X, Trash2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { DigitalSignatureModal } from '../../components/DigitalSignatureModal';
import './DocumentVerification.css';

export function DocumentVerification() {
  const navigate = useNavigate();
  const [docVerified, setDocVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const updateApplicationStatus = useAppStore((state) => state.updateApplicationStatus);
  const addNotification = useAppStore((state) => state.addNotification);
  
  // Annotation State
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [activePinId, setActivePinId] = useState(null);
  const [draftText, setDraftText] = useState('');
  
  const imgContainerRef = useRef(null);

  const handleImageClick = (e) => {
    if (!isAnnotationMode) return;
    
    const rect = imgContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newPin = {
      id: Date.now(),
      x,
      y,
      text: '',
      isDraft: true
    };
    
    setAnnotations(prev => [...prev, newPin]);
    setActivePinId(newPin.id);
    setDraftText('');
  };

  const saveAnnotation = (id) => {
    if (!draftText.trim()) {
      deleteAnnotation(id);
      return;
    }
    setAnnotations(prev => prev.map(a => 
      a.id === id ? { ...a, text: draftText, isDraft: false } : a
    ));
    
    // Push notification to Entrepreneur
    addNotification({
      title: 'Action Required: Document Query',
      message: `An officer has raised a query on your document: "${draftText}"`,
      type: 'error',
      link: `/tracking/details/APP-2023-8901`
    });

    setActivePinId(null);
  };

  const deleteAnnotation = (id) => {
    setAnnotations(prev => prev.filter(a => a.id !== id));
    if (activePinId === id) setActivePinId(null);
  };

  const cancelDraft = (id) => {
    setAnnotations(prev => prev.filter(a => a.id !== id || !a.isDraft));
    setActivePinId(null);
  };

  const toggleAnnotationMode = () => {
    setIsAnnotationMode(!isAnnotationMode);
    setActivePinId(null);
  };

  return (
    <OfficerLayout>
      <div className="verify-page">
        <div className="details-header" style={{ marginBottom: 'var(--spacing-xl)' }}>
          <Button variant="ghost" size="sm" onClick={() => navigate('/officer/review')} style={{ paddingLeft: 0 }}>
            <ArrowLeft size={16} style={{ marginRight: '4px' }} /> Back to Application Review
          </Button>
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="page-title">Document Verification</h1>
              <p className="page-subtitle">1 of 3: Company Registration Certificate</p>
            </div>
            {annotations.length > 0 && (
              <Button variant="outline" onClick={() => setAnnotations([])}>
                Clear All Annotations
              </Button>
            )}
          </div>
        </div>

        <div className="split-screen-ui">
          {/* Left: Document Viewer */}
          <div className="viewer-pane" style={{ display: 'flex', flexDirection: 'column' }}>
            {isAnnotationMode ? (
              <div className="mode-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={16} /> 
                  Annotation Mode Active. Click anywhere on the document to add a query pin.
                </div>
                <Button variant="ghost" size="sm" onClick={toggleAnnotationMode} style={{ color: 'var(--error-700)', padding: 0 }}>
                  <X size={16} /> Cancel
                </Button>
              </div>
            ) : (
              <div className="viewer-toolbar">
                <span className="viewer-title">cert-incorporation.jpg</span>
              </div>
            )}
            
            <div className="viewer-content" onClick={(e) => {
              // Deselect if clicking outside document container
              if (e.target === e.currentTarget && activePinId) {
                const draft = annotations.find(a => a.id === activePinId);
                if (draft?.isDraft) cancelDraft(activePinId);
                else setActivePinId(null);
              }
            }}>
              <div 
                ref={imgContainerRef} 
                className={`document-image-container ${isAnnotationMode ? 'annotation-mode' : 'view-mode'}`}
                onClick={handleImageClick}
              >
                <img src="/cert-incorporation.jpg" alt="Document to verify" className="verification-image" />
                
                {/* Render Pins */}
                {annotations.map((pin, idx) => (
                  <div 
                    key={pin.id}
                    className={`annotation-pin ${activePinId === pin.id ? 'active' : ''}`}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isAnnotationMode) {
                        setActivePinId(pin.id);
                        setDraftText(pin.text);
                      }
                    }}
                  >
                    {idx + 1}
                    
                    {/* Active Popover Input */}
                    {activePinId === pin.id && (
                      <div className="annotation-input-popover" onClick={e => e.stopPropagation()}>
                        <textarea 
                          placeholder="Type reason for query..." 
                          rows={3}
                          value={draftText}
                          onChange={(e) => setDraftText(e.target.value)}
                          autoFocus
                        />
                        <div className="popover-actions">
                          <Button variant="ghost" size="sm" onClick={() => cancelDraft(pin.id)}>Cancel</Button>
                          <Button variant="primary" size="sm" onClick={() => saveAnnotation(pin.id)}>Save Pin</Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Verification Action Pane */}
          <div className="action-pane">
            <Card className="checklist-card">
              <CardContent>
                <h3 className="section-title">Verification Actions</h3>
                
                {docVerified ? (
                  <div className="verification-success" style={{ marginTop: 'var(--spacing-lg)' }}>
                    <CheckCircle2 size={24} className="text-success" />
                    <p>Document Verified Successfully</p>
                  </div>
                ) : (
                  <>
                    <div className="verification-actions" style={{ marginTop: 'var(--spacing-lg)', flexDirection: 'column' }}>
                      <Button 
                        variant="primary" 
                        style={{ width: '100%', backgroundColor: 'var(--success-text)', borderColor: 'var(--success-text)' }} 
                        onClick={() => setDocVerified(true)}
                        disabled={annotations.length > 0}
                      >
                        Approve Document
                      </Button>
                      <Button 
                        variant="outline" 
                        style={{ width: '100%', color: isAnnotationMode ? 'var(--text-primary)' : 'var(--error-text)', borderColor: isAnnotationMode ? 'var(--border-color)' : 'var(--error-text)' }}
                        onClick={toggleAnnotationMode}
                      >
                        {isAnnotationMode ? 'Exit Annotation Mode' : 'Raise Query on Document'}
                      </Button>
                    </div>
                  </>
                )}

                {/* Sidebar Annotation List */}
                {annotations.filter(a => !a.isDraft).length > 0 && (
                  <div className="annotations-list">
                    <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '4px', marginTop: 'var(--spacing-md)' }}>Raised Queries:</h4>
                    {annotations.filter(a => !a.isDraft).map((pin, idx) => (
                      <div key={pin.id} className="annotation-list-item">
                        <div className="badge-number">{idx + 1}</div>
                        <p>{pin.text}</p>
                        <button className="delete-btn" onClick={() => deleteAnnotation(pin.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {docVerified && annotations.length === 0 && (
              <Card className="final-action-card" style={{ marginTop: 'var(--spacing-xl)', backgroundColor: 'var(--primary-50)', borderColor: 'var(--primary-200)' }}>
                <CardContent style={{ textAlign: 'center' }}>
                  <h4 style={{ color: 'var(--primary-800)', marginBottom: 'var(--spacing-md)' }}>All documents verified</h4>
                  <Button variant="primary" size="lg" style={{ width: '100%' }} onClick={() => setShowModal(true)}>
                    Final Approve Application
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <DigitalSignatureModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSignComplete={() => {
          updateApplicationStatus('APP-2023-8901', 'Approved', 'success');
          navigate('/officer/dashboard');
        }}
      />
    </OfficerLayout>
  );
}
