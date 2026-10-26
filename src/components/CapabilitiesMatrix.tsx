import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  Cpu,
  Layers,
  Terminal,
  TrendingUp,
  CheckCircle2,
  Store,
  Activity,
  Cloud,
  Megaphone,
  Globe,
  Search,
  Workflow,
  MapPin,
  Play,
  Stethoscope,
  Building2,
  ShoppingBag,
  GraduationCap,
  Filter,
} from 'lucide-react';
import {
  CAPABILITY_PILLARS,
  CapabilityPillar,
  HERO_ORBS,
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
} from '../data/agencyData';
import { WhatsAppBrandBadge } from './BrandIcons';
import { InteractiveArtifactModal, ArtifactDemoId } from './InteractiveArtifactModal';

interface CapabilitiesMatrixProps {
  onSelectCapability: (pillarTitle: string) => void;
  pillars?: CapabilityPillar[];
}

const getTrackIcon = (id: string, className = 'w-4 h-4') => {
  switch (id) {
    case 'ai':
      return <Cpu className={className} />;
    case 'ads':
      return <Megaphone className={className} />;
    case 'saas':
      return <Cloud className={className} />;
    case 'web':
      return <Globe className={className} />;
    case 'seo':
      return <Search className={className} />;
    case 'crm':
      return <Workflow className={className} />;
    case 'local':
    default:
      return <MapPin className={className} />;
  }
};

interface IndustryBlueprint {
  id: string;
  label: string;
  badge: string;
  headline: string;
  bottleneck: string;
  architectureStack: string[];
  workflowSteps: { step: string; title: string; detail: string }[];
  verifiedMetric: string;
  timeline: string;
  artifactId: ArtifactDemoId;
}

