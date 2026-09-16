import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { UploadCloud, CheckCircle2, AlertCircle, FileText, Bot, XCircle } from 'lucide-react';
import './DocumentUpload.css';

const REQUIRED_DOCS = [
  { id: 'doc1', name: 'Certificate of Incorporation', status: 'verified', type: 'Company KYC' },
  { id: 'doc2', name: 'PAN Card (Company)', status: 'verified', type: 'Tax ID' },
  { id: 'doc3', name: 'Factory Layout Plan', status: 'missing', type: 'Technical' },
  { id: 'doc4', name: 'Pollution Control Board NOC', status: 'rejected', reason: 'Signature missing on page 2', type: 'Compliance' },
];

export function DocumentUpload() {
  const [docs, setDocs] = useState(REQUIRED_DOCS);
  const [uploading, setUploading] = useState(null);

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
          {docs.map(doc => (
            <Card key={doc.id} className={`doc-card status-${doc.status}`}>
              <CardContent className="doc-content">
                <div className="doc-header">
                  <span className="doc-type">{doc.type}</span>
                  <div className="doc-status-icon">
                    {doc.status === 'verified' && <CheckCircle2 size={20} className="text-success" />}
                    {doc.status === 'missing' && <AlertCircle size={20} className="text-warning" />}
                    {doc.status === 'rejected' && <XCircle size={20} className="text-danger" />}
                  </div>
                </div>

                <h3 className="doc-name">{doc.name}</h3>

                {doc.status === 'rejected' && (
                  <div className="doc-rejection-reason">
                    <strong>AI Validation Failed:</strong> {doc.reason}
                  </div>
                )}
                
                {doc.status === 'missing' && (
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
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
