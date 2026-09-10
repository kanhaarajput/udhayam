import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, CheckSquare, ShieldAlert, Settings, LayoutDashboard, Compass, LogOut, LifeBuoy, FolderLock, File, ImageIcon } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './CommandPalette.css';

const NAVIGATION_COMMANDS = [
  { id: 'dashboard', name: 'Go to Dashboard', path: '/dashboard', icon: LayoutDashboard, category: 'Navigation' },
  { id: 'vault', name: 'Document Vault', path: '/vault', icon: FolderLock, category: 'Navigation' },
  { id: 'approvals', name: 'Find Approvals', path: '/find-approvals', icon: Search, category: 'Navigation' },
  { id: 'tracking', name: 'Track Applications', path: '/tracking', icon: FileText, category: 'Navigation' },
  { id: 'schemes', name: 'Explore Schemes', path: '/schemes', icon: Compass, category: 'Navigation' },
  { id: 'calendar', name: 'Compliance Calendar', path: '/calendar', icon: CheckSquare, category: 'Navigation' },
  { id: 'helpdesk', name: 'Help & Support', path: '/helpdesk', icon: LifeBuoy, category: 'Navigation' },
  { id: 'settings', name: 'Account Settings', path: '/settings', icon: Settings, category: 'Navigation' },
  { id: 'officer-dashboard', name: 'Officer Dashboard', path: '/officer/dashboard', icon: ShieldAlert, category: 'Navigation' },
  { id: 'logout', name: 'Logout', path: '/', icon: LogOut, category: 'Navigation' },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Pull global state
  const applications = useAppStore(state => state.applications);
  const vaultDocuments = useAppStore(state => state.vaultDocuments);

  // Dynamic Search Logic
  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return NAVIGATION_COMMANDS.slice(0, 5); // Show top 5 default commands when empty
    }

    const q = query.toLowerCase();
    const results = [];

    // 1. Search Navigation
    const navResults = NAVIGATION_COMMANDS.filter(cmd => cmd.name.toLowerCase().includes(q));
    results.push(...navResults);

    // 2. Search Applications
    const appResults = applications.filter(app => 
      app.id.toLowerCase().includes(q) || 
      app.type.toLowerCase().includes(q) || 
      app.entName.toLowerCase().includes(q)
    ).map(app => ({
      id: `app-${app.id}`,
      name: `${app.id} - ${app.type}`,
      subtitle: app.entName,
      path: `/tracking/details/${app.id}`,
      icon: FileText,
      category: 'Applications'
    }));
    results.push(...appResults);

    // 3. Search Documents
    const docResults = vaultDocuments.filter(doc => 
      doc.name.toLowerCase().includes(q)
    ).map(doc => ({
      id: `doc-${doc.id}`,
      name: doc.name,
      subtitle: doc.folder,
      path: '/vault',
      icon: doc.type === 'PDF' ? FileText : File,
      category: 'Documents'
    }));
    results.push(...docResults);

    return results;
  }, [query, applications, vaultDocuments]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle modal on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      
      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset selected index when query changes to prevent out of bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults.length]);

  const handleExecute = (path) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  const handleModalKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % searchResults.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    }
    if (e.key === 'Enter' && searchResults[selectedIndex]) {
      e.preventDefault();
      handleExecute(searchResults[selectedIndex].path);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay" onClick={() => setIsOpen(false)}>
      <div 
        className="command-palette-modal fade-in-scale" 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleModalKeyDown}
      >
        <div className="command-input-wrapper">
          <Search size={20} className="command-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="command-input"
            placeholder="Search applications, documents, or commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="command-shortcut">ESC</div>
        </div>

        <div className="command-results">
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => {
              const Icon = item.icon;
              // Add a category header if this is the first item of its category
              const isFirstOfCategory = index === 0 || searchResults[index - 1].category !== item.category;
              
              return (
                <React.Fragment key={item.id}>
                  {isFirstOfCategory && query && (
                    <div className="command-category-header">{item.category}</div>
                  )}
                  <div
                    className={`command-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleExecute(item.path)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <Icon size={18} className="command-item-icon" />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="command-item-name">{item.name}</span>
                      {item.subtitle && <span className="command-item-subtitle">{item.subtitle}</span>}
                    </div>
                    {index === selectedIndex && (
                      <span className="command-item-hint">Jump to</span>
                    )}
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <div className="command-empty">No results found for "{query}"</div>
          )}
        </div>
      </div>
    </div>
  );
}
