import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { 
  Settings as SettingsIcon, Shield, Bell, CreditCard, 
  Smartphone, Monitor, Globe, LogOut, CheckCircle2, AlertTriangle,
  Wallet, Receipt, Download, Plus, MoreHorizontal
} from 'lucide-react';
import toast from 'react-hot-toast';
import './UserSettings.css';

// Mock Invoice Data
const MOCK_INVOICES = [
  { id: 'INV-2023-089', date: 'Oct 24, 2023', description: 'UdyamOne Enterprise Plan (Annual)', amount: '₹14,999', status: 'Paid' },
  { id: 'INV-2023-042', date: 'Sep 12, 2023', description: 'Trade License Renewal Fee', amount: '₹5,000', status: 'Paid' },
  { id: 'INV-2023-018', date: 'Aug 05, 2023', description: 'Fire NOC Application Fee', amount: '₹2,500', status: 'Paid' }
];

export function UserSettings() {
  const [activeTab, setActiveTab] = useState('security');
  
  const userSettings = useAppStore(state => state.userSettings);
  const toggleMFA = useAppStore(state => state.toggleMFA);
  const activeSessions = useAppStore(state => state.activeSessions);
  const revokeSession = useAppStore(state => state.revokeSession);
  const updateNotificationPreferences = useAppStore(state => state.updateNotificationPreferences);

  const [isTogglingMFA, setIsTogglingMFA] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'pm-1', type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true }
  ]);

  const handleMFAToggle = () => {
    setIsTogglingMFA(true);
    // Simulate API call for security action
    setTimeout(() => {
      toggleMFA(!userSettings.mfaEnabled);
      setIsTogglingMFA(false);
      if (!userSettings.mfaEnabled) {
        toast.success('Two-Factor Authentication Enabled!');
      } else {
        toast.error('Two-Factor Authentication Disabled');
      }
    }, 1000);
  };

  const handleRevokeSession = (id) => {
    revokeSession(id);
    toast.success('Session revoked successfully.');
  };

  const handleNotificationToggle = (category, type, currentValue) => {
    updateNotificationPreferences(category, type, !currentValue);
  };

  const handleAddCard = () => {
    setIsAddingCard(true);
    setTimeout(() => {
      setPaymentMethods([
        ...paymentMethods,
        { id: `pm-${Date.now()}`, type: 'Mastercard', last4: '8811', expiry: '09/26', isDefault: false }
      ]);
      setIsAddingCard(false);
      toast.success('Payment method added successfully!');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="settings-container">
        
        {/* Header section */}
        <div className="settings-header">
          <div className="settings-title-wrapper">
            <h1 className="page-title">Account Settings</h1>
            <p className="page-subtitle">Manage your security, notifications, and preferences.</p>
          </div>
        </div>

        <div className="settings-layout">
          
          {/* Vertical Tabs Sidebar */}
          <Card className="settings-sidebar-card">
            <nav className="settings-nav">
              <button 
                className={`settings-nav-item ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                <SettingsIcon size={18} /> General Preferences
              </button>
              <button 
                className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <Shield size={18} /> Security & Access
              </button>
              <button 
                className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={18} /> Notifications
              </button>
              <button 
                className={`settings-nav-item ${activeTab === 'billing' ? 'active' : ''}`}
                onClick={() => setActiveTab('billing')}
              >
                <CreditCard size={18} /> Billing & Subscriptions
              </button>
            </nav>
          </Card>

          {/* Main Content Area */}
          <div className="settings-content-area">
            
            {/* --- SECURITY TAB --- */}
            {activeTab === 'security' && (
              <div className="settings-tab-content fade-in-up">
                
                {/* MFA Section */}
                <Card className="settings-card">
                  <div className="settings-card-header">
                    <h3>Two-Factor Authentication (2FA)</h3>
                    <p>Add an extra layer of security to your UdyamOne account.</p>
                  </div>
                  <CardContent className="settings-card-content">
                    <div className="mfa-status-banner">
                      <div className="mfa-info">
                        <div className={`mfa-icon-wrapper ${userSettings.mfaEnabled ? 'enabled' : 'disabled'}`}>
                          {userSettings.mfaEnabled ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                        </div>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0' }}>Authenticator App</h4>
                          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            {userSettings.mfaEnabled 
                              ? 'Your account is protected by 2FA.' 
                              : 'Protect your account with Google Authenticator or Authy.'}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant={userSettings.mfaEnabled ? "outline" : "primary"}
                        onClick={handleMFAToggle}
                        disabled={isTogglingMFA}
                        style={{ minWidth: '120px' }}
                      >
                        {isTogglingMFA ? 'Processing...' : userSettings.mfaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Active Sessions Section */}
                <Card className="settings-card mt-6">
                  <div className="settings-card-header">
                    <h3>Active Sessions</h3>
                    <p>Manage the devices currently logged into your account.</p>
                  </div>
                  <CardContent className="settings-card-content p-0">
                    <div className="sessions-list">
                      {activeSessions.map(session => (
                        <div key={session.id} className="session-item">
                          <div className="session-icon">
                            {session.device.includes('iPhone') || session.device.includes('Mobile') 
                              ? <Smartphone size={24} /> 
                              : <Monitor size={24} />
                            }
                          </div>
                          <div className="session-details">
                            <h4 className="session-device">
                              {session.device} 
                              {session.current && <span className="current-badge">Current Session</span>}
                            </h4>
                            <div className="session-meta">
                              <span><Globe size={12} style={{ display: 'inline', marginRight: '4px' }}/> {session.location}</span>
                              <span>•</span>
                              <span>IP: {session.ip}</span>
                              <span>•</span>
                              <span>Active: {session.lastActive}</span>
                            </div>
                          </div>
                          {!session.current && (
                            <button 
                              className="revoke-btn text-error"
                              onClick={() => handleRevokeSession(session.id)}
                            >
                              <LogOut size={16} style={{ marginRight: '6px' }} /> Revoke
                            </button>
                          )}
                        </div>
                      ))}
                      {activeSessions.length === 1 && (
                        <div className="session-item" style={{ justifyContent: 'center', color: 'var(--text-muted)' }}>
                          No other active sessions.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* --- NOTIFICATIONS TAB --- */}
            {activeTab === 'notifications' && (
              <div className="settings-tab-content fade-in-up">
                <Card className="settings-card">
                  <div className="settings-card-header">
                    <h3>Notification Preferences</h3>
                    <p>Choose what we notify you about and how we send it.</p>
                  </div>
                  <CardContent className="settings-card-content p-0">
                    <table className="notifications-table">
                      <thead>
                        <tr>
                          <th>Event Type</th>
                          <th style={{ textAlign: 'center' }}>Email</th>
                          <th style={{ textAlign: 'center' }}>SMS</th>
                          <th style={{ textAlign: 'center' }}>Push</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: 'approvals', label: 'Application Approvals', desc: 'When your license is approved or rejected.' },
                          { key: 'queries', label: 'Officer Queries', desc: 'When an officer raises a question on your file.' },
                          { key: 'renewals', label: 'Compliance & Renewals', desc: 'Alerts for upcoming expiration dates.' },
                          { key: 'marketing', label: 'News & Schemes', desc: 'Updates on new government subsidies.' }
                        ].map(row => (
                          <tr key={row.key}>
                            <td>
                              <div className="notif-label-wrapper">
                                <strong>{row.label}</strong>
                                <span>{row.desc}</span>
                              </div>
                            </td>
                            <td align="center">
                              <label className="toggle-switch">
                                <input 
                                  type="checkbox" 
                                  checked={userSettings.notifications[row.key].email} 
                                  onChange={() => handleNotificationToggle(row.key, 'email', userSettings.notifications[row.key].email)}
                                />
                                <span className="toggle-slider"></span>
                              </label>
                            </td>
                            <td align="center">
                              <label className="toggle-switch">
                                <input 
                                  type="checkbox" 
                                  checked={userSettings.notifications[row.key].sms} 
                                  onChange={() => handleNotificationToggle(row.key, 'sms', userSettings.notifications[row.key].sms)}
                                />
                                <span className="toggle-slider"></span>
                              </label>
                            </td>
                            <td align="center">
                              <label className="toggle-switch">
                                <input 
                                  type="checkbox" 
                                  checked={userSettings.notifications[row.key].push} 
                                  onChange={() => handleNotificationToggle(row.key, 'push', userSettings.notifications[row.key].push)}
                                />
                                <span className="toggle-slider"></span>
                              </label>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* --- GENERAL (Placeholder) --- */}
            {activeTab === 'general' && (
              <div className="settings-tab-content fade-in-up">
                <Card className="settings-card">
                  <CardContent className="settings-empty-state">
                    <SettingsIcon size={48} color="var(--border-color)" />
                    <h3>General Preferences</h3>
                    <p>This section is currently under development.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* --- BILLING TAB --- */}
            {activeTab === 'billing' && (
              <div className="settings-tab-content fade-in-up">
                
                {/* Top Row: Plan & Wallet */}
                <div className="billing-top-row">
                  <Card className="settings-card billing-plan-card">
                    <CardContent className="settings-card-content">
                      <div className="plan-header">
                        <span className="plan-badge">Active Plan</span>
                        <h3 className="plan-name">Enterprise Govt Plan</h3>
                        <p className="plan-price">₹14,999<span>/year</span></p>
                      </div>
                      <ul className="plan-features">
                        <li><CheckCircle2 size={16} /> Unlimited Users</li>
                        <li><CheckCircle2 size={16} /> Priority Support SLA</li>
                        <li><CheckCircle2 size={16} /> API Access</li>
                      </ul>
                      <Button variant="outline" style={{ width: '100%', justifyContent: 'center' }}>Manage Plan</Button>
                    </CardContent>
                  </Card>

                  <Card className="settings-card billing-wallet-card">
                    <CardContent className="settings-card-content">
                      <div className="wallet-header">
                        <div className="wallet-icon-wrapper">
                          <Wallet size={24} />
                        </div>
                        <h3>Udyam Wallet Balance</h3>
                      </div>
                      <div className="wallet-balance">
                        <h1>₹45,000</h1>
                        <p>Available for license fees & renewals</p>
                      </div>
                      <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                        <Plus size={18} style={{ marginRight: '8px' }} /> Add Funds
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Methods */}
                <Card className="settings-card mt-6">
                  <div className="settings-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3>Payment Methods</h3>
                      <p>Manage cards used for subscriptions and wallet reloads.</p>
                    </div>
                    <Button variant="outline" onClick={handleAddCard} disabled={isAddingCard}>
                      {isAddingCard ? 'Processing...' : <><Plus size={16} style={{ marginRight: '6px' }} /> Add Card</>}
                    </Button>
                  </div>
                  <CardContent className="settings-card-content p-0">
                    <div className="payment-methods-list">
                      {paymentMethods.map(pm => (
                        <div key={pm.id} className="payment-method-item">
                          <div className="pm-icon">
                            <CreditCard size={24} color={pm.type === 'Visa' ? '#1A1F71' : '#EB001B'} />
                          </div>
                          <div className="pm-details">
                            <h4>{pm.type} ending in {pm.last4}</h4>
                            <p>Expires {pm.expiry}</p>
                          </div>
                          <div className="pm-actions">
                            {pm.isDefault && <span className="default-badge">Default</span>}
                            <button className="icon-btn"><MoreHorizontal size={20} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Invoice History */}
                <Card className="settings-card mt-6">
                  <div className="settings-card-header">
                    <h3>Billing History</h3>
                    <p>Download past invoices and fee receipts.</p>
                  </div>
                  <CardContent className="settings-card-content p-0">
                    <table className="invoices-table">
                      <thead>
                        <tr>
                          <th>Invoice ID</th>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_INVOICES.map(inv => (
                          <tr key={inv.id}>
                            <td className="font-medium">{inv.id}</td>
                            <td>{inv.date}</td>
                            <td>{inv.description}</td>
                            <td className="font-medium">{inv.amount}</td>
                            <td><span className="status-paid"><CheckCircle2 size={12} /> {inv.status}</span></td>
                            <td align="right">
                              <button className="download-btn">
                                <Download size={16} /> PDF
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>

              </div>
            )}

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
