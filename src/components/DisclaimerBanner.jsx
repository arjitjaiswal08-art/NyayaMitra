import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, ShieldCheck, X } from 'lucide-react';
import { TRANSLATIONS } from '../data/legalKnowledge';

export default function DisclaimerBanner({ lang = 'en' }) {
  const [isDismissed, setIsDismissed] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  if (isDismissed) return null;

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
          <strong>{(t.nav && t.nav.cyberDial) || 'Cyber Fraud'}: 1930</strong>
        </a>
        <span className="pill-divider">|</span>
        <a href="tel:112" className="emergency-link">
          <strong>{(t.nav && t.nav.policeDial) || 'Police'}: 112</strong>
        </a>
        <span className="pill-divider">|</span>
        <a href="tel:15100" className="emergency-link">
          <strong>{(t.nav && t.nav.legalAidDial) || 'Legal Aid'}: 15100</strong>
        </a>
      </div>
      <button
        type="button"
        onClick={() => setIsDismissed(true)}
        className="disclaimer-close-btn"
        title="Dismiss notice"
        aria-label="Dismiss disclaimer"
        style={{
          background: 'none',
          border: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
