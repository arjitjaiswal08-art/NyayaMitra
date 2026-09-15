# NyayaMitra (न्यायमित्र) - AI Legal Assistant for Indian Law

![NyayaMitra Banner](https://img.shields.io/badge/Statutory%20Framework-BNS%202023%20%26%20IPC-amber?style=for-the-badge)
![License](https://img.shields.io/badge/Legal%20Awareness-Article%2039A%20NALSA-emerald?style=for-the-badge)
![Emergency](https://img.shields.io/badge/Cyber%20Helpline-1930%20Golden%20Hour-rose?style=for-the-badge)

NyayaMitra is an intelligent, user-friendly, and comprehensive AI Legal Assistant designed specifically for Indian citizens, legal awareness, and practical dispute redressal. It bridges traditional Indian criminal jurisprudence (**IPC 1860 & CrPC 1973**) with the newly codified statutes (**Bharatiya Nyaya Sanhita 2023 & Bharatiya Nagarik Suraksha Sanhita 2023**), alongside the **Consumer Protection Act 2019**, **IT Act 2000**, and **POSH Act 2013**.

---

## 🌟 Key Features

1. **Intelligent Intent Classifier & Autonomous Reasoning Engine**
   - Automatically classifies queries into 5 specialized domains:
     - **FIR Help** (Criminal reporting, Zero FIR, refusal remedies)
     - **Document Explanation** (Contract clause simplification, red flag detection)
     - **Rights Awareness** (Constitutional, police, tenant, workplace protections)
     - **Cyber Crime** (UPI fraud, phishing, 1930 Golden Hour freeze)
     - **General Legal Help** (Consumer disputes, e-Daakhil, civil grievances)
   - Real-time 4-step pipeline: Intent Detection ➔ Statutory Mapping ➔ Citizen Rights ➔ One Decisive Action Path.
   - **Voice Assistant**: Speech-to-text voice query input + natural speech synthesis audio playback in Indian English & Hindi.

2. **Auto FIR Generator**
   - Interactive wizard collecting details of complainant, accused, incident, and chronological facts.
   - Automatically maps relevant **BNS & IPC sections** and evidence annexures.
   - Formats a formal police complaint letter addressed to the Station House Officer (SHO) with national emblem styling and `@media print` high-fidelity export.
   - Detailed filing checklist with statutory rights: Zero FIR under Sec 173(1) BNSS and Speed Post remedy to SP under Sec 173(4) BNSS.

3. **Legal Document & Contract Explainer**
   - Pre-loaded with standard Indian contracts:
     - 11-Month Residential Lease (unfair deposit forfeiture, unannounced inspections, utility cutoffs)
     - IT Employment Offer & 2-Year Bond (Section 27 Contract Act non-compete violations, withheld salary)
     - Freelance NDA & IP Assignment (overbroad off-hours IP capture, 90-day payment delays)
     - Custom agreement paste input box
   - Visual **Risk Rating Meter (0–100)**, plain-English summary, red flags, and renegotiation checklist.

4. **Cyber Crime Emergency Room (1930 & Golden Hour)**
   - 15-Minute emergency protocol countdown for UPI/bank fraud victims.
   - One-click dialers for **1930** (CFCFRMS / `cybercrime.gov.in`) and **112**.
   - Verified emergency fraud helplines for major Indian banks (SBI, HDFC, ICICI, Axis, PNB, Kotak, PhonePe, Google Pay, Paytm).
   - Explains **RBI Zero Customer Liability rules** (100% protection if reported within 3 days).

5. **Citizen Rights Handbook**
   - Detailed statutory protections:
     - **Police & Arrest Rights**: Landmark D.K. Basu Directives, Article 22, BNSS Sec 35-58 safeguards, 24-hour magistrate rule, sunrise-to-sunset female arrest safeguards.
     - **Consumer Protections**: Consumer Protection Act 2019, 48-hr e-commerce redressal, e-Daakhil filing.
     - **Tenant Rights**: Model Tenancy Act 2021 deposit limits (max 2 months), illegal lockout bans, essential amenity protections.
     - **Workplace & POSH Rights**: Mandatory ICC, Section 12 interim relief, Section 27 invalid non-competes.

6. **Nearby Police Stations & Cyber Cells Directory**
   - Searchable directory across major Indian cities: New Delhi, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai.
   - Actionable guide on remedies if a police officer refuses to register an FIR.

7. **Lawyer Connect & Free Legal Aid (NALSA)**
   - Free Legal Aid Eligibility Checker under **Section 12 of the Legal Services Authorities Act / Article 39A** (Toll-Free **15100**).
   - **1-Page Advocate Consultation Brief Builder** ready to print or copy to reduce consultation time and legal fees.

8. **Multi-Language Support**
   - Supports 8 Indian languages: English, हिन्दी (Hindi), தமிழ் (Tamil), తెలుగు (Telugu), বাংলা (Bengali), मराठी (Marathi), ગુજરાતી (Gujarati), ಕನ್ನಡ (Kannada).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with custom design system, glassmorphism, responsive grid, and `@media print` rules
- **Voice APIs**: Web Speech API (SpeechRecognition + SpeechSynthesis)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/arjitjaiswal08-art/NyayaMitra.git

# Navigate to project directory
cd NyayaMitra

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚖️ Legal Disclaimer

NyayaMitra is an educational, statutory awareness, and procedural drafting tool. It does NOT provide formal attorney-client representation or final judicial decisions. In accordance with Bar Council of India guidelines, citizens involved in contentious or serious legal disputes are advised to consult an enrolled advocate.
