import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { ShieldAlert, TrendingUp, Filter, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { SUGGESTED_SCHEMES } from '../data/mockData';
import './ExploreSchemes.css';

export function ExploreSchemes() {
  return (
    <DashboardLayout>
      <div className="schemes-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Schemes & Incentives</h1>
            <p className="page-subtitle">Discover government subsidies and incentives tailored for your business.</p>
          </div>
          <Button variant="outline">
            <Filter size={18} style={{ marginRight: '6px' }} /> Filter Schemes
          </Button>
        </div>

        <div className="schemes-search-bar">
          <Search size={20} className="text-muted" />
          <input type="text" placeholder="Search by scheme name, sector, or keyword..." />
        </div>

        <div className="schemes-grid">
          {SUGGESTED_SCHEMES.map((scheme) => (
            <Card key={scheme.id} className="scheme-full-card">
              <CardContent className="scheme-full-content">
                <div className="sfc-header">
                  <div className="sfc-dept-badge">{scheme.department}</div>
                  <span className="sfc-match-badge">
                    <CheckCircle2 size={14} /> High Eligibility Match
                  </span>
                </div>
                
                <h3 className="sfc-title">{scheme.name}</h3>
                <p className="sfc-desc">{scheme.shortDesc}</p>

                <div className="sfc-highlights">
                  <div className="sfc-highlight-item">
                    <TrendingUp size={16} className="text-primary" />
                    <span><strong>Benefit:</strong> Up to ₹50 Lakhs Subsidy</span>
                  </div>
                  <div className="sfc-highlight-item">
                    <CheckCircle2 size={16} className="text-success" />
                    <span><strong>Eligibility:</strong> {scheme.eligibility}</span>
                  </div>
                </div>

                <div className="sfc-actions">
                  <Button variant="primary" style={{ width: '100%' }}>
                    Apply for Scheme <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                  </Button>
                  <Button variant="outline" style={{ width: '100%' }}>Read Guidelines</Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Additional Mock Scheme */}
          <Card className="scheme-full-card">
            <CardContent className="scheme-full-content">
              <div className="sfc-header">
                <div className="sfc-dept-badge">Ministry of MSME</div>
                <span className="sfc-match-badge" style={{ background: '#f8fafc', color: '#475569' }}>
                  Potential Match
                </span>
              </div>
              
              <h3 className="sfc-title">Zero Defect Zero Effect (ZED) Scheme</h3>
              <p className="sfc-desc">Financial assistance for MSMEs to adopt Zero Defect manufacturing processes and improve quality standards.</p>

              <div className="sfc-highlights">
                <div className="sfc-highlight-item">
                  <TrendingUp size={16} className="text-primary" />
                  <span><strong>Benefit:</strong> 80% Subsidy on Certification</span>
                </div>
                <div className="sfc-highlight-item">
                  <CheckCircle2 size={16} className="text-success" />
                  <span><strong>Eligibility:</strong> Registered MSME</span>
                </div>
              </div>

              <div className="sfc-actions">
                <Button variant="primary" style={{ width: '100%' }}>
                  Apply for Scheme <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                </Button>
                <Button variant="outline" style={{ width: '100%' }}>Read Guidelines</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
