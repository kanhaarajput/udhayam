import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Download, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './CertificateViewer.css';

export function CertificateViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const applications = useAppStore((state) => state.applications);
  
  const appData = applications.find(a => a.id === id) || {
    id: id || 'CERT-2023-XXXX',
    type: 'Official Clearance Certificate',
    entName: 'Authorized Business Entity',
    date: new Date().toLocaleDateString()
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="certificate-page">
      <div className="cert-actions no-print">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back
        </Button>
        <Button variant="primary" onClick={handlePrint}>
          <Download size={18} style={{ marginRight: '8px' }} /> Download PDF
        </Button>
      </div>

      <div className="certificate-container">
        <div className="certificate-border">
          <div className="certificate-content">
            
            <div className="cert-header">
              <ShieldCheck size={64} color="#1e3a8a" />
              <div className="cert-gov-text">
                <h2>GOVERNMENT OF INDIA</h2>
                <p>Ministry of Micro, Small & Medium Enterprises</p>
                <h3>UDYAM ONE DIGITAL PLATFORM</h3>
              </div>
              <ShieldCheck size={64} color="#1e3a8a" />
            </div>

            <div className="cert-title-section">
              <h1>CERTIFICATE OF APPROVAL</h1>
              <p className="cert-id">Certificate No: <strong>{appData.id}</strong></p>
            </div>

            <div className="cert-body">
              <p>This is to certify that</p>
              <h2>{appData.entName}</h2>
              <p>has successfully met all regulatory and compliance requirements and is hereby granted the</p>
              <h3>{appData.type}</h3>
              <p>This certificate is issued under the authority of the designated department and is digitally signed and verifiable via the UdyamOne Portal.</p>
            </div>

            <div className="cert-footer">
              <div className="cert-date">
                <p>Date of Issue:</p>
                <strong>{appData.date}</strong>
              </div>
              <div className="cert-qr">
                <div className="qr-placeholder">QR Code</div>
                <p>Scan to Verify</p>
              </div>
              <div className="cert-signature">
                <div className="signature-line"></div>
                <p>Digital Signature</p>
                <strong>Authorized Issuing Officer</strong>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
