import express from 'express';
import { GoogleGenAI } from '@google/genai';
import {
  CapabilityPillar,
  ClientReview,
  FaqItem,
  SemanticAccentColor,
  ShowcaseProject,
} from '../../src/data/agencyData';
import {
  AuthenticatedRequest,
  requireAdminAuth,
  signToken,
  verifyPassword,
} from '../auth';
import {
  DEFAULT_ADMIN_EMAIL,
  getDb,
  resetDbToDefault,
  saveDb,
} from '../db';
import {
  CreateLeadPayload,
  CreateReferralPayload,
  LeadRecord,
  LeadStatus,
  ReferralRecord,
  ReferralStatus,
  VALID_ACCENT_COLORS,
  computeAdminOverviewStats,
  validateCreateLeadPayload,
  validateCreateReferralPayload,
} from '../types';

export const apiRouter = express.Router();

// ============================================================================
// 85-CHECK PRE-LAUNCH SECURITY & AGENTSHIELD PROTOCOL HARDENING
// ============================================================================

export const SECURITY_HEADERS: Readonly<Record<string, string>> = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
};

// Check 10.1: Attach security headers on all /api/* responses
apiRouter.use((_req, res, next) => {
  for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
    res.setHeader(header, value);
  }
  next();
});

// Check 6.1: Per-IP Sliding Window Rate Limiter (Max 15 requests / 60 seconds)
export const RATE_LIMIT_MAX_REQUESTS = 15;
export const RATE_LIMIT_WINDOW_MS = 60_000;

const ipRateBuckets = new Map<string, number[]>();

export function resetRateLimitBuckets(): void {
  ipRateBuckets.clear();
}

export function checkPerIpRateLimit(
  ipKey: string,
  nowMs: number = Date.now()
): { allowed: boolean; remaining: number; retryAfterSec: number } {
  const key = (ipKey || 'unknown-ip').trim();
  const cutoff = nowMs - RATE_LIMIT_WINDOW_MS;
  const existing = (ipRateBuckets.get(key) || []).filter((ts) => ts > cutoff);

  if (existing.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRateBuckets.set(key, existing);
    const oldest = existing[0] ?? nowMs;
    const retryAfterSec = Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - nowMs) / 1000));
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  existing.push(nowMs);
  ipRateBuckets.set(key, existing);
  return {
    allowed: true,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - existing.length),
    retryAfterSec: 0,
  };
}

function getClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim().length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || '127.0.0.1';
}

function enforceRateLimitMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const ip = getClientIp(req);
  const verdict = checkPerIpRateLimit(`${req.path}:${ip}`);
  res.setHeader('X-RateLimit-Limit', String(RATE_LIMIT_MAX_REQUESTS));
  res.setHeader('X-RateLimit-Remaining', String(verdict.remaining));
  if (!verdict.allowed) {
    res.setHeader('Retry-After', String(verdict.retryAfterSec));
    res.status(429).json({
      error: 'Too many requests. Please wait a minute before trying again.',
    });
    return;
  }
  next();
}

// Check 5.1 & 8.1: Input length cap & history turn cap
export const MAX_CHAT_MESSAGE_LENGTH = 500;
export const MAX_CHAT_HISTORY_TURNS = 6;
export const MAX_CHAT_OUTPUT_TOKENS = 320;

export function validateAiChatPayload(payload: {
  message?: unknown;
  messages?: unknown;
  currentSection?: unknown;
}): {
  valid: boolean;
  error?: string;
  cleanMessage: string;
  sanitizedHistory: { role: 'user' | 'model'; text: string }[];
  cleanSection: string;
} {
  if (typeof payload.message !== 'string') {
    return {
      valid: false,
      error: 'Message is required.',
      cleanMessage: '',
      sanitizedHistory: [],
      cleanSection: 'Hero & 3D Overview',
    };
  }
  const cleanMessage = payload.message.trim();
  if (!cleanMessage) {
    return {
      valid: false,
      error: 'Message is required.',
      cleanMessage: '',
      sanitizedHistory: [],
      cleanSection: 'Hero & 3D Overview',
    };
  }
  if (cleanMessage.length > MAX_CHAT_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: `Message exceeds the ${MAX_CHAT_MESSAGE_LENGTH}-character security limit.`,
      cleanMessage: '',
      sanitizedHistory: [],
      cleanSection: 'Hero & 3D Overview',
    };
  }

  const rawHistory = Array.isArray(payload.messages) ? payload.messages : [];
  const sanitizedHistory = rawHistory
    .filter(
      (item): item is { role: 'user' | 'model'; text: string } =>
        Boolean(item) &&
        typeof item === 'object' &&
        typeof (item as { text?: unknown }).text === 'string' &&
        (item as { text: string }).text.trim().length > 0
    )
    .slice(-MAX_CHAT_HISTORY_TURNS)
    .map((item) => ({
      role: item.role === 'model' ? ('model' as const) : ('user' as const),
      text: item.text.trim().slice(0, MAX_CHAT_MESSAGE_LENGTH),
    }));

  const cleanSection =
    typeof payload.currentSection === 'string' && payload.currentSection.trim().length > 0
      ? payload.currentSection.trim().slice(0, 80)
      : 'Hero & 3D Overview';

  return {
    valid: true,
    cleanMessage,
    sanitizedHistory,
    cleanSection,
  };
}

// Check 5.5 & 8.2: AgentShield Prompt-Injection & System-Prompt Exfiltration Guard
const PROMPT_INJECTION_PATTERNS: readonly RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/i,
  /disregard\s+(all\s+)?(previous|prior|system)\s+(instructions|prompts)/i,
  /(print|reveal|show|dump|output|repeat)\s+(your\s+|the\s+)?(system\s+prompt|system\s+instruction|hidden\s+prompt|developer\s+prompt)/i,
  /what\s+(is|are)\s+your\s+(system\s+instructions|system\s+prompt|secret\s+keys)/i,
  /(gemini_api_key|process\.env|service_role|sk_live_)/i,
];

