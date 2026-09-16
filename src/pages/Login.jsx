import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Building2, UserCheck, BarChart3, ArrowRight, Shield } from 'lucide-react';
import './auth.css';

const ROLES = [
  {
    id: 'applicant',
    title: 'Applicant',
    subtitle: 'Business Owner / Entrepreneur',
    description: 'Apply for approvals, track status, upload documents, and explore schemes.',
    icon: Building2,
    color: '#0d9488',
    route: '/onboarding',
  },
  {
    id: 'official',
    title: 'Department Official',
    subtitle: 'Government Officer',
    description: 'Review applications, approve/reject, schedule inspections, and raise queries.',
    icon: UserCheck,
    color: '#3b82f6',
    route: '/officer/dashboard',
  },
  {
    id: 'admin',
    title: 'MSInS Admin',
    subtitle: 'System Administrator',
    description: 'View analytics dashboards, monitor bottlenecks, and track SLA compliance.',
    icon: BarChart3,
    color: '#8b5cf6',
    route: '/analytics',
  },
];

export function Login() {
  const navigate = useNavigate();
  const setUserRole = useAppStore((state) => state.setUserRole);

  const handleRoleSelect = (role) => {
    setUserRole(role.id);
    navigate(role.route);
  };

  return (
    <div className="auth-page role-selector-page">
      <div className="role-selector-container">
        <div className="role-selector-header">
          <div className="role-logo">
            <Shield size={28} />
          </div>
          <h1>Welcome to UdyamOne</h1>
          <p>Select your role to continue</p>
        </div>

        <div className="role-cards-grid">
          {ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                className="role-card"
                onClick={() => handleRoleSelect(role)}
                style={{ '--role-color': role.color }}
              >
                <div className="role-card-icon">
                  <Icon size={32} />
                </div>
                <h3>{role.title}</h3>
                <span className="role-card-subtitle">{role.subtitle}</span>
                <p className="role-card-desc">{role.description}</p>
                <div className="role-card-action">
                  Continue <ArrowRight size={16} />
                </div>
              </button>
            );
          })}
        </div>

        <p className="role-selector-footer">
          This is a demonstration environment — no authentication required.
        </p>
      </div>
    </div>
  );
}
