import React, { useState } from 'react';
import { 
  Scale, 
  HelpCircle, 
  Sparkles, 
  User, 
  ShieldCheck, 
  FileText, 
  BookOpen, 
  ShieldAlert, 
  MapPin, 
  UserCheck, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Globe, 
  Heart, 
  Award, 
  Terminal, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function AboutView({ lang = 'en', onNavigateTab }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const isHindi = lang === 'hi';

  const STEPS_DATA = [
    {
      stepNum: 1,
      id: 'query',
      title: isHindi ? '1. सरल भाषा में कानूनी सवाल पूछें या बोलें' : '1. Ask Any Legal Question in Plain Language or Voice',
      subtitle: isHindi ? 'AI लीगल क्वेरी और वॉयस असिस्टेंट' : 'AI Legal Query & Speech-to-Text Assistant',
      desc: isHindi 
        ? 'आपको कानूनी धाराएं जानने की ज़रूरत नहीं है। अपनी समस्या को अपनी मातृभाषा में लिखें या माइक बटन दबाकर बोलें। हमारा AI सिस्टम तुरंत अपराध की प्रकृति, संज्ञेयता (Cognizable/Non-Cognizable) और प्राथमिक कानूनी समाधान बताता है।'
        : 'You do not need to know complex legal sections. Simply describe what happened in your own words or click the "Speak" mic button. Our AI engine automatically classifies the legal intent, identifies cognizable offences, and gives you a clear immediate action step.',
      actionText: isHindi ? 'AI लीगल क्वेरी खोलें' : 'Try AI Legal Query',
      icon: Scale,
      color: 'gold'
    },
    {
      stepNum: 2,
      id: 'query',
      title: isHindi ? '2. नए कानून (BNS 2023) और पुराने IPC 1860 का मिलान करें' : '2. Cross-Reference BNS 2023 & IPC 1860 Sections',
      subtitle: isHindi ? 'जुलाई 2024 से लागू नए आपराधिक कानूनों का परिवर्तक' : 'Statutory Section Converter for India\'s New Criminal Laws',
      desc: isHindi
        ? 'भारतीय न्याय संहिता (BNS 2023) लागू हो चुकी है। डैशबोर्ड पर मौजूद धारा परिवर्तक के माध्यम से जानें कि पुराने IPC 420 (धोखाधड़ी) की जगह नया BNS 318, या IPC 379 (चोरी) की जगह नया BNS 303 कैसे लागू होता है और उनकी सजा क्या है।'
        : 'Bharatiya Nyaya Sanhita (BNS 2023) replaced the 164-year-old IPC in July 2024. Use the Dashboard Statute Converter to instantly map former sections (e.g. IPC 420 for cheating becomes BNS 318, IPC 379 for theft becomes BNS 303) and inspect penalties.',
      actionText: isHindi ? 'धारा परिवर्तक देखें' : 'Explore Statute Converter',
      icon: Sparkles,
      color: 'gold'
    },
    {
      stepNum: 3,
      id: 'autoFir',
      title: isHindi ? '3. थाना प्रभारी (SHO) हेतु औपचारिक FIR शिकायत तैयार करें' : '3. Draft an SHO-Ready Formal FIR Complaint',
      subtitle: isHindi ? 'BNSS धारा 173 और ज़ीरो FIR गारंटी सहित' : 'Zero FIR Legal Guarantees & Section 173 BNSS Format',
      desc: isHindi
        ? 'थाने जाने से पहले 2 मिनट में औपचारिक शिकायत पत्र तैयार करें। घटना का विवरण, दिनांक, स्थान और संदिग्ध का ब्यौरा भरें। सिस्टम कानूनी रूप से प्रमाणित FIR ड्राफ्ट तैयार करेगा जिसे आप सीधे प्रिंट या कॉपी कर सकते हैं।'
        : 'Never walk into a police station unprepared. Fill in guided prompts (date, time, jurisdiction, accused, narrative) to generate a structured, formal complaint letter citing mandatory Section 173(1) BNSS Zero FIR rights. Ready to copy or print directly.',
      actionText: isHindi ? 'FIR ड्राफ्टर खोलें' : 'Draft Police FIR Complaint',
      icon: FileText,
      color: 'gold'
    },
    {
      stepNum: 4,
      id: 'cyber',
      title: isHindi ? '4. साइबर धोखाधड़ी के पहले 2 घंटे (गोल्डन ऑवर) में तुरंत कार्रवाई' : '4. Execute Golden Hour Cyber Fraud Recovery (1930)',
      subtitle: isHindi ? 'बैंक खाता फ्रीज प्रोटोकॉल और 200+ फ्रॉड डेस्क' : 'Bank Freeze Checklist & National Cyber Crime Protocol',
      desc: isHindi
        ? 'यदि आपके साथ कोई ऑनलाइन धोखाधड़ी, UPI फ्रॉड या बैंक स्कैम हुआ है, तो शीर्ष पर दिए गए Cyber Fraud SOS बटन को दबाएं या 1930 पर कॉल करें। तुरंत लाभार्थी खाता फ्रीज करने और cybercrime.gov.in पर रिपोर्ट दर्ज करने का कदम उठाएं।'
        : 'If you have lost money to a UPI, credit card, or investment scam, act within the 2-hour Golden Hour. Tap the red "Cyber Fraud SOS" button or dial 1930. Follow the guided checklist to contact your bank fraud desk, freeze beneficiary funds, and log a national portal claim.',
      actionText: isHindi ? '1930 साइबर डेस्क खोलें' : 'Open Cyber Emergency Room',
      icon: ShieldAlert,
      color: 'ruby'
    },
    {
      stepNum: 5,
      id: 'docExplainer',
      title: isHindi ? '5. अनुबंध और एग्रीमेंट में छुपे कानूनी खतरे पकड़ें' : '5. Audit Contracts & Agreements for Hidden Risks',
      subtitle: isHindi ? 'किरायानामा, रोजगार अनुबंध व फ्रीलांस बॉन्ड स्कैनर' : 'Rental, Employment & Freelance Agreement Scanner',
      desc: isHindi
        ? 'किसी भी अनुबंध या कानूनी दस्तावेज़ को साइन करने से पहले उसे पेस्ट करें। हमारा AI स्कैनर अनुचित पेनल्टी, अवैध नॉन-कम्पीट क्लॉज (अनुबंध अधिनियम की धारा 27) और अत्यधिक सिक्योरिटी डिपॉजिट जैसी छुपी शर्तों को लाल रंग में उजागर करता है।'
        : 'Paste any contract clauses before signing. The Risk Scanner flags one-sided indemnity clauses, unreasonable forfeiture of security deposits, and illegal non-compete covenants that violate Section 27 of the Indian Contract Act 1872.',
      actionText: isHindi ? 'अनुबंध की जांच करें' : 'Scan a Contract',
      icon: BookOpen,
      color: 'blue'
    },
    {
      stepNum: 6,
      id: 'rights',
      title: isHindi ? '6. अपने संवैधानिक और नागरिक अधिकारों को जानें' : '6. Know Your Constitutional & Arrest Protections',
      subtitle: isHindi ? 'डी.के. बासु गिरफ्तारी नियम और महिला सुरक्षा अधिकार' : 'D.K. Basu Guidelines, Tenant Rights & Consumer Laws',
      desc: isHindi
        ? 'पुलिस कब गिरफ्तार कर सकती है? क्या बिना महिला पुलिसकर्मी के किसी महिला को सूर्यास्त के बाद गिरफ्तार किया जा सकता है? डी.के. बासु सुप्रीम कोर्ट दिशानिर्देश, किरायेदार अधिकार और उपभोक्ता विवाद निवारण नियमों को सरल भाषा में समझें।'
        : 'Understand your fundamental safeguards under Articles 20, 21, and 22. Learn the mandatory 11-point D.K. Basu arrest memo rules, sunset-to-sunrise women arrest prohibitions under Section 43 BNSS, and consumer refund mechanisms.',
      actionText: isHindi ? 'नागरिक अधिकार हैंडबुक' : 'View Citizen Rights Handbook',
      icon: Scale,
      color: 'emerald'
    },
    {
      stepNum: 7,
      id: 'lawyerAid',
      title: isHindi ? '7. नजदीकी थाना खोजें और मुफ्त सरकारी वकील पाएं' : '7. Locate Police Stations & Claim Free NALSA Legal Aid',
      subtitle: isHindi ? 'संविधान के अनुच्छेद 39A के तहत मुफ्त विधिक सहायता' : 'Article 39A Free Legal Counsel & Metros Directory',
      desc: isHindi
        ? 'दिल्ली, मुंबई, बेंगलुरु, हैदराबाद, कोलकाता व चेन्नई के सत्यापित थानों और साइबर सेल के नंबर देखें। साथ ही नालसा (NALSA) के तहत मुफ्त सरकारी वकील प्राप्त करने की अपनी पात्रता जांचें और अधिवक्ता हेतु केस ब्रीफ तैयार करें।'
        : 'Find verified phone numbers and addresses of police stations and cyber crime cells across major Indian metros. Check if you qualify for 100% free advocate representation under Article 39A (income under ₹3 Lakhs, women, custody detainees).',
      actionText: isHindi ? 'मुफ्त कानूनी सहायता जांचें' : 'Check Legal Aid Eligibility',
      icon: UserCheck,
      color: 'purple'
    }
  ];

  const FAQS = [
    {
      q: isHindi ? 'क्या न्यायमित्र का उपयोग पूरी तरह से निशुल्क है?' : 'Is NyayaMitra completely free to use?',
      a: isHindi 
        ? 'हाँ, न्यायमित्र भारतीय नागरिकों के कानूनी सशक्तिकरण हेतु 100% निशुल्क है। इसका कोई भी हिडन चार्ज या सब्सक्रिप्शन नहीं है।'
        : 'Yes, NyayaMitra is 100% free and open for every Indian citizen. There are no subscriptions, paywalls, or hidden charges.'
    },
    {
      q: isHindi ? 'क्या मेरी निजी जानकारी और शिकायत पत्र सुरक्षित हैं?' : 'Is my personal data and complaint text stored or shared?',
      a: isHindi 
        ? 'न्यायमित्र में गोपनीयता सर्वोपरि है। आपकी किसी भी शिकायत का टेक्स्ट, नाम या फोन नंबर हमारे किसी भी सर्वर पर सुरक्षित नहीं किया जाता है। सभी गणना और ड्राफ्टिंग आपके अपने ब्राउज़र में स्थानीय रूप से होती है।'
        : 'Privacy is our core tenet. No personal names, phone numbers, Aadhaar details, or incident descriptions are sent to or stored on external servers. All processing and document generation occurs locally in your client browser.'
    },
    {
      q: isHindi ? 'क्या पुलिस मेरी FIR दर्ज करने से मना कर सकती है?' : 'Can a police station refuse to register my FIR?',
      a: isHindi 
        ? 'कानूनन बिल्कुल नहीं। नए भारतीय नागरिक सुरक्षा संहिता 2023 (BNSS) की धारा 173(1) और सुप्रीम कोर्ट के ललिता कुमारी बनाम उत्तर प्रदेश निर्णय के तहत संज्ञेय अपराध में FIR दर्ज करना अनिवार्य है। क्षेत्राधिकार न होने पर पुलिस को "ज़ीरो FIR" दर्ज कर संबंधित थाने को भेजना अनिवार्य है।'
        : 'Legally, no. Under Section 173(1) BNSS 2023 and the landmark Lalita Kumari Supreme Court verdict, police are statutorily mandated to register an FIR for cognizable offences. If outside their territorial jurisdiction, they must register a "Zero FIR" and transfer it.'
    },
    {
      q: isHindi ? 'क्या न्यायमित्र किसी वकील या अदालत का विकल्प है?' : 'Does NyayaMitra replace a licensed advocate or attorney?',
      a: isHindi 
        ? 'नहीं। न्यायमित्र भारतीय विधि परिषद (Bar Council of India) के कानूनी जागरूकता दिशानिर्देशों के अनुरूप एक शैक्षणिक, विधिक जागरूकता और प्रक्रियात्मक ड्राफ्टिंग टूल है। न्यायालय में औपचारिक प्रतिनिधित्व हेतु हमेशा किसी अधिकृत अधिवक्ता से परामर्श लें।'
        : 'No. NyayaMitra provides general statutory awareness, statutory cross-referencing, and procedural drafting assistance. It does not establish an attorney-client relationship. For contentious court litigation, always consult an enrolled advocate.'
    }
  ];

  return (
    <div className="about-view-container">
      {/* Hero Header */}
      <div className="about-hero-card">
        <div className="about-hero-badge">
          <Scale size={16} className="text-gold" />
          <span>{isHindi ? 'न्यायमित्र • भारतीय नागरिक कानूनी सशक्तिकरण' : 'NyayaMitra • AI Legal Empowerment for Indian Citizens'}</span>
        </div>
        <h1 className="about-hero-title">
          {isHindi ? 'न्यायमित्र के बारे में और इसका उपयोग कैसे करें' : 'About NyayaMitra & How to Use This App'}
        </h1>
        <p className="about-hero-subtitle">
          {isHindi 
            ? 'भारतीय कानून (BNS 2023 व IPC 1860), संवैधानिक अधिकारों और प्रक्रियात्मक कानूनी टूल्स को हर नागरिक के लिए सुलभ, सहज और पारदर्शी बनाने हेतु समर्पित।'
            : 'Democratizing Indian Law, Criminal Procedure, and Constitutional Protections with cutting-edge AI precision, dual statutory cross-referencing, and multi-language support.'}
        </p>

        {/* Creator Showcase Banner */}
        <div className="creator-profile-card">
          <div className="creator-avatar-wrap">
            <div className="creator-avatar-badge">
              <Award size={28} className="text-gold" />
            </div>
          </div>
          <div className="creator-info-content">
            <div className="creator-tagline-row">
              <span className="creator-eyebrow">{isHindi ? 'परिकल्पना एवं विकासकर्ता' : 'Created & Engineered by'}</span>
              <span className="creator-badge-pill">Lead Architect</span>
            </div>
            <h2 className="creator-name">Arjit Jaiswal</h2>
            <p className="creator-statement">
              {isHindi 
                ? '“भारत में कानूनी भाषा को अक्सर इतना जटिल बना दिया जाता है कि एक आम नागरिक अपने ही अधिकारों से डरने लगता है। जब किसी गरीब या मध्यमवर्गीय व्यक्ति की जमापूंजी साइबर ठगी में चली जाती है, या जब कोई नागरिक थाने में FIR लिखाने से डरता है, तब त्वरित और सटीक कानूनी ज्ञान सबसे बड़ा हथियार है। मैंने न्यायमित्र को इसलिए बनाया ताकि हर भारतीय नागरिक अपनी भाषा में, बिना किसी डर के, अपने संवैधानिक अधिकारों का उपयोग कर सके।”'
                : '“In India, legal text has historically been convoluted and intimidating for the everyday citizen. When a family loses savings to a cyber scam, or a citizen is turned away at a police station, actionable statutory knowledge is life-changing. I engineered NyayaMitra to put the power of the Indian Constitution, the new Bharatiya Nyaya Sanhita, and SHO-ready procedural drafting directly into the hands of 1.4 billion citizens—free, private, and in their mother tongue.”'}
            </p>
            <div className="creator-badges-row">
              <span className="spec-chip">
                <Globe size={13} />
                <span>8 Indian Languages</span>
              </span>
              <span className="spec-chip">
                <Lock size={13} />
                <span>100% Client-Side Privacy</span>
              </span>
              <span className="spec-chip">
                <ShieldCheck size={13} />
                <span>BNS 2023 & IPC 1860 Compliant</span>
              </span>
              <span className="spec-chip">
                <Heart size={13} className="text-ruby" />
                <span>Built for Indian Citizens</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* App Highlights Grid */}
      <div className="about-stats-grid">
        <div className="about-stat-card">
          <div className="stat-number">2023 & 1860</div>
          <div className="stat-title">{isHindi ? 'दोहरी वैधानिक मैपिंग' : 'Dual-Statute Engine'}</div>
          <p className="stat-desc">
            {isHindi ? 'भारतीय न्याय संहिता (BNS) और भारतीय दंड संहिता (IPC) की धाराओं का तात्कालिक तुलनात्मक विश्लेषण।' : 'Instant cross-referencing between Bharatiya Nyaya Sanhita (BNS 2023) and former Indian Penal Code (IPC 1860).'}
          </p>
        </div>

        <div className="about-stat-card">
          <div className="stat-number">1930 SOS</div>
          <div className="stat-title">{isHindi ? 'साइबर गोल्डन ऑवर' : 'Golden Hour Protocol'}</div>
          <p className="stat-desc">
            {isHindi ? 'ऑनलाइन फ्रॉड के 2 घंटे के भीतर बैंक खाता फ्रीज और पोर्टल क्लेम प्रक्रिया का त्वरित समाधान।' : 'Direct integration with 1930 National Helpline and 200+ Indian bank fraud desks.'}
          </p>
        </div>

        <div className="about-stat-card">
          <div className="stat-number">Sec 173 BNSS</div>
          <div className="stat-title">{isHindi ? 'ज़ीरो FIR गारंटी' : 'Zero FIR Legal Drafting'}</div>
          <p className="stat-desc">
            {isHindi ? 'थाना प्रभारी (SHO) हेतु 2 मिनट में उच्च-सटीक formal शिकायत पत्र तैयार करने की सुविधा।' : 'Structured, SHO-ready police complaint generator with mandatory Zero FIR citations.'}
          </p>
        </div>

        <div className="about-stat-card">
          <div className="stat-number">Article 39A</div>
          <div className="stat-title">{isHindi ? 'मुफ्त सरकारी वकील' : 'NALSA Free Legal Aid'}</div>
          <p className="stat-desc">
            {isHindi ? 'संवैधानिक प्रावधान के तहत निशुल्क विधिक सहायता की पात्रता जांच और ब्रीफ शीट।' : 'Free legal representation eligibility audit for citizens under ₹3L annual income, women, and detainees.'}
          </p>
        </div>
      </div>

      {/* Section: How To Use This App (Detailed Visual Workflow) */}
      <div className="how-to-use-section">
        <div className="section-title-wrap">
          <div className="hub-eyebrow">
            <HelpCircle size={15} className="text-gold" />
            <span>{isHindi ? 'उपयोग मार्गदर्शिका' : 'User Manual & Step-by-Step Guide'}</span>
          </div>
          <h2 className="section-main-heading">
            {isHindi ? 'न्यायमित्र का उपयोग कैसे करें?' : 'How to Use NyayaMitra: Step-by-Step'}
          </h2>
          <p className="section-sub-heading">
            {isHindi 
              ? 'अपनी कानूनी समस्या का समाधान पाने के लिए नीचे दिए गए 7 चरणों का पालन करें:' 
              : 'Follow these intuitive steps to leverage NyayaMitra\'s legal intelligence suite for your situation:'}
          </p>
        </div>

        <div className="how-to-steps-list">
          {STEPS_DATA.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.stepNum} className={`how-step-card border-accent-${step.color}`}>
                <div className="step-num-badge">{step.stepNum}</div>
                <div className="step-body">
                  <div className="step-header-row">
                    <div>
                      <h3 className="step-title">{step.title}</h3>
                      <span className="step-subtitle">{step.subtitle}</span>
                    </div>
                    <div className={`step-icon-bubble icon-${step.color}`}>
                      <Icon size={22} />
                    </div>
                  </div>
                  <p className="step-description">{step.desc}</p>
                  <div className="step-footer-row">
                    <button 
                      onClick={() => onNavigateTab && onNavigateTab(step.id)}
                      className="step-jump-btn"
                    >
                      <span>{step.actionText}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ethical Legal Principles & Trust */}
      <div className="ethics-card">
        <div className="ethics-header">
          <ShieldCheck size={24} className="text-emerald" />
          <h3 className="ethics-heading">
            {isHindi ? 'गोपनीयता और कानूनी नैतिकता सिद्धांत' : 'Commitment to Privacy & Legal Ethics'}
          </h3>
        </div>
        <div className="ethics-grid">
          <div className="ethics-item">
            <CheckCircle2 size={18} className="text-emerald flex-shrink-0" />
            <div>
              <strong>{isHindi ? 'शून्य डेटा भंडारण (Zero Data Retention):' : 'Zero Data Storage:'}</strong>
              <span> {isHindi ? 'आपकी शिकायत या प्रश्नों का कोई भी डेटा सर्वर पर लॉग नहीं होता।' : 'All analysis and complaint drafting executes locally in your browser memory.'}</span>
            </div>
          </div>
          <div className="ethics-item">
            <CheckCircle2 size={18} className="text-emerald flex-shrink-0" />
            <div>
              <strong>{isHindi ? 'बार काउंसिल अनुपालन:' : 'Bar Council Compliance:'}</strong>
              <span> {isHindi ? 'यह मंच विधिक जागरूकता और प्रक्रियात्मक सहायता हेतु है, मुवक्किल-वकील का संबंध स्थापित नहीं करता।' : 'Designed strictly for legal literacy and procedural drafting pursuant to Article 39A.'}</span>
            </div>
          </div>
          <div className="ethics-item">
            <CheckCircle2 size={18} className="text-emerald flex-shrink-0" />
            <div>
              <strong>{isHindi ? 'बहुभाषी व आवाज़ सक्षम:' : 'Voice & Regional Language First:'}</strong>
              <span> {isHindi ? 'सभी 8 भारतीय भाषाओं में स्पष्ट व बिना किसी कानूनी जटिलता के उत्तर।' : 'Designed for every Indian citizen, with speech synthesis and voice recognition.'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Section */}
      <div className="faq-section">
        <h2 className="faq-heading">
          {isHindi ? 'अक्सर पूछे जाने वाले सवाल (FAQs)' : 'Frequently Asked Questions'}
        </h2>
        <div className="faq-accordion">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className={`faq-card ${isOpen ? 'faq-open' : ''}`}>
                <button 
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} className="text-gold" /> : <ChevronDown size={18} />}
                </button>
                {isOpen && (
                  <div className="faq-answer-panel">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Creator Footer Callout */}
      <div className="about-footer-callout">
        <div className="callout-content">
          <Scale size={28} className="text-gold" />
          <h3 className="callout-title">
            {isHindi ? 'न्याय सबके लिए • न्यायमित्र' : 'Justice for Every Citizen • NyayaMitra'}
          </h3>
          <p className="callout-desc">
            {isHindi 
              ? 'अर्जित जायसवाल (Arjit Jaiswal) द्वारा संकल्पित और विकसित। भारत के प्रत्येक नागरिक के कानूनी अधिकारों की सुरक्षा हेतु समर्पित।' 
              : 'Conceived, engineered, and maintained by Arjit Jaiswal. Dedicated to empowering Indian citizens with statutory clarity and constitutional safeguards.'}
          </p>
          <div className="callout-actions">
            <button 
              onClick={() => onNavigateTab && onNavigateTab('query')} 
              className="callout-primary-btn"
            >
              <span>{isHindi ? 'डैशबोर्ड पर सवाल पूछें' : 'Start with AI Legal Query'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
