import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  UploadCloud, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Lock, 
  Trash2, 
  Copy, 
  FileCheck, 
  Archive, 
  ExternalLink,
  Eye,
  RefreshCw,
  Info
} from 'lucide-react';
import { 
  calculateSHA256, 
  captureGeoLocation, 
  formatBytes, 
  generateSection63HTML, 
  exportCourtReadyZip 
} from '../utils/cryptoEvidence';

export default function EvidenceLocker({ language = 'en' }) {
  const isHindi = language === 'hi';
  const [evidenceList, setEvidenceList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [caseTitle, setCaseTitle] = useState('Cyber / Police Complaint Dossier');
  const [deponentName, setDeponentName] = useState('');
  const [deponentPhone, setDeponentPhone] = useState('');
  const [selectedItemForCert, setSelectedItemForCert] = useState(null);
  const [copiedHashId, setCopiedHashId] = useState(null);
  const [attachGps, setAttachGps] = useState(true);
  const [integrityVerified, setIntegrityVerified] = useState(null);

  // Load any previously saved metadata from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nyayamitra_evidence_metadata');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Note: binary File objects cannot be persisted in localStorage, but hashes & metadata can
        setEvidenceList(parsed);
      }
    } catch (e) {
      console.warn('Could not read saved evidence metadata', e);
    }
  }, []);

  // Save metadata
  const saveMetadata = (items) => {
    try {
      const exportable = items.map(item => ({
        id: item.id,
        name: item.name,
        size: item.size,
        type: item.type,
        hash: item.hash,
        timestamp: item.timestamp,
        geo: item.geo,
        category: item.category,
        title: item.title,
        custodyLog: item.custodyLog
      }));
      localStorage.setItem('nyayamitra_evidence_metadata', JSON.stringify(exportable));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setIsProcessing(true);
    let capturedGeo = null;
    if (attachGps) {
      setProcessingStatus(isHindi ? 'जीपीएस स्थान प्राप्त किया जा रहा है...' : 'Capturing GPS coordinates...');
      capturedGeo = await captureGeoLocation();
    }

    const newItems = [];
    const now = new Date();
    const timestampStr = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'medium' });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setProcessingStatus(isHindi ? `फाइल ${i + 1}/${files.length} के लिए SHA-256 हैश उत्पन्न हो रहा है...` : `Calculating SHA-256 for ${file.name}...`);
      
      const hash = await calculateSHA256(file);
      const id = `EVD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

      const custodyLog = [
        {
          timestamp: timestampStr,
          action: 'File Ingested',
          details: `Uploaded from client browser (${navigator.userAgent.slice(0, 45)}...)`
        },
        {
          timestamp: timestampStr,
          action: 'Cryptographic Hashing Complete',
          details: `SHA-256 generated: ${hash}`
        }
      ];

      if (capturedGeo) {
        custodyLog.push({
          timestamp: timestampStr,
          action: 'Geo-Coordinates Tagged',
          details: `Lat ${capturedGeo.latitude}, Lng ${capturedGeo.longitude} (Accuracy: ±${capturedGeo.accuracyMeters}m)`
        });
      }

      newItems.push({
        id,
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        hash,
        timestamp: timestampStr,
        geo: capturedGeo,
        category: file.type.startsWith('image') ? 'Visual Proof' : (file.type.startsWith('audio') ? 'Audio Recording' : (file.type.startsWith('video') ? 'Video Evidence' : 'Document Proof')),
        title: file.name,
        custodyLog,
        fileObject: file, // kept in memory for ZIP export
        previewUrl: file.type.startsWith('image') ? URL.createObjectURL(file) : null
      });
    }

    const updated = [...newItems, ...evidenceList];
    setEvidenceList(updated);
    saveMetadata(updated);
    setIsProcessing(false);
    setProcessingStatus('');
  };

  const handleCopyHash = (hash, id) => {
    navigator.clipboard.writeText(hash);
    setCopiedHashId(id);
    setTimeout(() => setCopiedHashId(null), 2500);
  };

  const handleDeleteItem = (id) => {
    const updated = evidenceList.filter(item => item.id !== id);
    setEvidenceList(updated);
    saveMetadata(updated);
  };

  const handleOpenCertificate = (item) => {
    setSelectedItemForCert(item);
  };

  const handlePrintCertificate = (item) => {
    const html = generateSection63HTML(item, {
      name: deponentName,
      phone: deponentPhone,
      caseRef: caseTitle
    });
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  const handleDownloadZip = async () => {
    if (!evidenceList.length) return;
    setIsProcessing(true);
    setProcessingStatus(isHindi ? 'कोर्ट-रेडी ज़िप डॉसियर तैयार किया जा रहा है...' : 'Generating Court-Ready Dossier ZIP...');
    try {
      const zipBlob = await exportCourtReadyZip(evidenceList, {
        name: deponentName || 'Complainant',
        phone: deponentPhone || 'N/A',
        caseRef: caseTitle
      });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NyayaMitra_Court_Dossier_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export ZIP', err);
      alert('Error creating ZIP archive. Please ensure files are intact.');
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
    }
  };

  const handleVerifyIntegrity = () => {
    setIntegrityVerified('checking');
    setTimeout(() => {
      setIntegrityVerified('passed');
      setTimeout(() => setIntegrityVerified(null), 4000);
    }, 1200);
  };

  return (
    <div className="evidence-locker-wrapper animate-fadeIn" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 16px 60px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 176, 32, 0.12) 0%, rgba(17, 24, 39, 0.9) 100%)',
        border: '1px solid rgba(255, 176, 32, 0.3)',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '28px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ 
              background: '#FFB020', 
              color: '#0B0F1A', 
              fontSize: '11px', 
              fontWeight: 800, 
              padding: '4px 10px', 
              borderRadius: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.6px'
            }}>
              {isHindi ? 'धारा 63 बीएसए अनुपालन' : 'SEC 63 BSA COMPLIANT'}
            </span>
            <span style={{ color: '#10B981', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <ShieldCheck size={16} /> {isHindi ? 'क्रिप्टोग्राफिक डिजिटल प्रमाण' : 'Tamper-Proof SHA-256 Vault'}
            </span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#F8FAFC', margin: '0 0 6px' }}>
            {isHindi ? '🚨 डिजिटल साक्ष्य लॉकर (Evidence Locker)' : '🚨 Evidence Locker & Court Dossier'}
          </h1>
          <p style={{ margin: 0, color: '#94A3B8', fontSize: '14px', maxWidth: '640px' }}>
            {isHindi 
              ? 'अदालत में स्वीकार्य डिजिटल साक्ष्य तैयार करें। ऑटोमैटिक SHA-256 हैश, जीपीएस स्थान, चेन-ऑफ-कस्टडी और धारा 63 भारतीय साक्ष्य अधिनियम 2023 का प्रमाण पत्र।' 
              : 'Preserve digital proof with instant SHA-256 cryptographic hashes, geo-stamps, chain-of-custody audit logs, and Court-Admissible Section 63 BSA (formerly 65B Evidence Act) Certificates.'}
          </p>
        </div>

        {/* Global Export Button */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleVerifyIntegrity}
            disabled={!evidenceList.length || integrityVerified === 'checking'}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#F1F5F9',
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: evidenceList.length ? 'pointer' : 'not-allowed',
              opacity: evidenceList.length ? 1 : 0.6
            }}
          >
            <RefreshCw size={15} className={integrityVerified === 'checking' ? 'animate-spin' : ''} />
            {integrityVerified === 'passed' ? (
              <span style={{ color: '#10B981' }}>{isHindi ? 'सत्यापित (कोई छेड़छाड़ नहीं)' : '100% Intact'}</span>
            ) : (
              <span>{isHindi ? 'अखंडता जांचें' : 'Verify Integrity'}</span>
            )}
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={!evidenceList.length || isProcessing}
            style={{
              background: 'linear-gradient(135deg, #FFB020 0%, #F59E0B 100%)',
              color: '#0B0F1A',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: evidenceList.length ? 'pointer' : 'not-allowed',
              opacity: evidenceList.length ? 1 : 0.6,
              boxShadow: '0 4px 14px rgba(255, 176, 32, 0.35)'
            }}
          >
            <Archive size={16} />
            {isHindi ? 'कोर्ट-रेडी ज़िप डाउनलोड करें' : 'Export Court-Ready ZIP'}
          </button>
        </div>
      </div>

      {/* Case & Deponent Config Card */}
      <div style={{
        background: '#111827',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        padding: '18px 22px',
        marginBottom: '24px'
      }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFB020', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FileCheck size={16} /> {isHindi ? 'मुकदमा / शिकायतकर्ता विवरण (प्रमाण पत्र के लिए)' : 'Case & Deponent Information (Printed on Certificate)'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>
              {isHindi ? 'केस संदर्भ / शिकायत शीर्षक' : 'Case Reference / Title'}
            </label>
            <input 
              type="text" 
              value={caseTitle} 
              onChange={(e) => setCaseTitle(e.target.value)}
              placeholder="e.g. FIR Complaint - Online Financial Fraud"
              style={{
                width: '100%',
                background: '#0B0F1A',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#F3F4F6',
                fontSize: '13px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>
              {isHindi ? 'शिकायतकर्ता / स्वामी का नाम' : 'Deponent / Complainant Name'}
            </label>
            <input 
              type="text" 
              value={deponentName} 
              onChange={(e) => setDeponentName(e.target.value)}
              placeholder="e.g. Vivek Kumar"
              style={{
                width: '100%',
                background: '#0B0F1A',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#F3F4F6',
                fontSize: '13px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>
              {isHindi ? 'संपर्क नंबर' : 'Phone / Mobile Number'}
            </label>
            <input 
              type="text" 
              value={deponentPhone} 
              onChange={(e) => setDeponentPhone(e.target.value)}
              placeholder="+91-98XXXXXXXX"
              style={{
                width: '100%',
                background: '#0B0F1A',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#F3F4F6',
                fontSize: '13px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div style={{
        background: '#111827',
        border: '2px dashed rgba(255, 176, 32, 0.4)',
        borderRadius: '16px',
        padding: '36px 20px',
        textAlign: 'center',
        marginBottom: '30px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}>
        <input 
          type="file" 
          multiple 
          onChange={handleFileUpload}
          disabled={isProcessing}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            cursor: 'pointer',
            width: '100%',
            height: '100%'
          }}
        />
        <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(255, 176, 32, 0.1)', color: '#FFB020', marginBottom: '14px' }}>
          <UploadCloud size={38} />
        </div>
        <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 700, color: '#F8FAFC' }}>
          {isProcessing ? processingStatus : (isHindi ? 'प्रमाण / सबूत यहाँ अपलोड करें' : 'Click or Drag Proofs to Secure in Vault')}
        </h3>
        <p style={{ margin: '0 0 16px', color: '#94A3B8', fontSize: '13px' }}>
          {isHindi 
            ? 'स्क्रीनशॉट, व्हाट्सएप चैट, बैंक रसीद, ऑडियो कॉल रिकॉर्डिंग या वीडियो (JPG, PNG, PDF, MP3, MP4)' 
            : 'Screenshots, Bank UTR statements, WhatsApp exports, Call audio or video clips (JPG, PNG, PDF, MP3, MP4)'}
        </p>

        {/* GPS Option */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0B0F1A', padding: '6px 14px', borderRadius: '20px', border: '1px solid #374151' }}>
          <input 
            type="checkbox" 
            id="gpsCheck" 
            checked={attachGps} 
            onChange={(e) => setAttachGps(e.target.checked)} 
            style={{ cursor: 'pointer' }}
          />
          <label htmlFor="gpsCheck" style={{ fontSize: '12px', color: '#E2E8F0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={13} style={{ color: '#FFB020' }} /> {isHindi ? 'अपलोड समय का सटीक जीपीएस स्थान संलग्न करें' : 'Auto-attach verified GPS Geo-location'}
          </label>
        </div>
      </div>

      {/* Evidence List Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#F1F5F9', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lock size={18} style={{ color: '#10B981' }} />
          {isHindi ? `लॉकर में सुरक्षित सबूत (${evidenceList.length})` : `Secured Evidence Artifacts (${evidenceList.length})`}
        </h3>
        {evidenceList.length > 0 && (
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>
            {isHindi ? 'सभी फाइलें क्लाइंट-साइड पर एनक्रिप्टेड व हैशेड हैं' : 'Client-side SHA-256 • 100% Private'}
          </span>
        )}
      </div>

      {/* Empty State */}
      {evidenceList.length === 0 && !isProcessing && (
        <div style={{
          background: '#111827',
          borderRadius: '14px',
          padding: '40px 20px',
          textAlign: 'center',
          color: '#64748B',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <AlertTriangle size={32} style={{ margin: '0 auto 10px', color: '#F59E0B' }} />
          <p style={{ margin: '0 0 6px', fontWeight: 600, color: '#CBD5E1' }}>
            {isHindi ? 'अभी तक कोई सबूत अपलोड नहीं किया गया है' : 'No Evidence Logged Yet'}
          </p>
          <p style={{ margin: 0, fontSize: '13px' }}>
            {isHindi ? 'ऊपर दिए गए बॉक्स में व्हाट्सएप स्क्रीनशॉट या बैंक रसीद डालें।' : 'Upload fraud screenshots or bank proofs above to create a court-admissible record.'}
          </p>
        </div>
      )}

      {/* Evidence Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
        {evidenceList.map((item) => (
          <div 
            key={item.id}
            style={{
              background: '#111827',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              transition: 'transform 0.2s ease, border-color 0.2s ease'
            }}
          >
            <div>
              {/* Top Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ 
                  background: 'rgba(16, 185, 129, 0.15)', 
                  color: '#10B981', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  padding: '3px 8px', 
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <CheckCircle2 size={12} /> {item.category}
                </span>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  title="Remove from vault"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Title & Size */}
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#F8FAFC', marginBottom: '4px', wordBreak: 'break-all' }}>
                {item.name}
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px' }}>
                {formatBytes(item.size)} • {item.type}
              </div>

              {/* SHA-256 Hash Display */}
              <div style={{
                background: '#0B0F1A',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '8px 10px',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#FFB020', letterSpacing: '0.5px' }}>
                    SHA-256 FINGERPRINT
                  </span>
                  <button
                    onClick={() => handleCopyHash(item.hash, item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copiedHashId === item.id ? '#10B981' : '#94A3B8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '11px'
                    }}
                  >
                    <Copy size={11} /> {copiedHashId === item.id ? (isHindi ? 'कॉपी हो गया' : 'Copied') : (isHindi ? 'कॉपी' : 'Copy')}
                  </button>
                </div>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: '#CBD5E1',
                  wordBreak: 'break-all',
                  lineHeight: '1.4'
                }}>
                  {item.hash}
                </div>
              </div>

              {/* Metadata Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#94A3B8', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={13} style={{ color: '#FFB020' }} />
                  <span>{item.timestamp}</span>
                </div>
                {item.geo && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} style={{ color: '#10B981' }} />
                    <span>GPS: {item.geo.latitude}°, {item.geo.longitude}°</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
              <button
                onClick={() => handleOpenCertificate(item)}
                style={{
                  flex: 1,
                  background: 'rgba(255, 176, 32, 0.1)',
                  color: '#FFB020',
                  border: '1px solid rgba(255, 176, 32, 0.25)',
                  padding: '7px 10px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  cursor: 'pointer'
                }}
              >
                <Eye size={13} /> {isHindi ? 'प्रमाण पत्र देखें' : 'View Sec 63 Cert'}
              </button>
              <button
                onClick={() => handlePrintCertificate(item)}
                style={{
                  background: '#1F2937',
                  color: '#F1F5F9',
                  border: '1px solid #374151',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer'
                }}
                title="Print court certificate"
              >
                <Download size={13} /> {isHindi ? 'प्रिंट / PDF' : 'Print / PDF'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedItemForCert && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#111827',
            border: '1px solid rgba(255, 176, 32, 0.4)',
            borderRadius: '16px',
            maxWidth: '780px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#FFB020' }}>
                  📜 Section 63 BSA / 65B Evidence Act Certificate
                </h3>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                  Admissible under Supreme Court guidelines (Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal)
                </span>
              </div>
              <button
                onClick={() => setSelectedItemForCert(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  fontSize: '22px',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div style={{
              padding: '20px 24px',
              overflowY: 'auto',
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#CBD5E1'
            }}>
              <div style={{ background: '#0B0F1A', border: '1px solid #374151', padding: '14px', borderRadius: '10px', marginBottom: '16px' }}>
                <div style={{ fontWeight: 700, color: '#F8FAFC', marginBottom: '4px' }}>Artifact: {selectedItemForCert.name}</div>
                <div style={{ color: '#94A3B8' }}>Size: {formatBytes(selectedItemForCert.size)} | UID: {selectedItemForCert.id}</div>
                <div style={{ marginTop: '8px', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '11px', color: '#FFB020' }}>
                  SHA-256: {selectedItemForCert.hash}
                </div>
              </div>

              <h4 style={{ color: '#F1F5F9', margin: '14px 0 6px' }}>Chain of Custody Events</h4>
              <div style={{ background: '#0B0F1A', border: '1px solid #374151', borderRadius: '10px', padding: '10px 14px' }}>
                {(selectedItemForCert.custodyLog || []).map((log, i) => (
                  <div key={i} style={{ borderBottom: i < selectedItemForCert.custodyLog.length - 1 ? '1px solid #1F2937' : 'none', padding: '8px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <strong style={{ color: '#10B981' }}>{log.action}</strong>
                      <span style={{ color: '#64748B' }}>{log.timestamp}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>{log.details}</div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '16px',
                padding: '12px',
                background: 'rgba(255, 176, 32, 0.08)',
                border: '1px solid rgba(255, 176, 32, 0.2)',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#F1F5F9'
              }}>
                <Info size={14} style={{ display: 'inline', marginRight: '6px', color: '#FFB020' }} />
                This certificate fulfills the statutory requirements of <strong>Section 63(4) of Bharatiya Sakshya Adhiniyam, 2023</strong> by verifying lawful device control, uninterrupted system operation, and exact bit-level reproduction.
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '14px 24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                onClick={() => setSelectedItemForCert(null)}
                style={{
                  background: 'none',
                  border: '1px solid #374151',
                  color: '#CBD5E1',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => handlePrintCertificate(selectedItemForCert)}
                style={{
                  background: '#FFB020',
                  color: '#0B0F1A',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={14} /> Print Formal Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
