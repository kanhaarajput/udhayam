import React, { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Inbox, Send, Archive, Star, Search, Clock, 
  MoreVertical, Paperclip, Reply, ShieldAlert, Bot
} from 'lucide-react';
import toast from 'react-hot-toast';
import './MessageCenter.css';

// Mock Messages Data
const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'Govt. Officer - Ward 44',
    avatar: 'G',
    subject: 'Clarification Required: Trade License Address',
    preview: 'Please upload a clearer copy of your electricity bill. The current one is illegible.',
    timestamp: '10:30 AM',
    unread: true,
    type: 'official',
    thread: [
      { sender: 'Govt. Officer - Ward 44', time: '10:30 AM', text: 'Dear Applicant, we are reviewing your Trade License application (App #TRD-2026-891). Please upload a clearer copy of your electricity bill as proof of address. The current attachment is illegible.' }
    ]
  },
  {
    id: 'msg-2',
    sender: 'UdyamOne Security',
    avatar: <ShieldAlert size={16}/>,
    subject: 'New Login Detected',
    preview: 'We detected a new login to your account from IP 45.22.19.102.',
    timestamp: 'Yesterday',
    unread: true,
    type: 'system',
    thread: [
      { sender: 'UdyamOne Security', time: 'Sep 09, 2026 11:45 PM', text: 'We detected a new login to your account from Chrome on Windows (IP 45.22.19.102). If this was you, you can ignore this message.' }
    ]
  },
  {
    id: 'msg-3',
    sender: 'Aditi Sharma (Team)',
    avatar: 'A',
    subject: 'Q3 Tax Reports Uploaded',
    preview: 'Hi Lalit, I just uploaded the GST filings for Q3 to the Document Vault.',
    timestamp: 'Sep 08',
    unread: true,
    type: 'team',
    thread: [
      { sender: 'Aditi Sharma (Team)', time: 'Sep 08, 2026 09:15 AM', text: 'Hi Lalit, I just uploaded the GST filings for Q3 to the Document Vault. Please review them when you have a moment. Let me know if you need any adjustments before the 15th.' }
    ]
  },
  {
    id: 'msg-4',
    sender: 'Udyam AI Copilot',
    avatar: <Bot size={16}/>,
    subject: 'Weekly Compliance Digest',
    preview: 'You have 2 upcoming deadlines this week. Click to view details.',
    timestamp: 'Sep 05',
    unread: false,
    type: 'system',
    thread: [
      { sender: 'Udyam AI Copilot', time: 'Sep 05, 2026 08:00 AM', text: 'Good morning! This is your weekly compliance digest. You have 2 upcoming deadlines: 1. GST GSTR-3B Filing (Due in 4 days). 2. Fire NOC Renewal (Due in 12 days). Shall I prepare the draft forms for you?' }
    ]
  }
];

