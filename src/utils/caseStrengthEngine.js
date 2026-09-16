/**
 * NyayaMitra AI Case Strength & Admissibility Analyzer
 * Evaluates legal win / conviction probability based on Indian Law (BNS 2023 / BNSS 2023 / BSA 2023 / IT Act)
 */

export const CASE_CATEGORIES = [
  { id: 'cyber_fraud', label: 'Cyber Fraud & Financial Scam', defaultSections: ['BNS § 318(4) (Cheating)', 'IT Act § 66D (Cheating by Personation)'] },
  { id: 'cheating_breach', label: 'Commercial Cheating & Criminal Breach of Trust', defaultSections: ['BNS § 316 (Criminal Breach of Trust)', 'BNS § 318 (Cheating)'] },
  { id: 'theft_burglary', label: 'Theft / Extortion / Burglary', defaultSections: ['BNS § 303(2) (Theft)', 'BNS § 308 (Extortion)'] },
  { id: 'harassment_threats', label: 'Criminal Intimidation & Online Harassment', defaultSections: ['BNS § 351 (Criminal Intimidation)', 'IT Act § 67 (Obscene content transmission)'] },
  { id: 'consumer_deficiency', label: 'Consumer Rights & Service Deficiency', defaultSections: ['Consumer Protection Act 2019 § 2(47)', 'CPA 2019 § 35'] },
  { id: 'matrimonial_domestic', label: 'Domestic Violence & Matrimonial Cruelty', defaultSections: ['BNS § 85 / 86 (Cruelty by Husband/Relatives)', 'DV Act 2005 § 12'] },
  { id: 'property_trespass', label: 'Property Encroachment & Trespass', defaultSections: ['BNS § 329 (Criminal Trespass)', 'Specific Relief Act § 6'] },
  { id: 'employment_unpaid', label: 'Unpaid Wages & Wrongful Termination', defaultSections: ['Payment of Wages Act 1936', 'Industrial Disputes Act § 33C'] }
];

export const EVIDENCE_CHECKLIST_ITEMS = [
  { id: 'bank_statement', label: 'Bank Statement / UPI UTR Transaction Proof', weight: 15, types: ['cyber_fraud', 'cheating_breach', 'consumer_deficiency', 'employment_unpaid'] },
  { id: 'chat_records', label: 'WhatsApp / Telegram / SMS Chat Screenshots with Dates', weight: 12, types: ['cyber_fraud', 'cheating_breach', 'harassment_threats', 'consumer_deficiency', 'employment_unpaid'] },
  { id: 'phone_call_recordings', label: 'Audio Call Recordings / Threat Recordings', weight: 10, types: ['harassment_threats', 'cheating_breach', 'matrimonial_domestic'] },
  { id: 'sec63_bsa_cert', label: 'Section 63 BSA / 65B IEA Tamper-Proof Cryptographic Certificate', weight: 12, types: ['all'] },
  { id: 'written_agreement', label: 'Signed Contract / Agreement / Appointment Letter / Lease Deed', weight: 15, types: ['cheating_breach', 'property_trespass', 'employment_unpaid', 'consumer_deficiency'] },
  { id: 'legal_notice_served', label: 'Pre-Litigation Demand / Legal Notice Served with Speed Post Tracking', weight: 14, types: ['cheating_breach', 'consumer_deficiency', 'property_trespass', 'employment_unpaid'] },
  { id: 'accused_identity', label: 'Clear Identity Details of Opposite Party (Name, Address, PAN/Phone)', weight: 10, types: ['all'] },
  { id: 'police_gd_entry', label: 'Preliminary Police Complaint / Daily Diary (GD) / 1930 Acknowledgment', weight: 12, types: ['cyber_fraud', 'theft_burglary', 'harassment_threats'] },
  { id: 'eyewitness_proof', label: 'Independent Eyewitness Statements / CCTV Footage', weight: 10, types: ['theft_burglary', 'property_trespass', 'matrimonial_domestic', 'harassment_threats'] },
  { id: 'medical_report', label: 'Medico-Legal Certificate (MLC) / Doctor Prescription', weight: 15, types: ['matrimonial_domestic', 'harassment_threats'] }
];

/**
 * Calculate comprehensive case strength score and legal audit
 */
