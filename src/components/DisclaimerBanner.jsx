import React from 'react';
import { AlertTriangle, PhoneCall, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../data/legalKnowledge';

export default function DisclaimerBanner({ lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="disclaimer-banner">
      <div className="disclaimer-content">
        <div className="disclaimer-badge">
          <ShieldCheck size={16} className="text-gold" />
          <span>{t.badgeLaw}</span>
        </div>
        <div className="disclaimer-text">
          <AlertTriangle size={15} className="text-warning flex-shrink-0" />
          <span>{t.disclaimer}</span>
        </div>
      </div>
      <div className="emergency-quick-pill">
        <PhoneCall size={14} className="pulse-icon" />
        <a href="tel:1930" className="emergency-link">
          <strong>Cyber Fraud: 1930</strong>
        </a>
        <span className="pill-divider">|</span>
        <a href="tel:112" className="emergency-link">
          <strong>Police: 112</strong>
        </a>
        <span className="pill-divider">|</span>
        <a href="tel:15100" className="emergency-link">
          <strong>Legal Aid: 15100</strong>
        </a>
      </div>
    </div>
  );
}
