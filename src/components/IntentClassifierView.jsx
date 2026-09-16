import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Mic, MicOff, Volume2, Square, ArrowRight, ShieldCheck, 
  AlertCircle, CheckCircle2, Scale, ExternalLink, Sparkles, RefreshCw, 
  HelpCircle, ChevronRight, CornerDownRight, FileText, Phone,
  ShieldAlert, BookOpen, MapPin, UserCheck, Play, Pause,
  Compass, Search, Building2, PhoneCall, Filter, ChevronDown, ChevronUp, Zap, User,
  Lock, AlertOctagon
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

const DASHBOARD_I18N = {
  en: {
    quickNavTitle: "Dashboard Navigation:",
    navAiSolver: "AI Legal Solver",
    navServices: "6 Legal Workspaces",
    navConverter: "BNS ⇄ IPC Converter",
    navEmergency: "24/7 Helplines",
    sec01Badge: "01 • AI Legal Consultation",
    sec02Badge: "02 • Specialized Legal Workspaces",
    sec03Badge: "03 • Criminal Law Reform",
    sec04Badge: "04 • 24/7 Citizen Emergency",
    filterAll: "All Workspaces (6)",
    filterPolice: "Police & Enforcement (3)",
    filterCivil: "Civil & Legal Rights (3)",
    searchStatutePlaceholder: "Search crime or section (e.g., cheating, theft, 420, 318, snatching)...",
    noStatutesFound: "No matching statutes found. Try searching 'theft', 'cheating', 'fir', or '318'.",
    emergencyTitle: "National Citizen Legal & Emergency Helplines",
    emergencySub: "Immediate toll-free government assistance across India:",
    callNow: "Call",
    freeGovService: "Govt. Toll-Free 24/7",
    statutesCountBadge: "Statutes Available"
  },
  hi: {
    quickNavTitle: "डैशबोर्ड नेविगेशन:",
    navAiSolver: "AI कानूनी समाधान",
    navServices: "6 विधिक वर्कस्पेस",
    navConverter: "BNS ⇄ IPC परिवर्तक",
    navEmergency: "24/7 हेल्पलाइन",
    sec01Badge: "01 • AI विधिक परामर्श व अधिकार",
    sec02Badge: "02 • विशेषज्ञ विधिक वर्कस्पेस",
    sec03Badge: "03 • नई आपराधिक कानून संहिता",
    sec04Badge: "04 • 24/7 नागरिक आपातकालीन सेवा",
    filterAll: "सभी वर्कस्पेस (6)",
    filterPolice: "पुलिस व आपराधिक (3)",
    filterCivil: "नागरिक व अनुबंध अधिकार (3)",
    searchStatutePlaceholder: "अपराध या धारा खोजें (जैसे: धोखाधड़ी, चोरी, 420, 318, FIR)...",
    noStatutesFound: "कोई संबंधित धारा नहीं मिली। 'धोखाधड़ी', 'चोरी', '318' या 'FIR' लिखकर खोजें।",
    emergencyTitle: "राष्ट्रीय नागरिक कानूनी एवं आपातकालीन हेल्पलाइन",
    emergencySub: "पूरे भारत में तत्काल निःशुल्क 24/7 सरकारी सहायता नंबर:",
    callNow: "कॉल करें",
    freeGovService: "सरकारी टोल-फ्री 24/7",
    statutesCountBadge: "प्रमुख धाराएं उपलब्ध"
  },
  bn: {
    quickNavTitle: "ড্যাশবোর্ড বিভাগ:",
    navAiSolver: "AI আইনি সমাধান",
    navServices: "৬টি আইনি টুল",
    navConverter: "BNS ⇄ IPC কনভার্টার",
    navEmergency: "২৪/৭ হেল্পলাইন",
    sec01Badge: "০১ • AI আইনি পরামর্শ",
    sec02Badge: "০২ • বিশেষ আইনি টুলস",
    sec03Badge: "০৩ • নতুন ফৌজদারি আইন",
    sec04Badge: "০৪ • জরুরি হেল্পলাইন",
    filterAll: "সব টুল (৬)",
    filterPolice: "পুলিশ ও ফৌজদারি (৩)",
    filterCivil: "নাগরিক অধিকার (৩)",
    searchStatutePlaceholder: "অপরাধ বা ধারা খুঁজুন...",
    noStatutesFound: "কোনো মেলেনি। পুনরায় অনুসন্ধান করুন।",
    emergencyTitle: "জরুরি সরকারি হেল্পলাইন",
    emergencySub: "সরাসরি বিনামূল্যে সরকারি সহায়তা:",
    callNow: "কল করুন",
    freeGovService: "টোল-ফ্রি ২৪/৭",
    statutesCountBadge: "ধারা উপলব্ধ"
  },
  ta: {
    quickNavTitle: "டாஷ்போர்டு பிரிவுகள்:",
    navAiSolver: "AI சட்ட தீர்வு",
    navServices: "6 சட்ட கருவிகள்",
    navConverter: "BNS ⇄ IPC மாற்றி",
    navEmergency: "24/7 உதவி எண்கள்",
    sec01Badge: "01 • AI சட்ட ஆலோசனை",
    sec02Badge: "02 • சிறப்பு கருவிகள்",
    sec03Badge: "03 • புதிய குற்றவியல் சட்டம்",
    sec04Badge: "04 • அவசர உதவி எண்கள்",
    filterAll: "அனைத்து கருவிகள் (6)",
    filterPolice: "காவல்துறை & குற்றவியல் (3)",
    filterCivil: "குடிமை உரிமைகள் (3)",
    searchStatutePlaceholder: "குற்றம் அல்லது பிரிவு தேடவும்...",
    noStatutesFound: "பிரிவுகள் கிடைக்கவில்லை.",
    emergencyTitle: "தேசிய குடிமக்கள் அவசர உதவி எண்கள்",
    emergencySub: "உடனடி கட்டணமில்லா அரசு உதவி:",
    callNow: "அழைக்கவும்",
    freeGovService: "கட்டணமில்லா சேவை",
    statutesCountBadge: "பிரிவுகள் உள்ளன"
  },
  te: {
    quickNavTitle: "డ్యాష్‌బోర్డ్ విభాగాలు:",
    navAiSolver: "AI చట్టపరమైన పరిష్కారం",
    navServices: "6 చట్టపరమైన టూల్స్",
    navConverter: "BNS ⇄ IPC కన్వర్టర్",
    navEmergency: "24/7 హెల్ప్‌లైన్లు",
    sec01Badge: "01 • AI చట్టపరమైన సలహా",
    sec02Badge: "02 • ప్రత్యేక చట్టపరమైన టూల్స్",
    sec03Badge: "03 • కొత్త నేర చట్టం",
    sec04Badge: "04 • అత్యవసర హెల్ప్‌లైన్లు",
    filterAll: "అన్ని టూల్స్ (6)",
    filterPolice: "పోలీస్ & క్రిమినల్ (3)",
    filterCivil: "సివిల్ హక్కులు (3)",
    searchStatutePlaceholder: "నేరం లేదా సెక్షన్ వెతకండి...",
    noStatutesFound: "సెక్షన్లు దొరకలేదు.",
    emergencyTitle: "జాతీయ పౌర అత్యవసర హెల్ప్‌లైన్లు",
    emergencySub: "ఉచిత ప్రభుత్వ సాయం:",
    callNow: "కాల్ చేయండి",
    freeGovService: "టోల్-ఫ్రీ 24/7",
    statuteCount: "సెక్షన్లు అందుబాటులో ఉన్నాయి"
  },
  mr: {
    quickNavTitle: "डॅशबोर्ड विभाग:",
    navAiSolver: "AI कायदेशीर सल्ला",
    navServices: "6 कायदेशीर साधने",
    navConverter: "BNS ⇄ IPC परिवर्तक",
    navEmergency: "24/7 हेल्पलाइन",
    sec01Badge: "01 • AI कायदेशीर सल्ला",
    sec02Badge: "02 • विशेष विधी साधने",
    sec03Badge: "03 • नवीन फौजदारी कायदे",
    sec04Badge: "04 • 24/7 आपत्कालीन सेवा",
    filterAll: "सर्व टूल्स (6)",
    filterPolice: "पोलीस व फौजदारी (3)",
    filterCivil: "नागरी हक्क (3)",
    searchStatutePlaceholder: "गुन्हा किंवा कलम शोधा...",
    noStatutesFound: "कोणतीही कलमे आढळली नाहीत.",
    emergencyTitle: "राष्ट्रीय आपत्कालीन हेल्पलाइन",
    emergencySub: "भारतात कुठेही मोफत शासकीय मदत:",
    callNow: "कॉल करा",
    freeGovService: "शासकीय टोल-फ्री 24/7",
    statuteCount: "कलमे उपलब्ध"
  },
  gu: {
    quickNavTitle: "ડેશબોર્ડ વિભાગો:",
    navAiSolver: "AI કાનૂની ઉકેલ",
    navServices: "6 કાનૂની સાધનો",
    navConverter: "BNS ⇄ IPC કન્વર્ટર",
    navEmergency: "24/7 હેલ્પલાઇન",
    sec01Badge: "01 • AI કાનૂની સલાહ",
    sec02Badge: "02 • વિશેષ કાનૂની સાધનો",
    sec03Badge: "03 • નવી ફોજદારી સંહિતા",
    sec04Badge: "04 • 24/7 ઇમરજન્સી સેવા",
    filterAll: "બધા સાધનો (6)",
    filterPolice: "પોલીસ અને ફોજદારી (3)",
    filterCivil: "નાગરિક અધિકારો (3)",
    searchStatutePlaceholder: "ગુનો અથવા કલમ શોધો...",
    noStatutesFound: "કોઈ કલમ મળી નથી.",
    emergencyTitle: "રાષ્ટ્રીય ઇમરજન્સી હેલ્પલાઇન",
    emergencySub: "સમગ્ર ભારતમાં મફત સરકારી સહાય:",
    callNow: "કૉલ કરો",
    freeGovService: "સરકારી ટોલ-ફ્રી 24/7",
    statuteCount: "મુખ્ય કલમો ઉપલબ્ધ"
  },
  kn: {
    quickNavTitle: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವಿಭಾಗಗಳು:",
    navAiSolver: "AI ಕಾನೂನು ಪರಿಹಾರ",
    navServices: "6 ಕಾನೂನು ಪರಿಕರಗಳು",
    navConverter: "BNS ⇄ IPC ಪರಿವರ್ತಕ",
    navEmergency: "24/7 ಸಹಾಯವಾಣಿ",
    sec01Badge: "01 • AI ಕಾನೂನು ಸಲಹೆ",
    sec02Badge: "02 • ವಿಶೇಷ ಪರಿಕರಗಳು",
    sec03Badge: "03 • ಹೊಸ ಅಪರಾಧ ಕಾನೂನು",
    sec04Badge: "04 • 24/7 ತುರ್ತು ಸೇವೆ",
    filterAll: "ಎಲ್ಲಾ ಪರಿಕರಗಳು (6)",
    filterPolice: "ಪೊಲೀಸ್ ಮತ್ತು ಅಪರಾಧ (3)",
    filterCivil: "ನಾಗರಿಕ ಹಕ್ಕುಗಳು (3)",
    searchStatutePlaceholder: "ಅಪರಾಧ ಅಥವಾ ಕಲಂ ಹುಡುಕಿ...",
    noStatutesFound: "ಯಾವುದೇ ಕಲಂಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    emergencyTitle: "ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸಹಾಯವಾಣಿಗಳು",
    emergencySub: "ಉಚಿತ ಸರ್ಕಾರಿ ಸಹಾಯ:",
    callNow: "ಕರೆ ಮಾಡಿ",
    freeGovService: "ಟೋಲ್-ಫ್ರೀ 24/7",
    statuteCount: "ಕಲಂಗಳು ಲಭ್ಯವಿದೆ"
  }
};

