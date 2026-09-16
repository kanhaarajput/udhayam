import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Card, CardContent } from '../../components/Card';
import { CheckCircle2, AlertTriangle, XCircle, Activity, Server, Database, Globe } from 'lucide-react';
import './SystemStatus.css';

const SERVICES = [
  { name: 'Udyam Registration API', status: 'operational', uptime: '99.99%', latency: '45ms' },
  { name: 'GSTN Gateway', status: 'operational', uptime: '99.95%', latency: '120ms' },
  { name: 'MCA Company Search', status: 'degraded', uptime: '98.50%', latency: '850ms' },
  { name: 'Document Vault Storage', status: 'operational', uptime: '100%', latency: '12ms' },
  { name: 'Notification Service', status: 'operational', uptime: '99.90%', latency: '30ms' },
  { name: 'Payment Gateway (BillDesk)', status: 'down', uptime: '95.00%', latency: 'Timeout' },
];

export function SystemStatus() {
  return (
    <AdminLayout>
      <div className="system-status-page">
        <div className="status-header">
          <div>
            <h1 className="page-title">System Status</h1>
            <p className="page-subtitle">Real-time monitoring of internal services and government API integrations.</p>
          </div>
          <div className="overall-status warning">
            <AlertTriangle size={20} />
            <span>Partial Outage</span>
          </div>
        </div>

        <div className="status-grid">
          <Card className="status-card">
            <div className="card-header-row">
              <h3><Activity size={18} style={{ marginRight: '8px' }}/> Service Health</h3>
            </div>
            <div className="services-list">
              <div className="sl-header">
                <span>Service Name</span>
                <span>Status</span>
                <span>Latency</span>
                <span>Uptime (30d)</span>
              </div>
              {SERVICES.map((srv, idx) => (
                <div key={idx} className="sl-row">
                  <span className="sl-name">
                    {srv.name.includes('Storage') ? <Database size={14}/> : srv.name.includes('Gateway') ? <Globe size={14}/> : <Server size={14}/>}
                    {srv.name}
                  </span>
                  <span className={`sl-status badge-${srv.status}`}>
                    {srv.status === 'operational' && <CheckCircle2 size={12}/>}
                    {srv.status === 'degraded' && <AlertTriangle size={12}/>}
                    {srv.status === 'down' && <XCircle size={12}/>}
                    {srv.status.charAt(0).toUpperCase() + srv.status.slice(1)}
                  </span>
                  <span className="sl-latency">{srv.latency}</span>
                  <span className="sl-uptime">{srv.uptime}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
