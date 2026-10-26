import React, { useState, useMemo } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  QrCode,
  ShieldCheck,
  Activity,
  FileText,
  ShoppingBag,
  MapPin,
  Cpu,
  Search,
  Send,
  ArrowUpRight,
} from 'lucide-react';
import {
  InteractiveArtifactId,
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
} from '../data/agencyData';
import { WhatsAppLogoIcon } from './BrandIcons';

interface InteractiveArtifactModalProps {
  artifactId: InteractiveArtifactId | null;
  onClose: () => void;
}

const ARTIFACT_TABS: { id: InteractiveArtifactId; label: string; category: string }[] = [
  { id: '360-views', label: '360 Views (Sachin Sahu)', category: 'Web & Spatial' },
  { id: 'shadowbase-cdc', label: 'ShadowBase CDC (Sachin Sahu)', category: 'Kafka & Debezium' },
  { id: 'gridweaver-iot', label: 'GridWeaver IoT (Sachin Sahu)', category: 'Java 21 + Loom' },
  { id: 'fileguard-security', label: 'FileGuard AI (Aashif Khan)', category: 'SHA-256 Security' },
  { id: 'ai-career-mentor', label: 'AI Career Guide (Aashif Khan)', category: 'AI EdTech' },
  { id: 'socialite-network', label: 'Socialite (Aashif Khan)', category: 'Social Graph' },
  { id: 'aa-chocolates-d2c', label: 'A&A Chocolates (Aashif Khan)', category: 'D2C & Checkout' },
  { id: 'finvantage-saas', label: 'FinVantage GST SaaS', category: 'Cloud SaaS' },
  { id: 'auracare-local', label: 'AuraCare Map Pack #Top', category: 'Local Growth' },
  { id: 'nexaprop-crm', label: 'NexaProp WhatsApp AI', category: 'AI & CRM' },
  { id: 'searchpulse-seo', label: 'SearchPulse SEO/AEO', category: 'SEO & Schema' },
];

function computeDeterministicSha256Hex(input: string): string {
  const seed = input || 'SkyLine-Default-Payload';
  const hashes = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];
  for (let i = 0; i < seed.length; i++) {
    const code = seed.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
      hashes[j] = Math.imul(hashes[j] ^ (code + j * 31 + i * 17), 16777619) >>> 0;
    }
  }
  return hashes.map((h) => h.toString(16).padStart(8, '0')).join('');
}