const EMERGENCY_HELPLINES = [
  {
    id: 'cyber',
    number: '1930',
    title: 'Cyber Financial Fraud',
    titleHi: 'साइबर वित्तीय धोखाधड़ी',
    desc: 'National Cyber Crime Portal (Golden Hour bank account freezing & digital arrest prevention)',
    descHi: 'राष्ट्रीय साइबर अपराध पोर्टल (गोल्डन ऑवर बैंक खाता फ्रीज व डिजिटल अरेस्ट रोकथाम)',
    iconColor: '#ef4444'
  },
  {
    id: 'police',
    number: '112',
    title: 'All-India Police Emergency',
    titleHi: 'अखिल भारतीय पुलिस आपातकाल',
    desc: 'Emergency Response Support System (ERSS) dispatch across all states & Union Territories',
    descHi: 'सभी राज्यों में 24/7 पुलिस, अग्निशमन व आपातकालीन सहायता सेवा (ERSS)',
    iconColor: '#3b82f6'
  },
  {
    id: 'women',
    number: '1091',
    title: 'Women Safety & Harassment',
    titleHi: 'महिला सुरक्षा एवं प्रताड़ना निवारण',
    desc: 'National Commission for Women (NCW) & police safety desk for stalking and domestic violence',
    descHi: 'घरेलू हिंसा, प्रताड़ना व पीछा करने के विरुद्ध 24/7 महिला सुरक्षा डेस्क',
    iconColor: '#ec4899'
  },
  {
    id: 'nalsa',
    number: '15100',
    title: 'NALSA Free Legal Aid',
    titleHi: 'नालसा मुफ्त कानूनी सहायता',
    desc: 'National Legal Services Authority (Article 39A) for free government advocate representation',
    descHi: 'अनुच्छेद 39A के तहत निःशुल्क सरकारी वकील व कानूनी परामर्श सहायता',
    iconColor: '#10b981'
  }
];