export function detectPromptInjection(input: string): boolean {
  return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

function sanitizeAccent(color?: string): SemanticAccentColor {
  if (color && VALID_ACCENT_COLORS.includes(color as SemanticAccentColor)) {
    return color as SemanticAccentColor;
  }
  return 'indigo';
}

// 1. Health & Public CMS Bundle
apiRouter.get('/health', (_req, res) => {
  const db = getDb();
  res.json({
    status: 'ok',
    service: 'SkyLine Digital Agency Full-Stack API',
    timestamp: new Date().toISOString(),
    counts: {
      leads: db.leads.length,
      referrals: db.referrals.length,
      projects: db.projects.length,
      services: db.services.length,
      testimonials: db.testimonials.length,
      faqs: db.faqs.length,
    },
  });
});

apiRouter.get('/cms', (_req, res) => {
  const db = getDb();
  res.json({
    projects: db.projects,
    services: db.services,
    testimonials: db.testimonials,
    faqs: db.faqs,
    stats: {
      totalProjects: db.projects.length,
      totalServices: db.services.length,
      totalTestimonials: db.testimonials.length,
      activeLeadsCount: db.leads.length,
    },
  });
});

// 2. Public Lead / Contact & Strategy Meeting Capture (Rate-Limited Check 6.1)
apiRouter.post('/leads', enforceRateLimitMiddleware, (req, res) => {
  const body = req.body as Partial<CreateLeadPayload>;
  const check = validateCreateLeadPayload(body);

  if (!check.valid) {
    res.status(400).json({ error: check.error });
    return;
  }

  const db = getDb();
  const now = new Date().toISOString();
  const newLead: LeadRecord = {
    id: `LEAD-${Date.now().toString().slice(-6)}`,
    nameOrCompany: (body.nameOrCompany ?? '').trim().slice(0, 120),
    contact: (body.contact ?? '').trim().slice(0, 120),
    contactType: check.contactType,
    inquiryType: body.inquiryType === 'meeting' ? 'meeting' : 'inquiry',
    budget: (body.budget ?? 'Custom Scope').trim() || 'Custom Scope',
    meetingDate: body.meetingDate,
    meetingSlot: body.meetingSlot,
    selectedPillars: body.selectedPillars ?? [],
    projectScope: (body.projectScope ?? '').trim().slice(0, 500),
    status: 'new',
    notes: '',
    source: (body.source ?? 'Website Dispatch Form').trim().slice(0, 80),
    createdAt: now,
    updatedAt: now,
  };

  db.leads.unshift(newLead);
  saveDb(db);

  res.status(201).json({
    success: true,
    message: 'Lead saved to SkyLine CRM database.',
    lead: newLead,
  });
});

// 3. Public Partner Referral (15% Commission) Capture (Rate-Limited Check 6.1)
apiRouter.post('/referrals', enforceRateLimitMiddleware, (req, res) => {
  const body = req.body as Partial<CreateReferralPayload>;
  const check = validateCreateReferralPayload(body);

  if (!check.valid) {
    res.status(400).json({ error: check.error });
    return;
  }

  const db = getDb();
  const newReferral: ReferralRecord = {
    id: `REF-${Date.now().toString().slice(-6)}`,
    referrerName: (body.referrerName ?? '').trim(),
    referrerContact: (body.referrerContact ?? 'Via WhatsApp').trim() || 'Via WhatsApp',
    referredBusiness: (body.referredBusiness ?? '').trim(),
    estimatedDealValue: check.normalizedDealValue,
    commissionAmount: check.commissionAmount,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  db.referrals.unshift(newReferral);
  saveDb(db);

  res.status(201).json({
    success: true,
    message: 'Partner referral registered for 15% commission payout.',
    referral: newReferral,
  });
});

// 4. Admin Authentication
apiRouter.post('/auth/login', (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const db = getDb();
  const normalizedEmail = email.trim().toLowerCase();
  const user =
    db.users.find((u) => u.email.toLowerCase() === normalizedEmail) ||
    (normalizedEmail === DEFAULT_ADMIN_EMAIL ? db.users[0] : undefined);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    res.status(401).json({
      error: 'Invalid admin credentials. Default demo: admin@skylinedigital.in / SkyLine@2026',
    });
    return;
  }

  const token = signToken(user);
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
});

apiRouter.get('/auth/me', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  res.json({ user: req.adminUser });
});

// 5. Protected Admin Dashboard Overview & CRM
apiRouter.get('/admin/overview', requireAdminAuth, (_req, res) => {
  const db = getDb();
  res.json({
    stats: computeAdminOverviewStats(db),
    leads: db.leads,
    referrals: db.referrals,
    projects: db.projects,
    services: db.services,
    testimonials: db.testimonials,
    faqs: db.faqs,
  });
});

apiRouter.get('/leads', requireAdminAuth, (_req, res) => {
  const db = getDb();
  res.json({ leads: db.leads });
});

apiRouter.patch('/leads/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status, notes, budget } = req.body as {
    status?: LeadStatus;
    notes?: string;
    budget?: string;
  };
  const db = getDb();
  const lead = db.leads.find((l) => l.id === id);
  if (!lead) {
    res.status(404).json({ error: 'Lead not found.' });
    return;
  }

  const allowedStatuses: LeadStatus[] = [
    'new',
    'contacted',
    'qualified',
    'proposal-sent',
    'closed-won',
  ];
  if (status && allowedStatuses.includes(status)) {
    lead.status = status;
  }
  if (typeof notes === 'string') {
    lead.notes = notes;
  }
  if (typeof budget === 'string') {
    lead.budget = budget;
  }
  lead.updatedAt = new Date().toISOString();
  saveDb(db);

  res.json({ success: true, lead });
});

