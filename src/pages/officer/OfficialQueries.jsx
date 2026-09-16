import React, { useState } from 'react';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { MessageSquare, Search, CornerDownRight, CheckCircle2, AlertCircle } from 'lucide-react';
import './OfficialQueries.css';

const QUERIES_DATA = [
  {
    id: 'QRY-001',
    appId: 'APP-2026-089',
    applicant: 'GreenTech Manufacturing',
    subject: 'Clarification on Factory Layout Plan',
    status: 'Response Received',
    date: '16 Aug 2026',
    messages: [
      { sender: 'Officer', text: 'The submitted factory layout plan does not clearly demarcate the waste disposal area. Please provide an updated layout.', date: '14 Aug 2026' },
      { sender: 'Applicant', text: 'Apologies for the oversight. I have attached the revised layout plan highlighting the waste disposal zone in section C.', date: '16 Aug 2026', attachment: 'Revised_Layout_v2.pdf' }
    ]
  },
  {
    id: 'QRY-002',
    appId: 'APP-2026-042',
    applicant: 'BlueSky Chemicals',
    subject: 'Missing Director Signature',
    status: 'Awaiting Applicant',
    date: '15 Aug 2026',
    messages: [
      { sender: 'Officer', text: 'The board resolution document is missing the signature of the Managing Director on page 3. Please re-upload.', date: '15 Aug 2026' }
    ]
  }
];

export function OfficialQueries() {
  const [selectedQuery, setSelectedQuery] = useState(QUERIES_DATA[0]);

  return (
    <OfficerLayout>
      <div className="queries-page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Query Inbox</h1>
            <p className="page-subtitle">Manage communication and clarifications with applicants.</p>
          </div>
        </div>

        <div className="queries-workspace">
          {/* Query List (Sidebar) */}
          <div className="query-sidebar">
            <div className="query-search">
              <Search size={16} className="text-muted" />
              <input type="text" placeholder="Search queries..." />
            </div>
            <div className="query-list">
              {QUERIES_DATA.map(q => (
                <div 
                  key={q.id} 
                  className={`query-item ${selectedQuery.id === q.id ? 'active' : ''}`}
                  onClick={() => setSelectedQuery(q)}
                >
                  <div className="qi-header">
                    <span className="qi-app">{q.applicant}</span>
                    <span className="qi-date">{q.date}</span>
                  </div>
                  <span className="qi-subject">{q.subject}</span>
                  <span className={`qi-status ${q.status.toLowerCase().replace(' ', '-')}`}>
                    {q.status === 'Response Received' && <CheckCircle2 size={12} style={{ marginRight: '4px' }}/>}
                    {q.status === 'Awaiting Applicant' && <AlertCircle size={12} style={{ marginRight: '4px' }}/>}
                    {q.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Query Thread (Main) */}
          <Card className="query-thread-card">
            <div className="thread-header">
              <div className="th-info">
                <h3>{selectedQuery.subject}</h3>
                <span className="th-meta">Ref: {selectedQuery.appId} • {selectedQuery.applicant}</span>
              </div>
              {selectedQuery.status === 'Response Received' && (
                <Button variant="outline" size="sm">Mark as Resolved</Button>
              )}
            </div>
            <CardContent className="thread-content">
              <div className="message-list">
                {selectedQuery.messages.map((msg, idx) => (
                  <div key={idx} className={`message-bubble ${msg.sender === 'Officer' ? 'sent' : 'received'}`}>
                    <div className="mb-header">
                      <span className="mb-sender">{msg.sender}</span>
                      <span className="mb-date">{msg.date}</span>
                    </div>
                    <div className="mb-text">{msg.text}</div>
                    {msg.attachment && (
                      <div className="mb-attachment">
                        <CornerDownRight size={14} /> 📎 {msg.attachment}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="reply-box">
                <textarea placeholder="Type your reply here..."></textarea>
                <div className="reply-actions">
                  <Button variant="primary">Send Reply</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </OfficerLayout>
  );
}
