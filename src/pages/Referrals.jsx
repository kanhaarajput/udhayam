import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Gift, Copy, Share2, Briefcase, Send, MessageCircle, 
  TrendingUp, Users, Wallet, CheckCircle2, Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import './Referrals.css';

const REFERRED_BUSINESSES = [
  { id: 1, name: 'Sharma Logistics Pvt Ltd', date: 'Sep 05, 2026', status: 'Paid Subscription', reward: '₹1,500' },
  { id: 2, name: 'TechNova Solutions', date: 'Sep 01, 2026', status: 'Paid Subscription', reward: '₹1,500' },
  { id: 3, name: 'Green Valley Farms', date: 'Aug 28, 2026', status: 'Paid Subscription', reward: '₹1,500' },
  { id: 4, name: 'Apex Traders', date: 'Yesterday', status: 'Pending Trial', reward: '₹0' },
  { id: 5, name: 'Blue Ocean Consulting', date: 'Today', status: 'Signed Up', reward: '₹0' }
];

export function Referrals() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://udyamone.com/r/abcfoods";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform) => {
    toast.success(`Opening ${platform} share dialog...`);
  };

  const getStatusBadge = (status) => {
    if (status === 'Paid Subscription') {
      return <span className="status-badge success"><CheckCircle2 size={14}/> Paid</span>;
    }
    if (status === 'Pending Trial') {
      return <span className="status-badge warning"><Clock size={14}/> In Trial</span>;
    }
    return <span className="status-badge default"><Users size={14}/> Signed Up</span>;
  };

  return (
    <DashboardLayout>
      <div className="referrals-container">
        
        {/* Header */}
        <div className="referrals-header">
          <div className="referrals-title-wrapper">
            <h1 className="page-title">Refer & Earn</h1>
            <p className="page-subtitle">Invite other businesses to UdyamOne and earn platform credits.</p>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="referral-hero-card fade-in-up">
          <div className="referral-hero-content">
            <div className="hero-text">
              <h2>Give ₹1,000, Get ₹1,500</h2>
              <p>
                When a business signs up using your link, they get ₹1,000 off their first month. 
                When they pay their first invoice, you get ₹1,500 in platform credits!
              </p>
              
              <div className="link-generator mt-6">
                <label>Your Unique Referral Link</label>
                <div className="link-box">
                  <input type="text" readOnly value={referralLink} />
                  <Button variant="primary" onClick={handleCopyLink} className="copy-btn">
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied' : 'Copy Link'}
                  </Button>
                </div>
              </div>

              <div className="social-share mt-6">
                <span>Share instantly:</span>
                <div className="share-buttons">
                  <button className="share-btn whatsapp" onClick={() => handleSocialShare('WhatsApp')}>
                    <MessageCircle size={18} /> WhatsApp
                  </button>
                  <button className="share-btn linkedin" onClick={() => handleSocialShare('LinkedIn')}>
                    <Briefcase size={18} /> LinkedIn
                  </button>
                  <button className="share-btn twitter" onClick={() => handleSocialShare('Twitter')}>
                    <Send size={18} /> Twitter
                  </button>
                </div>
              </div>
            </div>
            
            <div className="hero-illustration">
              <div className="gift-circle">
                <Gift size={64} className="gift-icon" />
              </div>
            </div>
          </div>
        </Card>

        {/* KPI Dashboard */}
        <div className="kpi-grid mt-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Card className="kpi-card">
            <CardContent className="kpi-content">
              <div className="kpi-icon-wrapper text-success bg-success-light">
                <Wallet size={24} />
              </div>
              <div className="kpi-details">
                <span className="kpi-label">Total Credits Earned</span>
                <h2 className="kpi-value">₹4,500</h2>
              </div>
            </CardContent>
          </Card>
          
          <Card className="kpi-card">
            <CardContent className="kpi-content">
              <div className="kpi-icon-wrapper text-primary bg-primary-light">
                <Users size={24} />
              </div>
              <div className="kpi-details">
                <span className="kpi-label">Successful Referrals</span>
                <h2 className="kpi-value">3</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="kpi-card">
            <CardContent className="kpi-content">
              <div className="kpi-icon-wrapper text-warning bg-warning-light">
                <TrendingUp size={24} />
              </div>
              <div className="kpi-details">
                <span className="kpi-label">Pending Payouts</span>
                <h2 className="kpi-value">₹3,000</h2>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referred Businesses Table */}
        <Card className="tracking-card mt-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="tracking-header">
            <h3>Your Referrals</h3>
            <Button variant="outline" size="sm">
              <Share2 size={16} style={{ marginRight: '8px' }}/> View All Activity
            </Button>
          </div>
          <CardContent className="p-0">
            <div className="table-responsive">
              <table className="referral-table">
                <thead>
                  <tr>
                    <th>Business Name</th>
                    <th>Sign Up Date</th>
                    <th>Status</th>
                    <th className="text-right">Reward Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERRED_BUSINESSES.map(business => (
                    <tr key={business.id}>
                      <td>
                        <strong>{business.name}</strong>
                      </td>
                      <td>{business.date}</td>
                      <td>{getStatusBadge(business.status)}</td>
                      <td className={`text-right fw-bold ${business.reward !== '₹0' ? 'text-success' : 'text-muted'}`}>
                        {business.reward}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}
