import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Terminal, Key, Copy, Eye, EyeOff, Plus, Webhook, Trash2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import './DeveloperAPI.css';

const CODE_SNIPPETS = {
  cURL: `curl -X GET https://api.udyamone.com/v1/applications \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  Node: `const axios = require('axios');

const response = await axios.get('https://api.udyamone.com/v1/applications', {
  headers: {
    'Authorization': 'Bearer sk_live_YOUR_API_KEY'
  }
});

console.log(response.data);`,
  Python: `import requests

url = "https://api.udyamone.com/v1/applications"
headers = {
    "Authorization": "Bearer sk_live_YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())`
};

export function DeveloperAPI() {
  const [apiKeys, setApiKeys] = useState([
    { id: 'key-1', name: 'Production ERP Integration', token: 'sk_live_1a2b3c4d5e6f7g8h', created: '2026-08-15', lastUsed: '2 mins ago', active: true }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState('Read-Only');
  
  const [visibleKeys, setVisibleKeys] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('cURL');
  const [webhookUrl, setWebhookUrl] = useState('https://myapp.com/api/webhooks/udyamone');
  const [isSavingWebhook, setIsSavingWebhook] = useState(false);

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleGenerateKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) {
      toast.error('Please provide a name for the API Key.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate cryptographic delay
    setTimeout(() => {
      const newToken = `sk_live_${Math.random().toString(36).substr(2, 16)}`;
      setApiKeys([
        ...apiKeys, 
        { 
          id: `key-${Date.now()}`, 
          name: newKeyName, 
          token: newToken, 
          created: new Date().toISOString().split('T')[0], 
          lastUsed: 'Never', 
          active: true 
        }
      ]);
      setIsGenerating(false);
      setIsModalOpen(false);
      setNewKeyName('');
      toast.success('New API Key generated successfully!');
    }, 1500);
  };

  const handleDeleteKey = (id) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    toast.success('API Key revoked successfully.');
  };

  const handleSaveWebhook = () => {
    setIsSavingWebhook(true);
    setTimeout(() => {
      setIsSavingWebhook(false);
      toast.success('Webhook endpoint saved and verified!');
    }, 1200);
  };

  return (
    <DashboardLayout>
      <div className="dev-container">
        
        {/* Header */}
        <div className="dev-header">
          <div className="dev-title-wrapper">
            <h1 className="page-title">Developer API</h1>
            <p className="page-subtitle">Programmatically access your compliance data and manage webhooks.</p>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} style={{ marginRight: '8px' }} /> Generate New Key
          </Button>
        </div>

        {/* API Keys Table */}
        <Card className="dev-card fade-in-up">
          <div className="dev-card-header">
            <h3><Key size={20} className="text-primary"/> API Keys</h3>
            <span className="dev-count">{apiKeys.length} Active Keys</span>
          </div>
          <CardContent className="dev-card-content p-0">
            <div className="table-responsive">
              <table className="dev-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Secret Key</th>
                    <th>Created</th>
                    <th>Last Used</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.length > 0 ? (
                    apiKeys.map(key => (
                      <tr key={key.id}>
                        <td>
                          <strong>{key.name}</strong>
                        </td>
                        <td>
                          <div className="key-display-wrapper">
                            <code className="api-key-code">
                              {visibleKeys[key.id] ? key.token : 'sk_live_••••••••••••••••'}
                            </code>
                            <button className="icon-btn-small" onClick={() => toggleKeyVisibility(key.id)}>
                              {visibleKeys[key.id] ? <EyeOff size={14}/> : <Eye size={14}/>}
                            </button>
                            <button className="icon-btn-small" onClick={() => copyToClipboard(key.token)}>
                              <Copy size={14}/>
                            </button>
                          </div>
                        </td>
                        <td>{key.created}</td>
                        <td className="text-muted">{key.lastUsed}</td>
                        <td align="right">
                          <button className="icon-btn-danger" onClick={() => handleDeleteKey(key.id)} title="Revoke Key">
                            <Trash2 size={16}/>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        No active API keys. Generate one to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start & Webhooks Grid */}
        <div className="dev-grid mt-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Quick Start Terminal */}
          <Card className="dev-card terminal-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-tabs">
                {Object.keys(CODE_SNIPPETS).map(lang => (
                  <button 
                    key={lang}
                    className={`terminal-tab ${selectedLanguage === lang ? 'active' : ''}`}
                    onClick={() => setSelectedLanguage(lang)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <div className="terminal-body">
              <pre><code>{CODE_SNIPPETS[selectedLanguage]}</code></pre>
              <button className="copy-code-btn" onClick={() => copyToClipboard(CODE_SNIPPETS[selectedLanguage])}>
                <Copy size={16} />
              </button>
            </div>
          </Card>

          {/* Webhooks Config */}
          <Card className="dev-card">
            <div className="dev-card-header">
              <h3><Webhook size={20} className="text-success"/> Webhooks</h3>
            </div>
            <CardContent className="dev-card-content">
              <p className="webhook-desc">
                Listen for real-time events. We will send a POST request to your endpoint whenever an application status changes or a document is uploaded.
              </p>
              
              <div className="form-group mt-4">
                <label>Endpoint URL</label>
                <input 
                  type="url" 
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="webhook-events mt-4">
                <h4>Events to send</h4>
                <div className="checkbox-grid">
                  <label><input type="checkbox" defaultChecked /> application.submitted</label>
                  <label><input type="checkbox" defaultChecked /> application.approved</label>
                  <label><input type="checkbox" defaultChecked /> document.uploaded</label>
                  <label><input type="checkbox" /> document.expiring</label>
                  <label><input type="checkbox" /> invoice.paid</label>
                  <label><input type="checkbox" /> team.member_added</label>
                </div>
              </div>

              <div className="webhook-actions mt-6">
                <Button variant="primary" onClick={handleSaveWebhook} disabled={isSavingWebhook}>
                  {isSavingWebhook ? 'Verifying Endpoint...' : 'Save Webhook Configuration'}
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Generate Key Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content dev-modal bounce-in">
              <div className="modal-header">
                <h2>Generate API Key</h2>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
              </div>
              <form onSubmit={handleGenerateKey} className="modal-body">
                <p className="modal-desc">
                  This key will grant programmatic access to your UdyamOne workspace. Keep it secure.
                </p>
                
                <div className="form-group mt-4">
                  <label>Key Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Internal Admin Dashboard" 
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
                
                <div className="form-group mt-4">
                  <label>Permissions</label>
                  <select 
                    value={newKeyPermissions}
                    onChange={(e) => setNewKeyPermissions(e.target.value)}
                  >
                    <option value="Read-Only">Read-Only (Fetch data only)</option>
                    <option value="Full Access">Full Access (Read and Write)</option>
                  </select>
                </div>

                <div className="modal-actions mt-6">
                  <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" type="submit" disabled={isGenerating}>
                    {isGenerating ? 'Generating Token...' : 'Generate API Key'}
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
