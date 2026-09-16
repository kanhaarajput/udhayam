import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Checklist } from './pages/Checklist';
import { DocumentUpload } from './pages/DocumentUpload';
import { Helpdesk } from './pages/Helpdesk';
// Official Pages
import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { ApplicationReview } from './pages/officer/ApplicationReview';
import { OfficialInspections } from './pages/officer/OfficialInspections';
import { SLAMonitor } from './pages/officer/SLAMonitor';
import { RiskReview } from './pages/officer/RiskReview';
import { OfficialQueries } from './pages/officer/OfficialQueries';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Bottlenecks } from './pages/admin/Bottlenecks';
import { AdminSLAMonitor } from './pages/admin/AdminSLAMonitor';
import { DepartmentPerformance } from './pages/admin/DepartmentPerformance';
import { ComplianceAnalytics } from './pages/admin/ComplianceAnalytics';
import { SchemeAnalytics } from './pages/admin/SchemeAnalytics';
import { Analytics } from './pages/Analytics';
import { SystemStatus } from './pages/admin/SystemStatus';
import { UserManagement } from './pages/admin/UserManagement';

// New Applicant Pages
import { MyProjects } from './pages/MyProjects';
import { ApplicationTracking } from './pages/ApplicationTracking';
import { ApplicantInspections } from './pages/ApplicantInspections';
import { ComplianceCalendar } from './pages/ComplianceCalendar';
import { ExploreSchemes } from './pages/ExploreSchemes';

import { CommandPalette } from './components/CommandPalette';
import { AIAssistant } from './components/AIAssistant';
import { Toaster } from 'react-hot-toast';
import { useAppStore } from './store/useAppStore';

function App() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: 'var(--surface-color)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)'
        }
      }} />
      <CommandPalette />
      <AIAssistant />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Applicant Dashboard Expansion Routes */}
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/tracking" element={<ApplicationTracking />} />
        <Route path="/upload-documents" element={<DocumentUpload />} />
        <Route path="/applicant/inspections" element={<ApplicantInspections />} />
        <Route path="/calendar" element={<ComplianceCalendar />} />
        <Route path="/schemes" element={<ExploreSchemes />} />
        <Route path="/helpdesk" element={<Helpdesk />} />

        {/* Official Routes */}
        <Route path="/officer/dashboard" element={<OfficerDashboard />} />
        <Route path="/officer/review" element={<ApplicationReview />} />
        <Route path="/officer/inspections" element={<OfficialInspections />} />
        <Route path="/officer/sla" element={<SLAMonitor />} />
        <Route path="/officer/risk" element={<RiskReview />} />
        <Route path="/officer/queries" element={<OfficialQueries />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bottlenecks" element={<Bottlenecks />} />
        <Route path="/admin/sla" element={<AdminSLAMonitor />} />
        <Route path="/admin/departments" element={<DepartmentPerformance />} />
        <Route path="/admin/compliance" element={<ComplianceAnalytics />} />
        <Route path="/admin/schemes" element={<SchemeAnalytics />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/system-status" element={<SystemStatus />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
