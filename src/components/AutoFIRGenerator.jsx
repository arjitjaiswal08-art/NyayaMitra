import React, { useState } from 'react';
import { 
  Printer, Copy, Check, FileText, AlertTriangle, ShieldCheck, 
  HelpCircle, ChevronRight, Info, Building2, User, Calendar, MapPin, 
  Paperclip, ArrowDownToLine
} from 'lucide-react';
import { STATUTORY_MAPPINGS, PROCEDURAL_LAW, TRANSLATIONS } from '../data/legalKnowledge';

export default function AutoFIRGenerator({ lang = 'en' }) {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const firT = t.fir || TRANSLATIONS.en.fir;

  // Form states
  const [offenceType, setOffenceType] = useState('cyber_fraud');
  const [policeStation, setPoliceStation] = useState(lang === 'hi' ? 'साइबर अपराध पुलिस थाना' : 'Cyber Crime Police Station');
  const [district, setDistrict] = useState(lang === 'hi' ? 'दक्षिण-पश्चिम दिल्ली' : 'South West Delhi');
  const [state, setState] = useState(lang === 'hi' ? 'नई दिल्ली' : 'New Delhi');
  
  // Complainant Details
  const [complainantName, setComplainantName] = useState(lang === 'hi' ? 'अर्जुन शर्मा' : 'Arjun Sharma');
  const [relationName, setRelationName] = useState(lang === 'hi' ? 'विनय शर्मा' : 'Vinay Sharma');
  const [relationType, setRelationType] = useState('S/o');
  const [age, setAge] = useState('28');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('arjun.sharma@example.com');
  const [address, setAddress] = useState(lang === 'hi' ? 'फ्लैट 402, सेक्टर 18, द्वारका, नई दिल्ली - 110078' : 'Flat 402, Sector 18, Dwarka, New Delhi - 110078');
  const [idType, setIdType] = useState(lang === 'hi' ? 'आधार कार्ड' : 'Aadhaar Card');
  const [idNumber, setIdNumber] = useState('XXXX-XXXX-4589');

  // Incident Details
  const [incidentDate, setIncidentDate] = useState('2026-09-14');
  const [incidentTime, setIncidentTime] = useState(lang === 'hi' ? 'दोपहर 2:30 बजे' : '14:30 IST');
  const [incidentLocation, setIncidentLocation] = useState(lang === 'hi' ? 'ऑनलाइन UPI / गूगल पे द्वारा (द्वारका, नई दिल्ली)' : 'Online via UPI / Google Pay at Dwarka, New Delhi');
  const [accusedDetails, setAccusedDetails] = useState(lang === 'hi' ? 'अज्ञात साइबर ठग (मोबाइल: +91 91234 56789, UPI ID: payment-merchant@upi)' : 'Unknown Cyber Fraudster using mobile number +91 91234 56789 and UPI ID payment-merchant@upi');
  const [amountLost, setAmountLost] = useState('₹25,000');
  const [incidentNarrative, setIncidentNarrative] = useState(
    lang === 'hi'
      ? 'मुझे बिजली बोर्ड का फर्जी अधिकारी बनकर कॉल आया। कॉलर ने कहा कि बिजली बिल बकाया है और तुरंत भुगतान न करने पर लाइन काट दी जाएगी। उन्होंने व्हाट्सएप पर एक भुगतान लिंक भेजा। मैंने विश्वास करके ₹25,000 का UPI भुगतान कर दिया (UTR: 425619283741)। बाद में बिजली विभाग से संपर्क करने पर ज्ञात हुआ कि ऐसा कोई बकाया नहीं था और मेरे साथ धोखाधड़ी हुई है।'
      : 'I received a call from an individual claiming to be a customer support executive from my electricity board. The caller stated that my power connection would be severed unless an overdue surcharge of ₹25,000 was settled immediately via a payment link sent on WhatsApp. Believing the caller, I clicked the link and transacted ₹25,000 via UPI (Transaction UTR: 425619283741). Upon cross-checking with the electricity department, I discovered no such notice existed and that I had been cheated.'
  );

  // Suggested Statutory Sections based on offenceType
  const getSections = () => {
    switch (offenceType) {
      case 'cyber_fraud':
        return lang === 'hi'
          ? 'भारतीय न्याय संहिता 2023 की धारा 318(4) व 316 (पूर्व IPC धारा 420 व 406) सहपठित सूचना प्रौद्योगिकी (IT) अधिनियम की धारा 66D'
          : 'Section 318(4) & 316 of Bharatiya Nyaya Sanhita 2023 (formerly Section 420 & 406 IPC) read with Section 66D of Information Technology Act 2000';
      case 'theft':
        return lang === 'hi'
          ? 'भारतीय न्याय संहिता 2023 की धारा 303(2) व 304 (पूर्व IPC धारा 379 व 390)'
          : 'Section 303(2) & 304 of Bharatiya Nyaya Sanhita 2023 (formerly Section 379 & 390 IPC)';
      case 'assault':
        return lang === 'hi'
          ? 'भारतीय न्याय संहिता 2023 की धारा 115(2), 126(2) व 351(2) (पूर्व IPC धारा 323, 341 व 506)'
          : 'Section 115(2), 126(2) & 351(2) of Bharatiya Nyaya Sanhita 2023 (formerly Section 323, 341 & 506 IPC)';
      case 'harassment':
        return lang === 'hi'
          ? 'भारतीय न्याय संहिता 2023 की धारा 74, 75 व 79 (पूर्व IPC धारा 354, 354A व 509)'
          : 'Section 74, 75 & 79 of Bharatiya Nyaya Sanhita 2023 (formerly Section 354, 354A & 509 IPC)';
      case 'extortion':
        return lang === 'hi'
          ? 'भारतीय न्याय संहिता 2023 की धारा 308 व 351(3) (पूर्व IPC धारा 384 व 506)'
          : 'Section 308 & 351(3) of Bharatiya Nyaya Sanhita 2023 (formerly Section 384 & 506 IPC)';
      default:
        return lang === 'hi'
          ? 'भारतीय न्याय संहिता 2023 एवं BNSS के प्रासंगिक प्रावधान'
          : 'Applicable provisions of Bharatiya Nyaya Sanhita 2023 & CrPC/BNSS';
    }
  };

  const generatedComplaintText = lang === 'hi'
    ? `सेवा में,
श्रीमान थाना प्रभारी (SHO) महोदय,
${policeStation},
जिला: ${district}, ${state}।

विषय: भारतीय नागरिक सुरक्षा संहिता (BNSS) 2023 की धारा 173 / धारा 154 CrPC के अंतर्गत संज्ञेय अपराध के तहत प्रथम सूचना रिपोर्ट (FIR) दर्ज करने बाबत प्रार्थना पत्र। (अपराध: ${getSections()})

महोदय,

सविनय निवेदन है कि प्रार्थी/शिकायतकर्ता निम्नलिखित संज्ञेय आपराधिक घटना को आपके संज्ञान में लाते हुए त्वरित प्राथमिकी (FIR) दर्ज कर कानूनी कार्रवाई का अनुरोध करता है:

1. शिकायतकर्ता का व्यक्तिगत विवरण:
   - पूरा नाम: ${complainantName}
   - पिता / पति का नाम: ${relationType} ${relationName}
   - आयु: ${age} वर्ष
   - संपर्क नंबर (मोबाइल): ${phone}
   - ईमेल: ${email}
   - वर्तमान निवास पता: ${address}
   - पहचान पत्र: ${idType} (संख्या: ${idNumber})

2. आरोपी / संदिग्ध व्यक्तियों का विवरण:
   - नाम / विवरण: ${accusedDetails}

3. आपराधिक घटना का विवरण:
   - घटना की तिथि: ${incidentDate}
   - अनुमानित समय: ${incidentTime}
   - घटना स्थल / माध्यम: ${incidentLocation}
   - वित्तीय क्षति / चोरी गई संपत्ति: ${amountLost}

4. घटना का विस्तृत व क्रमवार विवरण:
   ${incidentNarrative}

5. लागू विधिक धाराएं:
   उक्त कृत्य प्रथम दृष्टया भारतीय न्याय संहिता 2023 व विशेष अधिनियमों के अंतर्गत संज्ञेय अपराध की श्रेणी में आता है:
   ${getSections()}।

6. संलग्न साक्ष्य व दस्तावेजों की सूची (अनुलग्नक):
   - अनुलग्नक A: बैंक स्टेटमेंट / विवादित लेनदेन की प्रति (UTR नंबर सहित)।
   - अनुलग्नक B: व्हाट्सएप व डिजिटल संचार के स्क्रीनशॉट।
   - अनुलग्नक C: शिकायतकर्ता के पहचान पत्र की प्रति (${idType})।
   - अनुलग्नक D: राष्ट्रीय साइबर क्राइम पोर्टल की पावती रसीद संख्या (AKN)।

प्रार्थना:
अतः माननीय सर्वोच्च न्यायालय के ऐतिहासिक निर्णय (ललिता कुमारी बनाम उत्तर प्रदेश सरकार, 2014) एवं भारतीय नागरिक सुरक्षा संहिता 2023 की धारा 173(1) के वैधानिक प्रावधानों के तहत विनम्र प्रार्थना है कि:
(क) उक्त घटना की तत्काल प्रथम सूचना रिपोर्ट (FIR) दर्ज की जाए।
(ख) लाभार्थी बैंक खातों को फ्रीज करने व दोषियों की पहचान हेतु त्वरित अनुसंधान किया जाए।
(ग) धारा 173(2) BNSS के अनुसार शिकायतकर्ता को दर्ज FIR की एक नि:शुल्क मुहरबंद प्रति मय GD/DD नंबर तत्काल उपलब्ध कराई जाए।

भवदीय / प्रार्थी,


_________________________
(शिकायतकर्ता के हस्ताक्षर)
${complainantName}
दिनांक: ${new Date().toLocaleDateString('hi-IN')}
स्थान: ${state}

शपथपूर्वक सत्यापन:
मैं, ${complainantName}, शपथपूर्वक बयान करता/करती हूँ कि उपरोक्त पैरा 1 से 6 में दी गई समस्त जानकारी मेरे निजी ज्ञान के अनुसार सत्य एवं सही है तथा इसमें कोई भी तथ्य छिपाया नहीं गया है।

स्थान: ${state} | दिनांक: ${new Date().toLocaleDateString('hi-IN')}


_________________________
(शिकायतकर्ता के हस्ताक्षर)`
    : `To,
The Station House Officer (SHO),
${policeStation},
District: ${district}, ${state}.

SUBJECT: COMPLAINT FOR REGISTRATION OF FIRST INFORMATION REPORT (FIR) UNDER SECTION 173 OF BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS) 2023 / SECTION 154 CrPC FOR OFFENCES UNDER ${getSections().toUpperCase()}.

Respected Sir/Madam,

I, the undersigned complainant, wish to bring the following cognizable criminal incident to your immediate attention for statutory registration of an FIR and urgent investigation:

1. PARTICULARS OF THE COMPLAINANT:
   - Full Name: ${complainantName}
   - Parentage / Relation: ${relationType} ${relationName}
   - Age: ${age} Years
   - Contact Number: ${phone}
   - Email ID: ${email}
   - Residential Address: ${address}
   - Identity Proof: ${idType} (No: ${idNumber})

2. PARTICULARS OF THE ACCUSED / PERPETRATOR:
   - Name / Identification: ${accusedDetails}

3. DETAILS OF THE INCIDENT:
   - Date of Incident: ${incidentDate}
   - Approximate Time: ${incidentTime}
   - Place / Platform of Occurrence: ${incidentLocation}
   - Financial Loss / Stolen Property: ${amountLost}

4. CHRONOLOGICAL STATEMENT OF FACTS:
   ${incidentNarrative}

5. APPLICABLE STATUTORY PROVISIONS:
   The aforementioned criminal acts prima facie disclose the commission of cognizable offences punishable under:
   ${getSections()}.

6. LIST OF ENCLOSED DOCUMENTS / EVIDENCE (ANNEXURES):
   - Annexure A: Bank statement showing the fraudulent debit and UTR reference number.
   - Annexure B: Screenshots of WhatsApp communication and fake payment links.
   - Annexure C: Copy of Complainant's Identity Proof (${idType}).
   - Annexure D: Complaint Acknowledgement Number from National Cybercrime Portal (cybercrime.gov.in).

PRAYER:
In light of the landmark Supreme Court judgment in Lalita Kumari v. Govt. of U.P. (2014) and statutory mandates under Section 173(1) of Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023, it is most respectfully prayed that:
(a) A First Information Report (FIR) be registered forthwith against the accused persons under the applicable sections of law.
(b) Urgent investigation be initiated to freeze the beneficiary accounts/trace the stolen property.
(c) A free stamped copy of the registered FIR along with the GD/DD entry number be provided to the Complainant as mandated under Section 173(2) BNSS.

Yours faithfully,


_________________________
(Signature of Complainant)
${complainantName}
Date: ${new Date().toLocaleDateString('en-IN')}
Place: ${state}

VERIFICATION:
I, ${complainantName}, the Complainant above-named, do hereby solemnly declare and verify that the contents of paragraphs 1 to 6 above are true to my personal knowledge, that no part of it is false, and that nothing material has been concealed therefrom.

Verified at ${state} on this day of ${new Date().toLocaleDateString('en-IN')}.


_________________________
(Complainant's Signature)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedComplaintText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="auto-fir-container">
      {/* Module Banner */}
      <div className="module-hero">
        <div className="hero-content">
          <div className="hero-pill">
            <FileText size={14} className="text-gold" />
            <span>{firT.heroPill}</span>
          </div>
          <h1 className="hero-title">{firT.heroTitle}</h1>
          <p className="hero-desc">{firT.heroDesc}</p>
        </div>

        {/* Legal Rights Banner */}
        <div className="fir-guarantee-box">
          <div className="guarantee-header">
            <ShieldCheck size={18} className="text-emerald" />
            <strong>{firT.guaranteeHeader}</strong>
          </div>
          <ul className="guarantee-list">
            <li>{firT.guarantee1}</li>
            <li>{firT.guarantee2}</li>
            <li>{firT.guarantee3}</li>
          </ul>
        </div>
      </div>

      <div className="fir-builder-grid">
        {/* Left Column: Interactive Form Inputs */}
        <div className="card fir-form-card">
          <div className="form-section-title">
            <Building2 size={16} className="text-gold" />
            <span>{firT.sec1}</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{firT.crimeTypeLabel}</label>
              <select 
                value={offenceType} 
                onChange={(e) => setOffenceType(e.target.value)}
                className="form-select"
              >
                <option value="cyber_fraud">{lang === 'hi' ? 'साइबर अपराध / UPI धोखाधड़ी / ऑनलाइन ठगी' : 'Cyber Crime / UPI Fraud / Online Scam'}</option>
                <option value="theft">{lang === 'hi' ? 'चोरी / झपटमारी (स्नैचिंग) / सेंधमारी' : 'Theft / Snatching / Burglary'}</option>
                <option value="assault">{lang === 'hi' ? 'शारीरिक हमला / मारपीट / जानबूझकर चोट' : 'Physical Assault / Voluntarily Causing Hurt'}</option>
                <option value="harassment">{lang === 'hi' ? 'यौन उत्पीड़न / छेड़छाड़ / लज्जा भंग' : 'Sexual Harassment / Stalking / Outraging Modesty'}</option>
                <option value="extortion">{lang === 'hi' ? 'धमकी / जबरन वसूली / ब्लैकमेल' : 'Criminal Intimidation / Extortion / Blackmail'}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{firT.psLabel}</label>
              <input 
                type="text" 
                value={policeStation} 
                onChange={(e) => setPoliceStation(e.target.value)}
                className="form-input" 
                placeholder={lang === 'hi' ? 'जैसे: साइबर अपराध थाना / द्वारका नॉर्थ' : 'e.g. Cyber Crime Police Station / Dwarka North'}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{firT.districtLabel}</label>
              <input 
                type="text" 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)}
                className="form-input" 
                placeholder={lang === 'hi' ? 'जैसे: दक्षिण पश्चिम / जोन 1' : 'e.g. South West / Zone 1'}
              />
            </div>
            <div className="form-group">
              <label>{firT.cityStateLabel}</label>
              <input 
                type="text" 
                value={state} 
                onChange={(e) => setState(e.target.value)}
                className="form-input" 
                placeholder={lang === 'hi' ? 'जैसे: नई दिल्ली, दिल्ली' : 'e.g. New Delhi, Delhi'}
              />
            </div>
          </div>

          <div className="form-section-title mt-4">
            <User size={16} className="text-gold" />
            <span>{firT.sec2}</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{firT.fullNameLabel}</label>
              <input 
                type="text" 
                value={complainantName} 
                onChange={(e) => setComplainantName(e.target.value)}
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label>{firT.relationLabel}</label>
              <div className="input-with-select">
                <select 
                  value={relationType} 
                  onChange={(e) => setRelationType(e.target.value)}
                  className="relation-select"
                >
                  <option value="S/o">S/o</option>
                  <option value="D/o">D/o</option>
                  <option value="W/o">W/o</option>
                  <option value="C/o">C/o</option>
                </select>
                <input 
                  type="text" 
                  value={relationName} 
                  onChange={(e) => setRelationName(e.target.value)}
                  className="form-input" 
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{firT.phoneLabel}</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label>{firT.emailLabel}</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="form-input" 
              />
            </div>
          </div>

          <div className="form-group">
            <label>{firT.addressLabel}</label>
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              className="form-input" 
            />
          </div>

          <div className="form-section-title mt-4">
            <Calendar size={16} className="text-gold" />
            <span>{firT.sec3}</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{firT.dateLabel}</label>
              <input 
                type="date" 
                value={incidentDate} 
                onChange={(e) => setIncidentDate(e.target.value)}
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label>{firT.timeLabel}</label>
              <input 
                type="text" 
                value={incidentTime} 
                onChange={(e) => setIncidentTime(e.target.value)}
                className="form-input" 
                placeholder={lang === 'hi' ? 'जैसे: दोपहर 2:30 बजे' : 'e.g. 14:30 IST / Evening'}
              />
            </div>
          </div>

          <div className="form-group">
            <label>{firT.accusedLabel}</label>
            <input 
              type="text" 
              value={accusedDetails} 
              onChange={(e) => setAccusedDetails(e.target.value)}
              className="form-input" 
              placeholder={lang === 'hi' ? 'जैसे: अज्ञात व्यक्ति मोबाइल +91 99999...' : 'e.g. Unknown person using mobile +91 99999...'}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{firT.locLabel}</label>
              <input 
                type="text" 
                value={incidentLocation} 
                onChange={(e) => setIncidentLocation(e.target.value)}
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label>{firT.lossLabel}</label>
              <input 
                type="text" 
                value={amountLost} 
                onChange={(e) => setAmountLost(e.target.value)}
                className="form-input" 
              />
            </div>
          </div>

          <div className="form-group">
            <label>{firT.narrativeLabel}</label>
            <textarea 
              value={incidentNarrative} 
              onChange={(e) => setIncidentNarrative(e.target.value)}
              rows={5}
              className="form-textarea"
              placeholder={lang === 'hi' ? 'घटना का क्रमवार पूरा विवरण यहां लिखें...' : 'State exactly what occurred step-by-step...'}
            />
          </div>
        </div>

        {/* Right Column: Live Formatted Complaint Letter & Actions */}
        <div className="card fir-preview-card">
          <div className="preview-toolbar">
            <div className="preview-label">
              <FileText size={16} className="text-gold" />
              <span>{firT.previewTitle}</span>
            </div>
            <div className="preview-actions">
              <button onClick={handleCopy} className="icon-action-btn">
                {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                <span>{copied ? firT.copied : firT.copyDraft}</span>
              </button>
              <button onClick={handlePrint} className="print-btn-primary">
                <Printer size={16} />
                <span>{firT.printPdf}</span>
              </button>
            </div>
          </div>

          {/* Printable Letter Box */}
          <div className="printable-fir-sheet printable-area">
            <div className="sheet-header">
              <div className="sheet-emblem">{firT.letterEmblem || 'सत्यमेव जयते'}</div>
              <div className="sheet-title">{firT.letterTitle || (lang === 'hi' ? 'औपचारिक लिखित पुलिस शिकायत' : 'FORMAL WRITTEN POLICE COMPLAINT')}</div>
              <div className="sheet-subtitle">
                {firT.letterSubtitle || (lang === 'hi'
                  ? 'भारतीय नागरिक सुरक्षा संहिता (BNSS) 2023 की धारा 173 / धारा 154 CrPC के अंतर्गत'
                  : 'Under Section 173 of Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 / Section 154 CrPC')}
              </div>
            </div>
            <pre className="sheet-content">{generatedComplaintText}</pre>
          </div>

          {/* Practical Checklist Box */}
          <div className="fir-action-checklist">
            <h4 className="checklist-heading">
              <Info size={16} className="text-gold" />
              <span>{firT.checklistTitle}</span>
            </h4>
            <ol className="checklist-steps">
              <li>{firT.check1}</li>
              <li>{firT.check2}</li>
              <li>{firT.check3}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
