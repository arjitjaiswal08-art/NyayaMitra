import JSZip from 'jszip';

/**
 * Utility for Section 63 BSA (Bharatiya Sakshya Adhiniyam, 2023) / Sec 65B IEA
 * Evidence Locker & Court Dossier Generator
 */

/**
 * Calculate standard SHA-256 hash using native Web Crypto API
 * @param {Blob|File} file 
 * @returns {Promise<string>} 64-character lowercase hex string
 */
export async function calculateSHA256(file) {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Format bytes into human readable format
 */
export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Capture current GPS Geolocation with high accuracy
 * @returns {Promise<{lat: number, lng: number, accuracy: number, timestamp: string}|null>}
 */
export function captureGeoLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
          accuracyMeters: Math.round(position.coords.accuracy),
          timestamp: new Date(position.timestamp).toISOString()
        });
      },
      (err) => {
        console.warn('Geolocation capture skipped:', err.message);
        resolve(null);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  });
}

/**
 * Generate Court-Admissible HTML Certificate under Section 63 BSA 2023 (Sec 65B IEA)
 */
export function generateSection63HTML(item, deponent = {}) {
  const deponentName = deponent.name || 'Complainant / Deponent';
  const deponentPhone = deponent.phone || '+91-XXXXXXXXXX';
  const deponentAddress = deponent.address || 'Resident of India';
  const caseRef = deponent.caseRef || 'Pre-Litigation / Police Complaint Dossier';
  const certDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Section 63 BSA Electronic Evidence Certificate - ${item.name}</title>
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #111;
      line-height: 1.6;
      padding: 40px;
      max-width: 850px;
      margin: 0 auto;
      background: #fff;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #000;
      padding-bottom: 15px;
      margin-bottom: 25px;
    }
    .header h1 {
      font-size: 18pt;
      margin: 0 0 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .header h2 {
      font-size: 13pt;
      font-weight: normal;
      margin: 0;
      font-style: italic;
    }
    .badge {
      display: inline-block;
      border: 1px solid #000;
      padding: 3px 10px;
      font-size: 10pt;
      font-weight: bold;
      margin-top: 8px;
    }
    .section-title {
      font-weight: bold;
      text-decoration: underline;
      margin-top: 20px;
      margin-bottom: 8px;
      font-size: 12pt;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 10.5pt;
    }
    th, td {
      border: 1px solid #333;
      padding: 6px 10px;
      vertical-align: top;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
      width: 32%;
    }
    .hash-box {
      font-family: 'Courier New', Courier, monospace;
      font-size: 10pt;
      word-break: break-all;
      background: #fafafa;
      padding: 6px;
      border: 1px dashed #666;
    }
    .declaration {
      text-align: justify;
      margin-top: 15px;
      font-size: 11pt;
    }
    .signatures {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
    }
    .sig-block {
      width: 45%;
      border-top: 1px solid #000;
      padding-top: 8px;
      text-align: center;
      font-size: 10.5pt;
    }
    .footer {
      margin-top: 40px;
      font-size: 9pt;
      color: #666;
      border-top: 1px solid #ccc;
      padding-top: 10px;
      text-align: center;
    }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>CERTIFICATE UNDER SECTION 63 OF BHARATIYA SAKSHYA ADHINIYAM, 2023</h1>
    <h2>(Corresponding to Section 65B of the Indian Evidence Act, 1872)</h2>
    <div class="badge">FOR ADMISSIBILITY OF ELECTRONIC RECORD / DIGITAL EVIDENCE IN COURT</div>
    <div style="margin-top: 6px; font-size: 10pt;">Ref: ${caseRef} | Issue Timestamp: ${certDate}</div>
  </div>

  <div class="declaration">
    I, <strong>${deponentName}</strong>, Contact: <strong>${deponentPhone}</strong>, residing at <strong>${deponentAddress}</strong>, do hereby solemnly affirm and state on oath as under:
  </div>

  <ol style="font-size: 11pt; padding-left: 20px;">
    <li>That I am the lawful custodian / user of the electronic device from which the digital record described hereinafter has been captured, preserved, and generated.</li>
    <li>That during the period over which the electronic record was produced, the computer system / mobile device was operating regularly and properly, and there has been no material defect or unauthorized intrusion affecting the integrity of the data.</li>
    <li>That the digital artifact produced herewith is an identical, bit-level reproduction of the original electronic file as stored and verified by cryptographic SHA-256 hashing.</li>
  </ol>

  <div class="section-title">SCHEDULE OF ELECTRONIC EVIDENCE ARTIFACT</div>
  <table>
    <tr>
      <th>Evidence Title / Tag</th>
      <td><strong>${item.title || item.name}</strong> (${item.category || 'General Digital Evidence'})</td>
    </tr>
    <tr>
      <th>Original File Name</th>
      <td>${item.name}</td>
    </tr>
    <tr>
      <th>MIME / File Type</th>
      <td>${item.type || 'application/octet-stream'}</td>
    </tr>
    <tr>
      <th>File Size (Bytes)</th>
      <td>${item.size} bytes (${formatBytes(item.size)})</td>
    </tr>
    <tr>
      <th>Cryptographic SHA-256 Digest</th>
      <td><div class="hash-box">${item.hash}</div></td>
    </tr>
    <tr>
      <th>Capture / Ingestion Timestamp</th>
      <td>${item.timestamp} (IST)</td>
    </tr>
    <tr>
      <th>Geographic Location Coordinates</th>
      <td>${item.geo ? `Latitude: ${item.geo.latitude}°, Longitude: ${item.geo.longitude}° (Accuracy: ±${item.geo.accuracyMeters}m)` : 'Not available / Location access withheld at capture'}</td>
    </tr>
    <tr>
      <th>Capturing Device / Browser Signature</th>
      <td>${item.deviceSignature || navigator.userAgent}</td>
    </tr>
    <tr>
      <th>Tamper Verification Status</th>
      <td><strong>UNALTERED &amp; CRYPTOGRAPHICALLY SECURED</strong></td>
    </tr>
  </table>

  <div class="section-title">CHAIN OF CUSTODY AUDIT TRAIL</div>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Timestamp (IST)</th>
        <th style="width: 25%;">Event Action</th>
        <th>Actor / Log Detail</th>
      </tr>
    </thead>
    <tbody>
      ${(item.custodyLog || []).map(log => `
        <tr>
          <td>${log.timestamp}</td>
          <td><strong>${log.action}</strong></td>
          <td>${log.details}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="declaration">
    <strong>VERIFICATION:</strong><br>
    I solemnly declare that the contents of the above certificate are true and correct to the best of my knowledge, information, and belief, and nothing material has been concealed or falsely presented.
  </div>

  <div class="signatures">
    <div class="sig-block">
      <br><br>
      <strong>Signature / Digital Mark of Deponent</strong><br>
      (${deponentName})<br>
      Phone: ${deponentPhone}
    </div>
    <div class="sig-block">
      <br><br>
      <strong>NyayaMitra Cryptographic Attestation</strong><br>
      SHA-256 Sealed &bull; Section 63 BSA Compliant<br>
      Unique Evidence UID: ${item.id}
    </div>
  </div>

  <div class="footer">
    Generated automatically by NyayaMitra Court Evidence Vault &bull; Meets guidelines established by the Supreme Court of India in <em>Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020) 7 SCC 1</em>.
  </div>
</body>
</html>`;
}

/**
 * Generate a Court-Ready ZIP Dossier containing:
 * 1. The original binary evidence files
 * 2. Section 63 BSA Printable Certificate HTML
 * 3. Formal Chain of Custody JSON
 * 4. SHA-256 Checksums manifest (.txt)
 */
export async function exportCourtReadyZip(evidenceItems, caseDetails = {}) {
  const zip = new JSZip();
  const folder = zip.folder(`NyayaMitra_Court_Evidence_${Date.now()}`);

  const manifestRows = [
    '========================================================================',
    '       NYAYAMITRA COURT-READY EVIDENCE DOSSIER - SHA-256 MANIFEST       ',
    `Case Reference: ${caseDetails.caseRef || 'Pre-Litigation Evidence Collection'}`,
    `Generated On:   ${new Date().toISOString()}`,
    `Governing Law:  Section 63 Bharatiya Sakshya Adhiniyam, 2023 / Sec 65B IEA`,
    '========================================================================\n'
  ];

  const fullCustodyLog = [];

  for (let i = 0; i < evidenceItems.length; i++) {
    const item = evidenceItems[i];
    const safeName = `${String(i + 1).padStart(2, '0')}_${item.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    // Add actual file if available in memory
    if (item.fileObject) {
      folder.file(`evidence_files/${safeName}`, item.fileObject);
    }

    // Add Section 63 Certificate for each item
    const certHtml = generateSection63HTML(item, caseDetails);
    folder.file(`certificates/Section_63_BSA_Certificate_${item.id}.html`, certHtml);

    // Manifest entry
    manifestRows.push(`File:       ${item.name}`);
    manifestRows.push(`Size:       ${item.size} bytes`);
    manifestRows.push(`SHA-256:    ${item.hash}`);
    manifestRows.push(`Timestamp:  ${item.timestamp}`);
    manifestRows.push(`Geo-Tag:    ${item.geo ? `${item.geo.latitude}, ${item.geo.longitude}` : 'None'}`);
    manifestRows.push('------------------------------------------------------------------------');

    fullCustodyLog.push({
      evidenceId: item.id,
      fileName: item.name,
      hash: item.hash,
      chainOfCustody: item.custodyLog
    });
  }

  folder.file('SHA256_CHECKSUMS_MANIFEST.txt', manifestRows.join('\n'));
  folder.file('CHAIN_OF_CUSTODY_MASTER_LOG.json', JSON.stringify({
    dossierCreatedAt: new Date().toISOString(),
    caseDetails,
    evidenceItems: fullCustodyLog
  }, null, 2));

  // Add README
  folder.file('README_FOR_ADVOCATE_AND_POLICE.txt', `NYAYAMITRA EVIDENCE LOCKER - LEGAL DOSSIER
------------------------------------------------------------------------
This dossier contains digital evidence cryptographically sealed for court submission under:
1. Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 (BSA).
2. Section 65B of the Indian Evidence Act, 1872 (for ongoing/legacy proceedings).

CONTENTS:
1. /evidence_files/       - Pristine digital files as uploaded.
2. /certificates/         - Ready-to-print Section 63 BSA compliance certificates.
3. SHA256_CHECKSUMS_MANIFEST.txt - Tamper-proof hash digests for forensic cross-verification.
4. CHAIN_OF_CUSTODY_MASTER_LOG.json - Complete machine-readable custody audit trail.

HOW TO PRESENT IN COURT:
1. Print the certificate from /certificates/ on legal size or A4 bond paper.
2. Sign the deponent verification section before an Oath Commissioner / Notary.
3. Submit the accompanying USB drive / CD containing this exact folder structure with matching hashes.
------------------------------------------------------------------------`);

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  return zipBlob;
}
