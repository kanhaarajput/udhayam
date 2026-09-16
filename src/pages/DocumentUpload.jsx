import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { UploadCloud, CheckCircle2, AlertCircle, FileText, Bot, XCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './DocumentUpload.css';

export function DocumentUpload() {
  const generatedChecklist = useAppStore((state) => state.generatedChecklist);
  const [docs, setDocs] = useState([]);
  const [uploading, setUploading] = useState(null);

  useEffect(() => {
    // Flatten and deduplicate required documents from all checklist items
    const allDocs = new Set();
    const dynamicDocs = [];

    generatedChecklist.forEach(item => {
      item.documents.forEach(docName => {
        if (!allDocs.has(docName)) {
          allDocs.add(docName);
          dynamicDocs.push({
            id: `doc-${docName.replace(/\s+/g, '-').toLowerCase()}`,
            name: docName,
            status: 'not-uploaded',
            type: item.name // Just using the checklist item name as category for context
          });
        }
      });
    });
    
    // Add one fake rejected document for AI Validation demo purposes
    if (dynamicDocs.length > 0) {
      // Find a suitable doc to mark as rejected (e.g., the last one)
      const lastDoc = dynamicDocs[dynamicDocs.length - 1];
      lastDoc.status = 'rejected';
      lastDoc.reason = 'Signature missing on page 2';
    }

    setDocs(dynamicDocs);
  }, [generatedChecklist]);

  const handleUploadClick = (docId) => {
    setUploading(docId);
    // Simulate upload & AI validation
    setTimeout(() => {
      setDocs(docs.map(d => d.id === docId ? { ...d, status: 'verified', reason: null } : d));
      setUploading(null);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="docs-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Document Vault</h1>
            <p className="page-subtitle">Upload and manage required documents. AI pre-validation ensures accuracy before submission.</p>
          </div>
          <div className="ai-validation-badge">
            <Bot size={16} /> AI Validation Active
          </div>
        </div>

        <div className="docs-grid">
          {docs.length === 0 ? (
            <div className="empty-state" style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', background: '#f8fafc', borderRadius: '12px' }}>
              <FileText size={48} style={{ color: '#94a3b8', marginBottom: '16px' }} />
              <h3>No documents required yet</h3>
              <p style={{ color: '#64748b' }}>Complete onboarding to generate your required document checklist.</p>
            </div>
          ) : (
            docs.map(doc => (
              <Card key={doc.id} className={`doc-card status-${doc.status}`}>
                <CardContent className="doc-content">
                  <div className="doc-header">
                    <span className="doc-type">{doc.type}</span>
                    <div className="doc-status-icon">
                      {doc.status === 'verified' && <CheckCircle2 size={20} className="text-success" />}
                      {doc.status === 'missing' && <AlertCircle size={20} className="text-warning" />}
                      {doc.status === 'not-uploaded' && <AlertCircle size={20} className="text-warning" />}
                      {doc.status === 'rejected' && <XCircle size={20} className="text-danger" />}
                    </div>
                  </div>

                  <h3 className="doc-name">{doc.name}</h3>

                  {doc.status === 'rejected' && (
                    <div className="doc-rejection-reason">
                      <strong>AI Validation Failed:</strong> {doc.reason}
                    </div>
                  )}
                  
                  {(doc.status === 'missing' || doc.status === 'not-uploaded') && (
                    <div className="doc-missing-text">
                      This document is required to proceed with your applications.
                    </div>
                  )}

                  <div className="doc-actions">
                    {doc.status === 'verified' ? (
                      <Button variant="outline" size="sm" style={{ width: '100%' }}>
                        <FileText size={16} style={{ marginRight: '6px' }} /> View Document
                      </Button>
                    ) : (
                      <Button 
                        variant={doc.status === 'rejected' ? 'primary' : 'primary'} 
                        size="sm" 
                        style={{ width: '100%', backgroundColor: doc.status === 'rejected' ? '#dc2626' : undefined }}
                        onClick={() => handleUploadClick(doc.id)}
                        disabled={uploading === doc.id}
                      >
                        {uploading === doc.id ? (
                          <><span className="spinner-small" style={{ marginRight: '8px' }}></span> Validating...</>
                        ) : (
                          <><UploadCloud size={16} style={{ marginRight: '6px' }} /> {doc.status === 'rejected' ? 'Re-upload' : 'Upload'}</>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
