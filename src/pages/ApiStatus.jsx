import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { 
  CheckCircle2, AlertTriangle, XCircle, 
  Activity, Clock, RefreshCcw, Info
} from 'lucide-react';
import './ApiStatus.css';

// Mock Data for APIs
const API_SERVICES = [
  { id: 'gstn', name: 'GSTN Portal (Tax)', status: 'operational', uptime: '99.99%' },
  { id: 'uidai', name: 'UIDAI (Aadhaar eKYC)', status: 'operational', uptime: '99.95%' },
  { id: 'mca', name: 'MCA21 (Company Registration)', status: 'degraded', uptime: '98.50%', message: 'Experiencing slow response times for DIN generation.' },
  { id: 'eway', name: 'e-Way Bill System', status: 'operational', uptime: '99.90%' },
  { id: 'udyam', name: 'Udyam Registration Portal', status: 'outage', uptime: '95.20%', message: 'Portal is currently down for scheduled maintenance.' }
];

// Generate 7 days of mock timeline data (array of 7 items per service)
// 1 = operational, 2 = degraded, 3 = outage
const generateTimeline = (status) => {
  let timeline = [];
  for(let i=0; i<7; i++) {
    if (i === 6) {
      // Today
      if (status === 'operational') timeline.push(1);
      else if (status === 'degraded') timeline.push(2);
      else timeline.push(3);
    } else {
      // Past 6 days (mostly 1s, occasional 2s)
      timeline.push(Math.random() > 0.9 ? 2 : 1);
    }
  }
  return timeline;
};

const INCIDENTS = [
  { date: 'Sep 08, 2026', title: 'UIDAI OTP Delays', status: 'Resolved', desc: 'Resolved an issue causing 5+ minute delays in Aadhaar OTP generation.' },
  { date: 'Sep 05, 2026', title: 'GSTN Gateway Timeout', status: 'Resolved', desc: 'Fixed intermittent 504 Gateway Timeout errors during GSTR-3B filings.' }
];

export function ApiStatus() {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Overall status logic
  const hasOutage = API_SERVICES.some(s => s.status === 'outage');
  const hasDegraded = API_SERVICES.some(s => s.status === 'degraded');
  
  let globalStatus = 'operational';
  let globalMessage = 'All Systems Operational';
  let GlobalIcon = CheckCircle2;

  if (hasOutage) {
    globalStatus = 'outage';
    globalMessage = 'Partial System Outage';
    GlobalIcon = XCircle;
  } else if (hasDegraded) {
    globalStatus = 'degraded';
    globalMessage = 'Degraded Performance';
    GlobalIcon = AlertTriangle;
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusIcon = (status) => {
    if (status === 'operational') return <CheckCircle2 size={20} className="text-success" />;
    if (status === 'degraded') return <AlertTriangle size={20} className="text-warning" />;
    return <XCircle size={20} className="text-error" />;
  };

  return (
    <DashboardLayout>
      <div className="status-container">
        
        {/* Header */}
        <div className="status-header">
          <div className="status-title-wrapper">
            <h1 className="page-title">System Status</h1>
            <p className="page-subtitle">Real-time health of UdyamOne and connected Government APIs.</p>
          </div>
          <button 
            className={`refresh-btn ${isRefreshing ? 'spinning' : ''}`}
            onClick={handleRefresh}
          >
            <RefreshCcw size={18} /> 
            <span>Last updated: {lastUpdated}</span>
          </button>
        </div>

        {/* Global Banner */}
        <div className={`global-status-banner ${globalStatus} fade-in-up`}>
          <div className="banner-content">
            <div className="banner-icon-ring">
              <GlobalIcon size={32} />
            </div>
            <h2>{globalMessage}</h2>
          </div>
          <p>We continuously monitor the uptime of all dependent government microservices.</p>
        </div>

        {/* Services Grid */}
        <Card className="status-card fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="status-card-header">
            <h3>Connected Services</h3>
            <span className="uptime-label">Uptime (7 Days)</span>
          </div>
          <CardContent className="status-card-content p-0">
            <div className="services-list">
              {API_SERVICES.map((service, index) => {
                const timeline = generateTimeline(service.status);
                
                return (
                  <div key={service.id} className="service-item">
                    <div className="service-info-col">
                      <div className="service-name-row">
                        {getStatusIcon(service.status)}
                        <span className="service-name">{service.name}</span>
                        {service.status === 'degraded' && <span className="badge badge-warning">Degraded</span>}
                        {service.status === 'outage' && <span className="badge badge-error">Outage</span>}
                      </div>
                      {service.message && (
                        <p className="service-message">
                          <Info size={14} style={{ display: 'inline', marginRight: '4px' }}/> 
                          {service.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="service-timeline-col">
                      <div className="timeline-blocks">
                        {timeline.map((t, i) => (
                          <div 
                            key={i} 
                            className={`timeline-block val-${t}`}
                            title={t === 1 ? 'Operational' : t === 2 ? 'Degraded' : 'Outage'}
                          ></div>
                        ))}
                      </div>
                      <span className="uptime-percentage">{service.uptime}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Incident History */}
        <Card className="status-card mt-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="status-card-header">
            <h3>Past Incidents</h3>
          </div>
          <CardContent className="status-card-content p-0">
            <div className="incident-list">
              {INCIDENTS.map((incident, i) => (
                <div key={i} className="incident-item">
                  <div className="incident-date">{incident.date}</div>
                  <div className="incident-details">
                    <h4>{incident.title}</h4>
                    <p>{incident.desc}</p>
                    <span className="incident-status"><CheckCircle2 size={14}/> {incident.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}
