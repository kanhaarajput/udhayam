import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Clock, CheckCircle2, MessageSquare, Search, Filter, ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import './OfficerDashboard.css';

export function OfficerDashboard() {
  const navigate = useNavigate();
  const applications = useAppStore((state) => state.applications);
  const updateApplicationStatus = useAppStore((state) => state.updateApplicationStatus);
  const addNotification = useAppStore((state) => state.addNotification);
  
  // Grid State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'board'

  // Handle Sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and Sort Logic
  const filteredAndSortedApps = useMemo(() => {
    let filtered = applications.filter((app) => {
      const matchesSearch = 
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        app.entName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.type.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [applications, searchQuery, statusFilter, sortConfig]);

  // Kanban Drag and Drop Logic
  const handleDragStart = (e, appId) => {
    e.dataTransfer.setData('appId', appId);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e, newStatus, newVariant) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData('appId');
    if (appId) {
      updateApplicationStatus(appId, newStatus, newVariant);
      
      if (newStatus === 'Approved') {
        const app = applications.find(a => a.id === appId);
        addNotification({
          title: 'Application Approved! 🎉',
          message: `Your ${app?.type || ''} application (${appId}) has been approved via Kanban Board.`,
          type: 'success',
          link: `/tracking/details/${appId}`
        });
      } else if (newStatus === 'Queries Raised') {
        const app = applications.find(a => a.id === appId);
        addNotification({
          title: 'Application Update: Queries Raised',
          message: `Your ${app?.type || ''} application (${appId}) has pending queries.`,
          type: 'warning',
          link: `/tracking/details/${appId}`
        });
      }
    }
  };

  const renderKanbanColumn = (status, title, variant) => {
    const columnApps = filteredAndSortedApps.filter(app => app.status === status);
    
    return (
      <div 
        className="kanban-column"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, status, variant)}
      >
        <div className="kanban-column-header">
          <h3>{title}</h3>
          <Badge variant={variant}>{columnApps.length}</Badge>
        </div>
        
        {columnApps.map(app => (
          <div 
            key={app.id} 
            className="kanban-card"
            draggable
            onDragStart={(e) => handleDragStart(e, app.id)}
            onClick={() => navigate('/officer/review')}
          >
            <div className="kanban-card-header">
              <Badge variant={app.variant}>{app.id}</Badge>
            </div>
            <h4 className="kanban-card-title">{app.entName}</h4>
            <p className="kanban-card-subtitle">{app.type}</p>
            <div className="kanban-card-footer">
              <span>{app.date}</span>
              <Button variant="ghost" size="sm" style={{ padding: '0 4px', height: 'auto' }}>Review</Button>
            </div>
          </div>
        ))}
        {columnApps.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
            Drop applications here
          </div>
        )}
      </div>
    );
  };

  return (
    <OfficerLayout>
      <div className="officer-dashboard">
        <div className="page-header" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <h1 className="page-title">Welcome, Officer Sharma</h1>
          <p className="page-subtitle">Here is an overview of your department's workload.</p>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-icon bg-warning"><Clock size={24} className="text-warning"/></div>
              <div>
                <span className="stat-value">
                  {applications.filter(a => a.status === 'Pending Review').length}
                </span>
                <span className="stat-label">Pending Reviews</span>
              </div>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-icon bg-success"><CheckCircle2 size={24} className="text-success"/></div>
              <div>
                <span className="stat-value">
                  {applications.filter(a => a.status === 'Approved').length}
                </span>
                <span className="stat-label">Total Approved</span>
              </div>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-icon bg-error"><MessageSquare size={24} className="text-error"/></div>
              <div>
                <span className="stat-value">
                  {applications.filter(a => a.status === 'Queries Raised').length}
                </span>
                <span className="stat-label">Queries Raised</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <div style={{ marginTop: 'var(--spacing-2xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', color: 'var(--primary-800)', margin: 0 }}>Incoming Applications</h2>
            
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
              {/* View Toggle */}
              <div style={{ display: 'flex', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <button 
                  onClick={() => setViewMode('table')}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', border: 'none', background: viewMode === 'table' ? 'var(--primary-100)' : 'transparent', color: viewMode === 'table' ? 'var(--primary-700)' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <List size={16} /> Table
                </button>
                <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
                <button 
                  onClick={() => setViewMode('board')}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', border: 'none', background: viewMode === 'board' ? 'var(--primary-100)' : 'transparent', color: viewMode === 'board' ? 'var(--primary-700)' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <LayoutGrid size={16} /> Board
                </button>
              </div>

              <div className="grid-search" style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Search ID, Name, Type..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ padding: '8px 12px 8px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--surface-color)', color: 'var(--text-primary)' }}
                />
              </div>
              
              {viewMode === 'table' && (
                <div className="grid-filter" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--surface-color)' }}>
                  <Filter size={16} color="var(--text-muted)" />
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-primary)', padding: '8px 0' }}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Queries Raised">Queries Raised</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          
          {viewMode === 'table' ? (
            <Card style={{ overflowX: 'auto' }}>
              <table className="officer-table">
                <thead>
                  <tr>
                    <th onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Application ID <ArrowUpDown size={14} color="var(--text-muted)"/></div>
                    </th>
                    <th onClick={() => requestSort('entName')} style={{ cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Entrepreneur / Business <ArrowUpDown size={14} color="var(--text-muted)"/></div>
                    </th>
                    <th onClick={() => requestSort('type')} style={{ cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Approval Type <ArrowUpDown size={14} color="var(--text-muted)"/></div>
                    </th>
                    <th onClick={() => requestSort('date')} style={{ cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Submission Date <ArrowUpDown size={14} color="var(--text-muted)"/></div>
                    </th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedApps.length > 0 ? (
                    filteredAndSortedApps.map((app, idx) => (
                      <tr key={idx} className="table-row-hover">
                        <td className="font-medium">{app.id}</td>
                        <td>{app.entName}</td>
                        <td>{app.type}</td>
                        <td>{app.date}</td>
                        <td><Badge variant={app.variant}>{app.status}</Badge></td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Button variant="primary" size="sm" onClick={() => navigate('/officer/review')}>Review</Button>
                            {app.status !== 'Approved' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  updateApplicationStatus(app.id, 'Approved', 'success');
                                  addNotification({
                                    title: 'Application Approved! 🎉',
                                    message: `Your ${app.type} application (${app.id}) has been approved by the officer.`,
                                    type: 'success',
                                    link: `/tracking/details/${app.id}`
                                  });
                                }}
                                style={{ borderColor: 'var(--success-color)', color: 'var(--success-color)' }}
                              >
                                Approve
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: 'var(--spacing-3xl)', color: 'var(--text-muted)' }}>
                        No applications match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card>
          ) : (
            /* Kanban Board View */
            <div className="kanban-board">
              {renderKanbanColumn('Pending Review', 'To Do', 'warning')}
              {renderKanbanColumn('Queries Raised', 'In Progress', 'error')}
              {renderKanbanColumn('Approved', 'Done', 'success')}
            </div>
          )}
        </div>
      </div>
    </OfficerLayout>
  );
}
