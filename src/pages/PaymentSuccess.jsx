import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { CheckCircle2, Download, ArrowRight, Receipt } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './PaymentSuccess.css';

export function PaymentSuccess() {
  const navigate = useNavigate();
  const addApplication = useAppStore((state) => state.addApplication);

  // When this component mounts, it means payment was successful. We add the app to the store.
  useEffect(() => {
    const newApp = {
      id: `APP-2023-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'Fire NOC',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending Review',
      variant: 'warning',
      entName: 'ABC Foods Pvt. Ltd.',
      district: 'Pune'
    };
    addApplication(newApp);
  }, [addApplication]);

  return (
    <DashboardLayout>
      <div className="success-page">
        <Card className="success-card">
          <CardContent className="success-content">
            <div className="success-icon-wrapper fade-in-scale">
              <CheckCircle2 size={64} className="text-success" />
            </div>
            
            <h1 className="success-title fade-in-up">Payment Successful!</h1>
            <p className="success-subtitle fade-in-up" style={{animationDelay: '0.1s'}}>
              Your application fee has been processed securely. Your application is now in the queue for officer review.
            </p>

            <div className="receipt-box fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="receipt-header">
                <Receipt size={20} />
                <span>Transaction Receipt</span>
              </div>
              <div className="receipt-details">
                <div className="receipt-row">
                  <span className="label">Transaction ID:</span>
                  <span className="value">TXN-{Math.floor(10000000 + Math.random() * 90000000)}</span>
                </div>
                <div className="receipt-row">
                  <span className="label">Date & Time:</span>
                  <span className="value">{new Date().toLocaleString()}</span>
                </div>
                <div className="receipt-row">
                  <span className="label">Amount Paid:</span>
                  <span className="value text-primary font-bold">₹3,068.00</span>
                </div>
                <div className="receipt-row">
                  <span className="label">Payment Method:</span>
                  <span className="value">Credit Card (**** 1234)</span>
                </div>
              </div>
            </div>

            <div className="success-actions fade-in-up" style={{animationDelay: '0.3s'}}>
              <Button variant="outline"><Download size={18} style={{marginRight: '8px'}} /> Download Invoice</Button>
              <Button variant="primary" onClick={() => navigate('/tracking')}>
                Track Application <ArrowRight size={18} style={{marginLeft: '8px'}} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
