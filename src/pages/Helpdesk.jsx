import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { 
  LifeBuoy, Plus, MessageSquare, AlertCircle, FileText, 
  Search, X, Send, User, Bot
} from 'lucide-react';
import toast from 'react-hot-toast';
import './Helpdesk.css';

// Initial Mock Data
const INITIAL_TICKETS = [
  {
    id: 'TK-8902',
    subject: 'Cannot upload PAN Card PDF',
    category: 'Technical Issue',
    status: 'Open',
    priority: 'High',
    date: '2023-10-24',
    messages: [
      { sender: 'user', text: 'Hi, I am trying to upload my PAN card in the Document Vault but it keeps saying "File format not supported" even though it is a PDF.', time: '10:00 AM' },
      { sender: 'system', text: 'Ticket received and assigned to technical support agent.', time: '10:01 AM' }
    ]
  },
  {
    id: 'TK-8850',
    subject: 'Clarification on Fire NOC Guidelines',
    category: 'Policy Query',
    status: 'In Progress',
    priority: 'Medium',
    date: '2023-10-22',
    messages: [
      { sender: 'user', text: 'Does my 500 sq ft warehouse require a Type B Fire NOC?', time: '09:00 AM' },
      { sender: 'agent', text: 'Hello! As per the revised 2023 guidelines, warehouses under 1000 sq ft only require a Type A basic clearance unless storing hazardous materials. Are you storing any chemicals?', time: '11:30 AM' },
      { sender: 'user', text: 'No, just electronics.', time: '12:00 PM' }
    ]
  },
  {
    id: 'TK-8120',
    subject: 'Payment Failed but Amount Deducted',
    category: 'Billing',
    status: 'Resolved',
    priority: 'High',
    date: '2023-10-15',
    messages: [
      { sender: 'user', text: 'I paid Rs 5000 for the Trade License but the portal shows payment pending.', time: '02:00 PM' },
      { sender: 'agent', text: 'We apologize for the inconvenience. We have verified the transaction with the payment gateway and manually updated your application status to Paid.', time: '04:15 PM' }
    ]
  }
];

