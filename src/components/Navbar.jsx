import React, { useState, useEffect } from 'react';
import { 
  Scale, ShieldAlert, FileText, Search, BookOpen, MapPin, 
  UserCheck, Languages, Radio, X, PhoneCall, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { TRANSLATIONS } from '../data/legalKnowledge';

export default function Navbar({ activeTab, setActiveTab, lang, setLang }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const navItems = [
    { id: 'query', label: t.tabs.query, icon: Search, desc: 'Analyze IPC & BNS' },
    { id: 'autoFir', label: t.tabs.autoFir, icon: FileText, highlight: true, desc: 'Draft Formal Police Complaint' },
    { id: 'docExplainer', label: t.tabs.docExplainer, icon: BookOpen, desc: 'Detect Red Flags & Risk' },
    { id: 'cyber', label: t.tabs.cyber, icon: ShieldAlert, urgent: true, desc: '1930 Helpline & Golden Hour' },
    { id: 'rights', label: t.tabs.rights, icon: Scale, desc: 'DK Basu & Citizen Protections' },
    { id: 'policeLocator', label: t.tabs.policeLocator, icon: MapPin, desc: 'Nearby Stations & Cyber Cells' },
    { id: 'lawyerAid', label: t.tabs.lawyerAid, icon: UserCheck, desc: 'NALSA Free Legal Representation' }
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' }
  ];

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-container" onClick={() => handleSelectTab('query')}>
          <div className="brand-logo">
            <Scale size={24} className="brand-scale-icon" />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              <span className="brand-name">{t.appTitle}</span>
              <span className="brand-hindi">न्यायमित्र</span>
              <span className="version-pill">BNS 2023 & IPC</span>
            </div>
            <p className="brand-tagline">{t.appSubtitle}</p>
          </div>
        </div>

        <div className="header-actions">
          {/* Language Switcher */}
          <div className="language-selector-wrapper">
            <Languages size={16} className="lang-icon" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="lang-select"
              aria-label="Select Language"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Quick Cyber Emergency Trigger */}
          <button
            onClick={() => handleSelectTab('cyber')}
            className="emergency-btn pulse-glow"
            title="Immediate 1930 Cyber Fraud Protocol"
          >
            <Radio size={16} />
            <span>Cyber Fraud SOS</span>
          </button>

          {/* Upgraded Modern Animated Hamburger Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`upgraded-hamburger-btn ${isMenuOpen ? 'is-active' : ''}`}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            title={isMenuOpen ? "Close Menu" : "Open Legal Modules Menu"}
          >
            <div className="hamburger-inner-box">
              <span className="hamburger-bar bar-top" />
              <span className="hamburger-bar bar-mid" />
              <span className="hamburger-bar bar-bot" />
            </div>
            <span className="hamburger-glow-ring" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar for Desktop / Wide screens */}
      <nav className="nav-tabs-bar" aria-label="Main Navigation">
        <div className="nav-tabs-scroll">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`nav-tab-btn ${isActive ? 'active' : ''} ${item.urgent ? 'urgent-tab' : ''} ${item.highlight ? 'highlight-tab' : ''}`}
              >
                <Icon size={16} className="tab-icon" />
                <span>{item.label}</span>
                {item.urgent && <span className="urgent-dot" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Upgraded Mobile / Tablet Slide-over Drawer */}
      <div 
        className={`mobile-drawer-overlay ${isMenuOpen ? 'overlay-visible' : ''}`} 
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <aside 
        className={`mobile-nav-drawer ${isMenuOpen ? 'drawer-visible' : ''}`}
        aria-label="Mobile Navigation Menu"
      >
        <div className="drawer-header">
          <div className="drawer-brand">
            <div className="brand-logo-small">
              <Scale size={18} className="brand-scale-icon" />
            </div>
            <div className="drawer-title-group">
              <span className="drawer-app-name">{t.appTitle} (न्यायमित्र)</span>
              <span className="drawer-statute-tag">IPC & BNS 2023</span>
            </div>
          </div>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="drawer-close-btn"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Emergency Helplines inside drawer */}
        <div className="drawer-emergency-banner">
          <div className="drawer-emergency-badge">
            <PhoneCall size={14} className="pulse-icon" />
            <span>Emergency Dialers</span>
          </div>
          <div className="drawer-emergency-links">
            <a href="tel:1930" className="drawer-tel-chip cyber-chip">
              <strong>1930</strong> Cyber Fraud
            </a>
            <a href="tel:112" className="drawer-tel-chip police-chip">
              <strong>112</strong> Police
            </a>
            <a href="tel:15100" className="drawer-tel-chip aid-chip">
              <strong>15100</strong> Legal Aid
            </a>
          </div>
        </div>

        {/* Drawer Navigation List */}
        <div className="drawer-nav-list">
          <div className="drawer-nav-section-title">ALL LEGAL MODULES</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`drawer-item-btn ${isActive ? 'active-drawer-item' : ''} ${item.urgent ? 'urgent-item' : ''} ${item.highlight ? 'highlight-item' : ''}`}
              >
                <div className="drawer-item-left">
                  <div className={`drawer-icon-wrap ${isActive ? 'active-icon-wrap' : ''}`}>
                    <Icon size={18} />
                  </div>
                  <div className="drawer-item-text">
                    <div className="drawer-item-label">
                      <span>{item.label}</span>
                      {item.urgent && <span className="drawer-urgent-tag">Urgent</span>}
                      {item.highlight && <span className="drawer-highlight-tag">Tool</span>}
                    </div>
                    <span className="drawer-item-desc">{item.desc}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="drawer-chevron" />
              </button>
            );
          })}
        </div>

        {/* Drawer Language Switcher */}
        <div className="drawer-language-section">
          <div className="drawer-section-label">
            <Languages size={15} className="text-gold" />
            <span>Change Language / भाषा</span>
          </div>
          <div className="drawer-lang-grid">
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); }}
                className={`drawer-lang-btn ${lang === l.code ? 'selected-lang' : ''}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drawer Footer Notice */}
        <div className="drawer-footer">
          <ShieldCheck size={14} className="text-emerald" />
          <span>Bar Council of India Legal Awareness Initiative</span>
        </div>
      </aside>
    </header>
  );
}
