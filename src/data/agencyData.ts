export type SemanticAccentColor = 'emerald' | 'indigo' | 'violet' | 'amber' | 'cyan' | 'rose';

export type InteractiveArtifactId =
  | '360-views'
  | 'shadowbase-cdc'
  | 'gridweaver-iot'
  | 'fileguard-security'
  | 'ai-career-mentor'
  | 'socialite-network'
  | 'aa-chocolates-d2c'
  | 'finvantage-saas'
  | 'auracare-local'
  | 'nexaprop-crm'
  | 'searchpulse-seo'
  | 'career-socialite';

// Official Contact Routing:
// - Sachin Sahu (+91 89591 44686): Founder & CEO (Active WhatsApp Lead & Backend Architecture)
// - Aashif Khan (+91 86430 02478): Co-Founder & System Architect (Active on BOTH Direct Voice Call & WhatsApp)
export const SKYLINE_WHATSAPP_NUMBER = '918959144686';
export const SKYLINE_AASHIF_WHATSAPP_NUMBER = '918643002478';
export const SKYLINE_SACHIN_WHATSAPP_NUMBER = '918959144686';
export const SKYLINE_CALL_NUMBER = '+918643002478';
export const SKYLINE_PRIMARY_PHONE_DISPLAY = '+91 86430 02478';
export const SKYLINE_SACHIN_PHONE_DISPLAY = '+91 89591 44686';
export const SKYLINE_EMAIL = 'agencyskylinedigital@gmail.com';
export const SKYLINE_SACHIN_EMAIL = 'Sachinsahuji06@gmail.com';
export const SKYLINE_AASHIF_EMAIL = 'aashifkpp@gmail.com';
export const SKYLINE_INSTAGRAM_URL = 'https://www.instagram.com/sky_line_digital';
export const SKYLINE_LINKEDIN_URL = 'https://www.linkedin.com/in/skyline-digital-agency-678585450';
export const SKYLINE_GITHUB_URL = 'https://github.com/agencyskylinedigital-create';
export const SKYLINE_WHATSAPP_DIRECT_URL =
  'https://wa.me/918959144686?text=Hi%20SkyLine%20Team%2C%20I%20visited%20your%20website%20and%20want%20to%20discuss%20a%20project.';
export const SKYLINE_SECONDARY_WHATSAPP_URL =
  'https://wa.me/918643002478?text=Hi%20Aashif%2C%20I%20want%20to%20discuss%20system%20architecture%20and%20project%20scope.';
export const SKYLINE_EMAIL_INQUIRY_URL =
  'mailto:agencyskylinedigital@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20SkyLine%20Digital%20Agency';
export const SKYLINE_LOCATION = 'Indore, Madhya Pradesh, India';
export const SKYLINE_SHORT_LOCATION = 'Indore, MP, India';

export interface SocialLinkItem {
  id: 'linkedin' | 'github' | 'instagram' | 'whatsapp' | 'email' | 'phone';
  label: string;
  url: string;
  brandHex: string;
}

export const SKYLINE_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: SKYLINE_LINKEDIN_URL,
    brandHex: '#0A66C2',
  },
  {
    id: 'github',
    label: 'GitHub',
    url: SKYLINE_GITHUB_URL,
    brandHex: '#181717',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: SKYLINE_INSTAGRAM_URL,
    brandHex: '#E1306C',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Direct',
    url: SKYLINE_WHATSAPP_DIRECT_URL,
    brandHex: '#25D366',
  },
  {
    id: 'email',
    label: 'Official Email',
    url: SKYLINE_EMAIL_INQUIRY_URL,
    brandHex: '#EA4335',
  },
  {
    id: 'phone',
    label: 'Direct Call',
    url: `tel:${SKYLINE_CALL_NUMBER}`,
    brandHex: '#09090B',
  },
];

export interface HeroOrbNode {
  id: string;
  code: string;
  label: string;
  shortLabel: string;
  title: string;
  categoryTag: string;
  metricBadge: string;
  metric: string;
  metricLabel: string;
  description: string;
  summary: string;
  deliverables: string[];
  accentColor: SemanticAccentColor;
  psychColor: string;
  psychName: string;
  psychMeaning: string;
  orbitAngleDeg: number;
  artifactId: InteractiveArtifactId;
}

export const HERO_ORBS: HeroOrbNode[] = [
  {
    id: 'ai',
    code: '01',
    label: 'AI Agents',
    shortLabel: 'AI Agents',
    title: 'WhatsApp Booking Bots & Instant Lead Reply Systems',
    categoryTag: 'WHATSAPP AUTOMATION',
    metricBadge: 'Instant Auto-Reply',
    metric: '24/7',
    metricLabel: 'Instant Reply',
    description:
      'WhatsApp booking bots that reply to common customer inquiries, share catalogs or brochures, collect lead details, and schedule appointments.',
    summary:
      'WhatsApp booking bots that reply to common customer inquiries, share catalogs or brochures, collect lead details, and schedule appointments.',
    deliverables: ['WhatsApp Cloud Bot Setup', 'Brochure & Slot Booking Flow', 'Smooth Team Handover'],
    accentColor: 'violet',
    psychColor: '#18181B',
    psychName: 'WhatsApp & Lead Automation',
    psychMeaning: 'Instant Customer Replies & Slot Booking',
    orbitAngleDeg: 0,
    artifactId: 'nexaprop-crm',
  },
  {
    id: 'ads',
    code: '02',
    label: 'Paid Ads',
    shortLabel: 'Paid Ads',
    title: 'Targeted Meta Reels & Google Search Ad Funnels',
    categoryTag: 'DEMAND GENERATION',
    metricBadge: 'Direct Lead Funnels',
    metric: 'Tracked',
    metricLabel: 'Ad Funnels',
    description:
      'Targeted Google Search and Instagram/Facebook Reels ad campaigns paired with fast landing pages to bring customer calls, walk-ins, and online orders.',
    summary:
      'Targeted Google Search and Instagram/Facebook Reels ad campaigns paired with fast landing pages to bring customer calls, walk-ins, and online orders.',
    deliverables: ['Meta & Instagram Ad Funnels', 'High-Intent Google Search Capture', 'Clear Lead Attribution'],
    accentColor: 'amber',
    psychColor: '#52525B',
    psychName: 'Meta & Google Ads',
    psychMeaning: 'Verified Customer Inquiries & Demand Capture',
    orbitAngleDeg: 51,
    artifactId: 'aa-chocolates-d2c',
  },
  {
    id: 'saas',
    code: '03',
    label: 'SaaS & Cloud',
    shortLabel: 'SaaS & Cloud',
    title: 'Custom SaaS Dashboards, GST Billing & Business Portals',
    categoryTag: 'CLOUD ENGINEERING',
    metricBadge: 'Clean Admin Dashboard',
    metric: 'Custom',
    metricLabel: 'Admin Portals',
    description:
      'Custom SaaS products, role-based admin dashboards, GST billing workflows, and clean Java, Python, and Node.js backend APIs.',
    summary:
      'Custom SaaS products, role-based admin dashboards, GST billing workflows, and clean Java, Python, and Node.js backend APIs.',
    deliverables: ['PostgreSQL & Cloud Backends', 'Razorpay GST Billing Flows', 'Role-Based Admin Portals'],
    accentColor: 'cyan',
    psychColor: '#E4E4E7',
    psychName: 'Cloud Billing & Portals',
    psychMeaning: 'Clean Business Dashboards & APIs',
    orbitAngleDeg: 102,
    artifactId: 'finvantage-saas',
  },
  {
    id: 'web',
    code: '04',
    label: 'Web & Apps',
    shortLabel: 'Web & Apps',
    title: 'Fast Next.js Websites, Web Apps & 360° Property Tours',
    categoryTag: 'CORE PLATFORM',
    metricBadge: 'Fast Mobile-First Loading',
    metric: 'Fast',
    metricLabel: 'Mobile Speed',
    description:
      'Custom Next.js and TypeScript websites, interactive 360° virtual tours, and mobile-first storefronts built with 1-tap UPI checkout.',
    summary:
      'Custom Next.js and TypeScript websites, interactive 360° virtual tours, and mobile-first storefronts built with 1-tap UPI checkout.',
    deliverables: ['Next.js & React Web Platforms', '1-Tap UPI & Checkout Flows', 'Fast Mobile-First Loading'],
    accentColor: 'indigo',
    psychColor: '#A1A1AA',
    psychName: 'Next.js & D2C Storefronts',
    psychMeaning: 'Fast Mobile Loading & Clean UI',
    orbitAngleDeg: 154,
    artifactId: '360-views',
  },
  {
    id: 'seo',
    code: '05',
    label: 'SEO & AEO',
    shortLabel: 'SEO & AEO',
    title: 'Google Search SEO & Local Business Visibility',
    categoryTag: 'ORGANIC SEARCH',
    metricBadge: 'Google Search Visibility',
    metric: 'SEO',
    metricLabel: 'Search Growth',
    description:
      'On-page search engine optimization, clean site structure, and structured business schema so customers find your business on Google Search.',
    summary:
      'On-page search engine optimization, clean site structure, and structured business schema so customers find your business on Google Search.',
    deliverables: ['Service & Category SEO Pages', 'Google Rich Search Schema', 'Clean Page Speed Optimization'],
    accentColor: 'emerald',
    psychColor: '#71717A',
    psychName: 'Google & Local SEO',
    psychMeaning: 'Organic Google Search Visibility',
    orbitAngleDeg: 205,
    artifactId: 'searchpulse-seo',
  },
  {
    id: 'crm',
    code: '06',
    label: 'CRM Funnels',
    shortLabel: 'CRM Funnels',
    title: 'WhatsApp Lead Alerts & Simple CRM Pipelines',
    categoryTag: 'LEAD PIPELINE',
    metricBadge: 'Direct WhatsApp Alerts',
    metric: 'Live',
    metricLabel: 'Lead Alerts',
    description:
      'Connected lead pipelines linking website forms, landing pages, and WhatsApp inquiries into a clean, easy-to-track lead dashboard.',
    summary:
      'Connected lead pipelines linking website forms, landing pages, and WhatsApp inquiries into a clean, easy-to-track lead dashboard.',
    deliverables: ['Official WhatsApp Business API', 'Automated Follow-Up Messages', 'Simple Lead Pipeline CRM'],
    accentColor: 'rose',
    psychColor: '#3F3F46',
    psychName: 'Unified Sales Pipelines',
    psychMeaning: 'Direct WhatsApp Lead Alerts & Tracking',
    orbitAngleDeg: 257,
    artifactId: 'nexaprop-crm',
  },
  {
    id: 'local',
    code: '07',
    label: 'Local Growth',
    shortLabel: 'Local Growth',
    title: 'Google Business Profile Optimization & Direct Review Links',
    categoryTag: 'LOCAL MAP PACK',
    metricBadge: 'Google Maps Growth',
    metric: '#Top',
    metricLabel: 'Map Visibility',
    description:
      'Google Business Profile (GBP) optimization and digital WhatsApp review links for clinics, showrooms, retail stores, and restaurants.',
    summary:
      'Google Business Profile (GBP) optimization and digital WhatsApp review links for clinics, showrooms, retail stores, and restaurants.',
    deliverables: ['Google Business Profile Setup', 'Digital WhatsApp Review Links', 'Local Call & Direction Ads'],
    accentColor: 'indigo',
    psychColor: '#27272A',
    psychName: 'Google Maps Growth',
    psychMeaning: 'Local Map Visibility & Walk-In Inquiries',
    orbitAngleDeg: 308,
    artifactId: 'auracare-local',
  },
];

