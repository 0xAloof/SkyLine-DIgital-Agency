import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Check,
  ArrowUpRight,
  Layers,
  ShieldCheck,
  Clock,
  Cpu,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { SKYLINE_WHATSAPP_NUMBER } from '../data/agencyData';
import { WhatsAppBrandBadge } from './BrandIcons';

export type SimulatorDomain =
  | 'web-saas'
  | 'ai-automation'
  | 'paid-ads'
  | 'seo-content';
export type SimulatorScale = 'launch' | 'growth' | 'enterprise';
export type SimulatorUrgency = 'standard' | 'accelerated';

interface SystemArchitectSimulatorProps {
  onLockBlueprint: (summaryText: string, selectedDomains: string[]) => void;
  onSubmitLead?: (payload: {
    name: string;
    phoneOrEmail: string;
    selectedPillars: string[];
    budgetTier: string;
    projectSummary: string;
  }) => Promise<void>;
}

const DOMAIN_OPTIONS: {
  id: SimulatorDomain;
  label: string;
  tag: string;
  timelineLabel: string;
  priceLabel: string;
  startingPriceInr: number;
  autoTier: SimulatorScale;
  desc: string;
}[] = [
  {
    id: 'web-saas',
    label: 'Website, Web App or SaaS',
    tag: 'WEB / SAAS',
    timelineLabel: '2 to 6 Weeks',
    priceLabel: 'Starting from ₹30,000',
    startingPriceInr: 30000,
    autoTier: 'enterprise',
    desc: 'Fast Next.js business website, custom web app, or multi-user SaaS portal',
  },
  {
    id: 'ai-automation',
    label: 'WhatsApp Bot & Lead Automation',
    tag: 'WHATSAPP AI',
    timelineLabel: '1 to 4 Weeks',
    priceLabel: 'Starting from ₹25,000',
    startingPriceInr: 25000,
    autoTier: 'growth',
    desc: '24/7 WhatsApp appointment booking, brochure PDF dispatch & instant lead alerts',
  },
  {
    id: 'paid-ads',
    label: 'Meta & Google Ads Funnel',
    tag: 'PAID ADS',
    timelineLabel: '4 to 6 Weeks',
    priceLabel: 'Starting with ₹20,000',
    startingPriceInr: 20000,
    autoTier: 'growth',
    desc: 'Targeted Instagram Reels & Google Search ad funnels paired with landing pages',
  },
  {
    id: 'seo-content',
    label: 'Local Maps & Search SEO',
    tag: 'LOCAL SEO',
    timelineLabel: '2 to 4 Weeks',
    priceLabel: 'Starting from ₹15,000',
    startingPriceInr: 15000,
    autoTier: 'launch',
    desc: 'Google Business Profile optimization, digital WhatsApp review link & search SEO',
  },
];

const SCALE_OPTIONS: {
  id: SimulatorScale;
  label: string;
  sub: string;
}[] = [
  {
    id: 'launch',
    label: 'Starter / Local Business',
    sub: 'Starts at ₹10,000 – ₹20,000 (Local Maps SEO, clinics, shops & landing pages)',
  },
  {
    id: 'growth',
    label: 'Growth Brand / D2C Store',
    sub: '₹20,000 – ₹45,000 (WhatsApp Bot, Paid Ads Funnel & 1-Tap UPI Store)',
  },
  {
    id: 'enterprise',
    label: 'Custom Web App / SaaS',
    sub: '₹30,000 – ₹1,00,000+ (Custom Website, Web App, SaaS Portal & APIs)',
  },
];

const URGENCY_OPTIONS: {
  id: SimulatorUrgency;
  label: string;
  sub: string;
}[] = [
  { id: 'standard', label: 'Standard Delivery', sub: '2 to 6 Weeks' },
  { id: 'accelerated', label: 'Fast-Track Launch', sub: '1 to 3 Weeks' },
];

const PRICE_LINE_STOPS: { value: number; label: string; tierHint: string }[] = [
  { value: 10000, label: '₹10K', tierHint: 'Starter Landing Page / Basic Setup' },
  { value: 15000, label: '₹15K', tierHint: 'Local Maps & Search SEO (2–4 Weeks)' },
  { value: 20000, label: '₹20K', tierHint: 'Meta & Google Ads Funnel (4–6 Weeks)' },
  { value: 25000, label: '₹25K', tierHint: 'WhatsApp Bot & Lead Automation (1–4 Weeks)' },
  { value: 30000, label: '₹30K', tierHint: 'Website, Web App or SaaS (2–6 Weeks)' },
  { value: 50000, label: '₹50K', tierHint: 'Full-Stack Web App + WhatsApp AI + UPI' },
  { value: 75000, label: '₹75K', tierHint: 'Multi-Module SaaS Portal + Admin Dashboard' },
  { value: 100000, label: '₹1L+', tierHint: 'Enterprise SaaS + AI Automation + Growth Stack' },
];

