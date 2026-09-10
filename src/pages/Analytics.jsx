import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { BarChart3, TrendingUp, Download, Calendar, FileText, CheckCircle2, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import './Analytics.css';

// Mock Data for Charts
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const COMPLIANCE_DATA = [65, 70, 68, 75, 82, 85, 80, 88, 94, 0, 0, 0];
const EXPENSE_DATA = [12, 15, 8, 22, 14, 18, 25, 10, 45, 0, 0, 0]; // in thousands

const DATA_SOURCES = ['Compliance Health', 'Applications Pipeline', 'Financial Expenses', 'Audit Logs'];
const OUTPUT_FORMATS = ['PDF Report', 'Excel Spreadsheet', 'CSV Data'];

export function Analytics() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    source: 'Compliance Health',
    dateRange: 'Year to Date',
    format: 'PDF Report'
  });

  const handleGenerateReport = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate API delay for report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`${reportConfig.source} ${reportConfig.format} downloaded successfully.`);
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="analytics-container">
        
        {/* Header */}
        <div className="analytics-header">
          <div className="analytics-title-wrapper">
            <h1 className="page-title">Analytics & Reports</h1>
            <p className="page-subtitle">Visualize your compliance health, expenses, and generate custom reports.</p>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="kpi-grid fade-in-up">
          <Card className="kpi-card">
            <CardContent className="kpi-content">
              <div className="kpi-icon-wrapper text-success bg-success-light">
                <CheckCircle2 size={24} />
              </div>
              <div className="kpi-details">
                <span className="kpi-label">Overall Compliance Score</span>
                <h2 className="kpi-value">94%</h2>
                <span className="kpi-trend positive"><TrendingUp size={14}/> +6% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="kpi-card">
            <CardContent className="kpi-content">
              <div className="kpi-icon-wrapper text-primary bg-primary-light">
                <FileText size={24} />
              </div>
              <div className="kpi-details">
                <span className="kpi-label">Total Applications</span>
                <h2 className="kpi-value">28</h2>
                <span className="kpi-trend positive"><TrendingUp size={14}/> 4 pending approval</span>
              </div>
            </CardContent>
          </Card>

          <Card className="kpi-card">
            <CardContent className="kpi-content">
              <div className="kpi-icon-wrapper text-warning bg-warning-light">
                <DollarSign size={24} />
              </div>
              <div className="kpi-details">
                <span className="kpi-label">Govt Fees Paid (YTD)</span>
                <h2 className="kpi-value">₹1,69,000</h2>
                <span className="kpi-trend negative"><TrendingUp size={14} style={{transform: 'rotate(180deg)'}}/> +12% vs last year</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts Section */}
        <div className="charts-grid mt-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Chart 1: Compliance Health */}
          <Card className="chart-card">
            <div className="chart-header">
              <h3>Compliance Score Trend</h3>
            </div>
            <CardContent className="chart-content">
              <div className="bar-chart-container">
                {COMPLIANCE_DATA.map((val, idx) => (
                  <div key={idx} className="bar-wrapper">
                    <div className="bar-track">
                      <div 
                        className="bar-fill compliance-fill" 
                        style={{ height: `${val}%`, transitionDelay: `${idx * 50}ms` }}
                        title={`${val}%`}
                      ></div>
                    </div>
                    <span className="bar-label">{MONTHS[idx]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chart 2: Expenses */}
          <Card className="chart-card">
            <div className="chart-header">
              <h3>Monthly Expenses (₹ Thousands)</h3>
            </div>
            <CardContent className="chart-content">
              <div className="bar-chart-container">
                {EXPENSE_DATA.map((val, idx) => (
                  <div key={idx} className="bar-wrapper">
                    <div className="bar-track">
                      <div 
                        className="bar-fill expense-fill" 
                        style={{ height: `${(val / 50) * 100}%`, transitionDelay: `${idx * 50}ms` }}
                        title={`₹${val},000`}
                      ></div>
                    </div>
                    <span className="bar-label">{MONTHS[idx]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Custom Report Builder */}
        <Card className="report-builder-card mt-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="report-builder-header">
            <h3><BarChart3 size={20} className="text-primary"/> Custom Report Generator</h3>
            <p>Generate downloadable reports for stakeholders and management.</p>
          </div>
          <CardContent>
            <form className="report-form" onSubmit={handleGenerateReport}>
              <div className="form-row">
                <div className="form-group">
                  <label>Data Source</label>
                  <select 
                    value={reportConfig.source}
                    onChange={e => setReportConfig({...reportConfig, source: e.target.value})}
                  >
                    {DATA_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Date Range</label>
                  <select 
                    value={reportConfig.dateRange}
                    onChange={e => setReportConfig({...reportConfig, dateRange: e.target.value})}
                  >
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="Last Quarter">Last Quarter</option>
                    <option value="Year to Date">Year to Date</option>
                    <option value="Previous Year">Previous Year</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Output Format</label>
                  <select 
                    value={reportConfig.format}
                    onChange={e => setReportConfig({...reportConfig, format: e.target.value})}
                  >
                    {OUTPUT_FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>

              <div className="report-actions">
                <Button variant="primary" type="submit" disabled={isGenerating}>
                  {isGenerating ? (
                    <><span className="spinner-small" style={{ marginRight: '8px' }}></span> Compiling Data...</>
                  ) : (
                    <><Download size={18} style={{ marginRight: '8px' }} /> Generate Report</>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}