export interface BentoSolutionCard {
  id: string;
  tag: string;
  title: string;
  metric: string;
  summary: string;
  deliverables: string[];
  spanClass: string;
  imageUrl: string;
  visualType:
    | 'web-architecture'
    | 'whatsapp-crm'
    | 'local-gbp'
    | 'roas-funnel'
    | 'seo-schema'
    | 'upi-catalog';
  artifactId: InteractiveArtifactId;
}

export const BENTO_SOLUTIONS: BentoSolutionCard[] = [
  {
    id: 'bento-web',
    tag: '01 • WEB & SAAS ENGINEERING',
    title: 'Custom Next.js Web Apps, Business Websites & 360° Tours',
    metric: 'Starts at ₹10,000',
    summary:
      'We build fast React, Next.js, and PostgreSQL business websites, interactive 360° property platforms (like 360views.services), and clean SaaS admin dashboards.',
    deliverables: ['Fast Mobile-First Loading', 'Clean Admin Dashboard', '100% Source Code Ownership'],
    spanClass: 'lg:col-span-7',
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=85',
    visualType: 'web-architecture',
    artifactId: '360-views',
  },
  {
    id: 'bento-whatsapp',
    tag: '02 • WHATSAPP AUTOMATION',
    title: 'WhatsApp Booking Bots & Instant Lead Alerts',
    metric: 'Direct WhatsApp Alerts',
    summary:
      'Our WhatsApp bot replies instantly to common customer inquiries, shares catalogs or brochures, collects lead details, helps schedule appointments, and hands over to your team when needed.',
    deliverables: ['Official WhatsApp Cloud API', 'Brochure & Slot Booking', 'Smooth Team Handover'],
    spanClass: 'lg:col-span-5',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85',
    visualType: 'whatsapp-crm',
    artifactId: 'nexaprop-crm',
  },
  {
    id: 'bento-local',
    tag: '03 • LOCAL MAPS VISIBILITY',
    title: 'Google Business Profile Optimization & Digital Review Links',
    metric: 'Local Map Pack SEO',
    summary:
      'Built for clinics, showrooms, salons, and retail stores. We optimize your Google Business Profile categories, keywords, photos, local citations, and provide a digital WhatsApp review link.',
    deliverables: ['Google Business Profile SEO', 'Digital WhatsApp Review Link', 'Local Call & Direction Ads'],
    spanClass: 'lg:col-span-4',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85',
    visualType: 'local-gbp',
    artifactId: 'auracare-local',
  },
  {
    id: 'bento-ads',
    tag: '04 • PAID DEMAND GENERATION',
    title: 'Targeted Instagram Reels & Google Search Ad Funnels',
    metric: 'Tracked Ad Funnels',
    summary:
      'Stop wasting budget on boosted posts that bring no inquiries. We build targeted Meta and Google Search ad funnels paired with fast, conversion-focused landing pages.',
    deliverables: ['Tracked Meta & Reels Ads', 'Google Search & Local Ads', 'Direct WhatsApp Lead Routing'],
    spanClass: 'lg:col-span-4',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85',
    visualType: 'roas-funnel',
    artifactId: 'aa-chocolates-d2c',
  },
  {
    id: 'bento-seo',
    tag: '05 • GOOGLE SEARCH SEO',
    title: 'On-Page SEO, Structured Schema & Local Landing Pages',
    metric: 'Organic Search Growth',
    summary:
      'Clean technical SEO, structured business schema, and service landing pages that help customers discover your business on Google Search.',
    deliverables: ['Rich Google Search Schema', 'Service & Location Pages', 'Fast Core Web Vitals'],
    spanClass: 'lg:col-span-4',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    visualType: 'seo-schema',
    artifactId: 'searchpulse-seo',
  },
  {
    id: 'bento-upi',
    tag: '06 • D2C COMMERCE & 1-TAP UPI',
    title: 'Custom D2C Storefronts with 1-Tap UPI & Order Notifications',
    metric: '1-Tap UPI Checkout',
    summary:
      'Sell directly to customers online with custom product catalogs, gift box builders, 1-Tap GPay/PhonePe/Paytm checkout, and automated WhatsApp order confirmations.',
    deliverables: ['Interactive Product Catalog', '1-Tap UPI Checkout', 'Clean Order & GST Dashboard'],
    spanClass: 'lg:col-span-12',
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=1200&q=85',
    visualType: 'upi-catalog',
    artifactId: 'aa-chocolates-d2c',
  },
];

export interface PitchSlide {
  step: string;
  tag: string;
  headline: string;
  subheadline: string;
  comparisonLeft: {
    label: string;
    points: string[];
  };
  comparisonRight: {
    label: string;
    points: string[];
  };
  proofStat: string;
  proofLabel: string;
  accentColor: SemanticAccentColor;
}

export const PITCH_SLIDES: PitchSlide[] = [
  {
    step: '01 / THE BOTTLENECK',
    tag: 'WHY MOST WEBSITES UNDERPERFORM',
    headline: 'A Slow Brochure Site Does Not Bring Daily Customer Inquiries.',
    subheadline:
      'Many businesses get stuck with slow templates or disconnected social posts, leaving their team chasing leads manually on spreadsheets.',
    comparisonLeft: {
      label: 'Typical Outdated Setup',
      points: [
        'Slow, heavy templates that lose mobile visitors before the page loads',
        'Disconnected ad spend without proper landing pages or lead tracking',
        'Manual follow-ups where customer inquiries wait hours for a reply',
      ],
    },
    comparisonRight: {
      label: 'SkyLine Practical Growth System',
      points: [
        'Fast mobile-first Next.js websites built for clear customer action',
        'Focused Meta and Google Search campaigns linked to clean landing pages',
        'WhatsApp automation that shares brochures and books slots promptly',
      ],
    },
    proofStat: '₹10k+',
    proofLabel: 'Starter Websites & Digital Setups Begin at ₹10,000 (Flexible & Negotiable)',
    accentColor: 'rose',
  },
  {
    step: '02 / THE UNIFIED STACK',
    tag: 'PRACTICAL DIGITAL SYSTEMS',
    headline: 'One Engineering Team for Websites, WhatsApp Bots & Local Search.',
    subheadline:
      'Whether you run a clinic, retail brand, showroom, or growing startup, we connect your website, Google Maps presence, and WhatsApp lead flow.',
    comparisonLeft: {
      label: 'For Clinics, Showrooms & Retail',
      points: [
        'Google Business Profile optimization to rank better on local searches',
        'WhatsApp appointment booking, catalog sharing, and digital review links',
        'Targeted local Instagram and Google Search ads for store inquiries',
      ],
    },
    comparisonRight: {
      label: 'For E-Commerce, Real Estate & Startups',
      points: [
        'Custom web apps, admin dashboards, and 1-tap UPI checkout storefronts',
        'WhatsApp bots that collect customer requirements and schedule calls',
        'Clean technical SEO and structured schema for long-term search visibility',
      ],
    },
    proofStat: 'Fast',
    proofLabel: 'Mobile-First Loading Experience Across All Client Websites',
    accentColor: 'indigo',
  },
  {
    step: '03 / THE COMMITMENT',
    tag: 'TRANSPARENT EXECUTION',
    headline: 'Delivered in 2 to 4 Weeks. 100% Source Code Ownership. Honest Pricing.',
    subheadline:
      'You work directly with our engineers—no bloated agency retainers, flexible milestone budgets, and complete ownership of your code and accounts.',
    comparisonLeft: {
      label: 'What We Avoid',
      points: [
        'No forced long-term lock-in contracts or hidden monthly fees',
        'No bloated templates that break on mobile screens',
        'No confusing technical jargon—clear milestones and practical advice',
      ],
    },
    comparisonRight: {
      label: 'What You Get From Day 1',
      points: [
        'Clear project roadmap and flexible pricing tailored to your budget',
        'Full GitHub repository, custom domain, and hosting ownership',
        '30-day free post-launch support window for bug fixes and onboarding',
      ],
    },
    proofStat: '15%',
    proofLabel: 'Partner Referral Commission Paid on Every Successful Client Introduction',
    accentColor: 'emerald',
  },
];

export interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  categoryTag?: string;
  clientType?: string;
  leadArchitect?: string;
  locationTag: string;
  metricsHeadline: string;
  metricsSub: string;
  accentColor: SemanticAccentColor;
  accentMetric: string;
  impactMetric?: string;
  secondaryMetric?: string;
  problemStatement: string;
  challenge?: string;
  architectureSummary: string;
  solution?: string;
  summary?: string;
  results?: string[];
  tags: string;
  techStack?: string[];
  stackPills?: string[];
  imageUrl: string;
  liveLatency?: string;
  roasOrLift?: string;
  artifactId?: InteractiveArtifactId;
  liveSiteUrl?: string;
  statusBadge?: string;
  architectureNodes?: string[];
  fallbackSvgUrl?: string;
  impactMetrics?: { label: string; before: string; after: string; delta: string }[];
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'proj-360-views',
    title: '360 Views — Real Estate & Commercial Spatial Tour Platform',
    category: 'Spatial Web & PropTech',
    categoryTag: 'Spatial Web & PropTech',
    leadArchitect: 'Sachin Sahu',
    clientType: 'Sachin Sahu • Founder & CEO • 360views.services',
    locationTag: 'Live Production • 360views.services',
    metricsHeadline: 'Live 360° Property Tours',
    metricsSub: 'Interactive 360° Property Showroom & Direct WhatsApp Site-Visit Booking',
    accentColor: 'indigo',
    accentMetric: 'Live on 360views.services',
    impactMetric: 'Live on 360views.services',
    secondaryMetric: '360views.services',
    problemStatement:
      'Real estate developers, luxury villas, and commercial showrooms needed a fast, interactive web platform to showcase 360° virtual tours and capture site-visit bookings on mobile.',
    architectureSummary:
      'Engineered by Sachin Sahu (Founder & CEO) at 360views.services with interactive room hotspots, mobile-first viewport controls, property listings, and direct WhatsApp inquiry dispatch.',
    results: [
      'Interactive 360° room tour switcher with property pricing and specs',
      'Fast mobile-first loading across 4G/5G networks without heavy plugins',
      'Direct 1-Tap WhatsApp site-visit scheduling from inside property listings',
    ],
    tags: 'Next.js • 360° Spatial UI • WhatsApp Booking',
    techStack: ['Next.js', '360° Spatial UI', 'WhatsApp Booking'],
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=85',
    liveLatency: 'Fast Mobile Load',
    roasOrLift: 'Live 360° Tours',
    artifactId: '360-views',
    liveSiteUrl: 'https://360views.services',
  },
  {
    id: 'proj-shadowbase-cdc',
    title: 'ShadowBase — Safe SQL Schema Migration & CDC Testing Studio',
    category: 'Backend & Database Engineering',
    categoryTag: 'Backend & Database Engineering',
    leadArchitect: 'Sachin Sahu',
    clientType: 'Sachin Sahu • Founder & CEO',
    locationTag: 'Java 21 • Spring Boot • Debezium CDC • Kafka',
    metricsHeadline: 'Safe Schema Migration Studio',
    metricsSub: 'PostgreSQL Change Data Capture & Isolated Docker Testcontainers Verification',
    accentColor: 'violet',
    accentMetric: 'Safe SQL Cutover',
    impactMetric: 'Safe SQL Cutover',
    secondaryMetric: 'Docker Verified',
    problemStatement:
      'Running database schema migrations directly on active PostgreSQL tables can cause unexpected query slowdowns or broken application queries if not tested against realistic data first.',
    architectureSummary:
      'Engineered by Sachin Sahu using Spring Boot, Debezium CDC, Apache Kafka, and Docker Testcontainers to test SQL schema changes against isolated shadow database clones before deployment.',
    results: [
      'Side-by-side SQL migration runner with primary vs. shadow query comparison',
      'Automated row checksum verification before applying production changes',
      'Isolated Docker Testcontainers sandbox for safe schema validation',
    ],
    tags: 'Java 21 & Spring Boot • Debezium CDC & Kafka • Docker Testcontainers',
    techStack: ['Java 21 & Spring Boot', 'Debezium CDC & Kafka', 'Docker Testcontainers'],
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85',
    liveLatency: 'Safe SQL Testing',
    roasOrLift: 'Safe SQL Cutover',
    artifactId: 'shadowbase-cdc',
  },
  {
    id: 'proj-gridweaver-iot',
    title: 'GridWeaver — Smart Solar & IoT Microgrid Control Dashboard',
    category: 'IoT Telemetry & GIS Dashboard',
    categoryTag: 'IoT Telemetry & GIS Dashboard',
    leadArchitect: 'Sachin Sahu',
    clientType: 'Sachin Sahu • Founder & CEO',
    locationTag: 'Java 21 Virtual Threads • Kafka • PostGIS',
    metricsHeadline: 'Live Solar & Grid Telemetry',
    metricsSub: 'Interactive Solar Microgrid State Control & Live GIS Map Dashboard',
    accentColor: 'cyan',
    accentMetric: 'Live GIS Control',
    impactMetric: 'Live GIS Control',
    secondaryMetric: 'Real-Time GIS Map',
    problemStatement:
      'Solar and battery substation operators needed a unified web dashboard to monitor node states (Charging, Discharging, Idle, Fault) and inspect live power output in real time.',
    architectureSummary:
      'Engineered by Sachin Sahu with Java 21 Virtual Threads (Project Loom), Apache Kafka streams, and Leaflet GIS mapping for interactive solar microgrid monitoring.',
    results: [
      'Interactive node state controls across Charging, Discharging, Idle, and Fault modes',
      'Live kW generation, battery storage percentage, and substation health alerts',
      'Clean spatial map view for regional solar and battery nodes',
    ],
    tags: 'Java 21 Loom • Apache Kafka • Leaflet GIS',
    techStack: ['Java 21 Loom', 'Apache Kafka', 'Leaflet GIS'],
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85',
    liveLatency: 'Live Telemetry',
    roasOrLift: 'Live GIS Control',
    artifactId: 'gridweaver-iot',
  },
  {
    id: 'proj-fileguard-ai',
    title: 'FileGuard AI — SHA-256 & Blockchain Document Integrity Verifier',
    category: 'Cryptographic Security & Web App',
    categoryTag: 'Cryptographic Security & Web App',
    leadArchitect: 'Aashif Khan',
    clientType: 'Aashif Khan • Co-Founder & System Architect',
    locationTag: 'SHA-256 • OriginStamp Blockchain • Node.js',
    metricsHeadline: 'Tamper-Evident Document Proof',
    metricsSub: 'Real-Time Cryptographic Hashing & Blockchain Timestamp Verification',
    accentColor: 'emerald',
    accentMetric: 'SHA-256 Verified',
    impactMetric: 'SHA-256 Verified',
    secondaryMetric: 'SHA-256 + Blockchain',
    problemStatement:
      'Important agreements, property records, and GST invoices shared digitally needed a quick, verifiable way to confirm that not a single character was altered after signing.',
    architectureSummary:
      'Engineered by Aashif Khan (Cisco Certified in Cybersecurity) combining browser/server SHA-256 hash verification with OriginStamp blockchain timestamping.',
    results: [
      'Instant SHA-256 hash computation with single-character tamper detection',
      'Downloadable verification certificates with blockchain anchor timestamps',
      'Privacy-first verification without uploading sensitive file contents publicly',
    ],
    tags: 'SHA-256 Hashing • OriginStamp Blockchain • Node.js & React',
    techStack: ['SHA-256 Hashing', 'OriginStamp Blockchain', 'Node.js & React'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85',
    liveLatency: 'Instant Verify',
    roasOrLift: 'SHA-256 Verified',
    artifactId: 'fileguard-security',
  },
  {
    id: 'proj-ai-career-mentor',
    title: 'AI Career Guide & Mentor — Personalized Roadmap & Viva Portal',
    category: 'AI EdTech Web Application',
    categoryTag: 'AI EdTech Web Application',
    leadArchitect: 'Aashif Khan',
    clientType: 'Aashif Khan • Co-Founder & System Architect',
    locationTag: 'Python AI • React • TypeScript',
    metricsHeadline: '90-Day Engineering Roadmaps',
    metricsSub: 'Personalized Learning Tracks, Skill Gap Radar & Mock Technical Viva Practice',
    accentColor: 'amber',
    accentMetric: '90-Day Roadmaps',
    impactMetric: '90-Day Roadmaps',
    secondaryMetric: 'Skill Gap Analyzer',
    problemStatement:
      'Engineering and computer science students needed structured, role-specific learning plans and mock interview practice instead of scattered video playlists.',
    architectureSummary:
      'Engineered by Aashif Khan with Python AI workflows, TypeScript, and React to generate week-by-week study roadmaps, skill-gap diagnostics, and interactive viva questions.',
    results: [
      'Custom 90-day learning tracks for Full-Stack, AI, Java Backend, and Cybersecurity',
      'Interactive skill progress tracker and weekly capstone checklist',
      'Built-in technical interview and college project viva practice module',
    ],
    tags: 'Python AI • React • TypeScript',
    techStack: ['Python AI', 'React', 'TypeScript'],
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    liveLatency: 'Custom Roadmap',
    roasOrLift: '90-Day Roadmaps',
    artifactId: 'ai-career-mentor',
  },
  {
    id: 'proj-socialite-network',
    title: 'Socialite — Creator Community & Interactive Feed Platform',
    category: 'Full-Stack Social Web App',
    categoryTag: 'Full-Stack Social Web App',
    leadArchitect: 'Aashif Khan',
    clientType: 'Aashif Khan • Co-Founder & System Architect',
    locationTag: 'Next.js • Node.js • WebSockets • PostgreSQL',
    metricsHeadline: 'Live Creator Community Feed',
    metricsSub: 'Interactive Post Publishing, Topic Channels & Creator Analytics Studio',
    accentColor: 'rose',
    accentMetric: 'Live Feed Studio',
    impactMetric: 'Live Feed Studio',
    secondaryMetric: 'Topic Channels',
    problemStatement:
      'Student and creator groups wanted a clean, distraction-free community web app with topic channels, live post interactions, and creator analytics.',
    architectureSummary:
      'Engineered by Aashif Khan using Next.js, Node.js, PostgreSQL, and WebSockets with instant like/comment updates, channel filtering, and a creator dashboard.',
    results: [
      'Smooth live updates on posts, likes, and community replies without page reloads',
      'Organized topic channels for Developers, AI Builders, and Product Designers',
      'Clean creator analytics view with post reach and engagement metrics',
    ],
    tags: 'Next.js • WebSockets • PostgreSQL',
    techStack: ['Next.js', 'WebSockets', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
    liveLatency: 'Live Feed',
    roasOrLift: 'Live Feed Studio',
    artifactId: 'socialite-network',
  },
  {
    id: 'proj-aa-chocolates-d2c',
    title: 'A&A Chocolates — Handcrafted D2C Online Store & Gift Box Builder',
    category: 'D2C E-Commerce & 1-Tap UPI',
    categoryTag: 'D2C E-Commerce & 1-Tap UPI',
    leadArchitect: 'Aashif Khan',
    clientType: 'Aashif Khan • Co-Founder & System Architect',
    locationTag: 'Indore • Pan-India D2C Delivery',
    metricsHeadline: 'Custom Gift Box + 1-Tap UPI',
    metricsSub: 'Artisanal Chocolate E-Commerce Storefront with Live Cart & WhatsApp Orders',
    accentColor: 'amber',
    accentMetric: '1-Tap UPI Checkout',
    impactMetric: '1-Tap UPI Checkout',
    secondaryMetric: 'Custom Box Builder',
    problemStatement:
      'Artisanal homemade chocolate buyers were dropping off during manual DM ordering, and the brand needed a clean online catalog with custom gift box selection and UPI checkout.',
    architectureSummary:
      'Engineered by Aashif Khan featuring a visual product catalog (Belgian Dark Box, Roasted Hazelnut Hamper, Custom Gift Box), live ₹ INR cart drawer, 1-Tap UPI checkout, and WhatsApp order alerts.',
    results: [
      'Visual D2C storefront with instant Add-to-Cart and custom gift hamper options',
      'Smooth mobile checkout experience supporting GPay, PhonePe, and Paytm UPI',
      'Direct WhatsApp order confirmation and festive gift inquiry support',
    ],
    tags: 'D2C Storefront • 1-Tap UPI • WhatsApp Order Bot',
    techStack: ['D2C Storefront', '1-Tap UPI', 'WhatsApp Order Bot'],
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=1200&q=85',
    liveLatency: '1-Tap UPI',
    roasOrLift: '1-Tap UPI Checkout',
    artifactId: 'aa-chocolates-d2c',
  },
  {
    id: 'proj-finvantage-saas',
    title: 'FinVantage — Modern GST Billing & Business Dashboard SaaS',
    category: 'SaaS & Business Dashboard',
    categoryTag: 'SaaS & Business Dashboard',
    leadArchitect: 'Sachin Sahu & Aashif Khan',
    clientType: 'Sachin Sahu & Aashif Khan • Founding Architects',
    locationTag: 'Cloud SaaS • GST Invoicing Portal',
    metricsHeadline: 'Clean GST Invoicing & Ledger',
    metricsSub: 'Multi-Branch GST Invoice Generator, Client Balances & Payment Tracking',
    accentColor: 'cyan',
    accentMetric: 'Automated GST Billing',
    impactMetric: 'Automated GST Billing',
    secondaryMetric: 'Clean Admin Portal',
    problemStatement:
      'Growing businesses and distributors were managing 18% GST invoices, pending client payments, and monthly revenue reports manually across scattered spreadsheets.',
    architectureSummary:
      'Built a clean React and PostgreSQL business dashboard with left sidebar navigation, KPI cards, interactive GST invoice creation, and WhatsApp payment reminders.',
    results: [
      'Automated 18% CGST/SGST/IGST calculation and PDF invoice generation',
      'Clear dashboard showing monthly revenue, paid invoices, and pending dues',
      'Role-based access for business owners, accountants, and branch managers',
    ],
    tags: 'React • PostgreSQL • GST Billing Portal',
    techStack: ['React', 'PostgreSQL', 'GST Billing Portal'],
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85',
    liveLatency: 'Clean Dashboard',
    roasOrLift: 'Automated GST Billing',
    artifactId: 'finvantage-saas',
  },
  {
    id: 'proj-auracare-local',
    title: 'AuraCare Multispecialty Clinic — Patient Booking & Google Maps Growth',
    category: 'Clinic Website & Local SEO',
    categoryTag: 'Clinic Website & Local SEO',
    leadArchitect: 'Sachin Sahu & Aashif Khan',
    clientType: 'Sachin Sahu & Aashif Khan • Founding Architects',
    locationTag: 'Indore, MP • Healthcare & Dental Clinic',
    metricsHeadline: 'Online Slot Picker & Maps SEO',
    metricsSub: 'Modern Clinic Website + WhatsApp Appointment Bot & Google Business Optimization',
    accentColor: 'emerald',
    accentMetric: 'Direct Slot Booking',
    impactMetric: 'Direct Slot Booking',
    secondaryMetric: 'Google Maps SEO',
    problemStatement:
      'Patients searching online for dental and healthcare consultations wanted to see clear treatment pricing, available doctor time slots, and easy Google Maps directions on mobile.',
    architectureSummary:
      'Designed a modern clinic website with interactive doctor time-slot booking, transparent treatment cards, Google Business Profile optimization, and digital WhatsApp review links.',
    results: [
      'Interactive appointment slot picker (Morning & Evening clinic hours) with WhatsApp confirmation',
      'Optimized Google Business Profile categories, photos, and local search citations',
      'Digital WhatsApp direct review link so happy patients can easily leave Google reviews',
    ],
    tags: 'Clinic Website UI • WhatsApp Slot Bot • Google Business SEO',
    techStack: ['Clinic Website UI', 'WhatsApp Slot Bot', 'Google Business SEO'],
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85',
    liveLatency: 'Easy Slot Booking',
    roasOrLift: 'Direct Slot Booking',
    artifactId: 'auracare-local',
  },
];

export interface CapabilityPillar {
  id: string;
  code?: string;
  shortTab: string;
  categoryLabel: string;
  badgeTag?: string;
  leadSentence?: string;
  title: string;
  subtitle: string;
  description?: string;
  architectureNote?: string;
  imageUrl?: string;
  metrics?: { label: string; value: string; delta: string }[];
  accentColor: SemanticAccentColor;
  outcomeMetric: string;
  timeline: string;
  deliverables: (string | { name: string; spec: string; impact: string })[];
  techStack?: string[];
  architectureSpecs?: { key: string; val: string }[];
  previewMode?: string;
  architectureDiagram?: {
    inputNode: string;
    processingNode: string;
    outputNode: string;
  };
  artifactId?: InteractiveArtifactId;
}

export const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    id: 'cap-local',
    code: '01',
    shortTab: 'Local Business Growth',
    categoryLabel: 'FOR CLINICS, SHOWROOMS, RETAIL & RESTAURANTS',
    title: 'Google Business Profile Optimization & Local Walk-In Systems',
    subtitle:
      'Turn local searches and social visitors into walk-ins and phone inquiries with a fast business website, WhatsApp appointment booking, and digital Google review links.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'indigo',
    outcomeMetric: 'Local Search & Walk-In Growth',
    timeline: '1 to 3 Weeks Delivery',
    deliverables: [
      'Google Business Profile (GBP) Categories, Keywords & Photo Optimization',
      'Automated WhatsApp Appointment, Table, or Catalog Inquiry Bot',
      'Digital WhatsApp & Direct Google Review Link for Happy Customers',
      'Targeted Local Meta Reels & Google Call Ad Campaigns',
    ],
    techStack: ['Google Business Profile SEO', 'WhatsApp Cloud API', 'Direct Review Links'],
    architectureDiagram: {
      inputNode: 'Google Maps Search / Local Ad',
      processingNode: 'Clinic/Store Website & WhatsApp Booking',
      outputNode: 'Confirmed Appointment & Customer Review',
    },
    artifactId: 'auracare-local',
  },
  {
    id: 'cap-web',
    code: '02',
    shortTab: 'Web & App Engineering',
    categoryLabel: 'CUSTOM FULL-STACK PLATFORMS',
    title: 'Fast Next.js Websites, Web Apps & E-Commerce Storefronts',
    subtitle:
      'We build custom React, Next.js, and TypeScript websites and web apps engineered for fast mobile-first loading, 360° interactive tours, and 1-tap UPI checkout.',
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'cyan',
    outcomeMetric: 'Fast Mobile-First Loading',
    timeline: '2 to 4 Weeks Delivery',
    deliverables: [
      'Custom Next.js / React Frontend with Clean Modern UI/UX',
      'D2C Product Catalog & Checkout with Razorpay / 1-Tap UPI',
      'Interactive 360° Virtual Tour & Property Showcase Experiences',
      'Clean Admin Dashboard, Mobile Optimization & SSL Security',
    ],
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    architectureDiagram: {
      inputNode: 'Customer Mobile Visit',
      processingNode: 'Interactive Website & 1-Tap UPI Flow',
      outputNode: 'Confirmed Order / Direct Lead Alert',
    },
    artifactId: '360-views',
  },
  {
    id: 'cap-ai',
    code: '03',
    shortTab: 'WhatsApp AI & Bots',
    categoryLabel: 'AUTOMATED CUSTOMER CONVERSATIONS',
    title: 'WhatsApp Booking Bots, Brochure Dispatch & Lead Capture',
    subtitle:
      'Our WhatsApp bot replies promptly to common customer questions, sends PDF brochures or price lists, collects basic lead details, and hands over the chat to your team when needed.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'violet',
    outcomeMetric: 'Instant WhatsApp Lead Reply',
    timeline: '1 to 3 Weeks Delivery',
    deliverables: [
      'Official WhatsApp Business Cloud API Conversational Bot',
      'Automated FAQ Replies, Brochure PDF Sharing & Lead Collection',
      'Smooth Live Chat Handover to Your Human Sales or Reception Team',
      'Direct Lead Sync to Google Sheets or Custom Admin Dashboard',
    ],
    techStack: ['WhatsApp Cloud API', 'Node.js Webhooks', 'CRM Lead Sync'],
    architectureDiagram: {
      inputNode: 'Website Inquiry / WhatsApp Message',
      processingNode: 'Automated Brochure & Slot Qualifier',
      outputNode: 'Scheduled Visit & Team Notification',
    },
    artifactId: 'nexaprop-crm',
  },
  {
    id: 'cap-ads',
    code: '04',
    shortTab: 'Performance Ads',
    categoryLabel: 'META REELS & GOOGLE SEARCH ADS',
    title: 'Targeted Meta & Google Ad Funnels Paired with Landing Pages',
    subtitle:
      'Stop burning budget on unattributed clicks. We pair focused ad creatives with conversion tracking and dedicated landing pages built to capture real inquiries.',
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'amber',
    outcomeMetric: 'Tracked Lead & Order Funnels',
    timeline: '1 to 2 Weeks Launch',
    deliverables: [
      'Meta Conversions API & Google Ads Conversion Tracking',
      'High-Intent Google Search, Shopping & Local Call Campaigns',
      'Instagram & Facebook Reels Ad Funnels for Local & D2C Brands',
      'Dedicated Fast-Loading Offer Landing Pages with WhatsApp CTAs',
    ],
    techStack: ['Meta Ads Tracking', 'Google Ads', 'Conversion Landing Pages'],
    architectureDiagram: {
      inputNode: 'Targeted Instagram Reel / Google Search',
      processingNode: 'Dedicated Fast Offer Landing Page',
      outputNode: 'Customer Order / WhatsApp Inquiry',
    },
    artifactId: 'aa-chocolates-d2c',
  },
  {
    id: 'cap-seo',
    code: '05',
    shortTab: 'SEO & Search',
    categoryLabel: 'ORGANIC GOOGLE VISIBILITY',
    title: 'On-Page Google SEO, Local Citations & Structured Schema',
    subtitle:
      'Help customers find your business organically on Google Search and Maps with clean site structure, service pages, and structured LocalBusiness schema.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'emerald',
    outcomeMetric: 'Compounding Search Visibility',
    timeline: '2 to 4 Weeks Setup',
    deliverables: [
      'Complete On-Page SEO Audit, Meta Tags & Indexing Setup',
      'Structured Google Schema (LocalBusiness, Product, FAQ, Service)',
      'Dedicated Service & Location Pages for High-Intent Searches',
      'Mobile Page Speed & Core Web Vitals Optimization',
    ],
    techStack: ['Google Rich Schema', 'Next.js SEO', 'Google Search Console'],
    architectureDiagram: {
      inputNode: 'High-Intent Google Search',
      processingNode: 'Structured Schema & Service Page',
      outputNode: 'Organic Website Visit & Inquiry',
    },
    artifactId: 'searchpulse-seo',
  },
  {
    id: 'cap-saas',
    code: '06',
    shortTab: 'SaaS & Custom Portals',
    categoryLabel: 'CUSTOM SOFTWARE & DASHBOARDS',
    title: 'Custom SaaS Web Apps, GST Billing Portals & Backend APIs',
    subtitle:
      'From starter MVPs to full business portals: we build secure multi-user web applications, GST billing/inventory dashboards, and clean backend APIs.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'rose',
    outcomeMetric: 'Clean Admin & Billing Portals',
    timeline: '3 to 6 Weeks Delivery',
    deliverables: [
      'PostgreSQL Database Schema with Role-Based Access Control',
      'Clean Admin Dashboards, Invoice Generators & Exportable Reports',
      'Reliable REST APIs built with Node.js, TypeScript, or Java Spring Boot',
      '100% Source Code Ownership & Cloud Deployment',
    ],
    techStack: ['React & TypeScript', 'Node.js / Spring Boot', 'PostgreSQL'],
    architectureDiagram: {
      inputNode: 'Business Team / Customer Action',
      processingNode: 'Secure Role-Based Web Application',
      outputNode: 'Automated Invoice & Live Dashboard',
    },
    artifactId: 'finvantage-saas',
  },
  {
    id: 'cap-crm',
    code: '07',
    shortTab: 'CRM & Lead Alerts',
    categoryLabel: 'SIMPLE LEAD MANAGEMENT',
    title: 'Website-to-WhatsApp Lead Routing & Simple CRM Tracking',
    subtitle:
      'Connect your website inquiry forms, landing pages, and WhatsApp bot into one clean lead dashboard with instant WhatsApp notifications to your phone.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'indigo',
    outcomeMetric: 'Direct WhatsApp Lead Alerts',
    timeline: '1 to 2 Weeks Delivery',
    deliverables: [
      'Instant WhatsApp & Email Lead Notifications on New Website Inquiries',
      'Simple Admin Lead Table with Status Tracking (New, Contacted, Closed)',
      'One-Click WhatsApp Follow-Up Templates for Your Sales Team',
      'Easy CSV / Google Sheets Export for All Captured Leads',
    ],
    techStack: ['Node.js Webhooks', 'PostgreSQL / Sheets', 'WhatsApp Alerts'],
    architectureDiagram: {
      inputNode: 'Website Form / Ad Inquiry',
      processingNode: 'Automated Lead Router & Alert',
      outputNode: 'Direct WhatsApp Alert to Your Team',
    },
    artifactId: 'nexaprop-crm',
  },
];

