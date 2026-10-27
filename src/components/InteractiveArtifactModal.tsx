import React, { useState, useMemo, useEffect } from 'react';
import { InteractiveArtifactId } from '../data/agencyData';
import { SKYLINE_WHATSAPP_NUMBER } from '../utils/architectEngine';
import { WhatsAppLogoIcon } from './BrandIcons';

interface InteractiveArtifactModalProps {
  artifactId: InteractiveArtifactId | null;
  onClose: () => void;
}

const ARTIFACT_TABS: { id: InteractiveArtifactId; label: string; badge: string }[] = [
  { id: '360-views', label: '360 Views (Spatial)', badge: 'SACHIN SAHU • LIVE' },
  { id: 'shadowbase-cdc', label: 'ShadowBase CDC', badge: 'SACHIN SAHU • KAFKA' },
  { id: 'gridweaver-iot', label: 'GridWeaver IoT', badge: 'SACHIN SAHU • LOOM' },
  { id: 'fileguard-security', label: 'FileGuard AI', badge: 'AASHIF KHAN • SHA-256' },
  { id: 'ai-career-mentor', label: 'AI Career Mentor', badge: 'AASHIF KHAN • AI' },
  { id: 'socialite-network', label: 'Socialite Studio', badge: 'AASHIF KHAN • FEED' },
  { id: 'aa-chocolates-d2c', label: 'A&A Chocolates D2C', badge: 'AASHIF KHAN • D2C' },
  { id: 'finvantage-saas', label: 'FinVantage GST SaaS', badge: 'FINTECH ENGINE' },
  { id: 'auracare-local', label: 'AuraCare Map Pack', badge: 'CLINIC ENGINE' },
  { id: 'nexaprop-crm', label: 'NexaProp CRM', badge: 'PROPTECH CRM' },
  { id: 'searchpulse-seo', label: 'SearchPulse SEO', badge: 'GEO / AI SEO' },
];

type RoomKey = 'Living Room' | 'Master Suite' | 'Commercial Lobby' | 'Sky Deck';

interface SpatialRoomSpec {
  id: RoomKey;
  subtitle: string;
  elevation: string;
  lightingLux: string;
  defaultYaw: number;
  floorAreaSqFt: number;
  ambientTemp: string;
  hotspots: {
    id: string;
    label: string;
    coord: string;
    materialSpec: string;
    acoustics: string;
  }[];
}

const SPATIAL_ROOMS: Record<RoomKey, SpatialRoomSpec> = {
  'Living Room': {
    id: 'Living Room',
    subtitle: 'Double-Height Italian Marble Atrium • East-Facing Floor-to-Ceiling Glazing',
    elevation: '+142.5m Above Sea Level (18th Floor)',
    lightingLux: '680 Lux Natural Daylight • DALI Smart Dimming',
    defaultYaw: 128,
    floorAreaSqFt: 1180,
    ambientTemp: '22.5°CVRV Zoned',
    hotspots: [
      {
        id: 'hs-marble',
        label: 'Statuario Bookmatched Flooring',
        coord: 'Yaw 115° • Pitch -18°',
        materialSpec: '18mm Imported Italian Statuario Marble with diamond-sealed anti-stain coat',
        acoustics: 'STC 58 Impact Isolation Underlayment',
      },
      {
        id: 'hs-glazing',
        label: 'Low-E Double Glazed Curtain Wall',
        coord: 'Yaw 142° • Pitch +4°',
        materialSpec: 'Saint-Gobain Solar Control Double Glazed Unit (28mm Argon-filled)',
        acoustics: '42 dB External Traffic Noise Attenuation',
      },
      {
        id: 'hs-automation',
        label: 'KNX Touch Scene Controller',
        coord: 'Yaw 88° • Pitch 0°',
        materialSpec: 'Brushed Anodized Platinum 6-Gang Scene Switch + WhatsApp Concierge Link',
        acoustics: 'Zero-latency local KNX bus',
      },
    ],
  },
  'Master Suite': {
    id: 'Master Suite',
    subtitle: 'Corner Sanctuary with Walk-In Glass Wardrobe & Private Plunge Deck',
    elevation: '+146.0m Above Sea Level (19th Floor Duplex)',
    lightingLux: '320 Lux Warm Circadian 2700K Profile',
    defaultYaw: 214,
    floorAreaSqFt: 840,
    ambientTemp: '21.0°C Whisper Mode',
    hotspots: [
      {
        id: 'hs-oak',
        label: 'Engineered Smoked Chevron Timber',
        coord: 'Yaw 205° • Pitch -22°',
        materialSpec: '15mm European White Oak with matte brushed UV lacquer',
        acoustics: 'Warm acoustic absorption αw = 0.25',
      },
      {
        id: 'hs-wardrobe',
        label: 'Fluted Smoke-Glass Walk-In',
        coord: 'Yaw 248° • Pitch +2°',
        materialSpec: 'CNC-milled charcoal aluminum frame with integrated 4000K motion LED strips',
        acoustics: 'Soft-close pneumatic magnetic dampers',
      },
      {
        id: 'hs-bath',
        label: 'Thermostatic Rain Spa Suite',
        coord: 'Yaw 176° • Pitch -5°',
        materialSpec: 'Hansgrohe Axor Brushed Platinum PVD fixtures + heated anti-fog mirror',
        acoustics: 'Insulated silent drainage stack',
      },
    ],
  },
  'Commercial Lobby': {
    id: 'Commercial Lobby',
    subtitle: 'Grade-A Enterprise Arrival Concourse • Biometric Turnstiles & Concierge',
    elevation: '+0.0m Ground Plaza Level',
    lightingLux: '850 Lux Architectural Linear Louvre Grid',
    defaultYaw: 45,
    floorAreaSqFt: 4600,
    ambientTemp: '23.0°C High-CFM Fresh Air',
    hotspots: [
      {
        id: 'hs-turnstile',
        label: 'NFC + QR Fast-Lane Turnstiles',
        coord: 'Yaw 42° • Pitch -8°',
        materialSpec: 'Sub-200ms visitor pass verification synced with WhatsApp pre-registration',
        acoustics: 'Brushless servo motor barrier wings',
      },
      {
        id: 'hs-elevator',
        label: 'Destination Dispatch 6m/s Lifts',
        coord: 'Yaw 76° • Pitch +6°',
        materialSpec: '8-Car AI-grouped high-speed elevator bank with regenerative drives',
        acoustics: 'Average wait time < 19 seconds at peak load',
      },
      {
        id: 'hs-wall',
        label: 'Brushed Titanium Acoustic Baffles',
        coord: 'Yaw 12° • Pitch +24°',
        materialSpec: 'Perforated anodized metal panels with Rockwool backing',
        acoustics: 'RT60 reverberation controlled to 0.55s',
      },
    ],
  },
  'Sky Deck': {
    id: 'Sky Deck',
    subtitle: '360° Rooftop Infinity Lounge & Executive Helipad Observation Terrace',
    elevation: '+198.0m Crown Level (42nd Floor)',
    lightingLux: '140 Lux Starlight Perimeter Grazing',
    defaultYaw: 310,
    floorAreaSqFt: 3200,
    ambientTemp: '19.5°C Open Breeze',
    hotspots: [
      {
        id: 'hs-infinity',
        label: 'Temperature-Controlled Infinity Edge',
        coord: 'Yaw 318° • Pitch -12°',
        materialSpec: '25m cantilevered lap pool with laminated 36mm structural acrylic viewing wall',
        acoustics: 'Submerged laminar overflow weir',
      },
      {
        id: 'hs-cabana',
        label: 'Private Founder Cabana Pod',
        coord: 'Yaw 280° • Pitch 0°',
        materialSpec: 'Weatherproof marine-grade slate louvers with integrated 10Gbps Wi-Fi 7 node',
        acoustics: 'Directional outdoor acoustic array',
      },
      {
        id: 'hs-horizon',
        label: 'Indore Super Corridor Skyline Vector',
        coord: 'Yaw 345° • Pitch +5°',
        materialSpec: 'Unobstructed 18km panoramic sightline toward IT Park & Airport corridor',
        acoustics: 'Wind-baffled glass parapet',
      },
    ],
  },
};

