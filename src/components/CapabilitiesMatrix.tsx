import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  Cpu,
  Layers,
  Terminal,
  TrendingUp,
  CheckCircle2,
  Store,
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
  InteractiveArtifactId as ArtifactDemoId,
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
} from '../data/agencyData';
import { WhatsAppBrandBadge } from './BrandIcons';
import { InteractiveArtifactModal } from './InteractiveArtifactModal';
import { MultiDeviceStage3D } from './HeroSection';

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
    headline: 'Google Business Profile Optimization, Online Slot Picker & WhatsApp Appointment Bot',
    bottleneck:
      'Patients searching for nearby clinics want to see doctor timings, consultation fees, and directions on mobile, while reception desks often miss calls during peak evening hours.',
    architectureStack: [
      'Google Business Profile Categories, Keywords & Photos',
      'Modern Clinic Website with Doctor Slot Picker',
      'Official WhatsApp Cloud API Appointment Bot',
      'Digital WhatsApp & Direct Google Review Link',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Local Search Discovery',
        detail: 'Patient finds your clinic on Google Maps & Search with clear services and timings.',
      },
      {
        step: '02',
        title: 'Online or WhatsApp Slot Booking',
        detail: 'Patient selects a preferred doctor and time slot on your website or via WhatsApp.',
      },
      {
        step: '03',
        title: 'Digital Google Review Link',
        detail: 'After the visit, send a direct WhatsApp review link so happy patients can rate you on their phone.',
      },
    ],
    verifiedMetric: 'Online Slot Picker',
    timeline: '1 to 3 Weeks Delivery',
    artifactId: 'auracare-local',
  },
  {
    id: 'realestate',
    label: 'Real Estate & PropTech',
    badge: 'DEVELOPERS • BROKERS • COMMERCIAL',
    headline: 'Interactive 360° Property Tours, Brochure Bot & Site-Visit Scheduling',
    bottleneck:
      'Static PDFs fail to showcase premium properties on mobile, and manual follow-ups delay site-visit scheduling for interested buyers.',
    architectureStack: [
      'Interactive 360° Spatial Web Showroom (like 360views.services)',
      'Automated WhatsApp Brochure PDF & Floor-Plan Sender',
      'Site-Visit Calendar Slot Picker & Lead Alerts',
      'Clean Admin Dashboard for Property Listings',
    ],
    workflowSteps: [
      {
        step: '01',
        title: '360° Virtual Room Tour',
        detail: 'Buyer explores Living Room, Master Suite, and Sky Deck hotspots right in their mobile browser.',
      },
      {
        step: '02',
        title: 'Instant WhatsApp Brochure',
        detail: 'Clicking Download Brochure triggers the WhatsApp bot to send the floor plan PDF.',
      },
      {
        step: '03',
        title: 'Site-Visit Confirmation',
        detail: 'Buyer selects a weekend site-visit slot and your sales team gets an instant WhatsApp alert.',
      },
    ],
    verifiedMetric: 'Live on 360views.services',
    timeline: '2 to 4 Weeks Delivery',
    artifactId: '360-views',
  },
  {
    id: 'd2c',
    label: 'D2C & Retail Brands',
    badge: 'E-COMMERCE • BOUTIQUES • GIFTING',
    headline: 'Custom D2C Online Storefront, Gift Box Builder & 1-Tap UPI Checkout',
    bottleneck:
      'Taking orders manually over Instagram DMs slows down sales, and multi-page checkout forms cause mobile shoppers to abandon their carts.',
    architectureStack: [
      'Fast Next.js Mobile Storefront & Visual Product Catalog',
      'Interactive Custom Hamper / Gift Box Configurator',
      '1-Tap GPay, PhonePe & Paytm UPI Checkout Integration',
      'Automated WhatsApp Order Confirmation & Tracking',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Visual Product & Box Selection',
        detail: 'Shopper browses your catalog or customizes a gift hamper with live ₹ INR cart calculation.',
      },
      {
        step: '02',
        title: '1-Tap UPI Payment',
        detail: 'Shopper completes payment smoothly via GPay, PhonePe, Paytm, or card.',
      },
      {
        step: '03',
        title: 'WhatsApp Order Update',
        detail: 'Customer and store admin receive instant order confirmation on WhatsApp.',
      },
    ],
    verifiedMetric: '1-Tap UPI Checkout',
    timeline: '2 to 3 Weeks Delivery',
    artifactId: 'aa-chocolates-d2c',
  },
  {
    id: 'edtech',
    label: 'SaaS, EdTech & Startups',
    badge: 'SAAS • EDTECH • B2B PORTALS',
    headline: 'Custom Web Applications, GST Billing Dashboards & Secure Backends',
    bottleneck:
      'Growing startups and B2B businesses outgrow spreadsheets and need a clean, role-based web dashboard with reliable database architecture.',
    architectureStack: [
      'React & Next.js Web Application with Clean Sidebar UI',
      'Node.js / TypeScript or Java 21 Spring Boot Backend APIs',
      'PostgreSQL Database with Role-Based Access Control',
      'Automated GST Invoicing & Exportable Reports',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Interactive UI/UX Prototype',
        detail: 'We design and preview your dashboard screens and user flows before backend coding.',
      },
      {
        step: '02',
        title: 'Full-Stack Development',
        detail: 'We build the frontend, role-based authentication, and PostgreSQL database tables.',
      },
      {
        step: '03',
        title: 'Code Handover & Support',
        detail: 'We deploy to your cloud account with 100% GitHub code ownership and 30-day free support.',
      },
    ],
    verifiedMetric: '100% Code Ownership',
    timeline: '3 to 6 Weeks Delivery',
    artifactId: 'finvantage-saas',
  },
];

