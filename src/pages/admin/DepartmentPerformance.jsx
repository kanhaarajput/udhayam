import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Card, CardContent } from '../../components/Card';
import { Building2, Users, FileText, Clock, BarChart2 } from 'lucide-react';
import './DepartmentPerformance.css';

const DEPT_PERF_DATA = [
  {
    name: 'Maharashtra Pollution Control Board (MPCB)',
    officers: 145,
    pending: 4250,
    avgTime: '12 Days',
    efficiency: '92%',
    trend: 'up'
  },
  {
    name: 'Food & Drug Administration (FDA)',
    officers: 85,
    pending: 2100,
    avgTime: '18 Days',
    efficiency: '78%',
    trend: 'down'
  },
  {
    name: 'Fire Department',
    officers: 210,
    pending: 3800,
    avgTime: '8 Days',
    efficiency: '96%',
    trend: 'up'
  },
  {
    name: 'Labor Department',
    officers: 120,
    pending: 1150,
    avgTime: '5 Days',
    efficiency: '98%',
    trend: 'up'
  }
];

export function DepartmentPerformance() {
  return (
    <AdminLayout>
      <div className="dept-perf-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Department Performance</h1>
            <p className="page-subtitle">Analyze workload and processing efficiency across all state departments.</p>
          </div>
        </div>

        <div className="dept-grid">
          {DEPT_PERF_DATA.map((dept, idx) => (
            <Card key={idx} className="dept-card">
              <CardContent className="dept-content">
                <div className="dept-header">
                  <div className="dept-icon">
                    <Building2 size={24} className="text-primary" />
                  </div>
                  <h3>{dept.name}</h3>
                </div>

                <div className="dept-metrics">
                  <div className="metric-box">
                    <div className="metric-icon"><Users size={16} /></div>
                    <div className="metric-data">
                      <span className="m-val">{dept.officers}</span>
                      <span className="m-lbl">Active Officers</span>
                    </div>
                  </div>
                  
                  <div className="metric-box">
                    <div className="metric-icon"><FileText size={16} /></div>
                    <div className="metric-data">
                      <span className="m-val">{dept.pending.toLocaleString()}</span>
                      <span className="m-lbl">Pending Apps</span>
                    </div>
                  </div>

                  <div className="metric-box">
                    <div className="metric-icon"><Clock size={16} /></div>
                    <div className="metric-data">
                      <span className="m-val">{dept.avgTime}</span>
                      <span className="m-lbl">Avg Processing</span>
                    </div>
                  </div>

                  <div className="metric-box">
                    <div className="metric-icon"><BarChart2 size={16} /></div>
                    <div className="metric-data">
                      <span className="m-val">{dept.efficiency}</span>
                      <span className="m-lbl">SLA Efficiency</span>
                    </div>
                  </div>
                </div>

                <div className="dept-footer">
                  <span className={`trend-badge ${dept.trend}`}>
                    {dept.trend === 'up' ? 'Performance Improving' : 'Performance Declining'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
