import React from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { Card, CardContent } from '../components/Card';
import { 
  BarChart3, Clock, AlertTriangle, TrendingDown, TrendingUp, CheckCircle2, Shield
} from 'lucide-react';
import './Analytics.css';

// Hardcoded Data
const DEPARTMENTS = [
  { name: 'FSSAI (Food Safety)', avgTime: 12, target: 15, applications: 1240 },
  { name: 'MPCB (Pollution)', avgTime: 28, target: 21, applications: 856 },
  { name: 'Fire Department', avgTime: 45, target: 30, applications: 432 },
  { name: 'Labour Dept', avgTime: 8, target: 14, applications: 2100 },
  { name: 'MIDC', avgTime: 18, target: 21, applications: 654 }
];

const BOTTLENECKS = [
  { step: 'Document Verification', dept: 'Fire Department', impact: 'High', delay: '+15 days', status: 'critical' },
  { step: 'Site Inspection', dept: 'MPCB (Pollution)', impact: 'High', delay: '+7 days', status: 'critical' },
  { step: 'Payment Confirmation', dept: 'Cross-Department', impact: 'Medium', delay: '+2 days', status: 'warning' },
  { step: 'Final Signature', dept: 'FSSAI (Food Safety)', impact: 'Low', delay: '+1 day', status: 'stable' },
];

export function Analytics() {
  const maxTime = Math.max(...DEPARTMENTS.map(d => Math.max(d.avgTime, d.target)));

  return (
    <AdminLayout>
      <div className="analytics-page">
        {/* Header */}
        <div className="analytics-header">
          <div>
            <h1 className="page-title">MSInS Analytics Dashboard</h1>
            <p className="page-subtitle">Real-time view of state-wide compliance performance and bottlenecks.</p>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="admin-stats-row">
          <Card className="admin-stat-card">
            <CardContent className="admin-stat-content">
              <div className="admin-stat-header">
                <span className="admin-stat-label">Total Applications (YTD)</span>
                <BarChart3 size={18} className="text-primary" />
              </div>
              <span className="admin-stat-value">5,282</span>
              <span className="admin-stat-trend positive"><TrendingUp size={14}/> +14% vs last quarter</span>
            </CardContent>
          </Card>
          <Card className="admin-stat-card">
            <CardContent className="admin-stat-content">
              <div className="admin-stat-header">
                <span className="admin-stat-label">Avg. Clearance Time</span>
                <Clock size={18} className="text-warning" />
              </div>
              <span className="admin-stat-value">22.4 Days</span>
              <span className="admin-stat-trend negative"><TrendingUp size={14}/> +3.2 days vs SLA target</span>
            </CardContent>
          </Card>
          <Card className="admin-stat-card">
            <CardContent className="admin-stat-content">
              <div className="admin-stat-header">
                <span className="admin-stat-label">SLA Compliance Rate</span>
                <CheckCircle2 size={18} className="text-success" />
              </div>
              <span className="admin-stat-value">78%</span>
              <span className="admin-stat-trend negative"><TrendingDown size={14}/> -4% vs SLA target</span>
            </CardContent>
          </Card>
        </div>

        <div className="analytics-grid">
          {/* Chart: Avg Approval Time per Dept */}
          <Card className="analytics-chart-card">
            <div className="chart-header">
              <h3>Average Approval Time by Department</h3>
              <span className="chart-legend">
                <span className="legend-item"><span className="legend-box actual"></span> Actual Time</span>
                <span className="legend-item"><span className="legend-box target"></span> Target SLA</span>
              </span>
            </div>
            <CardContent className="chart-content">
              <div className="bar-chart-horizontal">
                {DEPARTMENTS.map((dept, idx) => {
                  const isBreaching = dept.avgTime > dept.target;
                  return (
                    <div key={idx} className="bar-row">
                      <div className="bar-label">{dept.name}</div>
                      <div className="bar-tracks">
                        {/* Actual Bar */}
                        <div className="track-group">
                          <div 
                            className={`bar-fill-actual ${isBreaching ? 'breaching' : ''}`}
                            style={{ width: `${(dept.avgTime / maxTime) * 100}%` }}
                          >
                            <span>{dept.avgTime}d</span>
                          </div>
                        </div>
                        {/* Target Bar */}
                        <div className="track-group target-group">
                          <div 
                            className="bar-fill-target"
                            style={{ width: `${(dept.target / maxTime) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bottlenecks Table */}
          <Card className="bottlenecks-card">
            <div className="chart-header">
              <h3><AlertTriangle size={18} style={{ marginRight: '8px', color: '#ef4444' }}/> System Bottlenecks</h3>
            </div>
            <div className="bottlenecks-table">
              <div className="bt-header">
                <span>Process Step</span>
                <span>Department</span>
                <span>Avg Delay</span>
                <span>Impact</span>
              </div>
              {BOTTLENECKS.map((bn, idx) => (
                <div key={idx} className={`bt-row status-${bn.status}`}>
                  <span className="bt-step">{bn.step}</span>
                  <span className="bt-dept">{bn.dept}</span>
                  <span className="bt-delay">{bn.delay}</span>
                  <span className="bt-impact">
                    <span className="impact-badge">{bn.impact}</span>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