const MIGRATION_SCRIPTS = [
  {
    id: 'mig-orders-col',
    label: 'ALTER TABLE orders ADD settlement_hash',
    sql: `ALTER TABLE production.orders \n  ADD COLUMN settlement_hash VARCHAR(64) DEFAULT NULL,\n  ADD COLUMN reconciliation_state VARCHAR(24) NOT NULL DEFAULT 'PENDING';`,
    rowsAffected: '4,820,400 rows',
    legacyLockMs: '18,400 ms (Table Lock)',
    shadowLockMs: '0 ms (Debezium Shadow Replay)',
    parityRate: '100.000%',
    logs: [
      '[00:00.012] Testcontainers: Spawning ephemeral PostgreSQL 16.3 shadow container (id: sb-pg16-94a)...',
      '[00:00.184] SchemaEngine: Applied DDL migration on shadow clone in 14ms (0 active client locks on primary).',
      '[00:00.410] DebeziumCDC: Subscribed to WAL slot `skyline_orders_cdc_slot` @ LSN 0/1A8F9B0.',
      '[00:00.890] KafkaRouter: Replaying 14,850 live INSERT/UPDATE events/sec to topic `shadow.orders.v2`...',
      '[00:01.320] ParityVerifier: Audited 4,820,400 row SHA-256 checksums -> 0 drift, 0 dropped mutations.',
      '[00:01.450] CutoverGate: READY FOR ATOMIC SUB-MILLISECOND POINTER SWAP ✓',
    ],
  },
  {
    id: 'mig-ledger-idx',
    label: 'CREATE INDEX CONCURRENTLY idx_ledger_tenant',
    sql: `CREATE INDEX CONCURRENTLY idx_ledger_tenant_created \n  ON production.ledger_entries (tenant_id, created_at DESC) \n  INCLUDE (amount_paise, status);`,
    rowsAffected: '12,450,000 rows',
    legacyLockMs: '42,900 ms (Write Stall)',
    shadowLockMs: '0 ms (Shadow Index Build)',
    parityRate: '99.999%',
    logs: [
      '[00:00.008] Testcontainers: Provisioned isolated NVMe storage volume for 12.4M ledger rows...',
      '[00:00.220] IndexBuilder: Building B-Tree composite covering index on shadow instance...',
      '[00:00.640] DebeziumCDC: Streaming live payment ledger deltas via Kafka partition group `ledger-sync-01`.',
      '[00:01.110] QueryPlanner: Verified Index-Only Scan latency dropped from 148.2ms -> 1.4ms (99.05% faster).',
      '[00:01.290] ParityVerifier: Checksum tree root `0x9f84...e21b` matches primary & shadow 100%.',
      '[00:01.340] CutoverGate: ZERO LOCK CONTENTION VERIFIED ✓',
    ],
  },
  {
    id: 'mig-payments-part',
    label: 'PARTITION TABLE payments BY RANGE (fiscal_quarter)',
    sql: `ALTER TABLE production.payments_monolith \n  ATTACH PARTITION payments_fy26_q1 \n  FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');`,
    rowsAffected: '28,900,000 rows',
    legacyLockMs: '64,200 ms (AccessExclusiveLock)',
    shadowLockMs: '0 ms (Dual-Stream Partition Cutover)',
    parityRate: '100.000%',
    logs: [
      '[00:00.015] Testcontainers: Initialized partitioned target topology across 8 range shards...',
      '[00:00.305] DebeziumCDC: Routing high-throughput UPI webhook writes to dual Kafka topics...',
      '[00:00.780] BackfillWorker: Completed parallel keyset batch copy (50,000 rows/batch, 0% CPU spike on primary).',
      '[00:01.190] ParityVerifier: Reconciled 28.9M records across all fiscal partitions with zero orphan keys.',
      '[00:01.380] CutoverGate: PARTITION ROUTING PROMOTED WITH 0ms DOWNTIME ✓',
    ],
  },
] as const;

const SAMPLE_DOCUMENTS = {
  NDA: {
    label: 'Mutual Enterprise NDA',
    anchorTx: '0x8f4e92c1b7a04d3e91a5c62f8b01d4e79c3a21f0 (Polygon Mainnet Block #61940211)',
    timestamp: '2026-02-18 14:22:09 UTC • OriginStamp Verified',
    content:
      'SKYLINE-NDA-2026-INDORE: Mutual Non-Disclosure Agreement between SkyLine Digital Agency (Sachin Sahu & Aashif Khan) and Enterprise Client. All proprietary source code, Kafka schemas, and zero-downtime migration blueprints remain strictly confidential.',
  },
  'Property Deed': {
    label: 'Commercial Title Deed #402',
    anchorTx: '0x3c91a04b7e21d8f56019c4a2e8b7d103f5a9c812 (Ethereum L1 Block #21849104)',
    timestamp: '2026-03-04 09:45:51 UTC • OriginStamp Verified',
    content:
      'DEED-SUPER-CORRIDOR-402: Commercial Plot #14, Vijay Nagar IT Corridor, Indore MP. Registered Carpet Area: 4,600 Sq.Ft. Clear Title Verified. Encumbrance Status: ZERO LIENS.',
  },
  Invoice: {
    label: 'Enterprise Milestone Invoice #INV-908',
    anchorTx: '0x7a12f90e4c83b6d21508e9f3a4c7b120d9e4a518 (Bitcoin OP_RETURN #884120)',
    timestamp: '2026-03-19 17:10:33 UTC • OriginStamp Verified',
    content:
      'INVOICE #SKY-2026-908 | Client: Apex Logistics Ltd | Deliverable: Custom Next.js 15 + Spring Boot Kafka Architecture | Net Settlement: INR 2,40,000 (Inclusive of 18% GST) | Status: PAID IN FULL.',
  },
} as const;

type CareerLevel = 'Beginner' | 'B.Tech CSE' | 'Working Dev';
type CareerRole = 'Full-Stack Architect' | 'AI Engineer' | 'Backend Java/Kafka' | 'Cybersecurity';

interface CareerRoadmapData {
  weeks: { week: string; title: string; deliverable: string }[];
  skills: { name: string; current: number; target: number }[];
  interviewQuestion: string;
  modelAnswer: string;
}

const CAREER_MATRIX: Record<CareerRole, CareerRoadmapData> = {
  'Full-Stack Architect': {
    weeks: [
      {
        week: 'Weeks 1–3',
        title: 'Next.js 15 App Router, TypeScript Strict Mode & Edge Caching',
        deliverable: 'Ship a sub-100ms SSR storefront with zero layout shift (CLS 0.00).',
      },
      {
        week: 'Weeks 4–6',
        title: 'PostgreSQL Indexing, Prisma/Drizzle ORM & Redis Rate-Limiting',
        deliverable: 'Build an idempotent multi-tenant booking API handling 2,500 req/sec.',
      },
      {
        week: 'Weeks 7–10',
        title: 'Docker CI/CD, Playwright E2E Verification & AWS/Cloudflare Deployment',
        deliverable: 'Deploy production SaaS with automated zero-downtime rollback gates.',
      },
    ],
    skills: [
      { name: 'React 19 / Next.js 15 SSR', current: 45, target: 96 },
      { name: 'PostgreSQL Query Tuning', current: 35, target: 92 },
      { name: 'System Design & Caching', current: 30, target: 90 },
      { name: 'Automated E2E Testing', current: 40, target: 94 },
    ],
    interviewQuestion:
      'How do you prevent double-charging a customer when a mobile user double-taps the Pay button on an unstable 4G connection?',
    modelAnswer:
      'Generate a deterministic client-side Idempotency-Key (UUIDv5 or SHA-256 of user + cart + timestamp window) and enforce an atomic UNIQUE constraint + Redis lock on the backend before calling Razorpay/Stripe.',
  },
  'AI Engineer': {
    weeks: [
      {
        week: 'Weeks 1–3',
        title: 'Deterministic Prompt Engineering, Structured JSON Outputs & Token Budgeting',
        deliverable: 'Build a schema-validated AI extraction pipeline with 99.4% parse reliability.',
      },
      {
        week: 'Weeks 4–6',
        title: 'Hybrid RAG (pgvector + BM25 Lexical Search) & Reranking Pipelines',
        deliverable: 'Index 50,000 enterprise PDFs with sub-400ms grounded citation retrieval.',
      },
      {
        week: 'Weeks 7–10',
        title: 'Agentic Tool Calling, Guardrails & WhatsApp Cloud Webhook Orchestration',
        deliverable: 'Launch an autonomous AI triage agent with human-in-the-loop escalation.',
      },
    ],
    skills: [
      { name: 'Hybrid Vector + BM25 RAG', current: 30, target: 95 },
      { name: 'Structured Tool Calling', current: 40, target: 94 },
      { name: 'Eval Benchmarks & Guardrails', current: 25, target: 90 },
      { name: 'Low-Latency Streaming APIs', current: 45, target: 92 },
    ],
    interviewQuestion:
      'Why does pure vector cosine similarity fail on exact SKU codes or legal clause numbers, and how do you fix it?',
    modelAnswer:
      'Dense embeddings compress exact alphanumeric tokens. Combine dense pgvector similarity with sparse BM25 keyword search using Reciprocal Rank Fusion (RRF) and a cross-encoder reranker.',
  },
  'Backend Java/Kafka': {
    weeks: [
      {
        week: 'Weeks 1–3',
        title: 'Java 21 Virtual Threads (Project Loom) & Spring Boot 3.3 High-Concurrency',
        deliverable: 'Benchmark 50,000 concurrent non-blocking socket connections on a single JVM.',
      },
      {
        week: 'Weeks 4–6',
        title: 'Apache Kafka Partitioning, Consumer Groups & Transactional Outbox Pattern',
        deliverable: 'Implement zero-data-loss event streaming between order and inventory services.',
      },
      {
        week: 'Weeks 7–10',
        title: 'Debezium CDC, Docker Testcontainers & Shadow Schema Cutovers',
        deliverable: 'Execute a live 5M-row PostgreSQL schema migration with 0ms table lock.',
      },
    ],
    skills: [
      { name: 'Java 21 Loom Virtual Threads', current: 35, target: 96 },
      { name: 'Kafka + Debezium CDC', current: 25, target: 94 },
      { name: 'Spring Boot Microservices', current: 45, target: 95 },
      { name: 'Testcontainers Integration', current: 30, target: 92 },
    ],
    interviewQuestion:
      'How do you guarantee that a PostgreSQL row update and a Kafka event publish both succeed or both fail without distributed 2-Phase Commit?',
    modelAnswer:
      'Use the Transactional Outbox Pattern with Debezium CDC: write the business mutation and the outbox event in the same local ACID database transaction, then tail the PostgreSQL WAL into Kafka.',
  },
  Cybersecurity: {
    weeks: [
      {
        week: 'Weeks 1–3',
        title: 'Cryptographic Hashing (SHA-256, HMAC), JWT Rotation & Zero-Trust RBAC',
        deliverable: 'Build a tamper-evident document verification API with Merkle-tree receipts.',
      },
      {
        week: 'Weeks 4–6',
        title: 'OWASP Top 10 Hardening, SQLi/XSS Sanitization & Rate-Limit Defense',
        deliverable: 'Audit and patch a vulnerable financial web app with automated regression tests.',
      },
      {
        week: 'Weeks 7–10',
        title: 'Blockchain Timestamp Anchoring (OriginStamp) & Immutable Audit Logs',
        deliverable: 'Ship an enterprise compliance vault with real-time 1-character tamper detection.',
      },
    ],
    skills: [
      { name: 'SHA-256 & Merkle Proofs', current: 40, target: 97 },
      { name: 'Zero-Trust Auth & RBAC', current: 35, target: 94 },
      { name: 'OWASP API Hardening', current: 45, target: 95 },
      { name: 'Automated Security Audits', current: 30, target: 91 },
    ],
    interviewQuestion:
      'Why is storing document hashes only inside the same PostgreSQL database insufficient for legal non-repudiation?',
    modelAnswer:
      'A compromised database admin credential could rewrite both the document and its stored hash. Anchoring the Merkle root to an external immutable ledger (via OriginStamp) proves the hash existed at a specific timestamp.',
  },
};

