import React, { useState } from 'react';
import { 
  ShieldAlert, PhoneCall, Globe, AlertTriangle, Clock, 
  ExternalLink, CheckCircle2, Copy, Check, FileCheck, ShieldCheck, 
  Building2, Smartphone, ArrowRight
} from 'lucide-react';
import { TRANSLATIONS } from '../data/legalKnowledge';

export default function CyberEmergencyRoom({ lang = 'en', onNavigateTab }) {
  const [copiedNumber, setCopiedNumber] = useState(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const cT = t.cyber || TRANSLATIONS.en.cyber;

  const bankHelplines = [
    { name: "State Bank of India (SBI)", tollFree: "1800 11 1109", alt: "1800 1234", website: "https://www.onlinesbi.sbi" },
    { name: "HDFC Bank", tollFree: "1800 202 6161", alt: "1800 1600", website: "https://www.hdfcbank.com" },
    { name: "ICICI Bank", tollFree: "1800 266 7766", alt: "1800 1080", website: "https://www.icicibank.com" },
    { name: "Axis Bank", tollFree: "1800 419 0068", alt: "1800 103 5577", website: "https://www.axisbank.com" },
    { name: "Punjab National Bank (PNB)", tollFree: "1800 180 2222", alt: "1800 103 2222", website: "https://pnbindia.in" },
    { name: "Kotak Mahindra Bank", tollFree: "1860 266 2666", alt: "1800 209 0000", website: "https://www.kotak.com" },
    { name: "PhonePe", tollFree: "080 6872 7374", alt: "022 6872 7374", website: "https://www.phonepe.com" },
    { name: "Google Pay (India)", tollFree: "1800 419 0157", alt: "In-app support", website: "https://pay.google.com" },
    { name: "Paytm Payments Bank", tollFree: "0120 3888 388", alt: "0120 4456 456", website: "https://paytm.com" }
  ];

  const handleCopy = (num) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  return (
    <div className="cyber-emergency-container">
      {/* Critical Alert Hero */}
      <div className="cyber-hero-banner">
        <div className="cyber-hero-content">
          <div className="urgent-status-tag">
            <Clock size={16} className="pulse-icon" />
            <span>{cT.heroBadge || "CRITICAL: GOLDEN HOUR PROTOCOL ACTIVE"}</span>
          </div>
          <h1 className="cyber-title">
            {cT.heroTitle || "Lost Money via UPI, Phishing, or Bank Fraud?"}
          </h1>
          <p className="cyber-desc">
            {cT.heroDesc || "Act within the first 2 to 3 hours before fraudsters withdraw or transfer money across mule accounts. Follow the 4-step emergency action roadmap below."}
          </p>
        </div>

        {/* 1930 Callout Box */}
        <div className="callout-1930-box">
          <div className="callout-badge">{cT.helplineBadge || "NATIONAL CYBER FRAUD HELPLINE"}</div>
          <div className="callout-number">{cT.helplineNumber || "1930"}</div>
          <p className="callout-subtext">{cT.helplineSubtext || "Free Government Toll-Free Helpline (Citizen Financial Cyber Fraud Reporting System)"}</p>
          <a href="tel:1930" className="dial-1930-btn">
            <PhoneCall size={20} />
            <span>{cT.dialNowBtn || "DIAL 1930 NOW"}</span>
          </a>
        </div>
      </div>

      {/* 4-Step Emergency Action Grid */}
      <div className="cyber-steps-section">
        <h2 className="section-title">
          <ShieldAlert size={20} className="text-danger" />
          <span>{cT.planTitle || "Immediate 4-Step Emergency Action Plan:"}</span>
        </h2>

        <div className="cyber-steps-grid">
          {/* Step 1 */}
          <div className="card cyber-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">1</span>
              <h3 className="step-title">{cT.step1Title || "Call 1930 Immediately"}</h3>
            </div>
            <p className="step-desc">
              {cT.step1Desc || "Operated by the Indian Cyber Crime Coordination Centre (I4C). It triggers an instant freeze alert on the recipient bank/wallet account across 200+ partner banks."}
            </p>
            <div className="step-key-info">
              {cT.step1Info || "Have ready: Your Bank Name, Debit Account No, Transaction UTR / Ref No, Date & Time."}
            </div>
          </div>

          {/* Step 2 */}
          <div className="card cyber-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">2</span>
              <h3 className="step-title">{cT.step2Title || "Freeze Bank Account & UPI"}</h3>
            </div>
            <p className="step-desc">
              {cT.step2Desc || "Call your bank's fraud desk to block compromised cards/net banking and register an official Chargeback Dispute Ticket."}
            </p>
            <div className="step-key-info">
              {cT.step2Info || "Crucial: Note down the bank's formal Complaint Ticket Number for follow-ups."}
            </div>
          </div>

          {/* Step 3 */}
          <div className="card cyber-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">3</span>
              <h3 className="step-title">{cT.step3Title || "Lodge on cybercrime.gov.in"}</h3>
            </div>
            <p className="step-desc">
              {cT.step3Desc || "File a statutory complaint on the National Cyber Crime Reporting Portal. Upload debit SMS, UPI transaction receipt, and screenshots."}
            </p>
            <div className="step-key-info">
              {cT.step3Info || "Save: The Acknowledgement Number (AKN) for police and bank records."}
            </div>
          </div>

          {/* Step 4 */}
          <div className="card cyber-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">4</span>
              <h3 className="step-title">{cT.step4Title || "File Police Complaint / FIR"}</h3>
            </div>
            <p className="step-desc">
              {cT.step4Desc || "Visit your local police station or district Cyber Cell with your AKN number and bank dispute proof to file a formal Zero FIR under BNS 318(4) & IT Act 66D."}
            </p>
            <div className="step-key-info">
              <button 
                onClick={() => onNavigateTab && onNavigateTab('autoFir')}
                className="step-link-btn"
              >
                <span>{cT.draftFirBtn || "Draft FIR Letter in 2 Mins"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RBI Zero Liability Framework Card */}
      <div className="card rbi-framework-card">
        <div className="card-header">
          <div className="card-title-group">
            <ShieldCheck size={20} className="text-emerald" />
            <h3 className="card-title">{cT.rbiTitle || "RBI Zero Customer Liability Protection (Know Your Rights)"}</h3>
          </div>
          <span className="badge-statute">{cT.rbiBadge || "RBI Master Circular 2017"}</span>
        </div>

        <div className="card-body">
          <p className="rbi-intro">
            {cT.rbiIntro || "Under Reserve Bank of India (RBI) directives on electronic banking transactions, your liability is legally protected:"}
          </p>
          <div className="rbi-rules-grid">
            <div className="rbi-rule-box zero-liability">
              <div className="rbi-tag">{cT.rbiZeroTag || "100% ZERO LIABILITY"}</div>
              <h4>{cT.rbiZeroPeriod || "Reported Within 3 Days"}</h4>
              <p>{cT.rbiZeroDesc || "If fraudulent transaction occurred due to bank deficiency OR third-party breach where deficiency lies neither with bank nor you, and you report within 3 working days."}</p>
            </div>
            <div className="rbi-rule-box limited-liability">
              <div className="rbi-tag">{cT.rbiLimTag || "LIMITED LIABILITY"}</div>
              <h4>{cT.rbiLimPeriod || "Reported in 4 to 7 Days"}</h4>
              <p>{cT.rbiLimDesc || "Maximum customer liability is capped at ₹5,000 to ₹10,000 (for savings accounts) even if actual loss was higher."}</p>
            </div>
            <div className="rbi-rule-box discretion-liability">
              <div className="rbi-tag">{cT.rbiBankTag || "BANK POLICY"}</div>
              <h4>{cT.rbiBankPeriod || "Reported Beyond 7 Days"}</h4>
              <p>{cT.rbiBankDesc || "Customer liability is determined according to the individual bank's board-approved fraud policy."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Bank Helplines Table */}
      <div className="card bank-helpline-card">
        <div className="card-header">
          <div className="card-title-group">
            <Building2 size={18} className="text-gold" />
            <h3 className="card-title">{cT.tableTitle || "Official Bank & UPI Fraud Emergency Contact Numbers"}</h3>
          </div>
          <span className="badge-counter">{bankHelplines.length} {cT.tableBadge || "Verified Institutions"}</span>
        </div>

        <div className="card-body">
          <div className="bank-table-responsive">
            <table className="bank-table">
              <thead>
                <tr>
                  <th>{cT.thBank || "Bank / Platform"}</th>
                  <th>{cT.thTollFree || "Toll-Free Fraud Helpline"}</th>
                  <th>{cT.thAlt || "Alternative Emergency Number"}</th>
                  <th>{cT.thAction || "Quick Action"}</th>
                </tr>
              </thead>
              <tbody>
                {bankHelplines.map((bank, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{bank.name}</strong>
                    </td>
                    <td>
                      <a href={`tel:${bank.tollFree.replace(/\s+/g, '')}`} className="bank-phone-link">
                        <PhoneCall size={14} />
                        <span>{bank.tollFree}</span>
                      </a>
                    </td>
                    <td>
                      <span className="alt-phone">{bank.alt}</span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleCopy(bank.tollFree)}
                        className="copy-phone-btn"
                        title="Copy Helpline Number"
                      >
                        {copiedNumber === bank.tollFree ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                        <span>{copiedNumber === bank.tollFree ? (cT.copiedBtn || 'Copied') : (cT.copyBtn || 'Copy')}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
