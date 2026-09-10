import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, CheckSquare, MessageSquare, BarChart, Bell, Search, User } from 'lucide-react';
import { NotificationBell } from '../components/NotificationBell';
import './OfficerLayout.css';

export function OfficerLayout({ children }) {
  const location = useLocation();
  
  const navItems = [
    { name: 'Overview', path: '/officer/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Queries Raised', path: '/officer/queries', icon: <MessageSquare size={20} /> },
    { name: 'Reports', path: '/officer/reports', icon: <BarChart size={20} /> },
  ];

  return (
    <div className="officer-layout">
      {/* Sidebar */}
      <aside className="officer-sidebar">
        <div className="sidebar-brand">
          <div className="logo-placeholder" style={{ backgroundColor: 'white' }}>
             <img src="/logo.svg" alt="UdyamOne" style={{ width: '100%', height: '100%' }} />
          </div>
          <h2>Officer Portal</h2>
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
            <input type="text" placeholder="Search Application ID, Entrepreneur Name..." />
          </div>
          <div className="topbar-actions">
            <NotificationBell />
            <div className="user-profile">
              <img src="https://ui-avatars.com/api/?name=Officer+Sharma&background=16a34a&color=fff" alt="Profile" className="profile-img" />
              <span className="user-name">Officer Sharma</span>
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
