import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Building2, MapPin, Factory, Calendar, Plus } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './MyProjects.css';

export function MyProjects() {
  const navigate = useNavigate();
  const formData = useAppStore((state) => state.businessFormData);

  // Reflecting the single application state from onboarding
  const project = {
    id: 'PRJ-2026-001',
    name: formData.companyName || 'New Manufacturing Unit',
    sector: formData.sector || 'Manufacturing',
    location: formData.location || 'Maharashtra',
    stage: formData.stage || 'New Project',
    status: 'Active',
    created: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  };

  return (
    <DashboardLayout>
      <div className="projects-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">My Application</h1>
            <p className="page-subtitle">Manage your current business application and track approvals.</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/onboarding')}>
            <Plus size={18} style={{ marginRight: '8px' }} /> Start New Application
          </Button>
        </div>

        <div className="projects-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '600px' }}>
          <Card className="project-card">
            <CardContent className="project-content">
              <div className="proj-header">
                <div className="proj-icon-wrapper">
                  <Building2 size={24} className="text-primary" />
                </div>
                <span className={`proj-status ${project.status.toLowerCase()}`}>{project.status}</span>
              </div>
              
              <h3 className="proj-name">{project.name}</h3>
              <span className="proj-id">{project.id}</span>

              <div className="proj-details">
                <div className="detail-item">
                  <Factory size={14} />
                  <span>{project.sector}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={14} />
                  <span>{project.location}</span>
                </div>
                <div className="detail-item">
                  <Calendar size={14} />
                  <span>{project.created}</span>
                </div>
              </div>

              <div className="proj-actions">
                <Button variant="outline" size="sm" style={{ width: '100%' }} onClick={() => navigate('/tracking')}>View Details</Button>
                <Button variant="outline" size="sm" style={{ width: '100%' }} onClick={() => navigate('/checklist')}>Manage Approvals</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
