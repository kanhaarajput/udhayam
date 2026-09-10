import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Globe } from 'lucide-react';
import './LanguageToggle.css';

export function LanguageToggle() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  return (
    <div className="language-toggle">
      <Globe size={16} className="text-secondary" />
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        className="language-select"
      >
        <option value="en">English</option>
        <option value="mr">मराठी</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );
}
