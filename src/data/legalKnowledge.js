// Comprehensive Indian Legal Knowledge Base
// Dual Statutory Mapping: IPC (1860) <-> BNS (2023), CrPC (1973) <-> BNSS (2023)
// Special Acts: IT Act 2000, Consumer Protection Act 2019, POSH Act 2013, Model Tenancy Act

export const STATUTORY_MAPPINGS = {
  theft: {
    title: "Theft / Snatching",
    ipc: "IPC Section 378 & 379",
    bns: "BNS Section 303(2)",
    snatchingBns: "BNS Section 304 (First time specifically codified)",
    cognizable: true,
    bailable: false,
    punishment: "Imprisonment up to 3 years, or with fine, or with both (Up to 5 years under BNS for snatching)",
    description: "Dishonestly taking any movable property out of the possession of any person without consent."
  },
  cheating: {
    title: "Cheating & Cyber Fraud",
    ipc: "IPC Section 415 & 420",
    bns: "BNS Section 316 & 318(4)",
    itAct: "IT Act Section 66D (Cheating by personation using computer resource)",
    cognizable: true,
    bailable: false,
    punishment: "Imprisonment up to 7 years and fine (BNS 318(4)); Up to 3 years and ₹1 Lakh fine (IT Act 66D)",
    description: "Deceiving any person fraudulently or dishonestly inducing delivery of property or consent to retain property."
  },
  criminal_breach_of_trust: {
    title: "Criminal Breach of Trust (Withholding funds/salary/property)",
    ipc: "IPC Section 405 & 406",
    bns: "BNS Section 316(1) & 316(2)",
    cognizable: true,
    bailable: false,
    punishment: "Imprisonment up to 5 years (enhanced in BNS from 3 years in IPC), or with fine, or both",
    description: "Dishonestly misappropriating or converting property entrusted to a person, or dishonestly using or disposing of it."
  },
  assault: {
    title: "Assault & Voluntarily Causing Hurt",
    ipc: "IPC Section 319, 323, 351",
    bns: "BNS Section 115(2) & 130",
    cognizable: false, // Simple hurt is non-cognizable unless weapon/grievous
    bailable: true,
    punishment: "Imprisonment up to 1 year, or fine up to ₹1,000, or both",
    description: "Causing bodily pain, disease, or infirmity to any person intentionally or knowingly."
  },
  criminal_intimidation: {
    title: "Criminal Intimidation & Extortion",
    ipc: "IPC Section 503 & 506",
    bns: "BNS Section 351(2) & 351(3)",
    cognizable: false, // Simple intimidation is non-cognizable; death threat is cognizable in some states
    bailable: true,
    punishment: "Imprisonment up to 2 years, or fine, or both (Up to 7 years if threat is to cause death or grievous hurt)",
    description: "Threatening another person with any injury to his person, reputation or property with intent to cause alarm."
  },
  outraging_modesty: {
    title: "Sexual Harassment / Outraging Modesty of Woman",
    ipc: "IPC Section 354, 354A, 509",
    bns: "BNS Section 74, 75, 79",
    poshAct: "POSH Act 2013 (Workplace context)",
    cognizable: true,
    bailable: false,
    punishment: "Rigorous imprisonment from 1 to 5 years and fine",
    description: "Assault or criminal force to woman with intent to outrage modesty, stalking, or words/gestures insulting modesty."
  },
  domestic_violence: {
    title: "Domestic Cruelty & Harassment",
    ipc: "IPC Section 498A",
    bns: "BNS Section 85 & 86",
    specialAct: "Protection of Women from Domestic Violence Act 2005 (PWDVA)",
    cognizable: true,
    bailable: false,
    punishment: "Imprisonment up to 3 years and fine",
    description: "Subjecting a woman to cruelty by husband or relatives, including physical, mental, emotional or economic abuse."
  },
  rash_driving: {
    title: "Rash & Negligent Driving",
    ipc: "IPC Section 279 & 304A",
    bns: "BNS Section 281 & 106",
    motorVehiclesAct: "Motor Vehicles Act 1988 Sec 184 (Dangerous driving)",
    cognizable: true,
    bailable: true,
    punishment: "Up to 6 months or fine up to ₹1,000 (Sec 281 BNS); Up to 5 years (Sec 106(1) BNS for death by negligence)",
    description: "Driving vehicle on public road in a manner so rash or negligent as to endanger human life."
  }
};

