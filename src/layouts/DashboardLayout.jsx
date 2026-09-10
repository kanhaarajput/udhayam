import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Settings, LayoutDashboard, User, Folder, Search, CheckSquare, 
  FileText, ClipboardCheck, ShieldAlert, FileSignature, AlertCircle, LifeBuoy, FolderLock, Sun, Moon, Blocks, Activity, Users, Shield, BarChart3, Terminal, Mail, Zap, Gift
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { LanguageToggle } from '../components/LanguageToggle';
import { ChatWidget } from '../components/ChatWidget';
import { ThemeToggle } from '../components/ThemeToggle';
import { NotificationBell } from '../components/NotificationBell';
import './DashboardLayout.css';

export function DashboardLayout({ children }) {
  const location = useLocation();
  const applications = useAppStore((state) => state.applications);
  const notifications = useAppStore((state) => state.notifications);
  const businessProfile = useAppStore((state) => state.businessProfile);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'My Profile' },
    { path: '/vault', icon: FolderLock, label: 'Document Vault' },
    { path: '/find-approvals', icon: Search, label: 'Find Approvals' },
    { path: '/tracking', icon: FileText, label: 'My Applications' },
    { path: '/calendar', icon: CheckSquare, label: 'Compliance' },
    { path: '/schemes', icon: ShieldAlert, label: 'Schemes & Incentives' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics & Reports' },
    { path: '/team', icon: Users, label: 'Team & Access' },
    { path: '/audit', icon: Shield, label: 'Audit Logs' },
    { path: '/automations', icon: Zap, label: 'Automations' },
    { path: '/developer', icon: Terminal, label: 'Developer API' },
    { path: '/messages', icon: Mail, label: 'Messages', badge: 3 },
    { path: '/referrals', icon: Gift, label: 'Refer & Earn' },
    { path: '/integrations', icon: Blocks, label: 'Integrations' },
    { path: '/status', icon: Activity, label: 'System Status' },
    { path: '/helpdesk', icon: LifeBuoy, label: 'Help & Support' },
    { path: '/settings', icon: Settings, label: 'Settings' },
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
                onClick={() => setSidebarOpen(false)}
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
          <div className="header-actions">
            <LanguageToggle />
            <ThemeToggle />
            <NotificationBell count={unreadCount} notifications={notifications} />
            <div className="user-profile">
              <img 
                src={businessProfile.logoUrl}
                alt="Profile" 
                className="profile-img"
              />
              <div className="profile-info">
                <span className="profile-name">{businessProfile.companyName}</span>
                <span className="profile-role">Entrepreneur</span>
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
