import React, { useState } from 'react';
import { 
  BookOpen, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, 
  FileText, ArrowRight, ShieldCheck, ListChecks, HelpCircle 
} from 'lucide-react';
import { CONTRACT_PRESETS, TRANSLATIONS } from '../data/legalKnowledge';

export default function DocumentExplainer({ lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const docT = t.docExplainer || TRANSLATIONS.en.docExplainer;
  const [selectedPresetKey, setSelectedPresetKey] = useState('rental_agreement');
  const [customText, setCustomText] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const activeData = isCustom
    ? {
        name: docT.presetCustom ? docT.presetCustom.replace('+ ', '') : "Custom Pasted Legal Contract",
        category: lang === 'hi' ? "उपयोगकर्ता द्वारा अपलोड समझौता" : "User Uploaded Agreement",
        riskLevel: "Moderate",
        riskScore: 65,
        sampleText: customText,
        redFlags: [
          {
            clause: lang === 'hi' ? "एकतरफा मध्यस्थ की नियुक्ति" : "Arbitrary Dispute Resolution / Unilateral Arbitrator",
            severity: "High",
            explanation: lang === 'hi'
              ? "दोनों पक्षों की सहमति के बिना अकेले एक पक्ष द्वारा मध्यस्थ नियुक्त करने वाला क्लॉज मध्यस्थતા अधिनियम 1996 की धारा 12(5) के तहत अमान्य है।"
              : "Clauses that allow one party to choose the sole arbitrator without mutual consent are invalid under Section 12(5) of the Arbitration and Conciliation Act 1996."
          },
          {
            clause: lang === 'hi' ? "अत्यधिक अनुचित जुर्माना / पेनल्टी" : "Liquidated Damages / Unreasonable Penalty",
            severity: "Moderate",
            explanation: lang === 'hi'
              ? "भारतीय अनुबंध अधिनियम 1872 की धारा 74 के तहत अदालत केवल वास्तविक नुकसान का उचित मुआवजा दिलाती है, अत्यधिक पेनल्टी नहीं।"
              : "Under Section 74 of the Indian Contract Act 1872, a court will only award reasonable compensation for actual proven damage, regardless of excessive penalty sums stipulated in the contract."
          }
        ],
        plainSummary: lang === 'hi'
          ? "इस अनुबंध में ऐसे क्लॉज हैं जो एक पक्ष को भुगतान व समाप्ति के व्यापक अधिकार देते हैं और दूसरे पक्ष के कानूनी उपचार सीमित करते हैं।"
          : "This document contains clauses where one party assumes broader discretion over payments and termination while limiting the counterparty's remedies.",
        renegotiationChecklist: lang === 'hi'
          ? [
              "दोनों पक्षों के लिए समान नोटिस अवधि (जैसे 30 दिन) सुनिश्चित करें।",
              "एकतरफा मध्यस्थता या दूरस्थ शहरों के क्षेत्राधिकार वाले क्लॉज हटाएं।",
              "किसी भी वित्तीय देनदारी को अनुबंध के तहत भुगतान की गई वास्तविक फीस तक सीमित करें।"
            ]
          : [
              "Ensure bilateral notice periods (e.g., 30 days for both parties).",
              "Remove unilateral arbitration or exclusive jurisdiction clauses located in remote cities.",
              "Cap any financial liabilities to the actual fees paid under the contract."
            ]
      }
    : CONTRACT_PRESETS[selectedPresetKey];

  return (
    <div className="doc-explainer-container">
      {/* Hero Header */}
      <div className="module-hero">
        <div className="hero-content">
          <div className="hero-pill">
            <BookOpen size={14} className="text-gold" />
            <span>{docT.heroPill}</span>
          </div>
          <h1 className="hero-title">{docT.heroTitle}</h1>
          <p className="hero-desc">
            {docT.heroDesc}
          </p>
        </div>

        {/* Preset Contract Selectors */}
        <div className="contract-preset-bar">
          <span className="preset-label">{docT.presetsLabel}</span>
          <div className="preset-buttons">
            <button
              onClick={() => { setSelectedPresetKey('rental_agreement'); setIsCustom(false); }}
              className={`preset-btn ${!isCustom && selectedPresetKey === 'rental_agreement' ? 'active' : ''}`}
            >
              {docT.presetRental}
            </button>
            <button
              onClick={() => { setSelectedPresetKey('employment_agreement'); setIsCustom(false); }}
              className={`preset-btn ${!isCustom && selectedPresetKey === 'employment_agreement' ? 'active' : ''}`}
            >
              {docT.presetEmployment}
            </button>
            <button
              onClick={() => { setSelectedPresetKey('freelance_nda'); setIsCustom(false); }}
              className={`preset-btn ${!isCustom && selectedPresetKey === 'freelance_nda' ? 'active' : ''}`}
            >
              {docT.presetFreelance}
            </button>
            <button
              onClick={() => { setIsCustom(true); }}
              className={`preset-btn ${isCustom ? 'active' : ''}`}
            >
              {docT.presetCustom}
            </button>
          </div>
        </div>
      </div>

      <div className="doc-analysis-grid">
        {/* Left Column: Contract Text Input / Preview */}
        <div className="card doc-source-card">
          <div className="card-header">
            <div className="card-title-group">
              <FileText size={16} className="text-gold" />
              <h3 className="card-title">{activeData.name}</h3>
            </div>
            <span className="doc-category-badge">{activeData.category}</span>
          </div>

          <div className="card-body">
            {isCustom ? (
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={docT.customPlaceholder || "Paste the agreement text, clauses, or offer letter excerpts here..."}
                rows={12}
                className="custom-contract-textarea"
              />
            ) : (
              <div className="contract-text-preview">
                <pre>{activeData.sampleText}</pre>
              </div>
            )}

            <div className="contract-tip-box">
              <HelpCircle size={15} className="text-gold flex-shrink-0" />
              <span>
                <strong>{docT.ruleOfThumbTitle || "Indian Legal Rule of Thumb:"}</strong> {docT.ruleOfThumbText || "Any clause in an agreement that unconditionally restricts you from pursuing a job or profession after resigning is completely VOID under Section 27 of the Indian Contract Act 1872."}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis & Risk Meter */}
        <div className="doc-breakdown-column">
          {/* Risk Score Meter Card */}
          <div className="card risk-meter-card">
            <div className="risk-meter-header">
              <div className="risk-score-badge">
                <ShieldAlert size={20} className={activeData.riskScore > 70 ? 'text-danger' : 'text-warning'} />
                <div>
                  <span className="risk-title">{docT.riskRatingTitle || "Legal Risk Rating"}</span>
                  <div className="risk-level-tag">
                    {activeData.riskLevel === 'Low' ? (docT.riskLevelLow || 'Low') : activeData.riskLevel === 'High' ? (docT.riskLevelHigh || 'High') : (docT.riskLevelMod || 'Moderate')} ({activeData.riskScore}/100)
                  </div>
                </div>
              </div>
              <div className="risk-bar-container">
                <div 
                  className={`risk-bar-fill ${activeData.riskScore > 70 ? 'danger-fill' : 'warning-fill'}`} 
                  style={{ width: `${activeData.riskScore}%` }}
                />
              </div>
            </div>

            {/* 1. Summary of Document */}
            <div className="doc-summary-section">
              <h4 className="section-subtitle">
                <Sparkles size={15} className="text-gold" />
                <span>{docT.secSummaryTitle || "1. Plain-Language Summary"}</span>
              </h4>
              <p className="plain-summary-text">{activeData.plainSummary}</p>
            </div>
          </div>

          {/* 2 & 3. Key Clauses Explained & Red Flags */}
          <div className="card result-card">
            <div className="card-header">
              <div className="card-title-group">
                <AlertTriangle size={18} className="text-danger" />
                <h3 className="card-title">{docT.secRedFlagsTitle || "2 & 3. Critical Red Flags & Unlawful Terms"}</h3>
              </div>
              <span className="badge-counter danger-counter">{activeData.redFlags.length} {docT.redFlagsBadge || "Red Flags Detected"}</span>
            </div>

            <div className="card-body redflags-list">
              {activeData.redFlags.map((flag, idx) => (
                <div key={idx} className="redflag-item">
                  <div className="redflag-top">
                    <span className={`severity-tag ${flag.severity.toLowerCase()}`}>
                      {flag.severity === 'High' ? (docT.riskLevelHigh || 'High') : (docT.riskLevelMod || 'Moderate')}
                    </span>
                    <strong className="redflag-clause-title">{flag.clause}</strong>
                  </div>
                  <p className="redflag-reason">{flag.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. What User Should Check & Renegotiate */}
          <div className="card result-card checklist-card">
            <div className="card-header">
              <div className="card-title-group">
                <ListChecks size={18} className="text-emerald" />
                <h3 className="card-title">{docT.secRenegotiateTitle || "4. What You Should Renegotiate (Checklist)"}</h3>
              </div>
              <span className="badge-statute">{docT.actionableBadge || "Actionable Points"}</span>
            </div>

            <div className="card-body">
              <ul className="renegotiation-list">
                {activeData.renegotiationChecklist.map((item, idx) => (
                  <li key={idx} className="renegotiation-item">
                    <CheckCircle2 size={16} className="text-emerald flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
