// AI Legal Engine & Intent Routing Pipeline
import { STATUTORY_MAPPINGS, COMMON_SCENARIOS, PROCEDURAL_LAW } from '../data/legalKnowledge.js';
import { localizeAnalysis } from './aiEngineLocalization.js';

/**
 * Classifies user query into one of 5 canonical intents:
 * - FIR Help
 * - Document Explanation
 * - Rights Awareness
 * - Cyber Crime
 * - General Legal Help
 */
export function classifyIntent(query = "") {
  const q = query.toLowerCase();

  // Cyber Crime indicators
  if (
    q.includes("upi") ||
    q.includes("scam") ||
    q.includes("cyber") ||
    q.includes("hack") ||
    q.includes("fraud") ||
    q.includes("phishing") ||
    q.includes("phonepe") ||
    q.includes("gpay") ||
    q.includes("paytm") ||
    q.includes("otp") ||
    q.includes("bank account debited") ||
    q.includes("telegram task") ||
    q.includes("crypto") ||
    q.includes("amount lost") ||
    q.includes("stole money") ||
    q.includes("धोखा") ||
    q.includes("फ्रॉड") ||
    q.includes("पैसे") ||
    q.includes("खाता") ||
    q.includes("कट गए")
  ) {
    return {
      intent: "Cyber Crime",
      category: "Digital Financial Crime / IT Act Violations",
      confidence: 0.96,
      subType: q.includes("upi") ? "UPI / Net Banking Fraud" : "Online Fraud & Identity Theft"
    };
  }

  // FIR Help indicators
  if (
    q.includes("fir") ||
    q.includes("police station") ||
    q.includes("refusing to file") ||
    q.includes("file a complaint") ||
    q.includes("theft") ||
    q.includes("snatching") ||
    q.includes("stolen") ||
    q.includes("zero fir") ||
    q.includes("e-fir") ||
    q.includes("sho") ||
    q.includes("chowki") ||
    q.includes("robbed") ||
    q.includes("थाना") ||
    q.includes("पुलिस") ||
    q.includes("एफआईआर") ||
    q.includes("शिकायत") ||
    q.includes("मना")
  ) {
    return {
      intent: "FIR Help",
      category: "Criminal Procedure & Police Reporting",
      confidence: 0.94,
      subType: (q.includes("refus") || q.includes("मना")) ? "Police Refusal & Zero FIR" : "First Information Report"
    };
  }

  // Document Explanation indicators
  if (
    q.includes("document") ||
    q.includes("agreement") ||
    q.includes("contract") ||
    q.includes("clause") ||
    q.includes("bond") ||
    q.includes("nda") ||
    q.includes("non-compete") ||
    q.includes("lease") ||
    q.includes("stamp paper") ||
    q.includes("relieving letter") ||
    q.includes("withholding salary") ||
    q.includes("अनुबंध") ||
    q.includes("समझौता") ||
    q.includes("बॉन्ड") ||
    q.includes("वेतन")
  ) {
    return {
      intent: "Document Explanation",
      category: "Contract Analysis & Risk Detection",
      confidence: 0.93,
      subType: "Commercial & Employment Covenants"
    };
  }

  // Rights Awareness indicators
  if (
    q.includes("rights") ||
    q.includes("landlord") ||
    q.includes("deposit") ||
    q.includes("tenant") ||
    q.includes("harassment") ||
    q.includes("posh") ||
    q.includes("domestic violence") ||
    q.includes("arrest") ||
    q.includes("detained") ||
    q.includes("women") ||
    q.includes("police custody") ||
    q.includes("handcuff") ||
    q.includes("assault") ||
    q.includes("किराया") ||
    q.includes("मकान मालिक") ||
    q.includes("डिपॉजिट") ||
    q.includes("अधिकार") ||
    q.includes("हक") ||
    q.includes("उत्पीड़न")
  ) {
    return {
      intent: "Rights Awareness",
      category: "Citizen Rights & Civil Protections",
      confidence: 0.92,
      subType: (q.includes("tenant") || q.includes("deposit") || q.includes("किराया") || q.includes("डिपॉजिट")) ? "Tenancy Rights" : "Constitutional & Personal Rights"
    };
  }

  // Fallback to General Legal Help
  return {
    intent: "General Legal Help",
    category: "Indian Civil & Consumer Jurisprudence",
    confidence: 0.88,
    subType: "Consumer, Civil or Commercial Redressal"
  };
}

