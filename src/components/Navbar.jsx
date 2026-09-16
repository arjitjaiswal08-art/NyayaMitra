import React, { useState, useEffect } from 'react';
import { 
  Scale, ShieldAlert, FileText, Search, BookOpen, MapPin, 
  UserCheck, Languages, Radio, X, PhoneCall, ShieldCheck, ChevronRight,
  Menu, ChevronDown, HelpCircle, Heart, Crown, Lock, Sparkles, AlertOctagon
} from 'lucide-react';
import { TRANSLATIONS } from '../data/legalKnowledge';

export default function Navbar({ activeTab, setActiveTab, lang, setLang, onOpenProModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const navItems = [
    { id: 'query', label: t.tabs.query, icon: Search, desc: (t.nav && t.nav.queryDesc) || 'Analyze IPC & BNS', badge: 'Core' },
    { id: 'evidenceLocker', label: (t.tabs && t.tabs.evidenceLocker) || (lang === 'hi' ? 'डिजिटल साक्ष्य लॉकर' : 'Evidence Locker'), icon: Lock, highlight: true, desc: (t.nav && t.nav.evidenceLockerDesc) || 'SHA-256 & Sec 63 BSA Vault', badge: 'Vault' },
    { id: 'caseAnalyzer', label: (t.tabs && t.tabs.caseAnalyzer) || (lang === 'hi' ? 'केस सामर्थ्य विश्लेषक' : 'Case Strength AI'), icon: Sparkles, desc: (t.nav && t.nav.caseAnalyzerDesc) || 'Win Probability & BNS Audit', badge: 'AI Audit' },
    { id: 'scamDetector', label: (t.tabs && t.tabs.scamDetector) || (lang === 'hi' ? 'स्कैम व फ्रॉड रडार' : 'Scam Radar'), icon: AlertOctagon, urgent: true, desc: (t.nav && t.nav.scamDetectorDesc) || 'Digital Arrest & UPI Scanner', badge: 'Scanner' },
    { id: 'autoFir', label: t.tabs.autoFir, icon: FileText, highlight: true, desc: (t.nav && t.nav.autoFirDesc) || 'Draft Formal Police Complaint', badge: 'Tool' },
    { id: 'docExplainer', label: t.tabs.docExplainer, icon: BookOpen, desc: (t.nav && t.nav.docExplainerDesc) || 'Detect Red Flags & Risk', badge: 'Scanner' },
    { id: 'cyber', label: t.tabs.cyber, icon: ShieldAlert, urgent: true, desc: (t.nav && t.nav.cyberDesc) || '1930 Helpline & Golden Hour', badge: 'Urgent' },
    { id: 'rights', label: t.tabs.rights, icon: Scale, desc: (t.nav && t.nav.rightsDesc) || 'DK Basu & Citizen Protections', badge: 'Handbook' },
    { id: 'policeLocator', label: t.tabs.policeLocator, icon: MapPin, desc: (t.nav && t.nav.policeLocatorDesc) || 'Nearby Stations & Cyber Cells', badge: 'Directory' },
    { id: 'lawyerAid', label: t.tabs.lawyerAid, icon: UserCheck, desc: (t.nav && t.nav.lawyerAidDesc) || 'NALSA Free Legal Representation', badge: 'Aid' },
    { id: 'about', label: (t.tabs && t.tabs.about) || (lang === 'hi' ? 'ऐप के बारे में और कैसे उपयोग करें' : 'About & How to Use'), icon: HelpCircle, desc: (t.nav && t.nav.aboutDesc) || (lang === 'hi' ? 'उपयोग मार्गदर्शिका • अर्जित जायसवाल' : 'App Guide • Made by Arjit Jaiswal'), badge: 'Guide' }
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

  // Current active item
  const currentItem = navItems.find(item => item.id === activeTab) || navItems[0];
  const CurrentIcon = currentItem.icon;

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

  // Prevent background scrolling when menu is open
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="app-header">
      <div className="header-top">
        {/* Brand Container */}
        <div className="brand-container" onClick={() => handleSelectTab('query')}>
          <div className="brand-logo">
            <Scale size={24} className="brand-scale-icon" />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              <span className="brand-name">{t.appTitle}</span>
              {lang === 'en' && <span className="brand-hindi">न्यायमित्र</span>}
              <span className="version-pill">BNS 2023 & IPC</span>
            </div>
            <p className="brand-tagline">{t.appSubtitle}</p>
          </div>
        </div>

        {/* Center: Active Module Breadcrumb Pill */}
        <div 
          className="active-module-pill"
          onClick={() => setIsMenuOpen(true)}
          title="Click to view all legal modules"
        >
          <CurrentIcon size={15} className="pill-icon text-gold" />
          <span className="pill-title">{currentItem.label}</span>
          <span className="pill-switch-hint">
            <span>{lang === 'hi' ? 'मॉड्यूल बदलें' : 'All Modules'}</span>
            <ChevronDown size={13} />
          </span>
        </div>

        {/* Right Header Actions */}
        <div className="header-actions">
          {/* Language Switcher */}
          <div className="language-selector-wrapper">
            <Languages size={15} className="lang-icon" />
            <select
              id="language-select-dropdown"
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

          {/* Quick Cyber Emergency SOS Trigger */}
          <button
            onClick={() => handleSelectTab('cyber')}
            className="emergency-btn pulse-glow"
            title="Immediate 1930 Cyber Fraud Protocol"
          >
            <Radio size={15} />
            <span>{(t.nav && t.nav.cyberSosBtn) || 'Cyber Fraud SOS'}</span>
          </button>

          {/* NyayaMitra PRO Upgrade Button */}
          <button
            type="button"
            onClick={onOpenProModal}
            className="nav-pro-badge"
            title="NyayaMitra PRO - Certified Lawyer Consultation"
          >
            <Crown size={13} />
            <span>PRO</span>
          </button>

          {/* Modern Prominent Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`upgraded-hamburger-btn ${isMenuOpen ? 'is-active' : ''}`}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open All Legal Modules Menu"}
            aria-expanded={isMenuOpen}
            title={isMenuOpen ? "Close Menu" : "Open All Legal Modules"}
          >
            <div className="hamburger-inner-box">
              <span className="hamburger-bar bar-top" />
              <span className="hamburger-bar bar-mid" />
              <span className="hamburger-bar bar-bot" />
            </div>
            <span className="hamburger-menu-label">
              {isMenuOpen ? (lang === 'hi' ? 'बंद करें' : 'Close') : (lang === 'hi' ? 'मेनू' : 'Menu')}
            </span>
          </button>
        </div>
      </div>

      {/* Slide-Over Navigation Drawer & Backdrop */}
      <div 
        className={`mobile-drawer-overlay ${isMenuOpen ? 'overlay-visible' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      
      <aside 
        className={`mobile-nav-drawer ${isMenuOpen ? 'drawer-visible' : ''}`}
        aria-label="Navigation Drawer"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-brand">
            <div className="brand-logo-small">
              <Scale size={18} className="brand-scale-icon" />
            </div>
            <div className="drawer-title-group">
              <span className="drawer-app-name">{t.appTitle}</span>
              <span className="drawer-statute-tag">IPC & BNS 2023 Compliant</span>
            </div>
          </div>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="drawer-close-btn"
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Emergency Quick Dialers Banner */}
        <div className="drawer-emergency-banner">
          <div className="drawer-emergency-badge">
            <PhoneCall size={14} className="pulse-icon" />
            <span>{(t.nav && t.nav.emergencyDialers) || 'Emergency Hotlines'}</span>
          </div>
          <div className="drawer-emergency-links">
            <a href="tel:1930" className="drawer-tel-chip cyber-chip">
              <strong>1930</strong> {(t.nav && t.nav.cyberDial) || 'Cyber Fraud'}
            </a>
            <a href="tel:112" className="drawer-tel-chip police-chip">
              <strong>112</strong> {(t.nav && t.nav.policeDial) || 'Police'}
            </a>
            <a href="tel:15100" className="drawer-tel-chip aid-chip">
              <strong>15100</strong> {(t.nav && t.nav.legalAidDial) || 'Legal Aid'}
            </a>
          </div>
        </div>

        {/* All Legal Modules (Primary List) */}
        <div className="drawer-nav-list">
          <div className="drawer-nav-section-title">
            {(t.nav && t.nav.modulesTitle) || 'ALL LEGAL MODULES & FUNCTIONS'}
          </div>
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
                      {isActive && <span className="drawer-active-indicator">{lang === 'hi' ? 'सक्रिय' : 'Active'}</span>}
                      {item.urgent && !isActive && <span className="drawer-urgent-tag">{(t.nav && t.nav.urgentTag) || 'Urgent'}</span>}
                      {item.highlight && !isActive && <span className="drawer-highlight-tag">{(t.nav && t.nav.toolTag) || 'Tool'}</span>}
                    </div>
                    <span className="drawer-item-desc">{item.desc}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="drawer-chevron" />
              </button>
            );
          })}
        </div>

        {/* Drawer Language Switcher Grid */}
        <div className="drawer-language-section">
          <div className="drawer-section-label">
            <Languages size={15} className="text-gold" />
            <span>{(t.nav && t.nav.changeLang) || 'Change Language / भाषा'}</span>
          </div>
          <div className="drawer-lang-grid">
            {languages.map(l => (
              <button
                key={l.code}
                id={`drawer-lang-btn-${l.code}`}
                onClick={() => { 
                  setLang(l.code); 
                  setIsMenuOpen(false); 
                }}
                className={`drawer-lang-btn ${lang === l.code ? 'selected-lang' : ''}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* NyayaMitra PRO Upgrade Card in Drawer */}
        <div style={{ margin: '0 1rem 1.25rem 1rem', padding: '1rem', background: 'linear-gradient(135deg, rgba(255, 176, 32, 0.15) 0%, rgba(17, 24, 39, 0.8) 100%)', borderRadius: '16px', border: '1px solid rgba(255, 176, 32, 0.35)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>👑 NyayaMitra PRO</span>
            <span style={{ fontSize: '0.75rem', background: 'rgba(255, 176, 32, 0.2)', color: 'var(--gold-primary)', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>₹199 / Case</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
            {lang === 'hi' ? 'प्रमाणित अधिवक्ता द्वारा अपनी FIR शिकायत व लीज एग्रीमेंट का कानूनी सत्यापन करवाएं।' : 'Get certified High Court advocate verification for your FIR drafts & contracts within 2 hours.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              onOpenProModal && onOpenProModal();
            }}
            style={{ width: '100%', padding: '0.55rem', background: 'var(--gold-primary)', color: '#0B0F1A', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
          >
            {lang === 'hi' ? 'PRO प्लान देखें' : 'Explore PRO Plans'}
          </button>
        </div>

        {/* Drawer Footer Notice */}
        <div className="drawer-footer">
          <div className="drawer-creator-tag">
            <Heart size={13} className="text-ruby" />
            <span>Made with dedication by <strong>Arjit Jaiswal</strong></span>
          </div>
          <div className="drawer-compliance-tag">
            <ShieldCheck size={13} className="text-emerald" />
            <span>{(t.nav && t.nav.bciTag) || 'Bar Council of India Legal Awareness Initiative'}</span>
          </div>
        </div>
      </aside>
    </header>
  );
}

