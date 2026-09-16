import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Settings, LayoutDashboard, User, Folder, Search, CheckSquare, 
  FileText, ClipboardCheck, ShieldAlert, FileSignature, AlertCircle, LifeBuoy, FolderLock, Sun, Moon, Blocks, Activity, Users, Shield, BarChart3, Terminal, Mail, Zap, Gift
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { LanguageToggle } from '../components/LanguageToggle';
import { ChatWidget } from '../components/ChatWidget';
import { NotificationBell } from '../components/NotificationBell';
import './DashboardLayout.css';

export function DashboardLayout({ children }) {
  const location = useLocation();
  const notifications = useAppStore((state) => state.notifications);
  const businessProfile = useAppStore((state) => state.businessProfile);
  
  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/projects', icon: User, label: 'My Projects' },
    { path: '/checklist', icon: CheckSquare, label: 'Find Approvals' },
    { path: '/tracking', icon: FileText, label: 'My Applications' },
    { path: '/upload-documents', icon: FolderLock, label: 'Documents' },
    { path: '/applicant/inspections', icon: Search, label: 'Inspections' },
    { path: '/calendar', icon: CheckSquare, label: 'Compliance & Renewals' },
    { path: '/schemes', icon: ShieldAlert, label: 'Schemes & Incentives' },
    { path: '/helpdesk', icon: LifeBuoy, label: 'AI Helpdesk' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar tour-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <Settings size={28} color="var(--primary-700)" />
            <div className="brand-text">
              <span className="brand-title">Udyam<span style={{ color: 'var(--secondary-600)' }}>One</span></span>
              <span className="brand-subtitle">GOVT OF MAHARASHTRA</span>
            </div>
          </Link>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="sidebar-icon" size={20} />
                <span>{item.label}</span>
                {item.badge && <span className="sidebar-badge">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="topbar-search tour-search">
            <Search size={20} color="var(--text-muted)" />
            <input type="text" placeholder="Search approvals, schemes, etc." />
          </div>
          <div className="topbar-actions">
            <LanguageToggle />
            <NotificationBell count={unreadCount} notifications={notifications} />
            <div className="user-profile">
              <img 
                src={businessProfile.logoUrl}
                alt="Profile" 
                className="user-avatar"
              />
              <div className="user-info">
                <span className="user-name">{businessProfile.companyName}</span>
                <span className="user-org">Entrepreneur</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          {children}
          
          
          {/* Floating AI Chatbot */}
          <ChatWidget />
        </main>
      </div>
    </div>
  );
}