export const PROCEDURAL_LAW = {
  fir: {
    oldSection: "Section 154 CrPC",
    newSection: "Section 173 BNSS 2023",
    zeroFir: {
      rule: "Zero FIR can be registered at ANY police station in India irrespective of territorial jurisdiction if a cognizable crime occurred.",
      transferRule: "The police station is legally mandated to register it as 'Zero FIR' and promptly transfer it to the jurisdictional police station.",
      statutoryBacking: "Section 173(1) BNSS 2023 / Supreme Court directives in Lalita Kumari v. Govt of UP (2014)"
    },
    efir: {
      rule: "e-FIR can be filed online for non-violent offences, lost property, and cybercrimes under Section 173(1) BNSS. Complainant must physically sign within 3 days for registration.",
      portal: "State Police Citizen Portal or CCTNS / Cybercrime Portal"
    },
    refusalRemedy: {
      step1: "Section 173(4) BNSS (formerly 154(3) CrPC): Send written complaint by registered post to Superintendent of Police (SP) or Deputy Commissioner of Police (DCP).",
      step2: "Section 175(3) BNSS (formerly 156(3) CrPC): File an application before Judicial Magistrate seeking direction to police to register FIR and investigate."
    }
  },
  arrestRights: {
    statute: "Section 35 to 47 BNSS (formerly Section 41 to 55 CrPC)",
    dkBasuGuidelines: [
      "Police officer carrying out arrest must bear clear identification and name tags with designations.",
      "Arrest memo must be prepared at the time of arrest with time, date, place, and attested by at least one family member or respectable citizen.",
      "Right to have one friend, relative or known person informed of arrest within 8-12 hours.",
      "Right to medical examination by a trained medical officer every 48 hours during custody.",
      "Person arrested cannot be detained beyond 24 hours without being produced before the nearest Judicial Magistrate (Article 22(2) Constitution & Sec 58 BNSS).",
      "Notice of Appearance under Section 35(3) BNSS (formerly 41A CrPC): For offences punishable with <= 7 years imprisonment, arrest is not automatic. Police must first issue a formal notice unless specific criteria (evidence tampering, flight risk) are recorded in writing."
    ],
    femaleArrestRights: [
      "No woman can be arrested before sunrise and after sunset, except under exceptional circumstances with prior written permission of Judicial Magistrate (Sec 43(5) BNSS / 46(4) CrPC).",
      "Arrest and search of a female must be conducted strictly by a female police officer with strict regard to decency."
    ]
  }
};

