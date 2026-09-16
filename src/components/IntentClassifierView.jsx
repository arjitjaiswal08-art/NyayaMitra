import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Mic, MicOff, Volume2, Square, ArrowRight, ShieldCheck, 
  AlertCircle, CheckCircle2, Scale, ExternalLink, Sparkles, RefreshCw, 
  HelpCircle, ChevronRight, CornerDownRight, FileText, Phone,
  ShieldAlert, BookOpen, MapPin, UserCheck, Play, Pause
} from 'lucide-react';
import { analyzeLegalQuery, classifyIntent } from '../utils/aiEngine.js';
import { COMMON_SCENARIOS, TRANSLATIONS } from '../data/legalKnowledge.js';

const SCENARIO_TRANSLATIONS = {
  hi: {
    upi_fraud: { category: "साइबर अपराध", title: "UPI / बैंक खाते से धोखाधड़ी", query: "UPI पर किसी ने मेरे ₹5000 की धोखाधड़ी कर ली" },
    rental_deposit: { category: "नागरिक अधिकार", title: "मकान मालिक डिपॉजिट नहीं लौटा रहा", query: "मकान खाली करने के बाद मकान मालिक मेरा ₹60,000 का सुरक्षा डिपॉजिट नहीं लौटा रहा" },
    police_fir_refusal: { category: "FIR सहायता", title: "पुलिस FIR दर्ज करने से मना कर रही", query: "थाना पुलिस चोरी की FIR दर्ज करने से मना कर रही है और केवल गुमशुदगी लिखने को कह रही है" },
    workplace_salary_bond: { category: "अनुबंध विश्लेषण", title: "कंपनी वेतन रोक रही / बॉन्ड विवाद", query: "कंपनी इस्तीफा देने पर 2 महीने का वेतन रोक रही है और बॉन्ड राशि मांग रही है" },
    ecommerce_fraud: { category: "उपभोक्ता अधिकार", title: "ऑनलाइन सामान नकली/टूटा निकला", query: "ई-कॉमर्स वेबसाइट से सामान मंगवाया, डिलीवरी में नकली सामान निकला और रिफंड नहीं मिल रहा" },
    workplace_harassment: { category: "नागरिक अधिकार", title: "कार्यस्थल पर उत्पीड़न (POSH कानून)", query: "कार्यस्थल पर वरिष्ठ अधिकारी द्वारा अनुचित आचरण और मानसिक उत्पीड़न किया जा रहा है" }
  },
  ta: {
    upi_fraud: { category: "சைபர் குற்றம்", title: "UPI / வங்கி கணக்கு மோசடி", query: "UPI மூலம் என்னிடம் ₹5000 ஏமாற்றிவிட்டார்கள்" },
    rental_deposit: { category: "உரிமைகள்", title: "வீட்டு உரிமையாளர் முன்பணம் தர மறுப்பு", query: "வீட்டை காலி செய்த பின் உரிமையாளர் முன்பணத்தை தர மறுக்கிறார்" },
    police_fir_refusal: { category: "FIR உதவி", title: "காவல்துறை FIR பதிவு செய்ய மறுப்பு", query: "காவல் நிலையத்தில் திருட்டு குறித்து FIR பதிவு செய்ய மறுக்கிறார்கள்" },
    workplace_salary_bond: { category: "ஒப்பந்த ஆய்வு", title: "சம்பள பிடித்தம் / பாண்ட் பிரச்சனை", query: "நிறுவனம் சம்பளத்தை நிறுத்தி வைத்து பாண்ட் பணம் கேட்கிறது" },
    ecommerce_fraud: { category: "நுகர்வோர் உரிமை", title: "ஆன்லைன் மோசடி / போலி பொருள்", query: "ஆன்லைனில் வாங்கிய பொருளுக்கு பணம் செலுத்தியும் போலி பொருள் வந்தது" },
    workplace_harassment: { category: "உரிமைகள்", title: "பணியிட துன்புறுத்தல்", query: "பணியிடத்தில் மேலதிகாரி துன்புறுத்துகிறார்" }
  },
  te: {
    upi_fraud: { category: "సైబర్ నేరం", title: "UPI / బ్యాంక్ ఖాతా మోసం", query: "UPI లో నా వద్ద ₹5000 మోసం చేశారు" },
    rental_deposit: { category: "హక్కులు", title: "ఇంటి యజమాని డిపాజిట్ ఇవ్వడం లేదు", query: "ఇల్లు ఖాళీ చేసినా యజమాని డిపాజిట్ ఇవ్వడం లేదు" },
    police_fir_refusal: { category: "FIR సహాయం", title: "పోలీసులు FIR నమోదు చేయడం లేదు", query: "దొంగతనంపై పోలీసులు FIR నమోదు చేయడం లేదు" },
    workplace_salary_bond: { category: "ఒప్పందం", title: "జీతం నిలిపివేత / బాండ్ వివాదం", query: "కంపెనీ జీతం ఆపి బాండ్ డబ్బులు అడుగుతోంది" },
    ecommerce_fraud: { category: "వినియోగదారు", title: "ఆన్‌లైన్ మోసం / నకిలీ వస్తువు", query: "ఆన్‌లైన్‌లో కొన్న వస్తువు నకిలీది వచ్చింది" },
    workplace_harassment: { category: "హక్కులు", title: "కార్యాలయ వేధింపులు", query: "ఆఫీసులో వేధింపులు జరుగుతున్నాయి" }
  },
  bn: {
    upi_fraud: { category: "সাইবার অপরাধ", title: "UPI / ব্যাংক প্রতারণা", query: "UPI-তে কেউ আমার ₹5000 প্রতারণা করেছে" },
    rental_deposit: { category: "অধিকার", title: "বাড়িওয়ালা ডিপোজিট দিচ্ছেন না", query: "বাড়ি ছাড়ার পর বাড়িওয়ালা সিকিউরিটি ডিপোজিট দিচ্ছেন না" },
    police_fir_refusal: { category: "FIR সহায়তা", title: "পুলিশ FIR নিতে অস্বীকার করছে", query: "চুরির ঘটনায় পুলিশ FIR নিতে অস্বীকার করছে" },
    workplace_salary_bond: { category: "চুক্তি বিশ্লেষণ", title: "কোম্পানি বেতন আটকে রেখেছে", query: "কোম্পানি বেতন আটকে রেখে বন্ডের টাকা দাবি করছে" },
    ecommerce_fraud: { category: "ভোক্তা অধিকার", title: "অনলাইন কেনাকাটায় প্রতারণা", query: "অনলাইনে কেনা জিনিস নকল এসেছে" },
    workplace_harassment: { category: "অধিকার", title: "কর্মক্ষেত্রে হেনস্থা", query: "কর্মক্ষেত্রে উর্ধ্বতন কর্মকর্তা হেনস্থা করছেন" }
  },
  mr: {
    upi_fraud: { category: "सायबर गुन्हा", title: "UPI / बँक खात्यात फसवणूक", query: "UPI वर माझ्या खात्यातून ₹5000 ची फसवणूक झाली" },
    rental_deposit: { category: "नागरिक हक्क", title: "घरमालक डिपॉझिट परत करत नाही", query: "घर सोडल्यानंतर घरमालक डिपॉझिट परत देत नाही" },
    police_fir_refusal: { category: "FIR मदत", title: "पोलीस FIR नोंदवत नाहीत", query: "चोरीची तक्रार दिल्यावर पोलीस FIR नोंदवत नाहीत" },
    workplace_salary_bond: { category: "करार विश्लेषण", title: "पगार रोखणे / बाँड वाद", query: "कंपनी पगार रोखून ठेवून बाँडचे पैसे मागत आहे" },
    ecommerce_fraud: { category: "ग्राहक हक्क", title: "ऑनलाइन खरेदीत फसवणूक", query: "ऑनलाइन मागवलेला माल बनावट निघाला" },
    workplace_harassment: { category: "नागरिक हक्क", title: "कामाच्या ठिकाणी छळवणूक", query: "कामाच्या ठिकाणी वरिष्ठांकडून मानसिक छळ होत आहे" }
  },
  gu: {
    upi_fraud: { category: "સાયબર ક્રાઈમ", title: "UPI / બેંક છેતરપિંડી", query: "UPI પર કોઈએ મારા ₹5000 ની છેતરપિંડી કરી" },
    rental_deposit: { category: "અધિકાર", title: "મકાનમાલિક ડિપોઝિટ આપતા નથી", query: "ઘર ખાલી કર્યા પછી મકાનમાલિક ડિપોઝિટ પરત નથી આપતા" },
    police_fir_refusal: { category: "FIR સહાય", title: "પોલીસ FIR નોંધતી નથી", query: "ચોરીની ઘટનામાં પોલીસ FIR નોંધવાની ના પાડે છે" },
    workplace_salary_bond: { category: "કરાર વિશ્લેષણ", title: "પગાર રોકવો / બોન્ડ વિવાદ", query: "કંપની પગાર રોકી રાખીને બોન્ડના નાણાં માંગે છે" },
    ecommerce_fraud: { category: "ગ્રાહક સુરક્ષા", title: "ઓનલાઇન છેતરપિંડી", query: "ઓનલાઇન ખરીદીમાં નકલી સામાન આવ્યો છે" },
    workplace_harassment: { category: "અધિકાર", title: "કાર્યસ્થળ પર હેરાનગતિ", query: "ઓફિસમાં વરિષ્ઠ અધિકારી દ્વારા હેરાનગતિ કરવામાં આવે છે" }
  },
  kn: {
    upi_fraud: { category: "ಸೈಬರ್ ಅಪರಾಧ", title: "UPI / ಬ್ಯಾಂಕ್ ವಂಚನೆ", query: "UPI ನಲ್ಲಿ ಯಾರೋ ನನ್ನ ₹5000 ವಂಚಿಸಿದ್ದಾರೆ" },
    rental_deposit: { category: "ಹಕ್ಕುಗಳು", title: "ಮನೆ ಮಾಲೀಕರು ಠೇವಣಿ ನೀಡುತ್ತಿಲ್ಲ", query: "ಮನೆ ಖಾಲಿ ಮಾಡಿದ ನಂತರ ಮಾಲೀಕರು ಠೇವಣಿ ನೀಡುತ್ತಿಲ್ಲ" },
    police_fir_refusal: { category: "FIR ಸಹಾಯ", title: "ಪೊಲೀಸರು FIR ದಾಖಲಿಸುತ್ತಿಲ್ಲ", query: "ಕಳ್ಳತನದ ಬಗ್ಗೆ ಪೊಲೀಸರು FIR ದಾಖಲಿಸುತ್ತಿಲ್ಲ" },
    workplace_salary_bond: { category: "ಒಪ್ಪಂದ", title: "ವೇತನ ತಡೆ / ಬಾಂಡ್ ವಿವಾದ", query: "ಕಂಪನಿ ವೇತನ ತಡೆಹಿಡಿದು ಬಾಂಡ್ ಹಣ ಕೇಳುತ್ತಿದೆ" },
    ecommerce_fraud: { category: "ಗ್ರಾಹಕರ ಹಕ್ಕು", title: "ಆನ್‌ಲೈನ್ ವಂಚನೆ", query: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ನಕಲಿ ವಸ್ತು ಬಂದಿದೆ" },
    workplace_harassment: { category: "ಹಕ್ಕುಗಳು", title: "ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಕಿರುಕುಳ", query: "ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಕಿರುಕುಳ ನಡೆಯುತ್ತಿದೆ" }
  }
};

const BNS_CONVERTER_DATA = [
  {
    id: 'cheating',
    title: 'Cheating & Online Fraud',
    titleHi: 'धोखाधड़ी व ऑनलाइन फ्रॉड',
    ipc: 'IPC Section 420 & 415',
    bns: 'BNS Section 318(4) & 316',
    nature: 'Cognizable & Non-Bailable',
    natureHi: 'संज्ञेय एवं गैर-जमानती',
    punishment: 'Up to 7 years imprisonment + Fine',
    punishmentHi: '7 वर्ष तक कारावास व जुर्माना',
    description: 'Fraudulent inducement to deliver property or money (including online/UPI fraud).',
    descriptionHi: 'संपत्ति या धन सुपुर्द करने के लिए छलपूर्वक प्रेरित करना (ऑनलाइन/UPI फ्रॉड सहित)।'
  },
  {
    id: 'breach_trust',
    title: 'Criminal Breach of Trust',
    titleHi: 'आपराधिक विश्वासघात / अमानत में खयानत',
    ipc: 'IPC Section 405 & 406',
    bns: 'BNS Section 316(1) & 316(2)',
    nature: 'Cognizable & Non-Bailable',
    natureHi: 'संज्ञेय एवं गैर-जमानती',
    punishment: 'Up to 5 years imprisonment (Enhanced in BNS)',
    punishmentHi: '5 वर्ष तक कारावास (IPC के 3 वर्ष से बढ़ाकर 5 वर्ष)',
    description: 'Dishonest misappropriation of salary, deposit, or property entrusted to someone.',
    descriptionHi: 'सौंपी गई संपत्ति, वेतन या किराये के डिपॉजिट का बेईमानी से दुरुपयोग या रोक रखना।'
  },
  {
    id: 'theft',
    title: 'Theft & Snatching',
    titleHi: 'चोरी एवं झपटमारी (Snatching)',
    ipc: 'IPC Section 378 & 379',
    bns: 'BNS Section 303(2) & 304',
    nature: 'Cognizable & Non-Bailable',
    natureHi: 'संज्ञेय एवं गैर-जमानती',
    punishment: 'Up to 3 yrs (Theft) / Up to 5 yrs (Snatching BNS 304)',
    punishmentHi: '3 वर्ष तक (चोरी) / 5 वर्ष तक (BNS 304 में झपटमारी हेतु विशेष कड़ा दंड)',
    description: 'Moving property out of possession without consent. Snatching is now explicitly codified in BNS.',
    descriptionHi: 'बिना सहमति किसी की संपत्ति चुराना। झपटमारी को BNS में पहली बार अलग गंभीर अपराध बनाया गया।'
  },
  {
    id: 'fir_mandate',
    title: 'Mandatory FIR & Zero FIR',
    titleHi: 'अनिवार्य FIR व ज़ीरो FIR अधिकार',
    ipc: 'CrPC Section 154',
    bns: 'BNSS Section 173',
    nature: 'Statutory Citizen Right',
    natureHi: 'वैधानिक नागरिक अधिकार',
    punishment: 'Refusal is punishable under BNS Sec 199',
    punishmentHi: 'FIR दर्ज न करने पर पुलिस अधिकारी पर BNS धारा 199 के तहत मुकदमा',
    description: 'Police station MUST register FIR for cognizable crimes irrespective of territorial jurisdiction (Zero FIR).',
    descriptionHi: 'संज्ञेय अपराध में किसी भी थाने में FIR दर्ज कराना अनिवार्य है, क्षेत्राधिकार की बाध्यता नहीं।'
  },
  {
    id: 'modesty',
    title: 'Assault on Women / Harassment',
    titleHi: 'महिला सुरक्षा व यौन उत्पीड़न',
    ipc: 'IPC Section 354, 354A, 509',
    bns: 'BNS Section 74, 75, 79',
    nature: 'Cognizable & Non-Bailable',
    natureHi: 'संज्ञेय एवं गैर-जमानती',
    punishment: '1 to 5 years imprisonment + Fine',
    punishmentHi: '1 से 5 वर्ष तक कठोर कारावास व जुर्माना',
    description: 'Physical or verbal outraging of female modesty, stalking, and workplace sexual harassment.',
    descriptionHi: 'महिला के सम्मान को ठेस पहुंचाना, पीछा करना (Stalking) व कार्यस्थल पर उत्पीड़न।'
  },
  {
    id: 'intimidation',
    title: 'Criminal Intimidation & Extortion',
    titleHi: 'आपराधिक धमकी एवं जबरन वसूली',
    ipc: 'IPC Section 503 & 506',
    bns: 'BNS Section 351(2) & 351(3)',
    nature: 'Non-Cognizable (Cognizable if death threat)',
    natureHi: 'असंज्ञेय (जान से मारने की धमकी पर संज्ञेय)',
    punishment: 'Up to 2 years (Up to 7 years if death threat)',
    punishmentHi: '2 वर्ष तक (जान से मारने की धमकी पर 7 वर्ष तक)',
    description: 'Threatening injury to person, reputation, or property to cause alarm or extort action.',
    descriptionHi: 'डराने या जबरन काम कराने की नीयत से जान, माल या प्रतिष्ठा को नुकसान पहुंचाने की धमकी।'
  }
];

export default function IntentClassifierView({ lang = 'en', onNavigateTab }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const qv = t.queryView || {};

  const defaultQuery = lang === 'hi' 
    ? 'UPI पर किसी ने मेरे ₹5000 की धोखाधड़ी कर ली' 
    : 'Someone scammed me ₹5000 on UPI';

  const [query, setQuery] = useState(defaultQuery);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [selectedStatute, setSelectedStatute] = useState(BNS_CONVERTER_DATA[0]);

  // Speech Recognition state
  const [isListening, setIsListening] = useState(false);
  const [speechRecError, setSpeechRecError] = useState(null);
  const recognitionRef = useRef(null);

  // Upgraded Audio Assistant state & controls
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [speechTtsError, setSpeechTtsError] = useState(null);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioElapsed, setAudioElapsed] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const utteranceRef = useRef(null);
  const isPausedRef = useRef(false);
  const playbackTimerRef = useRef(null);
  const resultsContainerRef = useRef(null);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Instant acoustic feedback chime using Web Audio API
  // Unlocks browser audio thread and confirms user interaction immediately
  const playAudioChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch (e) {
      // AudioContext fallback
    }
  };

  // Automatically update and localize analysis when lang changes
  useEffect(() => {
    const qToAnalyze = query.trim() || defaultQuery;
    const result = analyzeLegalQuery(qToAnalyze, lang);
    setAnalysis(result);
  }, [lang]);

  // Preload and match voices reliably across browsers
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        try {
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            setAvailableVoices(voices);
            const preferred = voices.find(v => 
              lang === 'hi'
                ? (v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'))
                : (v.lang.includes('en-IN') || v.name.toLowerCase().includes('india'))
            ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
            setSelectedVoice(preferred);
          }
        } catch (e) {
          console.warn('Voice enumeration error:', e);
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;

      return () => {
        if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
        if (window.speechSynthesis) {
          try {
            window.speechSynthesis.cancel();
          } catch (e) {
            console.warn(e);
          }
        }
      };
    }
  }, [lang]);

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
        setSpeechRecError(lang === 'hi' ? 'माइक्रोफ़ोन अनुमति आवश्यक है या ब्राउज़र समर्थित नहीं है।' : 'Microphone permission required or browser speech unsupported.');
        setTimeout(() => setSpeechRecError(null), 4000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  const toggleListen = () => {
    if (!recognitionRef.current) {
      alert(lang === 'hi' ? 'इस ब्राउज़र में वॉइस रिकॉग्निशन समर्थित नहीं है। आप बॉक्स में लिखकर प्रश्न पूछ सकते हैं।' : 'Speech recognition is not supported in this browser. You can type your query in the box.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setSpeechRecError(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Stop any active audio playback and clear timers
  const handleStopAudio = () => {
    if (playbackTimerRef.current) {
      clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn(e);
      }
    }
    isPausedRef.current = false;
    setIsSpeaking(false);
    setIsPaused(false);
    setAudioProgress(0);
    setAudioElapsed(0);
  };

  const handleRunAnalysis = (textToAnalyze) => {
    const targetQuery = textToAnalyze || query;
    if (!targetQuery.trim()) return;

    // Stop previous audio playback cleanly
    handleStopAudio();

    setIsAnalyzing(true);
    setPipelineStep(1);

    // Smooth scroll down to analysis area immediately so user sees active reasoning
    setTimeout(() => {
      if (resultsContainerRef.current) {
        resultsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);

    // Simulate real-time pipeline stages for transparency & confidence
    setTimeout(() => {
      setPipelineStep(2);
      setTimeout(() => {
        setPipelineStep(3);
        setTimeout(() => {
          setPipelineStep(4);
          const result = analyzeLegalQuery(targetQuery, lang);
          setAnalysis(result);
          setIsAnalyzing(false);

          // Scroll to result card cleanly
          setTimeout(() => {
            if (resultsContainerRef.current) {
              resultsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 80);
        }, 220);
      }, 220);
    }, 220);
  };

  // Toggle play/pause/resume
  const handleTogglePlay = (overrideText) => {
    // If currently paused, resume
    if (isSpeaking && isPaused) {
      isPausedRef.current = false;
      setIsPaused(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.resume();
        } catch (e) {
          console.warn(e);
        }
      }
      return;
    }

    // If currently playing, pause
    if (isSpeaking && !isPaused) {
      isPausedRef.current = true;
      setIsPaused(true);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.pause();
        } catch (e) {
          console.warn(e);
        }
      }
      return;
    }

    // Start fresh playback
    handleStartSpeaking(overrideText);
  };

  // Robust, cross-browser speech playback with real-time timer & voice matching
  const handleStartSpeaking = (overrideText, forcedRate) => {
    handleStopAudio();
    playAudioChime();

    const rateToUse = forcedRate !== undefined ? forcedRate : speechRate;
    const rawText = overrideText || (analysis && analysis.voiceSpokenText) || (analysis && analysis.legalDecision && analysis.legalDecision.bestAction) || '';
    if (!rawText.trim()) return;

    const cleanText = rawText.replace(/[\*\_#\[\]\(\)\"]/g, ' ').replace(/\s+/g, ' ').trim();

    // Duration calculation based on word count & playback speed
    const words = cleanText.split(/\s+/).length;
    const estimatedSeconds = Math.max(5, Math.round((words / (130 * rateToUse)) * 60));
    setAudioDuration(estimatedSeconds);
    setAudioElapsed(0);
    setAudioProgress(0);

    // Instantly set speaking state for responsive UI
    setIsSpeaking(true);
    setIsPaused(false);
    isPausedRef.current = false;
    setSpeechTtsError(null);

    // Start real-time elapsed timer immediately
    let elapsedCount = 0;
    if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    playbackTimerRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        elapsedCount += 1;
        setAudioElapsed(Math.min(estimatedSeconds, elapsedCount));
        setAudioProgress(Math.min(100, Math.round((elapsedCount / estimatedSeconds) * 100)));

        // Chromium heartbeat ping to avoid speech synthesis pause bug at 14s
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          if (elapsedCount % 5 === 0 && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            try {
              window.speechSynthesis.pause();
              window.speechSynthesis.resume();
            } catch (e) {}
          }
        }

        // Safety limit to complete playback cleanly
        if (elapsedCount >= estimatedSeconds + 1) {
          handleStopAudio();
        }
      }
    }, 1000);

    // Trigger SpeechSynthesis with intelligent cross-browser voice matching
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      try {
        synth.cancel();
      } catch (e) {}

      setTimeout(() => {
        try {
          if (synth.paused) synth.resume();
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.rate = rateToUse;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;

          const voices = synth.getVoices() || [];
          let bestVoice = null;
          if (lang === 'hi') {
            bestVoice = voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi')) ||
                        voices.find(v => v.lang.includes('en-IN') || v.name.toLowerCase().includes('india')) ||
                        voices[0];
          } else {
            bestVoice = voices.find(v => v.lang.includes('en-IN') || v.name.toLowerCase().includes('india')) ||
                        voices.find(v => v.lang.startsWith('en')) ||
                        voices[0];
          }

          if (bestVoice) {
            utterance.voice = bestVoice;
            utterance.lang = bestVoice.lang;
          } else {
            utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
          }

          utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
          };

          utterance.onend = () => {
            handleStopAudio();
          };

          utterance.onerror = (err) => {
            console.warn('SpeechSynthesis event error:', err);
            if (err.error !== 'interrupted' && err.error !== 'canceled') {
              // timer completes visual guide
            }
          };

          utteranceRef.current = utterance;
          window._nyayaActiveUtterance = utterance;

          synth.speak(utterance);
        } catch (synthErr) {
          console.warn('Speech synthesis call failed:', synthErr);
        }
      }, 50);
    }
  };

  return (
    <div className="intent-view-container">
      {/* Executive Hero Banner */}
      <div className="module-hero">
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={14} className="text-gold" />
            <span>{qv.heroPill || (lang === 'hi' ? 'AI कानूनी मंशा विश्लेषक एवं भारतीय विधिक तर्क प्रणाली' : 'AI Intent Classifier & Indian Legal Reasoning Engine')}</span>
          </div>
          <h1 className="hero-title">
            {qv.heroTitle || (lang === 'hi' ? 'भारतीय कानून से जुड़ा कोई भी सवाल सरल भाषा में पूछें' : 'Ask Any Indian Legal Question In Plain Words')}
          </h1>
          <p className="hero-desc">
            {qv.heroDesc || (lang === 'hi' ? 'अपने संवैधानिक अधिकारों को समझें, नए भारतीय न्याय संहिता (BNS 2023) और IPC 1860 की धाराओं का तुलनात्मक विश्लेषण प्राप्त करें और तुरंत सही कदम उठाएं।' : 'Understand your constitutional rights, cross-reference the new Bharatiya Nyaya Sanhita (BNS 2023) with IPC 1860, and get a clear, step-by-step roadmap for action.')}
          </p>
        </div>

        {/* Quick Example Chips */}
        <div className="scenario-chips-wrapper">
          <span className="scenario-label">{(qv.scenariosTitle || t.quickScenarios || (lang === 'hi' ? 'प्रमुख कानूनी मुद्दे:' : 'Common Legal Scenarios:'))}</span>
          <div className="scenario-chips-list">
            {COMMON_SCENARIOS.map((sc) => {
              const scLocal = (SCENARIO_TRANSLATIONS[lang] && SCENARIO_TRANSLATIONS[lang][sc.id]) || {
                category: sc.category,
                title: sc.title,
                query: sc.shortQuery
              };
              const isSelected = query === scLocal.query || query === sc.shortQuery;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    const text = scLocal.query || sc.shortQuery;
                    setQuery(text);
                    handleRunAnalysis(text);
                  }}
                  className={`scenario-chip ${isSelected ? 'active-chip' : ''}`}
                >
                  <span className="chip-badge">{scLocal.category}</span>
                  <span className="chip-text">{scLocal.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Query Omnibar Box */}
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
            placeholder={qv.placeholder || t.queryPlaceholder}
            className="query-textarea"
            rows={3}
          />
        </div>

        <div className="query-toolbar">
          <div className="speech-input-col">
            <button
              onClick={toggleListen}
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              title={qv.speakBtn || (lang === 'hi' ? 'बोलें (आवाज़)' : 'Speak Query (Voice-to-Text)')}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              <span>{isListening ? (qv.listening || (lang === 'hi' ? 'सुन रहे हैं... बोलिए' : 'Listening... Speak now')) : (qv.speakBtn || t.speakBtn || (lang === 'hi' ? 'बोलें (आवाज़)' : 'Speak'))}</span>
              {isListening && <span className="mic-wave" />}
            </button>
            {speechRecError && <span className="speech-error-msg">{speechRecError}</span>}
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
                  <span>{qv.analyzing || (lang === 'hi' ? 'विश्लेषण जारी है...' : 'Analyzing Law...')}</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>{qv.submitBtn || t.submitBtn || (lang === 'hi' ? 'अधिकारों का विश्लेषण करें' : 'Analyze Legal Rights')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================================================
          DYNAMIC LEGAL ANALYSIS & REASONING SECTION (Directly Below Query Box)
          ========================================================================== */}
      <div ref={resultsContainerRef} id="analysis-results-anchor" className="analysis-results-anchor">
        {/* Real-time Loading Reasoning Card while isAnalyzing */}
        {isAnalyzing && (
          <div className="active-reasoning-card">
            <div className="reasoning-header">
              <div className="reasoning-spinner-wrap">
                <RefreshCw size={26} className="spin-icon text-gold" />
              </div>
              <div className="reasoning-title-group">
                <div className="reasoning-badge">
                  <Sparkles size={14} className="text-gold" />
                  <span>{lang === 'hi' ? 'AI स्वायत्त विधिक तर्क सक्रिय' : 'AI Legal Reasoning Active'}</span>
                </div>
                <h3 className="reasoning-heading">
                  {lang === 'hi' ? 'आपके मामले में भारतीय कानूनों का विश्लेषण हो रहा है...' : 'Analyzing Indian Law & Legal Remedies for Your Situation...'}
                </h3>
                <p className="reasoning-sub">
                  {lang === 'hi' 
                    ? 'भारतीय न्याय संहिता (BNS 2023), IPC 1860, संवैधानिक अधिकार और प्रक्रियात्मक संहिताओं का वास्तविक समय मिलान।' 
                    : 'Cross-referencing Bharatiya Nyaya Sanhita (BNS 2023), IPC 1860, constitutional safeguards & citizen remedies.'}
                </p>
              </div>
            </div>

            <div className="reasoning-steps-progress">
              <div className={`reasoning-step-item ${pipelineStep >= 1 ? 'step-completed' : ''} ${pipelineStep === 1 ? 'step-in-progress' : ''}`}>
                <div className="reasoning-step-circle">1</div>
                <div className="reasoning-step-label">
                  <strong>{lang === 'hi' ? 'कानूनी मंशा' : 'Intent Detection'}</strong>
                  <span>{pipelineStep >= 1 ? (lang === 'hi' ? 'वर्गीकरण...' : 'Classifying...') : (lang === 'hi' ? 'प्रतीक्षारत' : 'Pending')}</span>
                </div>
              </div>

              <div className={`reasoning-step-item ${pipelineStep >= 2 ? 'step-completed' : ''} ${pipelineStep === 2 ? 'step-in-progress' : ''}`}>
                <div className="reasoning-step-circle">2</div>
                <div className="reasoning-step-label">
                  <strong>{lang === 'hi' ? 'BNS व IPC धाराएं' : 'Statutory Mapping'}</strong>
                  <span>{pipelineStep >= 2 ? (lang === 'hi' ? 'धाराओं का मिलान...' : 'Mapping BNS/IPC...') : (lang === 'hi' ? 'प्रतीक्षारत' : 'Pending')}</span>
                </div>
              </div>

              <div className={`reasoning-step-item ${pipelineStep >= 3 ? 'step-completed' : ''} ${pipelineStep === 3 ? 'step-in-progress' : ''}`}>
                <div className="reasoning-step-circle">3</div>
                <div className="reasoning-step-label">
                  <strong>{lang === 'hi' ? 'नागरिक अधिकार' : 'Citizen Safeguards'}</strong>
                  <span>{pipelineStep >= 3 ? (lang === 'hi' ? 'अधिकारों की जांच...' : 'Evaluating...') : (lang === 'hi' ? 'प्रतीक्षारत' : 'Pending')}</span>
                </div>
              </div>

              <div className={`reasoning-step-item ${pipelineStep >= 4 ? 'step-completed' : ''} ${pipelineStep === 4 ? 'step-in-progress' : ''}`}>
                <div className="reasoning-step-circle">4</div>
                <div className="reasoning-step-label">
                  <strong>{lang === 'hi' ? 'सर्वोत्तम कदम' : 'Action Roadmap'}</strong>
                  <span>{pipelineStep >= 4 ? (lang === 'hi' ? 'तैयार किया जा रहा है...' : 'Formulating...') : (lang === 'hi' ? 'प्रतीक्षारत' : 'Pending')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Real-time Pipeline Visualizer (When analysis is completed) */}
        {analysis && !isAnalyzing && (
          <div className="pipeline-visualizer">
            <div className="pipeline-header">
              <span className="pipeline-title">
                {lang === 'hi' ? 'स्वायत्त विधिक तर्क प्रणाली (Pipeline):' : 'Autonomous Legal Reasoning Pipeline:'}
              </span>
              <span className="pipeline-status">
                {lang === 'hi' ? 'विश्लेषण पूर्ण • विधिक रणनीति तैयार' : 'Analysis Complete • Strategy Formulated'}
              </span>
            </div>
            <div className="pipeline-steps">
              <div className="pipeline-step completed">
                <div className="step-num">1</div>
                <div className="step-info">
                  <span className="step-name">{qv.pipelineSteps?.[0] || (lang === 'hi' ? 'कानूनी मंशा वर्गीकरण' : 'Intent Detection')}</span>
                  <span className="step-val">{analysis.intent}</span>
                </div>
              </div>
              <div className="step-arrow"><ArrowRight size={14} /></div>

              <div className="pipeline-step completed">
                <div className="step-num">2</div>
                <div className="step-info">
                  <span className="step-name">{qv.pipelineSteps?.[1] || (lang === 'hi' ? 'वैधानिक धारा मैपिंग' : 'Statutory Mapping')}</span>
                  <span className="step-val">{`${analysis.applicableLaws.length} ${qv.statuteBadge || (lang === 'hi' ? 'धाराएं' : 'Sections')}`}</span>
                </div>
              </div>
              <div className="step-arrow"><ArrowRight size={14} /></div>

              <div className="pipeline-step completed">
                <div className="step-num">3</div>
                <div className="step-info">
                  <span className="step-name">{qv.pipelineSteps?.[2] || (lang === 'hi' ? 'नागरिक अधिकार सुरक्षा' : 'Citizen Rights')}</span>
                  <span className="step-val">{`${analysis.userRights.length} ${lang === 'hi' ? 'सुरक्षा अधिकार' : 'Protections'}`}</span>
                </div>
              </div>
              <div className="step-arrow"><ArrowRight size={14} /></div>

              <div className="pipeline-step completed active">
                <div className="step-num">4</div>
                <div className="step-info">
                  <span className="step-name">{qv.pipelineSteps?.[3] || (lang === 'hi' ? 'सर्वोत्तम व्यावहारिक कदम' : 'Clear Action Path')}</span>
                  <span className="step-val">{lang === 'hi' ? 'सर्वोत्तम विधिक कदम' : 'Decisive Next Step'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Analysis Results Grid */}
        {analysis && !isAnalyzing && (
          <div className="analysis-results-grid">
            {/* Top Recommendation Hero Card (AI Legal Decision Assistant) */}
            <div className="card hero-decision-card">
              <div className="decision-top-bar">
                <div className="decision-badge">
                  <Sparkles size={16} className="text-gold" />
                  <span>{qv.decisionTitle || (lang === 'hi' ? 'एकल स्पष्ट विधिक सिफारिश' : 'Single Clear Action Recommendation')}</span>
                </div>
                
                {/* Header Status / Active Audio Pill (Replaces redundant top-right Stop Audio button) */}
                <div className="decision-top-status">
                  {isSpeaking ? (
                    <div className={`decision-live-pill ${isPaused ? 'pill-paused' : 'pill-active'}`}>
                      <div className="mini-audio-wave">
                        <span /><span /><span />
                      </div>
                      <span>{isPaused ? (lang === 'hi' ? 'ऑडियो रुका हुआ' : 'Audio Paused') : (lang === 'hi' ? 'सलाह बोली जा रही है' : 'Audio Briefing Active')}</span>
                    </div>
                  ) : (
                    <div className="decision-priority-tag">
                      <ShieldCheck size={14} className="text-emerald" />
                      <span>{lang === 'hi' ? 'प्राथमिक विधिक सिफारिश' : 'High Priority Recommendation'}</span>
                    </div>
                  )}
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
                      <strong>{qv.whyThisAction || (lang === 'hi' ? 'यह कदम क्यों आवश्यक है' : 'Why this specific action')}: </strong> {analysis.legalDecision.whyThisAction}
                    </p>
                  </div>
                </div>

                <div className="immediate-next-banner">
                  <CornerDownRight size={18} className="text-gold flex-shrink-0" />
                  <div>
                    <span className="next-tag">
                      {qv.immediateNextStep ? qv.immediateNextStep.replace(/:\s*$/, '') : (lang === 'hi' ? 'तत्काल उठाया जाने वाला कदम' : 'Immediate next step to take')}:
                    </span>
                    <span className="next-text">{analysis.legalDecision.immediateNextStep}</span>
                  </div>
                </div>

                {/* Upgraded Voice Legal Assistant Audio Player Panel */}
                <div className={`voice-assistant-panel ${isSpeaking ? (isPaused ? 'panel-paused' : 'panel-speaking') : ''}`}>
                  <div className="voice-panel-header">
                    <div className="voice-meta">
                      <div className={`voice-eq-icon ${isSpeaking ? (isPaused ? 'paused-eq' : 'active-eq') : ''}`}>
                        <Volume2 size={20} />
                      </div>
                      <div>
                        <div className="voice-meta-title">
                          <strong>{qv.audioGuideTitle || (lang === 'hi' ? 'ऑडियो कानूनी परामर्श' : 'Listen to Legal Advice (Audio Assistant)')}</strong>
                          <span className="voice-lang-chip">
                            {lang === 'hi' ? 'हिन्दी Voice' : lang === 'ta' ? 'தமிழ் Voice' : lang === 'te' ? 'తెలుగు Voice' : lang === 'bn' ? 'বাংলা Voice' : lang === 'mr' ? 'मराठी Voice' : lang === 'gu' ? 'ગુજરાતી Voice' : lang === 'kn' ? 'ಕನ್ನಡ Voice' : 'Indian English'}
                          </span>
                          {isSpeaking && (
                            <span className={`voice-live-badge ${isPaused ? 'badge-paused' : ''}`}>
                              {isPaused ? (lang === 'hi' ? 'रुका हुआ' : 'PAUSED') : (lang === 'hi' ? 'आवाज़ सक्रिय' : 'SPEAKING NOW')}
                            </span>
                          )}
                        </div>
                        <div className="voice-meta-sub-row">
                          <span className="voice-meta-sub">
                            {lang === 'hi' ? 'तत्काल कार्रवाई हेतु स्पष्ट बोली जाने वाली कानूनी सलाह' : 'Clear spoken advice for immediate action'}
                          </span>
                          {audioDuration > 0 && (
                            <span className="voice-timer-badge">
                              {formatTime(audioElapsed)} / {formatTime(audioDuration)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="voice-panel-actions">
                      {/* Speech Speed Controls */}
                      <div className="speed-pills-group" title="Playback Speed">
                        {[0.8, 1.0, 1.2, 1.5].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => {
                              setSpeechRate(rate);
                              if (isSpeaking && !isPaused) {
                                handleStartSpeaking(analysis.voiceSpokenText, rate);
                              }
                            }}
                            className={`speed-pill-btn ${speechRate === rate ? 'active-pill' : ''}`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>

                      {/* Prominent Play / Pause Button */}
                      <button
                        onClick={() => handleTogglePlay(analysis.voiceSpokenText)}
                        className={`voice-hero-btn ${isSpeaking ? (isPaused ? 'paused-btn' : 'speaking-active') : ''}`}
                        aria-label={isSpeaking ? (isPaused ? 'Resume Audio' : 'Pause Audio') : (qv.listenBtn || "Listen to Advice")}
                      >
                        {isSpeaking ? (
                          isPaused ? (
                            <>
                              <Play size={16} />
                              <span>{lang === 'hi' ? 'जारी रखें' : 'Resume'}</span>
                            </>
                          ) : (
                            <>
                              <Pause size={16} />
                              <span>{lang === 'hi' ? 'रोकें (Pause)' : 'Pause'}</span>
                              <div className="voice-jumping-wave">
                                <span /><span /><span /><span />
                              </div>
                            </>
                          )
                        ) : (
                          <>
                            <Volume2 size={16} />
                            <span>{qv.listenBtn || (lang === 'hi' ? 'सलाह सुनें' : 'Listen to Advice')}</span>
                          </>
                        )}
                      </button>

                      {/* Dedicated Stop Button when Audio is Active */}
                      {isSpeaking && (
                        <button
                          onClick={handleStopAudio}
                          className="voice-stop-btn"
                          title={qv.stopBtn || "Stop Audio"}
                        >
                          <Square size={14} />
                          <span>{qv.stopBtn || (lang === 'hi' ? 'बंद करें' : 'Stop Audio')}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Real-Time Audio Playback Progress Bar */}
                  {isSpeaking && (
                    <div className="voice-progress-container">
                      <div className="voice-progress-track">
                        <div 
                          className="voice-progress-fill" 
                          style={{ width: `${audioProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Spoken Text Transcript Box */}
                  <div className="voice-transcript-wrapper">
                    <div className="voice-transcript-label">{qv.transcriptTitle || (lang === 'hi' ? 'बोली जाने वाली कानूनी सलाह:' : 'SPOKEN ADVICE TRANSCRIPT:')}</div>
                    <p className="voice-transcript-content">
                      "{analysis.voiceSpokenText || analysis.legalDecision.bestAction}"
                    </p>
                  </div>

                  {speechTtsError && (
                    <div className="voice-error-toast">
                      <AlertCircle size={14} className="flex-shrink-0" />
                      <span>{speechTtsError}</span>
                      <button 
                        onClick={() => handleStartSpeaking(analysis.voiceSpokenText)} 
                        className="voice-retry-btn"
                      >
                        {qv.retryAudio || (lang === 'hi' ? 'पुनः प्रयास करें' : 'Retry Audio')}
                      </button>
                    </div>
                  )}
                </div>

                {/* Action shortcut buttons */}
                <div className="quick-action-shortcuts">
                  {(analysis.intent === 'Cyber Crime' || analysis.intent === 'साइबर अपराध') && (
                    <button
                      onClick={() => onNavigateTab && onNavigateTab('cyber')}
                      className="shortcut-btn cyber-shortcut"
                    >
                      <Phone size={14} />
                      <span>{qv.openCyberBtn || (lang === 'hi' ? '1930 साइबर प्रोटोकॉल एवं बैंक डायलर खोलें' : 'Open 1930 Cyber Protocol & Bank Dialers')}</span>
                      <ChevronRight size={14} className="shortcut-arrow" />
                    </button>
                  )}
                  {analysis.firApplicable && (
                    <button
                      onClick={() => onNavigateTab && onNavigateTab('autoFir')}
                      className="shortcut-btn fir-shortcut"
                    >
                      <FileText size={14} />
                      <span>{qv.draftFirBtn || (lang === 'hi' ? 'आधिकारिक FIR ड्राफ्ट (PDF) तैयार करें' : 'Generate Official FIR Draft (PDF)')}</span>
                      <ChevronRight size={14} className="shortcut-arrow" />
                    </button>
                  )}
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('lawyerAid')}
                    className="shortcut-btn aid-shortcut"
                  >
                    <Scale size={14} />
                    <span>{qv.checkAidShortBtn || (lang === 'hi' ? 'मुफ्त NALSA कानूनी सहायता पात्रता' : 'Free NALSA Legal Aid Eligibility')}</span>
                    <ChevronRight size={14} className="shortcut-arrow" />
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
                    <h3 className="card-title">{qv.secSummary || 'Legal Issue Summary'}</h3>
                  </div>
                  <span className="intent-tag">{analysis.intent}</span>
                </div>
                <div className="card-body">
                  <p className="issue-summary-text">{analysis.summary}</p>
                  <div className="sub-category-tag">
                    <strong>{qv.classification || 'Classification'}: </strong> {analysis.category}
                  </div>
                  {analysis.recoveryChances && (
                    <div className="recovery-chance-box">
                      <span className="recovery-label">{qv.recoveryProspects || 'Recovery Prospects'}: </span>
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
                    <h3 className="card-title">{qv.secLaws || 'Relevant Law (BNS & IPC Mappings)'}</h3>
                  </div>
                  <span className="badge-statute">{qv.statuteBadge || 'Statutory Sections'}</span>
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
                    <h3 className="card-title">{qv.secRights || 'Your Rights Under Indian Law'}</h3>
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
                    <h3 className="card-title">{qv.secActions || 'What You Can Do (Step-by-Step)'}</h3>
                  </div>
                  <span className="badge-counter">{analysis.whatYouCanDo.length} {qv.stepsBadge || 'Steps'}</span>
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
                  <h3 className="card-title">{qv.secLawyer || 'When to Contact an Advocate'}</h3>
                </div>
                <AlertCircle size={18} className="text-gold" />
              </div>
              <div className="card-body">
                <p className="lawyer-advice-text">{analysis.whenToContactLawyer}</p>
                <div className="lawyer-action-footer">
                  <span className="legal-aid-reminder">
                    {qv.article39Notice || 'Under Article 39A of the Indian Constitution, citizens with annual income below ₹3,00,000, as well as women and custody detainees, are entitled to free legal aid through NALSA.'}
                  </span>
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('lawyerAid')}
                    className="consult-aid-btn"
                  >
                    <span>{qv.checkAidBtn || 'Check Free Legal Aid Eligibility'}</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exploration Divider */}
      <div className="dashboard-explore-divider">
        <div className="divider-line" />
        <span className="divider-text">
          {lang === 'hi' ? 'विशेषज्ञ कानूनी सेवाएं एवं वैधानिक टूल्स' : 'Specialized Legal Services & Statutory Tools'}
        </span>
        <div className="divider-line" />
      </div>

      {/* Interactive Guide & Creator Showcase Banner */}
      <div className="guide-cta-banner" onClick={() => onNavigateTab && onNavigateTab('about')}>
        <div className="guide-cta-left">
          <div className="guide-cta-icon-wrap">
            <BookOpen size={24} className="text-gold" />
          </div>
          <div className="guide-cta-text">
            <div className="guide-cta-tag-row">
              <span className="guide-cta-tag">{lang === 'hi' ? 'मार्गदर्शिका एवं परिचय' : 'Quick Guide & About'}</span>
              <span className="guide-creator-pill">{lang === 'hi' ? 'अर्जित जायसवाल द्वारा निर्मित' : 'Made by Arjit Jaiswal'}</span>
            </div>
            <h3 className="guide-cta-title">
              {lang === 'hi' ? 'न्यायमित्र का उपयोग कैसे करें? 7-चरणीय संपूर्ण गाइड पढ़ें' : 'How to Use NyayaMitra: Master the 7-Step Legal Suite'}
            </h3>
            <p className="guide-cta-desc">
              {lang === 'hi' ? 'FIR शिकायत तैयार करने, 1930 बैंक फ्रीज और नए BNS 2023 कानूनों को समझने की विस्तृत प्रक्रिया।' : 'Detailed step-by-step roadmap for drafting formal FIRs, executing 1930 Golden Hour recovery & asserting citizen rights.'}
            </p>
          </div>
        </div>
        <div className="guide-cta-btn">
          <span>{lang === 'hi' ? 'गाइड व परिचय देखें' : 'Learn How to Use'}</span>
          <ArrowRight size={15} />
        </div>
      </div>

      {/* Executive 6 Legal Services Hub (Quick Launch Grid) */}
      <div className="services-hub-section">
        <div className="hub-section-header">
          <div>
            <div className="hub-eyebrow">
              <Sparkles size={14} className="text-gold" />
              <span>{lang === 'hi' ? 'विधिक सेवाएं एवं विशेषज्ञ टूल्स' : 'Specialized Legal Services & Hotlines'}</span>
            </div>
            <h2 className="hub-heading">
              {lang === 'hi' ? 'नागरिक कानूनी सुरक्षा केंद्र' : 'All Legal Services & Workspaces'}
            </h2>
          </div>
          <span className="hub-subtext">
            {lang === 'hi' ? 'थाना FIR, साइबर धोखाधड़ी, अनुबंध परीक्षण व सरकारी सहायता के लिए सीधे खोलें:' : 'Direct access to official FIR drafting, 1930 recovery, contract auditing & free legal aid:'}
          </span>
        </div>

        <div className="services-hub-grid">
          {/* 1. Cyber Emergency */}
          <div className="service-hub-card card-cyber" onClick={() => onNavigateTab && onNavigateTab('cyber')}>
            <div className="hub-top">
              <div className="hub-icon-wrap icon-ruby">
                <ShieldAlert size={20} />
              </div>
              <span className="hub-badge badge-urgent">{lang === 'hi' ? '1930 आपातकाल' : 'Urgent SOS'}</span>
            </div>
            <h3 className="hub-title">{lang === 'hi' ? 'साइबर धोखाधड़ी आपात कक्ष' : 'Cyber Fraud Emergency (1930)'}</h3>
            <p className="hub-desc">
              {lang === 'hi' ? 'गोल्डन ऑवर में खाता फ्रीज, 200+ बैंकों के फ्रॉड डेस्क नंबर व RBI शून्य देयता दावा।' : 'Golden Hour fund freezing protocol, 200+ bank fraud hotlines & RBI Zero Liability recovery.'}
            </p>
            <div className="hub-action-row">
              <span>{lang === 'hi' ? '1930 प्रोटोकॉल खोलें' : 'Open 1930 Desk'}</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* 2. Auto FIR Generator */}
          <div className="service-hub-card card-fir" onClick={() => onNavigateTab && onNavigateTab('autoFir')}>
            <div className="hub-top">
              <div className="hub-icon-wrap icon-gold">
                <FileText size={20} />
              </div>
              <span className="hub-badge badge-tool">{lang === 'hi' ? 'ऑटो ड्राफ्टर' : 'Drafting Tool'}</span>
            </div>
            <h3 className="hub-title">{lang === 'hi' ? 'ऑटो FIR व पुलिस शिकायत' : 'Auto FIR Complaint Generator'}</h3>
            <p className="hub-desc">
              {lang === 'hi' ? 'थाना प्रभारी (SHO) हेतु BNS व IPC धाराओं सहित औपचारिक शिकायत पत्र 2 मिनट में प्रिंट/कॉपी करें।' : 'Draft formal, legally structured complaint letters ready for the SHO with BNS & IPC citations.'}
            </p>
            <div className="hub-action-row">
              <span>{lang === 'hi' ? 'शिकायत पत्र बनाएं' : 'Draft Official FIR'}</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* 3. Contract Explainer */}
          <div className="service-hub-card card-contract" onClick={() => onNavigateTab && onNavigateTab('docExplainer')}>
            <div className="hub-top">
              <div className="hub-icon-wrap icon-blue">
                <BookOpen size={20} />
              </div>
              <span className="hub-badge badge-scan">{lang === 'hi' ? 'जोखिम स्कैनर' : 'Risk Scanner'}</span>
            </div>
            <h3 className="hub-title">{lang === 'hi' ? 'अनुबंध व एग्रीमेंट विश्लेषक' : 'Contract & Document Explainer'}</h3>
            <p className="hub-desc">
              {lang === 'hi' ? 'किरायानामा या रोजगार अनुबंध में छुपे एकतरफा नियम, पेनल्टी व गैर-कानूनी बॉन्ड पकड़ें।' : 'Scan rental or employment agreements for unfair penalties, non-competes & indemnity risks.'}
            </p>
            <div className="hub-action-row">
              <span>{lang === 'hi' ? 'अनुबंध की जांच करें' : 'Scan Agreement'}</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* 4. Citizen Rights */}
          <div className="service-hub-card card-rights" onClick={() => onNavigateTab && onNavigateTab('rights')}>
            <div className="hub-top">
              <div className="hub-icon-wrap icon-emerald">
                <Scale size={20} />
              </div>
              <span className="hub-badge badge-rights">{lang === 'hi' ? 'संवैधानिक' : 'Constitutional'}</span>
            </div>
            <h3 className="hub-title">{lang === 'hi' ? 'नागरिक अधिकार हैंडबुक' : 'Citizen Rights Handbook'}</h3>
            <p className="hub-desc">
              {lang === 'hi' ? 'डी.के. बासु गिरफ्तारी नियम, मकान मालिक-किरायेदार अधिकार, महिला सुरक्षा (POSH) व उपभोक्ता कानून।' : 'D.K. Basu arrest safeguards, tenant deposit rights, consumer dispute rules & workplace POSH.'}
            </p>
            <div className="hub-action-row">
              <span>{lang === 'hi' ? 'अधिकार देखें' : 'View Citizen Rights'}</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* 5. Police Locator */}
          <div className="service-hub-card card-locator" onClick={() => onNavigateTab && onNavigateTab('policeLocator')}>
            <div className="hub-top">
              <div className="hub-icon-wrap icon-amber">
                <MapPin size={20} />
              </div>
              <span className="hub-badge badge-dir">{lang === 'hi' ? 'सत्यापित पता' : 'Verified Directory'}</span>
            </div>
            <h3 className="hub-title">{lang === 'hi' ? 'पुलिस स्टेशन व साइबर सेल' : 'Police & Cyber Cells Locator'}</h3>
            <p className="hub-desc">
              {lang === 'hi' ? 'प्रमुख शहरों में नजदीकी थाने, साइबर सेल फोन नंबर व BNSS धारा 173 ज़ीरो FIR अधिकार।' : 'Verified contacts of nearby police stations and cyber crime cells across major Indian metros.'}
            </p>
            <div className="hub-action-row">
              <span>{lang === 'hi' ? 'थाने खोजें' : 'Locate Stations'}</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* 6. Legal Aid */}
          <div className="service-hub-card card-aid" onClick={() => onNavigateTab && onNavigateTab('lawyerAid')}>
            <div className="hub-top">
              <div className="hub-icon-wrap icon-purple">
                <UserCheck size={20} />
              </div>
              <span className="hub-badge badge-aid">{lang === 'hi' ? 'मुफ्त वकील' : 'Free Counsel'}</span>
            </div>
            <h3 className="hub-title">{lang === 'hi' ? 'नालसा मुफ्त कानूनी सहायता' : 'Free Legal Aid & Lawyers'}</h3>
            <p className="hub-desc">
              {lang === 'hi' ? 'अनुच्छेद 39A के तहत मुफ्त सरकारी वकील की पात्रता जांचें और परामर्श ब्रीफ तैयार करें।' : 'Check Article 39A eligibility for free government advocates and build structured case briefs.'}
            </p>
            <div className="hub-action-row">
              <span>{lang === 'hi' ? 'पात्रता जांचें' : 'Check Eligibility'}</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive BNS 2023 ⇄ IPC 1860 Statute Converter */}
      <div className="statute-converter-section">
        <div className="converter-header">
          <div className="converter-title-group">
            <Scale size={20} className="text-gold flex-shrink-0" />
            <div>
              <h2 className="converter-heading">
                {lang === 'hi' ? 'BNS 2023 ⇄ IPC 1860 वैधानिक धारा परिवर्तक' : 'BNS 2023 ⇄ IPC 1860 Statutory Section Converter'}
              </h2>
              <p className="converter-sub">
                {lang === 'hi' ? 'भारतीय न्याय संहिता और पुराने भारतीय दंड संहिता की प्रमुख धाराओं का त्वरित तुलनात्मक विश्लेषण:' : 'Instant statutory cross-referencing between the new Bharatiya Nyaya Sanhita and Indian Penal Code.'}
              </p>
            </div>
          </div>
          <span className="converter-badge">
            {lang === 'hi' ? 'जुलाई 2024 से लागू' : 'Enacted July 2024'}
          </span>
        </div>

        {/* Quick Selection Pills */}
        <div className="converter-pills-list">
          {BNS_CONVERTER_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedStatute(item)}
              className={`converter-pill ${selectedStatute.id === item.id ? 'active-statute-pill' : ''}`}
            >
              <span className="pill-code">{item.ipc.split(' ')[1]} ⇄ {item.bns.split(' ')[1]}</span>
              <span className="pill-name">{lang === 'hi' ? item.titleHi : item.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Statute Breakdown Card */}
        {selectedStatute && (
          <div className="statute-detail-card">
            <div className="detail-top-row">
              <div className="detail-code-badge new-code">
                <span className="code-label">{lang === 'hi' ? 'नया कानून (BNS / BNSS)' : 'New Criminal Law (BNS 2023)'}</span>
                <strong className="code-value">{selectedStatute.bns}</strong>
              </div>
              <div className="detail-arrow-icon">
                <ArrowRight size={18} className="text-gold" />
              </div>
              <div className="detail-code-badge old-code">
                <span className="code-label">{lang === 'hi' ? 'पूर्व कानून (IPC / CrPC)' : 'Former Penal Law (IPC 1860)'}</span>
                <strong className="code-value">{selectedStatute.ipc}</strong>
              </div>
            </div>

            <div className="detail-meta-grid">
              <div className="meta-box">
                <span className="meta-label">{lang === 'hi' ? 'अपराध का स्वरूप' : 'Classification'}:</span>
                <strong className="meta-val">{lang === 'hi' ? selectedStatute.natureHi : selectedStatute.nature}</strong>
              </div>
              <div className="meta-box">
                <span className="meta-label">{lang === 'hi' ? 'कानूनी दंड / प्रावधान' : 'Punishment / Statutory Relief'}:</span>
                <strong className="meta-val text-ruby">{lang === 'hi' ? selectedStatute.punishmentHi : selectedStatute.punishment}</strong>
              </div>
            </div>

            <p className="detail-desc">
              {lang === 'hi' ? selectedStatute.descriptionHi : selectedStatute.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

