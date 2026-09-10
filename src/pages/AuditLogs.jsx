import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Search, Download, Filter, FileText, UserPlus, CreditCard, ShieldAlert, LogIn, HardDriveDownload } from 'lucide-react';
import toast from 'react-hot-toast';
import './AuditLogs.css';

// Mock Data
const MOCK_LOGS = [
  { id: 'log-1', timestamp: '2026-09-10 14:32:01', user: 'Lalit', email: 'owner@abcfoods.com', category: 'Security', action: 'Enabled 2FA Authentication', ip: '192.168.1.45', risk: 'Low' },
  { id: 'log-2', timestamp: '2026-09-10 11:15:22', user: 'Aditi Sharma', email: 'aditi@abcfoods.com', category: 'Document', action: 'Uploaded GST_Certificate_2026.pdf', ip: '10.0.0.12', risk: 'Low' },
  { id: 'log-3', timestamp: '2026-09-09 09:45:10', user: 'Lalit', email: 'owner@abcfoods.com', category: 'Team', action: 'Invited cfo@abcfoods.com as Accountant', ip: '192.168.1.45', risk: 'Medium' },
  { id: 'log-4', timestamp: '2026-09-08 16:20:05', user: 'System', email: 'system@udyamone.com', category: 'Billing', action: 'Auto-renewed Trade License (₹4,500)', ip: 'Internal API', risk: 'Low' },
  { id: 'log-5', timestamp: '2026-09-07 08:30:00', user: 'Lalit', email: 'owner@abcfoods.com', category: 'Auth', action: 'Successful Login', ip: '192.168.1.45', risk: 'Low' },
  { id: 'log-6', timestamp: '2026-09-05 23:15:44', user: 'Unknown', email: 'N/A', category: 'Security', action: 'Failed Login Attempt (3x)', ip: '45.22.19.102', risk: 'High' },
  { id: 'log-7', timestamp: '2026-09-02 10:10:10', user: 'Aditi Sharma', email: 'aditi@abcfoods.com', category: 'Document', action: 'Deleted Draft_Agreement.docx', ip: '10.0.0.12', risk: 'Medium' }
];

const CATEGORIES = ['All', 'Security', 'Document', 'Team', 'Billing', 'Auth'];

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isExporting, setIsExporting] = useState(false);

  // Filter logic
  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || log.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success('Audit_Logs_Report.csv downloaded successfully.');
    }, 2000);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Security': return <ShieldAlert size={14} />;
      case 'Document': return <FileText size={14} />;
      case 'Team': return <UserPlus size={14} />;
      case 'Billing': return <CreditCard size={14} />;
      case 'Auth': return <LogIn size={14} />;
      default: return <FileText size={14} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="audit-container">
        
        {/* Header */}
        <div className="audit-header">
          <div className="audit-title-wrapper">
            <h1 className="page-title">Security & Audit Logs</h1>
            <p className="page-subtitle">Track all workspace activity, security events, and data access.</p>
          </div>
          <Button variant="outline" onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <><span className="spinner-small" style={{ marginRight: '8px' }}></span> Generating...</>
            ) : (
              <><HardDriveDownload size={18} style={{ marginRight: '8px' }} /> Export CSV</>
            )}
          </Button>
        </div>

        {/* Filters */}
        <Card className="audit-filters-card fade-in-up">
          <CardContent className="audit-filters-content">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search events, users, or IP addresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="category-filters">
              <Filter size={16} className="text-muted" style={{ marginRight: '8px' }} />
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="audit-table-card mt-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-0">
            <div className="table-responsive">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Event Category</th>
                    <th>Action Details</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map(log => (
                      <tr key={log.id}>
                        <td className="log-time">{log.timestamp}</td>
                        <td>
                          <div className="log-user">
                            <span className="log-avatar">{log.user.charAt(0)}</span>
                            <span>{log.user}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`log-badge badge-${log.category.toLowerCase()}`}>
                            {getCategoryIcon(log.category)} {log.category}
                          </span>
                        </td>
                        <td>
                          <div className="log-action">
                            {log.risk === 'High' && <span className="risk-dot high"></span>}
                            {log.risk === 'Medium' && <span className="risk-dot medium"></span>}
                            {log.action}
                          </div>
                        </td>
                        <td className="log-ip">{log.ip}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-logs">
                        <ShieldAlert size={32} className="text-muted" />
                        <p>No audit logs found for the selected filters.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}