export function Helpdesk() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // New Ticket Form State
  const [newTicket, setNewTicket] = useState({ subject: '', category: 'Technical Issue', description: '' });
  
  // Chat Reply State
  const [replyText, setReplyText] = useState('');

  // Derived State
  const filteredTickets = tickets.filter(t => 
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    open: tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.description) {
      toast.error('Please fill all fields');
      return;
    }

    const ticket = {
      id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: newTicket.subject,
      category: newTicket.category,
      status: 'Open',
      priority: 'Medium',
      date: new Date().toISOString().split('T')[0],
      messages: [
        { sender: 'user', text: newTicket.description, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
        { sender: 'system', text: 'Ticket received and assigned to support team.', time: 'Just now' }
      ]
    };

    setTickets([ticket, ...tickets]);
    setIsModalOpen(false);
    setNewTicket({ subject: '', category: 'Technical Issue', description: '' });
    toast.success('Ticket created successfully!');
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        const newMessage = { sender: 'user', text: replyText, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
        const updatedTicket = { ...t, messages: [...t.messages, newMessage] };
        setSelectedTicket(updatedTicket); // Update local active view
        return updatedTicket;
      }
      return t;
    });

    setTickets(updatedTickets);
    setReplyText('');
    
    // Simulate agent reply
    setTimeout(() => {
      const ticketsWithAgentReply = updatedTickets.map(t => {
        if (t.id === selectedTicket.id) {
          const agentReply = { sender: 'agent', text: 'Thank you for the update. We are looking into this and will get back to you shortly.', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
          const ticketWithAgent = { ...t, messages: [...t.messages, agentReply] };
          if(selectedTicket.id === t.id) setSelectedTicket(ticketWithAgent);
          return ticketWithAgent;
        }
        return t;
      });
      setTickets(ticketsWithAgentReply);
    }, 2000);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Open': return <span className="badge badge-error">Open</span>;
      case 'In Progress': return <span className="badge badge-warning">In Progress</span>;
      case 'Resolved': return <span className="badge badge-success">Resolved</span>;
      default: return <span className="badge badge-default">{status}</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="helpdesk-container">
        
        {/* Main Dashboard View */}
        <div className={`helpdesk-main ${selectedTicket ? 'panel-open' : ''}`}>
          <div className="helpdesk-header">
            <div>
              <h1 className="page-title">Help & Support</h1>
              <p className="page-subtitle">Get assistance with applications, policies, and technical issues.</p>
            </div>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} style={{ marginRight: '8px' }} /> New Ticket
            </Button>
          </div>

          <div className="helpdesk-quick-stats">
            <Card className="stat-card">
              <CardContent>
                <div className="stat-value">{stats.open}</div>
                <div className="stat-label">Active Tickets</div>
              </CardContent>
            </Card>
            <Card className="stat-card">
              <CardContent>
                <div className="stat-value text-success">{stats.resolved}</div>
                <div className="stat-label">Resolved Tickets</div>
              </CardContent>
            </Card>
            <Card className="stat-card bg-primary-light clickable" onClick={() => setIsModalOpen(true)}>
              <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <LifeBuoy size={24} color="var(--primary-600)" />
                <h3 style={{ color: 'var(--primary-800)', margin: 0 }}>Need Help?</h3>
              </CardContent>
            </Card>
          </div>

          <Card className="helpdesk-table-card">
            <div className="table-toolbar">
              <div className="search-wrapper">
                <Search size={18} color="var(--text-muted)" />
                <input 
                  type="text" 
                  placeholder="Search tickets by ID or Subject..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="table-responsive">
              <table className="helpdesk-table">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Subject</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map(ticket => (
                    <tr key={ticket.id} onClick={() => setSelectedTicket(ticket)} className={selectedTicket?.id === ticket.id ? 'active-row' : ''}>
                      <td className="font-medium text-primary-600">{ticket.id}</td>
                      <td className="font-medium">{ticket.subject}</td>
                      <td>{ticket.category}</td>
                      <td>{ticket.date}</td>
                      <td>{getStatusBadge(ticket.status)}</td>
                    </tr>
                  ))}
                  {filteredTickets.length === 0 && (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        No tickets found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Slide-out Ticket Chat Panel */}
        {selectedTicket && (
          <div className="ticket-chat-panel fade-in-right">
            <div className="chat-panel-header">
              <div>
                <span className="ticket-id">{selectedTicket.id}</span>
                <h3 className="ticket-subject">{selectedTicket.subject}</h3>
              </div>
              <button className="close-btn" onClick={() => setSelectedTicket(null)}><X size={24} /></button>
            </div>
            
            <div className="chat-panel-meta">
              <span><strong>Status:</strong> {getStatusBadge(selectedTicket.status)}</span>
              <span><strong>Category:</strong> {selectedTicket.category}</span>
            </div>

            <div className="chat-messages">
              {selectedTicket.messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  <div className="chat-avatar">
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className="chat-bubble-container">
                    <div className="chat-sender-name">
                      {msg.sender === 'user' ? 'You' : msg.sender === 'system' ? 'System Automated' : 'Support Agent'}
                      <span className="chat-time">{msg.time}</span>
                    </div>
                    <div className="chat-bubble">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-area">
              <textarea 
                placeholder="Type your reply here..." 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendReply(); } }}
              />
              <Button variant="primary" onClick={handleSendReply} disabled={!replyText.trim()}>
                <Send size={18} />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* New Ticket Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content fade-in-scale" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>Create New Support Ticket</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleCreateTicket} className="modal-body">
              <div className="form-group">
                <label>Category</label>
                <select 
                  className="form-input" 
                  value={newTicket.category} 
                  onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                >
                  <option value="Technical Issue">Technical Issue (Bugs, Uploads)</option>
                  <option value="Policy Query">Policy & Regulatory Query</option>
                  <option value="Billing">Billing & Payments</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Brief description of the issue"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Detailed Description</label>
                <textarea 
                  className="form-input" 
                  placeholder="Please provide as much detail as possible..."
                  rows={5}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions" style={{ justifyContent: 'flex-end', marginTop: '24px' }}>
                <Button variant="outline" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
                <Button variant="primary" type="submit">Submit Ticket</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
