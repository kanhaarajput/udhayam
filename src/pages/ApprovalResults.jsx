import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Download } from 'lucide-react';
import './ApprovalResults.css';

export function ApprovalResults() {
  const navigate = useNavigate();
  const approvals = [
    { name: 'Factory Approval', dept: 'Labour Department', status: 'Required', variant: 'error' },
    { name: 'Pollution Consent', dept: 'MPCB', status: 'Required', variant: 'error' },
    { name: 'Fire NOC', dept: 'Fire Department', status: 'Required', variant: 'error' },
    { name: 'Building Permission', dept: 'Municipal Corporation', status: 'Required', variant: 'error' },
    { name: 'Electricity Connection', dept: 'MSEDCL', status: 'Required', variant: 'error' },
    { name: 'Boiler Registration', dept: 'Boiler Department', status: 'Conditional', variant: 'warning' },
    { name: 'Trade Licence', dept: 'Local Body', status: 'Required', variant: 'error' },
    { name: 'Food Safety Licence', dept: 'FSSAI', status: 'Required', variant: 'error' },
  ];

  return (
    <DashboardLayout>
      <div className="results-page">
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 className="page-title">Applicable Approvals</h1>
            <p className="page-subtitle">Based on your business profile, we have identified 8 approvals</p>
          </div>
          <Button variant="primary"><Download size={18} /> Download Checklist</Button>
        </div>

        <Card className="results-card">
          <table className="results-table">
            <thead>
              <tr>
                <th>Approval</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((app, idx) => (
                <tr key={idx}>
                  <td className="font-medium">{app.name}</td>
                  <td className="text-muted">{app.dept}</td>
                  <td><Badge variant={app.variant}>{app.status}</Badge></td>
                  <td>
                    {app.status === 'Conditional' 
                      ? <Button variant="ghost" size="sm">View</Button>
                      : <Button variant="primary" size="sm" onClick={() => navigate('/upload-documents')}>Apply</Button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
