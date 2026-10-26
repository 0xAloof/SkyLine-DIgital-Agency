import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
  Star,
  Gift,
  Send,
  Share2,
  Handshake,
  Wallet,
  GraduationCap,
  Terminal,
  Code2,
  ShieldCheck,
  BookOpen,
  Play,
  FileCode2,
  ArrowUpRight,
} from 'lucide-react';
import {
  CLIENT_PROOF_CASES,
  VERIFIED_REVIEWS,
  VerifiedReview,
  InteractiveArtifactId,
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
  SKYLINE_INSTAGRAM_URL,
} from '../data/agencyData';
import { buildReferralWhatsAppUrl } from '../utils/architectEngine';
import { WhatsAppBrandBadge, InstagramBrandIcon } from './BrandIcons';
import { InteractiveArtifactModal } from './InteractiveArtifactModal';

export interface PublicReferralSubmissionPayload {
  referrerName: string;
  referrerContact?: string;
  referredBusiness: string;
  estimatedDealValue: number;
}

export type ProofReferralViewMode = 'proof-only' | 'referral-only' | 'both';

interface ClientProofAndReferralProps {
  reviews?: VerifiedReview[];
  onSubmitReferral?: (payload: PublicReferralSubmissionPayload) => Promise<void>;
  viewMode?: ProofReferralViewMode;
}

const DEAL_TIERS = [
  {
    id: 'local',
    label: 'Local Business Growth Package',
    dealValue: '₹50,000',
    dealNumeric: 50000,
    commission: '₹7,500',
    desc: 'Website + Google Maps SEO + WhatsApp Bot',
  },
  {
    id: 'growth',
    label: 'Startup Web / AI / Ads Bundle',
    dealValue: '₹1,20,000',
    dealNumeric: 120000,
    commission: '₹18,000',
    desc: 'Custom Next.js Platform + CRM + Paid Ads',
  },
  {
    id: 'enterprise',
    label: 'Custom SaaS & Full-Scale Engine',
    dealValue: '₹3,00,000',
    dealNumeric: 300000,
    commission: '₹45,000',
    desc: 'Multi-Tenant SaaS + AI Agents + Growth Retainer',
  },
];

type MentorshipTrackId = 'fullstack-web' | 'java-kafka' | 'python-ai';

interface MentorshipCodeSample {
  id: MentorshipTrackId;
  label: string;
  fileName: string;
  stackBadge: string;
  beforeIssue: string;
  archUpgrade: string;
  vivaQuestion: string;
  vivaAnswer: string;
  codeSnippet: string[];
}