/**
 * Full Pipeline processor that returns a structured legal analysis
 * matching all 5 specialized agent specs in the prompt.
 */
export function analyzeLegalQuery(query = "", lang = "en") {
  const trimmed = query.trim();
  const intentData = classifyIntent(trimmed);

  // Check if it closely matches a preset scenario
  const matchedScenario = COMMON_SCENARIOS.find(
    s => trimmed.toLowerCase().includes(s.title.toLowerCase()) ||
         s.shortQuery.toLowerCase().includes(trimmed.toLowerCase()) ||
         trimmed.toLowerCase().includes("scammed me") && s.id === "upi_fraud" ||
         trimmed.toLowerCase().includes("deposit") && s.id === "rental_deposit" ||
         (trimmed.toLowerCase().includes("police") && trimmed.toLowerCase().includes("refusing")) && s.id === "police_fir_refusal" ||
         trimmed.toLowerCase().includes("bond") && s.id === "workplace_salary_bond" ||
         trimmed.toLowerCase().includes("ecommerce") || trimmed.toLowerCase().includes("laptop") && s.id === "ecommerce_fraud" ||
         trimmed.toLowerCase().includes("harassment") && s.id === "workplace_harassment"
  );

  let result;
  if (intentData.intent === "Cyber Crime") {
    result = buildCyberCrimeAnalysis(trimmed, intentData, matchedScenario);
  } else if (intentData.intent === "FIR Help") {
    result = buildFIRAnalysis(trimmed, intentData, matchedScenario);
  } else if (intentData.intent === "Document Explanation") {
    result = buildDocumentAnalysis(trimmed, intentData, matchedScenario);
  } else if (intentData.intent === "Rights Awareness") {
    result = buildRightsAnalysis(trimmed, intentData, matchedScenario);
  } else {
    result = buildGeneralLegalAnalysis(trimmed, intentData, matchedScenario);
  }

  return localizeAnalysis(result, lang);
}