const INDUSTRY_BLUEPRINTS: IndustryBlueprint[] = [
  {
    id: 'healthcare',
    label: 'Healthcare & Clinics',
    badge: 'CLINICS • HOSPITALS • DIAGNOSTICS',
    headline: 'Google Maps #Top Ranking, Automated Patient Slot Booking & QR Review Standees',
    bottleneck:
      'Patients searching "best clinic near me" pick the top 3 Google Map Pack results. Front desks miss 40% of evening calls and forget to collect Google reviews.',
    architectureStack: [
      'Google Business Profile Geo-Grid Optimization',
      'Official WhatsApp Cloud API Appointment Bot',
      'Smart Reception QR Review Routing',
      'Automated Reminder & Follow-Up Webhooks',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Local Search Discovery',
        detail: 'Patient finds your clinic in the #Top Google Map Pack with 4.9 star social proof.',
      },
      {
        step: '02',
        title: 'WhatsApp Slot Confirmation',
        detail: 'Patient taps WhatsApp to pick a doctor, date, and time slot in 30 seconds.',
      },
      {
        step: '03',
        title: 'Post-Visit Review Loop',
        detail: 'Reception QR standee sends a thank-you prompt and captures a 5-star Google review.',
      },
    ],
    verifiedMetric: '+240% Monthly Patient Bookings',
    timeline: '10 to 14 Days Launch',
    artifactId: 'auracare-local',
  },
  {
    id: 'realestate',
    label: 'Real Estate & PropTech',
    badge: 'BUILDERS • BROKERS • COMMERCIAL SPACES',
    headline: '360° Interactive Virtual Tours, Meta Lead Ad CAPI & Instant WhatsApp Site-Visit Bot',
    bottleneck:
      'Property inquiries go cold within 10 minutes if sales reps do not send floor plans, pricing sheets, and virtual tour links immediately.',
    architectureStack: [
      '360° Interactive WebGL Property Walkthrough',
      'Meta Lead Ads Server-Side CAPI Webhook',
      'Instant WhatsApp Brochure & Price Sheet Bot',
      'Automated Site-Visit Calendar & Agent Routing',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'High-Intent Ad & 360° Tour',
        detail: 'Buyer explores a 360° panoramic room tour directly on mobile before visiting.',
      },
      {
        step: '02',
        title: 'Sub-2s WhatsApp Qualification',
        detail: 'WhatsApp bot sends the PDF brochure and qualifies budget (2BHK/3BHK/Plot).',
      },
      {
        step: '03',
        title: 'Agent Pipeline Sync',
        detail: 'Confirmed weekend site visits lock directly into the sales team CRM with SMS reminders.',
      },
    ],
    verifiedMetric: '3.2x Site-Visit Conversion',
    timeline: '2 to 3 Weeks Launch',
    artifactId: '360-views',
  },
  {
    id: 'd2c-retail',
    label: 'D2C & Retail Showrooms',
    badge: 'D2C BRANDS • JEWELLERY • CAFE & RETAIL',
    headline: 'Sub-Second Storefront, 1-Tap UPI Checkout & Automated WhatsApp Cart Recovery',
    bottleneck:
      'Bloated templates take 5+ seconds to load on mobile data, causing 65% of buyers from Instagram Ads to drop off before payment.',
    architectureStack: [
      'Next.js 15 Edge Storefront (99+ CWV)',
      '1-Tap Razorpay / UPI Intent Checkout',
      'WhatsApp Abandoned Cart Recovery Flows',
      'Live Inventory & Corporate Gifting Portal',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Instant Mobile Catalog',
        detail: 'Shoppers browse hampers, variants, and pricing with zero page-reload lag.',
      },
      {
        step: '02',
        title: '1-Tap UPI Payment',
        detail: 'Direct GPay, PhonePe, and Paytm intent checkout reduces form friction.',
      },
      {
        step: '03',
        title: 'Automated Repeat Orders',
        detail: 'WhatsApp sends live dispatch tracking and 15-day reorder nudges automatically.',
      },
    ],
    verifiedMetric: '4.1% Storefront Checkout Conversion',
    timeline: '2 to 3 Weeks Launch',
    artifactId: 'aa-chocolates-d2c',
  },
  {
    id: 'b2b-saas',
    label: 'B2B SaaS & Education ERP',
    badge: 'SAAS FOUNDERS • FINTECH • COACHING & ERP',
    headline: 'Multi-Tenant Next.js & Spring Boot Platforms, Role-Based Portals & Subscription Billing',
    bottleneck:
      'Scaling startups hit database locks, slow dashboard queries, and manual onboarding bottlenecks when moving from MVP to enterprise clients.',
    architectureStack: [
      'Next.js 15 + TypeScript + Tailwind UI',
      'Java Spring Boot / Node.js API Microservices',
      'PostgreSQL Row-Level Security + Redis Cache',
      'Automated Stripe / Razorpay Subscription Webhooks',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Tenant Provisioning & RBAC',
        detail: 'Organizations sign up with isolated workspaces, SSO auth, and granular permissions.',
      },
      {
        step: '02',
        title: 'Real-Time Analytics & Billing',
        detail: 'Sub-50ms cached telemetry dashboards with automated invoice and usage metering.',
      },
      {
        step: '03',
        title: 'AI Copilot & Webhook Sync',
        detail: 'Built-in RAG assistant answers documentation queries and triggers CRM workflows.',
      },
    ],
    verifiedMetric: '99.98% Production Uptime SLA',
    timeline: '4 to 6 Weeks Launch',
    artifactId: 'finvantage-saas',
  },
];

type CapabilityFilterCategory =
  | 'All'
  | 'Web & Mobile'
  | 'SaaS & CRM'
  | 'AI & WhatsApp'
  | 'Local & Paid Growth';

interface EngineeredCapabilityCard {
  id: string;
  title: string;
  category: Exclude<CapabilityFilterCategory, 'All'>;
  techBadge: string;
  summary: string;
  outcome: string;
  artifactId: ArtifactDemoId;
}

