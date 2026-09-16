import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Building2, Plus, MapPin, Factory, Calendar } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './MyProjects.css';

export function MyProjects() {
  const formData = useAppStore((state) => state.businessFormData);

  // Mock project data
  const projects = [
    {
      id: 'PRJ-2026-001',
      name: formData.companyName || 'GreenTech Manufacturing Unit',
      sector: formData.sector || 'Manufacturing',
      location: formData.location || 'Pune MIDC',
      stage: formData.stage || 'New Project',
      status: 'Active',
      created: '12 Aug 2026',
    },
    {
      id: 'PRJ-2024-042',
      name: 'Mumbai Office Expansion',
      sector: 'IT/ITES',
      location: 'Navi Mumbai',
      stage: 'Expansion',
      status: 'Completed',
      created: '05 Jan 2024',
    }
  ];

  return (
    <DashboardLayout>
      <div className="projects-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">My Projects</h1>
            <p className="page-subtitle">Manage your business locations and industrial projects.</p>
          </div>
          <Button variant="primary">
            <Plus size={18} style={{ marginRight: '6px' }} /> Create New Project
          </Button>
        </div>

        <div className="projects-grid">
          {projects.map((proj) => (
            <Card key={proj.id} className="project-card">
              <CardContent className="project-content">
                <div className="proj-header">
                  <div className="proj-icon-wrapper">
                    <Building2 size={24} className="text-primary" />
                  </div>
                  <span className={`proj-status ${proj.status.toLowerCase()}`}>{proj.status}</span>
                </div>
                
                <h3 className="proj-name">{proj.name}</h3>
                <span className="proj-id">{proj.id}</span>

                <div className="proj-details">
                  <div className="detail-item">
                    <Factory size={14} />
                    <span>{proj.sector}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={14} />
                    <span>{proj.location}</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={14} />
                    <span>{proj.created}</span>
                  </div>
                </div>

                <div className="proj-actions">
                  <Button variant="outline" size="sm" style={{ width: '100%' }}>View Details</Button>
                  <Button variant="outline" size="sm" style={{ width: '100%' }}>Manage Approvals</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
