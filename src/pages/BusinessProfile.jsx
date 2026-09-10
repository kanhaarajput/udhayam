import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { Camera, CheckCircle, Save, Building, FileText, MapPin, Mail, Phone, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import './BusinessProfile.css';

export function BusinessProfile() {
  const profile = useAppStore(state => state.businessProfile);
  const updateProfile = useAppStore(state => state.updateBusinessProfile);
  
  const [formData, setFormData] = useState(profile);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Simulated Progress based on fields filled
  const calculateProgress = () => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(f => f && f.toString().trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };
  
  const progress = calculateProgress();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData);
    toast.success('Business Profile updated successfully!');
  };

  const handleSimulatedAvatarUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      // Simulate changing logo by updating the background color in the UI Avatar API
      const randomColor = Math.floor(Math.random()*16777215).toString(16);
      const newLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.companyName)}&background=${randomColor}&color=fff`;
      setFormData(prev => ({ ...prev, logoUrl: newLogo }));
      updateProfile({ logoUrl: newLogo });
      setIsUploading(false);
      toast.success('Company logo updated!');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="profile-container">
        
        {/* Header & Avatar */}
        <div className="profile-header">
          <div 
            className="avatar-container" 
            onMouseEnter={() => setIsHoveringAvatar(true)}
            onMouseLeave={() => setIsHoveringAvatar(false)}
            onClick={handleSimulatedAvatarUpload}
          >
            <img src={formData.logoUrl} alt="Company Logo" className="avatar-img" />
            {(isHoveringAvatar || isUploading) && (
              <div className="avatar-overlay">
                {isUploading ? <div className="spinner-sm"></div> : <Camera size={24} color="white" />}
              </div>
            )}
          </div>
          <div className="profile-title">
            <h1 className="page-title">{profile.companyName}</h1>
            <p className="page-subtitle">Manage your business identity and tax information.</p>
          </div>
          <div className="profile-actions">
            <Button variant="primary" onClick={handleSave}>
              <Save size={18} style={{ marginRight: '8px' }} /> Save Changes
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="progress-card">
          <CardContent className="progress-content">
            <div className="progress-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={20} color={progress === 100 ? 'var(--success-600)' : 'var(--primary-600)'} />
                <h3 style={{ margin: 0 }}>Profile Completion</h3>
              </div>
              <span className="progress-text">{progress}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: progress === 100 ? 'var(--success-500)' : 'var(--primary-600)' }}></div>
            </div>
            {progress < 100 && <p className="progress-hint">Complete all fields to unlock fast-tracked applications.</p>}
          </CardContent>
        </Card>

        {/* Form Sections Grid */}
        <div className="profile-grid">
          
          {/* Column 1: Company & Tax */}
          <div className="profile-col">
            <Card className="form-card">
              <div className="form-card-header">
                <Building size={18} />
                <h3>Company Details</h3>
              </div>
              <CardContent>
                <div className="form-group">
                  <label>Registered Company Name</label>
                  <input 
                    type="text" 
                    name="companyName" 
                    value={formData.companyName} 
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Registration Type</label>
                  <select 
                    name="registrationType" 
                    value={formData.registrationType} 
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="Private Limited">Private Limited</option>
                    <option value="Public Limited">Public Limited</option>
                    <option value="LLP">LLP</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="form-card">
              <div className="form-card-header">
                <FileText size={18} />
                <h3>Tax Information</h3>
              </div>
              <CardContent>
                <div className="form-group">
                  <label>PAN Number</label>
                  <input 
                    type="text" 
                    name="panNumber" 
                    value={formData.panNumber} 
                    onChange={handleInputChange}
                    className="form-input text-uppercase"
                    maxLength={10}
                  />
                </div>
                <div className="form-group">
                  <label>GSTIN</label>
                  <input 
                    type="text" 
                    name="gstin" 
                    value={formData.gstin} 
                    onChange={handleInputChange}
                    className="form-input text-uppercase"
                    maxLength={15}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Column 2: Contact & Address */}
          <div className="profile-col">
            <Card className="form-card">
              <div className="form-card-header">
                <Mail size={18} />
                <h3>Contact Details</h3>
              </div>
              <CardContent>
                <div className="form-row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Corporate Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="form-card">
              <div className="form-card-header">
                <MapPin size={18} />
                <h3>Registered Office Address</h3>
              </div>
              <CardContent>
                <div className="form-group">
                  <label>Full Address</label>
                  <textarea 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange}
                    className="form-input form-textarea"
                    rows={4}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>State</label>
                    <select className="form-input" disabled>
                      <option>Maharashtra</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>PIN Code</label>
                    <input 
                      type="text" 
                      placeholder="400093"
                      className="form-input"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