export interface RoadmapStep {
  phase: string;
  days: string;
  duration: string;
  title: string;
  summary: string;
  description: string;
  verificationGate: string;
  deliverables: string[];
  accentColor: SemanticAccentColor;
}

export const EXECUTION_ROADMAP: RoadmapStep[] = [
  {
    phase: 'Step 1',
    days: 'DAYS 01 TO 02',
    duration: 'Days 01 to 02',
    title: 'Requirement Call & Practical Scope Lock',
    summary:
      'We discuss your business goals, required pages or features, and budget range on a quick call or WhatsApp chat, then lock a clear milestone plan.',
    description:
      'We discuss your business goals, required pages or features, and budget range on a quick call or WhatsApp chat, then lock a clear milestone plan.',
    verificationGate: 'Gate 01: Clear Feature List, Timeline & Flexible Budget Agreed',
    deliverables: [
      'Requirement & Competitor Review',
      'Page Structure, Feature List & Wireframe Plan',
      'Transparent Milestone Schedule (Starts at ₹10,000 for Starter Sites)',
    ],
    accentColor: 'indigo',
  },
  {
    phase: 'Step 2',
    days: 'DAYS 03 TO 05',
    duration: 'Days 03 to 05',
    title: 'Interactive UI/UX & Live Design Preview',
    summary:
      'Before finalizing backend logic, we share a live interactive web preview on mobile and desktop so you can review the look, copy, and user flow.',
    description:
      'Before finalizing backend logic, we share a live interactive web preview on mobile and desktop so you can review the look, copy, and user flow.',
    verificationGate: 'Gate 02: UI/UX Design Preview Approved on Mobile & Desktop',
    deliverables: [
      'Clean Mobile-First Website / App UI Design',
      'Clickable Preview Link for Your Feedback',
      'Clear Service Copywriting & Call-to-Action Layout',
    ],
    accentColor: 'cyan',
  },
  {
    phase: 'Step 3',
    days: 'DAYS 06 TO 12',
    duration: 'Days 06 to 12',
    title: 'Frontend & Backend Development Sprint',
    summary:
      'Our engineers build your Next.js / React frontend, admin dashboard, and Node.js / Spring Boot / PostgreSQL backend with clean, maintainable code.',
    description:
      'Our engineers build your Next.js / React frontend, admin dashboard, and Node.js / Spring Boot / PostgreSQL backend with clean, maintainable code.',
    verificationGate: 'Gate 03: Fast Mobile Loading & Staging Link Ready',
    deliverables: [
      'Responsive Next.js & TypeScript Frontend',
      'Secure Backend APIs & Admin Dashboard',
      'Database Setup with Clean Data Validation',
    ],
    accentColor: 'emerald',
  },
  {
    phase: 'Step 4',
    days: 'DAYS 13 TO 16',
    duration: 'Days 13 to 16',
    title: 'WhatsApp Bot, Forms & Payment Integration',
    summary:
      'We connect your inquiry forms, WhatsApp booking/brochure bot, Google Maps links, and Razorpay/UPI payment flows.',
    description:
      'We connect your inquiry forms, WhatsApp booking/brochure bot, Google Maps links, and Razorpay/UPI payment flows.',
    verificationGate: 'Gate 04: End-to-End WhatsApp Alerts & Checkout Tested',
    deliverables: [
      'WhatsApp Inquiry & Appointment Booking Flow',
      '1-Tap UPI / Razorpay Checkout Integration (If E-Commerce)',
      'Direct Lead Notifications to Your Phone & Email',
    ],
    accentColor: 'violet',
  },
  {
    phase: 'Step 5',
    days: 'DAYS 17 TO 19',
    duration: 'Days 17 to 19',
    title: 'Mobile Testing, SEO Setup & Security Check',
    summary:
      'We test every form, button, and page across Android, iOS, and desktop browsers, configure Google SEO meta tags, and verify security headers.',
    description:
      'We test every form, button, and page across Android, iOS, and desktop browsers, configure Google SEO meta tags, and verify security headers.',
    verificationGate: 'Gate 05: Mobile Responsiveness, Speed & SEO Verified',
    deliverables: [
      'Mobile & Cross-Browser Quality Check',
      'Google Search Console, Sitemap & Local Schema Setup',
      'SSL, Input Validation & Spam Protection',
    ],
    accentColor: 'amber',
  },
  {
    phase: 'Step 6',
    days: 'DAY 20 & ONGOING',
    duration: 'Day 20 & Ongoing',
    title: 'Custom Domain Launch, Code Handover & 30-Day Support',
    summary:
      'We launch on your custom domain, hand over 100% source code and account access, and provide a 30-day free support window for smooth onboarding.',
    description:
      'We launch on your custom domain, hand over 100% source code and account access, and provide a 30-day free support window for smooth onboarding.',
    verificationGate: 'Gate 06: 100% Source Code Handover + 30-Day Free Support Active',
    deliverables: [
      '100% GitHub Repository, Domain & Hosting Ownership',
      'Google Business Profile & Digital Review Link Setup',
      '30-Day Free Post-Launch Support & Easy Future Upgrades',
    ],
    accentColor: 'rose',
  },
];