type CapabilityFilterCategory =
  | 'All'
  | 'Web & Mobile'
  | 'SaaS & CRM'
  | 'AI & WhatsApp'
  | 'Local & Paid Growth';

interface CatalogCapabilityItem {
  id: string;
  category: Exclude<CapabilityFilterCategory, 'All'>;
  title: string;
  outcome: string;
  summary: string;
  techBadge: string;
  artifactId: ArtifactDemoId;
}

const CATALOG_CAPABILITIES: CatalogCapabilityItem[] = [
  {
    id: 'cat-1',
    category: 'Web & Mobile',
    title: 'Starter Business Websites & Landing Pages',
    outcome: 'Starts at ₹10,000',
    summary:
      'Clean, fast mobile-first websites for clinics, shops, consultants, and local businesses—open to discussion and budget negotiation.',
    techBadge: 'Next.js • Tailwind • Mobile SEO',
    artifactId: 'auracare-local',
  },
  {
    id: 'cat-2',
    category: 'Web & Mobile',
    title: '360° Interactive Property & Showroom Platforms',
    outcome: 'Live 360° Tours',
    summary:
      'Interactive spatial room tours with hotspots, property cards, and direct WhatsApp site-visit scheduling (like 360views.services).',
    techBadge: 'Next.js • 360° UI • WhatsApp API',
    artifactId: '360-views',
  },
  {
    id: 'cat-3',
    category: 'Web & Mobile',
    title: 'Custom D2C Online Stores & 1-Tap UPI Checkout',
    outcome: '1-Tap UPI Store',
    summary:
      'Visual product catalogs, custom gift box builders, slide-out ₹ INR carts, and Razorpay / UPI checkout.',
    techBadge: 'React • Razorpay UPI • Cart UI',
    artifactId: 'aa-chocolates-d2c',
  },
  {
    id: 'cat-4',
    category: 'AI & WhatsApp',
    title: 'WhatsApp Appointment & Brochure Bots',
    outcome: 'Instant Auto-Reply',
    summary:
      'Replies promptly to common customer questions, sends PDF brochures, collects basic lead details, and hands over to your team when needed.',
    techBadge: 'WhatsApp Cloud API • Webhooks',
    artifactId: 'nexaprop-crm',
  },
  {
    id: 'cat-5',
    category: 'AI & WhatsApp',
    title: 'AI Career Roadmaps & EdTech Portals',
    outcome: 'Custom AI Workflows',
    summary:
      'Interactive learning portals, skill-gap analyzers, and guided practice modules powered by clean AI backend routes.',
    techBadge: 'Python / Node AI • React',
    artifactId: 'ai-career-mentor',
  },
  {
    id: 'cat-6',
    category: 'SaaS & CRM',
    title: 'GST Billing & Business Admin Dashboards',
    outcome: 'Clean Admin Portal',
    summary:
      'Multi-user business portals with KPI cards, 18% GST invoice generators, client ledgers, and CSV/PDF exports.',
    techBadge: 'React • PostgreSQL • RBAC',
    artifactId: 'finvantage-saas',
  },
  {
    id: 'cat-7',
    category: 'SaaS & CRM',
    title: 'Safe SQL Schema Migration & Backend APIs',
    outcome: 'Java 21 & Node.js',
    summary:
      'Reliable backend microservices, Debezium CDC streams, and Docker Testcontainers verification for growing software teams.',
    techBadge: 'Java 21 • Spring Boot • Kafka',
    artifactId: 'shadowbase-cdc',
  },
  {
    id: 'cat-8',
    category: 'SaaS & CRM',
    title: 'SHA-256 Document Integrity & Verification Apps',
    outcome: 'Tamper-Evident Proof',
    summary:
      'Cryptographic SHA-256 document hashing and blockchain timestamp verification portals for agreements and records.',
    techBadge: 'SHA-256 • Node.js • React',
    artifactId: 'fileguard-security',
  },
  {
    id: 'cat-9',
    category: 'SaaS & CRM',
    title: 'IoT Telemetry & Live GIS Control Dashboards',
    outcome: 'Live GIS Map',
    summary:
      'Interactive map dashboards to monitor solar, battery, or fleet nodes with real-time status controls.',
    techBadge: 'Java 21 Loom • Leaflet GIS',
    artifactId: 'gridweaver-iot',
  },
  {
    id: 'cat-10',
    category: 'Local & Paid Growth',
    title: 'Google Business Profile (GBP) Optimization',
    outcome: 'Local Map Visibility',
    summary:
      'Complete optimization of your Google Business Profile categories, keywords, photos, local citations, and digital WhatsApp review links.',
    techBadge: 'GBP SEO • Digital Review Link',
    artifactId: 'auracare-local',
  },
  {
    id: 'cat-11',
    category: 'Local & Paid Growth',
    title: 'On-Page Google SEO & Structured Schema',
    outcome: 'Organic Search Growth',
    summary:
      'Service landing pages, LocalBusiness/FAQ JSON-LD schema, and mobile speed optimization so customers find you on Google.',
    techBadge: 'Schema.org • Search Console',
    artifactId: 'searchpulse-seo',
  },
  {
    id: 'cat-12',
    category: 'Web & Mobile',
    title: 'Creator Community & Social Feed Web Apps',
    outcome: 'Live Community Feed',
    summary:
      'Real-time community platforms with topic channels, post publishing, likes/comments, and creator analytics.',
    techBadge: 'Next.js • WebSockets • PostgreSQL',
    artifactId: 'socialite-network',
  },
];

