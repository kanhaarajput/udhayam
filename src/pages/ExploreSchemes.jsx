import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Search, Filter, CheckCircle2, IndianRupee, ArrowRight, Lightbulb, Building, Users } from 'lucide-react';
import './ExploreSchemes.css';

// Mock Database of Government Schemes
const SCHEMES_DB = [
  {
    id: 's1',
    name: 'Prime Minister Employment Generation Programme (PMEGP)',
    department: 'Ministry of MSME',
    subsidy: 'Up to ₹25 Lakhs',
    description: 'Credit-linked subsidy scheme for generating employment opportunities through establishment of micro enterprises.',
    tags: ['Micro', 'Manufacturing', 'Services', 'Women', 'SC/ST']
  },
  {
    id: 's2',
    name: 'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)',
    department: 'Ministry of MSME',
    subsidy: 'Collateral-free Loan up to ₹200 Lakhs',
    description: 'Provides collateral-free credit to micro and small enterprise sector.',
    tags: ['Micro', 'Small', 'Manufacturing', 'Services']
  },
  {
    id: 's3',
    name: 'ZED Certification Scheme Subsidy',
    department: 'Ministry of MSME',
    subsidy: 'Up to 80% Subsidy on Certification',
    description: 'Financial assistance for obtaining ZED certification to improve quality and reduce environmental impact.',
    tags: ['Micro', 'Small', 'Medium', 'Manufacturing']
  },
  {
    id: 's4',
    name: 'Stand-Up India Scheme',
    department: 'Department of Financial Services',
    subsidy: 'Bank loan between ₹10 Lakhs & ₹1 Crore',
    description: 'Facilitates bank loans for setting up a greenfield enterprise by SC/ST or Women entrepreneurs.',
    tags: ['Manufacturing', 'Services', 'Agriculture', 'Women', 'SC/ST', 'Startup']
  },
  {
    id: 's5',
    name: 'Export Promotion Capital Goods (EPCG) Scheme',
    department: 'Ministry of Commerce',
    subsidy: 'Zero Customs Duty on Capital Goods',
    description: 'Facilitates import of capital goods for producing quality goods and services to enhance India\'s export competitiveness.',
    tags: ['Small', 'Medium', 'Manufacturing', 'Export']
  },
  {
    id: 's6',
    name: 'Agriculture Infrastructure Fund',
    department: 'Department of Agriculture',
    subsidy: '3% Interest Subvention',
    description: 'Medium-long term debt financing facility for investment in viable projects for post-harvest management infrastructure.',
    tags: ['Micro', 'Small', 'Medium', 'Agriculture']
  }
];

const FILTER_CATEGORIES = {
  size: { label: 'Business Size', options: ['Micro', 'Small', 'Medium'] },
  sector: { label: 'Sector', options: ['Manufacturing', 'Services', 'Agriculture'] },
  special: { label: 'Special Categories', options: ['Women', 'SC/ST', 'Startup', 'Export'] }
};