export const COMMON_SCENARIOS = [
  {
    id: "upi_fraud",
    category: "Cyber Crime",
    title: "UPI / Bank Account Scammed",
    badge: "Urgent",
    shortQuery: "Someone scammed me ₹5000 on UPI",
    description: "Fraudulent transaction, phishing link, fake customer care, or QR code scam on PhonePe/GPay/Paytm/Bank.",
    intent: "Cyber Crime",
    applicableLaws: [
      "IT Act 2000 Section 66D (Cheating by personation)",
      "BNS Section 318(4) / IPC Section 420 (Cheating)",
      "RBI Master Circular on Customer Protection (Zero Liability within 3 days)"
    ],
    immediateActions: [
      "Dial 1930 immediately (National Cyber Crime Helpline) - The Golden Hour window (first 2 hours) is vital to freeze the beneficiary wallet/account.",
      "Call your bank's fraud helpline immediately to block card/UPI and raise a Chargeback / Fraud Dispute Ticket.",
      "File a complaint on cybercrime.gov.in and save the Acknowledgement Number (AKN).",
      "Take screenshots of payment UTR, debit SMS, chat history, and beneficiary VPA/phone number."
    ],
    bestAction: "Call 1930 within the Golden Hour and notify your bank's fraud desk to freeze funds under RBI Zero Liability guidelines.",
    voiceSummary: "Immediately call 1930, the national cybercrime helpline, and contact your bank to freeze the recipient account. Do this within the golden hour for maximum fund recovery chances."
  },
  {
    id: "rental_deposit",
    category: "Rights Awareness",
    title: "Landlord Refusing to Return Security Deposit",
    badge: "Civil / Consumer",
    shortQuery: "My landlord is withholding my ₹60,000 security deposit without reason after vacating flat",
    description: "Unjust deductions for normal wear and tear, refusing to refund security deposit after peaceful handover.",
    intent: "Rights Awareness",
    applicableLaws: [
      "Model Tenancy Act 2021 (Security deposit capped at max 2 months for residential; must be refunded on vacating)",
      "Indian Contract Act 1872 Section 73 (Compensation for breach of contract)",
      "BNS Section 316 / IPC Section 405 & 406 (Criminal breach of trust if mala fide)",
      "Consumer Protection Act 2019 (If leased via managed rental company/broker)"
    ],
    immediateActions: [
      "Issue a formal written Legal Notice drafted by an advocate giving 15 days to refund deposit with interest.",
      "Document move-out photos/videos, move-in checklist, key handover receipt, and WhatsApp/email communication.",
      "If not paid, file a summary suit under Order 37 CPC in civil court or approach the Rent Authority under the state tenancy act."
    ],
    bestAction: "Send a formal Legal Notice through an advocate demanding refund within 15 days; in 80% of cases, landlords settle upon receiving a formal notice.",
    voiceSummary: "Do not panic. Your landlord cannot make arbitrary deductions. Send a formal 15-day legal notice with move-out evidence. If they fail to comply, file a claim before the Rent Authority or Civil Court."
  },
  {
    id: "police_fir_refusal",
    category: "FIR Help",
    title: "Police Refusing to Register FIR",
    badge: "Criminal Procedure",
    shortQuery: "Police station is refusing to file my FIR for theft and asking me to file missing report",
    description: "SHO refusing to register cognizable complaint, directing victim to make compromises, or downgrading theft to lost article.",
    intent: "FIR Help",
    applicableLaws: [
      "Section 173(1) BNSS 2023 / Section 154 CrPC (Mandatory registration of FIR for cognizable offence)",
      "Supreme Court Constitution Bench: Lalita Kumari v. Govt of UP (2014) - Police officer MUST register FIR if information discloses cognizable offence",
      "Section 199 BNS / Section 166A(c) IPC (Punishment up to 2 years imprisonment for public servant refusing to record information)"
    ],
    immediateActions: [
      "Remind the officer politely of Lalita Kumari judgment and Section 199 BNS (which penalizes refusal to register FIR).",
      "Demand a 'Zero FIR' if they cite jurisdiction issues; Zero FIR can be filed at ANY station under Sec 173(1) BNSS.",
      "Send the complaint via Registered Post / Speed Post with Acknowledgement Due to the Superintendent of Police (SP) or DCP under Section 173(4) BNSS.",
      "If SP fails to act, file an application under Section 175(3) BNSS (formerly 156(3) CrPC) before the Judicial Magistrate."
    ],
    bestAction: "Dispatch a signed written complaint by Speed Post to the District SP/DCP under Section 173(4) BNSS and cite Section 199 BNS for mandatory action.",
    voiceSummary: "Refusing to file an FIR for a cognizable crime is illegal and punishable under BNS Section 199. Send your written complaint directly to the Superintendent of Police via Speed Post."
  },
  {
    id: "workplace_salary_bond",
    category: "Document Explanation",
    title: "Employer Withholding Salary / Employment Bond Threat",
    badge: "Labour / Contracts",
    shortQuery: "My company is withholding 2 months salary and threatening legal action over a 2-year employment bond",
    description: "Threats of legal notices, demanding bond forfeiture, refusal to issue relieving letter and experience certificate.",
    intent: "Document Explanation",
    applicableLaws: [
      "Indian Contract Act 1872 Section 27 (Agreement in restraint of trade, profession or business is VOID ab initio)",
      "Payment of Wages Act 1936 & Code on Wages 2019 (Wages cannot be withheld unlawfully)",
      "Supreme Court: Superintendence Company of India v. Krishan Murgai - Non-compete and bond clauses post-employment are unenforceable in India."
    ],
    immediateActions: [
      "Employment bonds are unenforceable unless the employer proves actual, documented expenses incurred on specialized training outside normal duties.",
      "Withholding earned wages for work already completed is illegal under the Payment of Wages Act.",
      "Send a demand email to HR/Management citing Section 27 of Indian Contract Act and demanding full and final settlement within 7 days.",
      "File a complaint with the District Labour Commissioner or file an online grievance on the Samadhan Portal (Ministry of Labour)."
    ],
    bestAction: "Reply in writing citing Section 27 of the Indian Contract Act stating that restraint of trade is void, and notify them of a pending grievance before the Labour Commissioner for withheld wages.",
    voiceSummary: "Under Indian law, Section 27 of the Contract Act clearly states that post-employment bonds and non-compete clauses are void. The company cannot withhold your earned salary."
  },
  {
    id: "ecommerce_fraud",
    category: "General Legal Help",
    title: "E-Commerce Refusing Refund for Defective / Empty Box",
    badge: "Consumer Law",
    shortQuery: "I ordered a laptop worth ₹45,000 online and received a soap bar. E-commerce app rejected refund.",
    description: "Delivery of wrong/fake/defective item, customer support rejecting claim, refusal of refund.",
    intent: "General Legal Help",
    applicableLaws: [
      "Consumer Protection Act 2019 Section 2(7) & Section 35 (Deficiency in service & unfair trade practice)",
      "Consumer Protection (E-Commerce) Rules 2020 (Platform liability for grievance redressal within 48 hours and resolution within 1 month)",
      "BNS Section 318(4) / IPC Section 420 (Cheating if deliberate fraud)"
    ],
    immediateActions: [
      "Preserve unboxing video, outer courier shipping label, invoice, and all chat transcripts.",
      "File a free complaint on the National Consumer Helpline (NCH) by dialing 1915 or visiting consumerhelpline.gov.in.",
      "File a statutory consumer case on the government portal 'e-Daakhil' (edaakhil.nic.in) before the District Consumer Disputes Redressal Commission without requiring a lawyer.",
      "Demand refund + interest + compensation for mental harassment and litigation costs."
    ],
    bestAction: "Lodge a complaint on the National Consumer Helpline (1915) followed by an e-Daakhil filing before the District Consumer Commission; e-commerce platforms routinely settle before the first hearing.",
    voiceSummary: "Call the National Consumer Helpline at 1915 and file on the e-Daakhil portal. Under Consumer Protection Rules 2020, platforms are strictly accountable for seller and courier deficiencies."
  },
  {
    id: "workplace_harassment",
    category: "Rights Awareness",
    title: "Workplace Sexual Harassment / POSH Complaint",
    badge: "Women Rights / POSH",
    shortQuery: "A senior manager is making unwanted physical contact and sexually suggestive comments at office",
    description: "Hostile work environment, unwelcome physical or verbal sexual conduct, fear of career retaliation.",
    intent: "Rights Awareness",
    applicableLaws: [
      "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act 2013 (POSH Act)",
      "BNS Section 74 & 75 (Assault or criminal force to woman with intent to outrage modesty & Sexual harassment) / IPC Section 354 & 354A",
      "Constitution of India Article 14, 19(1)(g), and 21 (Vishaka Guidelines)"
    ],
    immediateActions: [
      "Submit a written complaint to the organization's Internal Complaints Committee (ICC) within 3 months from the date of the incident (presiding officer must be a senior woman employee).",
      "During inquiry, you have the statutory right under Section 12 POSH Act to request interim relief: transfer yourself or the respondent, or get 3 months paid leave.",
      "Strict confidentiality is mandated under Section 16 POSH Act - identity of complainant cannot be published.",
      "You also hold the legal right to simultaneously file a criminal police complaint (FIR) under BNS Section 75."
    ],
    bestAction: "Submit a formal written complaint to your company's Internal Complaints Committee (ICC) with date, time, and witness details, and exercise your right to interim transfer protection.",
    voiceSummary: "Under the POSH Act 2013, you can file a confidential complaint before your Internal Complaints Committee within 3 months, and you can demand interim leave or transfer while inquiry is conducted."
  }
];