export function MessageCenter() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedMsgId, setSelectedMsgId] = useState(INITIAL_MESSAGES[0].id);
  const [replyText, setReplyText] = useState('');
  
  const messagesEndRef = useRef(null);

  const selectedMessage = messages.find(m => m.id === selectedMsgId);

  // Auto-scroll to bottom of thread
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedMessage?.thread]);

  const handleSelectMessage = (id) => {
    setSelectedMsgId(id);
    // Mark as read
    setMessages(messages.map(m => m.id === id ? { ...m, unread: false } : m));
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply = {
      sender: 'You',
      time: 'Just now',
      text: replyText,
      isSelf: true
    };

    setMessages(messages.map(m => {
      if (m.id === selectedMsgId) {
        return { ...m, thread: [...m.thread, newReply] };
      }
      return m;
    }));

    setReplyText('');
    toast.success('Message sent successfully!');
  };

  return (
    <DashboardLayout>
      <div className="mc-container">
        
        {/* Header */}
        <div className="mc-header">
          <h1 className="page-title">Message Center</h1>
          <p className="page-subtitle">Unified inbox for government notices, team chat, and system alerts.</p>
        </div>

        <Card className="mc-layout-card fade-in-up">
          <div className="mc-layout">
            
            {/* Left Sidebar: Folders */}
            <div className="mc-sidebar">
              <Button variant="primary" className="compose-btn">New Message</Button>
              
              <div className="folder-list">
                <button 
                  className={`folder-item ${activeFolder === 'inbox' ? 'active' : ''}`}
                  onClick={() => setActiveFolder('inbox')}
                >
                  <Inbox size={18} /> Inbox 
                  <span className="folder-badge">{messages.filter(m => m.unread).length}</span>
                </button>
                <button 
                  className={`folder-item ${activeFolder === 'sent' ? 'active' : ''}`}
                  onClick={() => setActiveFolder('sent')}
                >
                  <Send size={18} /> Sent
                </button>
                <button 
                  className={`folder-item ${activeFolder === 'starred' ? 'active' : ''}`}
                  onClick={() => setActiveFolder('starred')}
                >
                  <Star size={18} /> Starred
                </button>
                <button 
                  className={`folder-item ${activeFolder === 'archived' ? 'active' : ''}`}
                  onClick={() => setActiveFolder('archived')}
                >
                  <Archive size={18} /> Archived
                </button>
              </div>
            </div>

            {/* Middle Pane: Message List */}
            <div className="mc-list">
              <div className="mc-list-search">
                <Search size={16} className="search-icon" />
                <input type="text" placeholder="Search messages..." />
              </div>

              <div className="mc-threads">
                {messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`mc-thread-item ${selectedMsgId === msg.id ? 'selected' : ''} ${msg.unread ? 'unread' : ''}`}
                    onClick={() => handleSelectMessage(msg.id)}
                  >
                    <div className="thread-avatar">
                      {typeof msg.avatar === 'string' ? msg.avatar : msg.avatar}
                      {msg.unread && <span className="unread-dot"></span>}
                    </div>
                    <div className="thread-content">
                      <div className="thread-top">
                        <span className="thread-sender">{msg.sender}</span>
                        <span className="thread-time">{msg.timestamp}</span>
                      </div>
                      <span className="thread-subject">{msg.subject}</span>
                      <p className="thread-preview">{msg.preview}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Pane: Thread View */}
            <div className="mc-view">
              {selectedMessage ? (
                <>
                  <div className="view-header">
                    <div className="view-header-info">
                      <h2>{selectedMessage.subject}</h2>
                      <div className="view-meta">
                        <span className={`badge badge-${selectedMessage.type}`}>
                          {selectedMessage.type}
                        </span>
                        <span className="meta-time"><Clock size={14}/> Last active {selectedMessage.timestamp}</span>
                      </div>
                    </div>
                    <div className="view-actions">
                      <button className="icon-btn"><Archive size={18}/></button>
                      <button className="icon-btn"><MoreVertical size={18}/></button>
                    </div>
                  </div>

                  <div className="view-thread">
                    {selectedMessage.thread.map((reply, idx) => (
                      <div key={idx} className={`chat-bubble-wrapper ${reply.isSelf ? 'self' : ''}`}>
                        {!reply.isSelf && (
                          <div className="chat-avatar">
                            {typeof selectedMessage.avatar === 'string' ? selectedMessage.avatar : selectedMessage.avatar}
                          </div>
                        )}
                        <div className="chat-bubble">
                          <div className="chat-meta">
                            <strong>{reply.sender}</strong>
                            <span>{reply.time}</span>
                          </div>
                          <div className="chat-text">{reply.text}</div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="view-reply">
                    <form onSubmit={handleSendReply} className="reply-box">
                      <textarea 
                        placeholder="Type your reply here..." 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows="3"
                      ></textarea>
                      <div className="reply-actions">
                        <button type="button" className="icon-btn" title="Attach Document"><Paperclip size={18}/></button>
                        <Button variant="primary" type="submit" disabled={!replyText.trim()}>
                          <Reply size={16} style={{ marginRight: '8px' }} /> Reply
                        </Button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <div className="empty-view">
                  <Inbox size={48} className="text-muted" />
                  <h3>No Message Selected</h3>
                  <p>Select a thread from the list to view it.</p>
                </div>
              )}
            </div>

          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
}