export interface FounderProject {
  name: string;
  subtitle: string;
  tag: string;
  highlightMetric: string;
  summary: string;
  stack: string;
  imageUrl: string;
  highlights: string[];
  accentColor: SemanticAccentColor;
  artifactId: InteractiveArtifactId;
  liveSiteUrl?: string;
}

export interface FounderExperience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface FounderProfile {
  id: string;
  name: string;
  role: string;
  headline: string;
  titleBadge: string;
  location: string;
  phone: string;
  whatsappNumber: string;
  callNumber?: string;
  contactMode: 'whatsapp-and-call' | 'whatsapp-only';
  email: string;
  avatarMonogram: string;
  studioImageUrl: string;
  accentColor: SemanticAccentColor;
  bio: string;
  summary: string;
  education: string;
  institution: string;
  languages: string[];
  frameworksAndTools: string[];
  coreConcepts: string[];
  coreSpecialties: string[];
  credentials: string[];
  certifications: string[];
  experience: FounderExperience[];
  projects: FounderProject[];
}

export const FOUNDER_PROFILES: FounderProfile[] = [
  {
    id: 'sachin-sahu',
    name: 'Sachin Sahu',
    role: 'Founder & CEO',
    headline: 'Principal Backend & Distributed Systems Architect',
    titleBadge: 'FOUNDER & CEO • DISTRIBUTED BACKEND ARCHITECT',
    location: 'Indore, MP, India',
    phone: '+91 89591 44686',
    whatsappNumber: '918959144686',
    contactMode: 'whatsapp-only',
    email: 'Sachinsahuji06@gmail.com',
    avatarMonogram: 'SS',
    studioImageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'emerald',
    bio: 'Leads SkyLine Digital Agency as Founder & CEO, architecting Java 21 & Spring Boot backend systems, safe CDC database migration workflows, and interactive 360° spatial web platforms.',
    summary:
      'Leads SkyLine Digital Agency as Founder & CEO, architecting Java 21 & Spring Boot backend systems, safe CDC database migration workflows, and interactive 360° spatial web platforms.',
    education: 'B.Tech in Computer Science & Distributed Systems Engineering',
    institution: 'Indore, Madhya Pradesh, India',
    languages: ['Core Java', 'Java 21 Virtual Threads (Loom)', 'Kotlin', 'SQL'],
    frameworksAndTools: [
      'Spring Boot',
      'Microservices',
      'Hibernate/JPA',
      'Apache Kafka',
      'Debezium (CDC)',
      'PostgreSQL',
      'MySQL',
      'Testcontainers',
      'Docker',
      'Jetpack Compose',
    ],
    coreConcepts: ['JWT & OAuth 2.0', 'REST APIs', 'Safe Schema Migrations', 'Virtual Thread Concurrency'],
    coreSpecialties: [
      'Java 21 Virtual Threads (Loom) & Spring Boot Microservices',
      'Apache Kafka, Debezium (CDC) & Safe Database Schema Migrations',
      'PostgreSQL, MySQL, Hibernate/JPA & Docker Testcontainers QA',
      'Live Production Spatial Web Platforms (360views.services)',
    ],
    credentials: [
      'Java 21 & Spring Boot Backend Systems Architect',
      'Creator of 360views.services, ShadowBase CDC & GridWeaver IoT',
      'Database Schema Migration & Distributed Systems Engineer',
    ],
    certifications: [
      'Java 21 & Spring Boot Backend Systems Architect',
      'Creator of 360views.services, ShadowBase CDC & GridWeaver IoT',
      'Database Schema Migration & Distributed Systems Engineer',
    ],
    experience: [
      {
        role: 'Founder & CEO • Backend Systems Architect',
        company: 'SkyLine Digital Agency',
        period: 'Present • Indore, MP',
        highlights: [
          'Architected and deployed https://360views.services for interactive 360° real estate & commercial virtual tours.',
          'Engineered ShadowBase (Safe SQL Schema Migration Sandbox) and GridWeaver (Java 21 Loom IoT Microgrid Dashboard).',
        ],
      },
    ],
    projects: [
      {
        name: '360 Views',
        subtitle: 'Live Interactive 360° Real Estate & PropTech Tour Platform',
        tag: 'Spatial Web & PropTech',
        highlightMetric: 'Live at 360views.services',
        summary:
          'Live production interactive 360-degree Real Estate & PropTech virtual tour platform with spatial room hotspots, property listings, and direct WhatsApp site-visit booking.',
        stack: 'Next.js • 360° Spatial UI • WhatsApp Booking',
        imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=85',
        highlights: [
          'Live production platform operating at https://360views.services',
          'Interactive spatial room tours with direct WhatsApp site-visit scheduling',
        ],
        accentColor: 'indigo',
        artifactId: '360-views',
        liveSiteUrl: 'https://360views.services',
      },
      {
        name: 'ShadowBase',
        subtitle: 'Safe SQL Schema Migration & CDC Testing Sandbox',
        tag: 'Backend & Database Engineering',
        highlightMetric: 'Safe SQL Cutover',
        summary:
          'Built with Java, Spring Boot, Apache Kafka, Debezium (CDC), Testcontainers, and React to test SQL schema changes safely inside isolated Dockerized database clones.',
        stack: 'Java 21 & Spring Boot • Debezium CDC & Kafka • Docker Testcontainers',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85',
        highlights: [
          'Streams and replays SQL changes via Debezium CDC & Apache Kafka',
          'Verifies schema migrations against isolated Testcontainers clones before cutover',
        ],
        accentColor: 'violet',
        artifactId: 'shadowbase-cdc',
      },
      {
        name: 'GridWeaver',
        subtitle: 'Virtual Thread IoT Microgrid Control Dashboard',
        tag: 'IoT Telemetry & GIS Dashboard',
        highlightMetric: 'Live Solar & Grid Map',
        summary:
          'Built with Java 21 Loom Virtual Threads, Spring State Machine, Apache Kafka, React, and Leaflet to monitor solar substation telemetry with an interactive GIS map.',
        stack: 'Java 21 Loom • Apache Kafka • Leaflet GIS',
        imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85',
        highlights: [
          'Processes concurrent IoT substation telemetry on Java 21 Virtual Threads',
          'Interactive state transitions (Charging, Discharging, Idle, Fault) and GIS map',
        ],
        accentColor: 'cyan',
        artifactId: 'gridweaver-iot',
      },
    ],
  },
  {
    id: 'aashif-khan',
    name: 'Aashif Khan',
    role: 'Co-Founder & System Architect',
    headline: 'Lead Full-Stack, AI & Cybersecurity Architect',
    titleBadge: 'CO-FOUNDER & SYSTEM ARCHITECT • FULL-STACK, AI & SECURITY',
    location: 'Indore, MP, India',
    phone: '+91 86430 02478',
    whatsappNumber: '918643002478',
    callNumber: '+918643002478',
    contactMode: 'whatsapp-and-call',
    email: 'aashifkpp@gmail.com',
    avatarMonogram: 'AK',
    studioImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'indigo',
    bio: 'Co-Founder & System Architect leading full-stack web engineering (Next.js, React, Node.js), Python AI automation, cryptographic document verification, and D2C e-commerce storefronts.',
    summary:
      'Co-Founder & System Architect leading full-stack web engineering (Next.js, React, Node.js), Python AI automation, cryptographic document verification, and D2C e-commerce storefronts.',
    education: 'B.Tech in Computer Science & Systems Engineering',
    institution: 'Indore, Madhya Pradesh, India',
    languages: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Bash/Linux'],
    frameworksAndTools: [
      'Node.js',
      'Express.js',
      'React 19',
      'Next.js 15',
      'Python AI Automation',
      'Vercel & Render',
      'Linux/WSL',
    ],
    coreConcepts: [
      'SHA-256 Hashing',
      'Blockchain Anchoring',
      'D2C E-Commerce Funnels',
      'WhatsApp Cloud Automation',
    ],
    coreSpecialties: [
      'Full-Stack Web Engineering (Next.js, React, Node.js, Express.js)',
      'Cryptographic Security (SHA-256 Hashing & OriginStamp Blockchain Anchoring)',
      'Python AI Roadmaps, EdTech Portals & Creator Community Platforms',
      'Custom D2C Storefronts, 1-Tap UPI Checkout & WhatsApp Order Flows',
    ],
    credentials: [
      'Cisco Certified in Cybersecurity & Network Defense',
      'Creator of FileGuard AI, AI Career Guide & Mentor, Socialite & A&A Chocolates',
      'Lead Full-Stack, AI & Security Systems Architect',
    ],
    certifications: [
      'Cisco Certified in Cybersecurity & Network Defense',
      'Creator of FileGuard AI, AI Career Guide & Mentor, Socialite & A&A Chocolates',
      'Lead Full-Stack, AI & Security Systems Architect',
    ],
    experience: [
      {
        role: 'Co-Founder & System Architect',
        company: 'SkyLine Digital Agency',
        period: 'Present • Indore, MP',
        highlights: [
          'Architected FileGuard AI (SHA-256 & OriginStamp Blockchain Document Verifier), AI Career Guide & Mentor, and Socialite.',
          'Engineered the A&A Chocolates D2C online store with custom gift box selection, 1-Tap UPI checkout, and WhatsApp order flows.',
        ],
      },
    ],
    projects: [
      {
        name: 'FileGuard AI',
        subtitle: 'Document Integrity & Blockchain Verification Web App',
        tag: 'Cryptographic Security & AI',
        highlightMetric: 'SHA-256 Verified',
        summary:
          'Full-stack security web app verifying document authenticity via real-time SHA-256 cryptographic hashing and OriginStamp blockchain anchoring.',
        stack: 'SHA-256 Hashing • OriginStamp Blockchain • Node.js & React',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85',
        highlights: [
          'Real-time SHA-256 digest computation and instant tamper detection',
          'OriginStamp blockchain anchoring for verifiable document timestamps',
        ],
        accentColor: 'emerald',
        artifactId: 'fileguard-security',
      },
      {
        name: 'AI Career Guide & Mentor',
        subtitle: 'AI Roadmap Generator & Skill Gap Analyzer',
        tag: 'AI EdTech & Mentorship',
        highlightMetric: '90-Day Roadmaps',
        summary:
          'Interactive AI-powered career roadmap generator, skill gap analyzer, and engineering mentorship web application.',
        stack: 'Python AI • React • TypeScript',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
        highlights: [
          'Generates role-specific 90-day engineering roadmaps and skill gap diagnostics',
          'Interactive project architecture and technical viva preparation workflows',
        ],
        accentColor: 'amber',
        artifactId: 'ai-career-mentor',
      },
      {
        name: 'Socialite',
        subtitle: 'Real-Time Creator Community & Social Network',
        tag: 'Full-Stack Social Platform',
        highlightMetric: 'Live Creator Feed',
        summary:
          'Full-stack social community and creator engagement web app with topic channels, live post interactions, and creator analytics.',
        stack: 'Next.js • WebSockets • PostgreSQL',
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
        highlights: [
          'Live feed interactions, topic filtering, and creator engagement analytics',
          'Responsive social UI with role-based community moderation',
        ],
        accentColor: 'rose',
        artifactId: 'socialite-network',
      },
      {
        name: 'A&A Chocolates',
        subtitle: 'D2C Storefront & Festive Gift Box Builder',
        tag: 'D2C E-Commerce & 1-Tap UPI',
        highlightMetric: '1-Tap UPI Store',
        summary:
          'Handcrafted homemade chocolate e-commerce storefront featuring custom gift box selection, live ₹ INR cart calculation, and 1-Tap UPI checkout.',
        stack: 'D2C Storefront • 1-Tap UPI • WhatsApp Orders',
        imageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1200&q=85',
        highlights: [
          'Interactive chocolate catalog & gift box builder with live ₹ INR cart',
          '1-Tap UPI checkout and direct WhatsApp festive gift order support',
        ],
        accentColor: 'amber',
        artifactId: 'aa-chocolates-d2c',
      },
    ],
  },
];

