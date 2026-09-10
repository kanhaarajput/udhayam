import { create } from 'zustand';

// Initial mock data
const initialApplications = [
  {
    id: 'APP-2023-8901',
    type: 'Fire NOC',
    date: 'Oct 25, 2023',
    status: 'Pending Review',
    variant: 'warning',
    entName: 'ABC Foods Pvt. Ltd.'
  },
  {
    id: 'APP-2023-8842',
    type: 'Site Inspection Clearance',
    date: 'Oct 20, 2023',
    status: 'Approved',
    variant: 'success',
    entName: 'TechNova Innovations'
  },
  {
    id: 'APP-2023-8710',
    type: 'Pollution Control Consent',
    date: 'Oct 15, 2023',
    status: 'Queries Raised',
    variant: 'error',
    entName: 'Sunrise Textiles'
  }
];

export const useAppStore = create((set) => ({
  language: 'en', // Default language
  theme: localStorage.getItem('theme') || 'light',
  hasCompletedOnboarding: false,
  applications: initialApplications,
  notifications: [
    {
      id: 'notif-1',
      title: 'Welcome to UdyamOne',
      message: 'Your entrepreneur profile has been created successfully.',
      time: 'Just now',
      read: false,
      link: '/dashboard',
      type: 'info'
    }
  ],
  vaultDocuments: [
    { id: 'doc-1', name: 'PAN_Card.pdf', type: 'PDF', size: '1.2 MB', date: '2023-10-01', folder: 'Identity Proofs' },
    { id: 'doc-2', name: 'Incorporation_Cert.pdf', type: 'PDF', size: '2.5 MB', date: '2023-10-05', folder: 'Business Registrations' },
    { id: 'doc-3', name: 'Factory_Layout.jpg', type: 'Image', size: '4.8 MB', date: '2023-10-12', folder: 'Blueprints' },
  ],
  businessProfile: {
    companyName: 'ABC Foods Pvt. Ltd.',
    registrationType: 'Private Limited',
    panNumber: 'ABCDE1234F',
    gstin: '27ABCDE1234F1Z5',
    email: 'contact@abcfoods.com',
    phone: '+91 98765 43210',
    address: '123 MIDC Industrial Area, Andheri East, Mumbai 400093',
    logoUrl: 'https://ui-avatars.com/api/?name=ABC+Foods&background=0D8ABC&color=fff'
  },
  
  // Settings & Security
  userSettings: {
    mfaEnabled: false,
    notifications: {
      approvals: { email: true, sms: true, push: true },
      queries: { email: true, sms: true, push: false },
      renewals: { email: true, sms: false, push: true },
      marketing: { email: false, sms: false, push: false },
    }
  },
  
  activeSessions: [
    { id: 'sess-1', device: 'Windows PC (Chrome)', location: 'Mumbai, IN', ip: '192.168.1.45', lastActive: 'Just now', current: true },
    { id: 'sess-2', device: 'iPhone 13 (Safari)', location: 'Pune, IN', ip: '117.204.6.12', lastActive: '2 hours ago', current: false },
    { id: 'sess-3', device: 'MacBook Pro (Firefox)', location: 'Delhi, IN', ip: '103.44.12.8', lastActive: '3 days ago', current: false }
  ],

  // Integrations Hub
  integrations: {
    'tally': { connected: false },
    'whatsapp': { connected: true },
    'razorpay': { connected: false },
    'slack': { connected: false },
    'digilocker': { connected: true }
  },

  // Team Management
  teamMembers: [
    { id: 'user-1', name: 'Lalit (You)', email: 'owner@abcfoods.com', role: 'Owner', status: 'Active', lastActive: 'Just now' },
    { id: 'user-2', name: 'Aditi Sharma', email: 'aditi.legal@abcfoods.com', role: 'Legal Advisor', status: 'Active', lastActive: '2 hrs ago' }
  ],
  
  // Action to switch language
  setLanguage: (lang) => set({ language: lang }),

  // Action to toggle theme
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  }),
  
  // Action to add a new application (Entrepreneur Flow)
  addApplication: (newApp) => set((state) => ({
    applications: [newApp, ...state.applications]
  })),

  // Action to update an application's status (Officer Flow)
  updateApplicationStatus: (id, newStatus, newVariant) => set((state) => ({
    applications: state.applications.map(app => 
      app.id === id ? { ...app, status: newStatus, variant: newVariant } : app
    )
  })),

  // Notifications
  addNotification: (notification) => set((state) => ({
    notifications: [{ id: Date.now().toString(), read: false, time: 'Just now', ...notification }, ...state.notifications]
  })),

  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
  })),

  // Vault Documents
  addVaultDocument: (doc) => set((state) => ({
    vaultDocuments: [{ id: Date.now().toString(), ...doc }, ...state.vaultDocuments]
  })),

  deleteVaultDocument: (id) => set((state) => ({
    vaultDocuments: state.vaultDocuments.filter(doc => doc.id !== id)
  })),

  // Business Profile
  updateBusinessProfile: (newProfileData) => set((state) => ({
    businessProfile: { ...state.businessProfile, ...newProfileData }
  })),

  // Settings & Security
  toggleMFA: (status) => set((state) => ({
    userSettings: { ...state.userSettings, mfaEnabled: status }
  })),

  updateNotificationPreferences: (category, type, value) => set((state) => ({
    userSettings: {
      ...state.userSettings,
      notifications: {
        ...state.userSettings.notifications,
        [category]: {
          ...state.userSettings.notifications[category],
          [type]: value
        }
      }
    }
  })),

  revokeSession: (id) => set((state) => ({
    activeSessions: state.activeSessions.filter(sess => sess.id !== id)
  })),

  // Integrations Hub
  toggleIntegration: (id, status) => set((state) => ({
    integrations: {
      ...state.integrations,
      [id]: { connected: status }
    }
  })),

  // Onboarding
  completeOnboarding: (data) => set((state) => ({
    hasCompletedOnboarding: true,
    businessProfile: { ...state.businessProfile, ...data.businessProfile },
    userSettings: {
      ...state.userSettings,
      notifications: {
        ...state.userSettings.notifications,
        approvals: { ...state.userSettings.notifications.approvals, ...data.notifications }
      }
    }
  })),

  // Team Management
  inviteTeamMember: (member) => set((state) => ({
    teamMembers: [...state.teamMembers, member]
  }))
}));
