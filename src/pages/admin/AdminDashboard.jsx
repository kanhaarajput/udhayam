import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Card, CardContent } from '../../components/Card';
import { FileText, CheckCircle2, Clock, XCircle, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './AdminDashboard.css';

export function AdminDashboard() {
  const stats = [
    { label: 'Total Applications', value: '24,592', change: '+12%', icon: FileText, color: '#3b82f6', bg: '#eff6ff', up: true },
    { label: 'Approved', value: '18,245', change: '+18%', icon: CheckCircle2, color: '#10b981', bg: '#ecfdf5', up: true },
    { label: 'Pending Processing', value: '5,892', change: '-4%', icon: Clock, color: '#f59e0b', bg: '#fffbeb', up: false },
    { label: 'Overdue (SLA Breached)', value: '455', change: '-12%', icon: XCircle, color: '#ef4444', bg: '#fef2f2', up: false },
  ];

  const kpis = [
    { label: 'SLA Compliance Rate', value: '94.2%', target: '> 95%', status: 'warning' },
    { label: 'Average Processing Time', value: '12.4 Days', target: '< 15 Days', status: 'good' },
    { label: 'Auto-Approval Rate', value: '28.5%', target: '> 25%', status: 'good' },
  ];

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">System Overview</h1>
            <p className="page-subtitle">Real-time macro metrics across all departments.</p>
          </div>
          <div className="last-updated">Last updated: Just now</div>
        </div>

        {/* High Level Stats */}
        <div className="admin-stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="admin-stat-card">
                <CardContent className="admin-stat-content">
                  <div className="stat-icon-wrapper" style={{ background: stat.bg, color: stat.color }}>
                    <Icon size={24} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">{stat.label}</span>
                    <div className="stat-val-row">
                      <span className="stat-value">{stat.value}</span>
                      <span className={`stat-change ${stat.up ? 'positive' : 'negative'}`}>
                        {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* KPIs */}
        <div className="kpi-section">
          <h3>Key Performance Indicators</h3>
          <div className="kpi-grid">
            {kpis.map((kpi, idx) => (
              <div key={idx} className={`kpi-card ${kpi.status}`}>
                <div className="kpi-val">{kpi.value}</div>
                <div className="kpi-label">{kpi.label}</div>
                <div className="kpi-target">Target: {kpi.target}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights placeholder */}
        <div className="insights-section">
          <Card>
            <CardContent>
              <div className="insight-header">
                <Activity size={20} className="text-primary" />
                <h3>System Insights</h3>
              </div>
              <ul className="insight-list">
                <li><strong>MPCB</strong> has seen a 15% spike in new applications this week.</li>
                <li><strong>Fire Department</strong> processing time has improved by 2 days on average.</li>
                <li><strong>FDA</strong> is currently holding 40% of all overdue applications.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
    </AdminLayout>
  );
}