export const InteractiveArtifactModal: React.FC<InteractiveArtifactModalProps> = ({
  artifactId,
  onClose,
}) => {
  const [selectedTab, setSelectedTab] = useState<InteractiveArtifactId | null>(null);
  useEffect(() => {
    setSelectedTab(null);
  }, [artifactId]);
  const activeId: InteractiveArtifactId | null = selectedTab ?? artifactId;

  // 1. 360 Views Spatial Real Estate Platform state (Sachin Sahu)
  const [selectedRoom, setSelectedRoom] = useState<RoomKey>('Living Room');
  const [compassYaw, setCompassYaw] = useState<number>(128);
  const [fovLens, setFovLens] = useState<number>(90);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('hs-marble');
  const [spatialLeadName, setSpatialLeadName] = useState<string>('Rajesh Singhania');
  const [spatialLeadPhone, setSpatialLeadPhone] = useState<string>('+91 98260 44112');
  const [spatialLeadSent, setSpatialLeadSent] = useState<boolean>(false);

  const currentRoomSpec = SPATIAL_ROOMS[selectedRoom];
  const activeHotspot =
    currentRoomSpec.hotspots.find((h) => h.id === selectedHotspotId) ||
    currentRoomSpec.hotspots[0];

  const handleSelectRoom = (room: RoomKey) => {
    setSelectedRoom(room);
    setCompassYaw(SPATIAL_ROOMS[room].defaultYaw);
    setSelectedHotspotId(SPATIAL_ROOMS[room].hotspots[0].id);
  };

  // 2. ShadowBase Zero-Downtime SQL Migration Sandbox state (Sachin Sahu)
  const [selectedMigrationIdx, setSelectedMigrationIdx] = useState<number>(0);
  const [cdcReplayCount, setCdcReplayCount] = useState<number>(1);
  const [cdcRunning, setCdcRunning] = useState<boolean>(false);
  const activeMigration = MIGRATION_SCRIPTS[selectedMigrationIdx];

  const triggerCdcReplay = () => {
    setCdcRunning(true);
    setCdcReplayCount((c) => c + 1);
    window.setTimeout(() => {
      setCdcRunning(false);
    }, 350);
  };

  // 3. GridWeaver Java 21 Loom IoT Microgrid Engine state (Sachin Sahu)
  const [iotNodes, setIotNodes] = useState<
    { id: string; zone: string; state: 'CHARGING' | 'DISCHARGING' | 'IDLE' | 'FAULT'; loadKw: number }[]
  >([
    { id: 'NODE-IND-01', zone: 'Pithampur Solar Array A', state: 'CHARGING', loadKw: 480 },
    { id: 'NODE-IND-02', zone: 'Vijay Nagar Substation B', state: 'DISCHARGING', loadKw: 620 },
    { id: 'NODE-IND-03', zone: 'Super Corridor EV Hub', state: 'IDLE', loadKw: 195 },
    { id: 'NODE-IND-04', zone: 'Sanwer Industrial Feeder', state: 'CHARGING', loadKw: 540 },
  ]);
  const [loomSpikeActive, setLoomSpikeActive] = useState<boolean>(false);
  const [virtualThreadCount, setVirtualThreadCount] = useState<number>(12400);

  const setNodeStateExplicit = (
    idx: number,
    nextState: 'CHARGING' | 'DISCHARGING' | 'IDLE' | 'FAULT'
  ) => {
    setIotNodes((prev) =>
      prev.map((node, i) => {
        if (i !== idx) return node;
        const loadMap = {
          CHARGING: 510 + idx * 45,
          DISCHARGING: 680 + idx * 55,
          IDLE: 110 + idx * 15,
          FAULT: 0,
        };
        return {
          ...node,
          state: nextState,
          loadKw: loadMap[nextState],
        };
      })
    );
  };

  const triggerLoomSpike = () => {
    setLoomSpikeActive((prev) => {
      const next = !prev;
      setVirtualThreadCount(next ? 50000 : 12400);
      return next;
    });
  };

  const totalMicrogridKw = useMemo(
    () => iotNodes.reduce((acc, n) => acc + n.loadKw, 0),
    [iotNodes]
  );

  // 4. FileGuard AI SHA-256 & Blockchain Verifier state (Aashif Khan)
  const [selectedSampleDoc, setSelectedSampleDoc] = useState<keyof typeof SAMPLE_DOCUMENTS>('NDA');
  const [docPayload, setDocPayload] = useState<string>(SAMPLE_DOCUMENTS.NDA.content);
  const [tamperCheckInput, setTamperCheckInput] = useState<string>(SAMPLE_DOCUMENTS.NDA.content);

  const handleSelectSampleDoc = (docKey: keyof typeof SAMPLE_DOCUMENTS) => {
    setSelectedSampleDoc(docKey);
    setDocPayload(SAMPLE_DOCUMENTS[docKey].content);
    setTamperCheckInput(SAMPLE_DOCUMENTS[docKey].content);
  };

  const computeDeterministicHash = (text: string): string => {
    let h1 = 0xdeadbeef ^ text.length;
    let h2 = 0x41c6ce57 ^ text.length;
    let h3 = 0x9e3779b9 ^ text.length;
    let h4 = 0x85ebca6b ^ text.length;
    for (let i = 0; i < text.length; i++) {
      const ch = text.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
      h3 = Math.imul(h3 ^ (ch << 3), 2246822507);
      h4 = Math.imul(h4 ^ (ch << 5), 3266489909);
    }
    const p1 = (h1 >>> 0).toString(16).padStart(8, '0');
    const p2 = (h2 >>> 0).toString(16).padStart(8, '0');
    const p3 = (h3 >>> 0).toString(16).padStart(8, '0');
    const p4 = (h4 >>> 0).toString(16).padStart(8, '0');
    return `e3b0c442${p1}${p2}${p3}${p4}98fc1c149afbf4c8996fb924`;
  };

  const shaHashOriginal = useMemo(() => computeDeterministicHash(docPayload), [docPayload]);
  const shaHashVerify = useMemo(() => computeDeterministicHash(tamperCheckInput), [tamperCheckInput]);
  const isSignatureMatch = shaHashOriginal === shaHashVerify;

  // 5. AI Career Guide & Mentor state (Aashif Khan)
  const [careerLevel, setCareerLevel] = useState<CareerLevel>('B.Tech CSE');
  const [targetRole, setTargetRole] = useState<CareerRole>('Full-Stack Architect');
  const [showInterviewAnswer, setShowInterviewAnswer] = useState<boolean>(false);
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({
    'Weeks 1–3': true,
  });

  const activeCareerData = CAREER_MATRIX[targetRole];
  const levelBonus =
    careerLevel === 'Working Dev' ? 22 : careerLevel === 'B.Tech CSE' ? 10 : 0;

  // 6. Socialite Real-Time Creator & Community Platform state (Aashif Khan)
  const [socialChannel, setSocialChannel] = useState<
    'All Channels' | 'Full-Stack Devs' | 'AI Builders' | 'Design Systems'
  >('All Channels');
  const [newPostDraft, setNewPostDraft] = useState<string>('');
  const [socialPosts, setSocialPosts] = useState<
    {
      id: string;
      author: string;
      handle: string;
      channel: 'Full-Stack Devs' | 'AI Builders' | 'Design Systems';
      content: string;
      likes: number;
      comments: number;
      liked: boolean;
      timestamp: string;
    }[]
  >([
    {
      id: 'post-1',
      author: 'Aashif Khan',
      handle: '@aashif_architect',
      channel: 'Full-Stack Devs',
      content:
        'Just shipped our sub-100ms Next.js 15 + WhatsApp Cloud CRM architecture from Indore! Optimistic UI updates cut perceived feed latency to <18ms.',
      likes: 148,
      comments: 34,
      liked: true,
      timestamp: '2m ago',
    },
    {
      id: 'post-2',
      author: 'Sachin Sahu',
      handle: '@sachin_systems',
      channel: 'AI Builders',
      content:
        'Java 21 Virtual Threads + Kafka CDC pipeline benchmarked at 50,000 concurrent telemetry sockets with zero thread-pool exhaustion.',
      likes: 212,
      comments: 49,
      liked: false,
      timestamp: '14m ago',
    },
    {
      id: 'post-3',
      author: 'Riya Deshmukh',
      handle: '@riya_uiux',
      channel: 'Design Systems',
      content:
        'Monochromatic brushed-platinum tokens + zero-CLS typography scales conversion velocity by 3.4x on mobile viewports.',
      likes: 96,
      comments: 19,
      liked: false,
      timestamp: '41m ago',
    },
  ]);

  const handlePublishPost = () => {
    const trimmed = newPostDraft.trim();
    if (!trimmed) return;
    const targetChan =
      socialChannel === 'All Channels' ? 'Full-Stack Devs' : socialChannel;
    setSocialPosts((prev) => [
      {
        id: `post-${Date.now()}`,
        author: 'You (Live Sandbox Creator)',
        handle: '@creator_indore',
        channel: targetChan,
        content: trimmed,
        likes: 1,
        comments: 0,
        liked: true,
        timestamp: 'Just now',
      },
      ...prev,
    ]);
    setNewPostDraft('');
  };

  const togglePostLike = (postId: string) => {
    setSocialPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const incrementPostComment = (postId: string) => {
    setSocialPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: p.comments + 1 } : p))
    );
  };

  const filteredPosts = useMemo(
    () =>
      socialChannel === 'All Channels'
        ? socialPosts
        : socialPosts.filter((p) => p.channel === socialChannel),
    [socialChannel, socialPosts]
  );

  // 7. A&A Chocolates D2C Customizer & Meta CAPI Funnel state (Aashif Khan)
  const [boxSize, setBoxSize] = useState<6 | 12 | 24>(12);
  const [flavorCounts, setFlavorCounts] = useState<{
    'Belgian Dark Truffle': number;
    'Roasted Hazelnut': number;
    'Almond Praline': number;
    'Cranberry Crunch': number;
  }>({
    'Belgian Dark Truffle': 4,
    'Roasted Hazelnut': 3,
    'Almond Praline': 3,
    'Cranberry Crunch': 2,
  });
  const [giftNote, setGiftNote] = useState('Happy Diwali & Warm Wishes — From Indore!');
  const [upiMethod, setUpiMethod] = useState<'GPay' | 'PhonePe'>('GPay');
  const [checkoutDone, setCheckoutDone] = useState<boolean>(false);

  const adjustFlavorCount = (
    flavor: keyof typeof flavorCounts,
    delta: number
  ) => {
    setFlavorCounts((prev) => ({
      ...prev,
      [flavor]: Math.max(0, prev[flavor] + delta),
    }));
    setCheckoutDone(false);
  };

  const totalSelectedPieces = useMemo(
    () =>
      Object.values(flavorCounts).reduce((acc, count) => acc + count, 0),
    [flavorCounts]
  );

  const d2cPricing = useMemo(() => {
    const baseBoxPrice = boxSize === 6 ? 690 : boxSize === 12 ? 1290 : 2390;
    const extraPieces = Math.max(0, totalSelectedPieces - boxSize);
    const addonCost = extraPieces * 95;
    const subtotal = baseBoxPrice + addonCost;
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;
    return { baseBoxPrice, extraPieces, addonCost, subtotal, gst, total };
  }, [boxSize, totalSelectedPieces]);

  // 8. FinVantage SaaS GST state
  const [invoiceBaseAmount, setInvoiceBaseAmount] = useState<number>(85000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInterState, setIsInterState] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>('Malwa Precision Gears Pvt. Ltd.');

  const gstCalculation = useMemo(() => {
    const taxTotal = Math.round((invoiceBaseAmount * gstRate) / 100);
    const cgst = isInterState ? 0 : Math.round(taxTotal / 2);
    const sgst = isInterState ? 0 : taxTotal - cgst;
    const igst = isInterState ? taxTotal : 0;
    const grandTotal = invoiceBaseAmount + taxTotal;
    return { taxTotal, cgst, sgst, igst, grandTotal };
  }, [invoiceBaseAmount, gstRate, isInterState]);

  // 9. AuraCare Clinic state
  const [selectedBranch, setSelectedBranch] = useState<string>('Vijay Nagar Flagship Clinic');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('Dr. Ananya Verma (Dermatology)');
  const [selectedSlot, setSelectedSlot] = useState<string>('05:30 PM Today');
  const [patientPhone, setPatientPhone] = useState<string>('+91 98260 11223');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // 10. NexaProp CRM state
  const [propertyBudgetLakhs, setPropertyBudgetLakhs] = useState<number>(125);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [selectedUnit, setSelectedUnit] = useState<string>('Tower B • Unit 1402 (3BHK Sky Deck)');
  const [visitStage, setVisitStage] = useState<'New Inquiry' | 'Site Visit Scheduled' | 'Token Paid'>(
    'Site Visit Scheduled'
  );

  const emiSummary = useMemo(() => {
    const principalLakhs = propertyBudgetLakhs * (1 - downPaymentPercent / 100);
    const monthlyRate = 8.5 / 12 / 100;
    const months = 240; // 20 years
    const emiLakhs =
      (principalLakhs * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const monthlyEmiInr = Math.round(emiLakhs * 100000);
    return {
      loanAmountLakhs: principalLakhs.toFixed(1),
      monthlyEmiInr: monthlyEmiInr.toLocaleString('en-IN'),
    };
  }, [propertyBudgetLakhs, downPaymentPercent]);

  // 11. SearchPulse SEO / GEO state
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(28000);
  const [conversionRate, setConversionRate] = useState<number>(3.4);
  const [avgDealInr, setAvgDealInr] = useState<number>(18500);

  const seoProjection = useMemo(() => {
    const monthlyLeads = Math.round((monthlyTraffic * conversionRate) / 100);
    const qualifiedDeals = Math.max(1, Math.round(monthlyLeads * 0.18));
    const projectedRevenue = qualifiedDeals * avgDealInr;
    return {
      monthlyLeads,
      qualifiedDeals,
      projectedRevenue: projectedRevenue.toLocaleString('en-IN'),
    };
  }, [monthlyTraffic, conversionRate, avgDealInr]);

  if (!artifactId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="artifact-modal-title"
    >
      <div className="surface-glass-heavy w-full max-w-6xl rounded-3xl border border-[var(--border-metallic)] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header + Multi-Artifact Switcher */}
        <div className="px-5 py-4 border-b border-[var(--border-hairline)] flex flex-col gap-3 bg-[var(--bg-elevated)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <h2
                id="artifact-modal-title"
                className="font-mono-tech text-xs sm:text-sm uppercase tracking-wider font-bold text-[var(--text-primary)]"
              >
                SKYLINE LIVE INTERACTIVE SANDBOX • REAL WORKING WEB APPLICATION PROTOTYPE
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-full surface-card text-xs font-mono-tech font-bold text-[var(--text-primary)] hover:opacity-80 cursor-pointer"
            >
              ✕ ESC / CLOSE
            </button>
          </div>

          {/* Interactive Switcher Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {ARTIFACT_TABS.map((tab) => {
              const isCurrent = activeId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl font-mono-tech text-[11px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrent
                      ? 'btn-platinum-primary font-bold shadow-sm'
                      : 'surface-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="opacity-70 text-[9px]">[{tab.badge}]</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Sandbox Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-[var(--text-primary)]">
          {/* 1. 360 VIEWS (SACHIN SAHU — REAL ESTATE SPATIAL PLATFORM) */}
          {activeId === '360-views' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                    SACHIN SAHU • FOUNDER &amp; CEO • SPATIAL WEBGL PROPTECH ENGINE
                  </span>
                  <a
                    href="https://360views.services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl btn-platinum-primary font-mono-tech text-[11px] font-bold inline-flex items-center gap-1.5"
                  >
                    <span>OPEN LIVE PRODUCTION SITE: 360views.services</span>
                    <span>↗</span>
                  </a>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  360 Views — Interactive Spatial Room Explorer &amp; Hotspot Engine
                </h3>

                {/* Room Switcher Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(SPATIAL_ROOMS) as RoomKey[]).map((room) => (
                    <button
                      key={room}
                      type="button"
                      onClick={() => handleSelectRoom(room)}
                      className={`px-3 py-2.5 rounded-xl font-mono-tech text-xs font-bold cursor-pointer transition-all ${
                        selectedRoom === room ? 'btn-platinum-primary' : 'surface-elevated'
                      }`}
                    >
                      {room}
                    </button>
                  ))}
                </div>

                {/* Simulated 360 Spatial Viewport Frame */}
                <div className="p-5 rounded-2xl surface-elevated border border-[var(--border-metallic)] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-3">
                    <div>
                      <div className="font-mono-tech text-[10px] uppercase text-[#25D366] font-bold">
                        LIVE SPATIAL STREAM • {selectedRoom.toUpperCase()} ({currentRoomSpec.floorAreaSqFt} SQ.FT.)
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {currentRoomSpec.subtitle}
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-lg surface-card font-mono-tech text-[11px] font-bold">
                      COMPASS YAW: {compassYaw}° • FOV: {fovLens}°
                    </div>
                  </div>

                  {/* Compass Yaw & FOV Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                        360° COMPASS PANORAMA YAW ({compassYaw}°)
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        step={1}
                        value={compassYaw}
                        onChange={(e) => setCompassYaw(Number(e.target.value))}
                        className="w-full accent-zinc-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                        CAMERA FIELD OF VIEW LENS ({fovLens}° WIDE)
                      </label>
                      <div className="flex gap-1.5">
                        {[75, 90, 105, 120].map((fov) => (
                          <button
                            key={fov}
                            type="button"
                            onClick={() => setFovLens(fov)}
                            className={`flex-1 py-1.5 rounded-lg font-mono-tech text-xs font-bold cursor-pointer ${
                              fovLens === fov ? 'btn-platinum-primary' : 'surface-card'
                            }`}
                          >
                            {fov}°
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spatial Hotspots Selector */}
                  <div className="space-y-2">
                    <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                      CLICK SPATIAL HOTSPOT PIN TO INSPECT ARCHITECTURAL SPEC:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {currentRoomSpec.hotspots.map((hs) => (
                        <button
                          key={hs.id}
                          type="button"
                          onClick={() => setSelectedHotspotId(hs.id)}
                          className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                            activeHotspot.id === hs.id
                              ? 'btn-platinum-primary border-transparent'
                              : 'surface-card border-[var(--border-hairline)]'
                          }`}
                        >
                          <div className="font-mono-tech text-[10px] opacity-75">◉ {hs.coord}</div>
                          <div className="font-display text-xs font-bold mt-1">{hs.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Hotspot Telemetry Card */}
                  <div className="p-3.5 rounded-xl surface-card border border-[var(--border-hairline)] font-mono-tech text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text-primary)]">
                        SELECTED HOTSPOT: {activeHotspot.label}
                      </span>
                      <span className="text-[10px] text-[#25D366] font-bold">
                        {currentRoomSpec.elevation}
                      </span>
                    </div>
                    <p className="text-[var(--text-secondary)]">
                      <strong>Material Spec:</strong> {activeHotspot.materialSpec}
                    </p>
                    <p className="text-[var(--text-secondary)]">
                      <strong>Acoustic / Environmental Rating:</strong> {activeHotspot.acoustics} •{' '}
                      {currentRoomSpec.lightingLux}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Live WhatsApp Lead Capture Simulation & Production Link */}
              <div className="lg:col-span-5">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                    <div>
                      <div className="font-mono-tech text-[10px] text-[var(--text-muted)] uppercase">
                        EMBEDDED SPATIAL LEAD CAPTURE ENGINE
                      </div>
                      <div className="font-display text-base font-bold">
                        Lock Virtual Tour &amp; VIP Site Visit
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#25D366]/15 text-[#25D366] font-mono-tech text-[10px] font-bold">
                      +210% SITE VISITS
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                        BUYER / INVESTOR NAME
                      </label>
                      <input
                        type="text"
                        value={spatialLeadName}
                        onChange={(e) => {
                          setSpatialLeadName(e.target.value);
                          setSpatialLeadSent(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl surface-elevated font-mono-tech text-xs text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                        WHATSAPP MOBILE NUMBER
                      </label>
                      <input
                        type="text"
                        value={spatialLeadPhone}
                        onChange={(e) => {
                          setSpatialLeadPhone(e.target.value);
                          setSpatialLeadSent(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl surface-elevated font-mono-tech text-xs text-[var(--text-primary)]"
                      />
                    </div>
                    <div className="p-3 rounded-xl surface-elevated font-mono-tech space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">Pinned Room View:</span>
                        <span className="font-bold">
                          {selectedRoom} ({compassYaw}° / {fovLens}° FOV)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">Inspected Spec:</span>
                        <span className="font-bold">{activeHotspot.label}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSpatialLeadSent(true)}
                    className="w-full py-2.5 px-4 rounded-xl btn-platinum-primary font-mono-tech text-xs font-bold cursor-pointer"
                  >
                    {spatialLeadSent
                      ? '✓ VIP TOUR DISPATCHED TO DEVELOPER CRM'
                      : 'SIMULATE INSTANT WHATSAPP LEAD CAPTURE'}
                  </button>

                  {spatialLeadSent && (
                    <div className="p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 font-mono-tech text-[11px] text-[var(--text-primary)]">
                      ✓ Lead <strong>{spatialLeadName}</strong> ({spatialLeadPhone}) routed with
                      pinned 360° camera state <strong>{selectedRoom} @ {compassYaw}°</strong>!
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <a
                      href="https://360views.services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl btn-platinum-secondary font-mono-tech text-[11px] font-bold text-center"
                    >
                      Launch 360views.services ↗
                    </a>
                    <a
                      href={`https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hi Sachin, I explored the 360 Views (${selectedRoom} @ ${compassYaw}°) sandbox. Let's discuss a spatial web platform.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl btn-whatsapp-official font-mono-tech text-[11px] font-bold inline-flex items-center justify-center gap-1.5"
                    >
                      <WhatsAppLogoIcon className="w-4 h-4 shrink-0" />
                      <span>WhatsApp Sachin</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. SHADOWBASE (SACHIN SAHU — ZERO-DOWNTIME SQL MIGRATION SANDBOX) */}
          {activeId === 'shadowbase-cdc' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                    SACHIN SAHU • FOUNDER &amp; CEO • SPRING BOOT + DEBEZIUM CDC + KAFKA
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] font-mono-tech text-xs font-bold">
                    PARITY: {activeMigration.parityRate} • 0ms TABLE LOCK
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  ShadowBase — Zero-Downtime SQL Schema Migration IDE
                </h3>

                {/* Migration Script Selector */}
                <div className="space-y-1.5">
                  <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    1. SELECT PRODUCTION SQL DDL MIGRATION SCRIPT:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {MIGRATION_SCRIPTS.map((script, idx) => (
                      <button
                        key={script.id}
                        type="button"
                        onClick={() => setSelectedMigrationIdx(idx)}
                        className={`p-3 rounded-xl font-mono-tech text-[11px] font-bold text-left cursor-pointer transition-all ${
                          selectedMigrationIdx === idx ? 'btn-platinum-primary' : 'surface-elevated'
                        }`}
                      >
                        {script.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SQL IDE Code Box */}
                <div className="p-4 rounded-2xl surface-elevated border border-[var(--border-metallic)] font-mono-tech text-xs space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                    <span>SQL MIGRATION BUFFER • TARGET: {activeMigration.rowsAffected}</span>
                    <span>REPLAY RUN #{cdcReplayCount}</span>
                  </div>
                  <pre className="p-3 rounded-xl surface-card text-[11px] text-[var(--text-primary)] overflow-x-auto leading-relaxed">
                    {activeMigration.sql}
                  </pre>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={triggerCdcReplay}
                      className="px-4 py-2.5 rounded-xl btn-platinum-primary font-mono-tech text-xs font-bold cursor-pointer"
                    >
                      {cdcRunning
                        ? '⟳ REPLAYING KAFKA + DEBEZIUM WAL STREAM...'
                        : '▶ RUN KAFKA + DEBEZIUM CDC REPLAY'}
                    </button>
                    <a
                      href={`https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hi Sachin, I tested your ShadowBase CDC migration sandbox (${activeMigration.label}). Let's discuss zero-downtime backend engineering.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl btn-whatsapp-official font-mono-tech text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      <WhatsAppLogoIcon className="w-4 h-4 shrink-0" />
                      <span>Consult Sachin on Backend</span>
                    </a>
                  </div>
                </div>

                {/* Production vs Shadow Latency Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-tech text-xs">
                  <div className="p-4 rounded-2xl surface-elevated border border-red-500/30">
                    <div className="text-[10px] text-red-400 font-bold uppercase">
                      STANDARD DIRECT DDL (WITHOUT SHADOWBASE)
                    </div>
                    <div className="font-display text-lg font-bold text-red-400 mt-1">
                      {activeMigration.legacyLockMs}
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-1">
                      Blocks live checkout &amp; UPI webhook inserts during table rewrite.
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl surface-elevated border border-[#10B981]/40">
                    <div className="text-[10px] text-[#10B981] font-bold uppercase">
                      SHADOWBASE KAFKA + DEBEZIUM CLONE
                    </div>
                    <div className="font-display text-lg font-bold text-[#10B981] mt-1">
                      {activeMigration.shadowLockMs}
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-1">
                      Dual-streams WAL mutations into Testcontainers shadow clone with 0ms lock.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Docker Testcontainers & Debezium Logs */}
              <div className="lg:col-span-5">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-3 font-mono-tech text-xs h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                      <span className="font-bold text-[11px] uppercase">
                        DOCKER TESTCONTAINERS + DEBEZIUM LIVE LOGS
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold">
                        RUN #{cdcReplayCount} VERIFIED
                      </span>
                    </div>
                    <div className="space-y-2 p-3 rounded-xl surface-elevated text-[11px] leading-relaxed">
                      {activeMigration.logs.map((line, i) => (
                        <div key={i} className="text-[var(--text-secondary)]">
                          <span className="text-[#10B981] font-bold mr-1">›</span>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl surface-elevated border border-[var(--border-hairline)] space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Primary P99 Read Latency:</span>
                      <span className="font-bold text-[#10B981]">2.1 ms (Unchanged)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Shadow Clone P99 Latency:</span>
                      <span className="font-bold text-[#10B981]">1.4 ms (Indexed)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Row Checksum Drift:</span>
                      <span className="font-bold text-[#10B981]">0 Rows (100% Parity)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. GRIDWEAVER (SACHIN SAHU — JAVA 21 LOOM IOT MICROGRID ENGINE) */}
          {activeId === 'gridweaver-iot' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                    SACHIN SAHU • FOUNDER &amp; CEO • JAVA 21 VIRTUAL THREADS (LOOM) + KAFKA
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold mt-2">
                    GridWeaver — GIS Microgrid Control Center &amp; Virtual Thread Telemetry
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={triggerLoomSpike}
                    className={`px-4 py-2.5 rounded-xl font-mono-tech text-xs font-bold cursor-pointer transition-all ${
                      loomSpikeActive ? 'bg-[#10B981] text-black' : 'btn-platinum-primary'
                    }`}
                  >
                    {loomSpikeActive
                      ? '⚡ 50,000 VIRTUAL THREAD SPIKE ACTIVE (CLICK TO NORMALIZE)'
                      : '⚡ SIMULATE 50,000 VIRTUAL THREAD LOAD SPIKE'}
                  </button>
                </div>
              </div>

              {/* Live Telemetry Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-tech text-xs">
                <div className="p-3.5 rounded-2xl surface-elevated border border-[var(--border-metallic)]">
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">ACTIVE LOOM THREADS</div>
                  <div className="font-display text-lg font-bold text-[#10B981] mt-0.5">
                    {virtualThreadCount.toLocaleString('en-IN')} Threads
                  </div>
                  <div className="text-[10px] text-[var(--text-secondary)]">OS Carrier Threads: 8</div>
                </div>
                <div className="p-3.5 rounded-2xl surface-elevated border border-[var(--border-metallic)]">
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">AGGREGATE GRID VECTOR</div>
                  <div className="font-display text-lg font-bold text-[var(--text-primary)] mt-0.5">
                    {totalMicrogridKw.toLocaleString('en-IN')} kW
                  </div>
                  <div className="text-[10px] text-[var(--text-secondary)]">Sub-second Kafka sync</div>
                </div>
                <div className="p-3.5 rounded-2xl surface-elevated border border-[var(--border-metallic)]">
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">P99 INGESTION LATENCY</div>
                  <div className="font-display text-lg font-bold text-[#10B981] mt-0.5">
                    {loomSpikeActive ? '6.8 ms' : '3.2 ms'}
                  </div>
                  <div className="text-[10px] text-[var(--text-secondary)]">0 Dropped Telemetry Pings</div>
                </div>
                <div className="p-3.5 rounded-2xl surface-elevated border border-[var(--border-metallic)]">
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">GRID FREQUENCY LOCK</div>
                  <div className="font-display text-lg font-bold text-[var(--text-primary)] mt-0.5">
                    50.02 Hz
                  </div>
                  <div className="text-[10px] text-[var(--text-secondary)]">PostGIS Spatial Sync</div>
                </div>
              </div>

              {/* 4 Interactive Battery Nodes with explicit state buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {iotNodes.map((node, idx) => (
                  <div
                    key={node.id}
                    className="p-4 rounded-2xl surface-elevated border border-[var(--border-metallic)] space-y-3"
                  >
                    <div className="flex items-center justify-between font-mono-tech text-xs">
                      <div>
                        <span className="text-[10px] text-[var(--text-muted)] font-bold">
                          {node.id}
                        </span>
                        <div className="font-display text-base font-bold text-[var(--text-primary)]">
                          {node.zone}
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          node.state === 'FAULT'
                            ? 'bg-red-500/20 text-red-400'
                            : node.state === 'CHARGING'
                              ? 'bg-[#10B981]/20 text-[#10B981]'
                              : 'badge-neutral'
                        }`}
                      >
                        {node.state} • {node.loadKw} kW
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5">
                      {(['CHARGING', 'DISCHARGING', 'IDLE', 'FAULT'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setNodeStateExplicit(idx, st)}
                          className={`py-1.5 px-2 rounded-lg font-mono-tech text-[10px] font-bold cursor-pointer transition-all ${
                            node.state === st
                              ? 'btn-platinum-primary'
                              : 'surface-card text-[var(--text-secondary)]'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. FILEGUARD AI (AASHIF KHAN — SHA-256 & BLOCKCHAIN DOCUMENT VERIFIER) */}
          {activeId === 'fileguard-security' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                    AASHIF KHAN • CO-FOUNDER &amp; SYSTEM ARCHITECT • SHA-256 + ORIGINSTAMP
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full font-mono-tech text-[11px] font-bold ${
                      isSignatureMatch
                        ? 'bg-[#10B981]/20 text-[#10B981]'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {isSignatureMatch
                      ? '✓ BLOCKCHAIN ANCHOR VERIFIED'
                      : '✕ CRYPTOGRAPHIC TAMPER ALERT'}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  FileGuard AI — SHA-256 &amp; OriginStamp Blockchain Document Verifier
                </h3>

                {/* Sample Document Selector */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    LOAD SAMPLE CONTRACT:
                  </span>
                  {(Object.keys(SAMPLE_DOCUMENTS) as (keyof typeof SAMPLE_DOCUMENTS)[]).map(
                    (docKey) => (
                      <button
                        key={docKey}
                        type="button"
                        onClick={() => handleSelectSampleDoc(docKey)}
                        className={`px-3 py-1.5 rounded-xl font-mono-tech text-xs font-bold cursor-pointer ${
                          selectedSampleDoc === docKey
                            ? 'btn-platinum-primary'
                            : 'surface-elevated'
                        }`}
                      >
                        {docKey}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => setTamperCheckInput((prev) => prev + ' [TAMPERED]')}
                    className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 font-mono-tech text-xs font-bold cursor-pointer"
                  >
                    ⚡ Simulate 1-Char Tamper
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      1. ORIGINAL ANCHORED DOCUMENT PAYLOAD (IMMUTABLE LEDGER RECORD)
                    </label>
                    <textarea
                      rows={2}
                      value={docPayload}
                      onChange={(e) => setDocPayload(e.target.value)}
                      className="w-full p-3 rounded-xl surface-elevated text-xs font-mono-tech text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      2. LIVE VERIFICATION INPUT (CHANGE ANY CHARACTER TO TEST SHA-256 DRIFT)
                    </label>
                    <textarea
                      rows={2}
                      value={tamperCheckInput}
                      onChange={(e) => setTamperCheckInput(e.target.value)}
                      className="w-full p-3 rounded-xl surface-elevated text-xs font-mono-tech text-[var(--text-primary)]"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-3 font-mono-tech text-xs">
                  <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold">
                    ORIGINSTAMP MERKLE ROOT &amp; SHA-256 AUDIT
                  </div>
                  <div className="p-3 rounded-xl surface-elevated space-y-1">
                    <div className="text-[10px] text-[var(--text-muted)]">BLOCKCHAIN ANCHOR TX</div>
                    <div className="font-bold text-[11px] break-all text-[var(--text-primary)]">
                      {SAMPLE_DOCUMENTS[selectedSampleDoc].anchorTx}
                    </div>
                    <div className="text-[10px] text-[#10B981]">
                      {SAMPLE_DOCUMENTS[selectedSampleDoc].timestamp}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl surface-elevated break-all">
                    <div className="text-[10px] text-[var(--text-muted)]">ANCHORED SHA-256 DIGEST</div>
                    <div className="mt-1 font-bold text-[11px]">{shaHashOriginal}</div>
                  </div>
                  <div className="p-3 rounded-xl surface-elevated break-all">
                    <div className="text-[10px] text-[var(--text-muted)]">COMPUTED INCOMING DIGEST</div>
                    <div
                      className={`mt-1 font-bold text-[11px] ${
                        isSignatureMatch ? 'text-[#10B981]' : 'text-red-400'
                      }`}
                    >
                      {shaHashVerify}
                    </div>
                  </div>
                  {!isSignatureMatch && (
                    <button
                      type="button"
                      onClick={() => setTamperCheckInput(docPayload)}
                      className="w-full py-2 rounded-xl btn-platinum-primary font-mono-tech text-xs font-bold cursor-pointer"
                    >
                      ↺ RESTORE ORIGINAL DOCUMENT INTEGRITY
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 5. AI CAREER GUIDE & MENTOR (AASHIF KHAN — PERSONALIZED AI ROADMAP ENGINE) */}
          {(activeId === 'ai-career-mentor' || activeId === 'career-socialite') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  AASHIF KHAN • CO-FOUNDER &amp; SYSTEM ARCHITECT • AI CAREER ARCHITECT
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  AI Career Guide &amp; Mentor — Personalized Roadmap &amp; Viva Simulator
                </h3>

                {/* Current Experience Level Selector */}
                <div className="space-y-1.5">
                  <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    1. SELECT CURRENT EXPERIENCE LEVEL:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Beginner', 'B.Tech CSE', 'Working Dev'] as CareerLevel[]).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setCareerLevel(lvl)}
                        className={`py-2 px-3 rounded-xl font-mono-tech text-xs font-bold cursor-pointer ${
                          careerLevel === lvl ? 'btn-platinum-primary' : 'surface-elevated'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Engineering Role Selector */}
                <div className="space-y-1.5">
                  <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    2. SELECT TARGET ENGINEERING TRACK:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        'Full-Stack Architect',
                        'AI Engineer',
                        'Backend Java/Kafka',
                        'Cybersecurity',
                      ] as CareerRole[]
                    ).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          setTargetRole(role);
                          setShowInterviewAnswer(false);
                        }}
                        className={`py-2 px-2.5 rounded-xl font-mono-tech text-[11px] font-bold cursor-pointer ${
                          targetRole === role ? 'btn-platinum-primary' : 'surface-elevated'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Week-by-Week Project Roadmap */}
                <div className="space-y-2">
                  <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    WEEK-BY-WEEK CAPSTONE ROADMAP ({careerLevel.toUpperCase()} → {targetRole.toUpperCase()}):
                  </div>
                  {activeCareerData.weeks.map((w) => {
                    const isDone = !!completedMilestones[w.week];
                    return (
                      <button
                        key={w.week}
                        type="button"
                        onClick={() =>
                          setCompletedMilestones((prev) => ({
                            ...prev,
                            [w.week]: !prev[w.week],
                          }))
                        }
                        className="w-full p-3.5 rounded-2xl surface-elevated border border-[var(--border-hairline)] text-left flex items-start justify-between gap-3 cursor-pointer"
                      >
                        <div>
                          <div className="font-mono-tech text-[10px] text-[#10B981] font-bold">
                            {w.week} • {w.title}
                          </div>
                          <div className="text-xs text-[var(--text-secondary)] mt-1">
                            {w.deliverable}
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg surface-card font-mono-tech text-[10px] font-bold shrink-0">
                          {isDone ? '✓ DONE' : 'MARK DONE'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Skill-Gap Radar + Mock Interview Question Simulator */}
              <div className="lg:col-span-5 space-y-4">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-3">
                  <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    SKILL-GAP RADAR TELEMETRY ({careerLevel})
                  </div>
                  <div className="space-y-2.5 font-mono-tech text-xs">
                    {activeCareerData.skills.map((sk) => {
                      const baseline = Math.min(85, sk.current + levelBonus);
                      return (
                        <div key={sk.name} className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span>{sk.name}</span>
                            <span className="text-[#10B981] font-bold">
                              {baseline}% → {sk.target}%
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                            <div
                              className="h-full bg-[#10B981]"
                              style={{ width: `${sk.target}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-3">
                  <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    MOCK TECHNICAL INTERVIEW SIMULATOR
                  </div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">
                    Q: &ldquo;{activeCareerData.interviewQuestion}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowInterviewAnswer((prev) => !prev)}
                    className="w-full py-2 px-3 rounded-xl btn-platinum-primary font-mono-tech text-xs font-bold cursor-pointer"
                  >
                    {showInterviewAnswer
                      ? 'HIDE PRINCIPAL ARCHITECT ANSWER'
                      : 'REVEAL PRINCIPAL ARCHITECT ANSWER'}
                  </button>
                  {showInterviewAnswer && (
                    <div className="p-3 rounded-xl surface-elevated text-xs text-[var(--text-secondary)] border border-[#10B981]/30">
                      <strong className="text-[#10B981]">Model Answer:</strong>{' '}
                      {activeCareerData.modelAnswer}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 6. SOCIALITE (AASHIF KHAN — REAL-TIME CREATOR & COMMUNITY PLATFORM) */}
          {activeId === 'socialite-network' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                    AASHIF KHAN • CO-FOUNDER &amp; SYSTEM ARCHITECT • REAL-TIME SOCIAL STUDIO
                  </span>
                  <span className="font-mono-tech text-xs text-[#10B981] font-bold">
                    ● OPTIMISTIC UI FEED LATENCY: 14ms
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  Socialite — Real-Time Creator Feed &amp; Community Studio
                </h3>

                {/* Channel Filter Bar */}
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      'All Channels',
                      'Full-Stack Devs',
                      'AI Builders',
                      'Design Systems',
                    ] as const
                  ).map((chan) => (
                    <button
                      key={chan}
                      type="button"
                      onClick={() => setSocialChannel(chan)}
                      className={`px-3 py-1.5 rounded-xl font-mono-tech text-xs font-bold cursor-pointer ${
                        socialChannel === chan ? 'btn-platinum-primary' : 'surface-elevated'
                      }`}
                    >
                      {chan}
                    </button>
                  ))}
                </div>

                {/* Live Post Creator */}
                <div className="p-4 rounded-2xl surface-elevated border border-[var(--border-metallic)] space-y-2.5">
                  <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    PUBLISH LIVE POST TO {socialChannel.toUpperCase()}:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Share an engineering milestone, release note, or creator update..."
                      value={newPostDraft}
                      onChange={(e) => setNewPostDraft(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl surface-card text-xs text-[var(--text-primary)]"
                    />
                    <button
                      type="button"
                      onClick={handlePublishPost}
                      className="px-4 py-2 rounded-xl btn-platinum-primary font-mono-tech text-xs font-bold cursor-pointer shrink-0"
                    >
                      + Publish Post
                    </button>
                  </div>
                </div>

                {/* Feed Stream */}
                <div className="space-y-3">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 rounded-2xl surface-elevated border border-[var(--border-hairline)] space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-[var(--text-primary)]">{post.author}</span>{' '}
                          <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                            {post.handle} • {post.timestamp}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full surface-card font-mono-tech text-[10px] font-bold">
                          {post.channel}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => togglePostLike(post.id)}
                          className={`px-3 py-1 rounded-lg font-mono-tech text-[11px] font-bold cursor-pointer ${
                            post.liked ? 'btn-platinum-primary' : 'surface-card'
                          }`}
                        >
                          {post.liked ? `★ Liked (${post.likes})` : `☆ Like (${post.likes})`}
                        </button>
                        <button
                          type="button"
                          onClick={() => incrementPostComment(post.id)}
                          className="px-3 py-1 rounded-lg surface-card font-mono-tech text-[11px] font-bold cursor-pointer"
                        >
                          💬 +1 Reply ({post.comments})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Creator Engagement Analytics */}
              <div className="lg:col-span-5">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-4 font-mono-tech text-xs">
                  <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold">
                    CREATOR STUDIO REAL-TIME TELEMETRY
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl surface-elevated">
                      <div className="text-[10px] text-[var(--text-muted)]">TOTAL LIKES</div>
                      <div className="font-display text-xl font-bold text-[#10B981] mt-1">
                        {socialPosts.reduce((a, b) => a + b.likes, 0)}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl surface-elevated">
                      <div className="text-[10px] text-[var(--text-muted)]">ACTIVE THREADS</div>
                      <div className="font-display text-xl font-bold text-[var(--text-primary)] mt-1">
                        {socialPosts.reduce((a, b) => a + b.comments, 0)}
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl surface-elevated space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Edge Feed Cache Hit Ratio:</span>
                      <span className="font-bold text-[#10B981]">99.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Creator Engagement Velocity:</span>
                      <span className="font-bold text-[#10B981]">+318% vs Legacy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">WebSocket Fanout P99:</span>
                      <span className="font-bold">18.4 ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. A&A CHOCOLATES D2C STOREFRONT & AD FUNNEL (AASHIF KHAN) */}
          {activeId === 'aa-chocolates-d2c' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  AASHIF KHAN • CO-FOUNDER &amp; SYSTEM ARCHITECT • D2C LUXURY COMMERCE
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  A&amp;A Chocolates — Handcrafted Box Customizer &amp; Meta CAPI Funnel
                </h3>

                {/* Box Size Selector */}
                <div>
                  <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1.5">
                    1. SELECT HANDCRAFTED GIFT BOX CAPACITY:
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {([6, 12, 24] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setBoxSize(size);
                          setCheckoutDone(false);
                        }}
                        className={`py-2.5 px-3 rounded-xl font-mono-tech text-xs font-bold cursor-pointer transition-all ${
                          boxSize === size ? 'btn-platinum-primary' : 'surface-elevated'
                        }`}
                      >
                        {size}-Piece Assorted Box
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4 Artisanal Flavors Counter */}
                <div className="space-y-2">
                  <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    2. CUSTOMIZE ARTISANAL FLAVOR SELECTION ({totalSelectedPieces} PIECES IN BOX):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(Object.keys(flavorCounts) as (keyof typeof flavorCounts)[]).map((flavor) => (
                      <div
                        key={flavor}
                        className="p-3 rounded-xl surface-elevated border border-[var(--border-hairline)] flex items-center justify-between"
                      >
                        <div>
                          <div className="font-display text-xs font-bold">{flavor}</div>
                          <div className="font-mono-tech text-[10px] text-[var(--text-muted)]">
                            Hand-tempered Couverture
                          </div>
                        </div>
                        <div className="flex items-center gap-2 font-mono-tech text-xs">
                          <button
                            type="button"
                            onClick={() => adjustFlavorCount(flavor, -1)}
                            className="w-7 h-7 rounded-lg surface-card font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-bold">{flavorCounts[flavor]}</span>
                          <button
                            type="button"
                            onClick={() => adjustFlavorCount(flavor, 1)}
                            className="w-7 h-7 rounded-lg surface-card font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personalized Gift Card Input */}
                <div>
                  <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                    3. PERSONALIZED GOLD-FOIL RIBBON MESSAGE:
                  </label>
                  <input
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl surface-elevated text-xs text-[var(--text-primary)]"
                  />
                </div>
              </div>

              {/* Right Column: Live INR Cart + 1-Tap UPI Checkout + Meta CAPI ROAS Funnel */}
              <div className="lg:col-span-5">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-4 font-mono-tech text-xs">
                  <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                    <span className="font-bold">1-TAP UPI EXPRESS CHECKOUT</span>
                    <span className="text-[#10B981] font-bold">3.8x META ROAS</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Base {boxSize}-Piece Box:</span>
                      <span>₹{d2cPricing.baseBoxPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">
                        Extra Truffles ({d2cPricing.extraPieces} pcs):
                      </span>
                      <span>₹{d2cPricing.addonCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">GST (18% Included):</span>
                      <span>₹{d2cPricing.gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-[var(--border-hairline)]">
                      <span>Grand Total Payable:</span>
                      <span className="text-[#10B981]">
                        ₹{d2cPricing.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* UPI Selector */}
                  <div className="grid grid-cols-2 gap-2">
                    {(['GPay', 'PhonePe'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setUpiMethod(method)}
                        className={`py-2 rounded-xl font-mono-tech text-xs font-bold cursor-pointer ${
                          upiMethod === method ? 'btn-platinum-primary' : 'surface-elevated'
                        }`}
                      >
                        1-Tap {method} UPI
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCheckoutDone(true)}
                    className="w-full py-2.5 rounded-xl btn-platinum-primary font-mono-tech text-xs font-bold cursor-pointer"
                  >
                    {checkoutDone
                      ? `✓ PAID ₹${d2cPricing.total.toLocaleString('en-IN')} VIA ${upiMethod}`
                      : `SIMULATE 1-TAP ${upiMethod.toUpperCase()} CHECKOUT`}
                  </button>

                  {/* Server-Side Meta Conversions API (CAPI) Attribution Funnel */}
                  <div className="p-3 rounded-xl surface-elevated space-y-1 text-[11px]">
                    <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase">
                      LIVE META CAPI ATTRIBUTION TELEMETRY
                    </div>
                    <div className="flex justify-between">
                      <span>ViewContent → AddToCart:</span>
                      <span className="text-[#10B981] font-bold">98.4% Event Match</span>
                    </div>
                    <div className="flex justify-between">
                      <span>InitiateCheckout → Purchase:</span>
                      <span className="text-[#10B981] font-bold">
                        {checkoutDone ? 'PURCHASE FIRED (ROAS 3.8x)' : 'READY TO DISPATCH'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. FINVANTAGE GST BILLING & TREASURY SAAS */}
          {activeId === 'finvantage-saas' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  FINTECH SAAS ENGINE • LIVE GST &amp; LEDGER SIMULATOR
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  FinVantage Automated GST Invoice &amp; Reconciliation Engine
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      ENTERPRISE COUNTERPARTY NAME
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl surface-elevated text-sm text-[var(--text-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      TAXABLE INVOICE VALUE (INR): ₹{invoiceBaseAmount.toLocaleString('en-IN')}
                    </label>
                    <input
                      type="range"
                      min={10000}
                      max={500000}
                      step={5000}
                      value={invoiceBaseAmount}
                      onChange={(e) => setInvoiceBaseAmount(Number(e.target.value))}
                      className="w-full accent-zinc-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[5, 12, 18].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setGstRate(rate)}
                        className={`py-2 rounded-xl font-mono-tech text-xs font-bold cursor-pointer ${
                          gstRate === rate ? 'btn-platinum-primary' : 'surface-elevated'
                        }`}
                      >
                        {rate}% GST Slab
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsInterState(false)}
                      className={`flex-1 py-2 rounded-xl font-mono-tech text-xs font-bold cursor-pointer ${
                        !isInterState ? 'btn-platinum-primary' : 'surface-elevated'
                      }`}
                    >
                      Intra-State (MP: CGST + SGST)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsInterState(true)}
                      className={`flex-1 py-2 rounded-xl font-mono-tech text-xs font-bold cursor-pointer ${
                        isInterState ? 'btn-platinum-primary' : 'surface-elevated'
                      }`}
                    >
                      Inter-State (IGST)
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                    <div>
                      <div className="font-mono-tech text-[10px] text-[var(--text-muted)]">
                        IRN E-INVOICE PREVIEW • {clientName}
                      </div>
                      <div className="font-display text-lg font-bold text-[var(--text-primary)]">
                        Total Payable: ₹{gstCalculation.grandTotal.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] font-mono-tech text-[10px] font-bold">
                      RAZORPAY WEBHOOK READY
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono-tech text-xs">
                    <div className="p-3 rounded-xl surface-elevated">
                      <div className="text-[var(--text-muted)] text-[10px]">CGST</div>
                      <div className="font-bold text-sm mt-0.5">
                        ₹{gstCalculation.cgst.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl surface-elevated">
                      <div className="text-[var(--text-muted)] text-[10px]">SGST</div>
                      <div className="font-bold text-sm mt-0.5">
                        ₹{gstCalculation.sgst.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl surface-elevated">
                      <div className="text-[var(--text-muted)] text-[10px]">IGST</div>
                      <div className="font-bold text-sm mt-0.5">
                        ₹{gstCalculation.igst.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl surface-elevated">
                      <div className="text-[var(--text-muted)] text-[10px]">TOTAL TAX</div>
                      <div className="font-bold text-sm mt-0.5">
                        ₹{gstCalculation.taxTotal.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 9. AURACARE LOCAL CLINIC MAP PACK & BOOKING ENGINE */}
          {activeId === 'auracare-local' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  LOCAL HEALTHCARE ENGINE • ZERO-COMMISSION BOOKING
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  AuraCare Multi-Branch Appointment &amp; QR Review Simulator
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      SELECT INDORE CLINIC BRANCH
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Vijay Nagar Flagship Clinic',
                        'Saket Square Aesthetic Center',
                        'Palasia Dental & Skin Hub',
                        'Bhanwarkuan Express Care',
                      ].map((branch) => (
                        <button
                          key={branch}
                          type="button"
                          onClick={() => {
                            setSelectedBranch(branch);
                            setBookingConfirmed(false);
                          }}
                          className={`p-2.5 rounded-xl font-mono-tech text-xs text-left cursor-pointer ${
                            selectedBranch === branch ? 'btn-platinum-primary' : 'surface-elevated'
                          }`}
                        >
                          {branch}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      SELECT SPECIALIST &amp; TIME SLOT
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['11:00 AM Today', '02:30 PM Today', '05:30 PM Today', '07:00 PM Today'].map(
                        (slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedSlot(slot);
                              setBookingConfirmed(false);
                            }}
                            className={`px-3 py-1.5 rounded-xl font-mono-tech text-xs cursor-pointer ${
                              selectedSlot === slot ? 'btn-platinum-primary' : 'surface-elevated'
                            }`}
                          >
                            {slot}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBookingConfirmed(true)}
                    className="w-full py-3 rounded-xl btn-platinum-primary font-mono-tech text-xs font-bold cursor-pointer"
                  >
                    {bookingConfirmed
                      ? '✓ CONFIRMED & WHATSAPP REMINDER QUEUED'
                      : 'SIMULATE PATIENT SLOT BOOKING'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-4">
                  <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    LIVE RECEPTION STANDEE &amp; WHATSAPP TRIAGE PAYLOAD
                  </div>
                  <div className="p-4 rounded-xl surface-elevated font-mono-tech text-xs space-y-1.5">
                    <div>
                      <strong>Branch:</strong> {selectedBranch}
                    </div>
                    <div>
                      <strong>Specialist:</strong> {selectedDoctor}
                    </div>
                    <div>
                      <strong>Confirmed Slot:</strong> {selectedSlot}
                    </div>
                    <div>
                      <strong>Patient WhatsApp:</strong> {patientPhone}
                    </div>
                    <div className="text-[#25D366] pt-1 font-bold">
                      Status:{' '}
                      {bookingConfirmed
                        ? 'Automated T-2hr Reminder + Google Review Link Scheduled ✓'
                        : 'Awaiting Slot Lock'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 10. NEXAPROP REAL ESTATE CRM */}
          {activeId === 'nexaprop-crm' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  PROPTECH INVENTORY &amp; MORTGAGE SIMULATOR
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  NexaProp Interactive Inventory &amp; EMI Estimator
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      UNIT PRICE: ₹{propertyBudgetLakhs} LAKHS (₹
                      {(propertyBudgetLakhs / 100).toFixed(2)} CR)
                    </label>
                    <input
                      type="range"
                      min={45}
                      max={350}
                      step={5}
                      value={propertyBudgetLakhs}
                      onChange={(e) => setPropertyBudgetLakhs(Number(e.target.value))}
                      className="w-full accent-zinc-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      DOWN PAYMENT: {downPaymentPercent}%
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-zinc-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['New Inquiry', 'Site Visit Scheduled', 'Token Paid'] as const).map(
                      (stage) => (
                        <button
                          key={stage}
                          type="button"
                          onClick={() => setVisitStage(stage)}
                          className={`px-3 py-1.5 rounded-xl font-mono-tech text-xs cursor-pointer ${
                            visitStage === stage ? 'btn-platinum-primary' : 'surface-elevated'
                          }`}
                        >
                          {stage}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-3 font-mono-tech text-xs">
                  <div className="text-[10px] text-[var(--text-muted)]">
                    SELECTED INVENTORY: {selectedUnit}
                  </div>
                  <div className="font-display text-xl font-bold">
                    Estimated EMI: ₹{emiSummary.monthlyEmiInr} / month
                  </div>
                  <div>Loan Principal: ₹{emiSummary.loanAmountLakhs} Lakhs @ 8.5% p.a.</div>
                  <div>Lead Pipeline Stage: {visitStage}</div>
                </div>
              </div>
            </div>
          )}

          {/* 11. SEARCHPULSE SEO & GEO PIPELINE CALCULATOR */}
          {activeId === 'searchpulse-seo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  SEARCH &amp; GENERATIVE AI SEO SIMULATOR
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  SearchPulse Organic Pipeline &amp; Schema Yield Model
                </h3>
                <div>
                  <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                    MONTHLY SEARCH IMPRESSIONS / CLICKS: {monthlyTraffic.toLocaleString('en-IN')}
                  </label>
                  <input
                    type="range"
                    min={5000}
                    max={150000}
                    step={2500}
                    value={monthlyTraffic}
                    onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                    className="w-full accent-zinc-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-3 font-mono-tech text-xs">
                  <div className="font-display text-xl font-bold">
                    Projected Organic Pipeline: ₹{seoProjection.projectedRevenue} / mo
                  </div>
                  <div>Monthly Inbound Leads: {seoProjection.monthlyLeads}</div>
                  <div>Closed Deals (18% Close Rate): {seoProjection.qualifiedDeals}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