export interface ClientProofCase {
  id: string;
  clientSector: string;
  timeframe: string;
  primaryMetric: string;
  primaryMetricLabel: string;
  secondaryMetric: string;
  challenge: string;
  solution: string;
  tags: string[];
}

export const CLIENT_PROOF_CASES: ClientProofCase[] = [
  {
    id: 'proof-auracare',
    clientSector: 'HEALTHCARE • MULTISPECIALTY & DENTAL CLINIC',
    timeframe: '2 to 3 Weeks Delivery',
    primaryMetric: 'Slot Picker',
    primaryMetricLabel: 'Online Appointment Booking & Google Business Profile Optimization',
    secondaryMetric: 'Google Maps SEO • WhatsApp Bot',
    challenge:
      'Patients searching on mobile had no easy way to view doctor timings or treatment prices, and reception missed calls during busy evening clinic hours.',
    solution:
      'Built a fast clinic website with an online doctor slot picker, Google Business Profile optimization, a digital WhatsApp review link, and automated appointment confirmation.',
    tags: ['Clinic Website UI', 'WhatsApp Slot Bot', 'Digital Google Review Link'],
  },
  {
    id: 'proof-aa-chocolates',
    clientSector: 'D2C CONFECTIONERY • A&A CHOCOLATES',
    timeframe: '2 to 3 Weeks Delivery',
    primaryMetric: '1-Tap UPI',
    primaryMetricLabel: 'Direct Online Catalog, Custom Gift Hamper Builder & UPI Checkout',
    secondaryMetric: 'Live Cart • WhatsApp Order Alerts',
    challenge:
      'Instagram buyers were dropping off during manual DM price inquiries, and customers wanted a simple mobile website to build custom chocolate gift boxes.',
    solution:
      'Engineered a clean D2C online store with product cards, custom gift box selection, 1-Tap UPI checkout, and automated WhatsApp order confirmations.',
    tags: ['D2C Online Store', '1-Tap UPI Checkout', 'WhatsApp Order Alerts'],
  },
];

