import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  PhoneCall, 
  ExternalLink, 
  Lock, 
  Copy, 
  Zap, 
  Ban, 
  FileWarning, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  SAMPLE_SCAM_TEMPLATES, 
  analyzeScamText 
} from '../utils/scamDetectorEngine';

export default function ScamDetector({ language = 'en', onNavigateToFIR }) {
  const isHindi = language === 'hi';
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(() => analyzeScamText(SAMPLE_SCAM_TEMPLATES[0].text));
  const [copied, setCopied] = useState(false);

  const handleSelectTemplate = (template) => {
    setInputText(template.text);
    const result = analyzeScamText(template.text);
    setAnalysis(result);
  };

  const handleScan = (textToScan) => {
    const txt = textToScan !== undefined ? textToScan : inputText;
    const result = analyzeScamText(txt);
    setAnalysis(result);
  };

  const handleCopyExplanation = () => {
    if (!analysis) return;
    const report = `[NYAYAMITRA SCAM ALERT REPORT]\nThreat Level: ${analysis.riskLevel} (${analysis.riskScore}% Risk)\nScam Classification: ${analysis.scamType}\nSummary: ${analysis.summary}\nKey Red Flags:\n${analysis.detectedFlags.map(f => `- ${f.title}: ${f.detail}`).join('\n')}\nRecommended Immediate Action:\n${analysis.immediateAction.map(a => `- ${a}`).join('\n')}`;
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="scam-detector-wrapper animate-fadeIn" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 16px 60px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(17, 24, 39, 0.9) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '28px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ 
            background: '#EF4444', 
            color: '#FFFFFF', 
            fontSize: '11px', 
            fontWeight: 800, 
            padding: '4px 10px', 
            borderRadius: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.6px'
          }}>
            {isHindi ? 'साइबर धोखाधड़ी निवारण' : 'CYBER FRAUD RADAR'}
          </span>
          <span style={{ color: '#FFB020', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <ShieldAlert size={16} /> {isHindi ? 'डिजिटल अरेस्ट, एपीके व यूपीआई फ्रॉड स्कैनर' : 'Digital Arrest, APK & UPI Heuristic Scanner'}
          </span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#F8FAFC', margin: '0 0 6px' }}>
          {isHindi ? '🔎 एआई साइबर फ्रॉड व स्कैम डिटेक्टर' : '🔎 AI Scam & Cyber Fraud Detection Tool'}
        </h1>
        <p style={{ margin: 0, color: '#94A3B8', fontSize: '14px', maxWidth: '720px' }}>
          {isHindi 
            ? 'कोई भी संदिग्ध व्हाट्सएप मैसेज, बिजली बिल का एसएमएस, पार्ट-टाइम टास्क या एपीके लिंक यहाँ पेस्ट करें। एआई तुरंत खतरे का स्तर (0-100%) और पीछे छिपे धोखे का विश्लेषण करेगा।'
            : 'Paste any suspicious SMS, WhatsApp forward, APK link, or extortion threat. Our heuristic engine checks for known Indian cyber fraud signatures, Digital Arrest extortion, UPI PIN traps, and malicious phishing.'}
        </p>

        {/* 1930 Direct Emergency Quick Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          borderRadius: '10px',
          padding: '10px 16px',
          marginTop: '18px',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '13px', color: '#FCA5A5', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <PhoneCall size={15} style={{ color: '#EF4444' }} />
            {isHindi ? 'पैसा कट चुका है? तुरंत कॉल करें:' : 'Lost Money Already? Act in the Golden Hour:'}
          </span>
          <a
            href="tel:1930"
            style={{
              background: '#EF4444',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '13px',
              padding: '6px 14px',
              borderRadius: '6px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Dial 1930 (National Cyber Helpline)
          </a>
          <a
            href="https://sancharsaathi.gov.in/sfc/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#38BDF8',
              fontSize: '12.5px',
              textDecoration: 'underline',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Chakshu Fraud SMS Portal <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Preset Chips */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#94A3B8', marginBottom: '10px' }}>
          {isHindi ? 'लोकप्रिय भारतीय फ्रॉड के उदाहरण (Test with Live Scenarios):' : 'Explore Top Indian Fraud Patterns:'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {SAMPLE_SCAM_TEMPLATES.map(tpl => (
            <button
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl)}
              style={{
                background: '#111827',
                border: '1px solid #374151',
                color: '#E2E8F0',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {tpl.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analyzer Grid: Input (Left) & Risk Card (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Input Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#F1F5F9' }}>
                {isHindi ? 'संदिग्ध संदेश / लिंक यहाँ डालें:' : 'Paste Suspicious Text, SMS, or Link:'}
              </label>
              {inputText && (
                <button
                  onClick={() => { setInputText(''); setAnalysis(analyzeScamText('')); }}
                  style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '12px', cursor: 'pointer' }}
                >
                  Clear
                </button>
              )}
            </div>

            <textarea
              rows={8}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                handleScan(e.target.value);
              }}
              placeholder={isHindi 
                ? 'यहाँ कोई भी संदिग्ध एसएमएस, व्हाट्सएप संदेश या लिंक पेस्ट करें...' 
                : 'Paste the SMS, WhatsApp forward, email body, or URL to inspect...'}
              style={{
                width: '100%',
                background: '#0B0F1A',
                border: '1px solid #374151',
                borderRadius: '10px',
                padding: '14px',
                color: '#F8FAFC',
                fontSize: '13px',
                lineHeight: '1.5',
                resize: 'vertical'
              }}
            />

            <button
              onClick={() => handleScan()}
              style={{
                width: '100%',
                marginTop: '14px',
                background: 'linear-gradient(135deg, #FFB020 0%, #F59E0B 100%)',
                color: '#0B0F1A',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(255, 176, 32, 0.3)'
              }}
            >
              <Search size={16} />
              {isHindi ? 'संदेश का एआई परीक्षण करें' : 'Scan Message for Cyber Threat'}
            </button>
          </div>

          {/* Quick Prevention Tips */}
          <div style={{
            background: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <h4 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 800, color: '#FFB020', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={15} /> Indian Cyber Defense Golden Rules
            </h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#CBD5E1', lineHeight: '1.6' }}>
              <li><strong>Zero Police Video Calls:</strong> Neither CBI, ED, nor Police conduct video interrogations. Any call claiming you are under "Digital Arrest" is fraud.</li>
              <li><strong>UPI PIN Rule:</strong> You NEVER enter a PIN to receive money. PIN is required only for debiting funds.</li>
              <li><strong>Never Install .APK files:</strong> Unofficial bank apps steal SMS verification tokens silently.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Threat Assessment Result */}
        <div>
          {analysis && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Threat Severity Card */}
              <div style={{
                background: '#111827',
                border: `1px solid ${analysis.color}`,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: `0 10px 30px ${analysis.color}20`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{
                    background: `${analysis.color}25`,
                    color: analysis.color,
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {analysis.riskLevel}
                  </span>
                  <button
                    onClick={handleCopyExplanation}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copied ? '#10B981' : '#94A3B8',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Copy size={13} /> {copied ? 'Copied' : 'Share Alert'}
                  </button>
                </div>

                {/* Score & Category */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
                  <div style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    border: `5px solid ${analysis.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0B0F1A',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '24px', fontWeight: 900, color: '#F8FAFC' }}>
                      {analysis.riskScore}%
                    </span>
                    <span style={{ fontSize: '9px', color: '#94A3B8' }}>RISK</span>
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 800, color: '#F1F5F9' }}>
                      {analysis.scamType}
                    </h3>
                    <p style={{ margin: 0, fontSize: '12.5px', color: '#94A3B8', lineHeight: '1.5' }}>
                      {analysis.summary}
                    </p>
                  </div>
                </div>

                {/* Scam Anatomy Card */}
                {analysis.anatomy && (
                  <div style={{ background: '#0B0F1A', padding: '12px 14px', borderRadius: '10px', border: '1px solid #1F2937', fontSize: '12.5px', color: '#CBD5E1', lineHeight: '1.5' }}>
                    <span style={{ color: '#FFB020', fontWeight: 700, display: 'block', marginBottom: '3px' }}>
                      🧠 Scam Anatomy &amp; Modus Operandi:
                    </span>
                    {analysis.anatomy}
                  </div>
                )}
              </div>

              {/* Detected Red Flags */}
              {analysis.detectedFlags.length > 0 && (
                <div style={{
                  background: '#111827',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '20px'
                }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#EF4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={16} /> Identified Threat Indicators ({analysis.detectedFlags.length})
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {analysis.detectedFlags.map((flag, idx) => (
                      <div key={idx} style={{ background: '#0B0F1A', border: '1px solid #1F2937', borderRadius: '10px', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>{flag.title}</span>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: flag.severity === 'CRITICAL' ? '#EF4444' : '#F59E0B', background: flag.severity === 'CRITICAL' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                            {flag.severity}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>{flag.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Immediate Countermeasures */}
              <div style={{
                background: '#111827',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} /> Recommended Immediate Actions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysis.immediateAction.map((act, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: '#E2E8F0', lineHeight: '1.4' }}>
                      <span style={{ color: '#10B981', fontWeight: 800 }}>&bull;</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      flex: 1,
                      background: '#EF4444',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    Report on Cybercrime.gov.in <ExternalLink size={14} />
                  </a>
                  {onNavigateToFIR && (
                    <button
                      onClick={onNavigateToFIR}
                      style={{
                        flex: 1,
                        background: '#FFB020',
                        color: '#0B0F1A',
                        border: 'none',
                        padding: '10px 14px',
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
                      Generate Police FIR <ArrowRight size={14} />
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
