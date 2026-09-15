import React, { useState } from 'react';
import { 
  MapPin, PhoneCall, ShieldAlert, Building2, Search, 
  ExternalLink, Info, CheckCircle2, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import { POLICE_STATIONS_DIRECTORY } from '../data/legalKnowledge';

export default function PoliceLocator({ lang = 'en' }) {
  const [selectedCity, setSelectedCity] = useState('New Delhi');
  const [searchTerm, setSearchTerm] = useState('');

  const cityData = POLICE_STATIONS_DIRECTORY.find(c => c.city === selectedCity) || POLICE_STATIONS_DIRECTORY[0];

  const filteredStations = cityData.stations.filter(st => 
    st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    st.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="police-locator-container">
      {/* Hero Header */}
      <div className="module-hero">
        <div className="hero-content">
          <div className="hero-pill">
            <MapPin size={14} className="text-gold" />
            <span>Jurisdiction & Law Enforcement Directory</span>
          </div>
          <h1 className="hero-title">Find Nearby Police Stations & Cyber Crime Cells</h1>
          <p className="hero-desc">
            Direct verified contacts, addresses, and emergency hotlines across major Indian metropolitan areas and state jurisdictions.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="city-filter-bar">
          <span className="city-filter-label">Select Major City:</span>
          <div className="city-pill-list">
            {POLICE_STATIONS_DIRECTORY.map((c) => (
              <button
                key={c.city}
                onClick={() => { setSelectedCity(c.city); setSearchTerm(''); }}
                className={`city-pill-btn ${selectedCity === c.city ? 'active' : ''}`}
              >
                {c.city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar & Zero FIR Advisory */}
      <div className="locator-controls-bar">
        <div className="search-station-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search stations or areas in ${selectedCity}...`}
            className="station-search-input"
          />
        </div>

        <div className="emergency-dial-pill">
          <PhoneCall size={15} className="pulse-icon" />
          <span>National Police Dispatch: <strong>112</strong></span>
        </div>
      </div>

      {/* Station Cards Grid */}
      <div className="stations-grid">
        {filteredStations.map((station, idx) => {
          const isCyber = station.name.toLowerCase().includes('cyber');
          return (
            <div key={idx} className={`card station-card ${isCyber ? 'cyber-station-card' : ''}`}>
              <div className="station-card-header">
                <div className="station-icon-wrap">
                  {isCyber ? <ShieldAlert size={20} className="text-danger" /> : <Building2 size={20} className="text-gold" />}
                </div>
                <div>
                  <h3 className="station-name">{station.name}</h3>
                  <span className="station-type-tag">
                    {isCyber ? 'Cyber Crime Police Station' : 'Territorial Law Enforcement'}
                  </span>
                </div>
              </div>

              <div className="station-card-body">
                <div className="station-address-row">
                  <MapPin size={16} className="text-muted flex-shrink-0" />
                  <span>{station.address}</span>
                </div>

                <div className="station-contact-actions">
                  <a href={`tel:${station.phone.replace(/[^0-9]/g, '')}`} className="station-call-btn">
                    <PhoneCall size={14} />
                    <span>{station.phone}</span>
                  </a>
                  <div className="station-emergency-tag">
                    Emergency: <strong>{station.emergency}</strong>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Crucial Zero FIR & Police Refusal Legal Guide */}
      <div className="card zero-fir-advisory-card">
        <div className="card-header">
          <div className="card-title-group">
            <ShieldCheck size={20} className="text-gold" />
            <h3 className="card-title">What If The Police Station Refuses To Register Your FIR?</h3>
          </div>
          <span className="badge-statute">Section 173(1) & 173(4) BNSS</span>
        </div>

        <div className="card-body">
          <p className="advisory-intro">
            It is an illegal and punishable act for any police officer to turn away a citizen who reports a cognizable offence. Know the mandatory remedies under Indian law:
          </p>

          <div className="advisory-steps-grid">
            <div className="advisory-step-item">
              <div className="step-badge">REMEDY 1</div>
              <h4>Demand a 'Zero FIR'</h4>
              <p>Under Section 173(1) BNSS 2023, if an officer claims the incident occurred in another area, they CANNOT send you away. They are legally mandated to register a <strong>Zero FIR</strong> and transfer the case to the concerned station.</p>
            </div>

            <div className="advisory-step-item">
              <div className="step-badge">REMEDY 2</div>
              <h4>Speed Post to Superintendent of Police (SP)</h4>
              <p>Under Section 173(4) BNSS (formerly 154(3) CrPC), send your signed complaint via Registered Speed Post with Acknowledgement Due (AD) to the district SP or DCP. The SP is mandated to either investigate or direct an officer to register the FIR.</p>
            </div>

            <div className="advisory-step-item">
              <div className="step-badge">REMEDY 3</div>
              <h4>Application Before Judicial Magistrate</h4>
              <p>Under Section 175(3) BNSS (formerly 156(3) CrPC), file an application through an advocate before the local Judicial Magistrate. The Magistrate possesses statutory power to order police to register the FIR immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
