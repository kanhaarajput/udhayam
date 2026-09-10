import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Search, Filter, FileText, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './ApplicationTracking.css';

export function ApplicationTracking() {
  const navigate = useNavigate();
  const applications = useAppStore((state) => state.applications);

  return (
    <DashboardLayout>
      <div className="tracking-page">
        <div className="page-header tracking-header">
          <div>
            <h1 className="page-title">Track Applications</h1>
            <p className="page-subtitle">Monitor the status of your submitted applications</p>
          </div>
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search by App ID or Name..." className="search-input" />
          </div>
        </div>

        <Card className="tracking-card">
          <table className="tracking-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Approval Name</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={idx}>
                  <td className="font-medium">{app.id}</td>
                  <td>
                    <div className="font-medium">{app.type}</div>
                  </td>
                  <td>{app.date}</td>
                  <td><Badge variant={app.variant}>{app.status}</Badge></td>
                  <td>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/tracking/details/${app.id}`)}>View Details</Button>
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