export const CONTRACT_PRESETS = {
  rental_agreement: {
    name: "Standard 11-Month Residential Lease Agreement",
    category: "Tenancy / Real Estate",
    riskLevel: "High",
    riskScore: 78,
    sampleText: `1. The Tenant agrees to pay a security deposit of ₹1,50,000 (equivalent to 6 months rent) which shall be non-refundable under any circumstances if tenant vacates within 11 months.
2. The Landlord reserves the absolute right to inspect the premises at any time without any prior written notice.
3. The Landlord may terminate this agreement at 24 hours notice and disconnect electricity and water amenities if rent is delayed by more than 3 days.
4. The Tenant shall bear all structural repairs, major plumbing defects, and painting costs upon departure regardless of prior condition.
5. In case of any dispute, the matter shall be referred solely to the Landlord's designated family member as sole arbitrator whose decision shall be final.`,
    redFlags: [
      {
        clause: "Clause 1: 6-month security deposit non-refundable if vacated before 11 months",
        severity: "Severe",
        explanation: "Under the Model Tenancy Act 2021, residential security deposit is capped at a maximum of 2 months rent. Forfeiting the entire deposit without documented actual damages is considered an unlawful penalty clause under Section 74 of the Indian Contract Act."
      },
      {
        clause: "Clause 2: Unannounced inspection by landlord at any time",
        severity: "Moderate",
        explanation: "Violates the tenant's right to quiet enjoyment and privacy. Law mandates at least 24 hours prior written or electronic notice before landlord inspection."
      },
      {
        clause: "Clause 3: Disconnecting electricity/water amenities and 24-hr termination",
        severity: "Critical",
        explanation: "Illegal and criminal under State Rent Control Acts. Landlords are strictly barred from cutting off essential amenities (water, electricity). Termination requires minimum 30 days statutory notice."
      },
      {
        clause: "Clause 5: Unilateral arbitrator appointment (family member)",
        severity: "Severe",
        explanation: "Unenforceable under Section 12(5) and Seventh Schedule of the Arbitration and Conciliation Act 1996 (Perkins Eastman Architects judgment) - an interested party cannot unilaterally appoint an arbitrator."
      }
    ],
    plainSummary: "This lease is heavily biased in favor of the landlord. It imposes an illegal deposit forfeiture, violates statutory notice periods, and unlawfully claims the right to disconnect essential utilities.",
    renegotiationChecklist: [
      "Cap security deposit to 2 months rent max.",
      "Require 24 hours prior written notice before any landlord visits.",
      "Replace 24-hr termination with a standard 30-day mutual notice period.",
      "Remove amenity cutoff clause (this is a criminal offense under rent control).",
      "Landlord must bear all structural repairs; tenant only liable for tenant-caused minor damages."
    ]
  },
  employment_agreement: {
    name: "IT Employment Offer & Service Bond Agreement",
    category: "Employment / Labour",
    riskLevel: "High",
    riskScore: 85,
    sampleText: `1. The Employee agrees to serve the Company for an uninterrupted period of 24 months. If the Employee resigns prior to 24 months, Employee shall pay ₹3,00,000 as liquidated damages and training costs.
2. The Company reserves the right to withhold relieving letter, experience certificate, and final salary until full bond damages are paid.
3. Upon cessation of employment, Employee is strictly prohibited from joining any competitor company or any firm in the same industry across India for a period of 12 months.
4. Notice period during probation is 90 days for Employee, whereas Company may terminate immediately without notice or severance pay.`,
    redFlags: [
      {
        clause: "Clause 1: 2-year mandatory bond & ₹3,00,000 penalty",
        severity: "Severe",
        explanation: "Section 27 of the Indian Contract Act 1872 renders agreements restraining lawful vocation void. Supreme Court precedent (Niranjan Shankar Golikari v. Century Spg.) established that bonds are only enforceable if actual, reasonable training costs outside routine work are proved."
      },
      {
        clause: "Clause 2: Withholding relieving letter and earned salary",
        severity: "Critical",
        explanation: "Unlawful under Payment of Wages Act and Delhi High Court directives. Experience certificate is an evidentiary record of past work and cannot be withheld as ransom."
      },
      {
        clause: "Clause 3: 12-month post-employment non-compete covenant",
        severity: "Critical",
        explanation: "100% Void ab initio under Section 27 Indian Contract Act (Superintendence Co. v. Krishan Murgai). Post-termination non-compete clauses cannot be enforced in Indian courts."
      },
      {
        clause: "Clause 4: Unilateral notice period (90 days for employee vs 0 days for employer)",
        severity: "Moderate",
        explanation: "Unconscionable contract term under Central Inland Water Transport Corp v. Brojo Nath Ganguly; courts routinely read down one-sided termination clauses."
      }
    ],
    plainSummary: "Contains multiple clauses that are void ab initio under Indian law, including an unenforceable post-employment non-compete ban and an illegal threat to withhold statutory certificates and earned wages.",
    renegotiationChecklist: [
      "Demand deletion of post-employment non-compete clause (cite Section 27 Indian Contract Act).",
      "Require mutual 30-day notice period for both parties during probation.",
      "Condition any bond damages strictly on documented external specialized certification expenses.",
      "Explicitly stipulate that relieving and experience letters will be issued within 15 days of last working day."
    ]
  },
  freelance_nda: {
    name: "Consulting & Non-Disclosure Agreement (NDA)",
    category: "Commercial / IP",
    riskLevel: "Moderate",
    riskScore: 62,
    sampleText: `1. The Consultant assigns all worldwide Intellectual Property rights created, whether during work hours or personal time, perpetually to Client without additional royalties.
2. Payment terms: Invoices shall be processed within 90 days of client client approval at client's sole discretion.
3. The Consultant agrees to indemnify the Client against any and all claims, third-party lawsuits, damages, and legal fees without any monetary cap.
4. Non-solicitation of clients for a period of 3 years following contract termination.`,
    redFlags: [
      {
        clause: "Clause 1: Perpetual assignment of IP created during personal time",
        severity: "High",
        explanation: "Overbroad IP assignment claiming work created on personal time or unrelated to client scope. Under Indian Copyright Act, assignment must be restricted to contracted deliverables."
      },
      {
        clause: "Clause 2: 90-day payment cycle at client's 'sole discretion'",
        severity: "High",
        explanation: "If you are registered as an MSME (Udyam), Section 15 of the MSMED Act 2006 mandates payment within maximum 45 days, with compound interest penalty at 3x RBI bank rate."
      },
      {
        clause: "Clause 3: Unlimited indemnity liability",
        severity: "Severe",
        explanation: "Consultant exposes their entire personal savings. Standard commercial practice requires indemnity to be capped at total fees received under the agreement."
      }
    ],
    plainSummary: "Overreaching IP transfer capturing off-hours work, dangerously open-ended indemnity, and an abusive 90-day payment cycle that conflicts with MSMED Act 45-day statutory limits.",
    renegotiationChecklist: [
      "Limit IP assignment strictly to deliverables produced specifically under the paid Statement of Work (SOW).",
      "Reduce invoice payment terms to net 15 or 30 days (cite MSME 45-day statutory cap).",
      "Cap indemnity liability to the total contract value received by consultant."
    ]
  }
};

