import React, { useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Card, CardContent } from '../../components/Card';
import { PieChart, TrendingUp, Users, Target, ArrowRight, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../../components/Button';
import './SchemeAnalytics.css';

const SCHEME_DATA = [
  {
    name: 'Zero Defect Zero Effect (ZED)',
    department: 'MSME',
    totalApplications: 4520,
    approved: 3100,
    fundsDisbursed: '₹14.2 Cr',
    utilization: 75
  },
  {
    name: 'Maharashtra Industrial Policy 2024 Subsidy',
    department: 'Industries Dept',
    totalApplications: 1250,
    approved: 420,
    fundsDisbursed: '₹8.5 Cr',
    utilization: 42
  },
  {
    name: 'Women Entrepreneurship Program',
    department: 'WCD',
    totalApplications: 890,
    approved: 750,
    fundsDisbursed: '₹2.1 Cr',
    utilization: 88
  }
];

export function SchemeAnalytics() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate generation time
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Policy report generated successfully!');
    }, 2000);
  };

  return (
    <AdminLayout>
      <div className="scheme-analytics-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Schemes & Policies Overview</h1>
            <p className="page-subtitle">Track the utilization and impact of government incentives.</p>
          </div>
          <Button variant="primary" onClick={handleGenerateReport} disabled={isGenerating}>
            {isGenerating ? <Loader2 size={16} className="spin-anim" style={{ marginRight: '6px' }} /> : null}
            {isGenerating ? 'Generating...' : 'Generate Policy Report'}
          </Button>
        </div>

        {/* Top KPI row */}
        <div className="sa-kpi-grid">
          <Card className="sa-kpi-card">
            <CardContent className="sa-kpi-content">
              <div className="sa-kpi-icon"><PieChart size={24} className="text-primary" /></div>
              <div className="sa-kpi-info">
                <span className="sa-kpi-val">12</span>
                <span className="sa-kpi-lbl">Active Schemes</span>
              </div>
            </CardContent>
          </Card>
          <Card className="sa-kpi-card">
            <CardContent className="sa-kpi-content">
              <div className="sa-kpi-icon"><Users size={24} className="text-success" /></div>
              <div className="sa-kpi-info">
                <span className="sa-kpi-val">14,250</span>
                <span className="sa-kpi-lbl">Beneficiaries YTD</span>
              </div>
            </CardContent>
          </Card>
          <Card className="sa-kpi-card">
            <CardContent className="sa-kpi-content">
              <div className="sa-kpi-icon"><TrendingUp size={24} className="text-warning" /></div>
              <div className="sa-kpi-info">
                <span className="sa-kpi-val">₹42.8 Cr</span>
                <span className="sa-kpi-lbl">Total Funds Disbursed</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scheme List */}
        <div className="sa-list">
          {SCHEME_DATA.map((scheme, idx) => (
            <Card key={idx} className="sa-scheme-card">
              <CardContent className="sa-scheme-content">
                <div className="sa-scheme-header">
                  <div className="sa-sh-title">
                    <Target size={20} className="text-primary" />
                    <div>
                      <h3>{scheme.name}</h3>
                      <span className="sa-dept">{scheme.department}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedScheme(scheme)}>
                    View Details <ArrowRight size={14} style={{ marginLeft: '4px' }}/>
                  </Button>
                </div>

                <div className="sa-scheme-metrics">
                  <div className="sa-metric">
                    <span className="sa-m-val">{scheme.totalApplications.toLocaleString()}</span>
                    <span className="sa-m-lbl">Applications</span>
                  </div>
                  <div className="sa-metric">
                    <span className="sa-m-val text-success">{scheme.approved.toLocaleString()}</span>
                    <span className="sa-m-lbl">Approved</span>
                  </div>
                  <div className="sa-metric">
                    <span className="sa-m-val text-primary">{scheme.fundsDisbursed}</span>
                    <span className="sa-m-lbl">Disbursed</span>
                  </div>
                  <div className="sa-metric utilization">
                    <div className="sa-m-header">
                      <span className="sa-m-lbl">Budget Utilization</span>
                      <span className="sa-m-pct font-semibold">{scheme.utilization}%</span>
                    </div>
                    <div className="sa-progress-bar">
                      <div className="sa-progress-fill" style={{ width: `${scheme.utilization}%`, background: scheme.utilization > 80 ? '#10b981' : (scheme.utilization < 50 ? '#f59e0b' : '#3b82f6') }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scheme Details Modal */}
        {selectedScheme && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedScheme.name}</h2>
                <button className="btn-icon" onClick={() => setSelectedScheme(null)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body" style={{ padding: '24px' }}>
                <p><strong>Department:</strong> {selectedScheme.department}</p>
                <p><strong>Total Applications:</strong> {selectedScheme.totalApplications.toLocaleString()}</p>
                <p><strong>Approved:</strong> {selectedScheme.approved.toLocaleString()}</p>
                <p><strong>Funds Disbursed:</strong> {selectedScheme.fundsDisbursed}</p>
                <p><strong>Budget Utilization:</strong> {selectedScheme.utilization}%</p>
                
                <div style={{ marginTop: '24px', background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#0f172a' }}>Recent Activity</h4>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                    <li>12 new applications received today.</li>
                    <li>Fund disbursement for 40 applicants approved.</li>
                    <li>Quarterly review completed by {selectedScheme.department}.</li>
                  </ul>
                </div>
              </div>
              <div className="modal-actions" style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => setSelectedScheme(null)}>Close</Button>
                <Button variant="primary">Download Data</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
