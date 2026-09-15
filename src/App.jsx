import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DisclaimerBanner from './components/DisclaimerBanner';
import IntentClassifierView from './components/IntentClassifierView';
import AutoFIRGenerator from './components/AutoFIRGenerator';
import DocumentExplainer from './components/DocumentExplainer';
import CyberEmergencyRoom from './components/CyberEmergencyRoom';
import RightsHandbook from './components/RightsHandbook';
import PoliceLocator from './components/PoliceLocator';
import LawyerConnect from './components/LawyerConnect';
import AboutView from './components/AboutView';
import { Scale, PhoneCall, ShieldCheck, Heart } from 'lucide-react';
import { TRANSLATIONS } from './data/legalKnowledge';

export default function App() {
  const [activeTab, setActiveTab] = useState('query');
  const [lang, setLang] = useState('en');

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const handleNavigateTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {/* Statutory & Bar Council Disclaimer Banner */}
      <DisclaimerBanner lang={lang} />

      {/* Main Header & Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang} 
      />

      {/* Dynamic Main Workspace Area */}
      <main className="main-content-container">
        {activeTab === 'query' && (
          <IntentClassifierView 
            lang={lang} 
            onNavigateTab={handleNavigateTab} 
          />
        )}

        {activeTab === 'autoFir' && (
          <AutoFIRGenerator 
            lang={lang} 
          />
        )}

        {activeTab === 'docExplainer' && (
          <DocumentExplainer 
            lang={lang} 
          />
        )}

        {activeTab === 'cyber' && (
          <CyberEmergencyRoom 
            lang={lang} 
            onNavigateTab={handleNavigateTab} 
          />
        )}

        {activeTab === 'rights' && (
          <RightsHandbook 
            lang={lang} 
          />
        )}

        {activeTab === 'policeLocator' && (
          <PoliceLocator 
            lang={lang} 
          />
        )}

        {activeTab === 'lawyerAid' && (
          <LawyerConnect 
            lang={lang} 
          />
        )}

        {activeTab === 'about' && (
          <AboutView 
            lang={lang} 
            onNavigateTab={handleNavigateTab} 
          />
        )}
      </main>

      {/* Official Legal Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <Scale size={20} className="text-gold" />
              <span className="footer-title">{(t.footer && t.footer.title) || t.appTitle}</span>
            </div>
            <p className="footer-tagline">
              {(t.footer && t.footer.tagline) || t.appSubtitle}
            </p>
            <div className="footer-compliance-tag">
              <ShieldCheck size={14} className="text-emerald" />
              <span>{(t.footer && t.footer.compliance) || 'Compliant with Bar Council of India Guidelines on Legal Awareness'}</span>
            </div>
            <div className="footer-creator-badge">
              <Heart size={13} className="text-ruby" />
              <span>Conceived & Developed by <strong>Arjit Jaiswal</strong></span>
            </div>
          </div>

          <div className="footer-hotlines-col">
            <h4 className="footer-heading">{(t.footer && t.footer.emergencyHeading) || 'Emergency Legal Helplines'}</h4>
            <ul className="footer-links-list">
              <li>
                <a href="tel:1930">
                  <PhoneCall size={14} />
                  <span>{(t.footer && t.footer.cyberLabel) || 'National Cyber Crime:'} <strong>1930</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:112">
                  <PhoneCall size={14} />
                  <span>{(t.footer && t.footer.policeLabel) || 'National Emergency (Police):'} <strong>112</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:15100">
                  <PhoneCall size={14} />
                  <span>{(t.footer && t.footer.aidLabel) || 'NALSA Free Legal Aid:'} <strong>15100</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:1915">
                  <PhoneCall size={14} />
                  <span>{(t.footer && t.footer.consumerLabel) || 'Consumer Grievance Helpline:'} <strong>1915</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:1091">
                  <PhoneCall size={14} />
                  <span>{(t.footer && t.footer.womenLabel) || 'Women in Distress:'} <strong>1091</strong></span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-heading">{(t.footer && t.footer.quickModulesHeading) || 'Quick Modules'}</h4>
            <div className="footer-nav-buttons">
              <button onClick={() => handleNavigateTab('query')}>{t.tabs.query}</button>
              <button onClick={() => handleNavigateTab('autoFir')}>{t.tabs.autoFir}</button>
              <button onClick={() => handleNavigateTab('docExplainer')}>{t.tabs.docExplainer}</button>
              <button onClick={() => handleNavigateTab('cyber')}>{t.tabs.cyber}</button>
              <button onClick={() => handleNavigateTab('rights')}>{t.tabs.rights}</button>
              <button onClick={() => handleNavigateTab('policeLocator')}>{t.tabs.policeLocator}</button>
              <button onClick={() => handleNavigateTab('lawyerAid')}>{t.tabs.lawyerAid}</button>
              <button onClick={() => handleNavigateTab('about')} className="footer-about-btn">
                📖 {(t.tabs && t.tabs.about) || 'About & How to Use'}
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="legal-safety-statement">
            {(t.footer && t.footer.safetyNotice) || 'Legal Safety Notice: NyayaMitra is an educational, awareness, and procedural drafting AI tool.'}
          </p>
          <div className="copyright-tag">
            <span>NyayaMitra AI © 2026 • Made with ❤️ by <strong>Arjit Jaiswal</strong> • Built for Indian Citizens</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