export const CapabilitiesMatrix: React.FC<CapabilitiesMatrixProps> = ({
  onSelectCapability,
  pillars = CAPABILITY_PILLARS,
}) => {
  const [activeId, setActiveId] = useState<string>(pillars[0]?.id || 'cap-local');
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>('healthcare');
  const [capabilityFilter, setCapabilityFilter] = useState<CapabilityFilterCategory>('All');
  const [activeArtifactDemo, setActiveArtifactDemo] = useState<ArtifactDemoId | null>(null);

  const activePillar = useMemo(
    () => pillars.find((p) => p.id === activeId) || pillars[0],
    [pillars, activeId]
  );

  const activeBlueprint = useMemo(
    () => INDUSTRY_BLUEPRINTS.find((b) => b.id === activeBlueprintId) || INDUSTRY_BLUEPRINTS[0],
    [activeBlueprintId]
  );

  const filteredCapabilities = useMemo(() => {
    if (capabilityFilter === 'All') return CATALOG_CAPABILITIES;
    return CATALOG_CAPABILITIES.filter((item) => item.category === capabilityFilter);
  }, [capabilityFilter]);

  const getPillarIcon = (id: string) => {
    if (id.includes('local')) return <Store className="w-5 h-5" />;
    if (id.includes('web')) return <Globe className="w-5 h-5" />;
    if (id.includes('ai')) return <Cpu className="w-5 h-5" />;
    if (id.includes('ads')) return <TrendingUp className="w-5 h-5" />;
    if (id.includes('seo')) return <Search className="w-5 h-5" />;
    if (id.includes('saas')) return <Terminal className="w-5 h-5" />;
    return <Layers className="w-5 h-5" />;
  };

  const getIndustryIcon = (id: string) => {
    switch (id) {
      case 'healthcare':
        return <Stethoscope className="w-5 h-5" />;
      case 'realestate':
        return <Building2 className="w-5 h-5" />;
      case 'd2c':
        return <ShoppingBag className="w-5 h-5" />;
      case 'edtech':
      default:
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="solutions"
      className="pt-6 sm:pt-10 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl heading-icon-blue flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                SERVICES &amp; CAPABILITIES • STARTS AT ₹10,000 (FLEXIBLE &amp; NEGOTIABLE)
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
              Practical Software &amp;{' '}
              <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                Growth Systems.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
            Explore our core service tracks, launch live interactive website previews, or scroll down to our 60-second price estimator to write your custom requirements.
          </p>
        </div>

        {/* 7-Track Quick Selector Bar */}
        <div className="mb-12 p-4 sm:p-5 rounded-3xl surface-card">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
              QUICK SERVICE TRACK SELECTOR
            </span>
            <span className="font-mono-tech text-[10px] text-[var(--text-primary)]">
              Click any track to inspect deliverables
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {HERO_ORBS.map((orb, idx) => {
              const isSelected = activeTrackIndex === idx;
              return (
                <button
                  key={orb.id}
                  type="button"
                  onClick={() => {
                    setActiveTrackIndex(idx);
                    if (pillars[idx]) {
                      setActiveId(pillars[idx].id);
                    }
                  }}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer border-t border-white/15 ${
                    isSelected
                      ? 'btn-platinum-primary shadow-md'
                      : 'surface-elevated hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="inline-flex items-center justify-center">
                      {getTrackIcon(orb.id, 'w-3.5 h-3.5')}
                    </span>
                    <span
                      className={`font-mono-tech text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-black/15 text-current'
                          : 'surface-card text-[var(--text-primary)]'
                      }`}
                    >
                      {orb.metric}
                    </span>
                  </div>
                  <div className="font-display font-bold text-xs truncate">
                    {orb.label}
                  </div>
                  <div
                    className={`font-mono-tech text-[9px] truncate mt-0.5 ${
                      isSelected ? 'opacity-80' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {orb.psychName}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Core Pillar Selector Tabs */}
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
                            isActive ? 'opacity-80' : 'text-[var(--text-muted)]'
                          }`}
                        >
                          {pillar.categoryLabel}
                        </span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>

                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isActive
                          ? 'border border-current/20 bg-white/15 text-white scale-105'
                          : 'heading-icon-blue text-white'
                      }`}
                    >
                      {getPillarIcon(pillar.id)}
                    </div>
                  </div>

                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono-tech ${
                      isActive
                        ? 'border-current/15 opacity-90'
                        : 'border-[var(--border-hairline)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <span>
                      <strong>{pillar.outcomeMetric || 'Fast Mobile-First Loading'}</strong>
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

          {/* Right Column: Active Pillar Deep-Dive + Sleek 3D Multi-Device UI Stage */}
          <div className="lg:col-span-7 surface-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border-t border-white/15 space-y-6">
            {/* Sleek Interactive 3D-Tilt Multi-Device Live UI Showcase */}
            <MultiDeviceStage3D
              onLaunchPrototype={(artId) => setActiveArtifactDemo(artId)}
            />

            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-[var(--border-hairline)] pb-4">
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                  {activePillar.categoryLabel}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1">
                  {activePillar.title}
                </h3>
              </div>

              <span className="font-mono-tech text-xs font-bold px-3.5 py-1.5 rounded-full surface-elevated text-[var(--text-primary)]">
                {activePillar.timeline}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {activePillar.description || activePillar.subtitle}
            </p>

            {/* Deliverables Breakdown */}
            <div className="space-y-3">
              <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                INCLUDED DELIVERABLES &amp; FEATURES
              </div>

              {activePillar.deliverables.map((rawItem, idx) => {
                const item =
                  typeof rawItem === 'string'
                    ? {
                        name: rawItem,
                        spec: 'Clean, maintainable code with full source code ownership and 30-day free post-launch support.',
                        impact: activePillar.outcomeMetric || 'Included',
                      }
                    : rawItem;
                return (
                  <div
                    key={`${item.name}-${idx}`}
                    className="p-4 rounded-2xl surface-elevated border-t border-white/15 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
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
            <div className="pt-5 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[var(--text-secondary)]">
                Want to discuss{' '}
                <strong className="text-[var(--text-primary)]">
                  {activePillar.title}
                </strong>
                ?
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() =>
                    setActiveArtifactDemo(activePillar.artifactId || '360-views')
                  }
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full btn-platinum-secondary text-xs font-bold cursor-pointer"
                >
                  <span>Launch Live Prototype</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hi SkyLine Digital Agency! I want to discuss a project for ${activePillar.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full btn-whatsapp-official text-xs font-bold tracking-wide"
                >
                  <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                  <span>WhatsApp Us</span>
                </a>
                <button
                  onClick={() => onSelectCapability(activePillar.title)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full btn-platinum-primary text-xs font-bold tracking-wide cursor-pointer"
                >
                  <span>Request Custom Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            4 SPECIALIZED INDUSTRY BLUEPRINTS SWITCHER
           ================================================================= */}
        <div className="mt-20 pt-16 border-t border-[var(--border-hairline)]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[var(--text-primary)]" />
                <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                  INDUSTRY-SPECIFIC SOLUTIONS
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
              Switch between our industry blueprints and click Launch Live Prototype to explore a real working website UI inside your browser.
            </p>
          </div>

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
                          ? 'bg-white/15 text-white'
                          : 'heading-icon-emerald text-white'
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
                  THE CHALLENGE WE SOLVE
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
                  INCLUDED DELIVERABLES
                </div>
                <div className="space-y-2">
                  {activeBlueprint.architectureStack.map((item) => (
                    <div
                      key={item}
                      className="p-3 rounded-xl surface-card flex items-center gap-2.5 text-xs font-medium text-[var(--text-primary)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
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
                  <span>Launch Live Prototype</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onSelectCapability(`${activeBlueprint.label} Blueprint`)
                  }
                  className="w-full py-3 px-5 rounded-full btn-platinum-secondary text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request This Setup for Your Business</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            FILTERABLE 12-CAPABILITY GRID
           ================================================================= */}
        <div className="mt-20 pt-16 border-t border-[var(--border-hairline)]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl heading-icon-amber flex items-center justify-center shrink-0">
                  <Filter className="w-4 h-4 text-white" />
                </div>
                <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                  COMPLETE SERVICE CATALOG • 12 MODULES
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                What We Build &amp; Deliver.
              </h3>
            </div>

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
                    <span>TECH STACK</span>
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
                      <span>Launch Live Prototype</span>
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
            <div className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl heading-icon-crimson flex items-center justify-center shrink-0">
                <Store className="w-4 h-4 text-white" />
              </div>
              <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                LOCAL BUSINESS STARTER PACKAGES • FROM ₹10,000
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
              Running a Clinic, Salon, Restaurant, Gym, Showroom, or Retail Store?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Get a fast mobile-first website, Google Business Profile optimization, a digital WhatsApp review link for happy customers, and an automated WhatsApp inquiry/booking bot—starting at ₹10,000 and open to discussion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onSelectCapability('Local Business Website, Google Business SEO & WhatsApp Bot');
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-platinum-primary text-xs sm:text-sm font-bold cursor-pointer"
            >
              <span>Discuss Local Business Package</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Live Prototype Modal */}
      <InteractiveArtifactModal
        artifactId={activeArtifactDemo}
        onClose={() => setActiveArtifactDemo(null)}
      />
    </section>
  );
};
