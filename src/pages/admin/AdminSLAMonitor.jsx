import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Card, CardContent } from '../../components/Card';
import { Clock, ShieldCheck, AlertTriangle, XCircle } from 'lucide-react';
import './AdminSLAMonitor.css';

export function AdminSLAMonitor() {
  return (
    <AdminLayout>
      <div className="admin-sla-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">SLA Compliance Monitor</h1>
            <p className="page-subtitle">Statewide overview of Service Level Agreement adherence.</p>
          </div>
        </div>

        {/* Top Level Breakdown */}
        <div className="sla-breakdown-grid">
          <Card className="sla-bd-card safe">
            <CardContent className="sla-bd-content">
              <ShieldCheck size={32} className="text-success" />
              <div className="sla-bd-text">
                <h2>14,230</h2>
                <span>Within SLA</span>
              </div>
              <div className="sla-bd-pct">82%</div>
            </CardContent>
          </Card>
          
          <Card className="sla-bd-card risk">
            <CardContent className="sla-bd-content">
              <AlertTriangle size={32} className="text-warning" />
              <div className="sla-bd-text">
                <h2>2,450</h2>
                <span>At Risk (≤ 5 Days)</span>
              </div>
              <div className="sla-bd-pct">14%</div>
            </CardContent>
          </Card>
          
          <Card className="sla-bd-card breached">
            <CardContent className="sla-bd-content">
              <XCircle size={32} className="text-danger" />
              <div className="sla-bd-text">
                <h2>680</h2>
                <span>SLA Breached</span>
              </div>
              <div className="sla-bd-pct">4%</div>
            </CardContent>
          </Card>
        </div>

        {/* Department Breakdown */}
        <Card className="sla-dept-card">
          <CardContent className="sla-dept-content">
            <h3>Departmental SLA Adherence</h3>
            <table className="sla-dept-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Total Active</th>
                  <th>Within SLA</th>
                  <th>At Risk</th>
                  <th>Breached</th>
                  <th>Compliance Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">MPCB</td>
                  <td>4,250</td>
                  <td className="text-success">3,800</td>
                  <td className="text-warning">350</td>
                  <td className="text-danger">100</td>
                  <td>
                    <div className="progress-cell">
                      <span className="font-semibold">89.4%</span>
                      <div className="progress-bar"><div className="progress-fill" style={{width: '89.4%', background: '#10b981'}}></div></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">FDA</td>
                  <td>2,100</td>
                  <td className="text-success">1,400</td>
                  <td className="text-warning">400</td>
                  <td className="text-danger">300</td>
                  <td>
                    <div className="progress-cell">
                      <span className="font-semibold">66.6%</span>
                      <div className="progress-bar"><div className="progress-fill" style={{width: '66.6%', background: '#f59e0b'}}></div></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Fire Department</td>
                  <td>3,800</td>
                  <td className="text-success">3,500</td>
                  <td className="text-warning">200</td>
                  <td className="text-danger">100</td>
                  <td>
                    <div className="progress-cell">
                      <span className="font-semibold">92.1%</span>
                      <div className="progress-bar"><div className="progress-fill" style={{width: '92.1%', background: '#10b981'}}></div></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