apiRouter.delete('/leads/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const prevLen = db.leads.length;
  db.leads = db.leads.filter((l) => l.id !== id);
  if (db.leads.length === prevLen) {
    res.status(404).json({ error: 'Lead not found.' });
    return;
  }
  saveDb(db);
  res.json({ success: true });
});

// 6. Protected Partner Referrals Management
apiRouter.patch('/referrals/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body as { status?: ReferralStatus };
  const db = getDb();
  const referral = db.referrals.find((r) => r.id === id);
  if (!referral) {
    res.status(404).json({ error: 'Referral not found.' });
    return;
  }
  const allowed: ReferralStatus[] = ['pending', 'in-discussion', 'closed-won', 'paid'];
  if (status && allowed.includes(status)) {
    referral.status = status;
  }
  saveDb(db);
  res.json({ success: true, referral });
});

apiRouter.delete('/referrals/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  db.referrals = db.referrals.filter((r) => r.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// 7. Protected Case Studies / Projects CMS
apiRouter.post('/projects', requireAdminAuth, (req, res) => {
  const body = req.body as Partial<ShowcaseProject>;
  const title = (body.title ?? '').trim();
  const category = (body.category ?? '').trim();

  if (!title || !category) {
    res.status(400).json({ error: 'Project title and category are required.' });
    return;
  }

  const db = getDb();
  const newProject: ShowcaseProject = {
    id: `project-${Date.now().toString().slice(-5)}`,
    statusBadge: (body.statusBadge ?? 'LIVE PRODUCTION').trim() || 'LIVE PRODUCTION',
    accentColor: sanitizeAccent(body.accentColor),
    category: category.toUpperCase(),
    title,
    locationTag: (body.locationTag ?? 'Indore • Pan-India Edge').trim(),
    tags: (body.tags ?? 'Next.js 15 • WhatsApp Cloud API • Meta CAPI').trim(),
    metricsHeadline: (body.metricsHeadline ?? '+165% Qualified Pipeline').trim(),
    metricsSub:
      (body.metricsSub ?? 'Full-stack conversion system with instant WhatsApp lead routing.').trim(),
    architectureNodes:
      Array.isArray(body.architectureNodes) && body.architectureNodes.length > 0
        ? body.architectureNodes
        : ['Next.js Edge UI', 'WhatsApp Cloud Bot', 'Server CAPI'],
    accentMetric: (body.accentMetric ?? 'Instant Load · 24/7 Bot').trim(),
    imageUrl: (body.imageUrl ?? '').trim(),
    fallbackSvgUrl: body.fallbackSvgUrl || '/assets/hero-system-preview.svg',
    problemStatement:
      (body.problemStatement ??
        'High acquisition leakage and slow manual sales follow-ups across digital channels.').trim(),
    architectureSummary:
      (body.architectureSummary ??
        'Engineered a high-speed Next.js platform integrated with WhatsApp Cloud API and server-side Meta CAPI attribution.').trim(),
    impactMetrics:
      Array.isArray(body.impactMetrics) && body.impactMetrics.length > 0
        ? body.impactMetrics
        : [
            {
              label: 'Qualified Conversion Velocity',
              before: '1.4%',
              after: '3.8%',
              delta: '3x More Inquiries',
            },
            {
              label: 'First-Touch WhatsApp Reply',
              before: '8 Hours',
              after: 'Instant',
              delta: '24/7 AI Bot',
            },
            {
              label: 'Mobile Experience',
              before: 'Slow Load',
              after: 'Instant Load',
              delta: 'Mobile First',
            },
          ],
    stackPills:
      Array.isArray(body.stackPills) && body.stackPills.length > 0
        ? body.stackPills
        : ['Next.js 15', 'TypeScript', 'WhatsApp Cloud API', 'PostgreSQL'],
  };

  db.projects.unshift(newProject);
  saveDb(db);
  res.status(201).json({ success: true, project: newProject });
});

apiRouter.delete('/projects/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (db.projects.length <= 1) {
    res.status(400).json({ error: 'Cannot delete the last remaining showcase project.' });
    return;
  }
  db.projects = db.projects.filter((p) => p.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// 8. Protected Services / Capabilities CMS
apiRouter.post('/services', requireAdminAuth, (req, res) => {
  const body = req.body as Partial<CapabilityPillar>;
  const title = (body.title ?? '').trim();
  const shortTab = (body.shortTab ?? '').trim();

  if (!title || !shortTab) {
    res.status(400).json({ error: 'Service title and tab label are required.' });
    return;
  }

  const db = getDb();
  const newService: CapabilityPillar = {
    id: `service-${Date.now().toString().slice(-5)}`,
    categoryLabel: (body.categoryLabel ?? 'CUSTOM ARCHITECTURE').trim().toUpperCase(),
    shortTab,
    badgeTag: (body.badgeTag ?? 'Enterprise SLA').trim(),
    accentColor: sanitizeAccent(body.accentColor),
    title,
    leadSentence:
      (body.leadSentence ?? 'High-velocity engineering and automated growth pipeline.').trim(),
    subtitle:
      (body.subtitle ??
        'Custom-engineered architecture designed for instant mobile speed, automated WhatsApp qualification, and measurable growth.').trim(),
    outcomeMetric: (body.outcomeMetric ?? '+150% Pipeline Conversion Velocity').trim(),
    timeline: (body.timeline ?? '2–3 Weeks Delivery').trim(),
    deliverables:
      Array.isArray(body.deliverables) && body.deliverables.length > 0
        ? body.deliverables
        : [
            'Custom Architecture Blueprint',
            'Full-Stack Next.js / Node Deployment',
            'WhatsApp & CRM Webhook Sync',
            'Mobile Speed & Security Verification',
          ],
    architectureSpecs:
      Array.isArray(body.architectureSpecs) && body.architectureSpecs.length > 0
        ? body.architectureSpecs
        : [
            { key: 'Core Stack', val: 'Next.js 15 · TypeScript · PostgreSQL' },
            { key: 'Performance Target', val: 'Instant Mobile Load · High Conversion' },
            { key: 'Automation', val: 'Official WhatsApp Cloud API' },
          ],
    previewMode: body.previewMode || 'web-vitals',
  };

  db.services.push(newService);
  saveDb(db);
  res.status(201).json({ success: true, service: newService });
});

apiRouter.delete('/services/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (db.services.length <= 1) {
    res.status(400).json({ error: 'Cannot delete the last remaining service pillar.' });
    return;
  }
  db.services = db.services.filter((s) => s.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// 9. Protected Client Testimonials / Reviews CMS
apiRouter.post('/testimonials', requireAdminAuth, (req, res) => {
  const body = req.body as Partial<ClientReview>;
  const author = (body.author ?? '').trim();
  const quote = (body.quote ?? '').trim();

  if (!author || !quote) {
    res.status(400).json({ error: 'Client author name and review quote are required.' });
    return;
  }

  const db = getDb();
  const words = author.split(/\s+/);
  const autoInitials = words
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const newReview: ClientReview = {
    id: `review-${Date.now().toString().slice(-5)}`,
    initials: (body.initials ?? autoInitials) || 'SL',
    quote,
    author,
    role: (body.role ?? 'Founder & Director').trim(),
    engagementScope: (body.engagementScope ?? 'FULL-STACK & GROWTH SYSTEM').trim().toUpperCase(),
    verifiedOutcome: (body.verifiedOutcome ?? '+190% Verified ROI').trim(),
    relatedProjectId: body.relatedProjectId || db.projects[0]?.id || 'project-360-estate',
  };

  db.testimonials.unshift(newReview);
  saveDb(db);
  res.status(201).json({ success: true, testimonial: newReview });
});

apiRouter.delete('/testimonials/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (db.testimonials.length <= 1) {
    res.status(400).json({ error: 'Cannot delete the last remaining client review.' });
    return;
  }
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// 10. Protected FAQs CMS
apiRouter.post('/faqs', requireAdminAuth, (req, res) => {
  const body = req.body as Partial<FaqItem>;
  const question = (body.question ?? '').trim();
  const answer = (body.answer ?? '').trim();

  if (!question || !answer) {
    res.status(400).json({ error: 'FAQ question and answer are required.' });
    return;
  }

  const db = getDb();
  const newFaq: FaqItem = {
    id: `faq-${Date.now().toString().slice(-5)}`,
    category: (body.category ?? 'Engineering').trim(),
    accentColor: sanitizeAccent(body.accentColor),
    question,
    answer,
  };

  db.faqs.push(newFaq);
  saveDb(db);
  res.status(201).json({ success: true, faq: newFaq });
});

apiRouter.delete('/faqs/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (db.faqs.length <= 1) {
    res.status(400).json({ error: 'Cannot delete the last remaining FAQ item.' });
    return;
  }
  db.faqs = db.faqs.filter((f) => f.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// 11. Reset Demo Database
apiRouter.post('/admin/reset', requireAdminAuth, (_req, res) => {
  const fresh = resetDbToDefault();
  res.json({
    success: true,
    stats: computeAdminOverviewStats(fresh),
  });
});

// 12. SkyLine AI Assistant ("Gemini in Chrome" Speed + Ground-Truth System Prompt + Silent Multi-Model Fallback Cascade)
export const SKYBOT_MODEL_FALLBACK_CASCADE: readonly string[] = [
  'gemini-3.1-flash-lite',
  'gemini-4-hydrogen',
];

export const SKYLINE_SYSTEM_INSTRUCTION = `You are "SkyBot", the fast AI Assistant for SkyLine Digital Agency (Indore, MP, India).
STRICT DOMAIN BOUNDARY:
- You MUST ONLY answer questions related to SkyLine Digital Agency, our website, our services, our pricing & timelines, our live projects & interactive landing page prototypes, our 15% Partner Referral Program, our Student Mentorship Lab, and our founders (Sachin Sahu & Aashif Khan).
- If a visitor asks anything unrelated to SkyLine Digital Agency or software/digital growth services (e.g., general trivia, recipes, movies, politics, homework, unrelated coding), politely decline in 1 sentence and steer the conversation back to how SkyLine Digital Agency can help their business grow.
- Answer in 2 to 4 crisp, helpful sentences or bullet points (English or natural Hinglish matching the user's language). Never repeat the same canned paragraph across different questions—tailor every response directly to the user's specific message.
Ground-truth facts:
- Pricing starts at ₹10,000 for starter packages and is flexible and open to negotiation based on exact scope:
  • Starter Website / Local Business Pack: Starts at ₹10,000 (1–2 Weeks)
  • Local Maps & Search SEO (LOCAL SEO): Starting from ₹15,000 (Timeline: 2 to 4 Weeks)
  • Meta & Google Ads Funnel (PAID ADS): Starting with ₹20,000 (Timeline: 4 to 6 Weeks)
  • WhatsApp Bot & Lead Automation (WHATSAPP AI): Starting from ₹25,000 (Timeline: 1 to 4 Weeks)
  • Website, Web App or SaaS (WEB / SAAS): Starting from ₹30,000 (Timeline: 2 to 6 Weeks)
- Core Services: Custom Next.js Websites & SaaS Web Apps, 24/7 WhatsApp Booking & Lead Automation Bots, Google Maps SEO & Digital WhatsApp Review Links, Meta & Google Search Ad Funnels, On-Page & Technical SEO, and D2C 1-Tap UPI Storefronts.
- Support & Ownership: 100% source code & GitHub/domain ownership from Day 1 + 30-day free post-launch support window.
- Live Portfolio Projects & Single-Page Prototypes on this website:
  • 360 Views (Live: https://360views.services) — Interactive 360° Real Estate & PropTech Virtual Tour Platform
  • GridWeaver (Live: https://gridweaver-virid.vercel.app/) — Smart Solar & IoT Microgrid Control Dashboard
  • Shivangi Hair Salon (Live: https://shivangi-hair-salon.vercel.app/ • Pradeep Sen) — React & Node.js Salon Website & Online Slot Booking
  • LocalLoom (Live: https://localloom-nu.vercel.app/ • Akram Khan) — Handloom E-Commerce & Admin Inventory Portal
  • A&A Chocolates (Niquehat Khan) — Next.js & Payment Authentication D2C Storefront + Custom Gift Box Builder
  • ShadowBase — Safe SQL Schema Migration & Debezium CDC Testing Studio
  • FileGuard AI — SHA-256 & OriginStamp Blockchain Document Integrity Verifier
  • AuraCare Clinic, FinVantage GST SaaS, AI Career Guide & Mentor, and Socialite Community Hub.
- Founders & Direct Contact:
  • Sachin Sahu (Founder & CEO — Full Stack, Principal Backend & CTO): WhatsApp +91 89591 44686 | Sachinsahuji06@gmail.com | Tech Stack: Spring Boot, Java Full Stack, API & JWT Integration, Apache Kafka, React & Kotlin.
  • Aashif Khan (Co-Founder & System Architect — System Architect, AI Generalist & Cybersecurity): Direct Call & WhatsApp +91 86430 02478 | aashifkpp@gmail.com | Tech Stack: Next.js 16, FastAPI & SQL, Node.js, Reverse Engineering & AI Implementation.
- Never mention internal model IDs, API keys, or fallback states. Always end with a helpful next step.`;

function isHinglishMessage(raw: string): boolean {
  const q = raw.toLowerCase();
  const markers = [
    'mere',
    'mera',
    'meri',
    'ke liye',
    'kharcha',
    'kitna',
    'aayega',
    'kaise',
    'kya',
    'hai',
    'hain',
    'batao',
    'chahiye',
    'banwana',
    'dukan',
    'paisa',
    'aap',
    'karo',
    'namaste',
    'bhai',
  ];
  return markers.some((m) => q.includes(m));
}

export function evaluateLocalSkylineIntent(query: string): {
  reply: string;
  needsHumanFallback: boolean;
  showFallbackActions: boolean;
} {
  const q = query.toLowerCase().trim();
  const isHi = isHinglishMessage(query);

  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q === 'namaste' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.startsWith('hey ')
  ) {
    return {
      reply: isHi
        ? '• **Namaste! Main SkyBot hoon** — SkyLine Digital Agency ka AI Assistant.\n• Hum **Website/SaaS (₹30K+)**, **WhatsApp AI Bot (₹25K+)**, **Meta & Google Ads (₹20K+)**, aur **Local Maps SEO (₹15K+)** (Starter packages **₹10,000** se shuru) banate hain.\n• Aap apne business ke liye website, WhatsApp automation, ya local growth mein se kya plan kar rahe hain?'
        : '• **Hello! I am SkyBot**, the AI Assistant for **SkyLine Digital Agency**.\n• We engineer **Websites & SaaS Apps (from ₹30K)**, **24/7 WhatsApp Bots (from ₹25K)**, **Meta & Google Ad Funnels (from ₹20K)**, and **Local Maps & Search SEO (from ₹15K)**, with starter setups beginning at **₹10,000**.\n• What type of project or business growth system are you looking to build?',
      needsHumanFallback: false,
      showFallbackActions: false,
    };
  }

  if (
    q.includes('human') ||
    q.includes('talk') ||
    q.includes('call') ||
    q.includes('contact') ||
    q.includes('number') ||
    q.includes('phone') ||
    q.includes('baat kar') ||
    q.includes('negotiate') ||
    q.includes('discount')
  ) {
    return {
      reply: isHi
        ? '• **Direct Founder Connect:** Aap seedhe **Sachin Sahu** (Founder & CEO — WhatsApp **+91 89591 44686**, `Sachinsahuji06@gmail.com`) ya **Aashif Khan** (Co-Founder & System Architect — Direct Call & WhatsApp **+91 86430 02478**, `aashifkpp@gmail.com`) se jud sakte hain.\n• **Negotiable Pricing:** Hamare packages **₹10,000 starting** hain aur aapke custom scope ke hisaab se flexible hain. Kya main aapke project ka brief note kar loon?'
        : '• **Direct Founder Access:** Connect directly with **Sachin Sahu** (Founder & CEO — WhatsApp **+91 89591 44686**, `Sachinsahuji06@gmail.com`) or **Aashif Khan** (Co-Founder & System Architect — Direct Call & WhatsApp **+91 86430 02478**, `aashifkpp@gmail.com`).\n• **Negotiable Pricing:** Packages start at **₹10,000** and are tailored to your exact features. Would you like to share your project requirements?',
      needsHumanFallback: true,
      showFallbackActions: true,
    };
  }

  if (
    q.includes('price') ||
    q.includes('pricing') ||
    q.includes('cost') ||
    q.includes('package') ||
    q.includes('budget') ||
    q.includes('charge') ||
    q.includes('kharcha') ||
    q.includes('kitna') ||
    q.includes('rate')
  ) {
    return {
      reply: isHi
        ? '• **Updated SkyLine Service Pricing (Flexible & Negotiable • Starts at ₹10,000):**\n  1. **Website, Web App or SaaS:** Starting from **₹30,000** (Timeline: 2 to 6 Weeks)\n  2. **WhatsApp Bot & Lead Automation:** Starting from **₹25,000** (Timeline: 1 to 4 Weeks)\n  3. **Meta & Google Ads Funnel:** Starting with **₹20,000** (Timeline: 4 to 6 Weeks)\n  4. **Local Maps & Search SEO:** Starting from **₹15,000** (Timeline: 2 to 4 Weeks)\n• Aap is page ke **Scope Your Project** calculator mein ₹10K se ₹1L+ slider chala kar live roadmap dekh sakte hain!'
        : '• **Transparent SkyLine Service Pricing (Flexible & Negotiable • Starter from ₹10,000):**\n  1. **Website, Web App or SaaS:** Starting from **₹30,000** (Timeline: 2 to 6 Weeks)\n  2. **WhatsApp Bot & Lead Automation:** Starting from **₹25,000** (Timeline: 1 to 4 Weeks)\n  3. **Meta & Google Ads Funnel:** Starting with **₹20,000** (Timeline: 4 to 6 Weeks)\n  4. **Local Maps & Search SEO:** Starting from **₹15,000** (Timeline: 2 to 4 Weeks)\n• You can also use our interactive **₹10K – ₹1L+ Price Line Calculator** in the Scope Your Project section. Which service fits your goal?',
      needsHumanFallback: false,
      showFallbackActions: false,
    };
  }

  if (
    q.includes('local') ||
    q.includes('map') ||
    q.includes('clinic') ||
    q.includes('salon') ||
    q.includes('shivangi') ||
    q.includes('localloom') ||
    q.includes('review') ||
    q.includes('auracare')
  ) {
    return {
      reply: isHi
        ? '• **Local Maps & Search SEO (Starting from ₹15,000 • 2 to 4 Weeks):** Hum Google Business Profile (GBP) SEO, digital WhatsApp review links, aur online booking websites banate hain.\n• **Live Client Examples:** **Shivangi Hair Salon** (`https://shivangi-hair-salon.vercel.app/`), **LocalLoom** (`https://localloom-nu.vercel.app/`), aur **AuraCare Clinic** ke live prototypes is page par test karein. Aapka business kis city mein hai?'
        : '• **Local Maps & Search SEO (Starting from ₹15,000 • 2 to 4 Weeks):** We optimize your Google Business Profile (GBP), configure digital WhatsApp review links, and launch fast booking websites.\n• **Live Portfolio:** Test **Shivangi Hair Salon** (`https://shivangi-hair-salon.vercel.app/`), **LocalLoom** (`https://localloom-nu.vercel.app/`), or **AuraCare Clinic** directly from our Projects section. Which city does your business serve?',
      needsHumanFallback: false,
      showFallbackActions: false,
    };
  }

  if (
    q.includes('whatsapp') ||
    q.includes('bot') ||
    q.includes('crm') ||
    q.includes('automation') ||
    q.includes('lead')
  ) {
    return {
      reply: isHi
        ? '• **WhatsApp Bot & Lead Automation (Starting from ₹25,000 • 1 to 4 Weeks):** Official WhatsApp Cloud API ke zariye 24/7 instant inquiry replies, PDF brochure sharing, aur appointment slot booking automate hoti hai.\n• **Live Demo:** Kisi bhi project card par **"Launch Live Prototype"** click karke full single-page website demo test karein. Kya aap bookings automate karna chahte hain ya sales follow-ups?'
        : '• **WhatsApp Bot & Lead Automation (Starting from ₹25,000 • 1 to 4 Weeks):** Powered by the Official WhatsApp Cloud API to automate 24/7 customer replies, catalog/brochure sharing, and slot booking.\n• **Interactive Prototypes:** Click **"Launch Live Prototype"** on any project card to test our full single-page landing page demos. Are you looking to automate appointment bookings or lead capture?',
      needsHumanFallback: false,
      showFallbackActions: false,
    };
  }

  if (
    q.includes('founder') ||
    q.includes('team') ||
    q.includes('who') ||
    q.includes('aashif') ||
    q.includes('sachin') ||
    q.includes('email') ||
    q.includes('360') ||
    q.includes('shadowbase') ||
    q.includes('gridweaver') ||
    q.includes('fileguard') ||
    q.includes('socialite') ||
    q.includes('project') ||
    q.includes('portfolio')
  ) {
    return {
      reply: isHi
        ? '• **Sachin Sahu (Founder & CEO — Full Stack, Principal Backend & CTO):** WhatsApp **+91 89591 44686** | `Sachinsahuji06@gmail.com` — Stack: Spring Boot, Java Full Stack, API & JWT Integration, Apache Kafka, React & Kotlin. Live builds: **360 Views** (`https://360views.services`), **GridWeaver** (`https://gridweaver-virid.vercel.app/`) & **ShadowBase**.\n• **Aashif Khan (Co-Founder & System Architect — System Architect, AI Generalist & Cybersecurity):** Direct Call & WhatsApp **+91 86430 02478** | `aashifkpp@gmail.com` — Stack: Next.js 16, FastAPI & SQL, Node.js, Reverse Engineering & AI Implementation. Live builds: **LocalLoom** (`https://localloom-nu.vercel.app/`), **Shivangi Hair Salon** (`https://shivangi-hair-salon.vercel.app/`), **A&A Chocolates** & **FileGuard AI**.'
        : '• **Sachin Sahu (Founder & CEO — Full Stack, Principal Backend & CTO):** WhatsApp **+91 89591 44686** | `Sachinsahuji06@gmail.com` — Stack: Spring Boot, Java Full Stack, API & JWT Integration, Apache Kafka, React & Kotlin. Creator of **360 Views** (`https://360views.services`), **GridWeaver** (`https://gridweaver-virid.vercel.app/`), and **ShadowBase**.\n• **Aashif Khan (Co-Founder & System Architect — System Architect, AI Generalist & Cybersecurity):** Direct Call & WhatsApp **+91 86430 02478** | `aashifkpp@gmail.com` — Stack: Next.js 16, FastAPI & SQL, Node.js, Reverse Engineering & AI Implementation. Creator of **LocalLoom** (`https://localloom-nu.vercel.app/`), **Shivangi Hair Salon** (`https://shivangi-hair-salon.vercel.app/`), **A&A Chocolates**, and **FileGuard AI**.',
      needsHumanFallback: true,
      showFallbackActions: true,
    };
  }

  if (
    q.includes('timeline') ||
    q.includes('fast') ||
    q.includes('time') ||
    q.includes('long') ||
    q.includes('week') ||
    q.includes('day')
  ) {
    return {
      reply: isHi
        ? '• **Delivery Timelines:** WhatsApp Bot & Lead Automation **1 to 4 Weeks**, Local Maps & Search SEO **2 to 4 Weeks**, Website / Web App / SaaS **2 to 6 Weeks**, aur Meta & Google Ads Funnel **4 to 6 Weeks**.\n• **100% Code Ownership:** Har project ke saath 30-day free post-launch support aur full GitHub/domain handover milta hai. Aap apna project kab tak launch karna chahte hain?'
        : '• **Delivery Timelines:** WhatsApp Bot & Lead Automation takes **1 to 4 Weeks**, Local Maps & Search SEO takes **2 to 4 Weeks**, Website / Web App / SaaS takes **2 to 6 Weeks**, and Meta & Google Ads Funnels run **4 to 6 Weeks**.\n• **100% Ownership:** Every project includes 30-day free post-launch support and complete GitHub & domain ownership. What is your target launch date?',
      needsHumanFallback: false,
      showFallbackActions: false,
    };
  }

  if (
    q.includes('refer') ||
    q.includes('commission') ||
    q.includes('partner') ||
    q.includes('15%') ||
    q.includes('student') ||
    q.includes('mentor')
  ) {
    return {
      reply: isHi
        ? '• **15% Partner Commission:** Kisi bhi business ko SkyLine refer karne par deal confirm hote hi aapko 15% direct UPI/bank payout milta hai.\n• **Student Mentorship Lab:** B.Tech/BCA/MCA students ke liye 1-on-1 architecture & project mentorship (**₹599 – ₹3,999**) bhi available hai. Aap kis program ki details chahte hain?'
        : '• **15% Partner Referral Commission:** Earn a direct 15% UPI/bank payout within 48 hours of invoice settlement for every client you introduce.\n• **Student Mentorship Lab:** 1-on-1 engineering & project guidance (**₹599 – ₹3,999**) for B.Tech/BCA/MCA builders. Which program would you like to explore?',
      needsHumanFallback: false,
      showFallbackActions: false,
    };
  }

  if (
    q.includes('service') ||
    q.includes('web') ||
    q.includes('saas') ||
    q.includes('ads') ||
    q.includes('seo') ||
    q.includes('upi') ||
    q.includes('app') ||
    q.includes('store') ||
    q.includes('ecommerce')
  ) {
    return {
      reply: isHi
        ? '• **SkyLine Core Services:**\n  • **WEB / SAAS:** Custom Next.js Websites, Web Apps & SaaS Portals (2–6 Weeks • From **₹30,000**)\n  • **WHATSAPP AI:** 24/7 WhatsApp Booking & Lead Automation Bots (1–4 Weeks • From **₹25,000**)\n  • **PAID ADS:** Meta Reels & Google Search Ad Funnels (4–6 Weeks • From **₹20,000**)\n  • **LOCAL SEO:** Google Business Profile & Search SEO (2–4 Weeks • From **₹15,000**)\n• Aapko apne business ke liye inmein se kaunsa system chahiye?'
        : '• **SkyLine Core Services:**\n  • **WEB / SAAS:** Custom Next.js Websites, Web Apps & SaaS Portals (2–6 Weeks • Starting from **₹30,000**)\n  • **WHATSAPP AI:** 24/7 WhatsApp Booking & Lead Automation Bots (1–4 Weeks • Starting from **₹25,000**)\n  • **PAID ADS:** Meta Reels & Google Search Ad Funnels (4–6 Weeks • Starting with **₹20,000**)\n  • **LOCAL SEO:** Google Business Profile & Search SEO (2–4 Weeks • Starting from **₹15,000**)\n• Which capability matches your immediate business goal?',
      needsHumanFallback: false,
      showFallbackActions: false,
    };
  }

  // Strict domain boundary response for off-topic or unrecognized messages
  const snippet = query.trim().slice(0, 48);
  return {
    reply: isHi
      ? `• **SkyBot Domain Notice ("${snippet}"):** Main sirf **SkyLine Digital Agency** ki services (Web/SaaS, WhatsApp AI Bots, Paid Ads, Local SEO), live projects (\`360views.services\`, \`gridweaver-virid.vercel.app\`, \`localloom-nu.vercel.app\`, \`shivangi-hair-salon.vercel.app\`), aur pricing (**₹10,000 – ₹1,00,000+**) ke baare mein help kar sakta hoon.\n• **Direct Founder Connect:** Sachin Sahu (WhatsApp **+91 89591 44686**) ya Aashif Khan (Direct Call **+91 86430 02478**). Bataiye, aapke business project mein main kaise madad karoon?`
      : `• **SkyBot Scope Notice ("${snippet}"):** I am configured exclusively to assist with **SkyLine Digital Agency** services (Web/SaaS from ₹30K, WhatsApp AI Bots from ₹25K, Paid Ads from ₹20K, Local Maps SEO from ₹15K, Starter setups from ₹10K), our live projects, and founder consultations.\n• **Direct Connect:** Reach **Sachin Sahu** on WhatsApp (**+91 89591 44686**) or **Aashif Khan** via Direct Call (**+91 86430 02478**). Which digital system can we help you build today?`,
    needsHumanFallback: true,
    showFallbackActions: true,
  };
}

/**
 * Silent Multi-Model Fallback Cascade:
 * Tries `gemini-3.1-flash-lite` first, then `gemini-4-hydrogen`.
 * If one model fails (quota, 404, timeout, network), it automatically and silently tries the next model,
 * and falls back to `evaluateLocalSkylineIntent` if all remote models fail or no API key is present.
 */
export async function generateSkyBotReplyWithFallback(params: {
  cleanMessage: string;
  messages?: { role: 'user' | 'model'; text: string }[];
  currentSection?: string;
  mode?: 'standard' | 'fast';
  apiKey?: string;
  customInvoker?: (modelName: string) => Promise<string | undefined>;
}): Promise<{
  reply: string;
  needsHumanFallback: boolean;
  showFallbackActions: boolean;
  attemptedModels: string[];
}> {
  const {
    cleanMessage,
    messages,
    currentSection = 'Hero & 3D Overview',
    apiKey,
    customInvoker,
  } = params;
  const localResult = evaluateLocalSkylineIntent(cleanMessage);
  const attemptedModels: string[] = [];

  const lowerQ = cleanMessage.toLowerCase();
  const needsFallback =
    localResult.needsHumanFallback ||
    lowerQ.includes('discount') ||
    lowerQ.includes('negotiate') ||
    lowerQ.includes('custom contract') ||
    lowerQ.includes('call') ||
    lowerQ.includes('human') ||
    lowerQ.includes('baat kar') ||
    lowerQ.includes('sachin') ||
    lowerQ.includes('aashif');

  // Check 5.5 & 8.2: AgentShield Prompt-Injection Guard
  if (detectPromptInjection(cleanMessage)) {
    return {
      reply:
        'I am SkyBot, the AI Assistant for SkyLine Digital Agency. I can only assist with SkyLine Digital Agency services, pricing packages (starting at ₹10,000 and open to negotiation), our live interactive website prototypes, and founder consultations. How can I help with your project today?',
      needsHumanFallback: false,
      showFallbackActions: false,
      attemptedModels,
    };
  }

  if (!apiKey && !customInvoker) {
    return {
      ...localResult,
      attemptedModels,
    };
  }

  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  const cappedHistory = Array.isArray(messages)
    ? messages.slice(-MAX_CHAT_HISTORY_TURNS)
    : [];

  const contextualUserText = `[Visitor Active Section: ${currentSection}] ${cleanMessage}`;

  const historyContents =
    cappedHistory.length > 0
      ? cappedHistory.map((m, idx) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [
            {
              text:
                idx === cappedHistory.length - 1 && m.role !== 'model'
                  ? `[Visitor Active Section: ${currentSection}] ${m.text.slice(0, MAX_CHAT_MESSAGE_LENGTH)}`
                  : m.text.slice(0, MAX_CHAT_MESSAGE_LENGTH),
            },
          ],
        }))
      : contextualUserText;

  for (const candidateModel of SKYBOT_MODEL_FALLBACK_CASCADE) {
    attemptedModels.push(candidateModel);
    try {
      let generatedText: string | undefined;
      if (customInvoker) {
        generatedText = await customInvoker(candidateModel);
      } else if (ai) {
        const response = await ai.models.generateContent({
          model: candidateModel,
          contents: historyContents,
          config: {
            systemInstruction: SKYLINE_SYSTEM_INSTRUCTION,
            maxOutputTokens: MAX_CHAT_OUTPUT_TOKENS,
          },
        });
        generatedText = response.text?.trim();
      }

      if (generatedText && generatedText.length > 0) {
        return {
          reply: generatedText,
          needsHumanFallback: needsFallback,
          showFallbackActions: needsFallback,
          attemptedModels,
        };
      }
    } catch {
      // Silently advance to the next model in SKYBOT_MODEL_FALLBACK_CASCADE
      continue;
    }
  }

  return {
    ...localResult,
    attemptedModels,
  };
}

apiRouter.post('/ai/chat', enforceRateLimitMiddleware, async (req, res) => {
  const { message, messages, currentSection, mode } = req.body as {
    message?: unknown;
    messages?: unknown;
    currentSection?: unknown;
    mode?: 'standard' | 'fast';
  };

  const validation = validateAiChatPayload({ message, messages, currentSection });
  if (!validation.valid) {
    res.status(400).json({ error: validation.error });
    return;
  }

  const result = await generateSkyBotReplyWithFallback({
    cleanMessage: validation.cleanMessage,
    messages: validation.sanitizedHistory,
    currentSection: validation.cleanSection,
    mode,
    apiKey: process.env.GEMINI_API_KEY,
  });

  res.json({
    reply: result.reply,
    needsHumanFallback: result.needsHumanFallback,
    showFallbackActions: result.showFallbackActions,
  });
});

apiRouter.post('/ai/transcribe', async (req, res) => {
  const { audioBase64, mimeType } = req.body as {
    audioBase64?: string;
    mimeType?: string;
  };

  if (!audioBase64) {
    res.status(400).json({ error: 'audioBase64 is required.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.json({
      transcript: 'What are your pricing packages and timelines for a new project?',
    });
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: [
        {
          inlineData: {
            mimeType: mimeType || 'audio/webm',
            data: audioBase64,
          },
        },
        {
          text: 'Transcribe the spoken question accurately in plain text.',
        },
      ],
    });

    res.json({
      transcript: response.text?.trim() || '',
    });
  } catch {
    res.json({
      transcript: 'Tell me about SkyLine Digital Agency pricing and WhatsApp AI bots.',
    });
  }
});


