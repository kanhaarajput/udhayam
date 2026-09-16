import React, { useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Card } from '../../components/Card';
import { Users, UserPlus, Shield, MoreVertical, Building2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../../components/Button';
import './UserManagement.css';

const INITIAL_USERS = [
  { id: 'USR-1042', name: 'Ravi Desai', role: 'Applicant', org: 'Desai Foods Pvt Ltd', status: 'Active', lastLogin: '2 mins ago' },
  { id: 'USR-1043', name: 'Anita Sharma', role: 'Department Official', org: 'MPCB', status: 'Active', lastLogin: '1 hour ago' },
  { id: 'USR-1044', name: 'Vikram Singh', role: 'System Admin', org: 'MSInS', status: 'Active', lastLogin: '5 hours ago' },
  { id: 'USR-1045', name: 'Neha Gupta', role: 'Applicant', org: 'Gupta Enterprises', status: 'Suspended', lastLogin: '3 days ago' },
  { id: 'USR-1046', name: 'Priya Patel', role: 'Department Official', org: 'FSSAI', status: 'Active', lastLogin: 'Yesterday' },
];

export function UserManagement() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: 'Applicant', org: '' });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.org) {
      toast.error('Please fill in all fields.');
      return;
    }
    const newUser = {
      id: `USR-${1047 + users.length}`,
      name: formData.name,
      role: formData.role,
      org: formData.org,
      status: 'Active',
      lastLogin: 'Just now'
    };
    setUsers([newUser, ...users]);
    setShowModal(false);
    setFormData({ name: '', role: 'Applicant', org: '' });
    toast.success('User added successfully!');
  };

  return (
    <AdminLayout>
      <div className="user-mgmt-page">
        <div className="um-header">
          <div>
            <h1 className="page-title">User Management</h1>
            <p className="page-subtitle">Manage portal access, roles, and organizational assignments.</p>
          </div>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <UserPlus size={16} style={{ marginRight: '8px' }} /> Add User
          </Button>
        </div>

        <Card className="um-card">
          <div className="um-table">
            <div className="um-thead">
              <span>User ID</span>
              <span>Name & Role</span>
              <span>Organization</span>
              <span>Status</span>
              <span>Last Login</span>
              <span></span>
            </div>
            {users.map((user, idx) => (
              <div key={idx} className="um-trow">
                <span className="um-id">{user.id}</span>
                <div className="um-name-col">
                  <span className="um-name">{user.name}</span>
                  <span className="um-role">
                    {user.role === 'System Admin' ? <Shield size={12} style={{ color: '#8b5cf6', marginRight: '4px' }}/> : null}
                    {user.role}
                  </span>
                </div>
                <span className="um-org">
                  <Building2 size={14} style={{ marginRight: '6px', color: '#94a3b8' }}/>
                  {user.org}
                </span>
                <span className="um-status">
                  <span className={`status-dot ${user.status.toLowerCase()}`}></span>
                  {user.status}
                </span>
                <span className="um-last-login">{user.lastLogin}</span>
                <span className="um-actions">
                  <button className="btn-icon"><MoreVertical size={16}/></button>
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Add User Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New User</h2>
                <button className="btn-icon" onClick={() => setShowModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddUser} className="modal-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select 
                    value={formData.role} 
                    onChange={e => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="Applicant">Applicant</option>
                    <option value="Department Official">Department Official</option>
                    <option value="System Admin">System Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Organization / Department</label>
                  <input 
                    type="text" 
                    value={formData.org} 
                    onChange={e => setFormData({...formData, org: e.target.value})}
                    placeholder="e.g. MPCB, ACME Corp"
                  />
                </div>
                <div className="modal-actions">
                  <Button variant="outline" type="button" onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button variant="primary" type="submit">Create User</Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
