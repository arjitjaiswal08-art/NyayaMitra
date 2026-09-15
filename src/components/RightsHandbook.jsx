import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, CheckCircle2, Scale, Users, 
  Home, ShoppingBag, Briefcase, HelpCircle, PhoneCall, ExternalLink 
} from 'lucide-react';
import { PROCEDURAL_LAW } from '../data/legalKnowledge';

export default function RightsHandbook({ lang = 'en' }) {
  const [activeCategory, setActiveCategory] = useState('police');

  const categories = [
    { id: 'police', label: 'Police & Arrest Rights', icon: ShieldCheck },
    { id: 'consumer', label: 'Consumer Protections', icon: ShoppingBag },
    { id: 'tenant', label: 'Tenant & Rental Rights', icon: Home },
    { id: 'workplace', label: 'Workplace & POSH Rights', icon: Briefcase }
  ];

  return (
    <div className="rights-handbook-container">
      {/* Module Hero */}
      <div className="module-hero">
        <div className="hero-content">
          <div className="hero-pill">
            <Scale size={14} className="text-gold" />
            <span>Know Your Fundamental & Statutory Protections</span>
          </div>
          <h1 className="hero-title">Indian Citizen Rights & Protections Handbook</h1>
          <p className="hero-desc">
            Empowering every Indian citizen with clear statutory protections under the Constitution of India, Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), and landmark Supreme Court rulings.
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
        {/* Category 1: Police & Arrest Rights */}
        {activeCategory === 'police' && (
          <div className="rights-detail-view">
            <div className="card rights-master-card">
              <div className="card-header">
                <div className="card-title-group">
                  <ShieldCheck size={20} className="text-emerald" />
                  <h3 className="card-title">Landmark D.K. Basu Directives & Arrest Safeguards</h3>
                </div>
                <span className="badge-statute">Article 22 & BNSS Sec 35-58</span>
              </div>

              <div className="card-body">
                <div className="rights-subgrid">
                  <div className="rights-feature-box">
                    <h4>1. Right to Know Grounds & Identification</h4>
                    <p>Every police officer carrying out an arrest must bear accurate, visible identification and name tags with designations. You must be informed of the exact grounds of arrest immediately.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>2. Arrest Memo Requirement</h4>
                    <p>Police MUST prepare a formal 'Memo of Arrest' at the time of arrest, recording date, time, and signed by at least one witness (family member or respectable neighbor) and countersigned by you.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>3. Right to Inform Family / Friend</h4>
                    <p>You have the constitutional right to have one friend or relative informed of your location of custody within 8 to 12 hours of arrest.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>4. Production Before Magistrate Within 24 Hours</h4>
                    <p>Under Article 22(2) of the Constitution and Section 58 BNSS, no person can be detained in police custody for more than 24 hours without being produced before a Judicial Magistrate.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>5. Strict Safeguards for Women</h4>
                    <p>No female can be arrested before sunrise and after sunset without prior written permission from a Judicial Magistrate. Arrest and bodily search must only be conducted by a female police officer.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>6. Notice of Appearance (Section 35 BNSS / 41A CrPC)</h4>
                    <p>For offences punishable with up to 7 years imprisonment (e.g. simple cheating, theft), arrest is NOT routine. Police must first issue a formal Notice of Appearance unless extraordinary flight risk exists.</p>
                  </div>
                </div>

                <div className="authorities-contact-strip">
                  <strong>Authorities to Contact if Rights are Violated:</strong>
                  <span>National Human Rights Commission (NHRC: 14433) | District Magistrate | State Police Complaints Authority</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category 2: Consumer Protections */}
        {activeCategory === 'consumer' && (
          <div className="rights-detail-view">
            <div className="card rights-master-card">
              <div className="card-header">
                <div className="card-title-group">
                  <ShoppingBag size={20} className="text-emerald" />
                  <h3 className="card-title">Consumer Protection Act 2019 & E-Commerce Safeguards</h3>
                </div>
                <span className="badge-statute">CPA 2019 & E-Commerce Rules 2020</span>
              </div>

              <div className="card-body">
                <div className="rights-subgrid">
                  <div className="rights-feature-box">
                    <h4>1. Right to Safety & Redressal</h4>
                    <p>Consumers are protected against marketing of goods hazardous to life. You have the right to seek compensation for defective goods, deficient services, or unfair trade practices.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>2. E-Commerce Platform Liability</h4>
                    <p>Under the E-Commerce Rules 2020, platforms (Amazon, Flipkart, Swiggy, etc.) cannot disclaim all liability. They must provide grievance redressal within 48 hours and resolve within 30 days.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>3. e-Daakhil Portal (File Without Lawyer)</h4>
                    <p>You can file an official consumer complaint online at <strong>edaakhil.nic.in</strong> before District, State, or National Consumer Disputes Redressal Commissions without needing an advocate.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>4. Protection Against Misleading Advertisements</h4>
                    <p>Central Consumer Protection Authority (CCPA) can impose penalties up to ₹10 Lakhs on manufacturers and endorsers for deceptive claims or hidden terms.</p>
                  </div>
                </div>

                <div className="authorities-contact-strip">
                  <strong>Consumer Helplines:</strong>
                  <span>National Consumer Helpline: <strong>1915</strong> | consumerhelpline.gov.in | WhatsApp: 8800001915</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category 3: Tenant & Housing Rights */}
        {activeCategory === 'tenant' && (
          <div className="rights-detail-view">
            <div className="card rights-master-card">
              <div className="card-header">
                <div className="card-title-group">
                  <Home size={20} className="text-emerald" />
                  <h3 className="card-title">Model Tenancy Act 2021 & Rent Control Protections</h3>
                </div>
                <span className="badge-statute">Tenancy & Contract Acts</span>
              </div>

              <div className="card-body">
                <div className="rights-subgrid">
                  <div className="rights-feature-box">
                    <h4>1. Security Deposit Capped at 2 Months</h4>
                    <p>Under the Model Tenancy Act, the maximum security deposit for residential premises is capped at 2 months rent, which must be refunded upon handover of peaceful possession.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>2. Prohibition of Unlawful Eviction</h4>
                    <p>A landlord CANNOT forcibly throw out a tenant, change locks, or dispose of belongings. Eviction requires statutory notice and an order from the Rent Court/Authority.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>3. Prohibition of Essential Amenity Cutoffs</h4>
                    <p>Landlords are legally prohibited from cutting off electricity, water, or elevator access under any circumstances, even if rent is in arrears. Doing so is a cognizable criminal offense.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>4. 24-Hour Prior Notice for Entry</h4>
                    <p>Landlords cannot enter the rented property unannounced. Law mandates at least 24 hours prior written or electronic notice for repairs or inspection during daylight hours.</p>
                  </div>
                </div>

                <div className="authorities-contact-strip">
                  <strong>Grievance Forums:</strong>
                  <span>District Rent Authority / Rent Tribunal | Civil Court (Order 37 CPC) | Local Police Station (for criminal trespass)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category 4: Workplace & POSH Rights */}
        {activeCategory === 'workplace' && (
          <div className="rights-detail-view">
            <div className="card rights-master-card">
              <div className="card-header">
                <div className="card-title-group">
                  <Briefcase size={20} className="text-emerald" />
                  <h3 className="card-title">Workplace Protections & POSH Act 2013</h3>
                </div>
                <span className="badge-statute">POSH Act 2013 & Code on Wages</span>
              </div>

              <div className="card-body">
                <div className="rights-subgrid">
                  <div className="rights-feature-box">
                    <h4>1. Mandatory Internal Complaints Committee (ICC)</h4>
                    <p>Every organization with 10 or more employees must constitute an ICC headed by a senior woman employee and an external independent NGO member to investigate harassment.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>2. Statutory Interim Relief During Inquiries</h4>
                    <p>Under Section 12 of the POSH Act, the complainant has the right to request paid leave up to 3 months or transfer of either party during the inquiry to prevent intimidation.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>3. Non-Compete & Employment Bonds are Void</h4>
                    <p>Under Section 27 of the Indian Contract Act 1872, agreements restraining an employee from joining competitors post-resignation are 100% void ab initio.</p>
                  </div>

                  <div className="rights-feature-box">
                    <h4>4. Earned Wages Protection</h4>
                    <p>Employers cannot arbitrarily deduct or withhold earned salaries for past work as penalty. Violations can be reported directly to the District Labour Commissioner.</p>
                  </div>
                </div>

                <div className="authorities-contact-strip">
                  <strong>Workplace Redressal Bodies:</strong>
                  <span>Company ICC | District Officer / Local Committee (LC) | Samadhan Portal (Ministry of Labour) | NCW Helpline (7827170170)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
