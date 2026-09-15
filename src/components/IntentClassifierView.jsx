import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Mic, MicOff, Volume2, Square, ArrowRight, ShieldCheck, 
  AlertCircle, CheckCircle2, Scale, ExternalLink, Sparkles, RefreshCw, 
  HelpCircle, ChevronRight, CornerDownRight, FileText, Phone
} from 'lucide-react';
import { analyzeLegalQuery, classifyIntent } from '../utils/aiEngine';
import { COMMON_SCENARIOS, TRANSLATIONS } from '../data/legalKnowledge';

export default function IntentClassifierView({ lang = 'en', onNavigateTab }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [query, setQuery] = useState('Someone scammed me ₹5000 on UPI');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);

  // Speech Recognition state
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const recognitionRef = useRef(null);

  // Speech Synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize with the prompt's real example on mount
  useEffect(() => {
    handleRunAnalysis('Someone scammed me ₹5000 on UPI');
  }, []);

  // Web Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleRunAnalysis(transcript);
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
        setSpeechError('Microphone permission required or browser speech unsupported.');
        setTimeout(() => setSpeechError(null), 4000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  const toggleListen = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. You can type your query in the box.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setSpeechError(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRunAnalysis = (textToAnalyze) => {
    const targetQuery = textToAnalyze || query;
    if (!targetQuery.trim()) return;

    // Stop speaking previous result
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    setIsAnalyzing(true);
    setPipelineStep(1);

    // Simulate real-time pipeline stages for transparency & confidence
    setTimeout(() => {
      setPipelineStep(2);
      setTimeout(() => {
        setPipelineStep(3);
        setTimeout(() => {
          setPipelineStep(4);
          const result = analyzeLegalQuery(targetQuery);
          setAnalysis(result);
          setIsAnalyzing(false);
        }, 300);
      }, 300);
    }, 300);
  };

  const handleSpeak = (text) => {
    if (!window.speechSynthesis) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    // Choose appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      (lang === 'hi' ? v.lang.includes('hi') : v.lang.includes('en-IN') || v.name.includes('India'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="intent-view-container">
      {/* Hero Header */}
      <div className="module-hero">
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={14} className="text-gold" />
            <span>AI Intent Classifier & Indian Legal Reasoning Engine</span>
          </div>
          <h1 className="hero-title">
            Ask Any Indian Legal Question In Plain Words
          </h1>
          <p className="hero-desc">
            NyayaMitra maps your situation across Bharatiya Nyaya Sanhita (BNS 2023), IPC, CrPC/BNSS, Consumer Protection, and IT Acts to provide one clear, practical action path.
          </p>
        </div>

        {/* Quick Example Chips */}
        <div className="scenario-chips-wrapper">
          <span className="scenario-label">{t.quickScenarios}:</span>
          <div className="scenario-chips-list">
            {COMMON_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  setQuery(sc.shortQuery);
                  handleRunAnalysis(sc.shortQuery);
                }}
                className={`scenario-chip ${query === sc.shortQuery ? 'active-chip' : ''}`}
              >
                <span className="chip-badge">{sc.category}</span>
                <span className="chip-text">{sc.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Query Input Box */}
      <div className="query-box-card">
        <div className="query-input-wrapper">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleRunAnalysis();
              }
            }}
            placeholder={t.queryPlaceholder}
            className="query-textarea"
            rows={3}
          />
        </div>

        <div className="query-toolbar">
          <div className="speech-input-col">
            <button
              onClick={toggleListen}
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              title="Speak Query (Voice-to-Text)"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              <span>{isListening ? 'Listening... Speak now' : t.speakBtn}</span>
              {isListening && <span className="mic-wave" />}
            </button>
            {speechError && <span className="speech-error-msg">{speechError}</span>}
          </div>

          <div className="query-actions-col">
            <button
              onClick={() => handleRunAnalysis()}
              disabled={isAnalyzing || !query.trim()}
              className="submit-query-btn"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={18} className="spin-icon" />
                  <span>Analyzing Law...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>{t.submitBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Pipeline Visualizer */}
      <div className="pipeline-visualizer">
        <div className="pipeline-header">
          <span className="pipeline-title">Autonomous Legal Reasoning Pipeline:</span>
          <span className="pipeline-status">
            {isAnalyzing ? 'Processing Query...' : 'Analysis Complete'}
          </span>
        </div>
        <div className="pipeline-steps">
          <div className={`pipeline-step ${pipelineStep >= 1 ? 'completed' : ''} ${pipelineStep === 1 ? 'active' : ''}`}>
            <div className="step-num">1</div>
            <div className="step-info">
              <span className="step-name">Intent Detection</span>
              <span className="step-val">{analysis ? analysis.intent : 'Classifying...'}</span>
            </div>
          </div>
          <div className="step-arrow"><ArrowRight size={14} /></div>

          <div className={`pipeline-step ${pipelineStep >= 2 ? 'completed' : ''} ${pipelineStep === 2 ? 'active' : ''}`}>
            <div className="step-num">2</div>
            <div className="step-info">
              <span className="step-name">Statutory Mapping</span>
              <span className="step-val">{analysis ? `${analysis.applicableLaws.length} Sections` : 'BNS & IPC'}</span>
            </div>
          </div>
          <div className="step-arrow"><ArrowRight size={14} /></div>

          <div className={`pipeline-step ${pipelineStep >= 3 ? 'completed' : ''} ${pipelineStep === 3 ? 'active' : ''}`}>
            <div className="step-num">3</div>
            <div className="step-info">
              <span className="step-name">Citizen Rights</span>
              <span className="step-val">{analysis ? `${analysis.userRights.length} Protections` : 'Evaluating'}</span>
            </div>
          </div>
          <div className="step-arrow"><ArrowRight size={14} /></div>

          <div className={`pipeline-step ${pipelineStep >= 4 ? 'completed' : ''} ${pipelineStep === 4 ? 'active' : ''}`}>
            <div className="step-num">4</div>
            <div className="step-info">
              <span className="step-name">Clear Action Path</span>
              <span className="step-val">Decisive Next Step</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Results */}
      {analysis && !isAnalyzing && (
        <div className="analysis-results-grid">
          {/* Top Recommendation Hero Card (AI Legal Decision Assistant) */}
          <div className="card hero-decision-card">
            <div className="decision-top-bar">
              <div className="decision-badge">
                <Sparkles size={16} className="text-gold" />
                <span>AI Legal Decision Assistant: One Clear Path</span>
              </div>
              
              {/* Voice Readout Controls */}
              <div className="voice-readout-action">
                <button
                  onClick={() => handleSpeak(analysis.voiceSpokenText)}
                  className={`voice-play-btn ${isSpeaking ? 'speaking' : ''}`}
                  title="Spoken Voice Readout"
                >
                  {isSpeaking ? (
                    <>
                      <Square size={16} />
                      <span>Stop Voice</span>
                      <span className="sound-wave-anim">
                        <span/><span/><span/>
                      </span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={16} />
                      <span>Listen to Advice</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="decision-content">
              <div className="decision-main-row">
                <div className="decision-icon-box">
                  <CheckCircle2 size={32} className="text-emerald" />
                </div>
                <div className="decision-text-group">
                  <h2 className="decision-best-action">{analysis.legalDecision.bestAction}</h2>
                  <p className="decision-why">
                    <strong>Why This Action: </strong> {analysis.legalDecision.whyThisAction}
                  </p>
                </div>
              </div>

              <div className="immediate-next-banner">
                <CornerDownRight size={18} className="text-gold flex-shrink-0" />
                <div>
                  <span className="next-tag">IMMEDIATE NEXT STEP:</span>
                  <span className="next-text">{analysis.legalDecision.immediateNextStep}</span>
                </div>
              </div>

              {/* Action shortcut buttons */}
              <div className="quick-action-shortcuts">
                {analysis.intent === 'Cyber Crime' && (
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('cyber')}
                    className="shortcut-btn cyber-shortcut"
                  >
                    <Phone size={14} />
                    <span>Open 1930 Cyber Protocol & Bank Dialers</span>
                  </button>
                )}
                {analysis.firApplicable && (
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('autoFir')}
                    className="shortcut-btn fir-shortcut"
                  >
                    <FileText size={14} />
                    <span>Generate Official FIR Draft (PDF)</span>
                  </button>
                )}
                <button
                  onClick={() => onNavigateTab && onNavigateTab('lawyerAid')}
                  className="shortcut-btn aid-shortcut"
                >
                  <Scale size={14} />
                  <span>Free NALSA Legal Aid Eligibility</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 1 & 2: Legal Summary & Statutory References */}
          <div className="results-two-col">
            {/* 1. Legal Issue Summary */}
            <div className="card result-card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-index-circle">1</span>
                  <h3 className="card-title">Legal Issue Summary</h3>
                </div>
                <span className="intent-tag">{analysis.intent}</span>
              </div>
              <div className="card-body">
                <p className="issue-summary-text">{analysis.summary}</p>
                <div className="sub-category-tag">
                  <strong>Classification: </strong> {analysis.category}
                </div>
                {analysis.recoveryChances && (
                  <div className="recovery-chance-box">
                    <span className="recovery-label">Recovery Prospects: </span>
                    <span className="recovery-val">{analysis.recoveryChances}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Relevant Law (BNS & IPC Dual Citations) */}
            <div className="card result-card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-index-circle">2</span>
                  <h3 className="card-title">Relevant Law (BNS & IPC Mappings)</h3>
                </div>
                <span className="badge-statute">Statutory Sections</span>
              </div>
              <div className="card-body laws-list">
                {analysis.applicableLaws.map((law, idx) => (
                  <div key={idx} className="law-item-card">
                    <div className="law-header">
                      <Scale size={15} className="text-gold" />
                      <strong className="law-statute">{law.statute}</strong>
                    </div>
                    <p className="law-meaning">{law.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3 & 4: User Rights & Step-by-Step Action Roadmap */}
          <div className="results-two-col">
            {/* 3. User Rights */}
            <div className="card result-card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-index-circle">3</span>
                  <h3 className="card-title">Your Rights Under Indian Law</h3>
                </div>
                <ShieldCheck size={18} className="text-emerald" />
              </div>
              <div className="card-body">
                <ul className="bullet-checklist">
                  {analysis.userRights.map((right, idx) => (
                    <li key={idx} className="bullet-item">
                      <CheckCircle2 size={16} className="text-emerald flex-shrink-0" />
                      <span>{right}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. What You Can Do (Step-by-Step) */}
            <div className="card result-card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-index-circle">4</span>
                  <h3 className="card-title">What You Can Do (Step-by-Step)</h3>
                </div>
                <span className="badge-counter">{analysis.whatYouCanDo.length} Steps</span>
              </div>
              <div className="card-body">
                <ol className="numbered-steps-list">
                  {analysis.whatYouCanDo.map((step, idx) => (
                    <li key={idx} className="step-item">
                      <div className="step-counter">{idx + 1}</div>
                      <div className="step-content">
                        <span>{step}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Section 5: When to Contact a Lawyer */}
          <div className="card result-card lawyer-guidance-card">
            <div className="card-header">
              <div className="card-title-group">
                <span className="card-index-circle">5</span>
                <h3 className="card-title">When to Contact an Advocate</h3>
              </div>
              <AlertCircle size={18} className="text-gold" />
            </div>
            <div className="card-body">
              <p className="lawyer-advice-text">{analysis.whenToContactLawyer}</p>
              <div className="lawyer-action-footer">
                <span className="legal-aid-reminder">
                  Under Article 39A of the Indian Constitution, citizens with annual income below ₹3,00,000, as well as women and custody detainees, are entitled to free legal aid through NALSA.
                </span>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('lawyerAid')}
                  className="consult-aid-btn"
                >
                  <span>Check Free Legal Aid Eligibility</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