export default function IntentClassifierView({ lang = 'en', onNavigateTab }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const qv = t.queryView || {};
  const dashT = DASHBOARD_I18N[lang] || DASHBOARD_I18N.en;

  const defaultQuery = lang === 'hi' 
    ? 'UPI पर किसी ने मेरे ₹5000 की धोखाधड़ी कर ली' 
    : 'Someone scammed me ₹5000 on UPI';

  const [query, setQuery] = useState(defaultQuery);
  const [userSubmittedQuery, setUserSubmittedQuery] = useState(defaultQuery);
  const [showFullStatutes, setShowFullStatutes] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [selectedStatute, setSelectedStatute] = useState(BNS_CONVERTER_DATA[0]);

  // Dashboard filter & search states
  const [servicesCategory, setServicesCategory] = useState('all');
  const [statuteSearch, setStatuteSearch] = useState('');

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
    setUserSubmittedQuery(qToAnalyze);
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

    setUserSubmittedQuery(targetQuery);
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
      {/* 0. Executive Sticky / Top Dashboard Quick Navigator Bar */}
      <div className="dashboard-quick-nav-bar">
        <div className="quick-nav-label">
          <Compass size={15} className="text-gold" />
          <span>{dashT.quickNavTitle}</span>
        </div>
        <div className="quick-nav-links">
          <button type="button" onClick={() => scrollToSection('section-ai-solver')} className="quick-nav-btn">
            <Sparkles size={13} className="text-gold" />
            <span>{dashT.navAiSolver}</span>
          </button>
          <button type="button" onClick={() => scrollToSection('section-services-hub')} className="quick-nav-btn">
            <Building2 size={13} className="text-blue" />
            <span>{dashT.navServices}</span>
          </button>
          <button type="button" onClick={() => scrollToSection('section-statute-converter')} className="quick-nav-btn">
            <Scale size={13} className="text-emerald" />
            <span>{dashT.navConverter}</span>
          </button>
          <button type="button" onClick={() => scrollToSection('section-emergency-helplines')} className="quick-nav-btn btn-emergency-nav">
            <PhoneCall size={13} className="text-crimson" />
            <span>{dashT.navEmergency}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: AI Legal Problem Solver & Conversational Flow */}
      <div id="section-ai-solver" className="dashboard-section-wrap">
        <div className="dashboard-section-badge">
          <Sparkles size={12} />
          <span>{lang === 'hi' ? 'AI कानूनी सहायक 2.0' : 'Conversational AI Legal Assistant'}</span>
        </div>

        {/* Minimal Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 1.6rem auto' }}>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.8vw, 2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            {lang === 'hi' ? 'भारतीय कानून से जुड़ा कोई भी सवाल सरल भाषा में पूछें' : 'Ask Your Legal Problem in Simple Words'}
          </h1>
          <p style={{ fontSize: '0.98rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
            {lang === 'hi' 
              ? 'तुरंत जानें: क्या यह संज्ञेय अपराध है, आपातकालीन कदम क्या हैं और BNS 2023 व IPC के तहत क्या अधिकार हैं।' 
              : 'Instant AI legal risk analysis, step-by-step action roadmaps, and formal FIR complaint drafting.'}
          </p>
        </div>

        {/* 1. Big Modern Search Bar with embedded glowing 🎤 Voice Button */}
        <div className="modern-big-search-container">
          <form 
            className="modern-big-search-box"
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAnalysis();
            }}
          >
            <Search size={22} className="modern-big-search-icon" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'अपनी कानूनी समस्या सरल शब्दों में लिखें...' : 'Ask your legal problem in simple words...'}
              className="modern-big-search-input"
            />
            <div className="modern-search-actions">
              <button
                type="button"
                onClick={toggleListen}
                className={`modern-mic-trigger ${isListening ? 'is-listening' : ''}`}
                title={lang === 'hi' ? 'बोलें (Hindi / English)' : 'Speak your problem in Hindi/English'}
                aria-label="Voice Input"
              >
                {isListening ? <MicOff size={22} /> : <Mic size={22} />}
              </button>

              <button
                type="submit"
                disabled={isAnalyzing || !query.trim()}
                className="modern-send-trigger"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={16} className="spin-icon" />
                    <span>{lang === 'hi' ? 'विश्लेषण...' : 'Analyzing...'}</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    <span>{lang === 'hi' ? 'पूछें' : 'Ask AI'}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* 2. Quick Action Chips */}
          <div className="modern-quick-actions-bar">
            <span className="modern-quick-label">
              <Zap size={13} /> {lang === 'hi' ? 'त्वरित टूल्स:' : 'Quick Actions:'}
            </span>
            <button
              type="button"
              className="modern-quick-chip chip-fir"
              onClick={() => {
                const q = lang === 'hi' ? 'थाना पुलिस चोरी की FIR दर्ज करने से मना कर रही है और केवल गुमशुदगी लिखने को कह रही है' : 'Police is refusing to register FIR for theft and asking to write lost report';
                setQuery(q);
                handleRunAnalysis(q);
              }}
            >
              <span>🚨</span>
              <span>{lang === 'hi' ? 'FIR सहायता' : 'FIR Help'}</span>
            </button>
            <button
              type="button"
              className="modern-quick-chip"
              style={{ background: 'rgba(255, 176, 32, 0.12)', border: '1px solid rgba(255, 176, 32, 0.35)', color: '#FFB020' }}
              onClick={() => onNavigateTab && onNavigateTab('evidenceLocker')}
            >
              <span>🔒</span>
              <span>{lang === 'hi' ? 'साक्ष्य लॉकर' : 'Evidence Locker'}</span>
            </button>
            <button
              type="button"
              className="modern-quick-chip"
              style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#10B981' }}
              onClick={() => onNavigateTab && onNavigateTab('caseAnalyzer')}
            >
              <span>⚖️</span>
              <span>{lang === 'hi' ? 'केस स्कोर' : 'Case Strength'}</span>
            </button>
            <button
              type="button"
              className="modern-quick-chip"
              style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', color: '#EF4444' }}
              onClick={() => onNavigateTab && onNavigateTab('scamDetector')}
            >
              <span>🔎</span>
              <span>{lang === 'hi' ? 'स्कैम रडार' : 'Scam Radar'}</span>
            </button>
            <button
              type="button"
              className="modern-quick-chip chip-cyber"
              onClick={() => {
                const q = lang === 'hi' ? 'UPI पर किसी ने मेरे ₹5000 की धोखाधड़ी कर ली' : 'Someone scammed me ₹5000 on UPI';
                setQuery(q);
                handleRunAnalysis(q);
              }}
            >
              <span>💸</span>
              <span>{lang === 'hi' ? 'साइबर फ्रॉड' : 'Cyber Fraud'}</span>
            </button>
            <button
              type="button"
              className="modern-quick-chip chip-doc"
              onClick={() => onNavigateTab && onNavigateTab('docExplainer')}
            >
              <span>📄</span>
              <span>{lang === 'hi' ? 'अनुबंध जांच' : 'Contract Scan'}</span>
            </button>
          </div>
        </div>

        {/* 3. Analysis Loading State */}
        {isAnalyzing && (
          <div className="active-reasoning-card" style={{ maxWidth: '960px', margin: '0 auto 2rem auto' }}>
            <div className="reasoning-header">
              <div className="reasoning-spinner-wrap">
                <RefreshCw size={26} className="spin-icon text-gold" />
              </div>
              <div className="reasoning-title-group">
                <div className="reasoning-badge">
                  <Sparkles size={14} className="text-gold" />
                  <span>{lang === 'hi' ? 'AI विधिक विश्लेषण सक्रिय' : 'AI Legal Reasoning Active'}</span>
                </div>
                <h3 className="reasoning-heading">
                  {lang === 'hi' ? 'आपके मामले में BNS 2023 व भारतीय कानूनों का विश्लेषण जारी है...' : 'Analyzing Indian Law & Legal Remedies for Your Situation...'}
                </h3>
              </div>
            </div>
            <div className="reasoning-steps-progress">
              <div className={`reasoning-step-item ${pipelineStep >= 1 ? 'step-completed' : ''}`}>
                <div className="reasoning-step-circle">1</div>
                <div className="reasoning-step-label">
                  <strong>{lang === 'hi' ? 'कानूनी मंशा' : 'Intent'}</strong>
                  <span>{lang === 'hi' ? 'वर्गीकरण...' : 'Classifying...'}</span>
                </div>
              </div>
              <div className={`reasoning-step-item ${pipelineStep >= 2 ? 'step-completed' : ''}`}>
                <div className="reasoning-step-circle">2</div>
                <div className="reasoning-step-label">
                  <strong>{lang === 'hi' ? 'BNS व IPC' : 'Statutes'}</strong>
                  <span>{lang === 'hi' ? 'धारा मिलान...' : 'Mapping...'}</span>
                </div>
              </div>
              <div className={`reasoning-step-item ${pipelineStep >= 3 ? 'step-completed' : ''}`}>
                <div className="reasoning-step-circle">3</div>
                <div className="reasoning-step-label">
                  <strong>{lang === 'hi' ? 'नागरिक अधिकार' : 'Safeguards'}</strong>
                  <span>{lang === 'hi' ? 'अधिकार...' : 'Evaluating...'}</span>
                </div>
              </div>
              <div className={`reasoning-step-item ${pipelineStep >= 4 ? 'step-completed' : ''}`}>
                <div className="reasoning-step-circle">4</div>
                <div className="reasoning-step-label">
                  <strong>{lang === 'hi' ? 'सर्वोत्तम कदम' : 'Roadmap'}</strong>
                  <span>{lang === 'hi' ? 'कार्रवाई तैयार...' : 'Formulating...'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Conversational Chat-Based Experience (Action > Explanation) */}
        {analysis && !isAnalyzing && (
          <div className="chat-conversation-flow" ref={resultsContainerRef}>
            {/* User Query Bubble */}
            <div className="chat-bubble-user">
              <div className="chat-bubble-user-label">
                <User size={13} />
                <span>{lang === 'hi' ? 'आपकी समस्या' : 'You'}</span>
              </div>
              <p className="chat-bubble-user-text">"{userSubmittedQuery}"</p>
            </div>

            {/* AI Response Card */}
            <div className="chat-card-ai">
              {/* AI Header & Risk Score */}
              <div className="chat-ai-header">
                <div className="chat-ai-brand">
                  <div className="chat-ai-avatar">
                    <Scale size={20} />
                  </div>
                  <div>
                    <span className="chat-ai-name">NyayaMitra Legal AI</span>
                    <span className="chat-ai-statute-tag">{analysis.intent} • BNS 2023 & IPC Compliant</span>
                  </div>
                </div>

                {/* AI Risk Score Badge */}
                <div className={`risk-score-badge risk-${analysis.riskLevelCode || 'amber'}`}>
                  <AlertCircle size={15} />
                  <span>
                    {analysis.riskScore === 'HIGH'
                      ? (lang === 'hi' ? '⚠️ उच्च जोखिम मामला चिन्हित' : '⚠️ High Risk Case Detected')
                      : analysis.riskScore === 'MEDIUM'
                      ? (lang === 'hi' ? '⚠️ मध्यम विधिक जोखिम' : '⚠️ Medium Risk Case')
                      : (lang === 'hi' ? '🟢 सामान्य विधिक परामर्श' : '🟢 Low Risk Inquiry')}
                  </span>
                </div>
              </div>

              {/* Action-First Roadmap: 📌 You Can Do This */}
              <div className="action-steps-card">
                <div className="action-steps-title">
                  <span>📌</span>
                  <span>{lang === 'hi' ? 'आप यह कर सकते हैं (कार्रवाई के कदम):' : 'You Can Do This (Action Steps):'}</span>
                </div>
                <ol className="action-steps-list">
                  {(analysis.actionSteps || [
                    analysis.legalDecision?.bestAction,
                    analysis.legalDecision?.immediateNextStep
                  ].filter(Boolean)).map((step, idx) => (
                    <li key={idx} className="action-step-item">
                      <span className="action-step-num">{idx + 1}</span>
                      <span className="action-step-text">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Big Action Buttons (Action > Explanation) */}
              <div className="big-action-cta-group">
                {/* Auto FIR Draft CTA */}
                {analysis.firApplicable && (
                  <button
                    type="button"
                    onClick={() => onNavigateTab && onNavigateTab('autoFir')}
                    className="btn-big-cta cta-primary"
                  >
                    <FileText size={17} />
                    <span>{lang === 'hi' ? 'आधिकारिक FIR शिकायत बनाएं' : 'Generate Official FIR Draft'}</span>
                  </button>
                )}

                {/* Direct Emergency Telephone Helpline */}
                {analysis.emergencyCall && (
                  <a
                    href={`tel:${analysis.emergencyCall}`}
                    className="btn-big-cta cta-emergency"
                  >
                    <Phone size={17} />
                    <span>{lang === 'hi' ? `तुरंत ${analysis.emergencyCall} डायल करें` : `Call ${analysis.emergencyCall} Immediately`}</span>
                  </a>
                )}

                {/* Voice Legal Assistant: Listen to Advice */}
                <button
                  type="button"
                  onClick={() => handleTogglePlay(analysis.voiceSpokenText)}
                  className="btn-big-cta cta-audio"
                  aria-label="Listen to Audio Advice"
                >
                  {isSpeaking ? (
                    isPaused ? <Play size={17} /> : <Pause size={17} />
                  ) : (
                    <Volume2 size={17} />
                  )}
                  <span>
                    {isSpeaking 
                      ? (isPaused ? (lang === 'hi' ? 'जारी रखें' : 'Resume Audio') : (lang === 'hi' ? 'सलाह रोकें' : 'Pause Audio'))
                      : (lang === 'hi' ? 'सलाह सुनें (Listen to Advice)' : 'Listen to Advice')}
                  </span>
                </button>

                {/* AI Case Strength Audit Button */}
                <button
                  type="button"
                  onClick={() => onNavigateTab && onNavigateTab('caseAnalyzer')}
                  className="btn-big-cta"
                  style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10B981' }}
                >
                  <Scale size={17} />
                  <span>{lang === 'hi' ? 'केस सामर्थ्य जांचें (Case Strength)' : 'Audit Case Strength'}</span>
                </button>

                {/* Evidence Locker Vault Button */}
                <button
                  type="button"
                  onClick={() => onNavigateTab && onNavigateTab('evidenceLocker')}
                  className="btn-big-cta"
                  style={{ background: 'rgba(255, 176, 32, 0.15)', border: '1px solid rgba(255, 176, 32, 0.4)', color: '#FFB020' }}
                >
                  <Lock size={17} />
                  <span>{lang === 'hi' ? 'साक्ष्य लॉकर में सबूत रखें' : 'Secure Proofs in Vault'}</span>
                </button>
              </div>

              {/* Active Audio Playback HUD */}
              {isSpeaking && (
                <div style={{ marginTop: '1.2rem', padding: '1rem 1.25rem', background: 'rgba(56, 189, 248, 0.08)', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Volume2 size={16} className="text-blue" />
                      <strong style={{ fontSize: '0.88rem', color: '#fff' }}>
                        {lang === 'hi' ? 'ऑडियो कानूनी परामर्श सक्रिय' : 'Voice Legal Briefing Active'}
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      {formatTime(audioElapsed)} / {formatTime(audioDuration)}
                    </span>
                  </div>
                  <div className="voice-progress-container" style={{ margin: '0.35rem 0' }}>
                    <div className="voice-progress-track">
                      <div className="voice-progress-fill" style={{ width: `${audioProgress}%` }} />
                    </div>
                  </div>
                  <p style={{ margin: '0.45rem 0 0 0', fontSize: '0.85rem', color: '#cbd5e1', fontStyle: 'italic', lineHeight: 1.45 }}>
                    "{analysis.voiceSpokenText || analysis.legalDecision?.bestAction}"
                  </p>
                </div>
              )}

              {/* Collapsible Details Toggle */}
              <div style={{ marginTop: '1.3rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.9rem' }}>
                <button
                  type="button"
                  onClick={() => setShowFullStatutes(!showFullStatutes)}
                  className="details-toggle-btn"
                >
                  {showFullStatutes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <span>
                    {showFullStatutes
                      ? (lang === 'hi' ? 'विस्तृत धाराएं व वैधानिक विश्लेषण छुपाएं' : 'Hide Applicable Statutes & Legal Rights')
                      : (lang === 'hi' ? '⚖️ BNS 2023 व IPC धाराएं तथा विस्तृत अधिकार देखें' : '⚖️ View Applicable BNS 2023 & IPC Statutes and Detailed Rights')}
                  </span>
                </button>
              </div>

              {/* Expandable Statutory Citations and Citizen Protections */}
              {showFullStatutes && (
                <div style={{ marginTop: '1.25rem' }}>
                  <div className="results-two-col">
                    {/* Applicable Statutes Card */}
                    <div className="card result-card">
                      <div className="card-header">
                        <div className="card-title-group">
                          <Scale size={16} className="text-gold" />
                          <h3 className="card-title">{lang === 'hi' ? 'लागू होने वाली धाराएं (BNS 2023 व IPC)' : 'Applicable Statutory Sections'}</h3>
                        </div>
                      </div>
                      <div className="card-body laws-list">
                        {analysis.applicableLaws.map((law, idx) => (
                          <div key={idx} className="law-item-card">
                            <div className="law-header">
                              <Scale size={14} className="text-gold" />
                              <strong className="law-statute">{law.statute}</strong>
                            </div>
                            <p className="law-meaning">{law.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Citizen Safeguards Card */}
                    <div className="card result-card">
                      <div className="card-header">
                        <div className="card-title-group">
                          <ShieldCheck size={16} className="text-emerald" />
                          <h3 className="card-title">{lang === 'hi' ? 'संवैधानिक नागरिक अधिकार' : 'Constitutional Protections'}</h3>
                        </div>
                      </div>
                      <div className="card-body">
                        <ul className="bullet-checklist">
                          {analysis.userRights.map((right, idx) => (
                            <li key={idx} className="bullet-item">
                              <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                              <span>{right}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Interactive Guide & Creator Banner */}
        <div className="guide-cta-banner" onClick={() => onNavigateTab && onNavigateTab('about')} style={{ maxWidth: '960px', margin: '1.5rem auto 0 auto' }}>
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
        {/* Flagship Legal Tech Innovations: 3 High-Impact Launchers */}
        <div style={{ maxWidth: '960px', margin: '2rem auto 0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#FFB020', color: '#0B0F1A', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '5px', textTransform: 'uppercase' }}>
                {lang === 'hi' ? 'अदालती व सुरक्षा तकनीक' : 'HIGH-IMPACT SUITE'}
              </span>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#F8FAFC' }}>
                {lang === 'hi' ? '3 प्रमुख कानूनी नवाचार (Court & Cyber Defense)' : '3 Next-Gen Legal Innovations'}
              </h3>
            </div>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>
              {lang === 'hi' ? 'अदालत में स्वीकार्य • 100% गोपनीय' : 'Section 63 BSA • Heuristic Radar'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {/* Flagship 1: Evidence Locker */}
            <div 
              onClick={() => onNavigateTab && onNavigateTab('evidenceLocker')}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 176, 32, 0.08) 0%, #111827 100%)',
                border: '1px solid rgba(255, 176, 32, 0.3)',
                borderRadius: '16px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              className="hover-glow-card"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255, 176, 32, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFB020' }}>
                    <Lock size={20} />
                  </div>
                  <span style={{ background: 'rgba(255, 176, 32, 0.2)', color: '#FFB020', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                    SEC 63 BSA
                  </span>
                </div>
                <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 800, color: '#F8FAFC' }}>
                  {lang === 'hi' ? '🚨 डिजिटल साक्ष्य लॉकर' : '🚨 Digital Evidence Locker'}
                </h4>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#94A3B8', lineHeight: '1.5' }}>
                  {lang === 'hi' ? 'व्हाट्सएप स्क्रीनशॉट, बैंक रसीद के लिए SHA-256 हैश, जीपीएस टैग व अदालत में मान्य धारा 63 प्रमाण पत्र।' : 'Court-ready digital vault with SHA-256 hashing, geo-tags, chain-of-custody, and Sec 63 BSA certificate export.'}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', color: '#FFB020', fontSize: '12.5px', fontWeight: 700 }}>
                <span>{lang === 'hi' ? 'लॉकर खोलें' : 'Open Vault'}</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Flagship 2: Case Strength Analyzer */}
            <div 
              onClick={() => onNavigateTab && onNavigateTab('caseAnalyzer')}
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, #111827 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '16px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              className="hover-glow-card"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                    <Scale size={20} />
                  </div>
                  <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                    BNS AUDIT
                  </span>
                </div>
                <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 800, color: '#F8FAFC' }}>
                  {lang === 'hi' ? '⚖️ एआई केस सामर्थ्य विश्लेषक' : '⚖️ AI Case Strength Analyzer'}
                </h4>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#94A3B8', lineHeight: '1.5' }}>
                  {lang === 'hi' ? 'केस में जीत की संभावना (0-100%), BNS धाराओं की पूर्ति, कमजोरियां व विरोधी पक्ष की दलीलों का पूर्वानुमान।' : 'Evaluate litigation win probability (0-100%), evidence sufficiency audit, procedural loopholes & defense prediction.'}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', color: '#10B981', fontSize: '12.5px', fontWeight: 700 }}>
                <span>{lang === 'hi' ? 'केस स्कोर जांचें' : 'Evaluate Strength'}</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Flagship 3: Scam Radar */}
            <div 
              onClick={() => onNavigateTab && onNavigateTab('scamDetector')}
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, #111827 100%)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '16px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              className="hover-glow-card"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                    <AlertOctagon size={20} />
                  </div>
                  <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                    LIVE SCAN
                  </span>
                </div>
                <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 800, color: '#F8FAFC' }}>
                  {lang === 'hi' ? '🔎 एआई साइबर स्कैम डिटेक्टर' : '🔎 AI Cyber Scam Radar'}
                </h4>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#94A3B8', lineHeight: '1.5' }}>
                  {lang === 'hi' ? 'डिजिटल अरेस्ट, बिजली बिल एसएमएस, यूट्यूब लाइक टास्क व फर्जी बैंक एपीके की तुरंत जांच करें।' : 'Real-time scanner for Digital Arrest extortion, fake electricity SMS, malicious APKs & UPI collect scams.'}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', color: '#EF4444', fontSize: '12.5px', fontWeight: 700 }}>
                <span>{lang === 'hi' ? 'संदेश स्कैन करें' : 'Scan Message'}</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of Section 1 */}

      {/* ==========================================================================
          SECTION 2: 4 CONSOLIDATED CORE HUBS (Clean, Modern, Uncluttered)
          ========================================================================== */}
      <div id="section-services-hub" className="services-hub-section">
        <div className="hub-section-header">
          <div>
            <div className="dashboard-section-badge">
              <Building2 size={12} />
              <span>{dashT.sec02Badge}</span>
            </div>
            <h2 className="hub-heading">
              {lang === 'hi' ? '4 प्रमुख नागरिक कानूनी केंद्र' : '4 Core Citizen Legal Hubs'}
            </h2>
            <p className="hub-subtext" style={{ marginTop: '0.25rem' }}>
              {lang === 'hi' ? 'आपातकालीन सहायता, अनुबंध परीक्षण, नागरिक अधिकार व नजदीकी सहायता केंद्र:' : 'One-touch access to 24/7 emergencies, contract auditing, citizen safeguards, and nearby stations:'}
            </p>
          </div>
        </div>

        <div className="four-core-hubs-grid">
          {/* Hub 1: Emergency SOS */}
          <div className="core-hub-card" onClick={() => onNavigateTab && onNavigateTab('cyber')}>
            <div>
              <div className="core-hub-top">
                <div className="core-hub-icon hub-emergency">
                  <ShieldAlert size={22} />
                </div>
                <span className="core-hub-tag">{lang === 'hi' ? '24/7 आपातकाल' : '24/7 SOS'}</span>
              </div>
              <h3 className="core-hub-title">{lang === 'hi' ? '🚨 आपातकालीन सहायता (1930 / 112)' : '🚨 Emergency SOS (1930 / 112)'}</h3>
              <p className="core-hub-desc">
                {lang === 'hi' ? 'गोल्डन ऑवर बैंक खाता फ्रीज, 200+ बैंक हेल्पलाइन और पुलिस आपातकालीन डायलर।' : 'Golden Hour fund freezing protocol, 200+ bank hotlines & police emergency dispatch.'}
              </p>
            </div>
            <div className="core-hub-footer">
              <span>{lang === 'hi' ? 'आपात कक्ष खोलें' : 'Open Emergency Desk'}</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Hub 2: Document AI */}
          <div className="core-hub-card" onClick={() => onNavigateTab && onNavigateTab('docExplainer')}>
            <div>
              <div className="core-hub-top">
                <div className="core-hub-icon hub-doc">
                  <BookOpen size={22} />
                </div>
                <span className="core-hub-tag">{lang === 'hi' ? 'एग्रीमेंट स्कैनर' : 'Contract AI'}</span>
              </div>
              <h3 className="core-hub-title">{lang === 'hi' ? '📄 अनुबंध व दस्तावेज विश्लेषक' : '📄 Document AI (Contract Scanner)'}</h3>
              <p className="core-hub-desc">
                {lang === 'hi' ? 'किरायानामा व रोजगार बॉन्ड में छिपे एकतरफा नियम, गैर-कानूनी पेनल्टी व बॉन्ड जोखिम पकड़ें।' : 'Audit rental leases, employment bonds & agreements for void clauses and hidden liabilities.'}
              </p>
            </div>
            <div className="core-hub-footer">
              <span>{lang === 'hi' ? 'दस्तावेज स्कैन करें' : 'Scan Agreement'}</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Hub 3: Rights & BNS */}
          <div className="core-hub-card" onClick={() => onNavigateTab && onNavigateTab('rights')}>
            <div>
              <div className="core-hub-top">
                <div className="core-hub-icon hub-rights">
                  <Scale size={22} />
                </div>
                <span className="core-hub-tag">{lang === 'hi' ? 'संवैधानिक' : 'Citizen Rights'}</span>
              </div>
              <h3 className="core-hub-title">{lang === 'hi' ? '⚖️ नागरिक अधिकार व BNS 2023' : '⚖️ Rights & BNS 2023 Converter'}</h3>
              <p className="core-hub-desc">
                {lang === 'hi' ? 'डी.के. बासु गिरफ्तारी नियम, किरायेदार अधिकार, उपभोक्ता कानून व BNS ⇄ IPC धारा परिवर्तक।' : 'DK Basu arrest safeguards, tenant rights, consumer protection & BNS ⇄ IPC converter.'}
              </p>
            </div>
            <div className="core-hub-footer">
              <span>{lang === 'hi' ? 'अधिकार हैंडबुक देखें' : 'View Rights Guide'}</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Hub 4: Nearby Help */}
          <div className="core-hub-card" onClick={() => onNavigateTab && onNavigateTab('policeLocator')}>
            <div>
              <div className="core-hub-top">
                <div className="core-hub-icon hub-nearby">
                  <MapPin size={22} />
                </div>
                <span className="core-hub-tag">{lang === 'hi' ? 'सत्यापित' : 'Nearby Help'}</span>
              </div>
              <h3 className="core-hub-title">{lang === 'hi' ? '📍 नजदीकी थाना व मुफ्त विधिक सहायता' : '📍 Nearby Help (Police & NALSA)'}</h3>
              <p className="core-hub-desc">
                {lang === 'hi' ? 'नजदीकी पुलिस स्टेशन, साइबर सेल फोन नंबर और अनुच्छेद 39A के तहत मुफ्त सरकारी वकील।' : 'Verified police stations, cyber cells & Article 39A free government legal aid counsel.'}
              </p>
            </div>
            <div className="core-hub-footer">
              <span>{lang === 'hi' ? 'नजदीकी सहायता खोजें' : 'Locate Nearby Aid'}</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================================
          SECTION 3: BNS 2023 ⇄ IPC 1860 STATUTE CONVERTER
          ========================================================================== */}
      <div id="section-statute-converter" className="statute-converter-section">
        <div className="converter-header">
          <div className="converter-title-group">
            <Scale size={20} className="text-gold flex-shrink-0" />
            <div>
              <div className="dashboard-section-badge">
                <Scale size={12} />
                <span>{dashT.sec03Badge}</span>
              </div>
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

        {/* Live Search Bar for Statutes */}
        <div className="statute-search-wrap">
          <Search size={16} className="text-gold" />
          <input 
            type="text"
            value={statuteSearch}
            onChange={(e) => setStatuteSearch(e.target.value)}
            placeholder={dashT.searchStatutePlaceholder}
            className="statute-search-input"
          />
          {statuteSearch && (
            <button 
              type="button" 
              onClick={() => setStatuteSearch('')} 
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Selection Pills */}
        <div className="converter-pills-list">
          {BNS_CONVERTER_DATA.filter(item => {
            if (!statuteSearch.trim()) return true;
            const q = statuteSearch.toLowerCase();
            return (
              item.title.toLowerCase().includes(q) ||
              (item.titleHi && item.titleHi.includes(q)) ||
              item.ipc.toLowerCase().includes(q) ||
              item.bns.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q) ||
              (item.descriptionHi && item.descriptionHi.includes(q))
            );
          }).map((item) => (
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

      {/* ==========================================================================
          SECTION 4: 24/7 CITIZEN EMERGENCY & POLICE HELPLINES
          ========================================================================== */}
      <div id="section-emergency-helplines" className="emergency-helplines-section">
        <div className="emergency-section-header">
          <div className="emergency-header-title-group">
            <div className="dashboard-section-badge">
              <PhoneCall size={12} className="text-crimson" />
              <span>{dashT.sec04Badge}</span>
            </div>
            <h2>{dashT.emergencyTitle}</h2>
            <p>{dashT.emergencySub}</p>
          </div>
          <span className="hub-badge badge-urgent">{dashT.freeGovService}</span>
        </div>

        <div className="emergency-grid">
          {EMERGENCY_HELPLINES.map((h) => {
            const title = lang === 'hi' ? h.titleHi : h.title;
            const desc = lang === 'hi' ? h.descHi : h.desc;
            return (
              <div key={h.id} className="emergency-card">
                <div className="emergency-card-top">
                  <div>
                    <span className="emergency-dial-num" style={{ color: h.iconColor }}>{h.number}</span>
                    <h3 className="emergency-card-title">{title}</h3>
                  </div>
                  <div className="hub-icon-wrap" style={{ background: `${h.iconColor}22`, color: h.iconColor }}>
                    <Phone size={18} />
                  </div>
                </div>
                <p className="emergency-card-desc">{desc}</p>
                <a href={`tel:${h.number}`} className="emergency-call-btn">
                  <Phone size={14} />
                  <span>{dashT.callNow} {h.number}</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