export function analyzeCaseStrength({ categoryId, narrative, selectedEvidences = [], timelineDelayDays = 0, noticeSent = false }) {
  const category = CASE_CATEGORIES.find(c => c.id === categoryId) || CASE_CATEGORIES[0];

  let rawScore = 35; // baseline baseline for prima facie grievance
  const strengths = [];
  const vulnerabilities = [];
  const defensePredictions = [];
  const missingEvidences = [];
  const actionPlan = [];

  const textLower = (narrative || '').toLowerCase();

  // 1. Narrative Content & Keyword Analysis
  const hasSpecificDates = /\b(january|february|march|april|may|june|july|august|september|october|november|december|\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|yesterday|today|last week|on \d{1,2})\b/i.test(textLower);
  const hasMonetaryValue = /\b(rs\.?|inr|rupees|lakh|crore|\d{3,9})\b/i.test(textLower);
  const hasNamedAccused = /\b(mr\.|mrs\.|ms\.|shri|smt\.|advocate|manager|named|called|accused|director|owner)\b/i.test(textLower) || textLower.length > 80;
  const hasDeceitElement = /\b(promise|refused|scammed|fake|fraud|cheat|blocked|threatened|abusive|stolen|unpaid)\b/i.test(textLower);

  if (hasSpecificDates) {
    rawScore += 8;
    strengths.push({ title: 'Chronological Precision', desc: 'Specific dates/timeline mentioned. Prevents dismissal for vague allegations.' });
  } else {
    vulnerabilities.push({ title: 'Ambiguous Timeline', desc: 'No clear dates specified. Courts require exact dates and time of occurrence.' });
    actionPlan.push('Establish a clear timeline with exact dates for every interaction.');
  }

  if (hasMonetaryValue) {
    rawScore += 7;
    strengths.push({ title: 'Quantifiable Damage', desc: 'Exact financial loss or property value specified. Helps determine pecuniary jurisdiction.' });
  }

  if (hasNamedAccused) {
    rawScore += 5;
    strengths.push({ title: 'Identifiable Respondent', desc: 'Sufficient particulars to ascertain the opposing party.' });
  } else {
    vulnerabilities.push({ title: 'Opposing Party Identity Unclear', desc: 'FIR against unknown persons (John Doe) requires preliminary police tracing.' });
  }

  // 2. Evidences attached
  let evidenceScoreSum = 0;
  const relevantChecklist = EVIDENCE_CHECKLIST_ITEMS.filter(item => 
    item.types.includes('all') || item.types.includes(categoryId)
  );

  relevantChecklist.forEach(item => {
    if (selectedEvidences.includes(item.id)) {
      evidenceScoreSum += item.weight;
      strengths.push({ title: item.label, desc: 'Corroborating documentary evidence secured.' });
    } else {
      missingEvidences.push(item);
    }
  });

  // Cap evidence boost
  rawScore += Math.min(evidenceScoreSum * 0.45, 38);

  // 3. Pre-litigation Legal Notice
  if (noticeSent) {
    rawScore += 10;
    strengths.push({ title: 'Statutory Notice Served', desc: 'Establishes clean hands and formal opportunity to rectify before litigation.' });
  } else if (['cheating_breach', 'consumer_deficiency', 'employment_unpaid'].includes(categoryId)) {
    vulnerabilities.push({ title: 'No Formal Demand Notice', desc: 'Opponent can claim lack of knowledge or genuine misunderstanding.' });
    actionPlan.push('Issue an advocate-signed 15-day Legal Demand Notice via Registered Speed Post AD.');
  }

  // 4. Delay / Limitation Analysis
  const delayDays = parseInt(timelineDelayDays, 10) || 0;
  if (delayDays > 90) {
    rawScore -= 12;
    vulnerabilities.push({
      title: 'Delay in Filing (>3 Months)',
      desc: `A ${delayDays}-day delay creates suspicion of an afterthought. Requires filing a formal Condonation of Delay Application.`
    });
    actionPlan.push('Draft a formal "Explanation of Delay" stating medical, fraudulent inducement, or conciliation grounds.');
  } else if (delayDays < 7 && delayDays >= 0) {
    rawScore += 6;
    strengths.push({ title: 'Prompt Action (Within 7 Days)', desc: 'Immediate reporting carries the highest evidentiary weight under BNSS.' });
  }

  // Normalize final score between 18 and 96
  const finalScore = Math.max(18, Math.min(96, Math.round(rawScore)));

  // Determine Tier & Conviction Probability
  let tier = 'MODERATE';
  let tierColor = '#FFB020';
  let probabilityLabel = '50% - 70% Win / Conviction Likelihood';

  if (finalScore >= 75) {
    tier = 'STRONG';
    tierColor = '#10B981';
    probabilityLabel = '78% - 92% High Probability of Relief / Cognizance';
  } else if (finalScore < 50) {
    tier = 'FRAGILE';
    tierColor = '#EF4444';
    probabilityLabel = 'Under 45% - High Risk of Dismissal without Fortification';
  }

  // Category Specific Defense Predictions
  if (categoryId === 'cyber_fraud') {
    defensePredictions.push(
      'Mule Account Defense: Account holder claims their account was hacked or leased unknowingly.',
      'Contributory Negligence: Bank may argue customer compromised credentials (OTP/PIN).'
    );
    actionPlan.push('Immediately petition the Cyber Nodal Officer under Sec 94 BNSS to freeze the beneficiary bank account.');
    actionPlan.push('Acquire an official Section 63 BSA electronic certificate for all chat logs and call recordings.');
  } else if (categoryId === 'cheating_breach') {
    defensePredictions.push(
      'Pure Civil Dispute: Defense will argue this is merely a contractual default, not criminal cheating.',
      'Absence of Initial Fraudulent Intent: Defense will cite Supreme Court rulings that breach of contract without initial deception is not 420/318.'
    );
    actionPlan.push('Collect initial written communications proving the accused knew their promises were false from day one.');
  } else if (categoryId === 'consumer_deficiency') {
    defensePredictions.push(
      'Terms of Service Disclaimer: Company will argue user violated terms or warranty was voided.',
      'Misuse by Consumer: Seller will claim product was damaged through mishandling.'
    );
    actionPlan.push('File a Consumer Complaint under Section 35 of the Consumer Protection Act on the National Consumer Helpline portal (consumerhelpline.gov.in).');
  } else {
    defensePredictions.push(
      'General Denial: Total denial of incident without corroboration.',
      'False Implication: Claiming malicious prosecution over personal rivalry.'
    );
    actionPlan.push('Secure independent witness affidavits and preserve digital location stamps.');
  }

  return {
    score: finalScore,
    tier,
    tierColor,
    probabilityLabel,
    category,
    strengths,
    vulnerabilities,
    defensePredictions,
    missingEvidences,
    actionPlan,
    applicableSections: category.defaultSections
  };
}
