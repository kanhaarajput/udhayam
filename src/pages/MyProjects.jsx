import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Building2, Plus, MapPin, Factory, Calendar, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './MyProjects.css';

export function MyProjects() {
  const navigate = useNavigate();
  const formData = useAppStore((state) => state.businessFormData);

  const [projects, setProjects] = useState([
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
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', location: '', type: 'Manufacturing' });

  const handleAddProject = () => {
    if (!newProject.name || !newProject.location) {
      toast.error('Please fill in all fields.');
      return;
    }
    const proj = {
      id: `PRJ-${Math.floor(Math.random() * 900) + 100}`,
      name: newProject.name,
      sector: newProject.type,
      location: newProject.location,
      stage: 'New Project',
      status: 'Active',
      created: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setProjects([proj, ...projects]);
    setShowAddModal(false);
    setNewProject({ name: '', location: '', type: 'Manufacturing' });
    toast.success('Project added successfully.');
  };

  return (
    <DashboardLayout>
      <div className="projects-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">My Projects</h1>
            <p className="page-subtitle">Manage your business locations and industrial projects.</p>
          </div>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} style={{ marginRight: '8px' }} /> Add New Project
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
                  <Button variant="outline" size="sm" style={{ width: '100%' }} onClick={() => navigate('/tracking')}>View Details</Button>
                  <Button variant="outline" size="sm" style={{ width: '100%' }} onClick={() => navigate('/checklist')}>Manage Approvals</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Project Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px' }}>
              <div className="modal-header">
                <h2>Add New Project</h2>
                <button className="btn-icon" onClick={() => setShowAddModal(false)}><X size={20} /></button>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Project Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Apex Manufacturing Hub"
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Location / City</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Pune, Maharashtra"
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    value={newProject.location}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Industry Type</label>
                  <select 
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    value={newProject.type}
                    onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                  >
                    <option>Manufacturing</option>
                    <option>IT / Software</option>
                    <option>Textiles</option>
                    <option>Food Processing</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleAddProject}>Add Project</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