export const POLICE_STATIONS_DIRECTORY = [
  {
    city: "New Delhi",
    state: "Delhi",
    stations: [
      { name: "Parliament Street Police Station", address: "Parliament Street, Connaught Place, New Delhi - 110001", phone: "011-23746600", emergency: "112" },
      { name: "Cyber Crime Cell - Delhi Police HQ", address: "Special Cell, Mandir Marg, New Delhi - 110001", phone: "011-23746694", emergency: "1930" },
      { name: "Hauz Khas Police Station", address: "Near Aurobindo Market, Hauz Khas, New Delhi - 110016", phone: "011-26510065", emergency: "112" },
      { name: "Dwarka Sector 23 Cyber Cell", address: "Sector 23, Dwarka, South West Delhi - 110077", phone: "011-28051584", emergency: "1930" }
    ]
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    stations: [
      { name: "Colaba Police Station", address: "Madam Cama Road, Colaba, Mumbai - 400001", phone: "022-22852885", emergency: "112" },
      { name: "BKC Cyber Crime Police Station", address: "Bandra Kurla Complex, Bandra East, Mumbai - 400051", phone: "022-26504008", emergency: "1930" },
      { name: "Andheri Police Station", address: "Old Nagardas Road, Andheri East, Mumbai - 400069", phone: "022-26831548", emergency: "112" },
      { name: "Navi Mumbai Cyber Cell", address: "Sector 15, CBD Belapur, Navi Mumbai - 400614", phone: "022-27574477", emergency: "1930" }
    ]
  },
  {
    city: "Bengaluru",
    state: "Karnataka",
    stations: [
      { name: "Cubbon Park Police Station", address: "Kasturba Road, Bengaluru - 560001", phone: "080-22942583", emergency: "112" },
      { name: "CEN Cyber Crime Police Station (Central)", address: "Infantry Road, Bengaluru - 560001", phone: "080-22943222", emergency: "1930" },
      { name: "Koramangala Police Station", address: "80 Feet Road, 6th Block, Koramangala, Bengaluru - 560095", phone: "080-22942562", emergency: "112" },
      { name: "Whitefield Cyber Cell", address: "Outer Ring Road, Mahadevapura, Bengaluru - 560048", phone: "080-22943486", emergency: "1930" }
    ]
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    stations: [
      { name: "Banjara Hills Police Station", address: "Road No. 12, Banjara Hills, Hyderabad - 500034", phone: "040-27853580", emergency: "112" },
      { name: "Cyberabad Cyber Crime Police Station", address: "Gachibowli, Hyderabad - 500032", phone: "040-27853418", emergency: "1930" },
      { name: "Madhapur Police Station", address: "Hitech City Main Rd, Madhapur, Hyderabad - 500081", phone: "040-27853412", emergency: "112" }
    ]
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    stations: [
      { name: "Lalbazar Police Headquarters", address: "18, Lalbazar Street, Kolkata - 700001", phone: "033-22143024", emergency: "112" },
      { name: "Kolkata Police Cyber Cell", address: "Lalbazar, Central Kolkata - 700001", phone: "033-22143000", emergency: "1930" },
      { name: "Park Street Police Station", address: "Park Street, Kolkata - 700016", phone: "033-22295050", emergency: "112" }
    ]
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    stations: [
      { name: "Mylapore Police Station", address: "Kutchery Road, Mylapore, Chennai - 600004", phone: "044-23452570", emergency: "112" },
      { name: "Greater Chennai Cyber Crime Cell", address: "Commissioner Office Building, Vepery, Chennai - 600007", phone: "044-23452324", emergency: "1930" },
      { name: "T. Nagar Police Station", address: "Venkatanarayana Road, T. Nagar, Chennai - 600017", phone: "044-23452608", emergency: "112" }
    ]
  }
];

