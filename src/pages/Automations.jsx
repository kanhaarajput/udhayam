import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Zap, Plus, Play, Pause, Activity, 
  ArrowRight, FileCheck, Mail, Database, Server, Webhook
} from 'lucide-react';
import toast from 'react-hot-toast';
import './Automations.css';

const TRIGGERS = [
  { id: 't1', label: 'Application Approved', icon: <FileCheck size={16}/> },
  { id: 't2', label: 'Document Uploaded', icon: <Database size={16}/> },
  { id: 't3', label: 'Payment Failed', icon: <Server size={16}/> },
  { id: 't4', label: 'License Expiring (7 Days)', icon: <Activity size={16}/> }
];

const ACTIONS = [
  { id: 'a1', label: 'Send Email to Team', icon: <Mail size={16}/> },
  { id: 'a2', label: 'Upload to Vault', icon: <Database size={16}/> },
  { id: 'a3', label: 'Trigger Webhook', icon: <Webhook size={16}/> },
  { id: 'a4', label: 'Alert Account Manager', icon: <Mail size={16}/> }
];

export function Automations() {
  const [automations, setAutomations] = useState([
    { id: 'auto-1', name: 'Auto-Archive Expired Licenses', trigger: 'License Expiring (7 Days)', action: 'Upload to Vault', active: true, runs: 14 },
    { id: 'auto-2', name: 'Alert CFO on Payment Failure', trigger: 'Payment Failed', action: 'Send Email to Team', active: true, runs: 2 },
    { id: 'auto-3', name: 'Sync Approved Apps to ERP', trigger: 'Application Approved', action: 'Trigger Webhook', active: false, runs: 0 }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // New Automation State
  const [newName, setNewName] = useState('');
  const [selectedTrigger, setSelectedTrigger] = useState(TRIGGERS[0].label);
  const [selectedAction, setSelectedAction] = useState(ACTIONS[0].label);

  const toggleAutomation = (id) => {
    setAutomations(automations.map(a => {
      if (a.id === id) {
        const newState = !a.active;
        toast.success(`Automation ${newState ? 'enabled' : 'disabled'}`);
        return { ...a, active: newState };
      }
      return a;
    }));
  };

  const handleCreateAutomation = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error('Please name your automation.');
      return;
    }

    setIsSaving(true);
    
    setTimeout(() => {
      setAutomations([
        { 
          id: `auto-${Date.now()}`, 
          name: newName, 
          trigger: selectedTrigger, 
          action: selectedAction, 
          active: true, 
          runs: 0 
        },
        ...automations
      ]);
      setIsSaving(false);
      setIsModalOpen(false);
      setNewName('');
      toast.success('Automation created successfully!');
    }, 1200);
  };

  const getTriggerIcon = (label) => TRIGGERS.find(t => t.label === label)?.icon || <Activity size={16}/>;
  const getActionIcon = (label) => ACTIONS.find(a => a.label === label)?.icon || <Zap size={16}/>;

  return (
    <DashboardLayout>
      <div className="automations-container">
        
        {/* Header */}
        <div className="automations-header">
          <div className="automations-title-wrapper">
            <h1 className="page-title">Workflow Automations</h1>
            <p className="page-subtitle">Automate compliance tasks with powerful If-This-Then-That rules.</p>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} style={{ marginRight: '8px' }} /> Create Automation
          </Button>
        </div>

        {/* Layout Grid */}
        <div className="automations-layout">
          
          {/* Main Content: Active Workflows */}
          <div className="automations-main">
            <div className="auto-grid fade-in-up">
              {automations.map(auto => (
                <Card key={auto.id} className={`auto-card ${!auto.active ? 'disabled' : ''}`}>
                  <CardContent className="auto-card-content">
                    <div className="auto-card-header">
                      <h3>{auto.name}</h3>
                      <div className="toggle-switch" onClick={() => toggleAutomation(auto.id)}>
                        <div className={`toggle-track ${auto.active ? 'active' : ''}`}>
                          <div className="toggle-thumb"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="auto-flow">
                      <div className="flow-step trigger">
                        <div className="flow-icon">{getTriggerIcon(auto.trigger)}</div>
                        <div className="flow-text">
                          <span>WHEN</span>
                          <strong>{auto.trigger}</strong>
                        </div>
                      </div>
                      
                      <div className="flow-arrow">
                        <ArrowRight size={20} className="text-muted"/>
                      </div>
                      
                      <div className="flow-step action">
                        <div className="flow-icon">{getActionIcon(auto.action)}</div>
                        <div className="flow-text">
                          <span>THEN</span>
                          <strong>{auto.action}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="auto-card-footer">
                      <span className="run-count">
                        <Activity size={14}/> {auto.runs} runs
                      </span>
                      <span className={`status-badge ${auto.active ? 'active' : ''}`}>
                        {auto.active ? <><Play size={12}/> Active</> : <><Pause size={12}/> Paused</>}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar: Execution Logs */}
          <div className="automations-sidebar fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card className="logs-card">
              <div className="logs-header">
                <h3>Execution Logs</h3>
              </div>
              <CardContent className="logs-content p-0">
                <div className="log-list">
                  <div className="log-item success">
                    <div className="log-indicator"></div>
                    <div className="log-details">
                      <strong>Auto-Archive Expired Licenses</strong>
                      <span>Successfully ran 2 mins ago</span>
                    </div>
                  </div>
                  <div className="log-item success">
                    <div className="log-indicator"></div>
                    <div className="log-details">
                      <strong>Alert CFO on Payment Failure</strong>
                      <span>Successfully ran 1 hour ago</span>
                    </div>
                  </div>
                  <div className="log-item error">
                    <div className="log-indicator"></div>
                    <div className="log-details">
                      <strong>Sync Approved Apps to ERP</strong>
                      <span>Failed: Webhook timeout (Yesterday)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Visual Rule Builder Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content builder-modal bounce-in">
              <div className="modal-header">
                <h2><Zap size={20} className="text-warning"/> Create Automation</h2>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
              </div>
              <form onSubmit={handleCreateAutomation} className="modal-body builder-body">
                
                <div className="form-group">
                  <label>Automation Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Notify Team on Approval" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>

                <div className="builder-flow mt-6">
                  {/* WHEN Section */}
                  <div className="builder-section">
                    <div className="bs-label">WHEN (Trigger)</div>
                    <div className="bs-options">
                      {TRIGGERS.map(t => (
                        <div 
                          key={t.id} 
                          className={`bs-option ${selectedTrigger === t.label ? 'selected' : ''}`}
                          onClick={() => setSelectedTrigger(t.label)}
                        >
                          {t.icon} {t.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="builder-arrow">
                    <ArrowRight size={24} className="text-muted"/>
                  </div>

                  {/* THEN Section */}
                  <div className="builder-section">
                    <div className="bs-label">THEN (Action)</div>
                    <div className="bs-options">
                      {ACTIONS.map(a => (
                        <div 
                          key={a.id} 
                          className={`bs-option ${selectedAction === a.label ? 'selected' : ''}`}
                          onClick={() => setSelectedAction(a.label)}
                        >
                          {a.icon} {a.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-actions mt-6 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving Rule...' : 'Save & Enable'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
