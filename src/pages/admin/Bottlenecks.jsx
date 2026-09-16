import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Card, CardContent } from '../../components/Card';
import { AlertOctagon, TrendingDown, Clock, Building2 } from 'lucide-react';
import './Bottlenecks.css';

const BOTTLENECK_DATA = [
  { department: 'FDA', avgDelay: '14 Days', pending: 1245, status: 'Critical' },
  { department: 'Fire Department', avgDelay: '8 Days', pending: 890, status: 'Warning' },
  { department: 'MPCB', avgDelay: '3 Days', pending: 450, status: 'Normal' },
  { department: 'Labor Dept', avgDelay: '2 Days', pending: 210, status: 'Normal' },
];

const STAGE_DELAYS = [
  { stage: 'Document Verification', avgTime: '4.5 Days', target: '2 Days', impact: 'High' },
  { stage: 'Site Inspection', avgTime: '7.2 Days', target: '5 Days', impact: 'Critical' },
  { stage: 'Final Officer Approval', avgTime: '3.1 Days', target: '3 Days', impact: 'Low' },
];

export function Bottlenecks() {
  return (
    <AdminLayout>
      <div className="bottlenecks-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Bottleneck Monitor</h1>
            <p className="page-subtitle">Identify workflow delays and departmental blockages across the system.</p>
          </div>
        </div>

        {/* Department Delays */}
        <div className="bn-section">
          <h3>Department-wise Delays</h3>
          <div className="bn-grid">
            {BOTTLENECK_DATA.map((dept, idx) => (
              <Card key={idx} className={`bn-card ${dept.status.toLowerCase()}`}>
                <CardContent className="bn-content">
                  <div className="bn-header">
                    <div className="bn-dept-info">
                      <Building2 size={16} />
                      <h4>{dept.department}</h4>
                    </div>
                    <span className="bn-status-badge">{dept.status}</span>
                  </div>
                  
                  <div className="bn-stats">
                    <div className="bn-stat-item">
                      <span className="bn-val text-danger">{dept.avgDelay}</span>
                      <span className="bn-lbl">Avg. Delay</span>
                    </div>
                    <div className="bn-stat-item">
                      <span className="bn-val">{dept.pending}</span>
                      <span className="bn-lbl">Delayed Apps</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stage Delays */}
        <div className="bn-section">
          <h3>Process Stage Delays (Statewide Average)</h3>
          <Card>
            <CardContent className="bn-table-content">
              <table className="bn-table">
                <thead>
                  <tr>
                    <th>Process Stage</th>
                    <th>Average Time Taken</th>
                    <th>Target SLA</th>
                    <th>Impact Level</th>
                  </tr>
                </thead>
                <tbody>
                  {STAGE_DELAYS.map((stage, idx) => (
                    <tr key={idx}>
                      <td className="font-semibold">{stage.stage}</td>
                      <td className="text-danger font-semibold">{stage.avgTime}</td>
                      <td className="text-muted">{stage.target}</td>
                      <td>
                        <span className={`impact-badge ${stage.impact.toLowerCase()}`}>
                          {stage.impact === 'Critical' && <AlertOctagon size={12} />}
                          {stage.impact === 'High' && <TrendingDown size={12} />}
                          {stage.impact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

      </div>
    </AdminLayout>
  );
}
