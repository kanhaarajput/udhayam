import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Button } from '../components/Button';
import { Bot, User as UserIcon } from 'lucide-react';
import './FindApprovals.css';

export function FindApprovals() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="find-approvals-page">
        <div className="page-header">
          <h1 className="page-title">Find Applicable Approvals</h1>
          <p className="page-subtitle">Our AI analyzes your business profile and suggests the required approvals</p>
        </div>

        <div className="chat-container">
          <div className="chat-message ai">
            <div className="chat-avatar bg-primary">
              <Bot size={24} color="var(--primary-700)" />
            </div>
            <div className="chat-bubble ai-bubble">
              <p style={{ margin: 0 }}>Tell me about your business or use your saved profile.</p>
            </div>
          </div>

          <div className="chat-message user">
            <div className="chat-bubble user-bubble">
              <p style={{ margin: 0 }}>I want to set up a food processing factory in Pune.<br/>with an investment of ₹10 crore and 150 employees.</p>
            </div>
            <div className="chat-avatar bg-secondary">
              <UserIcon size={24} color="var(--secondary-700)" />
            </div>
          </div>

          <div className="chat-action">
            <Button size="lg" variant="primary" onClick={() => navigate('/approvals/results')}>
              Analyze Requirements
            </Button>
          </div>
        </div>

        <div className="suggestions-area">
          <span className="suggestions-label">Not sure? Try an example:</span>
          <div className="suggestion-pills">
            <button className="pill">Food processing unit in Pune</button>
            <button className="pill">Chemical unit in Nagpur</button>
            <button className="pill">Textile unit in Nashik</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