export const LEGAL_AID_DIRECTORY = {
  nalsa: {
    name: "National Legal Services Authority (NALSA)",
    statute: "Legal Services Authorities Act 1987 & Article 39A Constitution of India",
    tollFree: "15100",
    website: "https://nalsa.gov.in",
    eligibility: [
      "Women and Children (automatic entitlement regardless of income)",
      "Members of Scheduled Castes (SC) and Scheduled Tribes (ST)",
      "Industrial workmen / Labourers",
      "Persons in custody or under detention",
      "Persons with annual income less than ₹3,00,000 (varies by state; e.g. Delhi ₹3 Lakhs, Maharashtra ₹3 Lakhs)",
      "Victims of trafficking, disaster, or ethnic violence"
    ],
    servicesProvided: [
      "Free assignment of an advocate from the official panel",
      "Drafting of legal petitions, appeals, and bail applications",
      "Payment of court fees, process fees, and typing expenses",
      "Representation in District Courts, High Courts, and Supreme Court"
    ]
  },
  emergencyNumbers: [
    { label: "All-in-One Emergency", number: "112", desc: "Police, Fire & Ambulance" },
    { label: "Cyber Crime Helpline", number: "1930", desc: "Financial Cyber Fraud & Freeze" },
    { label: "Women Helpline", number: "1091", desc: "24x7 Women in Distress" },
    { label: "National Legal Aid", number: "15100", desc: "NALSA Free Advocate Assistance" },
    { label: "National Consumer Helpline", number: "1915", desc: "Consumer Complaints & e-Commerce" },
    { label: "Child Helpline", number: "1098", desc: "Child Protection & Abuse" },
    { label: "Senior Citizen Helpline", number: "14567", desc: "Elder Care & Abuse Redressal" }
  ]
};


export { TRANSLATIONS } from './translations';
