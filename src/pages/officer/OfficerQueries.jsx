import React from 'react';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';

export function OfficerQueries() {
  const queries = [
    {
      id: 'Q-901',
      appId: 'APP-2023-8901',
      ent: 'ABC Foods Pvt. Ltd.',
      issue: 'Site plan uploaded is blurry and unreadable.',
      date: 'Oct 26, 2023',
      status: 'Response Received',
      variant: 'success'
    },
    {
      id: 'Q-880',
      appId: 'APP-2023-8890',
      ent: 'TechNova Innovations',
      issue: 'Missing signature on Director declaration form.',
      date: 'Oct 25, 2023',
      status: 'Waiting on Entrepreneur',
      variant: 'warning'
    },
    {
      id: 'Q-855',
      appId: 'APP-2023-8855',
      ent: 'Sunrise Textiles',
      issue: 'Address on PAN does not match lease agreement.',
      date: 'Oct 20, 2023',
      status: 'Resolved',
      variant: 'primary'
    }
  ];

  return (
    <OfficerLayout>
      <div className="queries-page">
        <div className="page-header" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <h1 className="page-title">Queries Raised</h1>
          <p className="page-subtitle">Manage communication and clarifications with entrepreneurs</p>
        </div>

        <Card>
          <table className="officer-table">
            <thead>
              <tr>
                <th>Query ID</th>
                <th>App Ref & Entrepreneur</th>
                <th>Issue Description</th>
                <th>Raised On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((q, idx) => (
                <tr key={idx}>
                  <td className="font-medium">{q.id}</td>
                  <td>
                    <div className="font-medium">{q.appId}</div>
                    <div className="text-muted" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{q.ent}</div>
                  </td>
                  <td style={{ maxWidth: '300px' }}>{q.issue}</td>
                  <td>{q.date}</td>
                  <td><Badge variant={q.variant}>{q.status}</Badge></td>
                  <td>
                    <Button variant={q.status === 'Response Received' ? 'primary' : 'ghost'} size="sm">
                      {q.status === 'Response Received' ? 'Review Response' : 'View Details'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </OfficerLayout>
  );
}