const DOMAIN_BASE_PRICE_MAP: Record<SimulatorDomain, number> = {
  'seo-content': 15000,
  'paid-ads': 20000,
  'ai-automation': 25000,
  'web-saas': 30000,
};

const DOMAIN_TIMELINE_MAP: Record<SimulatorDomain, string> = {
  'seo-content': '2 to 4 Weeks',
  'paid-ads': '4 to 6 Weeks',
  'ai-automation': '1 to 4 Weeks',
  'web-saas': '2 to 6 Weeks',
};

function computeScopeBlueprint(config: {
  domains: SimulatorDomain[];
  scale: SimulatorScale;
  urgency: SimulatorUrgency;
}) {
  const { domains, scale, urgency } = config;
  const domainCount = domains.length;

  const headlineParts: string[] = [];
  if (domains.includes('web-saas')) headlineParts.push('Website, Web App or SaaS');
  if (domains.includes('ai-automation')) headlineParts.push('WhatsApp Bot & Lead Automation');
  if (domains.includes('paid-ads')) headlineParts.push('Meta & Google Ads Funnel');
  if (domains.includes('seo-content')) headlineParts.push('Local Maps & Search SEO');

  const headline = headlineParts.join(' + ');

  // Calculate base starting price from selected domains and tier
  const highestSelectedDomainBase = domains.reduce(
    (max, d) => Math.max(max, DOMAIN_BASE_PRICE_MAP[d]),
    15000,
  );
  const additionalDomainsAddon = Math.max(0, domainCount - 1) * 7000;

  let minInr = highestSelectedDomainBase + additionalDomainsAddon;
  if (scale === 'launch' && domainCount === 1 && domains[0] === 'seo-content') {
    minInr = 15000;
  } else if (scale === 'launch' && domainCount === 1) {
    minInr = Math.min(highestSelectedDomainBase, 15000);
  } else if (scale === 'enterprise') {
    minInr = Math.max(30000, highestSelectedDomainBase + additionalDomainsAddon);
  }

  const maxInr =
    scale === 'launch'
      ? Math.max(minInr + 10000, 25000)
      : scale === 'growth'
        ? Math.max(minInr + 18000, 45000)
        : Math.max(minInr + 35000, 85000);

  const estimatedRange = `₹${minInr.toLocaleString('en-IN')} – ₹${maxInr.toLocaleString('en-IN')}`;

  // Determine timeline based on selected service(s)
  let baseTimeline = '2 to 6 Weeks';
  if (domainCount === 1) {
    baseTimeline = DOMAIN_TIMELINE_MAP[domains[0]];
  } else if (domains.includes('web-saas') || domains.includes('paid-ads')) {
    baseTimeline = '2 to 6 Weeks';
  } else {
    baseTimeline = '2 to 4 Weeks';
  }

  const estimatedWeeks =
    urgency === 'accelerated'
      ? scale === 'launch'
        ? '1 to 2 Weeks'
        : '2 to 3 Weeks'
      : baseTimeline;

  const sprintCount = scale === 'launch' ? 2 : scale === 'growth' ? 3 : 4;

  const recommendedStack: string[] = ['Next.js & React', 'TypeScript'];
  if (domains.includes('web-saas')) {
    recommendedStack.push('PostgreSQL', 'Clean Admin Dashboard', '1-Tap UPI Checkout');
  }
  if (domains.includes('ai-automation')) {
    recommendedStack.push('WhatsApp Cloud API', 'Brochure & Slot Bot', 'Team Handover');
  }
  if (domains.includes('paid-ads')) {
    recommendedStack.push('Meta Conversions API', 'Google Search Ads', 'Conversion Lander');
  }
  if (domains.includes('seo-content')) {
    recommendedStack.push('Google Business Profile SEO', 'Local Schema', 'Digital WhatsApp Review Link');
  }

  const primaryDeliverables: string[] = [];
  if (domains.includes('web-saas')) {
    primaryDeliverables.push(
      'Fast mobile-first website, web app, or SaaS portal (2 to 6 Weeks • From ₹30,000)',
      'Clean admin dashboard & 100% GitHub source code ownership'
    );
  }
  if (domains.includes('ai-automation')) {
    primaryDeliverables.push(
      'WhatsApp bot for 24/7 FAQs, brochure sharing & slot booking (1 to 4 Weeks • From ₹25,000)'
    );
  }
  if (domains.includes('paid-ads')) {
    primaryDeliverables.push(
      'Targeted Meta & Google ad funnels with dedicated landing page (4 to 6 Weeks • From ₹20,000)'
    );
  }
  if (domains.includes('seo-content')) {
    primaryDeliverables.push(
      'Google Business Profile SEO, local citations & WhatsApp review link (2 to 4 Weeks • From ₹15,000)'
    );
  }

  const projectedKpis: string[] = [
    'Fast Mobile-First Loading',
    'Direct WhatsApp Lead Alerts',
    '100% Source Code Ownership',
    '30-Day Free Post-Launch Support',
  ];

  const architectureSummary = `Practical ${
    scale === 'launch' ? 'Starter' : scale === 'growth' ? 'Growth' : 'Custom SaaS'
  } roadmap combining ${headline} — Estimated Range: ${estimatedRange} (Open to Discussion & Negotiation).`;

  return {
    headline,
    minInr,
    maxInr,
    estimatedRange,
    architectureSummary,
    estimatedWeeks,
    sprintCount,
    recommendedStack,
    primaryDeliverables,
    projectedKpis,
  };
}

