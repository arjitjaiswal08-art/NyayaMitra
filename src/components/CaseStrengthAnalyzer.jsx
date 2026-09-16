import React, { useState } from 'react';
import { 
  Scale, 
  CheckCircle2, 
  AlertOctagon, 
  ShieldAlert, 
  HelpCircle, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  FileCheck, 
  AlertTriangle,
  Clock,
  Send,
  Zap,
  Mic,
  RotateCcw
} from 'lucide-react';
import { 
  CASE_CATEGORIES, 
  EVIDENCE_CHECKLIST_ITEMS, 
  analyzeCaseStrength 
} from '../utils/caseStrengthEngine';

export default function CaseStrengthAnalyzer({ language = 'en', onNavigateToFIR, onNavigateToVault }) {
  const isHindi = language === 'hi';

  const [selectedCategory, setSelectedCategory] = useState(CASE_CATEGORIES[0].id);
  const [narrative, setNarrative] = useState('');
  const [selectedEvidences, setSelectedEvidences] = useState(['bank_statement', 'chat_records']);
  const [delayDays, setDelayDays] = useState(3);
  const [noticeSent, setNoticeSent] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isListening, setIsListening] = useState(false);

  // Quick preset templates
  const applyPreset = (type) => {
    if (type === 'cyber') {
      setSelectedCategory('cyber_fraud');
      setNarrative('On 12th September 2026, I received a call from an individual claiming to be an officer from Mumbai Cyber Cell. He stated my Aadhaar was involved in money laundering. Under extreme intimidation, I was coerced into transferring Rs 1,45,000 via UPI (Ref UTR 425619882103) to a declared "verification account" in Yes Bank. Within 30 minutes, I realized it was a scam.');
      setSelectedEvidences(['bank_statement', 'chat_records', 'sec63_bsa_cert', 'police_gd_entry']);
      setDelayDays(1);
      setNoticeSent(false);
    } else if (type === 'cheating') {
      setSelectedCategory('cheating_breach');
      setNarrative('On 4th March 2026, contractor Mr. Rajesh Sharma entered into a written agreement to renovate my commercial premises for Rs 6,50,000. I paid an advance of Rs 3,00,000 via bank transfer. He demolished the structure and abandoned the site on 15th March. He has blocked my phone and misappropriated the funds without delivering materials.');
      setSelectedEvidences(['bank_statement', 'chat_records', 'written_agreement', 'accused_identity']);
      setDelayDays(14);
      setNoticeSent(true);
    }
  };

  const handleToggleEvidence = (id) => {
    if (selectedEvidences.includes(id)) {
      setSelectedEvidences(selectedEvidences.filter(item => item !== id));
    } else {
      setSelectedEvidences([...selectedEvidences, id]);
    }
  };

  const handleRunAnalysis = () => {
    const result = analyzeCaseStrength({
      categoryId: selectedCategory,
      narrative,
      selectedEvidences,
      timelineDelayDays: delayDays,
      noticeSent
    });
    setAnalysisResult(result);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(isHindi ? 'आपके ब्राउज़र में वॉयस इनपुट समर्थित नहीं है।' : 'Voice recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = isHindi ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setNarrative(prev => prev ? `${prev} ${speechText}` : speechText);
      setIsListening(false);
    };

    recognition.start();
  };

  const currentCategoryObj = CASE_CATEGORIES.find(c => c.id === selectedCategory) || CASE_CATEGORIES[0];
  const relevantEvidenceChecklist = EVIDENCE_CHECKLIST_ITEMS.filter(item => 
    item.types.includes('all') || item.types.includes(selectedCategory)
  );

  return (
    <div className="case-analyzer-wrapper animate-fadeIn" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 16px 60px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(17, 24, 39, 0.9) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '28px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ 
            background: '#10B981', 
            color: '#0B0F1A', 
            fontSize: '11px', 
            fontWeight: 800, 
            padding: '4px 10px', 
            borderRadius: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.6px'
          }}>
            {isHindi ? 'एआई केस सामर्थ्य विश्लेषक' : 'AI LITIGATION PROBABILITY ENGINE'}
          </span>
          <span style={{ color: '#FFB020', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <Scale size={16} /> {isHindi ? 'BNS 2023 व अदालती साक्ष्य मानक' : 'BNS 2023 & Evidence Act Benchmarks'}
          </span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#F8FAFC', margin: '0 0 6px' }}>
          {isHindi ? '⚖️ एआई केस सामर्थ्य व जीत संभावना विश्लेषक' : '⚖️ AI Case Strength & Win Probability Analyzer'}
        </h1>
        <p style={{ margin: 0, color: '#94A3B8', fontSize: '14px', maxWidth: '720px' }}>
          {isHindi 
            ? 'अपनी घटना दर्ज करें और जानें कि क्या आपका केस अदालत में टिकेगा। सबूतों की पर्याप्तता, विरोधी पक्ष की संभावित दलीलें और जीतने की संभावना (0-100%) का तुरंत विश्लेषण करें।'
            : 'Audit your case before approaching the police or courts. Evaluates statutory ingredients under Bharatiya Nyaya Sanhita (BNS), identifies fatal loopholes, predicts defense counter-arguments, and calculates win probability.'}
        </p>

        {/* Quick Presets */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', alignSelf: 'center' }}>
            {isHindi ? 'त्वरित उदाहरण:' : 'Quick Presets:'}
          </span>
          <button
            onClick={() => applyPreset('cyber')}
            style={{
              background: '#0B0F1A',
              border: '1px solid #374151',
              color: '#F1F5F9',
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Zap size={12} style={{ color: '#FFB020' }} />
            {isHindi ? 'साइबर फ्रॉड केस (₹1.45 लाख)' : 'Cyber Extortion (₹1.45L)'}
          </button>
          <button
            onClick={() => applyPreset('cheating')}
            style={{
              background: '#0B0F1A',
              border: '1px solid #374151',
              color: '#F1F5F9',
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Zap size={12} style={{ color: '#10B981' }} />
            {isHindi ? 'धोखाधड़ी / ब्रीच ऑफ ट्रस्ट (₹3 लाख)' : 'Contractual Fraud / Cheating (₹3L)'}
          </button>
        </div>
      </div>

      {/* Main Grid: Input Form (Left) & Live Analysis Output (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Form Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Category Selector */}
          <div style={{
            background: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '20px'
          }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#F1F5F9', marginBottom: '10px' }}>
              1. {isHindi ? 'मामले का प्रकार चुनें' : 'Select Legal Case Category'}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                background: '#0B0F1A',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#F8FAFC',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {CASE_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#94A3B8' }}>
              <span style={{ color: '#FFB020', fontWeight: 600 }}>Default Sections: </span>
              {currentCategoryObj.defaultSections.join(', ')}
            </div>
          </div>

          {/* 2. Narrative Input */}
          <div style={{
            background: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#F1F5F9' }}>
                2. {isHindi ? 'घटना का विवरण (तारीख, राशि और तथ्य)' : 'Describe Incident (Dates, Amounts, Parties)'}
              </label>
              <button
                type="button"
                onClick={handleVoiceInput}
                style={{
                  background: isListening ? '#EF4444' : 'rgba(255, 176, 32, 0.1)',
                  color: isListening ? '#FFFFFF' : '#FFB020',
                  border: '1px solid rgba(255, 176, 32, 0.3)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <Mic size={12} className={isListening ? 'animate-pulse' : ''} />
                {isListening ? (isHindi ? 'सुन रहा है...' : 'Listening...') : (isHindi ? 'बोलकर लिखें' : 'Speak')}
              </button>
            </div>
            <textarea
              rows={6}
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              placeholder={isHindi 
                ? 'क्या हुआ था? किस तारीख को, किस व्यक्ति ने क्या वादा किया या क्या ठगी की? लेन-देन की राशि और बैंक/यूपीआई विवरण लिखें...' 
                : 'State what happened in chronological order. Mention exact dates, amounts transferred, false promises made, names/phone numbers of the opposing party...'}
              style={{
                width: '100%',
                background: '#0B0F1A',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '12px',
                color: '#F3F4F6',
                fontSize: '13px',
                lineHeight: '1.5',
                resize: 'vertical'
              }}
            />
          </div>

          {/* 3. Evidence Checklist */}
          <div style={{
            background: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '20px'
          }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#F1F5F9', marginBottom: '6px' }}>
              3. {isHindi ? 'आपके पास मौजूद सबूत (Select Proofs You Have)' : 'Evidence & Proofs Available in Hand'}
            </label>
            <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#94A3B8' }}>
              {isHindi ? 'जो भी कागजात या डिजिटल सबूत आपके पास हैं, उन पर सही का निशान लगाएं:' : 'Check every item currently in your custody to evaluate evidentiary weight:'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {relevantEvidenceChecklist.map(item => {
                const isChecked = selectedEvidences.includes(item.id);
                return (
                  <label
                    key={item.id}
                    onClick={() => handleToggleEvidence(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: isChecked ? 'rgba(16, 185, 129, 0.1)' : '#0B0F1A',
                      border: `1px solid ${isChecked ? 'rgba(16, 185, 129, 0.3)' : '#1F2937'}`,
                      borderRadius: '8px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={isChecked} 
                      onChange={() => {}} 
                      style={{ cursor: 'pointer', accentColor: '#10B981' }}
                    />
                    <span style={{ fontSize: '13px', color: isChecked ? '#F8FAFC' : '#94A3B8', fontWeight: isChecked ? 600 : 400 }}>
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 4. Timeliness & Pre-Litigation Notice */}
          <div style={{
            background: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '20px'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#F1F5F9' }}>
                  4. {isHindi ? 'घटना से लेकर आज तक का समय (Days Elapsed)' : 'Days Since Incident Occurred'}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: delayDays > 90 ? '#EF4444' : '#10B981' }}>
                  {delayDays} {isHindi ? 'दिन' : 'days'}
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="180" 
                value={delayDays} 
                onChange={(e) => setDelayDays(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: '#FFB020', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                <span>0 Days (Immediate)</span>
                <span>30 Days</span>
                <span>90+ Days (Laches Risk)</span>
              </div>
            </div>

            {/* Legal Notice Sent Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={noticeSent} 
                onChange={(e) => setNoticeSent(e.target.checked)}
                style={{ cursor: 'pointer', accentColor: '#FFB020' }}
              />
              <span style={{ fontSize: '13px', color: '#E2E8F0', fontWeight: 600 }}>
                {isHindi ? 'क्या आपने विपक्षी पक्ष को कानूनी मांग नोटिस (Legal Notice) भेजा है?' : 'Has a formal 15-day Legal Demand Notice been served?'}
              </span>
            </label>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleRunAnalysis}
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              border: 'none',
              padding: '14px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Sparkles size={18} />
            {isHindi ? 'केस सामर्थ्य व स्कोर जांचें' : 'Evaluate Case Strength & Defense'}
          </button>
        </div>

        {/* Right Column: Dynamic Analysis Output */}
        <div>
          {!analysisResult ? (
            <div style={{
              background: '#111827',
              border: '1px dashed rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '60px 24px',
              textAlign: 'center',
              color: '#64748B',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Scale size={48} style={{ color: '#374151', marginBottom: '16px' }} />
              <h3 style={{ color: '#94A3B8', margin: '0 0 8px' }}>
                {isHindi ? 'विश्लेषण रिपोर्ट तैयार नहीं है' : 'Ready for Case Strength Audit'}
              </h3>
              <p style={{ maxWidth: '340px', fontSize: '13px', margin: '0 0 16px' }}>
                {isHindi 
                  ? 'बाएं फॉर्म में अपनी घटना का विवरण दर्ज करें और "केस सामर्थ्य जांचें" पर क्लिक करें।' 
                  : 'Fill in the incident details on the left and click "Evaluate Case Strength" to generate your legal audit report.'}
              </p>
              <button
                onClick={() => applyPreset('cyber')}
                style={{
                  background: 'rgba(255, 176, 32, 0.1)',
                  color: '#FFB020',
                  border: '1px solid rgba(255, 176, 32, 0.25)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {isHindi ? 'त्वरित साइबर फ्रॉड डेमो चलाएं' : 'Run Instant Demo'}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Scorecard Hero */}
              <div style={{
                background: '#111827',
                border: `1px solid ${analysisResult.tierColor}`,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: `0 10px 30px ${analysisResult.tierColor}20`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{
                    background: `${analysisResult.tierColor}20`,
                    color: analysisResult.tierColor,
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    textTransform: 'uppercase'
                  }}>
                    {analysisResult.tier} CASE STANDING
                  </span>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                    Category: {analysisResult.category.label}
                  </span>
                </div>

                {/* Score Gauge & Probability */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '18px' }}>
                  <div style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    border: `6px solid ${analysisResult.tierColor}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0B0F1A',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '28px', fontWeight: 900, color: '#F8FAFC', lineHeight: '1' }}>
                      {analysisResult.score}%
                    </span>
                    <span style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>STRENGTH</span>
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 800, color: '#F1F5F9' }}>
                      {analysisResult.probabilityLabel}
                    </h3>
                    <p style={{ margin: 0, fontSize: '12.5px', color: '#94A3B8', lineHeight: '1.5' }}>
                      Based on prima facie statutory elements under BNS 2023, documentary corroboration, and limitation benchmarks.
                    </p>
                  </div>
                </div>

                {/* Applicable Sections */}
                <div style={{ background: '#0B0F1A', padding: '12px 14px', borderRadius: '10px', border: '1px solid #1F2937' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFB020', textTransform: 'uppercase' }}>
                    Applicable Statutory Provisions:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                    {analysisResult.applicableSections.map((sec, idx) => (
                      <span key={idx} style={{ background: '#1F2937', color: '#E2E8F0', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strengths & Positive Merits */}
              <div style={{ background: '#111827', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '20px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} /> Key Merits &amp; Satisfied Legal Ingredients ({analysisResult.strengths.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysisResult.strengths.map((s, i) => (
                    <div key={i} style={{ background: '#0B0F1A', border: '1px solid #1F2937', borderRadius: '8px', padding: '8px 12px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>{s.title}</div>
                      <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vulnerabilities & Fatal Loopholes */}
              {analysisResult.vulnerabilities.length > 0 && (
                <div style={{ background: '#111827', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '14px', padding: '20px' }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#EF4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={16} /> Vulnerabilities &amp; Procedural Risks ({analysisResult.vulnerabilities.length})
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {analysisResult.vulnerabilities.map((v, i) => (
                      <div key={i} style={{ background: '#0B0F1A', border: '1px solid #291B24', borderRadius: '8px', padding: '8px 12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#FCA5A5' }}>{v.title}</div>
                        <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>{v.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Predicted Defense Strategy */}
              <div style={{ background: '#111827', border: '1px solid rgba(255, 176, 32, 0.25)', borderRadius: '14px', padding: '20px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#FFB020', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldAlert size={16} /> Opposing Defense Prediction (What their Lawyer Will Argue)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysisResult.defensePredictions.map((dp, i) => (
                    <div key={i} style={{ background: '#0B0F1A', border: '1px solid #1F2937', borderRadius: '8px', padding: '10px 12px', fontSize: '12.5px', color: '#E2E8F0', lineHeight: '1.5' }}>
                      &bull; {dp}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Remediation Plan */}
              <div style={{ background: '#111827', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '20px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={16} /> Action Plan to Boost Case Strength to 90%+
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysisResult.actionPlan.map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#F1F5F9' }}>
                      <span style={{ color: '#38BDF8', fontWeight: 800 }}>{i + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Navigation CTAs */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
                  {onNavigateToFIR && (
                    <button
                      onClick={onNavigateToFIR}
                      style={{
                        flex: 1,
                        background: '#FFB020',
                        color: '#0B0F1A',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      Draft Complaint / FIR <ArrowRight size={14} />
                    </button>
                  )}
                  {onNavigateToVault && (
                    <button
                      onClick={onNavigateToVault}
                      style={{
                        flex: 1,
                        background: '#1F2937',
                        color: '#F1F5F9',
                        border: '1px solid #374151',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      Secure Proofs in Locker <FileCheck size={14} />
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