const MENTORSHIP_LAB_TRACKS: MentorshipCodeSample[] = [
  {
    id: 'fullstack-web',
    label: 'Full-Stack Web',
    fileName: 'src/server/webhookIdempotency.ts',
    stackBadge: 'Next.js 15 • Node.js • PostgreSQL',
    beforeIssue: 'Duplicate payment & booking webhooks creating double database rows during high concurrency.',
    archUpgrade: 'Implemented SHA-256 payload idempotency lock with PostgreSQL ON CONFLICT DO NOTHING.',
    vivaQuestion: 'Why use an idempotency key instead of a simple SELECT check before INSERT?',
    vivaAnswer: 'A separate SELECT followed by INSERT has a race condition (TOCTOU) when two requests arrive at the same millisecond. Atomic database constraints guarantee exactly-once state mutation.',
    codeSnippet: [
      'export async function processBookingWebhook(req: WebhookPayload) {',
      '  const idempotencyKey = computeSha256(`${req.clientId}:${req.slotIso}`);',
      '  const inserted = await db.query(',
      '    `INSERT INTO clinic_bookings (idempotency_key, client_id, slot_iso, status)',
      '     VALUES ($1, $2, $3, \'CONFIRMED\')',
      '     ON CONFLICT (idempotency_key) DO NOTHING RETURNING id`,',
      '    [idempotencyKey, req.clientId, req.slotIso]',
      '  );',
      '  if (inserted.rowCount === 0) return { status: 200, deduplicated: true };',
      '  await dispatchWhatsAppConfirmation(req.clientPhone, req.slotIso);',
      '  return { status: 201, bookingId: inserted.rows[0].id };',
      '}',
    ],
  },
  {
    id: 'java-kafka',
    label: 'Java / Kafka Backend',
    fileName: 'GridTelemetryConsumer.java',
    stackBadge: 'Java 21 • Spring Boot 3 • Apache Kafka',
    beforeIssue: 'Blocking REST calls inside loop causing thread-pool starvation at 2,000+ IoT events/sec.',
    archUpgrade: 'Partitioned Kafka consumer group with non-blocking Redis sliding-window anomaly detection.',
    vivaQuestion: 'How does Kafka guarantee message ordering for a specific smart-grid substation?',
    vivaAnswer: 'By hashing the substationId as the Kafka message key, all telemetry packets from that substation route deterministically to the exact same partition and consumer thread.',
    codeSnippet: [
      '@KafkaListener(topics = "grid.telemetry.v1", groupId = "gridweaver-core")',
      'public void consumeSubstationPulse(ConsumerRecord<String, TelemetryEvent> record) {',
      '  TelemetryEvent evt = record.value();',
      '  double zScore = anomalyEngine.computeRollingZScore(evt.substationId(), evt.loadKw());',
      '  if (zScore > 2.85) {',
      '    alertPublisher.publishCriticalSpike(evt.substationId(), evt.loadKw(), zScore);',
      '  }',
      '  metricsRegistry.counter("grid.packets.processed").increment();',
      '}',
    ],
  },
  {
    id: 'python-ai',
    label: 'Python AI & Security',
    fileName: 'fileguard_scanner/ast_sandbox.py',
    stackBadge: 'Python 3.12 • FastAPI • AST & Shannon Entropy',
    beforeIssue: 'Relying only on file extension (.pdf / .docx) allowed disguised macro and polyglot payloads.',
    archUpgrade: 'Multi-stage magic-byte header verification, Shannon entropy scoring, and isolated AST inspection.',
    vivaQuestion: 'What does a Shannon entropy score above 7.8 bits/byte indicate in an uploaded file?',
    vivaAnswer: 'High randomness near 8.0 bits/byte indicates encrypted, packed, or obfuscated shellcode hidden inside an otherwise normal document container.',
    codeSnippet: [
      'def inspect_upload_stream(raw_bytes: bytes, declared_mime: str) -> ScanVerdict:',
      '    magic_mime = detect_magic_header(raw_bytes[:16])',
      '    entropy = compute_shannon_entropy(raw_bytes)',
      '    if magic_mime != declared_mime or entropy > 7.85:',
      '        return ScanVerdict(status="QUARANTINED", risk_score=96, entropy=entropy)',
      '    return ScanVerdict(status="CLEAN_VERIFIED", risk_score=4, entropy=entropy)',
    ],
  },
];

const MENTORSHIP_PLANS = [
  {
    id: 'audit-599',
    price: '₹599',
    tag: 'ARCHITECTURE & VIVA PREP',
    title: '1-on-1 Project Architecture & Code Review Session',
    idealFor: 'Students & developers who need a senior architect to debug their app, design the DB schema, and prepare for viva.',
    features: [
      '60-Minute Live 1-on-1 Screen-Share Architecture Session',
      'Database ER Diagram & System Flow Blueprint',
      'GitHub Repo Code Review & Bug Resolution',
      'Top 25 Viva & Technical Interview Q&A Sheet',
    ],
  },
  {
    id: 'minor-1999',
    price: '₹1,999',
    tag: 'GUIDED MINOR PROJECT LAB',
    title: 'Full-Stack Minor Project Mentorship & Deployment',
    idealFor: '3rd/5th Sem B.Tech, BCA, and MCA students building a real working web or AI project from scratch.',
    features: [
      'Complete Frontend + Backend + Database Guided Build',
      'Live Cloud Deployment (Vercel / Render / Supabase)',
      'IEEE / College Synopsis & Architecture Documentation Guide',
      '2 Live 1-on-1 Debugging & Viva Mock Sessions',
    ],
  },
  {
    id: 'major-2499',
    price: '₹2,499',
    tag: 'FINAL YEAR MAJOR PROJECT',
    title: 'Production Full-Stack / AI Major Project Lab',
    idealFor: 'Final-year students building advanced SaaS, Microservices, IoT, or AI RAG systems that stand out in placements.',
    features: [
      'Real-World Architecture (Next.js / Spring Boot / Python AI)',
      'Complete Git Commit History & Clean Modular Codebase',
      'System Design Diagrams (DFD, UML, ER & API Contracts)',
      '3 Live 1-on-1 Code Walkthrough & Placement Pitch Sessions',
    ],
  },
  {
    id: 'founder-3999',
    price: '₹3,999',
    tag: 'RESEARCH / STARTUP MVP LAB',
    title: 'Custom AI / SaaS Startup MVP & Research Cohort',
    idealFor: 'Student founders, hackathon teams, and research scholars building a commercial-grade product or paper.',
    features: [
      'Custom Multi-Tenant SaaS or Fine-Tuned AI Agent Pipeline',
      'Payment Gateway, WhatsApp Bot & Cloud CI/CD Setup',
      'Benchmark Testing, Load Telemetry & Research Graphs',
      'Direct Weekly Mentorship with Founding Architects (Aashif & Sachin)',
    ],
  },
];

