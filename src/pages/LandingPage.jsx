import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { 
  CheckCircle2, Bot, FolderLock, ShieldAlert, ArrowRight, 
  ChevronDown, Check, Star, Zap, Users, BarChart3
} from 'lucide-react';
import './LandingPage.css';

const FAQS = [
  { q: "How long does it take to get my licenses approved?", a: "With our AI Copilot and direct API integrations with government portals, processing times are typically reduced by 70%. Most standard trade licenses are approved within 48 hours." },
  { q: "Is my business data secure?", a: "Absolutely. We use bank-grade 256-bit encryption for your Document Vault. We are ISO 27001 certified and fully compliant with Indian data localization laws." },
  { q: "Can I invite my accountant or legal advisor?", a: "Yes! Our Professional and Enterprise plans include a sophisticated Team Management engine with strict Role-Based Access Control (RBAC)." },
  { q: "What happens if a government portal goes down?", a: "Our real-time System Status dashboard monitors all government APIs (GSTN, UIDAI, MCA). If a portal goes down, we instantly pause your submissions and retry automatically when it's back online." }
];

export function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(-1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-wrapper">
      
      {/* Sticky Navigation */}
      <nav className={`landing-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-logo">U</div>
            <span className="brand-text">UdyamOne</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-actions">
            <button className="nav-login" onClick={() => navigate('/login')}>Log In</button>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Start Free Trial
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="hero-container">
          
          <div className="hero-badge fade-in-up">
            <Star size={14} className="text-warning"/> 
            <span>Trusted by 5,000+ Indian Businesses</span>
          </div>

          <h1 className="hero-title fade-in-up" style={{ animationDelay: '0.1s' }}>
            Simplify Government Compliance.<br/>
            <span className="gradient-text">Scale Your Business.</span>
          </h1>
          
          <p className="hero-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>
            The ultimate enterprise platform to manage approvals, track compliance, securely store documents, and interface with the Government of India.
          </p>
          
          <div className="hero-cta-group fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="primary" size="lg" className="cta-btn-primary" onClick={() => navigate('/dashboard')}>
              Launch Dashboard <ArrowRight size={18} style={{ marginLeft: '8px' }}/>
            </Button>
            <Button variant="secondary" size="lg" className="cta-btn-outline" onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>
              View Pricing
            </Button>
          </div>

          <div className="hero-floating-elements fade-in-up" style={{ animationDelay: '0.5s' }}>
            {/* Mock UI Elements floating around */}
            <div className="float-card float-1">
              <CheckCircle2 size={20} className="text-success"/>
              <div className="fc-text">
                <strong>Trade License</strong>
                <span>Approved • Just now</span>
              </div>
            </div>
            <div className="float-card float-2">
              <ShieldAlert size={20} className="text-warning"/>
              <div className="fc-text">
                <strong>GST Filing Due</strong>
                <span>In 3 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Everything you need to run your business</h2>
          <p>We built UdyamOne from the ground up to handle the complexity of Indian business regulations.</p>
        </div>

        <div className="bento-grid-container">
          
          <div className="bento-card bento-ai">
            <div className="bento-icon"><Bot size={32} /></div>
            <h3>Udyam AI Copilot</h3>
            <p>Draft legal responses, resolve queries, and get personalized compliance advice instantly.</p>
          </div>

          <div className="bento-card bento-vault">
            <div className="bento-icon"><FolderLock size={32} /></div>
            <h3>Encrypted Document Vault</h3>
            <p>Securely store Pan Cards, GST Certificates, and Incorporation deeds with bank-grade encryption.</p>
          </div>

          <div className="bento-card bento-tracker">
            <div className="bento-icon"><BarChart3 size={32} /></div>
            <h3>Real-Time Tracking</h3>
            <p>Never wonder about your application status again. Live tracking across 20+ government departments.</p>
          </div>

          <div className="bento-card bento-team">
            <div className="bento-icon"><Users size={32} /></div>
            <h3>Team & Access Control</h3>
            <p>Invite accountants and legal advisors with strict Role-Based Access Control (RBAC).</p>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-container">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${openFaq === idx ? 'open' : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
            >
              <div className="faq-question">
                <h4>{faq.q}</h4>
                <ChevronDown size={20} className="faq-icon" />
              </div>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to scale your compliance?</h2>
          <p>Join 5,000+ forward-thinking Indian enterprises today.</p>
          <Button variant="primary" size="lg" className="cta-footer-btn" onClick={() => navigate('/dashboard')}>
            Get Started Now <Zap size={18} style={{ marginLeft: '8px', fill: 'currentColor' }}/>
          </Button>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-logo">U</div>
            <span className="brand-text">UdyamOne</span>
            <p>© 2026 UdyamOne Technologies. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <div className="fl-col">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Security</a>
            </div>
            <div className="fl-col">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
