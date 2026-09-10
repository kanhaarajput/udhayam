import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import './AIAssistant.css';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am Udyam AI. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const userMsg = text || inputText;
    if (!userMsg.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInputText('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      let botResponse = "I can help you with that. However, this is a simulated response as my backend is not currently connected.";
      
      const lowerText = userMsg.toLowerCase();
      if (lowerText.includes('status') || lowerText.includes('track')) {
        botResponse = "You can track your applications in the 'Track Applications' section of your dashboard. Let me know if you need help finding it!";
      } else if (lowerText.includes('scheme') || lowerText.includes('subsidy')) {
        botResponse = "We have several schemes available! Check out the 'Explore Schemes' page to find subsidies tailored for your business.";
      } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
        botResponse = "Hi there! I am Udyam AI, your virtual assistant. Feel free to ask me about tracking, schemes, or compliance!";
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = ["Check Status", "Find Schemes", "Need Help"];

  return (
    <div className="ai-assistant-container">
      {/* Chat Window */}
      <div className={`ai-chat-window ${isOpen ? 'open' : ''}`}>
        <div className="ai-chat-header">
          <div className="ai-header-title">
            <Sparkles size={18} className="text-warning" />
            <h3>Udyam AI</h3>
          </div>
          <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="ai-chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`ai-message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
              {msg.isBot && <div className="ai-avatar"><Bot size={16} /></div>}
              <div className="ai-message-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="ai-message-wrapper bot">
              <div className="ai-avatar"><Bot size={16} /></div>
              <div className="ai-message-bubble typing">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-quick-replies">
          {quickReplies.map((reply, idx) => (
            <button key={idx} className="ai-quick-btn" onClick={() => handleSend(reply)}>
              {reply}
            </button>
          ))}
        </div>

        <div className="ai-chat-input">
          <input 
            type="text" 
            placeholder="Ask Udyam AI..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="ai-send-btn" onClick={() => handleSend()} disabled={!inputText.trim() || isTyping}>
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Floating Button */}
      {!isOpen && (
        <button className="ai-floating-btn" onClick={() => setIsOpen(true)}>
          <MessageSquare size={24} />
          <span className="ai-pulse-ring"></span>
        </button>
      )}
    </div>
  );
}