function buildCyberCrimeAnalysis(query, intentData, preset) {
  // Extract amount if present
  const amountMatch = query.match(/(?:₹|rs\.?|inr)\s*([\d,]+)/i) || query.match(/([\d,]+)\s*(?:rupees|rs|inr)/i);
  const amountLost = amountMatch ? `₹${amountMatch[1]}` : "Financial Loss / Fraudulent Debit";

  return {
    intent: intentData.intent,
    category: intentData.category,
    confidence: intentData.confidence,
    summary: `Cyber Financial Fraud involving unauthorized funds transfer or deception (${amountLost}). The victim has been induced into transacting or accounts have been compromised.`,
    applicableLaws: [
      {
        statute: "Information Technology Act 2000 - Section 66D",
        meaning: "Punishment for cheating by personation by using computer resource (up to 3 years imprisonment + fine up to ₹1 Lakh)."
      },
      {
        statute: "BNS Section 318(4) [formerly IPC Section 420]",
        meaning: "Cheating and dishonestly inducing delivery of property (punishable with imprisonment up to 7 years and fine)."
      },
      {
        statute: "BNS Section 316 [formerly IPC Section 406]",
        meaning: "Criminal breach of trust by dishonestly converting or misappropriating entrusted funds."
      },
      {
        statute: "RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18",
        meaning: "Mandates Zero Customer Liability for unauthorized third-party electronic transactions if notified to bank within 3 working days."
      }
    ],
    userRights: [
      "Right to Golden Hour Freeze: Intermediary and beneficiary banks are legally mandated via the CFCFRMS (1930 system) to freeze fraudulent debit flows.",
      "Right to Zero Liability under RBI guidelines if you did not share OTP/passwords or if negligence is on the banking system side.",
      "Right to obtain an official Cyber Crime Acknowledgement Number (AKN) from cybercrime.gov.in.",
      "Right to file a formal Zero FIR at any local police station or Cyber Crime Police Station if the loss is significant."
    ],
    whatYouCanDo: [
      "DIAL 1930 IMMEDIATELY: The National Cyber Crime Reporting Portal helpline works in real-time with Indian banks. Give your transaction UTR/reference number.",
      "Call Your Bank's Fraud Desk: Request an immediate account/card freeze and ask the officer to register a 'Fraudulent Transaction Dispute / Chargeback'.",
      "File Online at cybercrime.gov.in: Submit digital evidence (screenshots, transaction receipts, fraudster's phone number/UPI ID).",
      "Draft and submit a formal police complaint to your district Cyber Cell with bank statements and UTR records."
    ],
    firApplicable: true,
    recoveryChances: "High to Moderate if reported within the first 2 to 3 hours ('Golden Hour') before the fraudster withdraws funds via ATM or crypto mule wallets.",
    legalDecision: {
      summary: `You are a victim of cyber cheating (${amountLost}). Your funds are likely moving through intermediary mule accounts.`,
      bestAction: "Call the 1930 Cyber Fraud Helpline right now with your transaction UTR number, followed by an immediate call to your bank's fraud prevention desk.",
      whyThisAction: "Because 1930 operates the automated Citizen Financial Cyber Fraud Reporting System (CFCFRMS), which directly flags and freezes the recipient's bank account across 200+ Indian banks before funds are encashed.",
      immediateNextStep: "Dial 1930 on your phone immediately and have your bank debit SMS / transaction ID ready."
    },
    whenToContactLawyer: "If your bank refuses to process chargeback under RBI Zero Liability, if amount lost exceeds ₹2 Lakhs, or if you receive wrongful notices as a freeze recipient in P2P transactions.",
    voiceSpokenText: `Immediately call 1930, the national cybercrime helpline, and have your transaction UTR number ready. Next, call your bank's fraud desk to freeze the transfer. Quick action within the golden hour gives you the highest chance of recovering your money.`
  };
}