const TWELVE_CAPABILITY_GRID: EngineeredCapabilityCard[] = [
  {
    id: 'cap-01',
    title: 'Next.js 15 Edge Web Platforms',
    category: 'Web & Mobile',
    techBadge: 'Next.js 15 • TypeScript',
    summary: 'Server-rendered web applications engineered for 99/100 Core Web Vitals and instant mobile paint.',
    outcome: '< 0.8s LCP Speed',
    artifactId: 'finvantage-saas',
  },
  {
    id: 'cap-02',
    title: '360° WebGL Virtual Walkthroughs',
    category: 'Web & Mobile',
    techBadge: 'Three.js • WebGL Panorama',
    summary: 'Interactive 360-degree showroom, clinic, and property tours with clickable spatial hotspots.',
    outcome: '3.2x Higher Engagement',
    artifactId: '360-views',
  },
  {
    id: 'cap-03',
    title: 'D2C Storefronts & 1-Tap UPI Checkout',
    category: 'Web & Mobile',
    techBadge: 'Razorpay • Shopify Headless',
    summary: 'High-converting product catalogs with custom box builders, pincode checks, and instant UPI flows.',
    outcome: '+190% Checkout Rate',
    artifactId: 'aa-chocolates-d2c',
  },
  {
    id: 'cap-04',
    title: 'Multi-Tenant SaaS Architecture',
    category: 'SaaS & CRM',
    techBadge: 'PostgreSQL • Redis • RBAC',
    summary: 'Isolated organization workspaces, role-based access control, audit logs, and subscription billing.',
    outcome: '99.98% Uptime SLA',
    artifactId: 'finvantage-saas',
  },
  {
    id: 'cap-05',
    title: 'Java Spring Boot & Kafka Microservices',
    category: 'SaaS & CRM',
    techBadge: 'Spring Boot • Apache Kafka',
    summary: 'High-throughput event-driven backends with idempotent REST APIs and real-time telemetry streams.',
    outcome: '12,400+ Events/sec',
    artifactId: 'gridweaver-iot',
  },
  {
    id: 'cap-06',
    title: 'Custom Lead & Pipeline CRM Portals',
    category: 'SaaS & CRM',
    techBadge: 'Node.js • Webhook Router',
    summary: 'Unified sales pipelines that capture website forms, Meta Lead Ads, and WhatsApp chats in one board.',
    outcome: 'Instant Webhook Capture',
    artifactId: 'nexaprop-crm',
  },
  {
    id: 'cap-07',
    title: 'Official WhatsApp Cloud API Bots',
    category: 'AI & WhatsApp',
    techBadge: 'Meta Cloud API • Webhooks',
    summary: '24/7 automated WhatsApp flows for catalog browsing, appointment booking, and payment links.',
    outcome: '< 1.2s Reply Speed',
    artifactId: 'nexaprop-crm',
  },
  {
    id: 'cap-08',
    title: 'AI Sales SDR & RAG Knowledge Agents',
    category: 'AI & WhatsApp',
    techBadge: 'LLM RAG • Vector Search',
    summary: 'Bilingual English and Hinglish AI agents trained on your pricing, FAQs, and inventory data.',
    outcome: '68% Auto-Qualification',
    artifactId: 'career-socialite',
  },
  {
    id: 'cap-09',
    title: 'AI Threat & Document Verification Pipelines',
    category: 'AI & WhatsApp',
    techBadge: 'Python • FastAPI • AST Scan',
    summary: 'Automated file sandboxing, entropy inspection, and structured data extraction for enterprise uploads.',
    outcome: 'Zero-Trust Upload Gate',
    artifactId: 'fileguard-security',
  },
  {
    id: 'cap-10',
    title: 'Google Map Pack #Top Local SEO',
    category: 'Local & Paid Growth',
    techBadge: 'GBP Geo-Grid • Citations',
    summary: 'Complete Google Business Profile optimization, NAP citation building, and local keyword authority.',
    outcome: '#Top Local Pack Rank',
    artifactId: 'auracare-local',
  },
  {
    id: 'cap-11',
    title: 'Smart QR Review Standees & Reputation Loop',
    category: 'Local & Paid Growth',
    techBadge: 'Dynamic QR • Auto-Reply',
    summary: 'Custom reception QR standees that turn daily walk-in customers into verified 5-star Google reviews.',
    outcome: '4.9★ Rating Growth',
    artifactId: 'auracare-local',
  },
  {
    id: 'cap-12',
    title: 'Server-Side Meta CAPI & AI Search (AEO)',
    category: 'Local & Paid Growth',
    techBadge: 'Meta CAPI • JSON-LD Schema',
    summary: 'First-party ad conversion tracking paired with JSON-LD entity graphs for ChatGPT and Perplexity.',
    outcome: '3.4x Verified ROAS',
    artifactId: 'searchpulse-seo',
  },
];

