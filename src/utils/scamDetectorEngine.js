/**
 * NyayaMitra Cyber Threat & Scam Detection Engine
 * Heuristic & NLP Pattern Analyzer for Indian Cyber Fraud Vectors
 */

export const SAMPLE_SCAM_TEMPLATES = [
  {
    id: 'digital_arrest',
    title: '🚨 Digital Arrest Scam (CBI / Mumbai Police / Courier)',
    text: 'URGENT: This is Narcotics Control Bureau & Mumbai Cyber Crime Branch. A DHL FedEx courier sent under your Aadhaar card containing 5 passports and 140g MDMA narcotics was intercepted. You are placed under "Digital Arrest". Join Skype video call immediately with Officer Vikram Rathore or police will raid your house within 2 hours.'
  },
  {
    id: 'electricity_sms',
    title: '⚡ Electricity Disconnection Notice',
    text: 'Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM from the electricity office because your previous month bill was not updated. Please immediately contact our electricity officer Mr. Sharma at 9876543210. Thank you - State Electricity Board.'
  },
  {
    id: 'telegram_task',
    title: '💰 Part-Time Task / YouTube Like Scam',
    text: 'Congratulations! You are selected for part-time work from home. Earn Rs 2,500 - 8,000 daily just by liking YouTube videos and rating hotels on Google Maps. No experience needed. Daily instant payout to UPI. Click here to join Telegram VIP Group: t.me/vip_task_earn_in'
  },
  {
    id: 'sbi_apk',
    title: '📱 SBI / Bank KYC APK Trap',
    text: 'Dear Customer, your SBI YONO banking account is blocked today due to pending PAN card KYC update. Kindly click here to update your PAN and avoid permanent closure: http://sbi-yono-update-kyc.net/sbi.apk'
  },
  {
    id: 'upi_refund',
    title: '💸 UPI Reverse Payment / QR Code Scam',
    text: 'Hello sir, I am calling from OLX army canteen. I want to buy your furniture. I have sent you a QR code on WhatsApp. Please scan this QR code and enter your UPI PIN to receive Rs 15,000 into your GooglePay account right now.'
  }
];