function buildFIRAnalysis(query, intentData, preset) {
  const isRefusal = query.toLowerCase().includes("refus") || query.toLowerCase().includes("not filing");

  return {
    intent: intentData.intent,
    category: intentData.category,
    confidence: intentData.confidence,
    summary: isRefusal
      ? "Police personnel refusing or delaying registration of a First Information Report (FIR) for a cognizable offence."
      : "Initiation and registration of an FIR for a criminal offence in India.",
    applicableLaws: [
      {
        statute: "Section 173(1) BNSS 2023 [formerly Section 154 CrPC]",
        meaning: "Mandates that every information relating to the commission of a cognizable offence must be recorded by the officer-in-charge of a police station."
      },
      {
        statute: "Supreme Court Landmark Ruling: Lalita Kumari v. Govt. of U.P. (2014)",
        meaning: "Registration of FIR is MANDATORY under Section 154 CrPC / 173 BNSS if the information discloses commission of a cognizable offence. No preliminary inquiry is permissible."
      },
      {
        statute: "Section 199 BNS [formerly Section 166A(c) IPC]",
        meaning: "Punishes any public servant or police officer with rigorous imprisonment up to 2 years for refusing to record information relating to cognizable offences."
      },
      {
        statute: "Section 173(4) BNSS [formerly Section 154(3) CrPC]",
        meaning: "Right of citizen to submit written complaint by post to Superintendent of Police (SP) or DCP upon refusal by local station."
      }
    ],
    userRights: [
      "Right to a Free Copy: You are entitled to an immediate, free copy of the registered FIR as per Sec 173(2) BNSS.",
      "Right to Zero FIR: If the crime happened outside the police station's territorial boundary, they CANNOT turn you away; they must file a 'Zero FIR' and transfer it.",
      "Right to Read-Over: The written or dictated FIR must be read over to you in your native language before signing.",
      "Protection against arbitrary arrest: For offences punishable with <= 7 years, police must follow Section 35(3) BNSS notice procedures."
    ],
    whatYouCanDo: [
      "Politely inform the Station House Officer (SHO) about the Supreme Court Lalita Kumari mandate and Section 199 BNS.",
      "If the officer cites territorial jurisdiction, explicitly request a 'Zero FIR'.",
      "Send the complaint by Registered Speed Post with Acknowledgement Due (AD) to the Superintendent of Police (SP) or DCP.",
      "Use our Auto FIR Generator to print 2 copies of a formal legal complaint letter, have one stamped as an official receiving receipt (GD/DD entry).",
      "If police still fail to register, file an application before the Judicial Magistrate under Section 175(3) BNSS."
    ],
    firApplicable: true,
    recoveryChances: "N/A (Criminal investigation & prosecution)",
    legalDecision: {
      summary: isRefusal
        ? "The police station is acting contrary to statutory mandates under BNSS 173 and Supreme Court directions."
        : "Your situation involves a cognizable offence requiring statutory FIR registration.",
      bestAction: isRefusal
        ? "Dispatch a formal written complaint via Registered Speed Post to the District Superintendent of Police (SP) under Section 173(4) BNSS."
        : "Draft a formal chronological complaint letter, visit the police station, and demand a free stamped copy of the FIR with GD Number.",
      whyThisAction: "Speed Post provides undeniable legal proof of receipt by the highest district authority, triggering mandatory internal vigilance review.",
      immediateNextStep: "Generate your formatted complaint letter using the Auto FIR tool and send one copy via Speed Post to the District SP/DCP."
    },
    whenToContactLawyer: "When filing an application before the Judicial Magistrate under Section 175(3) BNSS, or if the police are actively colluding with the opposite party.",
    voiceSpokenText: `Under Indian law, police officers cannot refuse to register an FIR for a cognizable crime. If they refuse, you have the statutory right to send your complaint by Speed Post directly to the Superintendent of Police under Section 173 of BNSS.`
  };
}

function buildDocumentAnalysis(query, intentData, preset) {
  return {
    intent: intentData.intent,
    category: intentData.category,
    confidence: intentData.confidence,
    summary: "Evaluation of contractual terms, employment bonds, service covenants, or tenancy agreements for legal validity under Indian law.",
    applicableLaws: [
      {
        statute: "Section 27, Indian Contract Act 1872",
        meaning: "Every agreement by which anyone is restrained from exercising a lawful profession, trade or business of any kind, is to that extent VOID."
      },
      {
        statute: "Section 73 & 74, Indian Contract Act 1872",
        meaning: "Liquidated damages can only be claimed if actual, reasonable financial loss is established by the claimant; punitive forfeiture clauses are unenforceable."
      },
      {
        statute: "Payment of Wages Act 1936 & Code on Wages 2019",
        meaning: "Employers cannot make unauthorized deductions from earned wages or withhold salary for completed work periods."
      },
      {
        statute: "Model Tenancy Act 2021 & State Rent Control Acts",
        meaning: "Limits residential security deposits to 2 months rent and strictly prohibits eviction without statutory notice."
      }
    ],
    userRights: [
      "Right to Freedom of Profession: You cannot be bound by post-employment non-compete agreements in India (Superintendence Co. v. Krishan Murgai).",
      "Right to Earned Wages: An employer cannot hold your earned salary as hostage for unserved bond periods.",
      "Right to Experience & Relieving Record: Past service is an objective fact; withholding relieving documents violates labour protections.",
      "Right to Fair Arbitral Procedure: Unilateral appointment of arbitrators by one party is legally invalid under Section 12(5) Arbitration Act."
    ],
    whatYouCanDo: [
      "Review the agreement against our Contract Explainer red flags before signing or responding.",
      "Reply in writing to company/landlord referencing Section 27 Contract Act or Model Tenancy rules.",
      "Demand itemized proof of any alleged training or damage expenses.",
      "File a formal online complaint with the Labour Commissioner / Samadhan Portal or Rent Authority if they persist in illegal withholding."
    ],
    firApplicable: false, // Primarily civil/labour
    legalDecision: {
      summary: "The clauses being enforced against you (bonds, non-competes, or arbitrary forfeiture) are unconscionable and legally void under Indian jurisprudence.",
      bestAction: "Send a polite but firm formal email citing Section 27 of the Indian Contract Act stating that post-contract restrictions and wage withholdings are void, and demand full settlement within 7 days.",
      whyThisAction: "Companies and landlords count on citizen ignorance of Section 27; once you demonstrate legal awareness with statutory citations, legal departments advise them to settle.",
      immediateNextStep: "Send a written settlement notice citing Section 27 Contract Act and keep a copy for the Labour Commissioner."
    },
    whenToContactLawyer: "If the company sends a formal legal notice threatening recovery suits, or if withheld dues exceed ₹1,00,000.",
    voiceSpokenText: `Under Section 27 of the Indian Contract Act, employment bonds and non-compete clauses are void. The other party cannot legally withhold your earned salary or deposit without showing actual proof of damages.`
  };
}

