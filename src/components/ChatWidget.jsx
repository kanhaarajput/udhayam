import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Bot, Sparkles, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './ChatWidget.css';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Context Awareness
  const profile = useAppStore(state => state.businessProfile);
  const applications = useAppStore(state => state.applications);
  
  // Calculate insights
  const pendingApps = applications.filter(a => a.status === 'In Progress').length;
  // Hardcoded for demo, but could be dynamic
  const hasOverdueCompliance = true; 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Generate Context-Aware Greeting
      setIsTyping(true);
      setTimeout(() => {
        let greetingText = `Hello ${profile.companyName}! I am Udyam AI, your enterprise copilot.`;
        
        let insights = [];
        if (pendingApps > 0) insights.push(`You currently have ${pendingApps} application(s) under review.`);
        if (hasOverdueCompliance) insights.push(`⚠️ I noticed you have an overdue compliance task (GSTR-3B).`);
        
        setMessages([
          { 
            sender: 'ai', 
            text: greetingText,
            insights: insights,
            actions: [
              { label: 'View Compliances', route: '/calendar' },
              { label: 'Check Approvals', route: '/tracking' },
              { label: 'Find Schemes', route: '/schemes' }
            ]
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length, profile.companyName, pendingApps]);

  const handleActionClick = (route) => {
    setIsOpen(false);
    navigate(route);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = { sender: 'user', text: inputText };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let aiResponse = { sender: 'ai', text: 'I can certainly help you with that. Would you like me to guide you to the relevant section?' };
      
      const query = newMsg.text.toLowerCase();
      
      // Basic intent matching
      if (query.includes('scheme') || query.includes('subsidy') || query.includes('loan')) {
        aiResponse.text = "Based on your Private Limited status, you are eligible for several schemes including the ZED Certification Subsidy. Let's find the best match.";
        aiResponse.actions = [{ label: 'Open Scheme Matcher', route: '/schemes' }];
      } else if (query.includes('license') || query.includes('noc')) {
        aiResponse.text = "You can track your existing NOC applications or apply for new ones in the Tracking dashboard.";
        aiResponse.actions = [{ label: 'Go to Tracking', route: '/tracking' }];
      } else if (query.includes('upload') || query.includes('document')) {
        aiResponse.text = "All your official documents should be stored in the encrypted Document Vault.";
        aiResponse.actions = [{ label: 'Open Vault', route: '/vault' }];
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <button 
        className={`chat-toggle-btn ${isOpen ? 'hidden' : 'bounce-in'}`} 
        onClick={() => setIsOpen(true)}
      >
        <Sparkles size={20} className="sparkle-icon" />
        Udyam AI
      </button>

      <div className={`chat-widget-container ${isOpen ? 'open' : ''}`}>
        <div className="chat-widget-header">
          <div className="chat-header-title">
            <div className="ai-avatar-glow">
              <Bot size={20} />
            </div>
            <div>
              <h3>Udyam Copilot</h3>
              <span className="online-status">Online • Context Aware</span>
            </div>
          </div>
          <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="chat-widget-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble-wrapper ${msg.sender}`}>
              {msg.sender === 'ai' && (
                <div className="chat-bubble ai">
                  <div className="ai-text">{msg.text}</div>
                  
                  {msg.insights && msg.insights.length > 0 && (
                    <div className="ai-insights">
                      {msg.insights.map((insight, i) => (
                        <div key={i} className={`insight-item ${insight.includes('⚠️') ? 'warning' : ''}`}>
                          {insight}
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.actions && msg.actions.length > 0 && (
                    <div className="ai-actions">
                      {msg.actions.map((action, i) => (
                        <button 
                          key={i} 
                          className="ai-action-chip"
                          onClick={() => handleActionClick(action.route)}
                        >
                          {action.label} <ChevronRight size={14} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {msg.sender === 'user' && (
                <div className="chat-bubble user">
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-bubble-wrapper ai">
              <div className="chat-bubble ai typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-widget-footer" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Ask Copilot anything..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" disabled={!inputText.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