/**
 * Interactive 3-Tier Isometric Glass Architecture Stack & Live Pulse Matrix
 */
const IsometricArchitecturePulseStack: React.FC<{
  activePillar: CapabilityPillar;
  activeTrackIndex: number;
}> = ({ activePillar, activeTrackIndex }) => {
  const activeTrack = HERO_ORBS[activeTrackIndex] || HERO_ORBS[0];
  const accentHex = activeTrack.psychColor || '#52525B';

  const tierConfigs = [
    {
      tier: 'TIER 01 • ACQUISITION LAYER',
      title: 'Traffic & Local Map Pack Acquisition',
      sub:
        activePillar.id === 'local-business'
          ? 'Google Map Pack #Top • Local Citations • Smart QR Reviews'
          : 'Meta CAPI • Google Search Intent • JSON-LD Entity Graph',
      yOffset: 42,
    },
    {
      tier: 'TIER 02 • COMPUTE & DATA CORE',
      title: 'Sub-Second Next.js / Cloud Core',
      sub:
        activePillar.id === 'software-engineering'
          ? 'Next.js 15 Edge SSR • Java Spring Boot • PostgreSQL HA'
          : 'Edge API Gateway • Redis Cache • Webhook Router (<0.4s)',
      yOffset: 108,
    },
    {
      tier: 'TIER 03 • AUTONOMOUS CONVERSION',
      title: '24/7 WhatsApp AI & Revenue Conversion',
      sub:
        activePillar.id === 'ai-automation'
          ? 'Official WhatsApp Cloud Bot • RAG AI Qualifier • Auto-Booking'
          : '1-Tap UPI Checkout • Instant WhatsApp Dispatch • CRM Sync',
      yOffset: 174,
    },
  ];

  return (
    <div className="w-full surface-elevated rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden select-none">
      <div className="w-full flex items-center justify-between text-[10px] font-mono-tech text-[var(--text-muted)] mb-2">
        <span className="inline-flex items-center gap-1.5 text-[var(--text-primary)] font-semibold">
          <Activity className="w-3.5 h-3.5 text-[var(--text-primary)]" />
          <span>3-TIER ISOMETRIC ARCHITECTURE PULSE</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-black/[0.05] dark:bg-white/[0.06] text-[var(--text-primary)] font-bold">
          LIVE TELEMETRY
        </span>
      </div>

      <svg
        viewBox="0 0 360 236"
        className="w-full h-52 sm:h-56 block"
        aria-label="3-Tier Isometric Glass Architecture Stack with animated data packet pulses"
      >
        <defs>
          <linearGradient id="isoSlabFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--bg-surface)" stopOpacity="0.96" />
            <stop offset="100%" stopColor="var(--bg-elevated)" stopOpacity="0.88" />
          </linearGradient>
          <linearGradient id="isoAccentStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A1A1AA" />
            <stop offset="50%" stopColor={accentHex} />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        <path
          id="capPulseLeft"
          d="M 86 58 C 86 92, 118 96, 118 124 C 118 154, 86 158, 86 190"
          fill="none"
          stroke="url(#isoAccentStroke)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.65"
        />
        <path
          id="capPulseCenter"
          d="M 180 66 L 180 198"
          fill="none"
          stroke="#71717A"
          strokeWidth="1.6"
          strokeDasharray="3 4"
          opacity="0.7"
        />
        <path
          id="capPulseRight"
          d="M 274 58 C 274 92, 242 96, 242 124 C 242 154, 274 158, 274 190"
          fill="none"
          stroke="url(#isoAccentStroke)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.65"
        />

        {tierConfigs.map((item, idx) => {
          const y = item.yOffset;
          return (
            <g key={item.tier}>
              <polygon
                points={`180,${y - 24} 334,${y + 2} 180,${y + 28} 26,${y + 2}`}
                fill="rgba(0,0,0,0.08)"
                transform="translate(0, 4)"
              />
              <polygon
                points={`180,${y - 24} 334,${y + 2} 180,${y + 28} 26,${y + 2}`}
                fill="url(#isoSlabFill)"
                stroke={idx === 1 ? accentHex : 'var(--border-strong)'}
                strokeWidth={idx === 1 ? '1.6' : '1.15'}
              />

              <polyline
                points={`26,${y + 2} 180,${y + 28} 334,${y + 2}`}
                fill="none"
                stroke="#A1A1AA"
                strokeWidth="1.2"
                opacity="0.65"
              />

              <circle
                cx="66"
                cy={y + 1}
                r="3.8"
                fill={idx === 1 ? '#E4E4E7' : '#71717A'}
              />

              <text
                x="180"
                y={y - 6}
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="7.5"
                fontFamily="monospace"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                {item.tier}
              </text>

              <text
                x="180"
                y={y + 6}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="10"
                fontWeight="800"
              >
                {item.title}
              </text>

              <text
                x="180"
                y={y + 17}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="7.5"
                fontFamily="monospace"
              >
                {item.sub}
              </text>
            </g>
          );
        })}

        <circle r="4" fill={accentHex}>
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path="M 86 58 C 86 92, 118 96, 118 124 C 118 154, 86 158, 86 190"
          />
        </circle>
        <circle r="4.5" fill="#A1A1AA">
          <animateMotion
            dur="2.2s"
            repeatCount="indefinite"
            path="M 180 66 L 180 198"
          />
        </circle>
        <circle r="4" fill="#D4D4D8">
          <animateMotion
            dur="3.1s"
            repeatCount="indefinite"
            path="M 274 58 C 274 92, 242 96, 242 124 C 242 154, 274 158, 274 190"
          />
        </circle>
      </svg>

      <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between text-[10px] font-mono-tech text-[var(--text-secondary)]">
        <span>ACTIVE TRACK: {activeTrack.label}</span>
        <span className="font-bold text-[var(--text-primary)]">
          {activeTrack.metric} {activeTrack.metricLabel}
        </span>
      </div>
    </div>
  );
};

