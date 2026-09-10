import React, { useMemo } from 'react';
import { OfficerLayout } from '../../layouts/OfficerLayout';
import { Card, CardContent } from '../../components/Card';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, Legend
} from 'recharts';
import { Download, Filter } from 'lucide-react';
import { Button } from '../../components/Button';
import { useAppStore } from '../../store/useAppStore';
import './OfficerReports.css';

// Fixed processing SLA logic (mocked)
const processingSLAData = [
  { name: 'Fire NOC', avgDays: 12, targetSLA: 15 },
  { name: 'Trade License', avgDays: 22, targetSLA: 30 },
  { name: 'Shop Act', avgDays: 5, targetSLA: 7 },
  { name: 'Pollution NOC', avgDays: 18, targetSLA: 20 },
];

const COLORS = ['#16a34a', '#f97316', '#3b82f6', '#8b5cf6'];
const STATUS_COLORS = {
  'Approved': '#16a34a',
  'Pending Review': '#f97316',
  'Queries Raised': '#ef4444',
  'Rejected': '#64748b'
};

export function OfficerReports() {
  const applications = useAppStore((state) => state.applications);

  // Dynamic calculations based on global store
  const { statusData, monthlyData } = useMemo(() => {
    
    // Status Distribution
    const statusCount = {};
    const deptCount = {};
    
    applications.forEach(app => {
      statusCount[app.status] = (statusCount[app.status] || 0) + 1;
      deptCount[app.type] = (deptCount[app.type] || 0) + 1;
    });

    const calculatedStatusData = Object.keys(statusCount).map(key => ({
      name: key,
      value: statusCount[key]
    }));

    const calculatedDeptData = Object.keys(deptCount).map(key => ({
      name: key,
      value: deptCount[key]
    }));

    // Mock Area chart with dynamic total
    const dynamicMonthly = [
      { name: 'Jan', submitted: 40, approved: 24 },
      { name: 'Feb', submitted: 30, approved: 13 },
      { name: 'Mar', submitted: 20, approved: 18 },
      { name: 'Apr', submitted: 27, approved: 19 },
      { name: 'May', submitted: 18, approved: 12 },
      { name: 'Jun', submitted: 23, approved: 18 },
      { name: 'Jul', submitted: applications.length * 2, approved: applications.filter(a => a.status === 'Approved').length * 2 },
    ];

    return { 
      statusData: calculatedStatusData,
      departmentData: calculatedDeptData,
      monthlyData: dynamicMonthly
    };
  }, [applications]);

  return (
    <OfficerLayout>
      <div className="reports-dashboard">
        {/* Header */}
        <div className="reports-header">
          <div>
            <h1 className="page-title">Analytics Dashboard</h1>
            <p className="page-subtitle">Platform-wide insights and application metrics.</p>
          </div>
          <div className="reports-actions">
            <Button variant="outline"><Filter size={18} style={{marginRight: '8px'}} /> Filter</Button>
            <Button variant="primary" onClick={() => window.print()}><Download size={18} style={{marginRight: '8px'}} /> Export PDF</Button>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Main Area Chart */}
          <Card className="chart-card area-chart-card">
            <div className="chart-card-header">
              <h3>Application Volume (YTD)</h3>
            </div>
            <CardContent className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Area type="monotone" dataKey="submitted" stroke="#f97316" fillOpacity={1} fill="url(#colorSubmitted)" name="Submitted" />
                  <Area type="monotone" dataKey="approved" stroke="#16a34a" fillOpacity={1} fill="url(#colorApproved)" name="Approved" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bottom Row */}
          <div className="charts-bottom-row">
            {/* Donut Chart: Status Distribution */}
            <Card className="chart-card half-chart">
              <div className="chart-card-header">
                <h3>Current Status Distribution</h3>
              </div>
              <CardContent className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="chart-card half-chart">
              <div className="chart-card-header">
                <h3>Processing Times vs SLA</h3>
              </div>
              <CardContent className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={processingSLAData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                      cursor={{fill: 'var(--primary-50)'}}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="avgDays" fill="#3b82f6" name="Avg Processing Days" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="targetSLA" fill="#cbd5e1" name="Target SLA Limit" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </OfficerLayout>
  );
}
