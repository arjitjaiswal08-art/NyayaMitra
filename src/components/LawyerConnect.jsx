import React, { useState } from 'react';
import { 
  UserCheck, PhoneCall, Scale, ShieldCheck, CheckCircle2, 
  Printer, Copy, Check, FileText, HelpCircle, ExternalLink, Building 
} from 'lucide-react';
import { LEGAL_AID_DIRECTORY, TRANSLATIONS } from '../data/legalKnowledge';

export default function LawyerConnect({ lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const lT = t.lawyerConnect || TRANSLATIONS.en.lawyerConnect;

  // Free Legal Aid Eligibility State
  const [isWomanOrChild, setIsWomanOrChild] = useState(false);
  const [isSCST, setIsSCST] = useState(false);
  const [inCustody, setInCustody] = useState(false);
  const [isLowIncome, setIsLowIncome] = useState(false);

  // Consultation Brief Builder State
  const [clientName, setClientName] = useState(lang === 'hi' ? 'अनन्या सेन' : 'Ananya Sen');
  const [caseType, setCaseType] = useState(lang === 'hi' ? 'मकान मालिक से सिक्योरिटी डिपॉजिट वसूली' : 'Recovery of Security Deposit from Landlord');
  const [monetaryStake, setMonetaryStake] = useState('₹75,000');
  const [factsSummary, setFactsSummary] = useState(
    lang === 'hi'
      ? '1 महीने का पूर्ण नोटिस देकर 31 अगस्त 2026 को किराए का फ्लैट खाली किया। मकान मालिक ने व्हाट्सएप पर शांतिपूर्ण कब्जा स्वीकार किया, लेकिन बाद में बिना बिल दिए ₹75,000 का सिक्योरिटी डिपॉजिट लौटाने से इनकार कर दिया।'
      : 'Vacated rented flat on 31st August 2026 after serving full 1-month notice. Landlord acknowledged peaceful possession in WhatsApp message, but subsequently refused to return security deposit of ₹75,000, claiming vague painting expenses without providing bills.'
  );
  const [keyDates, setKeyDates] = useState(
    lang === 'hi'
      ? 'लीज: 1 अक्टूबर 2025 | नोटिस: 31 जुलाई 2026 | फ्लैट खाली: 31 अगस्त 2026'
      : 'Lease: 1st Oct 2025 | Notice: 31st July 2026 | Vacated: 31st Aug 2026'
  );
  const [documentsAttached, setDocumentsAttached] = useState(
    lang === 'hi'
      ? '11 महीने का रेंट एग्रीमेंट, फ्लैट खाली करते समय की तस्वीरें, व्हाट्सएप चैट एक्सपोर्ट, बैंक ट्रांसफर रसीद।'
      : '11-Month Lease Agreement, Move-out photos, WhatsApp chat export, Bank statement showing original deposit transfer.'
  );
  const [desiredRelief, setDesiredRelief] = useState(
    lang === 'hi'
      ? '₹75,000 डिपॉजिट की 18% वार्षिक ब्याज और कानूनी नोटिस खर्च सहित पूर्ण वापसी।'
      : 'Full refund of ₹75,000 deposit along with 18% p.a. statutory interest and legal notice expenses.'
  );

  const [briefCopied, setBriefCopied] = useState(false);

  const isEligibleForFreeAid = isWomanOrChild || isSCST || inCustody || isLowIncome;

  const generatedBrief = lang === 'hi'
    ? `=====================================================
अधिवक्ता परामर्श ब्रीफ (मुकदमा पूर्व केस सारांश)
न्यायमित्र AI कानूनी सहायक द्वारा तैयार
=====================================================

1. मुवक्किल / प्रार्थी का विवरण:
   - मुवक्किल का नाम: ${clientName}
   - विवाद की प्रकृति: ${caseType}
   - अनुमानित आर्थिक राशि / नुकसान: ${monetaryStake}

2. प्रमुख तिथियों का क्रम:
   ${keyDates}

3. मामले के मुख्य तथ्य:
   ${factsSummary}

4. रिकॉर्ड पर उपलब्ध दस्तावेजी साक्ष्य:
   ${documentsAttached}

5. मुवक्किल द्वारा अपेक्षित राहत / समाधान:
   ${desiredRelief}

6. अधिवक्ता महोदय से मुख्य वैधानिक प्रश्न:
   - क्या मुकदमा दायर करने से पूर्व 15-दिवसीय वैधानिक कानूनी नोटिस भेजना उचित होगा?
   - क्या यह मामला रेंट ट्रिब्यूनल या सीपीसी के ऑर्डर 37 के अंतर्गत आता है?
   - क्या मानसिक प्रताड़ना और ब्याज की मांग की जा सकती है?

=====================================================
गोपनीय एवं विशेષાધિકૃત વિધિક પરામર્શ બ્રીફ
=====================================================`
    : `=====================================================
ADVOCATE CONSULTATION BRIEF (PRE-LITIGATION SUMMARY)
Prepared via NyayaMitra AI Legal Assistant
=====================================================

1. CLIENT DETAILS:
   - Client Name: ${clientName}
   - Nature of Dispute: ${caseType}
   - Estimated Financial Stake: ${monetaryStake}

2. CHRONOLOGY OF KEY DATES:
   ${keyDates}

3. SUMMARY OF MATERIAL FACTS:
   ${factsSummary}

4. DOCUMENTARY EVIDENCE AVAILABLE ON RECORD:
   ${documentsAttached}

5. SPECIFIC RELIEF / OUTCOME SOUGHT BY CLIENT:
   ${desiredRelief}

6. STATUTORY QUESTIONS FOR ADVOCATE:
   - Would sending a formal 15-day Statutory Legal Notice be advisable prior to filing suit?
   - Does this matter fall under Summary Suit (Order 37 CPC) or Rent Tribunal jurisdiction?
   - Can interest and damages for mental agony be claimed?

=====================================================
CONFIDENTIAL & PRIVILEGED PRE-CONSULTATION SUMMARY
=====================================================`;

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(generatedBrief);
    setBriefCopied(true);
    setTimeout(() => setBriefCopied(false), 2500);
  };

  const handlePrintBrief = () => {
    window.print();
  };

  return (
    <div className="lawyer-connect-container">
      {/* Hero Header */}
      <div className="module-hero">
        <div className="hero-content">
          <div className="hero-pill">
            <UserCheck size={14} className="text-gold" />
            <span>{lT.heroPill || "Advocate Connect & Free Legal Aid Redressal"}</span>
          </div>
          <h1 className="hero-title">{lT.heroTitle || "Free Legal Aid (NALSA) & Advocate Brief Builder"}</h1>
          <p className="hero-desc">
            {lT.heroDesc || "Check your eligibility for free government legal representation under Article 39A of the Constitution of India, or generate a structured 1-page consultation brief to take to an advocate."}
          </p>
        </div>

        {/* NALSA Emergency Helpline Banner */}
        <div className="nalsa-callout-strip">
          <div className="nalsa-logo-group">
            <Scale size={24} className="text-gold" />
            <div>
              <div className="nalsa-name">{lT.nalsaName || "National Legal Services Authority (NALSA)"}</div>
              <div className="nalsa-toll">{(lT.nalsaToll && lT.nalsaToll.replace('15100', '')) || "Toll-Free National Helpline: "} <strong>15100</strong></div>
            </div>
          </div>
          <a href="tel:15100" className="nalsa-dial-btn">
            <PhoneCall size={16} />
            <span>{lT.nalsaCallBtn || "Call 15100 for Free Legal Aid"}</span>
          </a>
        </div>
      </div>

      <div className="lawyer-connect-grid">
        {/* Left Column: Free Legal Aid Eligibility Checker */}
        <div className="card legal-aid-card">
          <div className="card-header">
            <div className="card-title-group">
              <ShieldCheck size={20} className="text-emerald" />
              <h3 className="card-title">{lT.checkerTitle || "Free Legal Aid Eligibility Checker"}</h3>
            </div>
            <span className="badge-statute">Section 12, NALSA Act</span>
          </div>

          <div className="card-body">
            <p className="aid-desc">
              {lT.checkerDesc || "Select all criteria that apply to you to verify if you qualify for an official, free government advocate and waived court fees:"}
            </p>

            <div className="eligibility-checkboxes">
              <label className="eligibility-option">
                <input
                  type="checkbox"
                  checked={isWomanOrChild}
                  onChange={(e) => setIsWomanOrChild(e.target.checked)}
                />
                <div className="option-text">
                  <strong>{lT.critWoman || "Woman or Child (Under 18 Years)"}</strong>
                  <span>{lang === 'hi' ? "धारा 12(c) के तहत आय सीमा के बिना स्वतः वैधानिक अधिकार।" : "Automatic statutory entitlement under Section 12(c) regardless of income."}</span>
                </div>
              </label>

              <label className="eligibility-option">
                <input
                  type="checkbox"
                  checked={isSCST}
                  onChange={(e) => setIsSCST(e.target.checked)}
                />
                <div className="option-text">
                  <strong>{lT.critSCST || "Scheduled Caste (SC) or Scheduled Tribe (ST)"}</strong>
                  <span>{lang === 'hi' ? "धारा 12(a) के तहत वैधानिक पात्रता।" : "Statutory entitlement under Section 12(a)."}</span>
                </div>
              </label>

              <label className="eligibility-option">
                <input
                  type="checkbox"
                  checked={inCustody}
                  onChange={(e) => setInCustody(e.target.checked)}
                />
                <div className="option-text">
                  <strong>{lT.critCustody || "Person in Custody, Detention, or Juvenile Home"}</strong>
                  <span>{lang === 'hi' ? "संविधान के अनुच्छेद 39A द्वारा गारंटीकृत अनिवार्य मुफ्त विधिक बचाव।" : "Mandatory free legal defense guaranteed by Article 39A."}</span>
                </div>
              </label>

              <label className="eligibility-option">
                <input
                  type="checkbox"
                  checked={isLowIncome}
                  onChange={(e) => setIsLowIncome(e.target.checked)}
                />
                <div className="option-text">
                  <strong>{lT.critIncome || "Annual Income Below ₹3,00,000"}</strong>
                  <span>{lang === 'hi' ? "जिला विधिक सेवा प्राधिकरण (DLSA) आय सीमा के तहत योग्य।" : "Qualifies under District Legal Services Authority (DLSA) income thresholds."}</span>
                </div>
              </label>
            </div>

            {/* Verdict Box */}
            <div className={`aid-verdict-box ${isEligibleForFreeAid ? 'eligible' : 'standard'}`}>
              {isEligibleForFreeAid ? (
                <>
                  <CheckCircle2 size={24} className="text-emerald flex-shrink-0" />
                  <div>
                    <h4 className="verdict-title">{lT.eligibleTitle || "You Qualify for 100% Free Legal Aid!"}</h4>
                    <p className="verdict-desc">
                      {lT.eligibleDesc || "You are entitled to a free lawyer appointed by the District Legal Services Authority (DLSA) located at your District Court complex."}
                    </p>
                    <div className="verdict-contact">
                      {lang === 'hi' ? '15100 डायल करें या अपने नजदीकी जिला न्यायालय के फ्रंट ऑफिस में जाएं।' : 'Dial 15100 or visit your nearest District Court Front Office.'}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <HelpCircle size={24} className="text-gold flex-shrink-0" />
                  <div>
                    <h4 className="verdict-title">{lT.notEligibleTitle || "Standard Legal Representation"}</h4>
                    <p className="verdict-desc">
                      {lT.notEligibleDesc || "If you do not meet the Section 12 criteria, you can engage a private advocate verified by the State Bar Council, or approach Lok Adalats."}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: 1-Page Consultation Brief Generator */}
        <div className="card brief-generator-card">
          <div className="card-header">
            <div className="card-title-group">
              <FileText size={20} className="text-gold" />
              <h3 className="card-title">{lT.builderTitle || "Advocate Consultation Brief Builder"}</h3>
            </div>
            <div className="brief-header-actions">
              <button onClick={handleCopyBrief} className="icon-action-btn">
                {briefCopied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                <span>{briefCopied ? (lT.copiedBtn || 'Copied!') : (lT.copyBriefBtn || 'Copy')}</span>
              </button>
              <button onClick={handlePrintBrief} className="print-btn-primary">
                <Printer size={14} />
                <span>{lT.printBriefBtn || "Print / Save PDF"}</span>
              </button>
            </div>
          </div>

          <div className="card-body">
            <p className="brief-intro-text">
              {lT.builderDesc || "Save time and legal consultation fees by handing this structured pre-consultation brief to your advocate:"}
            </p>

            <div className="brief-form-fields">
              <div className="form-row">
                <div className="form-group">
                  <label>{lT.nameLabel || "Client Name"}</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>{lT.stakeLabel || "Estimated Amount / Stake"}</label>
                  <input
                    type="text"
                    value={monetaryStake}
                    onChange={(e) => setMonetaryStake(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{lT.disputeLabel || "Nature of Dispute"}</label>
                <input
                  type="text"
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>{lT.factsLabel || "Summary of Facts"}</label>
                <textarea
                  value={factsSummary}
                  onChange={(e) => setFactsSummary(e.target.value)}
                  rows={3}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label>{lT.datesLabel || "Key Dates Chronology"}</label>
                <input
                  type="text"
                  value={keyDates}
                  onChange={(e) => setKeyDates(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>{lT.docsLabel || "Documents Available on Record"}</label>
                <input
                  type="text"
                  value={documentsAttached}
                  onChange={(e) => setDocumentsAttached(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>{lT.reliefLabel || "Desired Relief / Outcome"}</label>
                <input
                  type="text"
                  value={desiredRelief}
                  onChange={(e) => setDesiredRelief(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Brief Output Sheet */}
            <div className="brief-sheet-preview printable-area">
              <pre>{generatedBrief}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