const SIX_STEP_MENTORSHIP_MODEL = [
  {
    step: '01',
    title: 'Problem & Stack Selection',
    desc: 'Pick a real industry problem (FinTech, HealthTech, Cybersecurity, IoT, or AI) instead of outdated library management clones.',
  },
  {
    step: '02',
    title: 'Database & API Blueprint',
    desc: 'Design clean PostgreSQL schemas, REST/Webhook contracts, and ER diagrams so you understand every data flow.',
  },
  {
    step: '03',
    title: 'Modular Sprint Coding',
    desc: 'Build the frontend, backend, and AI modules step-by-step with clean Git commits and zero black-box copy-pasting.',
  },
  {
    step: '04',
    title: 'Testing & Security Hardening',
    desc: 'Add input validation, authentication guards, and automated unit tests so your live demo never crashes in front of examiners.',
  },
  {
    step: '05',
    title: 'Live Cloud Deployment',
    desc: 'Deploy your application on a real HTTPS URL with custom environment configs and live telemetry.',
  },
  {
    step: '06',
    title: 'Viva & Placement Mastery',
    desc: 'Practice line-by-line code explanations and system design tradeoffs so you can answer any external examiner or interviewer.',
  },
];

export const ClientProofAndReferral: React.FC<ClientProofAndReferralProps> = ({
  reviews = VERIFIED_REVIEWS,
  onSubmitReferral,
  viewMode = 'both',
}) => {
  const [selectedTier, setSelectedTier] = useState(DEAL_TIERS[1]);
  const [referrerName, setReferrerName] = useState('');
  const [referrerContact, setReferrerContact] = useState('');
  const [referredBusiness, setReferredBusiness] = useState('');
  const [submittingReferral, setSubmittingReferral] = useState(false);
  const [referralLogged, setReferralLogged] = useState(false);
  const [referralError, setReferralError] = useState<string | null>(null);

  // Dual Revenue Tab Switcher on Offer & Referral Page
  const [activeRevenueTab, setActiveRevenueTab] = useState<'partner-15' | 'mentorship-lab'>('partner-15');
  const [activeMentorshipTrack, setActiveMentorshipTrack] = useState<MentorshipTrackId>('fullstack-web');
  const [selectedMentorshipPlan, setSelectedMentorshipPlan] = useState(MENTORSHIP_PLANS[2]);
  const [activeReviewArtifact, setActiveReviewArtifact] =
    useState<InteractiveArtifactId | null>(null);

  const currentCodeSample =
    MENTORSHIP_LAB_TRACKS.find((t) => t.id === activeMentorshipTrack) ||
    MENTORSHIP_LAB_TRACKS[0];

  const referralWhatsAppUrl = useMemo(
    () =>
      buildReferralWhatsAppUrl(
        referrerName,
        `${referredBusiness || 'a business'} (${selectedTier.label} - ${selectedTier.dealValue}, Expected 15% Commission: ${selectedTier.commission})`
      ),
    [referrerName, referredBusiness, selectedTier]
  );

  const handleLogReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    setReferralError(null);
    if (!referrerName.trim() || !referredBusiness.trim()) {
      setReferralError('Please enter both your name and the business you are referring.');
      return;
    }

    if (onSubmitReferral) {
      setSubmittingReferral(true);
      try {
        await onSubmitReferral({
          referrerName: referrerName.trim(),
          referrerContact: referrerContact.trim() || 'Via WhatsApp Partner Portal',
          referredBusiness: referredBusiness.trim(),
          estimatedDealValue: selectedTier.dealNumeric,
        });
        setReferralLogged(true);
      } catch (err) {
        setReferralError(
          err instanceof Error ? err.message : 'Unable to register referral right now.'
        );
      } finally {
        setSubmittingReferral(false);
      }
    }
  };

  const showProof = viewMode === 'both' || viewMode === 'proof-only';
  const showReferral = viewMode === 'both' || viewMode === 'referral-only';

  return (
    <section
      id={viewMode === 'referral-only' ? 'referral' : 'proof'}
      className={`${
        viewMode === 'referral-only' ? 'pt-28 sm:pt-32' : 'py-16 sm:py-24'
      } pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]`}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* =================================================================
            PART 1: VERIFIED OUTCOMES & CLIENT TESTIMONIALS
           ================================================================= */}
        {showProof && (
          <div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div>
                <div className="inline-flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-xs dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-[var(--text-primary)]" />
                  </div>
                  <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                    PROVEN CLIENT IMPACT
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                  Real Results.{' '}
                  <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                    Verified Growth.
                  </span>
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
                Every project is measured against concrete business metrics: faster load speeds, #Top Google Maps rankings, lower ad costs, and automated WhatsApp sales.
              </p>
            </div>

            {/* 2 Proof Case Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {CLIENT_PROOF_CASES.map((item) => (
                <div
                  key={item.id}
                  className="surface-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border-t border-white/15"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                      <span className="font-mono-tech text-xs font-semibold text-[var(--text-primary)]">
                        {item.clientSector}
                      </span>
                      <span className="px-3 py-1 rounded-full badge-platinum font-mono-tech text-[11px] font-semibold">
                        {item.timeframe}
                      </span>
                    </div>

                    {/* Highlight Metric Box */}
                    <div className="p-5 rounded-2xl surface-elevated border-t border-white/15 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
                          {item.primaryMetric}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                          {item.primaryMetricLabel}
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <span className="inline-block px-3 py-1 rounded-full badge-platinum font-mono-tech text-xs font-semibold">
                          {item.secondaryMetric}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm">
                      <div>
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                          THE BOTTLENECK
                        </span>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                          {item.challenge}
                        </p>
                      </div>
                      <div>
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-primary)] font-semibold block mb-1">
                          OUR SOLUTION
                        </span>
                        <p className="text-[var(--text-primary)] leading-relaxed font-medium">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md surface-elevated font-mono-tech text-[10px] text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 7 Verified Project Reviews Across All Flagship Systems */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>VERIFIED PRODUCTION DEPLOYMENTS &amp; CLIENT REVIEWS</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1">
                    7 Flagship Systems.{' '}
                    <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                      100% Verified Outcomes.
                    </span>
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full badge-platinum font-mono-tech text-[11px] font-semibold">
                  5.0 ★ AVERAGE CLIENT RATING ({reviews.length} VERIFIED PROJECTS)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="surface-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[var(--border-hairline)] border-t border-white/15 hover:border-[var(--border-strong)] transition-all"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className="flex items-center gap-0.5 text-[var(--text-primary)]"
                          aria-label={`${rev.rating || 5} out of 5 stars`}
                        >
                          {Array.from({ length: rev.rating || 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className="w-3.5 h-3.5 fill-current"
                            />
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono-tech text-[10px] font-semibold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified Project</span>
                        </span>
                      </div>

                      {rev.projectName && (
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <span className="font-display text-base font-extrabold text-[var(--text-primary)]">
                            {rev.projectName}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full font-mono-tech text-[10px] font-semibold badge-platinum">
                            {rev.serviceTag || rev.engagementScope || 'VERIFIED BUILD'}
                          </span>
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                        &ldquo;{rev.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-[var(--border-hairline)] space-y-3">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md surface-elevated font-mono-tech text-[10px] text-[var(--text-primary)] font-semibold">
                        <Award className="w-3 h-3 text-[var(--text-primary)] shrink-0" />
                        <span>{rev.impactHighlight || rev.verifiedOutcome || 'Verified ROI'}</span>
                      </div>

                      {rev.leadArchitect && (
                        <div className="font-mono-tech text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                          Engineered by {rev.leadArchitect}
                        </div>
                      )}

                      <div className="flex items-end justify-between gap-2 pt-1">
                        <div>
                          <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                            {rev.author}
                          </div>
                          <div className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                            {rev.role}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {rev.liveSiteUrl && (
                            <a
                              href={rev.liveSiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg btn-platinum-secondary font-mono-tech text-[10px] font-bold"
                            >
                              <span>Live Site</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}
                          {rev.artifactId && (
                            <button
                              type="button"
                              onClick={() => setActiveReviewArtifact(rev.artifactId || null)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg btn-platinum-primary font-mono-tech text-[10px] font-bold cursor-pointer"
                            >
                              <span>Inspect Build</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            PART 2: DUAL REVENUE TAB SWITCHER (15% PARTNER PROGRAM + STUDENT MENTORSHIP LAB)
           ================================================================= */}
        {showReferral && (
          <div className="space-y-8">
            {/* Dual Revenue Header & Tab Switcher */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-xs dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[var(--text-primary)]" />
                  </div>
                  <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                    PARTNER COMMISSIONS & ENGINEERING MENTORSHIP LAB
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                  Partner With Us or{' '}
                  <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                    Build With Our Architects.
                  </span>
                </h2>
              </div>

              {/* Dual Tab Buttons */}
              <div className="inline-flex flex-wrap rounded-2xl p-1.5 surface-card border-t border-white/15 gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveRevenueTab('partner-15')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeRevenueTab === 'partner-15'
                      ? 'btn-platinum-primary shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>15% Partner Commission Program</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRevenueTab('mentorship-lab')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeRevenueTab === 'mentorship-lab'
                      ? 'btn-platinum-primary shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>1-on-1 Engineering Mentorship & Project Lab</span>
                </button>
              </div>
            </div>

            {/* TAB A: 15% PARTNER COMMISSION PROGRAM */}
            {activeRevenueTab === 'partner-15' && (
              <div
                id="referral-card"
                className="surface-card rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden border-t border-white/15"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Explanation + Rich Architectural Cards (6 Cols) */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="inline-flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-xs dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 flex items-center justify-center shrink-0">
                        <Gift className="w-4 h-4 text-[var(--text-primary)]" />
                      </div>
                      <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                        SKYLINE PARTNER PROGRAM • 15% DIRECT PAYOUT
                      </span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                      Know a Business That Needs a Website, AI Bot, or Ads?{' '}
                      <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                        Earn 15% Commission.
                      </span>
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      Introduce a founder, clinic, salon, retail store, or company to SkyLine Digital Agency. When they sign up for any project, we send you a direct <strong>15% cash payout</strong> via UPI or bank transfer as soon as their onboarding invoice clears.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                      {/* Card 1: Share Intro (Mini Interactive WhatsApp Intro Bubble) */}
                      <div className="p-4 rounded-2xl surface-elevated border border-[var(--border-hairline)] border-t border-white/15 flex flex-col justify-between gap-3 group">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                            INTRODUCE
                          </span>
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-sm dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 dark:shadow-inner flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Share2 className="w-5 h-5 text-[var(--text-primary)]" />
                          </div>
                        </div>

                        {/* Mini Interactive WhatsApp Intro Preview Bubble */}
                        <div className="rounded-xl p-2.5 bg-[var(--bg-canvas)]/95 border border-[var(--border-hairline)] space-y-1.5 shadow-inner">
                          <div className="flex items-center justify-between text-[8px] font-mono-tech">
                            <span className="inline-flex items-center gap-1 text-[#25D366] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                              WA INTRO
                            </span>
                            <span className="text-[var(--text-muted)]">Live</span>
                          </div>
                          <div className="rounded-lg rounded-tl-none bg-[#25D366]/12 border border-[#25D366]/30 px-2 py-1.5 text-[9.5px] text-[var(--text-primary)] leading-tight font-medium">
                            &ldquo;Hey, connecting you with SkyLine...&rdquo;
                          </div>
                        </div>

                        <div>
                          <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                            Share Intro
                          </div>
                          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                            Connect us on WhatsApp
                          </div>
                        </div>
                      </div>

                      {/* Card 2: We Pitch & Close (Mini Live Architecture Blueprint + Milestone Progress Bar) */}
                      <div className="p-4 rounded-2xl surface-elevated border border-[var(--border-hairline)] border-t border-white/15 flex flex-col justify-between gap-3 group">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                            BLUEPRINT
                          </span>
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-sm dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 dark:shadow-inner flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Handshake className="w-5 h-5 text-[var(--text-primary)]" />
                          </div>
                        </div>

                        {/* Mini Live Architecture Blueprint + Milestone Contract Progress Bar */}
                        <div className="rounded-xl p-2.5 bg-[var(--bg-canvas)]/95 border border-[var(--border-hairline)] space-y-1.5 shadow-inner">
                          <div className="flex items-center justify-between text-[8px] font-mono-tech text-[var(--text-primary)] font-bold">
                            <span>Audit</span>
                            <span>→</span>
                            <span>Scope</span>
                            <span>→</span>
                            <span className="text-[#10B981]">Signed</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                            <div className="h-full w-full rounded-full bg-[var(--platinum-primary)]" />
                          </div>
                          <div className="text-[8.5px] font-mono-tech text-[var(--text-muted)] flex justify-between">
                            <span> Architecture Spec</span>
                            <span className="text-[var(--text-primary)] font-semibold">100%</span>
                          </div>
                        </div>

                        <div>
                          <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                            We Pitch & Close
                          </div>
                          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                            Free audit & proposal
                          </div>
                        </div>
                      </div>

                      {/* Card 3: Get 15% Payout (Realistic Instant UPI Payout Settlement Card) */}
                      <div className="p-4 rounded-2xl surface-elevated border border-[var(--border-hairline)] border-t border-white/15 flex flex-col justify-between gap-3 group">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                            REWARD
                          </span>
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-sm dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 dark:shadow-inner flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Wallet className="w-5 h-5 text-[var(--text-primary)]" />
                          </div>
                        </div>

                        {/* Realistic Instant UPI Payout Settlement Card */}
                        <div className="rounded-xl p-2.5 bg-[var(--bg-canvas)]/95 border border-[var(--border-hairline)] space-y-1 shadow-inner">
                          <div className="font-currency text-xs font-extrabold text-[#10B981]">
                            + &#8377;18,000
                          </div>
                          <div className="text-[8.5px] font-mono-tech text-[var(--text-primary)] font-semibold leading-tight">
                            Credited via UPI • Verified
                          </div>
                        </div>

                        <div>
                          <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                            Get 15% Payout
                          </div>
                          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                            Instant UPI / Bank transfer
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Interactive Commission Calculator & Instant WhatsApp Referral (6 Cols) */}
                  <div className="lg:col-span-6 surface-elevated rounded-3xl p-6 sm:p-7 space-y-5 border border-[var(--border-hairline)] border-t border-white/15">
                    <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
                      <div>
                        <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                          COMMISSION ESTIMATOR
                        </div>
                        <div className="font-display text-lg font-bold text-[var(--text-primary)]">
                          Select Estimated Project Size
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)]">
                          YOUR 15% REWARD
                        </div>
                        <div className="font-currency text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                          {selectedTier.commission}
                        </div>
                      </div>
                    </div>

                    {/* Tier Buttons */}
                    <div className="grid grid-cols-1 gap-2.5">
                      {DEAL_TIERS.map((tier) => {
                        const isSelected = selectedTier.id === tier.id;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setSelectedTier(tier)}
                            className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between gap-3 border-t border-white/15 ${
                              isSelected
                                ? 'btn-platinum-primary shadow-md'
                                : 'surface-card hover:border-[var(--border-strong)]'
                            }`}
                          >
                            <div>
                              <div className="font-display font-bold text-xs sm:text-sm">
                                {tier.label}{' '}
                                <span className="font-currency opacity-85">
                                  ({tier.dealValue})
                                </span>
                              </div>
                              <div
                                className={`text-[11px] ${
                                  isSelected
                                    ? 'opacity-80'
                                    : 'text-[var(--text-secondary)]'
                                }`}
                              >
                                {tier.desc}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-currency text-xs sm:text-sm font-extrabold">
                                Earn {tier.commission}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Optional Name & Referred Business Inputs */}
                    <form onSubmit={handleLogReferral} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <input
                          type="text"
                          value={referrerName}
                          onChange={(e) => {
                            setReferrerName(e.target.value);
                            setReferralLogged(false);
                          }}
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 rounded-xl surface-card text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--platinum-primary)]"
                        />
                        <input
                          type="text"
                          value={referrerContact}
                          onChange={(e) => {
                            setReferrerContact(e.target.value);
                            setReferralLogged(false);
                          }}
                          placeholder="Your Phone / UPI No."
                          className="w-full px-3.5 py-2.5 rounded-xl surface-card text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--platinum-primary)]"
                        />
                        <input
                          type="text"
                          value={referredBusiness}
                          onChange={(e) => {
                            setReferredBusiness(e.target.value);
                            setReferralLogged(false);
                          }}
                          placeholder="Friend's Business Name"
                          className="w-full px-3.5 py-2.5 rounded-xl surface-card text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--platinum-primary)]"
                        />
                      </div>

                      {referralError && (
                        <p className="text-xs text-rose-500 font-medium">{referralError}</p>
                      )}

                      {referralLogged && (
                        <div className="p-3 rounded-xl badge-platinum text-xs flex items-center justify-between">
                          <span className="font-medium">
                            ✓ Referral registered in SkyLine Partner CRM! You can also message us on WhatsApp below.
                          </span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <button
                          type="submit"
                          disabled={submittingReferral}
                          className="w-full py-3.5 px-4 rounded-full btn-platinum-primary font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>
                            {submittingReferral ? 'Registering...' : 'Register Referral'}
                          </span>
                        </button>

                        <a
                          href={referralWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 px-4 rounded-full btn-whatsapp-official font-bold text-xs flex items-center justify-center gap-2"
                        >
                          <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                          <span>Send on WhatsApp</span>
                        </a>

                        <a
                          href={SKYLINE_INSTAGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 px-4 rounded-full surface-elevated border border-[#E1306C]/40 hover:border-[#E1306C] text-[var(--text-primary)] font-bold text-xs flex items-center justify-center gap-2 transition-all"
                        >
                          <InstagramBrandIcon size="sm" />
                          <span>DM on Instagram</span>
                        </a>
                      </div>
                    </form>

                    <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono-tech">
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                        <span>No limit on referrals</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                        <span>Direct UPI / Bank Payout</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB B: 1-ON-1 ENGINEERING MENTORSHIP & PROJECT LAB (FOR B.TECH / BCA / MCA & STUDENT FOUNDERS) */}
            {activeRevenueTab === 'mentorship-lab' && (
              <div
                id="mentorship-lab-card"
                className="surface-card rounded-3xl p-6 sm:p-10 space-y-12 border-t border-white/15"
              >
                {/* Top Overview & Interactive Code-Review IDE */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-5">
                    <div className="inline-flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-xs dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-[var(--text-primary)]" />
                      </div>
                      <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                        FOR B.TECH • BCA • MCA & STUDENT FOUNDERS
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                      Build Real Production Systems &{' '}
                      <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                        Ace Your Viva.
                      </span>
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      Stop buying generic copy-pasted college projects that fail during external viva or technical interviews. Work 1-on-1 with our founding engineers to architect, code, deploy, and master a production-grade Full-Stack, Java/Kafka, or Python AI project.
                    </p>

                    <div className="space-y-2.5">
                      <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                        SELECT LAB TRACK TO INSPECT CODE & VIVA PREP:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {MENTORSHIP_LAB_TRACKS.map((track) => {
                          const active = track.id === activeMentorshipTrack;
                          return (
                            <button
                              key={track.id}
                              type="button"
                              onClick={() => setActiveMentorshipTrack(track.id)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                                active
                                  ? 'btn-platinum-primary shadow-sm'
                                  : 'surface-elevated text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                              }`}
                            >
                              <Code2 className="w-3.5 h-3.5" />
                              <span>{track.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl surface-elevated border-t border-white/15 space-y-2">
                      <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-primary)] font-bold flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>LIVE VIVA & INTERVIEW DEFENSE TRAINING</span>
                      </div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">
                        Q: "{currentCodeSample.vivaQuestion}"
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        <strong className="text-[var(--text-primary)]">Architect Answer:</strong>{' '}
                        {currentCodeSample.vivaAnswer}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Code-Review & Architecture Lab IDE (7 Cols) */}
                  <div className="lg:col-span-7 rounded-2xl bg-[#09090B] text-[#F4F4F5] border border-[#27272A] overflow-hidden shadow-xl">
                    {/* IDE Window Bar */}
                    <div className="px-4 py-3 bg-[#121215] border-b border-[#27272A] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3F3F46]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#52525B]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#71717A]" />
                        <span className="ml-2 font-mono-tech text-xs font-bold text-[#E4E4E7] flex items-center gap-1.5">
                          <FileCode2 className="w-3.5 h-3.5 text-[#A1A1AA]" />
                          <span>{currentCodeSample.fileName}</span>
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-[#27272A] font-mono-tech text-[10px] text-[#D4D4D8]">
                        {currentCodeSample.stackBadge}
                      </span>
                    </div>

                    {/* Before vs After Architecture Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#121215]/60 border-b border-[#27272A] text-xs">
                      <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                        <div className="font-mono-tech text-[10px] text-[#A1A1AA] uppercase mb-1">
                          COMMON STUDENT MISTAKE
                        </div>
                        <p className="text-[#D4D4D8] text-[11px] leading-relaxed">
                          {currentCodeSample.beforeIssue}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#18181B] border border-[#3F3F46]">
                        <div className="font-mono-tech text-[10px] text-[#F4F4F5] font-bold uppercase mb-1">
                          SKYLINE ARCHITECT UPGRADE
                        </div>
                        <p className="text-[#F4F4F5] text-[11px] leading-relaxed">
                          {currentCodeSample.archUpgrade}
                        </p>
                      </div>
                    </div>

                    {/* Code Viewer */}
                    <div className="p-4 sm:p-5 overflow-x-auto font-mono-tech text-xs leading-relaxed">
                      {currentCodeSample.codeSnippet.map((line, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="text-[#52525B] select-none w-5 text-right shrink-0">
                            {i + 1}
                          </span>
                          <pre className="text-[#E4E4E7] whitespace-pre">{line}</pre>
                        </div>
                      ))}
                    </div>

                    <div className="px-4 py-2.5 bg-[#121215] border-t border-[#27272A] flex items-center justify-between text-[11px] font-mono-tech text-[#A1A1AA]">
                      <span className="inline-flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#E4E4E7]" />
                        <span>100% Explained Line-by-Line in Live Zoom / Meet Sessions</span>
                      </span>
                      <span className="text-[#F4F4F5] font-bold">VERIFIED LAB</span>
                    </div>
                  </div>
                </div>

                {/* 4 Transparent Mentorship Plans */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                    <div>
                      <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                        TRANSPARENT STUDENT-FRIENDLY PRICING
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                        4 Mentorship & Guided Project Plans
                      </h4>
                    </div>
                    <span className="font-mono-tech text-xs text-[var(--text-secondary)]">
                      Selected Plan:{' '}
                      <strong className="text-[var(--text-primary)]">
                        {selectedMentorshipPlan.title} (
                        <span className="font-currency">{selectedMentorshipPlan.price}</span>)
                      </strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {MENTORSHIP_PLANS.map((plan) => {
                      const isSelected = selectedMentorshipPlan.id === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedMentorshipPlan(plan)}
                          className={`rounded-3xl p-5 flex flex-col justify-between gap-5 transition-all cursor-pointer border border-t border-white/15 ${
                            isSelected
                              ? 'surface-elevated border-[var(--text-primary)] shadow-lg'
                              : 'surface-card hover:border-[var(--border-strong)]'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-0.5 rounded-full badge-platinum font-mono-tech text-[9px] font-bold">
                                {plan.tag}
                              </span>
                              <span className="font-currency text-2xl font-extrabold text-[var(--text-primary)]">
                                {plan.price}
                              </span>
                            </div>

                            <h5 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)]">
                              {plan.title}
                            </h5>

                            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                              {plan.idealFor}
                            </p>

                            <ul className="space-y-2 pt-2 border-t border-[var(--border-hairline)]">
                              {plan.features.map((feat) => (
                                <li
                                  key={feat}
                                  className="flex items-start gap-2 text-[11px] text-[var(--text-primary)]"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-primary)] shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <a
                            href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                              `Hi SkyLine Mentorship Lab! I want to enroll in the ${plan.title} (${plan.price}) for my ${currentCodeSample.label} project.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 px-4 rounded-full btn-whatsapp-official text-xs font-bold flex items-center justify-center gap-2"
                          >
                            <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                            <span>
                              Book <span className="font-currency">{plan.price}</span> Slot on WhatsApp
                            </span>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 6-Step 1-on-1 Guidance Model + Academic Integrity Policy */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-4 border-t border-[var(--border-hairline)]">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                      6-STEP 1-ON-1 GUIDANCE ROADMAP
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {SIX_STEP_MENTORSHIP_MODEL.map((s) => (
                        <div
                          key={s.step}
                          className="p-4 rounded-2xl surface-elevated space-y-1.5"
                        >
                          <div className="font-mono-tech text-[10px] font-bold text-[var(--text-muted)]">
                            STEP {s.step}
                          </div>
                          <div className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                            {s.title}
                          </div>
                          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                            {s.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl surface-elevated flex flex-col justify-between gap-4">
                    <div className="space-y-2.5">
                      <div className="inline-flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-wider font-bold text-[var(--text-primary)]">
                        <ShieldCheck className="w-4 h-4 text-[var(--text-primary)]" />
                        <span>ACADEMIC INTEGRITY & LEARNING POLICY</span>
                      </div>
                      <h5 className="font-display font-bold text-base text-[var(--text-primary)]">
                        We Coach You to Master the Code, Never Blind Copy-Paste.
                      </h5>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        Our mentorship program is built for genuine engineering skill development. Every student writes, tests, and deploys their own repository with our live architectural guidance so they can confidently defend every single line of code during college evaluations and technical job interviews.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <a
                        href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          'Hi SkyLine Team! I am a student/founder and want to discuss my project topic for 1-on-1 mentorship.'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-full btn-platinum-primary text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Discuss Your Project Topic</span>
                      </a>

                      <a
                        href={SKYLINE_INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-full surface-card border border-[#E1306C]/40 hover:border-[#E1306C] text-[var(--text-primary)] text-xs font-bold flex items-center justify-center gap-2 transition-all"
                      >
                        <InstagramBrandIcon size="sm" />
                        <span>DM on Instagram (@sky_line_digital)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <InteractiveArtifactModal
        artifactId={activeReviewArtifact}
        onClose={() => setActiveReviewArtifact(null)}
      />
    </section>
  );
};
