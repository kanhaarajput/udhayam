import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { BusinessProfile } from './pages/BusinessProfile';
import { FindApprovals } from './pages/FindApprovals';
import { ApprovalResults } from './pages/ApprovalResults';
import { DocumentUpload } from './pages/DocumentUpload';
import { DocumentValidation } from './pages/DocumentValidation';
import { SubmitApplication } from './pages/SubmitApplication';
import { ApplicationTracking } from './pages/ApplicationTracking';
import { ApplicationDetails } from './pages/ApplicationDetails';
import { CertificateViewer } from './pages/CertificateViewer';
import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { ApplicationReview } from './pages/officer/ApplicationReview';
import { DocumentVerification } from './pages/officer/DocumentVerification';
import { OfficerReports } from './pages/officer/OfficerReports';
import { OfficerQueries } from './pages/officer/OfficerQueries';
import { ExploreSchemes } from './pages/ExploreSchemes';
import { ComplianceCalendar } from './pages/ComplianceCalendar';
import { UserSettings } from './pages/UserSettings';
import { PaymentGateway } from './pages/PaymentGateway';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { Helpdesk } from './pages/Helpdesk';
import { DocumentVault } from './pages/DocumentVault';
import { Integrations } from './pages/Integrations';
import { ApiStatus } from './pages/ApiStatus';
import { Onboarding } from './pages/Onboarding';
import { TeamManagement } from './pages/TeamManagement';
import { AuditLogs } from './pages/AuditLogs';
import { Analytics } from './pages/Analytics';
import { DeveloperAPI } from './pages/DeveloperAPI';
import { MessageCenter } from './pages/MessageCenter';
import { Automations } from './pages/Automations';
import { Referrals } from './pages/Referrals';
import { CommandPalette } from './components/CommandPalette';
import { AIAssistant } from './components/AIAssistant';
import { Toaster } from 'react-hot-toast';
import { useAppStore } from './store/useAppStore';
import { useEffect } from 'react';

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
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<BusinessProfile />} />
        <Route path="/find-approvals" element={<FindApprovals />} />
        <Route path="/approvals/results" element={<ApprovalResults />} />
        <Route path="/upload-documents" element={<DocumentUpload />} />
        <Route path="/document-validation" element={<DocumentValidation />} />
        <Route path="/submit-application" element={<SubmitApplication />} />
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/tracking" element={<ApplicationTracking />} />
        <Route path="/tracking/details/:id" element={<ApplicationDetails />} />
        <Route path="/certificate/:id" element={<CertificateViewer />} />
        <Route path="/officer/dashboard" element={<OfficerDashboard />} />
        <Route path="/officer/review" element={<ApplicationReview />} />
        <Route path="/officer/verify" element={<DocumentVerification />} />
        <Route path="/officer/reports" element={<OfficerReports />} />
        <Route path="/officer/queries" element={<OfficerQueries />} />
        <Route path="/schemes" element={<ExploreSchemes />} />
        <Route path="/calendar" element={<ComplianceCalendar />} />
        <Route path="/vault" element={<DocumentVault />} />
        <Route path="/helpdesk" element={<Helpdesk />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/status" element={<ApiStatus />} />
        <Route path="/team" element={<TeamManagement />} />
        <Route path="/audit" element={<AuditLogs />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/developer" element={<DeveloperAPI />} />
        <Route path="/messages" element={<MessageCenter />} />
        <Route path="/automations" element={<Automations />} />
        <Route path="/referrals" element={<Referrals />} />
      </Routes>
    </Router>
  );
}

export default App;
