import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { Users, UserPlus, Mail, Shield, ShieldAlert, FileText, CheckCircle2, MoreVertical, X } from 'lucide-react';
import toast from 'react-hot-toast';
import './TeamManagement.css';

const ROLES = ['Admin', 'Accountant', 'Legal Advisor', 'Operations'];

const PERMISSIONS = [
  { feature: 'Dashboard Analytics', owner: true, admin: true, acc: false, legal: false },
  { feature: 'Submit Applications', owner: true, admin: true, acc: false, legal: true },
  { feature: 'View Document Vault', owner: true, admin: true, acc: true, legal: true },
  { feature: 'Billing & Invoices', owner: true, admin: false, acc: true, legal: false },
  { feature: 'Invite Team Members', owner: true, admin: true, acc: false, legal: false },
  { feature: 'Delete Workspace', owner: true, admin: false, acc: false, legal: false },
];

export function TeamManagement() {
  const teamMembers = useAppStore(state => state.teamMembers);
  const inviteTeamMember = useAppStore(state => state.inviteTeamMember);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Admin');

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail.includes('@')) {
      toast.error('Please enter a valid email.');
      return;
    }

    setIsInviting(true);
    
    // Simulate API delay
    setTimeout(() => {
      inviteTeamMember({
        id: `user-${Date.now()}`,
        name: inviteEmail.split('@')[0], // Mock name from email
        email: inviteEmail,
        role: inviteRole,
        status: 'Pending',
        lastActive: 'Never'
      });
      setIsInviting(false);
      setIsModalOpen(false);
      setInviteEmail('');
      setInviteRole('Admin');
      toast.success('Invitation sent successfully!');
    }, 1500);
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'Owner': return 'badge-owner';
      case 'Admin': return 'badge-admin';
      case 'Accountant': return 'badge-acc';
      case 'Legal Advisor': return 'badge-legal';
      default: return 'badge-default';
    }
  };

  return (
    <DashboardLayout>
      <div className="team-container">
        
        {/* Header */}
        <div className="team-header">
          <div className="team-title-wrapper">
            <h1 className="page-title">Team & Access</h1>
            <p className="page-subtitle">Manage your team members and their permissions.</p>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <UserPlus size={18} style={{ marginRight: '8px' }} /> Invite Member
          </Button>
        </div>

        {/* Team Directory Table */}
        <Card className="team-card fade-in-up">
          <div className="team-card-header">
            <h3>Team Directory</h3>
            <span className="team-count">{teamMembers.length} Members</span>
          </div>
          <CardContent className="team-card-content p-0">
            <div className="table-responsive">
              <table className="team-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Active</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map(member => (
                    <tr key={member.id}>
                      <td>
                        <div className="member-profile">
                          <div className="member-avatar">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="member-info">
                            <strong>{member.name}</strong>
                            <span>{member.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge ${getRoleBadge(member.role)}`}>
                          {member.role}
                        </span>
                      </td>
                      <td>
                        {member.status === 'Active' ? (
                          <span className="status-badge active"><CheckCircle2 size={12}/> Active</span>
                        ) : (
                          <span className="status-badge pending"><Mail size={12}/> Pending</span>
                        )}
                      </td>
                      <td className="last-active">{member.lastActive}</td>
                      <td align="right">
                        {member.role !== 'Owner' && (
                          <button className="icon-btn-more"><MoreVertical size={18}/></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Permission Matrix */}
        <Card className="team-card mt-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="team-card-header">
            <div>
              <h3>Permission Matrix</h3>
              <p className="header-desc">Feature access by role. Only Owners can modify RBAC policies.</p>
            </div>
          </div>
          <CardContent className="team-card-content p-0">
            <div className="table-responsive">
              <table className="permissions-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th align="center">Owner</th>
                    <th align="center">Admin</th>
                    <th align="center">Accountant</th>
                    <th align="center">Legal Advisor</th>
                  </tr>
                </thead>
                <tbody>
                  {PERMISSIONS.map((perm, index) => (
                    <tr key={index}>
                      <td className="perm-feature">{perm.feature}</td>
                      <td align="center">
                        {perm.owner ? <CheckCircle2 size={18} className="text-success" /> : <X size={18} className="text-muted" />}
                      </td>
                      <td align="center">
                        {perm.admin ? <CheckCircle2 size={18} className="text-success" /> : <X size={18} className="text-muted" />}
                      </td>
                      <td align="center">
                        {perm.acc ? <CheckCircle2 size={18} className="text-success" /> : <X size={18} className="text-muted" />}
                      </td>
                      <td align="center">
                        {perm.legal ? <CheckCircle2 size={18} className="text-success" /> : <X size={18} className="text-muted" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Invite Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content team-invite-modal bounce-in">
              <div className="modal-header">
                <h2>Invite Team Member</h2>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleInvite} className="modal-body">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="colleague@company.com" 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Assign Role</label>
                  <select 
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                
                <div className="role-explanation">
                  <Shield size={16} />
                  <p>
                    <strong>{inviteRole}s</strong> can {inviteRole === 'Admin' ? 'manage apps and users' : inviteRole === 'Accountant' ? 'view billing and invoices' : 'review applications and documents'}.
                  </p>
                </div>

                <div className="modal-actions">
                  <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" type="submit" disabled={isInviting}>
                    {isInviting ? 'Sending Invite...' : 'Send Invite'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
