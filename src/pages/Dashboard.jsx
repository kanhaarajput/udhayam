import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Plus, Building2, ChevronRight, Search, TrendingUp, Compass, CalendarCheck, Play } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../utils/translations';
import { OnboardingTour } from '../components/OnboardingTour';
import './Dashboard.css';

export function Dashboard() {
  const navigate = useNavigate();
  const language = useAppStore((state) => state.language);
  const t = translations[language] || translations.en;
  const [runTour, setRunTour] = useState(false);
  const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);

  useEffect(() => {
    if (!hasCompletedOnboarding) {
      navigate('/onboarding');
    }
  }, [hasCompletedOnboarding, navigate]);

  if (!hasCompletedOnboarding) {
    return null;
  }

  return (
    <DashboardLayout>
      <OnboardingTour run={runTour} onFinish={() => setRunTour(false)} />
      <div className="dashboard-page">
        
        {/* Header */}
        <div className="dashboard-page-header">
          <div>
            <h1 className="page-title">{t.welcome}, Aarav!</h1>
            <p className="page-subtitle">{t.subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <Button variant="outline" onClick={() => setRunTour(true)}><Play size={18} /> Start Tour</Button>
            <Button variant="primary" onClick={() => navigate('/submit-application')}><Plus size={18} /> {t.newProject}</Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <Card className="stat-card">
            <CardContent className="stat-content">
              <span className="stat-value text-primary">3</span>
              <span className="stat-label">{t.activeApps}</span>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <span className="stat-value text-success">1</span>
              <span className="stat-label">{t.approved}</span>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <span className="stat-value text-warning">2</span>
              <span className="stat-label">{t.underReview}</span>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <span className="stat-value text-error">0</span>
              <span className="stat-label">{t.pendingAction}</span>
            </CardContent>
          </Card>
        </div>

        {/* Current Project Card */}
        <Card className="current-project-card">
          <CardContent className="project-content">
            <div className="project-info">
              <div className="project-icon">
                <Building2 size={24} color="var(--accent-500)" />
              </div>
              <div>
                <span className="project-label">{t.currentProject}</span>
                <h3 className="project-name">Food Processing Unit - Pune</h3>
              </div>
            </div>
            <Button variant="ghost" className="btn-view-details">
              {t.viewDetails} <ChevronRight size={18} />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="quick-actions-grid tour-quick-actions">
          <Card className="action-card" onClick={() => navigate('/find-approvals')}>
            <CardContent className="action-content">
              <div className="action-icon bg-primary">
                <Search size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="action-title">{t.findApprovals}</h4>
                <p className="action-desc">{t.findApprovalsDesc}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="action-card" onClick={() => navigate('/tracking')}>
            <CardContent className="action-content">
              <div className="action-icon bg-secondary">
                <TrendingUp size={24} className="text-secondary" />
              </div>
              <div>
                <h4 className="action-title">{t.trackApps}</h4>
                <p className="action-desc">{t.trackAppsDesc}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="action-card" onClick={() => navigate('/schemes')}>
            <CardContent className="action-content">
              <div className="action-icon bg-warning">
                <Compass size={24} className="text-warning" />
              </div>
              <div>
                <h4 className="action-title">{t.exploreSchemes}</h4>
                <p className="action-desc">{t.exploreSchemesDesc}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="action-card" onClick={() => navigate('/calendar')}>
            <CardContent className="action-content">
              <div className="action-icon bg-error">
                <CalendarCheck size={24} className="text-error" />
              </div>
              <div>
                <h4 className="action-title">{t.compliance}</h4>
                <p className="action-desc">{t.complianceDesc}</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
