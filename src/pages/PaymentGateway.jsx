import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { CreditCard, Smartphone, Building2, ShieldCheck, Lock } from 'lucide-react';
import './PaymentGateway.css';

export function PaymentGateway() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment API delay
    setTimeout(() => {
      navigate('/payment/success');
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="payment-page">
        <div className="page-header text-center">
          <h1 className="page-title">Complete Your Application</h1>
          <p className="page-subtitle">Secure payment gateway for UdyamOne processing fees.</p>
        </div>

        <div className="payment-container">
          {/* Left Column - Payment Methods */}
          <div className="payment-methods-section">
            <Card className="payment-card">
              <CardContent>
                <h3 className="section-title">Select Payment Method</h3>
                
                <div className="method-selector">
                  <div 
                    className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard size={24} />
                    <span>Credit / Debit Card</span>
                  </div>
                  <div 
                    className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <Smartphone size={24} />
                    <span>UPI / QR</span>
                  </div>
                  <div 
                    className={`method-option ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    <Building2 size={24} />
                    <span>Net Banking</span>
                  </div>
                </div>

                <div className="payment-form">
                  {paymentMethod === 'card' && (
                    <div className="fade-in">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" className="form-input" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="form-row">
                        <div className="form-group half">
                          <label>Expiry Date</label>
                          <input type="text" className="form-input" placeholder="MM/YY" />
                        </div>
                        <div className="form-group half">
                          <label>CVV</label>
                          <input type="password" className="form-input" placeholder="123" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Name on Card</label>
                        <input type="text" className="form-input" placeholder="John Doe" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="fade-in upi-section text-center">
                      <div className="qr-placeholder">
                        <Smartphone size={48} className="text-muted" />
                        <p>Scan QR with any UPI App</p>
                      </div>
                      <p className="or-divider">OR</p>
                      <div className="form-group">
                        <label>Enter UPI ID</label>
                        <input type="text" className="form-input" placeholder="username@upi" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="fade-in">
                      <div className="form-group">
                        <label>Select Bank</label>
                        <select className="form-input">
                          <option>State Bank of India</option>
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary-section">
            <Card className="summary-card">
              <CardContent>
                <h3 className="section-title">Order Summary</h3>
                <div className="summary-details">
                  <div className="summary-row">
                    <span className="summary-label">Application Type</span>
                    <span className="summary-value">Fire NOC</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Applicant</span>
                    <span className="summary-value">ABC Foods Pvt. Ltd.</span>
                  </div>
                  <hr className="summary-divider" />
                  
                  <div className="summary-row">
                    <span className="summary-label">Processing Fee</span>
                    <span className="summary-value">₹2,500.00</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Government Portal Fee</span>
                    <span className="summary-value">₹100.00</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">GST (18%)</span>
                    <span className="summary-value">₹468.00</span>
                  </div>
                  
                  <hr className="summary-divider thick" />
                  <div className="summary-row total-row">
                    <span className="summary-label">Total Amount</span>
                    <span className="summary-value total-amount">₹3,068.00</span>
                  </div>
                </div>

                <div className="secure-badge">
                  <Lock size={16} />
                  <span>256-bit SSL Encrypted Payment</span>
                </div>

                <Button 
                  variant="primary" 
                  className="btn-pay-now" 
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="processing-text">
                      <span className="spinner"></span> Processing...
                    </span>
                  ) : (
                    <span>Pay ₹3,068.00 Securely <ShieldCheck size={18} style={{marginLeft: '8px', verticalAlign: 'middle'}}/></span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