export const SystemArchitectSimulator: React.FC<SystemArchitectSimulatorProps> = ({
  onLockBlueprint,
  onSubmitLead,
}) => {
  const [domains, setDomains] = useState<SimulatorDomain[]>(['web-saas']);
  const [scale, setScale] = useState<SimulatorScale>('enterprise');
  const [urgency, setUrgency] = useState<SimulatorUrgency>('standard');
  const [sliderBudgetInr, setSliderBudgetInr] = useState<number>(30000);

  // Dedicated Client Custom Requirements Input State
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [customRequirements, setCustomRequirements] = useState<string>('');
  const [submittingQuote, setSubmittingQuote] = useState<boolean>(false);
  const [quoteSubmittedMessage, setQuoteSubmittedMessage] = useState<string | null>(null);

  const applyAutoTierForDomain = (domainId: SimulatorDomain) => {
    const matchedOption = DOMAIN_OPTIONS.find((d) => d.id === domainId);
    if (matchedOption) {
      setScale(matchedOption.autoTier);
      setSliderBudgetInr(matchedOption.startingPriceInr);
    }
  };

  const toggleDomain = (id: SimulatorDomain) => {
    // Always automatically select the mapped Project Tier when a user clicks a service card
    applyAutoTierForDomain(id);

    setDomains((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleManualScaleSelect = (nextScale: SimulatorScale) => {
    setScale(nextScale);
    if (nextScale === 'launch') {
      setSliderBudgetInr(15000);
    } else if (nextScale === 'growth') {
      setSliderBudgetInr(25000);
    } else {
      setSliderBudgetInr(30000);
    }
  };

  const handleBudgetSliderChange = (nextVal: number) => {
    setSliderBudgetInr(nextVal);
    if (nextVal <= 18000) {
      setScale('launch');
    } else if (nextVal < 30000) {
      setScale('growth');
    } else {
      setScale('enterprise');
    }
  };

  const blueprint = useMemo(
    () =>
      computeScopeBlueprint({
        domains,
        scale,
        urgency,
      }),
    [domains, scale, urgency]
  );

  const activePriceStop = useMemo(() => {
    let closest = PRICE_LINE_STOPS[0];
    for (const stop of PRICE_LINE_STOPS) {
      if (sliderBudgetInr >= stop.value) {
        closest = stop;
      }
    }
    return closest;
  }, [sliderBudgetInr]);

  const formattedSliderBudget =
    sliderBudgetInr >= 100000
      ? '₹1,00,000+'
      : `₹${sliderBudgetInr.toLocaleString('en-IN')}`;

  const selectedLabels = useMemo(
    () =>
      DOMAIN_OPTIONS.filter((d) => domains.includes(d.id)).map((d) => d.label),
    [domains]
  );

  const buildCombinedSummaryText = () => {
    const parts = [
      `Target Budget Line: ${formattedSliderBudget} (Estimated Range: ${blueprint.estimatedRange} • Flexible & Negotiable)`,
      `Selected Services: ${selectedLabels.join(', ')}`,
      `Timeline: ${blueprint.estimatedWeeks}`,
    ];
    if (clientName.trim()) {
      parts.push(`Client / Business: ${clientName.trim()}`);
    }
    if (clientPhone.trim()) {
      parts.push(`Phone / WhatsApp: ${clientPhone.trim()}`);
    }
    if (customRequirements.trim()) {
      parts.push(`Client Custom Requirements: ${customRequirements.trim()}`);
    }
    return parts.join(' | ');
  };

  const handleRequestCustomQuote = async () => {
    const summary = buildCombinedSummaryText();
    if (onSubmitLead && clientName.trim() && clientPhone.trim()) {
      try {
        setSubmittingQuote(true);
        await onSubmitLead({
          name: clientName.trim(),
          phoneOrEmail: clientPhone.trim(),
          selectedPillars: selectedLabels,
          budgetTier: `${formattedSliderBudget} (${blueprint.estimatedRange} • Open to Negotiation)`,
          projectSummary:
            customRequirements.trim().length >= 10
              ? `${customRequirements.trim()} — [Target Budget: ${formattedSliderBudget} | Services: ${selectedLabels.join(', ')}]`
              : summary,
        });
        setQuoteSubmittedMessage(
          'Your project requirements and roadmap have been saved! You can also message us directly on WhatsApp below.'
        );
      } catch {
        // Fallback to prefilling contact form
        onLockBlueprint(summary, selectedLabels);
      } finally {
        setSubmittingQuote(false);
      }
    } else {
      onLockBlueprint(summary, selectedLabels);
    }
  };

  const whatsappRoadmapUrl = useMemo(() => {
    const lines = [
      'Hello SkyLine Digital Agency,',
      'I scoped my project on your Price & Roadmap Estimator:',
      `• Selected Services: ${selectedLabels.join(', ')}`,
      `• Selected Budget Line: ${formattedSliderBudget} (Range: ${blueprint.estimatedRange})`,
      `• Est. Timeline: ${blueprint.estimatedWeeks}`,
    ];
    if (clientName.trim()) {
      lines.push(`• Name / Business: ${clientName.trim()}`);
    }
    if (clientPhone.trim()) {
      lines.push(`• Phone / WhatsApp: ${clientPhone.trim()}`);
    }
    if (customRequirements.trim()) {
      lines.push(`• My Project Requirements: ${customRequirements.trim()}`);
    }
    lines.push('Let us discuss the features and finalize a practical quote.');
    return `https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [selectedLabels, blueprint, formattedSliderBudget, clientName, clientPhone, customRequirements]);

  return (
    <section
      id="simulator"
      data-testid="simulator-zinc-platinum-section"
      className="py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-y border-[#A1A1AA] dark:border-[#27272A] bg-gradient-to-b from-[#E4E4E7] via-[#D4D4D8] to-[#E4E4E7] dark:from-[#121216] dark:via-[#18181D] dark:to-[#121216]"
    >
      <div id="estimator" className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl heading-icon-amber flex items-center justify-center shrink-0">
                <Sliders className="w-4 h-4 text-white" />
              </div>
              <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                60-SECOND PRICE &amp; ROADMAP ESTIMATOR • STARTS AT ₹10,000
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Scope Your Project in{' '}
              <span className="font-serif-editorial italic font-semibold">
                60 Seconds.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
            Starter setups begin at ₹10,000. Select your service below to auto-match the ideal project tier, slide the interactive ₹10K–₹1L+ price line, and send your roadmap on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Controls */}
          <div className="lg:col-span-6 space-y-7 surface-card rounded-3xl p-6 sm:p-8">
            {/* Step 1: Domains */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-mono-tech text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold">
                  1. Select What You Need (Auto-Matches Project Tier)
                </label>
                <span className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded-full badge-platinum font-semibold">
                  {domains.length} Selected
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DOMAIN_OPTIONS.map((opt) => {
                  const selected = domains.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      data-testid={`simulator-domain-${opt.id}`}
                      onClick={() => toggleDomain(opt.id)}
                      className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border hover:-translate-y-1.5 hover:shadow-xl ${
                        selected
                          ? 'btn-platinum-primary shadow-md'
                          : 'surface-elevated hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <strong
                          className={`font-mono-tech text-[11px] uppercase tracking-widest font-extrabold ${
                            selected
                              ? 'text-current'
                              : 'text-[var(--text-primary)]'
                          }`}
                        >
                          {opt.tag}
                        </strong>
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                            selected
                              ? 'border-current bg-white/20'
                              : 'border-[var(--border-strong)]'
                          }`}
                        >
                          {selected && <Check className="w-2.5 h-2.5" />}
                        </span>
                      </div>
                      <div className="font-display font-bold text-sm mb-1.5">
                        {opt.label}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        <span
                          className={`font-mono-tech text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            selected
                              ? 'bg-white/15 text-current'
                              : 'bg-[#09090B] text-white dark:bg-white dark:text-[#09090B]'
                          }`}
                        >
                          {opt.priceLabel}
                        </span>
                        <span
                          className={`font-mono-tech text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                            selected
                              ? 'border-current/30 text-current'
                              : 'border-[var(--border-strong)] text-[var(--text-primary)]'
                          }`}
                        >
                          {opt.timelineLabel}
                        </span>
                      </div>
                      <div
                        className={`text-xs leading-snug ${
                          selected
                            ? 'opacity-85'
                            : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        {opt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale */}
            <div>
              <label className="block font-mono-tech text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-3">
                2. Your Project Tier (Auto-Selected • Or Pick Manually)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SCALE_OPTIONS.map((opt) => {
                  const selected = scale === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      data-testid={`simulator-tier-${opt.id}`}
                      onClick={() => handleManualScaleSelect(opt.id)}
                      className={`p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer border hover:-translate-y-1.5 hover:shadow-lg ${
                        selected
                          ? 'btn-platinum-primary'
                          : 'surface-elevated hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="font-display font-bold text-xs sm:text-sm mb-1">
                        {opt.label}
                      </div>
                      <div
                        className={`text-[11px] leading-tight ${
                          selected
                            ? 'opacity-85'
                            : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        {opt.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Urgency */}
            <div>
              <label className="block font-mono-tech text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-3">
                3. Launch Timeline
              </label>
              <div className="grid grid-cols-2 gap-3">
                {URGENCY_OPTIONS.map((opt) => {
                  const selected = urgency === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setUrgency(opt.id)}
                      className={`p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer border flex items-center justify-between hover:-translate-y-1 hover:shadow-md ${
                        selected
                          ? 'btn-platinum-primary'
                          : 'surface-elevated hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div>
                        <div className="font-display font-bold text-xs sm:text-sm">
                          {opt.label}
                        </div>
                        <div
                          className={`font-mono-tech text-[11px] ${
                            selected
                              ? 'opacity-80'
                              : 'text-[var(--text-secondary)]'
                          }`}
                        >
                          {opt.sub}
                        </div>
                      </div>
                      <Clock className="w-4 h-4 opacity-70" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Included Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl surface-elevated space-y-2">
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                  <span>KEY DELIVERABLES</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                  {blueprint.primaryDeliverables.map((item: string) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="text-[var(--text-primary)] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl surface-elevated space-y-2">
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                  <span>INCLUDED GUARANTEES</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                  {blueprint.projectedKpis.map((kpi: string) => (
                    <li key={kpi} className="flex items-start gap-1.5">
                      <span className="text-[#10B981] font-bold">✓</span>
                      <span>{kpi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Estimated Project Roadmap + Interactive Price Line Calculator + Custom Requirements */}
          <div className="lg:col-span-6 surface-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[var(--border-hairline)]">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--text-primary)]" />
                  <span className="font-mono-tech text-xs uppercase tracking-widest text-[var(--text-primary)] font-bold">
                    ESTIMATED PROJECT ROADMAP
                  </span>
                </div>
                <span className="font-mono-tech text-xs px-3 py-1 rounded-full badge-platinum font-bold">
                  Starts at ₹10,000
                </span>
              </div>

              {/* Estimated Range Box + Interactive Price Line Calculator (₹10,000 to ₹1,00,000+) */}
              <div className="my-5 p-4 sm:p-5 rounded-2xl surface-elevated border border-[var(--border-strong)] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono-tech text-[11px] uppercase tracking-wider font-bold text-[var(--text-primary)]">
                    Estimated Range (Open to Discussion &amp; Negotiation)
                  </span>
                  <span className="font-mono-tech text-xs text-[var(--text-secondary)]">
                    Timeline: <strong>{blueprint.estimatedWeeks}</strong>
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                    {blueprint.estimatedRange}
                  </div>
                  <div className="font-mono-tech text-xs font-bold px-2.5 py-1 rounded-lg bg-[#09090B] text-white dark:bg-white dark:text-[#09090B]">
                    Selected Line: {formattedSliderBudget}
                  </div>
                </div>

                {/* INTERACTIVE PRICE LINE / BUDGET CALCULATOR SLIDER (₹10K to ₹1L+) */}
                <div
                  data-testid="interactive-price-line-calculator"
                  className="pt-2 border-t border-[var(--border-hairline)] space-y-2.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono-tech">
                    <span className="font-bold uppercase tracking-wider text-[var(--text-primary)]">
                      Interactive Estimator Price Line (₹10K → ₹1L+)
                    </span>
                    <span className="text-[var(--text-secondary)] font-semibold">
                      {activePriceStop.tierHint}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={10000}
                    max={100000}
                    step={5000}
                    value={sliderBudgetInr}
                    data-testid="interactive-price-line-slider"
                    aria-label="Interactive Project Budget Estimator Line from 10,000 INR to 1,00,000+ INR"
                    onChange={(e) => handleBudgetSliderChange(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#D4D4D8] dark:bg-[#27272A] accent-[#09090B] dark:accent-[#F4F4F5]"
                  />

                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 pt-0.5">
                    {PRICE_LINE_STOPS.map((stop) => {
                      const isCurrent = sliderBudgetInr === stop.value;
                      return (
                        <button
                          key={stop.value}
                          type="button"
                          onClick={() => handleBudgetSliderChange(stop.value)}
                          className={`py-1 px-1.5 rounded-md font-mono-tech text-[10px] font-bold transition-all cursor-pointer text-center ${
                            isCurrent
                              ? 'bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] shadow-xs'
                              : 'bg-black/5 dark:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {stop.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)]">
                  {blueprint.headline} — Every quote is flexible and tailored to your exact features on a quick call or WhatsApp chat.
                </p>
              </div>

              {/* Recommended Tech Stack Pills */}
              <div className="mb-5">
                <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                  <span>RECOMMENDED TECH &amp; GROWTH STACK</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {blueprint.recommendedStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg surface-elevated font-mono-tech text-[11px] text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* =============================================================
                  DEDICATED CLIENT INPUT SECTION ("Write Your Project Requirements")
                 ============================================================= */}
              <div className="p-4 sm:p-5 rounded-2xl surface-elevated border border-[var(--border-strong)] space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 font-display text-sm font-bold text-[var(--text-primary)]">
                    <MessageSquare className="w-4 h-4 text-[var(--text-primary)]" />
                    <span>Write Your Project Requirements</span>
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Included in WhatsApp &amp; Quote
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="estimator-client-name"
                      className="block text-xs font-semibold text-[var(--text-secondary)] mb-1"
                    >
                      Your Name / Business Name
                    </label>
                    <input
                      id="estimator-client-name"
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g., Dr. Sharma / Aura Clinic"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] focus:border-[#0B63F6] focus:outline-none text-xs sm:text-sm text-[var(--text-primary)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="estimator-client-phone"
                      className="block text-xs font-semibold text-[var(--text-secondary)] mb-1"
                    >
                      Phone / WhatsApp Number
                    </label>
                    <input
                      id="estimator-client-phone"
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] focus:border-[#0B63F6] focus:outline-none text-xs sm:text-sm text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="estimator-custom-requirements"
                    className="block text-xs font-semibold text-[var(--text-secondary)] mb-1"
                  >
                    Tell us what you want to build (Custom Requirements, Features, or Budget Notes)
                  </label>
                  <textarea
                    id="estimator-custom-requirements"
                    rows={3}
                    value={customRequirements}
                    onChange={(e) => setCustomRequirements(e.target.value)}
                    placeholder="Example: Mujhe apne clinic/shop ke liye ek modern website aur WhatsApp appointment booking chahiye. Mera budget around ₹12k-15k hai..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] focus:border-[#0B63F6] focus:outline-none text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed"
                  />
                </div>

                {quoteSubmittedMessage && (
                  <div className="p-3 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{quoteSubmittedMessage}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[var(--border-hairline)] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsappRoadmapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-full btn-whatsapp-official font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                  <span>Send My Roadmap on WhatsApp</span>
                </a>

                <button
                  type="button"
                  disabled={submittingQuote}
                  onClick={() => void handleRequestCustomQuote()}
                  className="w-full py-3.5 px-5 rounded-full btn-platinum-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <span>
                    {submittingQuote ? 'Saving Roadmap...' : 'Request Custom Quote'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