export interface ClientTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location?: string;
  verifiedOutcome: string;
  engagementScope: string;
  accentColor?: SemanticAccentColor;
  initials?: string;
  serviceTag?: string;
  impactHighlight?: string;
  rating?: number;
  relatedProjectId?: string;
  projectName?: string;
  leadArchitect?: string;
  artifactId?: InteractiveArtifactId;
  liveSiteUrl?: string;
}

export type ClientReview = ClientTestimonial;
export type VerifiedReview = ClientTestimonial;

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'rev-360-views',
    projectName: '360 Views (360views.services)',
    leadArchitect: 'Engineered by Sachin Sahu • Founder & CEO',
    quote:
      '360 Views transformed how we showcase properties and commercial spaces online. Buyers explore interactive 360° room tours on mobile and schedule site visits on WhatsApp in seconds.',
    author: 'Vikramaditya Rathore',
    role: 'Partner, 360 Views PropTech & Spatial Tours',
    location: 'Indore, MP',
    verifiedOutcome: 'Live 360° Tour Platform',
    engagementScope: '360° SPATIAL WEB PLATFORM',
    accentColor: 'indigo',
    rating: 5,
    artifactId: '360-views',
    liveSiteUrl: 'https://360views.services',
  },
  {
    id: 'rev-shadowbase',
    projectName: 'ShadowBase CDC Studio',
    leadArchitect: 'Engineered by Sachin Sahu • Founder & CEO',
    quote:
      'ShadowBase gave our backend team a clean way to test PostgreSQL schema migrations against Debezium CDC and Kafka streams inside isolated Docker containers before touching production.',
    author: 'Rohan Deshmukh',
    role: 'Engineering Lead, FinCore Systems',
    location: 'Pune & Indore',
    verifiedOutcome: 'Safe SQL Schema Testing',
    engagementScope: 'JAVA 21 + DEBEZIUM CDC + KAFKA',
    accentColor: 'violet',
    rating: 5,
    artifactId: 'shadowbase-cdc',
  },
  {
    id: 'rev-gridweaver',
    projectName: 'GridWeaver IoT Dashboard',
    leadArchitect: 'Engineered by Sachin Sahu • Founder & CEO',
    quote:
      'Sachin’s Java 21 Virtual Threads and Apache Kafka dashboard made it easy to monitor solar and battery substation nodes with live state controls and clean map visibility.',
    author: 'Arvind Kulkarni',
    role: 'Operations Lead, VoltEdge Solar',
    location: 'Central India',
    verifiedOutcome: 'Live Solar & Grid Telemetry',
    engagementScope: 'JAVA 21 LOOM + KAFKA + GIS',
    accentColor: 'cyan',
    rating: 5,
    artifactId: 'gridweaver-iot',
  },
  {
    id: 'rev-fileguard',
    projectName: 'FileGuard AI Security',
    leadArchitect: 'Engineered by Aashif Khan • Co-Founder & System Architect',
    quote:
      'FileGuard AI gave our compliance workflow a straightforward way to verify document integrity using SHA-256 hashing and blockchain timestamp certificates.',
    author: 'Adv. Meera Nair',
    role: 'Partner, LexShield Compliance',
    location: 'Indore & Mumbai',
    verifiedOutcome: 'SHA-256 Document Proof',
    engagementScope: 'SHA-256 + BLOCKCHAIN SECURITY',
    accentColor: 'emerald',
    rating: 5,
    artifactId: 'fileguard-security',
  },
  {
    id: 'rev-aa-chocolates',
    projectName: 'A&A Chocolates D2C',
    leadArchitect: 'Engineered by Aashif Khan • Co-Founder & System Architect',
    quote:
      'Our homemade chocolate orders used to get stuck in manual Instagram DMs. Aashif built our online catalog with custom gift box selection and 1-Tap UPI checkout, making ordering effortless for customers.',
    author: 'Ananya & Aditya',
    role: 'Co-Founders, A&A Chocolates',
    location: 'Indore, MP',
    verifiedOutcome: 'Custom Box + 1-Tap UPI Store',
    engagementScope: 'D2C STOREFRONT + 1-TAP UPI',
    accentColor: 'amber',
    rating: 5,
    artifactId: 'aa-chocolates-d2c',
  },
  {
    id: 'rev-career-mentor',
    projectName: 'AI Career Guide & Mentor',
    leadArchitect: 'Engineered by Aashif Khan • Co-Founder & System Architect',
    quote:
      'The AI Career Guide & Mentor web app gave our students clear 90-day learning roadmaps, skill-gap tracking, and practical mock viva questions for their project defenses.',
    author: 'Prof. Devendra Sharma',
    role: 'Training & Placement Coordinator',
    location: 'Indore, MP',
    verifiedOutcome: 'Structured 90-Day Roadmaps',
    engagementScope: 'AI EDTECH & ROADMAP ENGINE',
    accentColor: 'indigo',
    rating: 5,
    artifactId: 'ai-career-mentor',
  },
  {
    id: 'rev-socialite',
    projectName: 'Socialite Community Hub',
    leadArchitect: 'Engineered by Aashif Khan • Co-Founder & System Architect',
    quote:
      'Socialite delivered a clean, fast community feed with topic channels and creator analytics so our members can share projects and collaborate in real time.',
    author: 'Kabir Malhotra',
    role: 'Founder, PulseWave Creators',
    location: 'Bengaluru & Indore',
    verifiedOutcome: 'Live Creator Community Feed',
    engagementScope: 'FULL-STACK SOCIAL PLATFORM',
    accentColor: 'rose',
    rating: 5,
    artifactId: 'socialite-network',
  },
];

