import React from 'react';
import { Scale, ShieldAlert, FileText, Search, BookOpen, MapPin, UserCheck, Languages, Radio } from 'lucide-react';
import { TRANSLATIONS } from '../data/legalKnowledge';

export default function Navbar({ activeTab, setActiveTab, lang, setLang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const navItems = [
    { id: 'query', label: t.tabs.query, icon: Search },
    { id: 'autoFir', label: t.tabs.autoFir, icon: FileText, highlight: true },
    { id: 'docExplainer', label: t.tabs.docExplainer, icon: BookOpen },
    { id: 'cyber', label: t.tabs.cyber, icon: ShieldAlert, urgent: true },
    { id: 'rights', label: t.tabs.rights, icon: Scale },
    { id: 'policeLocator', label: t.tabs.policeLocator, icon: MapPin },
    { id: 'lawyerAid', label: t.tabs.lawyerAid, icon: UserCheck }
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

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-container" onClick={() => setActiveTab('query')}>
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
            onClick={() => setActiveTab('cyber')}
            className="emergency-btn pulse-glow"
            title="Immediate 1930 Cyber Fraud Protocol"
          >
            <Radio size={16} />
            <span>Cyber Fraud SOS</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="nav-tabs-bar" aria-label="Main Navigation">
        <div className="nav-tabs-scroll">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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
    </header>
  );
}
