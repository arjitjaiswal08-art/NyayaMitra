import React, { useState } from 'react';
import { 
  Printer, Copy, Check, FileText, AlertTriangle, ShieldCheck, 
  HelpCircle, ChevronRight, Info, Building2, User, Calendar, MapPin, 
  Paperclip, ArrowDownToLine
} from 'lucide-react';
import { STATUTORY_MAPPINGS, PROCEDURAL_LAW } from '../data/legalKnowledge';

export default function AutoFIRGenerator({ lang = 'en' }) {
  const [copied, setCopied] = useState(false);

  // Form states
  const [offenceType, setOffenceType] = useState('cyber_fraud');
  const [policeStation, setPoliceStation] = useState('Cyber Crime Police Station');
  const [district, setDistrict] = useState('South West Delhi');
  const [state, setState] = useState('New Delhi');
  
  // Complainant Details
  const [complainantName, setComplainantName] = useState('Arjun Sharma');
  const [relationName, setRelationName] = useState('Vinay Sharma');
  const [relationType, setRelationType] = useState('S/o');
  const [age, setAge] = useState('28');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('arjun.sharma@example.com');
  const [address, setAddress] = useState('Flat 402, Sector 18, Dwarka, New Delhi - 110078');
  const [idType, setIdType] = useState('Aadhaar Card');
  const [idNumber, setIdNumber] = useState('XXXX-XXXX-4589');

  // Incident Details
  const [incidentDate, setIncidentDate] = useState('2026-09-14');
  const [incidentTime, setIncidentTime] = useState('14:30 IST');
  const [incidentLocation, setIncidentLocation] = useState('Online via UPI / Google Pay at Dwarka, New Delhi');
  const [accusedDetails, setAccusedDetails] = useState('Unknown Cyber Fraudster using mobile number +91 91234 56789 and UPI ID payment-merchant@upi');
  const [amountLost, setAmountLost] = useState('₹25,000');
  const [incidentNarrative, setIncidentNarrative] = useState(
    'I received a call from an individual claiming to be a customer support executive from my electricity board. The caller stated that my power connection would be severed unless an overdue surcharge of ₹25,000 was settled immediately via a payment link sent on WhatsApp. Believing the caller, I clicked the link and transacted ₹25,000 via UPI (Transaction UTR: 425619283741). Upon cross-checking with the electricity department, I discovered no such notice existed and that I had been cheated.'
  );

  // Suggested Statutory Sections based on offenceType
  const getSections = () => {
    switch (offenceType) {
      case 'cyber_fraud':
        return 'Section 318(4) & 316 of Bharatiya Nyaya Sanhita 2023 (formerly Section 420 & 406 IPC) read with Section 66D of Information Technology Act 2000';
      case 'theft':
        return 'Section 303(2) & 304 of Bharatiya Nyaya Sanhita 2023 (formerly Section 379 & 390 IPC)';
      case 'assault':
        return 'Section 115(2), 126(2) & 351(2) of Bharatiya Nyaya Sanhita 2023 (formerly Section 323, 341 & 506 IPC)';
      case 'harassment':
        return 'Section 74, 75 & 79 of Bharatiya Nyaya Sanhita 2023 (formerly Section 354, 354A & 509 IPC)';
      case 'extortion':
        return 'Section 308 & 351(3) of Bharatiya Nyaya Sanhita 2023 (formerly Section 384 & 506 IPC)';
      default:
        return 'Applicable provisions of Bharatiya Nyaya Sanhita 2023 & CrPC/BNSS';
    }
  };

  const generatedComplaintText = `To,
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
            <span>Formal Police Complaint & FIR Drafting Engine</span>
          </div>
          <h1 className="hero-title">Auto FIR Generator for Indian Police Stations</h1>
          <p className="hero-desc">
            Generate an official, legally structured complaint letter ready to submit to the Station House Officer (SHO) with correct Bharatiya Nyaya Sanhita (BNS) & IPC statutory citations.
          </p>
        </div>

        {/* Legal Rights Banner */}
        <div className="fir-guarantee-box">
          <div className="guarantee-header">
            <ShieldCheck size={18} className="text-emerald" />
            <strong>Your Statutory Rights Under BNSS Section 173:</strong>
          </div>
          <ul className="guarantee-list">
            <li><strong>Mandatory FIR:</strong> Police CANNOT refuse to register FIR for cognizable crimes (Supreme Court: Lalita Kumari).</li>
            <li><strong>Zero FIR Mandate:</strong> Can be registered at ANY police station in India irrespective of jurisdiction (Sec 173(1) BNSS).</li>
            <li><strong>Free Copy:</strong> You are legally entitled to an immediate free stamped copy of the FIR (Sec 173(2) BNSS).</li>
          </ul>
        </div>
      </div>

      <div className="fir-builder-grid">
        {/* Left Column: Interactive Form Inputs */}
        <div className="card fir-form-card">
          <div className="form-section-title">
            <Building2 size={16} className="text-gold" />
            <span>1. Police Station & Offence Classification</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Type of Crime / Offence</label>
              <select 
                value={offenceType} 
                onChange={(e) => setOffenceType(e.target.value)}
                className="form-select"
              >
                <option value="cyber_fraud">Cyber Crime / UPI Fraud / Online Scam</option>
                <option value="theft">Theft / Snatching / Burglary</option>
                <option value="assault">Physical Assault / Voluntarily Causing Hurt</option>
                <option value="harassment">Sexual Harassment / Stalking / Outraging Modesty</option>
                <option value="extortion">Criminal Intimidation / Extortion / Blackmail</option>
              </select>
            </div>
            <div className="form-group">
              <label>Police Station Name</label>
              <input 
                type="text" 
                value={policeStation} 
                onChange={(e) => setPoliceStation(e.target.value)}
                className="form-input" 
                placeholder="e.g. Cyber Crime Police Station / Dwarka North"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>District / Zone</label>
              <input 
                type="text" 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)}
                className="form-input" 
                placeholder="e.g. South West / Zone 1"
              />
            </div>
            <div className="form-group">
              <label>City & State</label>
              <input 
                type="text" 
                value={state} 
                onChange={(e) => setState(e.target.value)}
                className="form-input" 
                placeholder="e.g. New Delhi, Delhi"
              />
            </div>
          </div>

          <div className="form-section-title mt-4">
            <User size={16} className="text-gold" />
            <span>2. Complainant Particulars</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={complainantName} 
                onChange={(e) => setComplainantName(e.target.value)}
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label>Parent / Spouse Name</label>
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
              <label>Mobile Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="form-input" 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Complete Residential Address</label>
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              className="form-input" 
            />
          </div>

          <div className="form-section-title mt-4">
            <Calendar size={16} className="text-gold" />
            <span>3. Incident Specifics & Facts</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Incident</label>
              <input 
                type="date" 
                value={incidentDate} 
                onChange={(e) => setIncidentDate(e.target.value)}
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label>Time of Incident</label>
              <input 
                type="text" 
                value={incidentTime} 
                onChange={(e) => setIncidentTime(e.target.value)}
                className="form-input" 
                placeholder="e.g. 14:30 IST / Evening"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Accused / Suspect Details (or Unknown)</label>
            <input 
              type="text" 
              value={accusedDetails} 
              onChange={(e) => setAccusedDetails(e.target.value)}
              className="form-input" 
              placeholder="e.g. Unknown person using mobile +91 99999..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location / Platform</label>
              <input 
                type="text" 
                value={incidentLocation} 
                onChange={(e) => setIncidentLocation(e.target.value)}
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label>Financial Loss / Property Value</label>
              <input 
                type="text" 
                value={amountLost} 
                onChange={(e) => setAmountLost(e.target.value)}
                className="form-input" 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Detailed Incident Narrative (Chronological Facts)</label>
            <textarea 
              value={incidentNarrative} 
              onChange={(e) => setIncidentNarrative(e.target.value)}
              rows={5}
              className="form-textarea"
              placeholder="State exactly what occurred step-by-step..."
            />
          </div>
        </div>

        {/* Right Column: Live Formatted Complaint Letter & Actions */}
        <div className="card fir-preview-card">
          <div className="preview-toolbar">
            <div className="preview-label">
              <FileText size={16} className="text-gold" />
              <span>Official Complaint Letter (SHO Format)</span>
            </div>
            <div className="preview-actions">
              <button onClick={handleCopy} className="icon-action-btn">
                {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy Draft'}</span>
              </button>
              <button onClick={handlePrint} className="print-btn-primary">
                <Printer size={16} />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Printable Letter Box */}
          <div className="printable-fir-sheet printable-area">
            <div className="sheet-header">
              <div className="sheet-emblem">सत्यमेव जयते</div>
              <div className="sheet-title">FORMAL WRITTEN POLICE COMPLAINT</div>
              <div className="sheet-subtitle">Under Section 173 of Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 / Section 154 CrPC</div>
            </div>
            <pre className="sheet-content">{generatedComplaintText}</pre>
          </div>

          {/* Practical Checklist Box */}
          <div className="fir-action-checklist">
            <h4 className="checklist-heading">
              <Info size={16} className="text-gold" />
              <span>Step-by-Step Instructions Before Submitting:</span>
            </h4>
            <ol className="checklist-steps">
              <li><strong>Take 2 Printouts:</strong> Submit the original to the SHO / Duty Officer, and get the second copy signed and stamped with the station's seal and <strong>General Diary (GD/DD) Entry Number</strong>.</li>
              <li><strong>Zero FIR Mandate:</strong> If the duty officer claims "This area does not fall under our jurisdiction", demand registration of a <strong>Zero FIR</strong> under Section 173(1) BNSS.</li>
              <li><strong>Refusal Recourse:</strong> If the police refuse to register the FIR, dispatch this complaint via <strong>Registered Speed Post with Acknowledgement Due (AD)</strong> to the Superintendent of Police (SP) or DCP under Section 173(4) BNSS.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
