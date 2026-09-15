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
      </main>

      {/* Official Legal Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <Scale size={20} className="text-gold" />
              <span className="footer-title">NyayaMitra (न्यायमित्र)</span>
            </div>
            <p className="footer-tagline">
              Empowering Indian Citizens with AI-powered statutory awareness, dual IPC/BNS cross-referencing, procedural FIR drafting, and constitutional rights.
            </p>
            <div className="footer-compliance-tag">
              <ShieldCheck size={14} className="text-emerald" />
              <span>Compliant with Bar Council of India Guidelines on Legal Awareness</span>
            </div>
          </div>

          <div className="footer-hotlines-col">
            <h4 className="footer-heading">Emergency Legal Helplines</h4>
            <ul className="footer-links-list">
              <li>
                <a href="tel:1930">
                  <PhoneCall size={14} />
                  <span>National Cyber Crime: <strong>1930</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:112">
                  <PhoneCall size={14} />
                  <span>National Emergency (Police): <strong>112</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:15100">
                  <PhoneCall size={14} />
                  <span>NALSA Free Legal Aid: <strong>15100</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:1915">
                  <PhoneCall size={14} />
                  <span>Consumer Grievance Helpline: <strong>1915</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:1091">
                  <PhoneCall size={14} />
                  <span>Women in Distress: <strong>1091</strong></span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-heading">Quick Modules</h4>
            <div className="footer-nav-buttons">
              <button onClick={() => handleNavigateTab('query')}>AI Legal Query</button>
              <button onClick={() => handleNavigateTab('autoFir')}>Auto FIR Generator</button>
              <button onClick={() => handleNavigateTab('docExplainer')}>Contract Explainer</button>
              <button onClick={() => handleNavigateTab('cyber')}>Cyber 1930 SOS</button>
              <button onClick={() => handleNavigateTab('rights')}>Citizen Rights</button>
              <button onClick={() => handleNavigateTab('policeLocator')}>Nearby Police</button>
              <button onClick={() => handleNavigateTab('lawyerAid')}>Free Legal Aid</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="legal-safety-statement">
            <strong>Legal Safety Notice:</strong> NyayaMitra is an educational, awareness, and procedural drafting AI tool. It does not provide formal attorney-client representation or final legal adjudications. For contentious or serious criminal/civil litigation, always consult an enrolled advocate of the Bar Council.
          </p>
          <div className="copyright-tag">
            <span>NyayaMitra AI © 2026 | Built for Indian Citizens</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