function buildRightsAnalysis(query, intentData, preset) {
  const isTenant = query.toLowerCase().includes("tenant") || query.toLowerCase().includes("landlord") || query.toLowerCase().includes("deposit");
  const isHarassment = query.toLowerCase().includes("harass") || query.toLowerCase().includes("posh");

  return {
    intent: intentData.intent,
    category: intentData.category,
    confidence: intentData.confidence,
    summary: isTenant
      ? "Tenancy rights violation regarding security deposit refund, unauthorized deductions, or threats of eviction."
      : isHarassment
      ? "Workplace sexual harassment and violation of dignitary rights under the POSH Act 2013."
      : "Citizen civil liberties and statutory protections against highhandedness or procedural harassment.",
    applicableLaws: [
      {
        statute: isTenant ? "Model Tenancy Act 2021 & State Tenancy Acts" : isHarassment ? "POSH Act 2013 (Sec 4, 9, 12)" : "Constitution of India Art 21 & DK Basu Guidelines",
        meaning: isTenant
          ? "Caps residential security deposit at 2 months and requires refund upon possession handover."
          : isHarassment
          ? "Mandates Internal Complaints Committee (ICC) and interim protection against victimisation."
          : "Guarantees right to life, liberty, and humane procedural safeguards during police interactions."
      },
      {
        statute: isTenant ? "BNS Section 316 [IPC Sec 406]" : isHarassment ? "BNS Section 75 [IPC Sec 354A]" : "Section 35 BNSS [Sec 41A CrPC]",
        meaning: isTenant
          ? "Criminal breach of trust for dishonest misappropriation of entrusted deposit money."
          : isHarassment
          ? "Criminal penalties for sexual harassment including unwelcome physical contact or sexual remarks."
          : "Mandatory notice of appearance instead of routine arrest for offences punishable under 7 years."
      }
    ],
    userRights: [
      isTenant ? "Right to complete refund of security deposit minus documented wear-and-tear repairs." : "Right to a safe, dignified environment free from harassment.",
      isTenant ? "Landlord cannot cut off water, electricity, or lock the premises without court order." : "Right to strict confidentiality during inquiries (Section 16 POSH Act).",
      "Right to issue a formal Legal Notice demanding compliance within 15 days.",
      "Right to seek civil damages and compensation for mental agony."
    ],
    whatYouCanDo: [
      "Assemble all contemporaneous evidence (WhatsApp chats, bank statements, photographs, emails).",
      isTenant ? "Issue a 15-day Legal Notice through an advocate demanding refund of deposit with 18% p.a. interest." : "Submit a formal written complaint to the Internal Complaints Committee (ICC).",
      "Approach the statutory authority: Rent Authority / Consumer Forum or District Officer.",
      "If threats or intimidation are involved, file a non-cognizable report (NCR) or FIR at the local police station."
    ],
    firApplicable: isHarassment ? true : false,
    legalDecision: {
      summary: isTenant
        ? "Your landlord cannot unilaterally forfeit your security deposit without providing an itemized bill of repairs."
        : "You have strong statutory backing and procedural protections under Indian law.",
      bestAction: isTenant
        ? "Issue a formal 15-day Legal Notice through an advocate demanding deposit refund; in 80% of cases, landlords settle before litigation."
        : "File a confidential complaint with the Internal Complaints Committee (ICC) and request interim transfer or leave.",
      whyThisAction: "A formal statutory notice shifts the legal burden onto the opposite party and establishes clean documentation for court.",
      immediateNextStep: "Draft your formal grievance/notice and organize your chronological evidence timeline."
    },
    whenToContactLawyer: "When drafting the formal 15-day legal notice or if opposite party files counter-complaints.",
    voiceSpokenText: `You have clear statutory rights under Indian law. Do not accept arbitrary actions. Send a formal written notice citing the applicable provisions, and keep all evidence carefully documented.`
  };
}