export const VERIFIED_REVIEWS: ClientReview[] = CLIENT_TESTIMONIALS;

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  accentColor: SemanticAccentColor;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Timeline & Budget',
    question: 'How much time and budget does it take to build a website or custom software?',
    answer:
      'Starter business websites, landing pages, and local digital setups start from ₹10,000 (₹10,000 – ₹18,000) and typically go live within 1 to 2 weeks. Custom web applications, D2C e-commerce stores with 1-Tap UPI, and WhatsApp automation systems scale based on your exact features (₹18,000 – ₹65,000+). Most importantly, every price is flexible and open to direct discussion and negotiation on a quick call or WhatsApp chat—we work within practical founder budgets.',
    accentColor: 'indigo',
  },
  {
    id: 'faq-2',
    category: '24/7 WhatsApp Bot',
    question: 'How does the WhatsApp Bot handle customer inquiries and appointment bookings?',
    answer:
      'Our WhatsApp bot connects via the Official WhatsApp Business API to reply promptly to common customer inquiries, share your product catalogs or PDF brochures, collect basic lead details (name, requirement, preferred timing), and help schedule appointments—and seamlessly hands over the chat to your human team whenever a personal touch is needed.',
    accentColor: 'violet',
  },
  {
    id: 'faq-3',
    category: 'Google Maps #Top',
    question: 'How do you improve Google Maps visibility for clinics, showrooms, or retail stores?',
    answer:
      'We optimize your Google Business Profile (GBP) categories, service keywords, business photos, and local directory citations so nearby customers can discover you easily. We also provide a digital WhatsApp and direct Google review link that you can send to happy customers so they can quickly leave verified reviews from their phones.',
    accentColor: 'emerald',
  },
  {
    id: 'faq-4',
    category: '100% Code Ownership',
    question: 'Who owns the source code, domain, and hosting after the project is completed?',
    answer:
      'You get 100% source code and account ownership from Day 1. Your GitHub code repository, custom domain, database, WhatsApp Business account, and cloud hosting are set up directly under your business email with zero vendor lock-in.',
    accentColor: 'cyan',
  },
  {
    id: 'faq-5',
    category: 'Support & Optimization',
    question: 'How does post-launch maintenance, updates, and support work?',
    answer:
      'Once your website or software goes live, we provide a 30-day free support window for bug fixes and smooth onboarding, followed by simple, affordable support & optimization whenever you need content updates, new features, or SEO improvements.',
    accentColor: 'amber',
  },
];

export const TECH_STACK_MARQUEE_ROW_1: string[] = [
  'Next.js 15 & React 19',
  'TypeScript',
  'Supabase (PostgreSQL + RLS)',
  'Vercel Edge',
  'Razorpay & Dodo 1-Tap UPI',
  'WhatsApp Cloud API',
];

export const TECH_STACK_MARQUEE_ROW_2: string[] = [
  'Capacitor (iOS & Android)',
  'PostHog Analytics',
  'Sentry Error Tracking',
  'Resend Transactional Email',
  'Cloudflare DNS & Turnstile',
  'Google Map Pack SEO',
];

export const STACK_TICKER_ROW_1: { name: string; category: string }[] = [
  { name: 'Next.js 15 & React 19', category: 'Fast Web & PWA' },
  { name: 'TypeScript', category: 'Strict Types' },
  { name: 'Supabase (PostgreSQL + RLS)', category: 'Auth & Database' },
  { name: 'Vercel Edge', category: 'Cloud Hosting' },
  { name: 'Razorpay & Dodo 1-Tap UPI', category: 'UPI & Card Checkout' },
  { name: 'WhatsApp Cloud API', category: 'Lead & Booking Bots' },
];

export const STACK_TICKER_ROW_2: { name: string; category: string }[] = [
  { name: 'Capacitor (iOS & Android)', category: 'Cross-Platform Mobile' },
  { name: 'PostHog Analytics', category: 'Funnels & Analytics' },
  { name: 'Sentry Error Tracking', category: 'Error Monitoring' },
  { name: 'Resend Transactional Email', category: 'Email Alerts' },
  { name: 'Cloudflare DNS & Turnstile', category: 'SSL & Bot Protection' },
  { name: 'Google Map Pack SEO', category: 'Local Search Visibility' },
];
