import React from 'react';
import { X, CheckCircle2, AlertTriangle, Info, Clock } from 'lucide-react';
import './NotificationsDrawer.css';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'success',
    title: 'Fire NOC Approved',
    message: 'Your application APP-2023-8901 has been officially approved.',
    time: '10 mins ago',
    icon: CheckCircle2,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Compliance Deadline',
    message: 'GST Filing for Q3 is due in 5 days. Please submit to avoid penalties.',
    time: '2 hours ago',
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: 'info',
    title: 'New Scheme Available',
    message: 'You may be eligible for the Green Tech Subsidy 2024. Tap to explore.',
    time: '1 day ago',
    icon: Info,
  },
  {
    id: 4,
    type: 'default',
    title: 'System Maintenance',
    message: 'The portal will be down for maintenance this Sunday from 2 AM to 4 AM.',
    time: '2 days ago',
    icon: Clock,
  }
];

export function NotificationsDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay fade-in" onClick={onClose} />
      <div className="notifications-drawer slide-in-right">
        <div className="drawer-header">
          <div className="header-title">
            <h3>Notifications</h3>
            <span className="badge">3 New</span>
          </div>
          <button className="icon-btn close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {MOCK_NOTIFICATIONS.map((notif) => {
            const Icon = notif.icon;
            return (
              <div key={notif.id} className={`notification-item ${notif.type}`}>
                <div className="notif-icon-wrapper">
                  <Icon size={20} />
                </div>
                <div className="notif-content">
                  <h4>{notif.title}</h4>
                  <p>{notif.message}</p>
                  <span className="notif-time">{notif.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="drawer-footer">
          <button className="btn-text">Mark all as read</button>
        </div>
      </div>
    </>
  );
}
