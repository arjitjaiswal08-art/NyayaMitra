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
import { 
  Scale, PhoneCall, ShieldCheck, Heart, Home, FileText, 
  Mic, ShieldAlert, Crown, X, Check, Sparkles, ArrowRight, Zap 
} from 'lucide-react';
import { TRANSLATIONS } from './data/legalKnowledge';

export default function App() {
  const [activeTab, setActiveTab] = useState('query');
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('lang') || 'en';
    }
    return 'en';
  });
  const [isProModalOpen, setIsProModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.search.includes('pro=true');
    }
    return false;
  });

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const handleNavigateTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFloatingMicClick = () => {
    if (activeTab !== 'query') {
      setActiveTab('query');
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const micBtn = document.querySelector('.modern-mic-trigger');
      if (micBtn) {
        micBtn.click();
      }
    }, 120);
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
        onOpenProModal={() => setIsProModalOpen(true)}
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

      {/* ==========================================================================
          STICKY MOBILE BOTTOM BAR (Thumb-Friendly Fast Navigation)
          ========================================================================== */}
      <nav className="sticky-bottom-bar" aria-label="Mobile Navigation">
        {/* Home */}
        <button
          type="button"
          onClick={() => handleNavigateTab('query')}
          className={`bottom-bar-btn ${activeTab === 'query' ? 'active' : ''}`}
        >
          <div className="bottom-icon-wrap">
            <Home size={18} />
          </div>
          <span>{lang === 'hi' ? 'होम' : 'Home'}</span>
        </button>

        {/* Document AI */}
        <button
          type="button"
          onClick={() => handleNavigateTab('docExplainer')}
          className={`bottom-bar-btn ${activeTab === 'docExplainer' ? 'active' : ''}`}
        >
          <div className="bottom-icon-wrap">
            <FileText size={18} />
          </div>
          <span>{lang === 'hi' ? 'दस्तावेज' : 'Docs'}</span>
        </button>

        {/* Floating Center Voice Trigger */}
        <button
          type="button"
          onClick={handleFloatingMicClick}
          className="bottom-floating-mic-btn"
          title="Speak your problem (Hindi/English)"
          aria-label="Voice Search"
        >
          <Mic size={24} />
        </button>

        {/* Emergency SOS */}
        <button
          type="button"
          onClick={() => handleNavigateTab('cyber')}
          className={`bottom-bar-btn ${activeTab === 'cyber' ? 'active' : ''}`}
        >
          <div className="bottom-icon-wrap">
            <ShieldAlert size={18} />
          </div>
          <span>{lang === 'hi' ? 'आपातकाल' : 'SOS'}</span>
        </button>

        {/* Auto FIR Generator */}
        <button
          type="button"
          onClick={() => handleNavigateTab('autoFir')}
          className={`bottom-bar-btn ${activeTab === 'autoFir' ? 'active' : ''}`}
        >
          <div className="bottom-icon-wrap">
            <Zap size={18} />
          </div>
          <span>{lang === 'hi' ? 'FIR' : 'FIR'}</span>
        </button>

        {/* NyayaMitra PRO */}
        <button
          type="button"
          onClick={() => setIsProModalOpen(true)}
          className="bottom-bar-btn"
          style={{ color: 'var(--gold-primary)' }}
        >
          <div className="bottom-icon-wrap">
            <Crown size={18} />
          </div>
          <span>PRO</span>
        </button>
      </nav>

      {/* ==========================================================================
          NYAYAMITRA PRO MODAL (Smart Legal Freemium & Advocate Verification)
          ========================================================================== */}
      {isProModalOpen && (
        <div className="pro-modal-backdrop" onClick={() => setIsProModalOpen(false)}>
          <div className="pro-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="pro-modal-close-btn"
              onClick={() => setIsProModalOpen(false)}
              aria-label="Close PRO Modal"
            >
              <X size={18} />
            </button>

            <div className="pro-header-badge">
              <Crown size={14} />
              <span>NyayaMitra PRO</span>
            </div>

            <h2 className="pro-modal-title">
              {lang === 'hi' ? 'प्रमाणित अधिवक्ता द्वारा विधिक सत्यापन' : 'Certified Advocate Legal Review'}
            </h2>
            <p className="pro-modal-desc">
              {lang === 'hi' 
                ? 'AI की गति के साथ उच्च न्यायालय के अनुभवी वकीलों की वैधानिक समीक्षा प्राप्त करें ताकि आपकी FIR या लीज एग्रीमेंट 100% सटीक रहे।' 
                : 'Bridge the gap between AI speed and certified human legal validation. Have High Court advocates vet your formal complaints and contracts.'}
            </p>

            <div className="pro-tiers-grid">
              {/* Tier 1: Free Citizen */}
              <div className="pro-tier-box">
                <div className="pro-tier-header">
                  <h3 className="pro-tier-name">{lang === 'hi' ? 'नागरिक मुफ्त योजना' : 'Citizen Free'}</h3>
                  <div className="pro-tier-price">₹0 <span className="pro-tier-period">/ {lang === 'hi' ? 'हमेशा' : 'forever'}</span></div>
                </div>
                <ul className="pro-features-list">
                  <li className="pro-feature-item">
                    <Check size={15} className="text-emerald flex-shrink-0" />
                    <span>{lang === 'hi' ? 'असीमित AI विधिक प्रश्न व BNS धारा विश्लेषण' : 'Unlimited AI BNS & IPC queries'}</span>
                  </li>
                  <li className="pro-feature-item">
                    <Check size={15} className="text-emerald flex-shrink-0" />
                    <span>{lang === 'hi' ? 'थाना FIR व पुलिस शिकायत ड्राफ्टिंग' : 'Auto FIR complaint generator'}</span>
                  </li>
                  <li className="pro-feature-item">
                    <Check size={15} className="text-emerald flex-shrink-0" />
                    <span>{lang === 'hi' ? '1930 साइबर रिकवरी व बैंक हेल्पलाइन' : '1930 Cyber fraud protocol'}</span>
                  </li>
                  <li className="pro-feature-item">
                    <Check size={15} className="text-emerald flex-shrink-0" />
                    <span>{lang === 'hi' ? 'मुफ्त नालसा विधिक सहायता पात्रता' : 'NALSA free legal aid eligibility'}</span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="pro-tier-btn btn-free"
                  onClick={() => setIsProModalOpen(false)}
                >
                  {lang === 'hi' ? 'वर्तमान सक्रिय योजना' : 'Current Active Plan'}
                </button>
              </div>

              {/* Tier 2: Single Case Advocate Review */}
              <div className="pro-tier-box featured-tier">
                <div style={{ position: 'absolute', top: '-10px', right: '14px', background: 'var(--gold-primary)', color: '#0B0F1A', fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '10px', textTransform: 'uppercase' }}>
                  {lang === 'hi' ? 'सर्वाधिक लोकप्रिय' : 'Most Popular'}
                </div>
                <div className="pro-tier-header">
                  <h3 className="pro-tier-name">{lang === 'hi' ? 'एकल मामला सत्यापन' : 'Single Case Review'}</h3>
                  <div className="pro-tier-price">₹199 <span className="pro-tier-period">/ {lang === 'hi' ? 'प्रति मामला' : 'case'}</span></div>
                </div>
                <ul className="pro-features-list">
                  <li className="pro-feature-item">
                    <Check size={15} className="text-gold flex-shrink-0" />
                    <span>{lang === 'hi' ? '2 घंटे में प्रमाणित अधिवक्ता द्वारा FIR ड्राफ्ट रिव्यू' : '2-hour certified advocate review of FIR'}</span>
                  </li>
                  <li className="pro-feature-item">
                    <Check size={15} className="text-gold flex-shrink-0" />
                    <span>{lang === 'hi' ? 'थाना क्षेत्राधिकार व धारा 173 BNSS सत्यापन' : 'Police jurisdiction & Section 173 BNSS validation'}</span>
                  </li>
                  <li className="pro-feature-item">
                    <Check size={15} className="text-gold flex-shrink-0" />
                    <span>{lang === 'hi' ? 'किरायानामा / रोजगार बॉन्ड विधिक नोटिस ड्राफ्ट' : 'Custom legal notice / bond dispute drafting'}</span>
                  </li>
                  <li className="pro-feature-item">
                    <Check size={15} className="text-gold flex-shrink-0" />
                    <span>{lang === 'hi' ? 'व्हाट्सएप / ईमेल पर विधिक राय पत्र' : 'Written advocate opinion on WhatsApp/Email'}</span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="pro-tier-btn btn-upgrade"
                  onClick={() => {
                    alert(lang === 'hi' ? 'धन्यवाद! आपके मामले की समीक्षा हेतु वकील असाइन किए जा रहे हैं।' : 'NyayaMitra PRO: A verified High Court advocate has been notified to review your draft.');
                    setIsProModalOpen(false);
                  }}
                >
                  {lang === 'hi' ? '₹199 में मामला रिव्यू बुक करें' : 'Book Review for ₹199'}
                </button>
              </div>

              {/* Tier 3: Monthly Legal Shield */}
              <div className="pro-tier-box">
                <div className="pro-tier-header">
                  <h3 className="pro-tier-name">{lang === 'hi' ? 'मासिक विधिक कवच' : 'Legal Shield PRO'}</h3>
                  <div className="pro-tier-price">₹499 <span className="pro-tier-period">/ {lang === 'hi' ? 'माह' : 'month'}</span></div>
                </div>
                <ul className="pro-features-list">
                  <li className="pro-feature-item">
                    <Check size={15} className="text-emerald flex-shrink-0" />
                    <span>{lang === 'hi' ? 'असीमित ड्राफ्ट व एग्रीमेंट समीक्षा' : 'Unlimited contract & complaint reviews'}</span>
                  </li>
                  <li className="pro-feature-item">
                    <Check size={15} className="text-emerald flex-shrink-0" />
                    <span>{lang === 'hi' ? 'माह में 2 बार 30 मिनट का फोन विधिक परामर्श' : 'Two 30-min on-call advocate consultations'}</span>
                  </li>
                  <li className="pro-feature-item">
                    <Check size={15} className="text-emerald flex-shrink-0" />
                    <span>{lang === 'hi' ? 'प्राथमिक 1930 साइबर फंड फ्रीजिंग सहयोग' : 'Priority 1930 cyber fraud recovery help'}</span>
                  </li>
                  <li className="pro-feature-item">
                    <Check size={15} className="text-emerald flex-shrink-0" />
                    <span>{lang === 'hi' ? 'वाणिज्यिक व पारिवारिक कानूनी सुरक्षा' : 'Commercial & consumer dispute advisory'}</span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="pro-tier-btn btn-upgrade"
                  onClick={() => {
                    alert(lang === 'hi' ? 'धन्यवाद! आपकी मासिक NyayaMitra PRO सदस्यता सक्रिय हो गई है।' : 'NyayaMitra PRO: Monthly Legal Shield plan activated.');
                    setIsProModalOpen(false);
                  }}
                >
                  {lang === 'hi' ? '₹499 में कवच सक्रिय करें' : 'Activate Shield for ₹499'}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
              <span>🔒 256-Bit SSL Encrypted • Bar Council of India Ethical Legal Awareness Standards</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
