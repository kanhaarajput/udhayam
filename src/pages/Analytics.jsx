import React from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { Card, CardContent } from '../components/Card';
import { 
  BarChart3, Clock, AlertTriangle, TrendingDown, TrendingUp, CheckCircle2,
} from 'lucide-react';
import { ANALYTICS_DATA } from '../data/mockData';
import './Analytics.css';

export function Analytics() {
  const maxTime = Math.max(...ANALYTICS_DATA.approvalTimes.map(d => Math.max(d.avgDays, d.target)));
  
  // Find max monthly application value for scaling the simple CSS bar chart
  const maxMonthly = Math.max(...ANALYTICS_DATA.monthlyApplications.flatMap(m => [m.received, m.processed]));

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
          {/* Chart: Monthly Applications */}
          <Card className="analytics-chart-card">
            <div className="chart-header">
              <h3>Monthly Applications Volume</h3>
              <span className="chart-legend">
                <span className="legend-item"><span className="legend-box" style={{ background: '#94a3b8' }}></span> Received</span>
                <span className="legend-item"><span className="legend-box" style={{ background: '#0ea5e9' }}></span> Processed</span>
              </span>
            </div>
            <CardContent className="chart-content" style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '200px', paddingTop: '40px' }}>
              {ANALYTICS_DATA.monthlyApplications.map((data, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '100%', width: '100%', justifyContent: 'center' }}>
                    <div style={{ width: '40%', height: `${(data.received / maxMonthly) * 100}%`, background: '#94a3b8', borderRadius: '4px 4px 0 0', position: 'relative' }} title={`Received: ${data.received}`}></div>
                    <div style={{ width: '40%', height: `${(data.processed / maxMonthly) * 100}%`, background: '#0ea5e9', borderRadius: '4px 4px 0 0', position: 'relative' }} title={`Processed: ${data.processed}`}></div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>{data.month}</span>
                </div>
              ))}
            </CardContent>
          </Card>

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
                {ANALYTICS_DATA.approvalTimes.map((dept, idx) => {
                  const isBreaching = dept.avgDays > dept.target;
                  return (
                    <div key={idx} className="bar-row">
                      <div className="bar-label">{dept.department}</div>
                      <div className="bar-tracks">
                        {/* Actual Bar */}
                        <div className="track-group">
                          <div 
                            className={`bar-fill-actual ${isBreaching ? 'breaching' : ''}`}
                            style={{ width: `${(dept.avgDays / maxTime) * 100}%` }}
                          >
                            <span>{dept.avgDays}d</span>
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
          <Card className="bottlenecks-card" style={{ gridColumn: '1 / -1' }}>
            <div className="chart-header">
              <h3><AlertTriangle size={18} style={{ marginRight: '8px', color: '#ef4444' }}/> System Bottlenecks</h3>
            </div>
            <div className="bottlenecks-table">
              <div className="bt-header">
                <span>Department</span>
                <span>Pending Approvals</span>
                <span>Overdue Approvals</span>
                <span>Avg Delay</span>
              </div>
              {ANALYTICS_DATA.bottlenecks.map((bn, idx) => (
                <div key={idx} className={`bt-row status-${bn.avgDelay > 10 ? 'critical' : bn.avgDelay > 5 ? 'warning' : 'stable'}`}>
                  <span className="bt-step">{bn.department}</span>
                  <span className="bt-dept">{bn.pending} pending</span>
                  <span className="bt-delay" style={{ color: bn.overdue > 0 ? '#ef4444' : 'inherit' }}>{bn.overdue} overdue</span>
                  <span className="bt-impact">
                    <span className="impact-badge">+{bn.avgDelay} days</span>
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