function buildGeneralLegalAnalysis(query, intentData, preset) {
  return {
    intent: intentData.intent,
    category: intentData.category,
    confidence: intentData.confidence,
    summary: "General Indian legal query spanning civil, consumer, or statutory grievance redressal.",
    applicableLaws: [
      {
        statute: "Consumer Protection Act 2019 - Section 35",
        meaning: "Provides direct, low-cost redressal before District Consumer Disputes Redressal Commissions for deficiency in service or unfair trade practice."
      },
      {
        statute: "Bharatiya Nyaya Sanhita 2023 (BNS) / IPC",
        meaning: "Governs penal liabilities for criminal breach of trust, cheating, and public nuisance."
      },
      {
        statute: "Legal Services Authorities Act 1987 (Article 39A)",
        meaning: "Guarantees free legal aid through NALSA/DLSA to marginalized citizens, women, and low-income individuals."
      }
    ],
    userRights: [
      "Right to statutory notice before any legal action or termination.",
      "Right to consumer dispute resolution via e-Daakhil without hiring a lawyer.",
      "Right to access free legal advice from District Legal Services Authorities (DLSA).",
      "Right to judicial remedies under Article 226/32 of the Constitution for fundamental rights violations."
    ],
    whatYouCanDo: [
      "Document all dates, transactions, agreements, and communications chronologically.",
      "Check if your issue falls under National Consumer Helpline (1915) or e-Daakhil.",
      "Send a written grievance to the grievance officer of the company or counterparty.",
      "Consult a verified advocate on panel or visit the nearest DLSA office in your District Court."
    ],
    firApplicable: false,
    legalDecision: {
      summary: "Your situation qualifies for administrative or consumer dispute redressal under Indian law.",
      bestAction: "Send a formal written grievance giving a 14-day resolution timeline, and if unresolved, file on e-Daakhil or the National Consumer Helpline (1915).",
      whyThisAction: "e-Daakhil allows citizens to file cases digitally without hefty advocate fees, and commissions actively penalize deficiency of service.",
      immediateNextStep: "Gather all transaction invoices and write a formal grievance email to the registered nodal officer."
    },
    whenToContactLawyer: "If property disputes, high financial stakes (above ₹5 Lakhs), or court litigation is involved.",
    voiceSpokenText: `Under Indian consumer and civil laws, you have clear grievance remedies. File a complaint with the consumer helpline at 1915 or send a formal 14-day notice to the counterparty.`
  };
}