export function ExploreSchemes() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFilter = (tag) => {
    setSelectedFilters(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchQuery('');
  };

  // Matching Engine
  const matchedSchemes = useMemo(() => {
    let filtered = SCHEMES_DB;

    // Filter by text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q)
      );
    }

    // Sort by number of matching tags if filters are selected
    if (selectedFilters.length > 0) {
      filtered = filtered.map(scheme => {
        const matchedTags = scheme.tags.filter(tag => selectedFilters.includes(tag));
        return { ...scheme, matchCount: matchedTags.length, matchedTags };
      })
      // Only keep schemes that have at least one matching tag from the selected filters
      .filter(scheme => scheme.matchCount > 0)
      // Sort highest matches first
      .sort((a, b) => b.matchCount - a.matchCount);
    } else {
      // If no filters, just map them so they don't break the UI
      filtered = filtered.map(scheme => ({ ...scheme, matchCount: 0, matchedTags: [] }));
    }

    return filtered;
  }, [selectedFilters, searchQuery]);

  return (
    <DashboardLayout>
      <div className="schemes-container">
        
        {/* Header section */}
        <div className="schemes-header">
          <div className="schemes-title-wrapper">
            <h1 className="page-title">Schemes & Incentives Engine</h1>
            <p className="page-subtitle">Discover financial subsidies, grants, and tax benefits tailored to your business profile.</p>
          </div>
          <div className="schemes-search-bar">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by scheme name or keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Interactive Filter Engine */}
        <Card className="filter-engine-card">
          <CardContent className="filter-engine-content">
            <div className="filter-engine-header">
              <h3><Filter size={18} /> Tell us about your business</h3>
              {selectedFilters.length > 0 && (
                <button className="clear-filters-btn" onClick={clearFilters}>Clear All</button>
              )}
            </div>
            
            <div className="filter-categories-grid">
              {/* Size */}
              <div className="filter-category">
                <div className="category-title"><Building size={16} /> {FILTER_CATEGORIES.size.label}</div>
                <div className="filter-tags">
                  {FILTER_CATEGORIES.size.options.map(tag => (
                    <button 
                      key={tag} 
                      className={`filter-tag-btn ${selectedFilters.includes(tag) ? 'active' : ''}`}
                      onClick={() => toggleFilter(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sector */}
              <div className="filter-category">
                <div className="category-title"><Lightbulb size={16} /> {FILTER_CATEGORIES.sector.label}</div>
                <div className="filter-tags">
                  {FILTER_CATEGORIES.sector.options.map(tag => (
                    <button 
                      key={tag} 
                      className={`filter-tag-btn ${selectedFilters.includes(tag) ? 'active' : ''}`}
                      onClick={() => toggleFilter(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special */}
              <div className="filter-category">
                <div className="category-title"><Users size={16} /> {FILTER_CATEGORIES.special.label}</div>
                <div className="filter-tags">
                  {FILTER_CATEGORIES.special.options.map(tag => (
                    <button 
                      key={tag} 
                      className={`filter-tag-btn ${selectedFilters.includes(tag) ? 'active' : ''}`}
                      onClick={() => toggleFilter(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="results-header">
          <h2>Recommended Schemes ({matchedSchemes.length})</h2>
          {selectedFilters.length > 0 && (
            <span className="results-badge">Highly matched based on your profile</span>
          )}
        </div>

        <div className="schemes-grid">
          {matchedSchemes.length > 0 ? (
            matchedSchemes.map(scheme => (
              <Card key={scheme.id} className="scheme-card fade-in-up">
                <CardContent className="scheme-card-content">
                  
                  {/* Department & Match Badge */}
                  <div className="scheme-meta">
                    <span className="scheme-department">{scheme.department}</span>
                    {scheme.matchCount > 0 && (
                      <span className="match-badge">
                        <CheckCircle2 size={12} /> {scheme.matchCount} Matches
                      </span>
                    )}
                  </div>
                  
                  {/* Title & Subsidy */}
                  <h3 className="scheme-name">{scheme.name}</h3>
                  <div className="scheme-subsidy">
                    <div className="subsidy-icon"><IndianRupee size={20} /></div>
                    <span className="subsidy-text">{scheme.subsidy}</span>
                  </div>
                  
                  <p className="scheme-desc">{scheme.description}</p>
                  
                  {/* Tags */}
                  <div className="scheme-tags-container">
                    {scheme.tags.map(tag => {
                      const isMatched = scheme.matchedTags?.includes(tag);
                      return (
                        <span key={tag} className={`scheme-mini-tag ${isMatched ? 'highlight' : ''}`}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  <div className="scheme-actions">
                    <Button variant="outline" style={{ flex: 1 }}>Read Guidelines</Button>
                    <Button variant="primary" style={{ flex: 1 }}>Apply Now <ArrowRight size={16} style={{ marginLeft: '6px' }} /></Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="empty-schemes">
              <Lightbulb size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
              <h3>No schemes matched your exact criteria</h3>
              <p>Try clearing some filters or searching with different keywords.</p>
              <Button variant="outline" onClick={clearFilters} style={{ marginTop: '16px' }}>Clear Filters</Button>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
