import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, CheckCircle2, Scale, Users, 
  Home, ShoppingBag, Briefcase, HelpCircle, PhoneCall, ExternalLink 
} from 'lucide-react';
import { PROCEDURAL_LAW, TRANSLATIONS } from '../data/legalKnowledge';

export default function RightsHandbook({ lang = 'en' }) {
  const [activeCategory, setActiveCategory] = useState('police');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const rT = t.rights || TRANSLATIONS.en.rights;

  const categories = [
    { id: 'police', label: rT.tabPolice || 'Police & Arrest Rights', icon: ShieldCheck },
    { id: 'consumer', label: rT.tabConsumer || 'Consumer Protections', icon: ShoppingBag },
    { id: 'tenant', label: rT.tabTenant || 'Tenant & Rental Rights', icon: Home },
    { id: 'workplace', label: rT.tabWorkplace || 'Workplace & POSH Rights', icon: Briefcase }
  ];

  const content = {
    police: {
      title: rT.policeCardTitle || "Landmark D.K. Basu Directives & Arrest Safeguards",
      statute: rT.policeStatute || "Article 22 & BNSS Sec 35-58",
      items: lang === 'hi' ? [
        {
          title: "1. गिरफ्तारी का कारण व पहचान जानने का अधिकार",
          desc: "गिरफ्तारी करने वाले प्रत्येक पुलिस अधिकारी की वर्दी पर स्पष्ट नेमप्लेट व पदनाम होना अनिवार्य है। आपको तत्काल गिरफ्तारी का ठोस वैधानिक कारण बताया जाना चाहिए।"
        },
        {
          title: "2. अरेस्ट मेमो (Arrest Memo) की अनिवार्यता",
          desc: "पुलिस को गिरफ्तारी के समय ही एक औपचारिक 'अरेस्ट मेमो' तैयार करना होगा, जिस पर कम से कम एक गवाह (परिवार का सदस्य या स्थानीय नागरिक) और आपके हस्ताक्षर होंगे।"
        },
        {
          title: "3. परिजन या मित्र को सूचित करने का अधिकार",
          desc: "गिरफ्तारी के 8 से 12 घंटे के भीतर अपने किसी परिजन या मित्र को अपनी हिरासत और स्थान के बारे में सूचित कराने का आपका संवैधानिक अधिकार है।"
        },
        {
          title: "4. 24 घंटे के भीतर मजिस्ट्रेट के समक्ष पेशी",
          desc: "संविधान के अनुच्छेद 22(2) और BNSS धारा 58 के तहत किसी भी व्यक्ति को 24 घंटे से अधिक पुलिस हिरासत में नहीं रखा जा सकता; मजिस्ट्रेट के सामने पेश करना अनिवार्य है।"
        },
        {
          title: "5. महिलाओं के लिए विशेष सुरक्षा नियम",
          desc: "मजिस्ट्रेट की पूर्व लिखित अनुमति के बिना किसी भी महिला को सूर्यास्त के बाद और सूर्योदय से पहले गिरफ्तार नहीं किया जा सकता। गिरफ्तारी केवल महिला पुलिस अधिकारी द्वारा ही होगी।"
        },
        {
          title: "6. उपस्थिति नोटिस (BNSS धारा 35 / पूर्व 41A CrPC)",
          desc: "7 वर्ष तक की सजा वाले मामलों में (जैसे सामान्य चोरी, धोखाधड़ी) सीधी गिरफ्तारी नहीं की जा सकती। पुलिस को पहले औपचारिक नोटिस जारी करना अनिवार्य है।"
        }
      ] : [
        {
          title: "1. Right to Know Grounds & Identification",
          desc: "Every police officer carrying out an arrest must bear accurate, visible identification and name tags with designations. You must be informed of the exact grounds of arrest immediately."
        },
        {
          title: "2. Arrest Memo Requirement",
          desc: "Police MUST prepare a formal 'Memo of Arrest' at the time of arrest, recording date, time, and signed by at least one witness (family member or respectable neighbor) and countersigned by you."
        },
        {
          title: "3. Right to Inform Family / Friend",
          desc: "You have the constitutional right to have one friend or relative informed of your location of custody within 8 to 12 hours of arrest."
        },
        {
          title: "4. Production Before Magistrate Within 24 Hours",
          desc: "Under Article 22(2) of the Constitution and Section 58 BNSS, no person can be detained in police custody for more than 24 hours without being produced before a Judicial Magistrate."
        },
        {
          title: "5. Strict Safeguards for Women",
          desc: "No female can be arrested before sunrise and after sunset without prior written permission from a Judicial Magistrate. Arrest and bodily search must only be conducted by a female police officer."
        },
        {
          title: "6. Notice of Appearance (Section 35 BNSS / 41A CrPC)",
          desc: "For offences punishable with up to 7 years imprisonment (e.g. simple cheating, theft), arrest is NOT routine. Police must first issue a formal Notice of Appearance unless extraordinary flight risk exists."
        }
      ],
      stripLabel: rT.authoritiesStrip || "Authorities to Contact if Rights are Violated:",
      stripValue: lang === 'hi'
        ? "राष्ट्रीय मानवाधिकार आयोग (NHRC: 14433) | जिला मजिस्ट्रेट (DM) | राज्य पुलिस शिकायत प्राधिकरण"
        : "National Human Rights Commission (NHRC: 14433) | District Magistrate | State Police Complaints Authority"
    },
    consumer: {
      title: rT.consumerCardTitle || "Consumer Protection Act 2019 & E-Commerce Safeguards",
      statute: rT.consumerStatute || "CPA 2019 & E-Commerce Rules 2020",
      items: lang === 'hi' ? [
        {
          title: "1. सुरक्षा व निवारણ पाने का अधिकार",
          desc: "खराब उत्पाद, सेवा में कमी या अनुचित व्यापार प्रथाओं से होने वाले नुकसान का मुआवजा पाने का उपभोक्ताओं को कानूनी अधिकार है।"
        },
        {
          title: "2. ई-कॉमर्स प्लेटफॉर्म्स की जवाबदेही",
          desc: "ई-कॉमर्स नियम 2020 के तहत अमेज़न, फ्लिपकार्ट जैसी कंपनियां जिम्मेदारी से बच नहीं सकतीं। उन्हें 48 घंटे में शिकायत दर्ज कर 30 दिन में निवारण करना होगा।"
        },
        {
          title: "3. ई-दाखिल पोर्टल (बिना वकील के शिकायत)",
          desc: "उपभोक्ता बिना किसी वकील के सीधे edaakhil.nic.in पोर्टल पर जिला, राज्य या राष्ट्रीय उपभोक्ता आयोग में ऑनलाइन वाद दायर कर सकते हैं।"
        },
        {
          title: "4. भ्रामक विज्ञापनों पर जुर्माना",
          desc: "केंद्रीय उपभोक्ता संरक्षण प्राधिकरण (CCPA) भ्रामक दावों या छुपी शर्तों पर कंपनियों और प्रचारकों पर ₹10 लाख तक का जुर्माना लगा सकता है।"
        }
      ] : [
        {
          title: "1. Right to Safety & Redressal",
          desc: "Consumers are protected against marketing of goods hazardous to life. You have the right to seek compensation for defective goods, deficient services, or unfair trade practices."
        },
        {
          title: "2. E-Commerce Platform Liability",
          desc: "Under the E-Commerce Rules 2020, platforms (Amazon, Flipkart, Swiggy, etc.) cannot disclaim all liability. They must provide grievance redressal within 48 hours and resolve within 30 days."
        },
        {
          title: "3. e-Daakhil Portal (File Without Lawyer)",
          desc: "You can file an official consumer complaint online at edaakhil.nic.in before District, State, or National Consumer Disputes Redressal Commissions without needing an advocate."
        },
        {
          title: "4. Protection Against Misleading Advertisements",
          desc: "Central Consumer Protection Authority (CCPA) can impose penalties up to ₹10 Lakhs on manufacturers and endorsers for deceptive claims or hidden terms."
        }
      ],
      stripLabel: rT.consumerHelplineStrip || "Consumer Helplines:",
      stripValue: lang === 'hi'
        ? "राष्ट्रीय उपभोक्ता हेल्पलाइन: 1915 | consumerhelpline.gov.in | व्हाट्सएप: 8800001915"
        : "National Consumer Helpline: 1915 | consumerhelpline.gov.in | WhatsApp: 8800001915"
    },
    tenant: {
      title: rT.tenantCardTitle || "Model Tenancy Act 2021 & Rent Control Protections",
      statute: rT.tenantStatute || "Tenancy & Contract Acts",
      items: lang === 'hi' ? [
        {
          title: "1. सिक्योरिटी डिपॉजिट 2 महीने के किराये तक सीमित",
          desc: "आदर्श किरायेदारी अधिनियम के तहत आवासीय परिसर हेतु अधिकतम सुरक्षा राशि (डिपॉजिट) 2 महीने के किराये से अधिक नहीं हो सकती, जो खाली करने पर वापस लौटानी होगी।"
        },
        {
          title: "2. गैरकानूनी बेदखली पर पूर्ण प्रतिबंध",
          desc: "मकान मालिक जबरन ताला नहीं बदल सकता और न ही सामान बाहर फेंक सकता है। बेदखली के लिए कानूनी नोटिस और रेंट ट्रिब्यूनल का आदेश अनिवार्य है।"
        },
        {
          title: "3. बिजली, पानी या लिफ्ट काटने पर रोक",
          desc: "किराया बकाया होने पर भी मकान मालिक आवश्यक सेवाएं (बिजली, पानी आदि) बंद नहीं कर सकता। ऐसा करना संज्ञेय अपराध माना गया है।"
        },
        {
          title: "4. फ्लैट में प्रवेश से पूर्व 24 घंटे का नोटिस",
          desc: "मकान मालिक बिना पूर्व सूचना के किरायेदार के परिसर में प्रवेश नहीं कर सकता। मरम्मत या निरीक्षण के लिए कम से कम 24 घंटे पूर्व लिखित नोटिस देना आवश्यक है।"
        }
      ] : [
        {
          title: "1. Security Deposit Capped at 2 Months",
          desc: "Under the Model Tenancy Act, the maximum security deposit for residential premises is capped at 2 months rent, which must be refunded upon handover of peaceful possession."
        },
        {
          title: "2. Prohibition of Unlawful Eviction",
          desc: "A landlord CANNOT forcibly throw out a tenant, change locks, or dispose of belongings. Eviction requires statutory notice and an order from the Rent Court/Authority."
        },
        {
          title: "3. Prohibition of Essential Amenity Cutoffs",
          desc: "Landlords are legally prohibited from cutting off electricity, water, or elevator access under any circumstances, even if rent is in arrears. Doing so is a cognizable criminal offense."
        },
        {
          title: "4. 24-Hour Prior Notice for Entry",
          desc: "Landlords cannot enter the rented property unannounced. Law mandates at least 24 hours prior written or electronic notice for repairs or inspection during daylight hours."
        }
      ],
      stripLabel: rT.tenantForumsStrip || "Grievance Forums:",
      stripValue: lang === 'hi'
        ? "जिला रेंट अथॉरिटी / रेंट ट्रिब्यूनल | सिविल कोर्ट (Order 37 CPC) | नजदीकी पुलिस थाना"
        : "District Rent Authority / Rent Tribunal | Civil Court (Order 37 CPC) | Local Police Station (for criminal trespass)"
    },
    workplace: {
      title: rT.workplaceCardTitle || "Workplace Protections & POSH Act 2013",
      statute: rT.workplaceStatute || "POSH Act 2013 & Code on Wages",
      items: lang === 'hi' ? [
        {
          title: "1. आंतरिक शिकायत समिति (ICC) अनिवार्य",
          desc: "10 या अधिक कर्मचारियों वाले प्रत्येक संस्थान में उत्पीड़न की जांच हेतु वरिष्ठ महिला कर्मचारी और स्वतंत्र NGO सदस्य की अध्यक्षता में ICC गठित होना अनिवार्य है।"
        },
        {
          title: "2. जांच के दौरान वैधानिक अंतरिम राहत",
          desc: "POSH एक्ट की धारा 12 के तहत शिकायतकर्ता को जांच लंबित रहने तक 3 महीने का सवेतन अवकाश या स्थानांतरण मांगने का विधिक अधिकार प्राप्त है।"
        },
        {
          title: "3. जॉब बॉन्ड व गैर-प्रतिस्पर्धा क्लॉज पूर्णतः अवैध",
          desc: "भारतीय अनुबंध अधिनियम 1872 की धारा 27 के तहत इस्तीफा देने के बाद किसी कर्मचारी को दूसरी कंपनी में जाने से रोकने वाला समझौता पूर्णतः शून्य (VOID) है।"
        },
        {
          title: "4. अर्जित वेतन की सुरक्षा",
          desc: "नियोक्ता कर्मचारी के काम किए गए दिनों का वेतन मनमाने जुर्माने के रूप में नहीं रोक सकता। उल्लंघन होने पर जिला श्रम आयुक्त के समक्ष शिकायत की जा सकती है।"
        }
      ] : [
        {
          title: "1. Mandatory Internal Complaints Committee (ICC)",
          desc: "Every organization with 10 or more employees must constitute an ICC headed by a senior woman employee and an external independent NGO member to investigate harassment."
        },
        {
          title: "2. Statutory Interim Relief During Inquiries",
          desc: "Under Section 12 of the POSH Act, the complainant has the right to request paid leave up to 3 months or transfer of either party during the inquiry to prevent intimidation."
        },
        {
          title: "3. Non-Compete & Employment Bonds are Void",
          desc: "Under Section 27 of the Indian Contract Act 1872, agreements restraining an employee from joining competitors post-resignation are 100% void ab initio."
        },
        {
          title: "4. Earned Wages Protection",
          desc: "Employers cannot arbitrarily deduct or withhold earned salaries for past work as penalty. Violations can be reported directly to the District Labour Commissioner."
        }
      ],
      stripLabel: rT.workplaceBodiesStrip || "Workplace Redressal Bodies:",
      stripValue: lang === 'hi'
        ? "कंपनी ICC | जिला अधिकारी / स्थानीय समिति (LC) | समाधान पोर्टल (श्रम मंत्रालय) | NCW हेल्पलाइन (7827170170)"
        : "Company ICC | District Officer / Local Committee (LC) | Samadhan Portal (Ministry of Labour) | NCW Helpline (7827170170)"
    }
  };

  const currentSection = content[activeCategory] || content.police;

  return (
    <div className="rights-handbook-container">
      {/* Module Hero */}
      <div className="module-hero">
        <div className="hero-content">
          <div className="hero-pill">
            <Scale size={14} className="text-gold" />
            <span>{rT.heroPill || "Know Your Fundamental & Statutory Protections"}</span>
          </div>
          <h1 className="hero-title">{rT.heroTitle || "Indian Citizen Rights & Protections Handbook"}</h1>
          <p className="hero-desc">
            {rT.heroDesc || "Empowering every Indian citizen with clear statutory protections under the Constitution of India, Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), and landmark Supreme Court rulings."}
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="rights-category-tabs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rights-tab-btn ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content Sections */}
      <div className="rights-content-area">
        <div className="rights-detail-view">
          <div className="card rights-master-card">
            <div className="card-header">
              <div className="card-title-group">
                <ShieldCheck size={20} className="text-emerald" />
                <h3 className="card-title">{currentSection.title}</h3>
              </div>
              <span className="badge-statute">{currentSection.statute}</span>
            </div>

            <div className="card-body">
              <div className="rights-subgrid">
                {currentSection.items.map((item, idx) => (
                  <div key={idx} className="rights-feature-box">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="authorities-contact-strip">
                <strong>{currentSection.stripLabel}</strong>
                <span>{currentSection.stripValue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
