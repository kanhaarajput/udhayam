import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { 
  MessageSquare, FileSpreadsheet, CreditCard, Blocks, 
  CheckCircle2, FolderLock, BellRing
} from 'lucide-react';
import toast from 'react-hot-toast';
import './Integrations.css';

const INTEGRATION_APPS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business API',
    category: 'Communication',
    description: 'Receive real-time alerts for scheme approvals and officer queries directly on your WhatsApp.',
    icon: MessageSquare,
    color: '#25D366'
  },
  {
    id: 'tally',
    name: 'Tally ERP9 Sync',
    category: 'Accounting',
    description: 'Automatically sync your approved government subsidies and tax refunds into Tally.',
    icon: FileSpreadsheet,
    color: '#FF6B6B'
  },
  {
    id: 'digilocker',
    name: 'Gov DigiLocker',
    category: 'Verification',
    description: 'Auto-import verified KYC documents (Aadhaar, PAN) straight into your Document Vault.',
    icon: FolderLock,
    color: '#0056b3'
  },
  {
    id: 'razorpay',
    name: 'Razorpay Gateway',
    category: 'Payments',
    description: 'Connect your Razorpay account to automate license fee reconciliations.',
    icon: CreditCard,
    color: '#02042B'
  },
  {
    id: 'slack',
    name: 'Slack Alerts',
    category: 'Productivity',
    description: 'Send compliance deadline alerts to a specific Slack channel for your team.',
    icon: BellRing,
    color: '#E01E5A'
  }
];

export function Integrations() {
  const integrations = useAppStore(state => state.integrations);
  const toggleIntegration = useAppStore(state => state.toggleIntegration);
  
  const [connectingId, setConnectingId] = useState(null);

  const handleConnect = (id, currentStatus) => {
    if (currentStatus) {
      // If already connected, just disconnect instantly
      toggleIntegration(id, false);
      toast.success('Integration disconnected.');
      return;
    }

    // Simulate OAuth connection sequence
    setConnectingId(id);
    setTimeout(() => {
      toggleIntegration(id, true);
      setConnectingId(null);
      toast.success('Successfully authorized and connected!');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="integrations-container">
        
        {/* Header */}
        <div className="integrations-header">
          <div className="integrations-title-wrapper">
            <h1 className="page-title">App Marketplace</h1>
            <p className="page-subtitle">Connect UdyamOne with your favorite tools to automate your workflows.</p>
          </div>
        </div>

        {/* Categories (Decorative for now) */}
        <div className="integrations-filters">
          <button className="filter-chip active">All Apps</button>
          <button className="filter-chip">Accounting</button>
          <button className="filter-chip">Communication</button>
          <button className="filter-chip">Productivity</button>
        </div>

        {/* App Grid */}
        <div className="integrations-grid">
          {INTEGRATION_APPS.map((app) => {
            const isConnected = integrations[app.id]?.connected;
            const isConnecting = connectingId === app.id;
            const Icon = app.icon;

            return (
              <Card key={app.id} className={`integration-card fade-in-up ${isConnected ? 'connected-card' : ''}`}>
                <CardContent className="integration-card-content">
                  <div className="integration-top">
                    <div className="integration-icon" style={{ backgroundColor: `${app.color}15`, color: app.color }}>
                      <Icon size={28} />
                    </div>
                    {isConnected && (
                      <span className="connected-badge">
                        <CheckCircle2 size={14} /> Connected
                      </span>
                    )}
                  </div>
                  
                  <div className="integration-info">
                    <span className="integration-category">{app.category}</span>
                    <h3 className="integration-name">{app.name}</h3>
                    <p className="integration-desc">{app.description}</p>
                  </div>

                  <div className="integration-actions">
                    {isConnected ? (
                      <button 
                        className="btn-disconnect"
                        onClick={() => handleConnect(app.id, isConnected)}
                      >
                        Disconnect
                      </button>
                    ) : (
                      <Button 
                        variant="primary" 
                        onClick={() => handleConnect(app.id, isConnected)}
                        disabled={isConnecting}
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        {isConnecting ? (
                          <>
                            <span className="spinner-mini"></span> Authorizing...
                          </>
                        ) : (
                          'Connect App'
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Coming Soon Card */}
          <Card className="integration-card coming-soon fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="integration-card-content" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div className="integration-icon" style={{ backgroundColor: 'var(--surface-color)', color: 'var(--text-muted)' }}>
                <Blocks size={28} />
              </div>
              <h3 className="integration-name mt-4">More Coming Soon</h3>
              <p className="integration-desc">We are constantly adding new integrations. Vote for the next one on our community board!</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
