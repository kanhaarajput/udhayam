import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Folder, FileText, Image as ImageIcon, File, UploadCloud, 
  MoreVertical, Download, Share2, Trash2, LayoutGrid, List, Search
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './DocumentVault.css';

const FOLDERS = ['All Documents', 'Identity Proofs', 'Business Registrations', 'Blueprints', 'Archived'];

export function DocumentVault() {
  const documents = useAppStore(state => state.vaultDocuments);
  const addVaultDocument = useAppStore(state => state.addVaultDocument);
  const deleteVaultDocument = useAppStore(state => state.deleteVaultDocument);
  
  const [activeFolder, setActiveFolder] = useState('All Documents');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const filteredDocs = documents.filter(doc => {
    const matchesFolder = activeFolder === 'All Documents' || doc.folder === activeFolder;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const getFileIcon = (type) => {
    switch(type) {
      case 'PDF': return <FileText size={40} color="var(--error-500)" />;
      case 'Image': return <ImageIcon size={40} color="var(--primary-500)" />;
      default: return <File size={40} color="var(--text-muted)" />;
    }
  };

  const handleSimulatedUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          addVaultDocument({
            name: `New_Document_${Math.floor(Math.random() * 1000)}.pdf`,
            type: 'PDF',
            size: '2.1 MB',
            date: new Date().toISOString().split('T')[0],
            folder: activeFolder === 'All Documents' ? 'Identity Proofs' : activeFolder
          });
          setIsUploadModalOpen(false);
          setUploadProgress(0);
        }, 500);
      }
    }, 200);
  };

  return (
    <DashboardLayout>
      <div className="vault-container">
        
        {/* Sidebar */}
        <aside className="vault-sidebar">
          <Button 
            variant="primary" 
            style={{ width: '100%', marginBottom: 'var(--spacing-xl)', justifyContent: 'center' }}
            onClick={() => setIsUploadModalOpen(true)}
          >
            <UploadCloud size={18} style={{ marginRight: '8px' }} /> Upload New
          </Button>

          <h3 className="vault-sidebar-title">Folders</h3>
          <nav className="vault-nav">
            {FOLDERS.map(folder => (
              <button 
                key={folder}
                className={`vault-nav-item ${activeFolder === folder ? 'active' : ''}`}
                onClick={() => setActiveFolder(folder)}
              >
                <Folder size={18} fill={activeFolder === folder ? 'var(--primary-500)' : 'transparent'} />
                {folder}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="vault-main">
          {/* Header */}
          <div className="vault-header">
            <div>
              <h1 className="page-title">{activeFolder}</h1>
              <p className="page-subtitle">{filteredDocs.length} items</p>
            </div>
            
            <div className="vault-toolbar">
              <div className="vault-search">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Search files..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="view-toggle">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''} 
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''} 
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Files */}
          {filteredDocs.length === 0 ? (
            <div className="vault-empty">
              <Folder size={64} color="var(--text-muted)" />
              <h3>No documents found</h3>
              <p>Upload a document to get started.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="vault-grid">
              {filteredDocs.map(doc => (
                <Card key={doc.id} className="file-card">
                  <CardContent className="file-card-content">
                    <div className="file-card-icon">
                      {getFileIcon(doc.type)}
                    </div>
                    <h4 className="file-name" title={doc.name}>{doc.name}</h4>
                    <p className="file-meta">{doc.size} • {doc.date}</p>
                    
                    <div className="file-actions-overlay">
                      <button className="action-btn" title="Download"><Download size={16} /></button>
                      <button className="action-btn" title="Share"><Share2 size={16} /></button>
                      <button className="action-btn delete" title="Delete" onClick={() => deleteVaultDocument(doc.id)}><Trash2 size={16} /></button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="vault-list">
              <table className="vault-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date Modified</th>
                    <th>Size</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocs.map(doc => (
                    <tr key={doc.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {doc.type === 'PDF' ? <FileText size={20} color="var(--error-500)"/> : <ImageIcon size={20} color="var(--primary-500)"/>}
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td>{doc.date}</td>
                      <td>{doc.size}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                           <button className="action-btn-sm text-primary-600"><Download size={16} /></button>
                           <button className="action-btn-sm text-error" onClick={() => deleteVaultDocument(doc.id)}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="vault-modal-overlay">
          <div className="vault-modal">
            <div className="vault-modal-header">
              <h3>Upload Document</h3>
              <button className="close-btn" onClick={() => setIsUploadModalOpen(false)}>×</button>
            </div>
            
            <div className="vault-modal-body">
              {uploadProgress > 0 ? (
                <div className="upload-progress-container">
                  <div className="spinner"></div>
                  <p>Uploading... {uploadProgress}%</p>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              ) : (
                <div 
                  className="drag-drop-zone"
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); }}
                  onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); handleSimulatedUpload(); }}
                >
                  <UploadCloud size={48} color="var(--primary-500)" style={{ marginBottom: '16px' }} />
                  <h4>Drag and drop files here</h4>
                  <p>or click to browse from your computer</p>
                  <Button variant="primary" style={{ marginTop: '24px' }} onClick={handleSimulatedUpload}>
                    Browse Files
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