export const InteractiveArtifactModal: React.FC<InteractiveArtifactModalProps> = ({
  artifactId,
  onClose,
}) => {
  const [activeId, setActiveId] = useState<InteractiveArtifactId>(
    artifactId || '360-views'
  );

  // Sync when prop changes
  React.useEffect(() => {
    if (artifactId) {
      setActiveId(artifactId);
    }
  }, [artifactId]);

  // 1) 360 Views State
  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);
  const [yawAngle, setYawAngle] = useState<number>(145);

  // 2) FinVantage SaaS State
  const [saasClient, setSaasClient] = useState<string>('Meridian Distributors Pvt Ltd');
  const [saasBaseAmount, setSaasBaseAmount] = useState<number>(85000);
  const [saasLedgerFilter, setSaasLedgerFilter] = useState<'ALL' | 'SETTLED' | 'PENDING'>('ALL');
  const [saasPayoutSplit, setSaasPayoutSplit] = useState<number>(85);

  // 3) AuraCare Local State
  const [clinicBranch, setClinicBranch] = useState<string>('Vijay Nagar Flagship Clinic');
  const [clinicSlot, setClinicSlot] = useState<string>('11:30 AM Tomorrow');
  const [clinicBooked, setClinicBooked] = useState<boolean>(false);
  const [qrRating, setQrRating] = useState<number>(5);

  // 4) A&A Chocolates D2C State
  const [chocoCounts, setChocoCounts] = useState<{
    truffle: number;
    almond: number;
    hazelnut: number;
  }>({ truffle: 2, almond: 1, hazelnut: 1 });
  const [upiPaid, setUpiPaid] = useState<boolean>(false);
  const [adSpendInr, setAdSpendInr] = useState<number>(25000);

  // 5) NexaProp WhatsApp AI State
  const [propBudget, setPropBudget] = useState<string>('₹65L - ₹90L');
  const [propPlotSize, setPropPlotSize] = useState<string>('1,500 sq.ft Villa Plot');
  const [propVisitDay, setPropVisitDay] = useState<string>('Saturday • 11:00 AM');
  const [propLocked, setPropLocked] = useState<boolean>(false);

  // 6) SearchPulse SEO/AEO State
  const [seoBusinessName, setSeoBusinessName] = useState<string>('AuraCare Dental & Skin Clinic');
  const [seoCity, setSeoCity] = useState<string>('Indore');
  const [seoCategory, setSeoCategory] = useState<string>('MedicalClinic');

  // 7) GridWeaver IoT State
  const [iotNodes, setIotNodes] = useState<
    { id: string; zone: string; state: 'Charging' | 'Discharging' | 'Idle' | 'Fault'; loadKw: number }[]
  >([
    { id: 'NODE-IND-01', zone: 'Vijay Nagar Solar Array', state: 'Charging', loadKw: 142 },
    { id: 'NODE-IND-02', zone: 'Pithampur Industrial Bus', state: 'Discharging', loadKw: 310 },
    { id: 'NODE-IND-03', zone: 'Super Corridor Microgrid', state: 'Idle', loadKw: 18 },
    { id: 'NODE-IND-04', zone: 'Substation Backup Bank', state: 'Charging', loadKw: 96 },
  ]);

  // 8) FileGuard AI State
  const [docPayload, setDocPayload] = useState<string>(
    'CONTRACT-SL-2026: 100% IP & Source Code Ownership transferred to Client upon milestone settlement.'
  );
  const [tamperCheckInput, setTamperCheckInput] = useState<string>(
    'CONTRACT-SL-2026: 100% IP & Source Code Ownership transferred to Client upon milestone settlement.'
  );

  // 9) AI Career Guide & Socialite State
  const [targetRole, setTargetRole] = useState<'Full-Stack Architect' | 'AI/ML Engineer' | 'Cloud DevOps'>('Full-Stack Architect');
  const [socialLikes, setSocialLikes] = useState<number>(184);
  const [socialLiked, setSocialLiked] = useState<boolean>(false);

  const shaHashOriginal = useMemo(() => computeDeterministicSha256Hex(docPayload), [docPayload]);
  const shaHashVerify = useMemo(() => computeDeterministicSha256Hex(tamperCheckInput), [tamperCheckInput]);
  const isSignatureMatch = shaHashOriginal === shaHashVerify;

  if (!artifactId) return null;

  const ROOMS_360 = [
    {
      name: 'Grand Commercial Atrium (360°)',
      hotspotCount: 6,
      fov: '95° Wide Spatial Lens',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      note: 'Interactive spatial hotspot pins allow buyers to inspect marble finishes, ceiling acoustics, and floor plans directly inside the browser.',
    },
    {
      name: 'Executive Suite & Conference Deck',
      hotspotCount: 4,
      fov: '90° Architectural View',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      note: 'Sub-70ms room switching via pre-fetched WebP cube-maps with zero external iframe lag.',
    },
    {
      name: 'Skyline Rooftop Lounge & Showroom',
      hotspotCount: 5,
      fov: '105° Panoramic View',
      img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      note: 'Embedded 1-Tap WhatsApp booking widget inside the 360° viewport captures private tour requests.',
    },
  ];

  const gstAmount = Math.round(saasBaseAmount * 0.18);
  const totalInvoice = saasBaseAmount + gstAmount;
  const vendorSplitInr = Math.round((totalInvoice * saasPayoutSplit) / 100);
  const platformRetainedInr = totalInvoice - vendorSplitInr;

  const chocoSubtotal =
    chocoCounts.truffle * 449 + chocoCounts.almond * 399 + chocoCounts.hazelnut * 499;
  const projectedCapiRevenue = Math.round(adSpendInr * 4.4);

  const cycleNodeState = (index: number) => {
    const order: ('Charging' | 'Discharging' | 'Idle' | 'Fault')[] = [
      'Charging',
      'Discharging',
      'Idle',
      'Fault',
    ];
    setIotNodes((prev) =>
      prev.map((node, i) => {
        if (i !== index) return node;
        const nextState = order[(order.indexOf(node.state) + 1) % order.length];
        const nextLoad =
          nextState === 'Charging'
            ? 140
            : nextState === 'Discharging'
              ? 295
              : nextState === 'Idle'
                ? 12
                : 0;
        return { ...node, state: nextState, loadKw: nextLoad };
      })
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Live Interactive Engineering Prototype Sandbox"
    >
      <div className="max-w-5xl w-full rounded-3xl surface-card border border-[var(--border-metallic)] shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="px-5 sm:px-7 py-4 border-b border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 bg-[var(--bg-surface)]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
              SKYLINE INTERACTIVE ARTIFACT SANDBOX • LIVE PROTOTYPE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://360views.services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full btn-platinum-secondary text-[11px] font-mono-tech font-bold text-[var(--text-primary)] hover:opacity-90"
            >
              <span>Visit 360views.services</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Interactive Prototype Modal"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full btn-platinum-primary text-xs font-mono-tech uppercase tracking-wider cursor-pointer"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Prototype Switcher Bar */}
        <div className="px-5 sm:px-7 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex items-center gap-2 overflow-x-auto">
          {ARTIFACT_TABS.map((tab) => {
            const isSelected = activeId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveId(tab.id)}
                className={`px-3.5 py-2 rounded-xl font-mono-tech text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'btn-platinum-primary shadow-xs'
                    : 'surface-elevated text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Prototype Body */}
        <div className="p-5 sm:p-8 max-h-[78vh] overflow-y-auto space-y-6">
          {/* 1. 360 VIEWS SPATIAL PROTOTYPE */}
          {activeId === '360-views' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-[var(--border-metallic)] aspect-[16/10] bg-black">
                  <img
                    src={ROOMS_360[activeRoomIndex].img}
                    alt={ROOMS_360[activeRoomIndex].name}
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{
                      transform: `scale(1.08) translateX(${(yawAngle - 180) * 0.08}px)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/75 text-white border border-white/15 font-mono-tech text-[10px] font-bold">
                      360° SPATIAL VIEWPORT • YAW {yawAngle}°
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#10B981]/90 text-black font-mono-tech text-[10px] font-bold">
                      {ROOMS_360[activeRoomIndex].hotspotCount} ACTIVE HOTSPOTS
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 text-white">
                    <div>
                      <div className="font-mono-tech text-[10px] uppercase tracking-widest text-zinc-300">
                        {ROOMS_360[activeRoomIndex].fov}
                      </div>
                      <h3 className="font-display text-lg font-bold">
                        {ROOMS_360[activeRoomIndex].name}
                      </h3>
                    </div>
                    <a
                      href="https://360views.services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black font-display text-xs font-bold hover:bg-zinc-200 transition-colors"
                    >
                      <span>Visit Live Site (360views.services)</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="surface-elevated rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span>PAN 360° CAMERA YAW ANGLE</span>
                    <span className="font-bold">{yawAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={yawAngle}
                    onChange={(e) => setYawAngle(Number(e.target.value))}
                    aria-label="Pan 360 camera yaw angle"
                    className="w-full accent-[var(--text-primary)] cursor-pointer"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] uppercase font-bold">
                  LIVE PRODUCTION WEB PLATFORM
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  360 Views Interactive Tour Engine
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {ROOMS_360[activeRoomIndex].note}
                </p>

                <div className="space-y-2">
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                    SWITCH HOTSPOT ROOM SCENE
                  </div>
                  {ROOMS_360.map((room, idx) => (
                    <button
                      key={room.name}
                      type="button"
                      onClick={() => setActiveRoomIndex(idx)}
                      className={`w-full p-3.5 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                        activeRoomIndex === idx
                          ? 'btn-platinum-primary'
                          : 'surface-elevated text-[var(--text-primary)]'
                      }`}
                    >
                      <span className="font-display text-xs font-bold">{room.name}</span>
                      <span className="font-mono-tech text-[10px] opacity-80">
                        {room.hotspotCount} Pins
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <a
                    href="https://360views.services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-platinum-primary text-xs font-semibold"
                  >
                    <span>Open 360views.services</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      'Hi SkyLine Digital! I tested the 360 Views prototype and want a similar web platform.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-whatsapp-official text-xs font-semibold"
                  >
                    <WhatsAppLogoIcon className="w-4 h-4" />
                    <span>Request Quote</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 2. FINVANTAGE CLOUD TREASURY & GST BILLING SAAS */}
          {activeId === 'finvantage-saas' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  <FileText className="w-3.5 h-3.5" />
                  <span>MULTI-TENANT GST INVOICE & SPLIT PAYOUT SIMULATOR</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  FinVantage Cloud Billing &amp; Razorpay Route Engine
                </h3>

                <div className="space-y-3 surface-elevated rounded-2xl p-5">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      SELECT ENTERPRISE TENANT ACCOUNT
                    </label>
                    <select
                      value={saasClient}
                      onChange={(e) => setSaasClient(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl surface-card text-xs font-semibold text-[var(--text-primary)]"
                    >
                      <option value="Meridian Distributors Pvt Ltd">Meridian Distributors Pvt Ltd (GSTIN: 23AABCM...)</option>
                      <option value="Apex MedTech Supply Chain">Apex MedTech Supply Chain (GSTIN: 27AAECA...)</option>
                      <option value="Malwa Cold-Chain Logistics">Malwa Cold-Chain Logistics (GSTIN: 23AAICM...)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono-tech mb-1">
                      <span>TAXABLE INVOICE SUBTOTAL</span>
                      <span className="font-bold">₹{saasBaseAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={15000}
                      max={500000}
                      step={5000}
                      value={saasBaseAmount}
                      onChange={(e) => setSaasBaseAmount(Number(e.target.value))}
                      className="w-full accent-[var(--text-primary)] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono-tech mb-1">
                      <span>RAZORPAY ROUTE VENDOR SPLIT (%)</span>
                      <span className="font-bold">{saasPayoutSplit}% Vendor / {100 - saasPayoutSplit}% Platform</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={95}
                      step={5}
                      value={saasPayoutSplit}
                      onChange={(e) => setSaasPayoutSplit(Number(e.target.value))}
                      className="w-full accent-[var(--text-primary)] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                    <div>
                      <div className="font-mono-tech text-[10px] text-[var(--text-muted)]">
                        LIVE TAX INVOICE PREVIEW
                      </div>
                      <div className="font-display text-sm font-bold">{saasClient}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] font-mono-tech text-[10px] font-bold">
                      18% GST AUTO-COMPUTED
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech">
                    <div className="surface-elevated p-3 rounded-xl">
                      <div className="text-[10px] text-[var(--text-muted)]">BASE AMOUNT</div>
                      <div className="text-base font-bold mt-0.5">₹{saasBaseAmount.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="surface-elevated p-3 rounded-xl">
                      <div className="text-[10px] text-[var(--text-muted)]">CGST (9%) + SGST (9%)</div>
                      <div className="text-base font-bold mt-0.5">₹{gstAmount.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="surface-elevated p-3 rounded-xl">
                      <div className="text-[10px] text-[var(--text-muted)]">VENDOR SETTLEMENT ({saasPayoutSplit}%)</div>
                      <div className="text-base font-bold mt-0.5">₹{vendorSplitInr.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="surface-elevated p-3 rounded-xl">
                      <div className="text-[10px] text-[var(--text-muted)]">TOTAL PAYABLE (INC. GST)</div>
                      <div className="text-base font-extrabold text-[#10B981] mt-0.5">
                        ₹{totalInvoice.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                        MULTI-TENANT LEDGER STREAM (PLATFORM FEE: ₹{platformRetainedInr.toLocaleString('en-IN')})
                      </span>
                      <div className="flex gap-1">
                        {(['ALL', 'SETTLED', 'PENDING'] as const).map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setSaasLedgerFilter(status)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono-tech cursor-pointer ${
                              saasLedgerFilter === status ? 'btn-platinum-primary' : 'surface-elevated'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. AURACARE MULTI-CLINIC BOOKING & MAP PACK #TOP ENGINE */}
          {activeId === 'auracare-local' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>CLINIC SLOT BOOKER + GOOGLE MAP PACK #TOP WIDGET</span>
                </div>
                <h3 className="font-display text-xl font-bold">
                  AuraCare Patient Booking &amp; Smart QR Review Engine
                </h3>

                <div className="surface-elevated rounded-2xl p-5 space-y-3">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      SELECT INDORE CLINIC BRANCH
                    </label>
                    <select
                      value={clinicBranch}
                      onChange={(e) => {
                        setClinicBranch(e.target.value);
                        setClinicBooked(false);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl surface-card text-xs font-semibold text-[var(--text-primary)]"
                    >
                      <option value="Vijay Nagar Flagship Clinic">Vijay Nagar Flagship Clinic (Indore)</option>
                      <option value="Palasia Dental & Skin Center">Palasia Dental &amp; Skin Center (Indore)</option>
                      <option value="Saket Square Specialty Wing">Saket Square Specialty Wing (Indore)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      '11:30 AM Tomorrow',
                      '01:00 PM Tomorrow',
                      '04:30 PM Tomorrow',
                      '06:15 PM Tomorrow',
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setClinicSlot(slot);
                          setClinicBooked(false);
                        }}
                        className={`p-2.5 rounded-xl font-mono-tech text-xs font-semibold cursor-pointer ${
                          clinicSlot === slot ? 'btn-platinum-primary' : 'surface-card'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setClinicBooked(true)}
                    className="w-full py-3 rounded-xl btn-whatsapp-official font-display text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <WhatsAppLogoIcon className="w-4 h-4" />
                    <span>
                      {clinicBooked
                        ? `Confirmed: ${clinicBranch} (${clinicSlot})`
                        : 'Simulate 1-Tap WhatsApp Slot Lock'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[10px] uppercase font-bold text-[var(--text-muted)]">
                      GOOGLE MAP PACK #TOP LOCAL RANK COMPARISON
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] font-mono-tech text-[10px] font-bold">
                      +215% CALLS
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="surface-elevated p-3.5 rounded-xl">
                      <div className="font-mono-tech text-[10px] text-[var(--text-muted)]">BEFORE SKYLINE</div>
                      <div className="font-display font-bold text-sm mt-1">Rank #14 (Page 2)</div>
                      <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">4.1★ (38 Reviews)</div>
                    </div>
                    <div className="surface-elevated p-3.5 rounded-xl border border-[#10B981]/40">
                      <div className="font-mono-tech text-[10px] text-[#10B981] font-bold">AFTER 28 DAYS</div>
                      <div className="font-display font-bold text-sm mt-1">Google Map Pack #Top</div>
                      <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">4.9★ (312 Verified Reviews)</div>
                    </div>
                  </div>

                  <div className="surface-elevated rounded-xl p-4 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-mono-tech text-[10px] font-bold uppercase">
                        RECEPTION SMART QR REVIEW STAND
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setQrRating(star)}
                            className={`text-base cursor-pointer ${
                              star <= qrRating ? 'text-[var(--text-primary)]' : 'opacity-30'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="font-mono-tech text-xs ml-2">{qrRating}.0 / 5.0</span>
                      </div>
                    </div>
                    <QrCode className="w-10 h-10 text-[var(--text-primary)] shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. A&A CHOCOLATES D2C STOREFRONT & META CAPI FUNNEL */}
          {activeId === 'aa-chocolates-d2c' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ARTISANAL HOMEMADE CHOCOLATE BOX CUSTOMIZER</span>
                </div>
                <h3 className="font-display text-xl font-bold">
                  A&amp;A Chocolates D2C Cart + 1-Tap UPI &amp; Meta CAPI Simulator
                </h3>

                <div className="space-y-2.5">
                  {[
                    { key: 'truffle' as const, name: 'Belgian Dark Ganache Truffle Box', price: 449 },
                    { key: 'almond' as const, name: 'Roasted California Almond Rocks', price: 399 },
                    { key: 'hazelnut' as const, name: 'Artisanal Hazelnut Praline Assortment', price: 499 },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="surface-elevated rounded-xl p-3.5 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-display text-xs font-bold">{item.name}</div>
                        <div className="font-mono-tech text-[11px] text-[var(--text-secondary)]">
                          ₹{item.price} / Handcrafted Box
                        </div>
                      </div>
                      <div className="flex items-center gap-2 font-mono-tech">
                        <button
                          type="button"
                          onClick={() => {
                            setUpiPaid(false);
                            setChocoCounts((prev) => ({
                              ...prev,
                              [item.key]: Math.max(0, prev[item.key] - 1),
                            }));
                          }}
                          className="w-7 h-7 rounded-lg surface-card font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-xs font-bold">
                          {chocoCounts[item.key]}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setUpiPaid(false);
                            setChocoCounts((prev) => ({
                              ...prev,
                              [item.key]: prev[item.key] + 1,
                            }));
                          }}
                          className="w-7 h-7 rounded-lg surface-card font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="surface-card rounded-2xl p-4 flex items-center justify-between border border-[var(--border-metallic)]">
                  <div>
                    <div className="font-mono-tech text-[10px] text-[var(--text-muted)]">LIVE INR CART TOTAL</div>
                    <div className="font-display text-xl font-extrabold">
                      ₹{chocoSubtotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUpiPaid(true)}
                    className="px-4 py-2.5 rounded-xl btn-platinum-primary text-xs font-bold cursor-pointer"
                  >
                    {upiPaid ? 'UPI Payment Verified + CAPI Fired ✓' : 'Simulate 1-Tap UPI Checkout'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-4">
                  <div className="font-mono-tech text-[10px] uppercase font-bold text-[var(--text-muted)]">
                    SERVER-SIDE META CONVERSIONS API (CAPI) ROAS CALCULATOR
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-mono-tech mb-1">
                      <span>MONTHLY META REELS AD SPEND</span>
                      <span className="font-bold">₹{adSpendInr.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={10000}
                      max={200000}
                      step={5000}
                      value={adSpendInr}
                      onChange={(e) => setAdSpendInr(Number(e.target.value))}
                      className="w-full accent-[var(--text-primary)] cursor-pointer"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech">
                    <div className="surface-elevated p-3.5 rounded-xl">
                      <div className="text-[10px] text-[var(--text-muted)]">VERIFIED ROAS MULTIPLIER</div>
                      <div className="text-lg font-extrabold mt-1">4.4x ROAS</div>
                    </div>
                    <div className="surface-elevated p-3.5 rounded-xl">
                      <div className="text-[10px] text-[var(--text-muted)]">ATTRIBUTED D2C REVENUE</div>
                      <div className="text-lg font-extrabold text-[#10B981] mt-1">
                        ₹{projectedCapiRevenue.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. NEXAPROP WHATSAPP AI LEAD QUALIFIER */}
          {activeId === 'nexaprop-crm' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  <Send className="w-3.5 h-3.5" />
                  <span>2-SECOND WHATSAPP CLOUD AI QUALIFIER</span>
                </div>
                <h3 className="font-display text-xl font-bold">
                  NexaProp Instant Brochure &amp; Site-Visit Slot Locker
                </h3>

                <div className="surface-elevated rounded-2xl p-4 space-y-3">
                  <div>
                    <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      1. SELECT BUYER BUDGET BRACKET
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {['₹45L - ₹65L', '₹65L - ₹90L', '₹1Cr+ Luxury'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => {
                            setPropBudget(b);
                            setPropLocked(false);
                          }}
                          className={`p-2 rounded-xl font-mono-tech text-[11px] font-semibold cursor-pointer ${
                            propBudget === b ? 'btn-platinum-primary' : 'surface-card'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      2. SELECT PLOT / VILLA CONFIGURATION
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {['1,200 sq.ft East Facing', '1,500 sq.ft Villa Plot', '2,400 sq.ft Corner Plot', '4BHK Club Villa'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            setPropPlotSize(p);
                            setPropLocked(false);
                          }}
                          className={`p-2 rounded-xl font-mono-tech text-[11px] font-semibold cursor-pointer ${
                            propPlotSize === p ? 'btn-platinum-primary' : 'surface-card'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPropLocked(true)}
                    className="w-full py-3 rounded-xl btn-whatsapp-official font-display text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <WhatsAppLogoIcon className="w-4 h-4" />
                    <span>Trigger 2-Second WhatsApp Brochure &amp; Site Visit Lock</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-3 font-mono-tech text-xs">
                  <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2.5">
                    <span className="font-bold">WHATSAPP CLOUD WEBHOOK TRANSCRIPT</span>
                    <span className="text-[#10B981] font-bold">SLA: 1.8 SECONDS</span>
                  </div>
                  <div className="p-3 rounded-xl surface-elevated">
                    <strong>Buyer Input:</strong> Interested in {propPlotSize} • Budget {propBudget}
                  </div>
                  <div className="p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30">
                    <strong>SkyLine WhatsApp Bot (Auto-Reply):</strong> Namaste! Here is the RERA-verified PDF floor plan for <strong>{propPlotSize}</strong> ({propBudget}). Your priority site-visit slot for <strong>{propVisitDay}</strong> is {propLocked ? 'CONFIRMED ✓' : 'ready to lock'}.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. SEARCHPULSE TECHNICAL SEO & AEO SCHEMA SANDBOX */}
          {activeId === 'searchpulse-seo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  <Search className="w-3.5 h-3.5" />
                  <span>JSON-LD ENTITY &amp; AI CITATION GENERATOR</span>
                </div>
                <h3 className="font-display text-xl font-bold">
                  SearchPulse SEO + ChatGPT / Perplexity AEO Sandbox
                </h3>
                <div className="space-y-3 surface-elevated p-4 rounded-2xl">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                      BUSINESS NAME
                    </label>
                    <input
                      type="text"
                      value={seoBusinessName}
                      onChange={(e) => setSeoBusinessName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl surface-card text-xs text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                        TARGET CITY
                      </label>
                      <input
                        type="text"
                        value={seoCity}
                        onChange={(e) => setSeoCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl surface-card text-xs text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                        SCHEMA TYPE
                      </label>
                      <select
                        value={seoCategory}
                        onChange={(e) => setSeoCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl surface-card text-xs text-[var(--text-primary)]"
                      >
                        <option value="MedicalClinic">MedicalClinic</option>
                        <option value="LocalBusiness">LocalBusiness</option>
                        <option value="SoftwareApplication">SoftwareApplication</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <pre className="p-4 rounded-2xl bg-[#09090B] text-zinc-200 font-mono-tech text-[11px] overflow-x-auto border border-white/10 leading-relaxed">
{`{
  "@context": "https://schema.org",
  "@type": "${seoCategory}",
  "name": "${seoBusinessName}",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "${seoCity}",
    "addressRegion": "Madhya Pradesh",
    "addressCountry": "IN"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "312"
  },
  "aeoCitationReady": true
}`}
                </pre>
              </div>
            </div>
          )}

          {/* 7. SHADOWBASE ZERO-DOWNTIME CDC & KAFKA SANDBOX (SACHIN SAHU) */}
          {activeId === 'shadowbase-cdc' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                    SACHIN SAHU • FOUNDER &amp; CEO • SPRING BOOT + DEBEZIUM CDC + KAFKA
                  </span>
                  <h3 className="font-display text-xl font-bold mt-2">
                    ShadowBase Zero-Downtime Database Migration &amp; Parity Verifier
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] font-mono-tech text-xs font-bold">
                  PARITY SCORE: 99.998% • ZERO LOCK CONTENTION
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-tech text-xs">
                <div className="p-4 rounded-2xl surface-elevated border border-[var(--border-metallic)] space-y-2">
                  <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase">
                    1. SOURCE POSTGRESQL WAL STREAM
                  </div>
                  <div className="font-display text-sm font-bold text-[var(--text-primary)]">
                    Debezium Connector Active
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Captures row-level INSERT/UPDATE/DELETE events directly from PostgreSQL write-ahead logs with sub-15ms overhead.
                  </p>
                </div>
                <div className="p-4 rounded-2xl surface-elevated border border-[var(--border-metallic)] space-y-2">
                  <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase">
                    2. APACHE KAFKA DUAL-STREAM ROUTER
                  </div>
                  <div className="font-display text-sm font-bold text-[var(--text-primary)]">
                    14,200 Events/sec Replayed
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Streams live production mutations in parallel to the target schema while Testcontainers validates schema invariants.
                  </p>
                </div>
                <div className="p-4 rounded-2xl surface-elevated border border-[var(--border-metallic)] space-y-2">
                  <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase">
                    3. AUTOMATED HASH RECONCILIATION
                  </div>
                  <div className="font-display text-sm font-bold text-[#10B981]">
                    0 Row Drift Detected ✓
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Asynchronous Spring Boot workers compare row checksums across legacy and target databases before cutover.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 7B. GRIDWEAVER IOT VIRTUAL THREAD MICROGRID ENGINE (SACHIN SAHU) */}
          {activeId === 'gridweaver-iot' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                    SACHIN SAHU • FOUNDER &amp; CEO • JAVA 21 VIRTUAL THREADS (LOOM) + KAFKA
                  </span>
                  <h3 className="font-display text-xl font-bold mt-2">
                    GridWeaver Live Microgrid Telemetry &amp; State Engine
                  </h3>
                </div>
                <span className="font-mono-tech text-xs text-[var(--text-secondary)]">
                  Click any battery node below to cycle live Kafka state transitions
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {iotNodes.map((node, idx) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => cycleNodeState(idx)}
                    className="p-4 rounded-2xl surface-elevated border border-[var(--border-metallic)] text-left space-y-2 hover:scale-[1.01] transition-transform cursor-pointer"
                  >
                    <div className="flex items-center justify-between font-mono-tech text-[10px]">
                      <span className="font-bold">{node.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold ${
                          node.state === 'Fault'
                            ? 'bg-red-500/20 text-red-400'
                            : node.state === 'Charging'
                              ? 'bg-[#10B981]/20 text-[#10B981]'
                              : 'badge-neutral'
                        }`}
                      >
                        {node.state}
                      </span>
                    </div>
                    <div className="font-display text-sm font-bold">{node.zone}</div>
                    <div className="font-mono-tech text-xs text-[var(--text-secondary)]">
                      Load Telemetry: <strong>{node.loadKw} kW</strong>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 8. FILEGUARD AI SHA-256 DOCUMENT INTEGRITY VERIFIER (AASHIF KHAN) */}
          {activeId === 'fileguard-security' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-3">
                <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  AASHIF KHAN • CO-FOUNDER &amp; SYSTEM ARCHITECT • SHA-256 VERIFIER
                </span>
                <h3 className="font-display text-xl font-bold">
                  FileGuard AI Real-Time SHA-256 &amp; Tamper Audit
                </h3>
                <div>
                  <label className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold mb-1">
                    ORIGINAL ANCHORED DOCUMENT PAYLOAD
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
                    INCOMING VERIFICATION PAYLOAD (EDIT ANY CHARACTER TO TEST TAMPER ALERT)
                  </label>
                  <textarea
                    rows={2}
                    value={tamperCheckInput}
                    onChange={(e) => setTamperCheckInput(e.target.value)}
                    className="w-full p-3 rounded-xl surface-elevated text-xs font-mono-tech text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-3 font-mono-tech text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">CRYPTOGRAPHIC AUDIT RESULT</span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isSignatureMatch
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {isSignatureMatch ? 'SIGNATURE VERIFIED ✓' : 'TAMPER DETECTED ✕'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl surface-elevated break-all">
                    <div className="text-[10px] text-[var(--text-muted)]">ANCHORED SHA-256 DIGEST</div>
                    <div className="mt-1 font-bold">{shaHashOriginal}</div>
                  </div>
                  <div className="p-3 rounded-xl surface-elevated break-all">
                    <div className="text-[10px] text-[var(--text-muted)]">COMPUTED INCOMING DIGEST</div>
                    <div className="mt-1 font-bold">{shaHashVerify}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 9. AI CAREER GUIDE & SOCIALITE (AASHIF KHAN) */}
          {(activeId === 'career-socialite' ||
            activeId === 'ai-career-mentor' ||
            activeId === 'socialite-network') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-3">
                <span className="px-3 py-1 rounded-full badge-neutral font-mono-tech text-[10px] font-bold">
                  AASHIF KHAN • CO-FOUNDER &amp; SYSTEM ARCHITECT • AI CAREER &amp; SOCIALITE
                </span>
                <h3 className="font-display text-xl font-bold">
                  Interactive Skill Roadmap &amp; Optimistic Social Feed
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(['Full-Stack Architect', 'AI/ML Engineer', 'Cloud DevOps'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setTargetRole(r)}
                      className={`px-3.5 py-2 rounded-xl font-mono-tech text-xs font-semibold cursor-pointer ${
                        targetRole === r ? 'btn-platinum-primary' : 'surface-elevated'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <div className="surface-elevated rounded-2xl p-4 space-y-2 text-xs">
                  <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    GENERATED 90-DAY MILESTONE ROADMAP: {targetRole.toUpperCase()}
                  </div>
                  <ul className="space-y-1.5 text-[var(--text-secondary)]">
                    <li>• Sprint 1: TypeScript, System Design &amp; Database Indexing</li>
                    <li>• Sprint 2: Production API Security, Caching &amp; CI/CD Pipelines</li>
                    <li>• Sprint 3: Live Capstone Deployment &amp; Architecture Viva Defense</li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="surface-card rounded-2xl p-5 border border-[var(--border-metallic)] space-y-3">
                  <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)] font-bold">
                    SOCIALITE REAL-TIME ENGAGEMENT CARD (ENGINEERED BY AASHIF KHAN)
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-primary)]">
                    Just shipped our sub-100ms Next.js 15 + WhatsApp Cloud CRM architecture from Indore!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSocialLiked((prev) => !prev);
                      setSocialLikes((prev) => (socialLiked ? prev - 1 : prev + 1));
                    }}
                    className="px-4 py-2 rounded-xl btn-platinum-primary text-xs font-mono-tech font-bold cursor-pointer"
                  >
                    {socialLiked ? `★ Upvoted (${socialLikes})` : `☆ Upvote Post (${socialLikes})`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