export function analyzeScamText(input) {
  if (!input || !input.trim()) {
    return {
      riskScore: 0,
      riskLevel: 'UNKNOWN',
      color: '#64748B',
      detectedFlags: [],
      scamType: 'None',
      summary: 'Please enter a message, email, or URL to analyze.',
      anatomy: '',
      immediateAction: []
    };
  }

  const text = input.trim();
  const textLower = text.toLowerCase();
  const detectedFlags = [];
  let score = 5; // base score

  // 1. Digital Arrest & Impersonation Detection
  const hasDigitalArrest = /digital arrest|skype|cbi|ncb|narcotics|dhl|fedex|customs seizure|money laundering|arrest warrant|supreme court order|ed officer/i.test(textLower);
  if (hasDigitalArrest) {
    score += 55;
    detectedFlags.push({
      category: '🚨 Impersonation of Law Enforcement',
      severity: 'CRITICAL',
      title: 'Fake Police / "Digital Arrest" Trap',
      detail: 'Indian Law enforcement agencies (Police, CBI, ED, NCB) NEVER conduct video call investigations, interrogations, or arrest warrants over Skype or WhatsApp. "Digital Arrest" is 100% fictitious.'
    });
  }

  // 2. Electricity / Disconnection Urgency
  const hasElectricity = /electricity power|disconnected tonight|bill was not updated|electricity officer|light bill/i.test(textLower);
  if (hasElectricity) {
    score += 50;
    detectedFlags.push({
      category: '⚡ Fake Utility Disconnection',
      severity: 'HIGH',
      title: 'Power Cut Deadline Phishing',
      detail: 'State DISCOMs never send personal 10-digit mobile numbers for bill payments. Official SMS arrives with approved sender IDs (e.g. BSES, TNEB, MSEDCL).'
    });
  }

  // 3. Part-time Job / Telegram Task
  const hasTaskJob = /part-?time|youtube like|rating hotels|telegram|vip task|earn rs|daily payout|work from home|investment crypto/i.test(textLower);
  if (hasTaskJob) {
    score += 45;
    detectedFlags.push({
      category: '💰 Ponzi / Task Fraud',
      severity: 'HIGH',
      title: 'Prepaid Task / Telegram Multiplier Scam',
      detail: 'Scammers pay small amounts (Rs 150) initially to gain trust, then demand "prepaid VIP recharge deposits" of lakhs which are impossible to withdraw.'
    });
  }

  // 4. Malicious APK or Suspicious Links
  const hasApkOrSuspiciousUrl = /\.apk\b|bit\.ly|tinyurl|is\.gd|cutt\.ly|ngrok|freegift|update-kyc|yono-bank/i.test(textLower) || /\b(http:\/\/|https:\/\/)[^\s]+\.(xyz|top|site|buzz|cc|online|work|live)\b/i.test(textLower);
  if (hasApkOrSuspiciousUrl) {
    score += 50;
    detectedFlags.push({
      category: '🦠 Dangerous Link / Malware APK',
      severity: 'CRITICAL',
      title: 'Suspicious Domain or Android Package (.apk)',
      detail: 'Contains non-standard domain or direct .APK download. Installing third-party APKs grants cybercriminals SMS reading permissions to intercept your banking OTPs.'
    });
  }

  // 5. UPI PIN to Receive Money Deception
  const hasUpiReceive = /enter your upi pin to receive|scan qr code to receive|enter pin for credit|googlepay reward/i.test(textLower);
  if (hasUpiReceive) {
    score += 55;
    detectedFlags.push({
      category: '💸 UPI PIN Inversion Trap',
      severity: 'CRITICAL',
      title: 'Fraudulent Claim to "Receive Money via PIN"',
      detail: 'Golden rule of UPI: You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money. Entering your PIN ALWAYS deducts money from your account.'
    });
  }

  // 6. Artificial Urgency Keywords
  const urgencyCount = (textLower.match(/\b(urgent|immediate|immediately|tonight|blocked|suspended|permanent closure|penalty|within 2 hours|raid|arrest|action will be taken)\b/g) || []).length;
  if (urgencyCount > 0) {
    score += Math.min(urgencyCount * 10, 30);
    detectedFlags.push({
      category: '⏳ Psychological Urgency Trigger',
      severity: urgencyCount > 2 ? 'HIGH' : 'MEDIUM',
      title: `High-Pressure Phrasing (${urgencyCount} urgency triggers)`,
      detail: 'Scammers create synthetic panics to prevent you from cross-verifying with genuine family members or your official bank branch.'
    });
  }

  // 7. Request for Sensitive Credentials
  const hasCredentialRequest = /\b(otp|pin|cvv|password|aadhaar card|pan card|passports)\b/i.test(textLower);
  if (hasCredentialRequest) {
    score += 20;
    detectedFlags.push({
      category: '🔑 Credential Solicitation',
      severity: 'HIGH',
      title: 'Demands Confidential Information',
      detail: 'RBI and Indian banks repeatedly mandate that official representatives never ask for OTP, PIN, or confidential KYC files over chat.'
    });
  }

  // Cap score
  const finalScore = Math.min(99, Math.max(0, score));

  // Determine classification
  let riskLevel = 'SAFE / LOW RISK';
  let color = '#10B981';
  let scamType = 'Unlikely Scam';
  let anatomy = 'No aggressive scam patterns detected. However, always exercise standard digital caution.';

  if (finalScore >= 75) {
    riskLevel = 'CRITICAL ALERT';
    color = '#EF4444';
    scamType = hasDigitalArrest ? 'Digital Arrest Extortion' : (hasApkOrSuspiciousUrl ? 'Malware APK / Phishing' : (hasUpiReceive ? 'UPI PIN Reversal Fraud' : 'Active High-Risk Fraud'));
    anatomy = 'This message displays classic textbook indicators of coordinated cyber syndicate attacks designed to induce immediate financial transfer or compromise device access.';
  } else if (finalScore >= 45) {
    riskLevel = 'HIGH RISK';
    color = '#F97316';
    scamType = hasElectricity ? 'Utility Phishing' : (hasTaskJob ? 'Telegram Task Scam' : 'Suspicious Solicitation');
    anatomy = 'Displays strong social engineering patterns used to harvest money or sensitive data under false pretenses.';
  } else if (finalScore >= 20) {
    riskLevel = 'SUSPICIOUS';
    color = '#FFB020';
    scamType = 'Unverified Communication';
    anatomy = 'Contains unusual urgency or unsolicited requests. Verify through official customer care channels before acting.';
  }

  const immediateAction = [
    'DO NOT click any embedded links or install any downloaded .APK files.',
    'DO NOT transfer any verification fee, token amount, or enter your UPI PIN.',
    'Block the sender on WhatsApp / Phone and mark as spam on Truecaller.',
    'Report the incident immediately on the National Cyber Crime Portal (1930) or cybercrime.gov.in.',
    'Report fraudulent SMS sender codes on the Govt of India Chakshu Portal (sancharsaathi.gov.in/sfc).'
  ];

  return {
    riskScore: finalScore,
    riskLevel,
    color,
    detectedFlags,
    scamType,
    summary: `${riskLevel}: ${detectedFlags.length} suspicious threat signals identified with ${finalScore}% risk probability.`,
    anatomy,
    immediateAction
  };
}