export const CapabilitiesMatrix: React.FC<CapabilitiesMatrixProps> = ({
  onSelectCapability,
  pillars = CAPABILITY_PILLARS,
}) => {
  const [activeId, setActiveId] = useState<string>(
    pillars[0]?.id || CAPABILITY_PILLARS[0].id
  );
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>(
    INDUSTRY_BLUEPRINTS[0].id
  );
  const [capabilityFilter, setCapabilityFilter] =
    useState<CapabilityFilterCategory>('All');
  const [activeArtifactDemo, setActiveArtifactDemo] =
    useState<ArtifactDemoId | null>(null);

  const activePillar =
    pillars.find((p) => p.id === activeId) || pillars[0] || CAPABILITY_PILLARS[0];

  const activeBlueprint =
    INDUSTRY_BLUEPRINTS.find((b) => b.id === activeBlueprintId) ||
    INDUSTRY_BLUEPRINTS[0];

  const filteredCapabilities = useMemo(() => {
    if (capabilityFilter === 'All') return TWELVE_CAPABILITY_GRID;
    return TWELVE_CAPABILITY_GRID.filter((c) => c.category === capabilityFilter);
  }, [capabilityFilter]);

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'software-engineering':
        return <Terminal className="w-5 h-5" />;
      case 'ai-automation':
        return <Cpu className="w-5 h-5" />;
      case 'growth-systems':
        return <TrendingUp className="w-5 h-5" />;
      case 'local-business':
        return <Store className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const getIndustryIcon = (id: string) => {
    switch (id) {
      case 'healthcare':
        return <Stethoscope className="w-4 h-4" />;
      case 'realestate':
        return <Building2 className="w-4 h-4" />;
      case 'd2c-retail':
        return <ShoppingBag className="w-4 h-4" />;
      case 'b2b-saas':
      default:
        return <GraduationCap className="w-4 h-4" />;
    }
  };

  const handleSelectTrackOrb = (idx: number, orbId: string) => {
    setActiveTrackIndex(idx);
    if (orbId === 'web' || orbId === 'saas') {
      setActiveId('software-engineering');
    } else if (orbId === 'ai' || orbId === 'crm') {
      setActiveId('ai-automation');
    } else if (orbId === 'ads' || orbId === 'seo') {
      setActiveId('growth-systems');
    } else if (orbId === 'local') {
      setActiveId('local-business');
    }
  };

  return (
    <section
      id="expertise"
      className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] relative bg-[var(--bg-canvas)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--text-primary)]" />
              <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                7-TRACK SERVICE ARCHITECTURE • SKYLINE DIGITAL AGENCY
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
              Systems We Build and{' '}
              <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                Run at Scale.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
            Inspect our 7 specialized engineering and growth tracks below, from custom Next.js and Spring Boot platforms to 24/7 WhatsApp AI bots and #Top Google Map Pack rankings.
          </p>
        </div>

        {/* 7-Track Interactive Pill Selector Bar */}
        <div className="mb-10 p-4 sm:p-5 rounded-3xl surface-card border-t border-white/15">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold">
              SELECT ANY OF OUR 7 CORE TRACKS TO INSPECT SYSTEM ARCHITECTURE:
            </span>
            <span className="font-mono-tech text-[11px] font-bold text-[var(--text-primary)]">
              {HERO_ORBS[activeTrackIndex]?.title}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {HERO_ORBS.map((orb, idx) => {
              const isSelected = activeTrackIndex === idx;
              return (
                <button
                  key={orb.id}
                  type="button"
                  onClick={() => handleSelectTrackOrb(idx, orb.id)}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer border border-t border-white/15 flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'btn-platinum-primary shadow-md'
                      : 'surface-elevated hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-white/15 text-current'
                          : 'bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-xs dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 text-[var(--text-primary)]'
                      }`}
                    >
                      {getTrackIcon(orb.id, 'w-4 h-4')}
                    </span>
                    <span className="font-mono-tech text-[10px] font-bold opacity-80">
                      {orb.metric}
                    </span>
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-xs tracking-wide">
                      {orb.label}
                    </div>
                    <div
                      className={`text-[10px] truncate ${
                        isSelected ? 'opacity-80' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {orb.metricLabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4 Core Architecture Pillar Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar) => {
              const isActive = pillar.id === activeId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveId(pillar.id)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden border-t border-white/15 ${
                    isActive
                      ? 'btn-platinum-primary shadow-xl'
                      : 'surface-card hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-mono-tech text-[10px] uppercase tracking-widest font-semibold ${
                            isActive
                              ? 'opacity-80'
                              : 'text-[var(--text-muted)]'
                          }`}
                        >
                          {pillar.subtitle}
                        </span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>

                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isActive
                          ? 'border border-current/20 bg-white/10 scale-105'
                          : 'bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-sm dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 dark:shadow-inner text-[var(--text-primary)]'
                      }`}
                    >
                      {getPillarIcon(pillar.id)}
                    </div>
                  </div>

                  {/* Quick metric preview */}
                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono-tech ${
                      isActive
                        ? 'border-current/15 opacity-90'
                        : 'border-[var(--border-hairline)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <span>
                      {pillar.metrics && pillar.metrics[0] ? (
                        <>
                          {pillar.metrics[0].label}:{' '}
                          <strong>{pillar.metrics[0].value}</strong>
                        </>
                      ) : (
                        <strong>{pillar.outcomeMetric || '99.98% SLA'}</strong>
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <span>Inspect Track</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Pillar Deep-Dive + 3-Tier Isometric System Pulse */}
          <div className="lg:col-span-7 surface-card rounded-3xl p-6 sm:p-9 relative overflow-hidden border-t border-white/15">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-3">
                <span className="font-mono-tech text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">
                  {activePillar.subtitle}
                </span>
              </div>

              <span className="font-mono-tech text-[11px] px-3 py-1 rounded-full surface-elevated text-[var(--text-primary)]">
                {activePillar.architectureNote || 'Next.js 15 Edge + Cloud API'}
              </span>
            </div>

            {/* Interactive 3-Tier Isometric Architecture Stack + Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-6 items-center">
              <div className="md:col-span-7">
                <IsometricArchitecturePulseStack
                  activePillar={activePillar}
                  activeTrackIndex={activeTrackIndex}
                />
              </div>

              <div className="md:col-span-5 space-y-3">
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {activePillar.description || activePillar.subtitle}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 pt-1">
                  {(
                    activePillar.metrics || [
                      {
                        label: 'Outcome',
                        value: activePillar.outcomeMetric || '+150%',
                        delta: activePillar.timeline || '2 to 3 Weeks',
                      },
                    ]
                  ).map((metric) => (
                    <div
                      key={metric.label}
                      className="p-3.5 rounded-2xl surface-elevated border-t border-white/15 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">
                          {metric.label}
                        </span>
                        <span className="font-mono-tech text-[10px] font-semibold text-[var(--text-secondary)]">
                          {metric.delta}
                        </span>
                      </div>
                      <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables Breakdown */}
            <div className="space-y-3">
              <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                INCLUDED DELIVERABLES & OUTCOMES
              </div>

              {activePillar.deliverables.map((rawItem, idx) => {
                const item =
                  typeof rawItem === 'string'
                    ? {
                        name: rawItem,
                        spec: 'Production-grade engineering and automated integration.',
                        impact: activePillar.outcomeMetric || 'Verified SLA',
                      }
                    : rawItem;
                return (
                  <div
                    key={`${item.name}-${idx}`}
                    className="p-4 sm:p-5 rounded-2xl surface-elevated border-t border-white/15 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                        <h4 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)]">
                          {item.name}
                        </h4>
                      </div>
                      <span className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded-full badge-platinum w-fit font-semibold">
                        {item.impact}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] pl-6">
                      {item.spec}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-7 pt-5 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[var(--text-secondary)]">
                Need a custom package for{' '}
                <strong className="text-[var(--text-primary)]">
                  {activePillar.title}
                </strong>
                ?
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hi SkyLine Digital Agency! I want a custom proposal for ${activePillar.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full btn-whatsapp-official text-xs font-bold tracking-wide"
                >
                  <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                  <span>WhatsApp Us</span>
                </a>
                <button
                  onClick={() => onSelectCapability(activePillar.title)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full btn-platinum-primary text-xs font-bold tracking-wide cursor-pointer"
                >
                  <span>Request Custom Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            MODULE 6.1A: 4 SPECIALIZED INDUSTRY BLUEPRINTS SWITCHER
           ================================================================= */}
        <div className="mt-20 pt-16 border-t border-[var(--border-hairline)]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[var(--text-primary)]" />
                <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                  INDUSTRY-SPECIFIC ARCHITECTURES
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                4 Specialized{' '}
                <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                  Industry Blueprints.
                </span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
              Switch between our pre-engineered vertical blueprints to see how we solve industry bottlenecks with live interactive prototypes.
            </p>
          </div>

          {/* 4 Industry Switcher Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {INDUSTRY_BLUEPRINTS.map((bp) => {
              const isSelected = bp.id === activeBlueprint.id;
              return (
                <button
                  key={bp.id}
                  type="button"
                  onClick={() => setActiveBlueprintId(bp.id)}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer border border-t border-white/15 flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'btn-platinum-primary shadow-lg'
                      : 'surface-card hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-white/15 text-current'
                          : 'bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-sm dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 dark:shadow-inner text-[var(--text-primary)]'
                      }`}
                    >
                      {getIndustryIcon(bp.id)}
                    </span>
                    <div>
                      <div className="font-display font-bold text-xs sm:text-sm">
                        {bp.label}
                      </div>
                      <div
                        className={`font-mono-tech text-[10px] ${
                          isSelected ? 'opacity-80' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {bp.timeline}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 shrink-0 opacity-75" />
                </button>
              );
            })}
          </div>

          {/* Active Industry Blueprint Detail Card */}
          <div className="surface-card rounded-3xl p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full badge-platinum font-mono-tech text-[10px] font-bold uppercase tracking-wider">
                  {activeBlueprint.badge}
                </span>
                <span className="px-3 py-1 rounded-full surface-elevated font-mono-tech text-[11px] font-bold text-[var(--text-primary)]">
                  {activeBlueprint.verifiedMetric}
                </span>
              </div>

              <h4 className="font-display text-xl sm:text-3xl font-extrabold text-[var(--text-primary)] leading-tight">
                {activeBlueprint.headline}
              </h4>

              <div className="p-4 rounded-2xl surface-elevated space-y-1.5">
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                  THE INDUSTRY BOTTLENECK WE SOLVE
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {activeBlueprint.bottleneck}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeBlueprint.workflowSteps.map((wf) => (
                  <div
                    key={wf.step}
                    className="p-4 rounded-2xl surface-elevated flex flex-col justify-between gap-2"
                  >
                    <div className="font-mono-tech text-[10px] font-bold text-[var(--text-muted)]">
                      STEP {wf.step}
                    </div>
                    <div className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                      {wf.title}
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      {wf.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 surface-elevated rounded-2xl p-5 sm:p-6 space-y-5">
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3">
                  DEPLOYED STACK & INTEGRATIONS
                </div>
                <div className="space-y-2">
                  {activeBlueprint.architectureStack.map((item) => (
                    <div
                      key={item}
                      className="p-3 rounded-xl surface-card flex items-center gap-2.5 text-xs font-medium text-[var(--text-primary)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveArtifactDemo(activeBlueprint.artifactId)}
                  className="w-full py-3.5 px-5 rounded-full btn-platinum-primary text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Live Interactive Prototype</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onSelectCapability(`${activeBlueprint.label} Blueprint`)
                  }
                  className="w-full py-3 px-5 rounded-full btn-platinum-secondary text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request This Blueprint for Your Business</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            MODULE 6.1B: FILTERABLE 12-CAPABILITY GRID (UNDER THE HOOD)
           ================================================================= */}
        <div className="mt-20 pt-16 border-t border-[var(--border-hairline)]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Filter className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                  COMPLETE ENGINEERING CATALOG • 12 PRODUCTION MODULES
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Under the Hood: What We Engineer.
              </h3>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  'All',
                  'Web & Mobile',
                  'SaaS & CRM',
                  'AI & WhatsApp',
                  'Local & Paid Growth',
                ] as CapabilityFilterCategory[]
              ).map((cat) => {
                const active = capabilityFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCapabilityFilter(cat)}
                    className={`px-3.5 py-2 rounded-full font-mono-tech text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'btn-platinum-primary shadow-sm'
                        : 'surface-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCapabilities.map((item) => (
              <div
                key={item.id}
                className="surface-card rounded-3xl p-6 flex flex-col justify-between gap-5 hover:border-[var(--border-strong)] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md surface-elevated font-mono-tech text-[10px] font-bold text-[var(--text-secondary)]">
                      {item.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full badge-platinum font-mono-tech text-[10px] font-bold">
                      {item.outcome}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-extrabold text-[var(--text-primary)]">
                    {item.title}
                  </h4>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-hairline)] space-y-3">
                  <div className="font-mono-tech text-[10px] text-[var(--text-muted)] flex items-center justify-between">
                    <span>STACK SPEC</span>
                    <strong className="text-[var(--text-primary)]">
                      {item.techBadge}
                    </strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveArtifactDemo(item.artifactId)}
                      className="flex-1 py-2.5 px-3.5 rounded-xl btn-platinum-primary text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Launch Live Interactive Prototype</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectCapability(item.title)}
                      className="p-2.5 rounded-xl btn-platinum-secondary text-[var(--text-primary)] cursor-pointer"
                      title={`Request quote for ${item.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Local Business Spotlight Banner */}
        <div
          id="local-business"
          className="mt-14 surface-card rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-[var(--text-primary)]" />
              <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                SPECIALIZED LOCAL BUSINESS PACKAGES
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
              Running a Clinic, Salon, Restaurant, Gym, Showroom, or Retail Store?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Get our complete Local Growth System: #Top Google Map Pack SEO, automated 5-star Google review QR standees, a mobile-first digital catalog, and a 24/7 WhatsApp booking bot.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveId('local-business');
                onSelectCapability('Local Business Growth, Map Pack SEO & Digital Catalogs');
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-platinum-primary text-xs sm:text-sm font-bold cursor-pointer"
            >
              <span>Claim Local Business Package</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Live Prototype Modal */}
      <InteractiveArtifactModal
        demoId={activeArtifactDemo}
        onClose={() => setActiveArtifactDemo(null)}
      />
    </section>
  );
};
