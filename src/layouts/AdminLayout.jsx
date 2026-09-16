import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Settings, Shield, Bell, Search, Activity, Users, LayoutDashboard, Clock, Building2, ShieldAlert, PieChart } from 'lucide-react';
import { NotificationBell } from '../components/NotificationBell';
import './OfficerLayout.css'; // Reusing officer layout CSS for the sidebar

export function AdminLayout({ children }) {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard Overview', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Bottleneck Monitor', path: '/admin/bottlenecks', icon: <Activity size={20} /> },
    { name: 'SLA Monitoring', path: '/admin/sla', icon: <Clock size={20} /> },
    { name: 'Department Perf.', path: '/admin/departments', icon: <Building2 size={20} /> },
    { name: 'Compliance', path: '/admin/compliance', icon: <ShieldAlert size={20} /> },
    { name: 'Schemes & Policies', path: '/admin/schemes', icon: <PieChart size={20} /> },
    { name: 'User Management', path: '/users', icon: <Users size={20} /> },
  ];

  return (
    <div className="officer-layout">
      {/* Sidebar */}
      <aside className="officer-sidebar">
        <div className="sidebar-brand">
          <Shield size={28} style={{ color: '#8b5cf6' }} />
          <h2>MSInS Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="officer-main">
        {/* Topbar */}
        <header className="officer-topbar">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Search departments, metrics..." />
          </div>
          <div className="topbar-actions">
            <NotificationBell />
            <div className="user-profile">
              <img src="https://ui-avatars.com/api/?name=Admin&background=8b5cf6&color=fff" alt="Profile" className="profile-img" />
              <span className="user-name">System Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="content-area">
          {children}
        </div>
      </main>
    </div>
  );
}
