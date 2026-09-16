// ============================================================
// Mock Data for UdyamOne Demo
// All data is hardcoded to simulate backend responses
// ============================================================

// ---------- Sector-based Approval Checklists ----------
export const SECTORS = [
  { value: 'food-processing', label: 'Food Processing' },
  { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
  { value: 'textiles', label: 'Textiles & Garments' },
  { value: 'auto-components', label: 'Auto Components' },
  { value: 'chemicals', label: 'Chemicals & Petrochemicals' },
];

export const PROJECT_SIZES = [
  { value: 'small', label: 'Small (< ₹10 Cr)' },
  { value: 'medium', label: 'Medium (₹10 - 50 Cr)' },
  { value: 'large', label: 'Large (> ₹50 Cr)' },
];

export const LOCATIONS = [
  { value: 'midc', label: 'MIDC Industrial Area' },
  { value: 'non-midc', label: 'Non-MIDC / Private Land' },
];

export const STAGES = [
  { value: 'new', label: 'New Setup' },
  { value: 'expansion', label: 'Expansion' },
  { value: 'renewal', label: 'Renewal' },
];

// Sector → Approval checklists (the heart of the demo)
export const SECTOR_CHECKLISTS = {
  'food-processing': [
    {
      id: 'fssai',
      name: 'FSSAI License',
      department: 'Food Safety & Standards Authority of India',
      sladays: 30,
      status: 'not-started',
      explanation: 'All food business operators involved in manufacturing, processing, storage, distribution, and sale of food products must obtain an FSSAI license. This is a mandatory requirement under the Food Safety and Standards Act, 2006.',
      citation: 'FSSAI Regulation 2011, Clause 2.1.1 — Licensing and Registration of Food Businesses',
      documents: ['FSSAI Application Form-B', 'Blueprint/Layout of Factory', 'Food Safety Management Plan', 'Water Test Report', 'List of Equipment & Machinery'],
    },
    {
      id: 'mpcb',
      name: 'MPCB Consent to Establish',
      department: 'Maharashtra Pollution Control Board',
      sladays: 45,
      status: 'not-started',
      explanation: 'Any industrial unit that generates emissions, effluents, or hazardous waste must obtain Consent to Establish (CTE) from MPCB before commencing construction, and Consent to Operate (CTO) before starting production.',
      citation: 'Water (Prevention & Control of Pollution) Act, 1974 — Section 25 & Air Act, 1981 — Section 21',
      documents: ['Environmental Clearance Certificate', 'Process Flow Diagram', 'Effluent Treatment Plan', 'Site Location Map', 'NOC from Local Authority'],
    },
    {
      id: 'fire-noc',
      name: 'Fire NOC',
      department: 'Maharashtra Fire & Emergency Services',
      sladays: 21,
      status: 'not-started',
      explanation: 'A Fire No-Objection Certificate is mandatory for all industrial establishments storing combustible materials or operating in multi-storey buildings. It certifies that the premises meet fire safety standards.',
      citation: 'Maharashtra Fire Prevention and Life Safety Measures Act, 2006 — Rule 10(1)',
      documents: ['Building Plan (approved)', 'Fire Fighting Equipment List', 'Emergency Evacuation Plan', 'Fire Drill Certificate'],
    },
    {
      id: 'factory-license',
      name: 'Factory License',
      department: 'Directorate of Industrial Safety & Health',
      sladays: 60,
      status: 'not-started',
      explanation: 'Every premises employing 10 or more workers (with power) or 20 or more workers (without power) in a manufacturing process must be registered and licensed under the Factories Act.',
      citation: 'Factories Act, 1948 — Section 6 (Approval of Plans) & Section 7 (Licensing)',
      documents: ['Form No. 2 (Application)', 'Stability Certificate from Architect', 'Plan of Factory (3 copies)', 'Details of Manufacturing Process', 'List of Workers'],
    },
    {
      id: 'gst',
      name: 'GST Registration',
      department: 'Central Board of Indirect Taxes & Customs',
      sladays: 7,
      status: 'not-started',
      explanation: 'Businesses with aggregate turnover exceeding ₹40 lakhs (₹20 lakhs for services) must register under the Goods and Services Tax regime. Registration is mandatory for inter-state suppliers.',
      citation: 'CGST Act 2017, Section 22 — Persons Liable for Registration',
      documents: ['PAN Card', 'Aadhaar Card', 'Proof of Business Address', 'Bank Account Statement', 'Digital Signature'],
    },
    {
      id: 'shop-act',
      name: 'Shop & Establishment License',
      department: 'Municipal Corporation / Local Authority',
      sladays: 14,
      status: 'not-started',
      explanation: 'All commercial establishments must register under the Maharashtra Shops and Establishments (Regulation of Employment and Conditions of Service) Act within 30 days of commencing business.',
      citation: 'Maharashtra Shops & Establishments Act, 2017 — Section 7',
      documents: ['Application Form', 'Proof of Address', 'PAN Card Copy', 'Identity Proof of Owner'],
    },
  ],
  'pharmaceuticals': [
    {
      id: 'drug-license',
      name: 'Drug Manufacturing License',
      department: 'Central Drugs Standard Control Organization (CDSCO)',
      sladays: 90,
      status: 'not-started',
      explanation: 'A license under the Drugs and Cosmetics Act is mandatory for manufacturing any drug. This involves approval of factory premises, equipment, and quality systems by a Drug Inspector.',
      citation: 'Drugs & Cosmetics Act, 1940 — Section 25(1)(d), Form 25',
      documents: ['Form 25 Application', 'GMP Certificate', 'Plant Master File', 'Equipment Qualification Report', 'Stability Study Data'],
    },
    {
      id: 'mpcb',
      name: 'MPCB Consent to Establish',
      department: 'Maharashtra Pollution Control Board',
      sladays: 45,
      status: 'not-started',
      explanation: 'Pharmaceutical units generating chemical effluents require MPCB consent before establishing and operating the facility.',
      citation: 'Water (Prevention & Control of Pollution) Act, 1974 — Section 25',
      documents: ['Environmental Impact Assessment', 'Process Flow Diagram', 'Effluent Treatment Plan', 'Hazardous Waste Management Plan'],
    },
    {
      id: 'fire-noc',
      name: 'Fire NOC',
      department: 'Maharashtra Fire & Emergency Services',
      sladays: 21,
      status: 'not-started',
      explanation: 'Fire safety certificate required for units storing flammable chemicals and solvents used in pharmaceutical manufacturing.',
      citation: 'Maharashtra Fire Prevention and Life Safety Measures Act, 2006 — Rule 10(1)',
      documents: ['Building Plan', 'Fire Safety Equipment List', 'Chemical Storage Layout', 'Emergency Response Plan'],
    },
    {
      id: 'factory-license',
      name: 'Factory License',
      department: 'Directorate of Industrial Safety & Health',
      sladays: 60,
      status: 'not-started',
      explanation: 'Mandatory license for all manufacturing premises operating under the Factories Act, 1948.',
      citation: 'Factories Act, 1948 — Section 6 & Section 7',
      documents: ['Form No. 2', 'Stability Certificate', 'Factory Layout Plan', 'Worker Details'],
    },
  ],
  'textiles': [
    {
      id: 'mpcb',
      name: 'MPCB Consent to Establish',
      department: 'Maharashtra Pollution Control Board',
      sladays: 45,
      status: 'not-started',
      explanation: 'Textile processing units with dyeing and finishing operations require MPCB consent due to significant water consumption and chemical effluent discharge.',
      citation: 'Water Act, 1974 — Section 25 & Environment Protection Act, 1986',
      documents: ['Zero Liquid Discharge Plan', 'Water Consumption Data', 'Process Flow Diagram', 'ETP Details'],
    },
    {
      id: 'fire-noc',
      name: 'Fire NOC',
      department: 'Maharashtra Fire & Emergency Services',
      sladays: 21,
      status: 'not-started',
      explanation: 'Textile units storing cotton, synthetic fibers, and chemical dyes are classified as fire-prone. A Fire NOC is mandatory before commencing operations.',
      citation: 'Maharashtra Fire Prevention Act, 2006 — Rule 10',
      documents: ['Fire Safety Plan', 'Sprinkler System Certificate', 'Emergency Evacuation Plan'],
    },
    {
      id: 'factory-license',
      name: 'Factory License',
      department: 'Directorate of Industrial Safety & Health',
      sladays: 60,
      status: 'not-started',
      explanation: 'Textile manufacturing units employing workers must comply with the Factories Act.',
      citation: 'Factories Act, 1948 — Sections 6 & 7',
      documents: ['Form No. 2', 'Layout Plan', 'Stability Certificate', 'Machinery List'],
    },
    {
      id: 'gst',
      name: 'GST Registration',
      department: 'CBIC',
      sladays: 7,
      status: 'not-started',
      explanation: 'Mandatory for all businesses exceeding the threshold turnover.',
      citation: 'CGST Act 2017, Section 22',
      documents: ['PAN', 'Address Proof', 'Bank Details'],
    },
  ],
  'auto-components': [
    {
      id: 'mpcb',
      name: 'MPCB Consent to Establish',
      department: 'Maharashtra Pollution Control Board',
      sladays: 45,
      status: 'not-started',
      explanation: 'Auto component manufacturing units with machining, plating, or painting operations require environmental consent.',
      citation: 'Water Act, 1974 — Section 25 & Air Act, 1981 — Section 21',
      documents: ['Environmental Clearance', 'Process Flow Diagram', 'ETP Layout', 'Hazardous Waste Plan'],
    },
    {
      id: 'fire-noc',
      name: 'Fire NOC',
      department: 'Maharashtra Fire & Emergency Services',
      sladays: 21,
      status: 'not-started',
      explanation: 'Required for units with welding, painting, and oil storage operations.',
      citation: 'Maharashtra Fire Prevention Act, 2006',
      documents: ['Fire Safety Equipment List', 'Building Plan', 'Emergency Plan'],
    },
    {
      id: 'factory-license',
      name: 'Factory License',
      department: 'Directorate of Industrial Safety & Health',
      sladays: 60,
      status: 'not-started',
      explanation: 'All manufacturing facilities must be licensed under the Factories Act.',
      citation: 'Factories Act, 1948 — Section 6 & 7',
      documents: ['Form No. 2', 'Layout Plan', 'Worker Roster', 'Stability Certificate'],
    },
    {
      id: 'gst',
      name: 'GST Registration',
      department: 'CBIC',
      sladays: 7,
      status: 'not-started',
      explanation: 'Mandatory for inter-state supplies and turnover above threshold.',
      citation: 'CGST Act 2017, Section 22',
      documents: ['PAN', 'Address Proof', 'Bank Details'],
    },
    {
      id: 'isi-cert',
      name: 'ISI / BIS Certification',
      department: 'Bureau of Indian Standards',
      sladays: 90,
      status: 'not-started',
      explanation: 'Auto components falling under mandatory BIS certification orders require ISI marking before sale.',
      citation: 'Bureau of Indian Standards Act, 2016 — Section 14',
      documents: ['BIS Application Form', 'Test Reports', 'Factory Inspection Report', 'Quality Control Manual'],
    },
  ],
  'chemicals': [
    {
      id: 'mpcb',
      name: 'MPCB Consent to Establish',
      department: 'Maharashtra Pollution Control Board',
      sladays: 45,
      status: 'not-started',
      explanation: 'Chemical manufacturing is classified as a highly polluting industry. MPCB consent is a prerequisite before construction.',
      citation: 'Water Act, 1974 & Air Act, 1981',
      documents: ['Environmental Impact Assessment', 'Hazardous Waste Management Plan', 'ETP Design', 'Risk Assessment Report'],
    },
    {
      id: 'peso',
      name: 'PESO License (Petroleum & Explosives)',
      department: 'Petroleum & Explosives Safety Organisation',
      sladays: 60,
      status: 'not-started',
      explanation: 'Units manufacturing, storing, or transporting petroleum products, compressed gases, or explosives need PESO licensing.',
      citation: 'Petroleum Act, 1934 & Explosives Act, 1884',
      documents: ['PESO Application Form', 'Storage Tank Layout', 'Safety Officer Certificate', 'Emergency Response Plan'],
    },
    {
      id: 'fire-noc',
      name: 'Fire NOC',
      department: 'Maharashtra Fire & Emergency Services',
      sladays: 21,
      status: 'not-started',
      explanation: 'Chemical plants are high-risk establishments requiring comprehensive fire safety systems.',
      citation: 'Maharashtra Fire Prevention Act, 2006',
      documents: ['Fire Safety Layout', 'Chemical Inventory', 'MSDS for all chemicals', 'Sprinkler System Certificate'],
    },
    {
      id: 'factory-license',
      name: 'Factory License',
      department: 'Directorate of Industrial Safety & Health',
      sladays: 60,
      status: 'not-started',
      explanation: 'Mandatory factory licensing under the Factories Act.',
      citation: 'Factories Act, 1948',
      documents: ['Form No. 2', 'Layout Plan', 'Stability Certificate'],
    },
  ],
};

// ---------- Department Official Review Queue ----------
export const REVIEW_QUEUE = [
  {
    id: 'APP-2024-1201',
    applicant: 'Sunrise Agro Foods Pvt. Ltd.',
    sector: 'Food Processing',
    approval: 'FSSAI License',
    submittedDate: 'Sep 2, 2024',
    slaDeadline: 'Oct 2, 2024',
    slaDaysLeft: 5,
    status: 'Pending Review',
    documents: [
      { name: 'FSSAI_Form_B.pdf', status: 'Verified' },
      { name: 'Factory_Layout.pdf', status: 'Verified' },
      { name: 'Water_Test_Report.pdf', status: 'Flagged', issue: 'Report is older than 6 months' },
      { name: 'Food_Safety_Plan.pdf', status: 'Verified' },
    ],
    location: 'MIDC Chakan, Pune',
    projectSize: 'Medium (₹18 Cr)',
  },
  {
    id: 'APP-2024-1187',
    applicant: 'GreenChem Industries',
    sector: 'Chemicals & Petrochemicals',
    approval: 'MPCB Consent to Establish',
    submittedDate: 'Aug 28, 2024',
    slaDeadline: 'Oct 12, 2024',
    slaDaysLeft: 15,
    status: 'Under Inspection',
    documents: [
      { name: 'EIA_Report.pdf', status: 'Verified' },
      { name: 'Effluent_Treatment_Plan.pdf', status: 'Verified' },
      { name: 'Risk_Assessment.pdf', status: 'Verified' },
      { name: 'Site_Map.pdf', status: 'Verified' },
    ],
    location: 'MIDC Ambernath, Thane',
    projectSize: 'Large (₹65 Cr)',
  },
  {
    id: 'APP-2024-1195',
    applicant: 'PharmaVita Labs',
    sector: 'Pharmaceuticals',
    approval: 'Drug Manufacturing License',
    submittedDate: 'Sep 5, 2024',
    slaDeadline: 'Dec 4, 2024',
    slaDaysLeft: 48,
    status: 'Pending Review',
    documents: [
      { name: 'Form_25_Application.pdf', status: 'Verified' },
      { name: 'GMP_Certificate.pdf', status: 'Verified' },
      { name: 'Plant_Master_File.pdf', status: 'Pending Review' },
      { name: 'Stability_Data.pdf', status: 'Verified' },
    ],
    location: 'MIDC Taloja, Navi Mumbai',
    projectSize: 'Medium (₹32 Cr)',
  },
  {
    id: 'APP-2024-1210',
    applicant: 'AutoParts Maharashtra',
    sector: 'Auto Components',
    approval: 'Factory License',
    submittedDate: 'Sep 8, 2024',
    slaDeadline: 'Nov 7, 2024',
    slaDaysLeft: 28,
    status: 'Pending Review',
    documents: [
      { name: 'Form_2_Application.pdf', status: 'Verified' },
      { name: 'Factory_Layout.pdf', status: 'Verified' },
      { name: 'Stability_Certificate.pdf', status: 'Flagged', issue: 'Architect signature missing' },
      { name: 'Worker_Roster.pdf', status: 'Verified' },
    ],
    location: 'MIDC Aurangabad',
    projectSize: 'Small (₹6 Cr)',
  },
];

// ---------- Inspection Schedule ----------
export const INSPECTIONS = [
  {
    id: 'INS-001',
    applicant: 'Sunrise Agro Foods Pvt. Ltd.',
    department: 'FSSAI',
    date: 'Oct 5, 2024',
    time: '10:00 AM',
    location: 'MIDC Chakan, Pune',
    status: 'Scheduled',
  },
  {
    id: 'INS-002',
    applicant: 'Sunrise Agro Foods Pvt. Ltd.',
    department: 'Fire & Emergency Services',
    date: 'Oct 7, 2024',
    time: '2:00 PM',
    location: 'MIDC Chakan, Pune',
    status: 'Scheduled',
  },
  {
    id: 'INS-003',
    applicant: 'GreenChem Industries',
    department: 'MPCB',
    date: 'Oct 10, 2024',
    time: '11:00 AM',
    location: 'MIDC Ambernath, Thane',
    status: 'Completed',
  },
];

// Bundled inspection suggestion
export const BUNDLED_INSPECTION = {
  applicant: 'Sunrise Agro Foods Pvt. Ltd.',
  suggestedDate: 'Oct 5, 2024',
  suggestedTime: '10:00 AM – 1:00 PM',
  departments: ['FSSAI', 'Fire & Emergency Services'],
  savings: 'Saves 1 additional site visit for the applicant',
  location: 'MIDC Chakan, Pune',
};

// ---------- Suggested Schemes ----------
export const SUGGESTED_SCHEMES = [
  {
    id: 'scheme-1',
    name: 'MSME Technology Upgrade Scheme',
    shortDesc: 'Capital subsidy up to 15% on eligible plant & machinery for MSMEs upgrading technology.',
    eligibility: 'Micro & Small enterprises in manufacturing',
    department: 'Ministry of MSME',
  },
  {
    id: 'scheme-2',
    name: 'Maharashtra Package Scheme of Incentives (PSI)',
    shortDesc: 'Tax incentives including SGST refund, stamp duty waiver, and electricity duty exemption for new units.',
    eligibility: 'New units in Group C, D, D+ areas',
    department: 'Directorate of Industries, Maharashtra',
  },
  {
    id: 'scheme-3',
    name: 'Credit Guarantee Fund (CGTMSE)',
    shortDesc: 'Collateral-free loans up to ₹5 Cr for MSEs through participating banks.',
    eligibility: 'Micro & Small enterprises without collateral',
    department: 'Ministry of MSME / SIDBI',
  },
  {
    id: 'scheme-4',
    name: 'DSEEI Skilling & Employment Subsidy',
    shortDesc: 'Financial support for skill development and employment generation when hiring local youth.',
    eligibility: 'Units expanding workforce by 10% or hiring 20+ local youth',
    department: 'Dept of Skill Development, Employment & Entrepreneurship',
  },
];

// ---------- RAG Chat Pre-scripted Responses ----------
export const RAG_RESPONSES = [
  {
    question: 'What approvals do I need to start a food processing unit in MIDC?',
    answer: 'To start a food processing unit in an MIDC area in Maharashtra, you will need the following primary approvals:\n\n1. **FSSAI License** (Food Safety & Standards Authority)\n2. **MPCB Consent to Establish** (Pollution Control Board)\n3. **Fire NOC** (Fire & Emergency Services)\n4. **Factory License** (Directorate of Industrial Safety & Health)\n5. **GST Registration** (CBIC)\n6. **Shop & Establishment License** (Municipal Corporation)\n\nAdditionally, if your unit is located in an MIDC plot, you will need an MIDC allotment letter and a water/electricity connection approval from MIDC.',
    citation: 'Source: FSSAI Regulation 2011, Maharashtra Factories Act 1948, MPCB Guidelines 2020',
    confidence: 'high',
  },
  {
    question: 'How long does MPCB consent typically take?',
    answer: 'The prescribed timeline for **MPCB Consent to Establish (CTE)** is **120 days** from the date of submission of a complete application, as per the government SLA. However, for units classified as **Green Category** (low pollution potential), the CTE can be processed within **30–45 days** through the online single-window system.\n\nFor **Orange and Red Category** industries, the process may take longer due to additional requirements like Environmental Impact Assessments and public hearings.',
    citation: 'Source: MPCB SOP for Consent Management, Circular dated March 2022 & EIA Notification 2006 (as amended)',
    confidence: 'high',
  },
  {
    question: 'Can I reuse documents from my previous FSSAI renewal?',
    answer: 'Yes, certain documents can be reused from previous submissions. Specifically:\n\n- **Building/Factory Layout** — Can be reused if no structural changes have been made\n- **Food Safety Management Plan** — Reusable if updated within the last year\n- **PAN/Aadhaar of Proprietor** — Always reusable\n\nHowever, **Water Test Reports** must be fresh (within 6 months), and any **inspection certificates** must be current.\n\n⚠️ **Note:** I am providing this guidance based on general FSSAI regulations. For your specific case, I recommend verifying with the regional FSSAI office, as requirements may vary by state directive.',
    citation: 'Source: FSSAI Guidance Note on Renewal Procedures, 2023',
    confidence: 'low',
    flagged: true,
    flagReason: 'Low confidence — state-specific variations may apply. Flagged for human review.',
  },
];

// ---------- Analytics Dashboard Data ----------
export const ANALYTICS_DATA = {
  approvalTimes: [
    { department: 'FSSAI', avgDays: 22, target: 30 },
    { department: 'MPCB', avgDays: 38, target: 45 },
    { department: 'Fire', avgDays: 14, target: 21 },
    { department: 'Factory', avgDays: 52, target: 60 },
    { department: 'PESO', avgDays: 55, target: 60 },
  ],
  bottlenecks: [
    { department: 'MPCB', pending: 42, overdue: 8, avgDelay: 12 },
    { department: 'FSSAI', pending: 28, overdue: 3, avgDelay: 4 },
    { department: 'Factory License', pending: 35, overdue: 5, avgDelay: 7 },
    { department: 'Fire NOC', pending: 15, overdue: 1, avgDelay: 2 },
    { department: 'PESO', pending: 12, overdue: 4, avgDelay: 15 },
  ],
  monthlyApplications: [
    { month: 'Apr', received: 45, processed: 38 },
    { month: 'May', received: 52, processed: 48 },
    { month: 'Jun', received: 61, processed: 55 },
    { month: 'Jul', received: 58, processed: 60 },
    { month: 'Aug', received: 72, processed: 65 },
    { month: 'Sep', received: 48, processed: 42 },
  ],
};
