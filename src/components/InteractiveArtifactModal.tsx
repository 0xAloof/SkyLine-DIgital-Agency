import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Lock,
  Monitor,
  Smartphone,
  Compass,
  ShoppingBag,
  Stethoscope,
  LayoutDashboard,
  Calendar,
  Download,
  CheckCircle2,
  Star,
  MapPin,
  ShieldCheck,
  Search,
  Plus,
  Trash2,
  Printer,
  Cpu,
  Database,
  Users,
  GraduationCap,
  Terminal,
  Zap,
  Globe,
  TrendingUp,
  FileCheck2,
  MessageSquare,
} from 'lucide-react';
import { InteractiveArtifactId } from '../data/agencyData';
import { WhatsAppBrandBadge } from './BrandIcons';

interface InteractiveArtifactModalProps {
  artifactId: InteractiveArtifactId | null;
  onClose: () => void;
  onRequestSimilarSystem?: () => void;
}

interface PrototypeSiteMeta {
  id: InteractiveArtifactId;
  name: string;
  category: string;
  url: string;
  liveExternalUrl?: string;
  architect: string;
}

const PROTOTYPE_SITES: PrototypeSiteMeta[] = [
  {
    id: '360-views',
    name: '360 Views · Spatial PropTech',
    category: 'Real Estate & 360° Virtual Tours',
    url: 'https://360views.services',
    liveExternalUrl: 'https://360views.services',
    architect: 'Sachin Sahu (Founder & CEO)',
  },
  {
    id: 'aa-chocolates-d2c',
    name: 'A&A Artisan Chocolates',
    category: 'D2C Storefront & 1-Tap UPI',
    url: 'https://aachocolates.in',
    architect: 'Sachin Sahu & Aashif Khan',
  },
  {
    id: 'auracare-local',
    name: 'AuraCare Multispecialty & Dental Studio',
    category: 'Healthcare Clinic & WhatsApp Booking',
    url: 'https://auracareclinic.in',
    architect: 'Sachin Sahu & Aashif Khan',
  },
  {
    id: 'finvantage-saas',
    name: 'FinVantage Cloud GST SaaS',
    category: 'Multi-Tenant GST Billing & Analytics',
    url: 'https://finvantage.in',
    architect: 'Sachin Sahu & Aashif Khan',
  },
  {
    id: 'nexaprop-crm',
    name: 'NexaProp WhatsApp AI & CRM',
    category: '24/7 Real Estate WhatsApp Cloud Bot',
    url: 'https://nexaprop.in',
    architect: 'Sachin Sahu (Founder & CEO)',
  },
  {
    id: 'fileguard-security',
    name: 'FileGuard AI · Zero-Trust Verifier',
    category: 'SHA-256 & Cryptographic Document Security',
    url: 'https://fileguard.ai',
    architect: 'Aashif Khan (Co-Founder & System Architect)',
  },
  {
    id: 'gridweaver-iot',
    name: 'GridWeaver · Smart Microgrid Platform',
    category: 'CleanTech GIS & Java 21 Telemetry',
    url: 'https://gridweaver-virid.vercel.app',
    liveExternalUrl: 'https://gridweaver-virid.vercel.app/',
    architect: 'Sachin Sahu (Founder & CEO)',
  },
  {
    id: 'shivangi-salon',
    name: 'Shivangi Hair Salon · Online Styling Studio',
    category: 'React & Node.js Salon Website & Slot Booking',
    url: 'https://shivangi-hair-salon.vercel.app',
    liveExternalUrl: 'https://shivangi-hair-salon.vercel.app/',
    architect: 'Aashif Khan & Sachin Sahu (Reviewed by Pradeep Sen)',
  },
  {
    id: 'localloom-store',
    name: 'LocalLoom · Handloom Store & Admin Portal',
    category: 'Admin Panel & Handloom E-Commerce Marketplace',
    url: 'https://localloom-nu.vercel.app',
    liveExternalUrl: 'https://localloom-nu.vercel.app/',
    architect: 'Aashif Khan & Sachin Sahu (Reviewed by Akram Khan)',
  },
  {
    id: 'shadowbase-cdc',
    name: 'ShadowBase · Zero-Downtime SQL Platform',
    category: 'Debezium CDC & Schema Migration Studio',
    url: 'https://shadowbase.dev',
    architect: 'Sachin Sahu (Founder & CEO)',
  },
  {
    id: 'ai-career-mentor',
    name: 'AI Career Guide & Engineering Viva Lab',
    category: 'RAG Roadmap & Mock Viva Mentorship',
    url: 'https://aicareerguide.in',
    architect: 'Aashif Khan (Co-Founder & System Architect)',
  },
  {
    id: 'socialite-network',
    name: 'Socialite · Creator Community Platform',
    category: 'Real-Time Creator Network & Cohorts',
    url: 'https://socialite.club',
    architect: 'Aashif Khan (Co-Founder & System Architect)',
  },
  {
    id: 'searchpulse-seo',
    name: 'SearchPulse · Local Map Pack Growth',
    category: 'Google Business Profile SEO & Review Engine',
    url: 'https://searchpulse.in',
    architect: 'Sachin Sahu & Aashif Khan',
  },
];

export const InteractiveArtifactModal: React.FC<InteractiveArtifactModalProps> = ({
  artifactId,
  onClose,
  onRequestSimilarSystem,
}) => {
  const [currentId, setCurrentId] = useState<InteractiveArtifactId>(
    artifactId || '360-views'
  );
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  // 1. 360 Views State
  const [active360Room, setActive360Room] = useState<number>(0);
  const [fovZoom, setFovZoom] = useState<number>(105);
  const [propFilterLocation, setPropFilterLocation] = useState<string>('Indore');
  const [propFilterType, setPropFilterType] = useState<string>('All');
  const [propFilterBudget, setPropFilterBudget] = useState<string>('₹65L – ₹3.5Cr');
  const [visitDate, setVisitDate] = useState<string>('This Saturday, 11:30 AM');
  const [visitPhone, setVisitPhone] = useState<string>('');
  const [visitBooked, setVisitBooked] = useState<boolean>(false);
  const [loanAmountLakhs, setLoanAmountLakhs] = useState<number>(85);

  // 2. A&A Chocolates State
  const [boxSize, setBoxSize] = useState<'6-Piece' | '12-Piece' | '24-Piece'>('12-Piece');
  const [cartItems, setCartItems] = useState<
    { name: string; price: number; qty: number }[]
  >([
    { name: 'Belgian Dark 70%', price: 699, qty: 1 },
    { name: 'Roasted Hazelnut Praline', price: 899, qty: 1 },
  ]);
  const [selectedUpiApp, setSelectedUpiApp] = useState<'GPay' | 'PhonePe' | 'Paytm'>('GPay');
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  // 3. AuraCare Clinic State
  const [selectedTreatment, setSelectedTreatment] = useState<string>(
    'Root Canal / Dental Implant'
  );
  const [selectedDoctor, setSelectedDoctor] = useState<string>(
    'Dr. Ananya Verma (MDS Endodontics)'
  );
  const [selectedClinicSlot, setSelectedClinicSlot] = useState<string>('Today 5:30 PM');
  const [patientName, setPatientName] = useState<string>('Aarav Sharma');
  const [patientPhone, setPatientPhone] = useState<string>('+91 98260 12345');
  const [clinicBooked, setClinicBooked] = useState<boolean>(false);

  // 4. FinVantage SaaS State
  const [finBillingCycle, setFinBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [invoiceClient, setInvoiceClient] = useState<string>('Apex MediCare Pvt Ltd');
  const [invoiceBaseAmount, setInvoiceBaseAmount] = useState<number>(45000);
  const [invoicesList, setInvoicesList] = useState<
    { id: string; client: string; base: number; gst: number; total: number; status: string }[]
  >([
    {
      id: 'INV-2026-108',
      client: 'AuraCare Dental Studio',
      base: 28000,
      gst: 5040,
      total: 33040,
      status: 'PAID VIA UPI',
    },
    {
      id: 'INV-2026-107',
      client: '360 Views PropTech LLP',
      base: 65000,
      gst: 11700,
      total: 76700,
      status: 'PAID VIA NEFT',
    },
    {
      id: 'INV-2026-106',
      client: 'A&A Artisanal Foods',
      base: 18000,
      gst: 3240,
      total: 21240,
      status: 'DUE IN 3 DAYS',
    },
  ]);

  // 5. NexaProp WhatsApp AI State
  const [nexaChatMessages, setNexaChatMessages] = useState<
    { sender: 'user' | 'bot'; text: string; time: string }[]
  >([
    {
      sender: 'user',
      text: 'Hi! Please share the floor plan and price for SkyLine One 3BHK Residences.',
      time: '10:41 AM',
    },
    {
      sender: 'bot',
      text: 'Namaste! Here is the verified RERA brochure for SkyLine One (3BHK starts at ₹85 Lakh). Would you like to book a site visit this weekend?',
      time: '10:41 AM',
    },
  ]);
  const [nexaHandoverActive, setNexaHandoverActive] = useState<boolean>(false);

  // 6. FileGuard Security State
  const [docContent, setDocContent] = useState<string>(
    'Commercial Lease Agreement #IND-2026-884 · Monthly Rent: ₹65,000 · Signed by Both Parties'
  );
  const [tamperedMode, setTamperedMode] = useState<boolean>(false);

  // 7. GridWeaver IoT State
  const [gridNodes, setGridNodes] = useState<
    {
      id: string;
      name: string;
      zone: string;
      kw: number;
      soc: number;
      state: 'CHARGING' | 'DISCHARGING' | 'IDLE' | 'FAULT';
    }[]
  >([
    {
      id: 'NODE-IND-01',
      name: 'Super Corridor Solar Array A',
      zone: 'Indore North Grid',
      kw: 420,
      soc: 88,
      state: 'DISCHARGING',
    },
    {
      id: 'NODE-IND-02',
      name: 'Pithampur Industrial Storage B',
      zone: 'MP Industrial Feeder',
      kw: 680,
      soc: 94,
      state: 'CHARGING',
    },
    {
      id: 'NODE-BPL-03',
      name: 'Bhopal Smart Substation C',
      zone: 'Central Telemetry Hub',
      kw: 310,
      soc: 76,
      state: 'IDLE',
    },
    {
      id: 'NODE-UJJ-04',
      name: 'Ujjain Microgrid Reserve D',
      zone: 'West Feeder Line',
      kw: 515,
      soc: 82,
      state: 'DISCHARGING',
    },
  ]);
  const [virtualThreadLoad, setVirtualThreadLoad] = useState<number>(12400);

  // 8. ShadowBase CDC State
  const [selectedMigrationIdx, setSelectedMigrationIdx] = useState<number>(0);
  const [migrationVerified, setMigrationVerified] = useState<boolean>(true);
  const [shadowRowsSynced, setShadowRowsSynced] = useState<number>(142850);

  // 9. AI Career Mentor State
  const [selectedCareerTrack, setSelectedCareerTrack] = useState<
    'Full-Stack Next.js' | 'Java 21 & Kafka' | 'AI & Cybersecurity'
  >('Full-Stack Next.js');
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([1]);
  const [vivaAnswerSubmitted, setVivaAnswerSubmitted] = useState<boolean>(false);

  // 10. Socialite Creator Network State
  const [socialChannel, setSocialChannel] = useState<
    'All Creators' | 'Web Builders' | 'UI/UX Design'
  >('All Creators');
  const [newPostText, setNewPostText] = useState<string>('');
  const [socialPosts, setSocialPosts] = useState<
    { id: number; author: string; role: string; channel: string; content: string; likes: number }[]
  >([
    {
      id: 1,
      author: 'Aashif Khan',
      role: 'Principal Systems Architect',
      channel: 'Web Builders',
      content:
        'Shipped zero-trust SHA-256 document verification with instant WebSocket room sync for 2,400 active creators.',
      likes: 48,
    },
    {
      id: 2,
      author: 'Sachin Sahu',
      role: 'Founder & Full-Stack Architect',
      channel: 'UI/UX Design',
      content:
        'Launched 360views.services spatial virtual tour engine for luxury real estate developers across Indore and Bhopal.',
      likes: 64,
    },
  ]);

  // 11. SearchPulse Local SEO State
  const [seoBusinessCategory, setSeoBusinessCategory] = useState<
    'Dental & Multispecialty Clinic' | 'Real Estate Developer' | 'Jewellery & Retail Showroom'
  >('Dental & Multispecialty Clinic');
  const [seoCity, setSeoCity] = useState<string>('Indore (Vijay Nagar)');
  const [seoCurrentReviews, setSeoCurrentReviews] = useState<number>(38);
  const [seoReviewDispatched, setSeoReviewDispatched] = useState<boolean>(false);

  // 12. Shivangi Hair Salon State (Pradeep Sen • React & Node.js)
  const [salonSelectedPackage, setSalonSelectedPackage] = useState<string>(
    'Keratin Smooth & Hair Spa Package (₹2,499)'
  );
  const [salonSelectedStylist, setSalonSelectedStylist] = useState<string>(
    'Pradeep Sen (Master Stylist & Founder)'
  );
  const [salonSelectedSlot, setSalonSelectedSlot] = useState<string>('Today • 4:00 PM');
  const [salonClientName, setSalonClientName] = useState<string>('Riya Sharma');
  const [salonClientPhone, setSalonClientPhone] = useState<string>('+91 98260 54321');
  const [salonBookingConfirmed, setSalonBookingConfirmed] = useState<boolean>(false);

  // 13. LocalLoom Handloom Store & Admin Panel State (Akram Khan)
  const [loomViewMode, setLoomViewMode] = useState<'storefront' | 'admin-panel'>('storefront');
  const [loomProducts, setLoomProducts] = useState<
    { id: string; sku: string; title: string; weave: string; price: number; stock: number; image: string }[]
  >([
    {
      id: 'loom-1',
      sku: 'LL-CHN-101',
      title: 'Royal Chanderi Silk Zari Saree',
      weave: 'Chanderi Handloom • Pure Silk Warp',
      price: 6490,
      stock: 14,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'loom-2',
      sku: 'LL-MHS-204',
      title: 'Heritage Maheshwari Temple Border Weave',
      weave: 'Maheshwar Artisan Loom • Cotton Silk',
      price: 4850,
      stock: 19,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'loom-3',
      sku: 'LL-TUS-309',
      title: 'Artisanal Tussar Block-Printed Dupatta Set',
      weave: 'Natural Dye Handblock • MP Weavers',
      price: 3290,
      stock: 22,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    },
  ]);
  const [loomCartCount, setLoomCartCount] = useState<number>(2);
  const [loomOrderConfirmed, setLoomOrderConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (artifactId) {
      setCurrentId(artifactId === 'career-socialite' ? 'ai-career-mentor' : artifactId);
    }
  }, [artifactId]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && artifactId) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [artifactId, onClose]);

  if (!artifactId) return null;

  const activeSite =
    PROTOTYPE_SITES.find((s) => s.id === currentId) || PROTOTYPE_SITES[0];

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addToChocolateCart = (name: string, price: number) => {
    setCheckoutSuccess(false);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) {
        return prev.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { name, price, qty: 1 }];
    });
  };

  const removeFromChocolateCart = (name: string) => {
    setCartItems((prev) => prev.filter((i) => i.name !== name));
  };

  const handleAddInvoice = () => {
    const cleanClient = invoiceClient.trim() || 'New Enterprise Client';
    const base = Math.max(1000, invoiceBaseAmount);
    const gst = Math.round(base * 0.18);
    const total = base + gst;
    setInvoicesList((prev) => [
      {
        id: `INV-2026-${109 + prev.length}`,
        client: cleanClient,
        base,
        gst,
        total,
        status: 'GENERATED · 18% GST',
      },
      ...prev,
    ]);
  };

  const triggerNexaAction = (action: 'brochure' | 'visit' | 'price') => {
    if (action === 'brochure') {
      setNexaChatMessages((prev) => [
        ...prev,
        {
          sender: 'user',
          text: 'Please send the Floor Plan PDF brochure on WhatsApp.',
          time: 'Just now',
        },
        {
          sender: 'bot',
          text: 'Sent! SkyLine_One_FloorPlans_2026.pdf (4.2 MB) has been delivered to your WhatsApp with RERA pricing.',
          time: 'Just now',
        },
      ]);
    } else if (action === 'visit') {
      setNexaChatMessages((prev) => [
        ...prev,
        {
          sender: 'user',
          text: 'I want to schedule a site visit for Saturday 11:30 AM.',
          time: 'Just now',
        },
        {
          sender: 'bot',
          text: 'Confirmed! Your private site visit is locked for Saturday at 11:30 AM. Google Maps pin shared.',
          time: 'Just now',
        },
      ]);
    } else {
      setNexaChatMessages((prev) => [
        ...prev,
        {
          sender: 'user',
          text: 'What is the all-inclusive price for the 3BHK Garden Residence?',
          time: 'Just now',
        },
        {
          sender: 'bot',
          text: 'The 3BHK Garden Residence (1,850 sq.ft) starts at ₹85 Lakh all-inclusive with flexible milestone payment plans.',
          time: 'Just now',
        },
      ]);
    }
  };

  const rooms360 = [
    {
      name: 'Living Room',
      fullTitle: 'Sky Deck Living Room & Panorama',
      tag: '360° SPATIAL TOUR · 2,450 SQ.FT',
      price: '₹1.25 Cr',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      hotspotNote: 'Italian Statuario Marble · 12ft Double-Glazed Glass · Automated Lutron Lighting',
      hotspots: [
        { x: '28%', y: '54%', label: 'Italian Marble Deck' },
        { x: '68%', y: '42%', label: '12ft Acoustic Glass' },
      ],
    },
    {
      name: 'Master Suite',
      fullTitle: 'Master Suite & Walk-In Wardrobe',
      tag: '360° MASTER BEDROOM · PRIVATE BALCONY',
      price: '₹1.25 Cr',
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
      hotspotNote: 'Engineered Teak Wood Flooring · Walk-In Closet · Private Sit-Out Terrace',
      hotspots: [
        { x: '35%', y: '58%', label: 'Teak Wood Suite' },
        { x: '74%', y: '48%', label: 'Private Sit-Out' },
      ],
    },
    {
      name: 'Sky Deck',
      fullTitle: 'Rooftop Infinity Sky Deck & Lounge',
      tag: '360° PENTHOUSE TERRACE · 3,100 SQ.FT',
      price: '₹1.65 Cr',
      image:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
      hotspotNote: 'Outdoor Jacuzzi Deck · 270° City Horizon View · Private Elevator Lobby',
      hotspots: [
        { x: '42%', y: '50%', label: 'Horizon Lounge' },
        { x: '72%', y: '62%', label: 'Private Deck Bar' },
      ],
    },
    {
      name: 'Commercial Lobby',
      fullTitle: 'Sapphire Commercial Atrium & Retail',
      tag: '360° GRADE-A COMMERCIAL · VIJAY NAGAR',
      price: '₹85 Lakh',
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85',
      hotspotNote: 'Double-Height Glass Frontage · High-Speed Elevators · 100% DG Power Backup',
      hotspots: [
        { x: '30%', y: '52%', label: 'Main Road Frontage' },
        { x: '66%', y: '46%', label: 'Concierge Atrium' },
      ],
    },
  ];

  const monthlyEmi = Math.round(
    (loanAmountLakhs * 100000 * 0.0072 * Math.pow(1.0072, 240)) /
      (Math.pow(1.0072, 240) - 1)
  );

  const modalTree = (
    <div
      data-testid="fullscreen-prototype-modal"
      className="fixed inset-0 z-[200] w-screen h-screen bg-[#09090B] text-zinc-900 flex flex-col overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`Full-Screen Live Production Website — ${activeSite.name}`}
    >
      {/* =====================================================================
          COMPACT TOP BROWSER BAR (h-12) — NO PROJECT SWITCHER PILLS OR DROPDOWNS
         ===================================================================== */}
      <div className="h-12 px-3 sm:px-5 bg-[#09090B] text-white border-b border-white/15 flex items-center justify-between gap-2 shrink-0 z-30">
        {/* Left: <- Back to SkyLine + Active Brand Name */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            data-testid="back-to-skyline-btn"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to SkyLine</span>
          </button>

          <span className="hidden md:inline-block text-xs font-semibold text-zinc-300 truncate">
            {activeSite.name} <span className="text-zinc-500">·</span>{' '}
            <span className="text-zinc-400 font-normal">{activeSite.category}</span>
          </span>
        </div>

        {/* Center: Locked Domain Address Bar + Desktop / Mobile Viewport Toggle */}
        <div className="hidden lg:flex items-center gap-2.5">
          <div className="px-3.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2 min-w-[240px]">
            <Lock className="w-3 h-3 text-[#10B981] shrink-0" />
            <span className="truncate">{activeSite.url}</span>
          </div>

          <div className="inline-flex items-center p-0.5 rounded-lg bg-zinc-900 border border-white/10 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setViewportMode('desktop')}
              className={`px-2.5 py-1 rounded-md inline-flex items-center gap-1 cursor-pointer transition-colors ${
                viewportMode === 'desktop'
                  ? 'bg-[#0B63F6] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setViewportMode('mobile')}
              className={`px-2.5 py-1 rounded-md inline-flex items-center gap-1 cursor-pointer transition-colors ${
                viewportMode === 'mobile'
                  ? 'bg-[#0B63F6] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Right: External Domain Link (if live) + Request Similar System CTA */}
        <div className="flex items-center gap-2 shrink-0">
          {activeSite.liveExternalUrl && (
            <a
              href={activeSite.liveExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              <span>Open Live Domain</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            type="button"
            data-testid="build-website-like-this-cta"
            onClick={() => {
              if (onRequestSimilarSystem) {
                onRequestSimilarSystem();
              } else {
                onClose();
              }
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-zinc-950 font-bold text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Request Similar System (Starts at ₹10k) →</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          FULL-SCREEN SCROLLABLE STANDALONE DEMO LANDING PAGE CANVAS
         ===================================================================== */}
      <div className="flex-1 w-full overflow-y-auto bg-zinc-950 flex justify-center">
        <div
          className={`w-full min-h-full transition-all duration-300 bg-white text-zinc-900 ${
            viewportMode === 'mobile'
              ? 'max-w-[430px] my-4 rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-800'
              : 'max-w-full'
          }`}
        >
          {/* =================================================================
              1. 360 VIEWS (https://360views.services — Luxury Real Estate Website)
             ================================================================= */}
          {currentId === '360-views' && (
            <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
              {/* Section 1: Dedicated Client Navbar */}
              <header className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#0B63F6] text-white font-display font-black text-sm flex items-center justify-center shadow-sm">
                    360°
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base tracking-tight text-zinc-900">
                      360° VIEWS · SPATIAL PROPTECH
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Interactive Virtual Property Platform · Indore · Bhopal · Mumbai
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#residences-360" className="hover:text-[#0B63F6]">
                    Residences
                  </a>
                  <a href="#tour-360" className="hover:text-[#0B63F6]">
                    360° Virtual Tour
                  </a>
                  <a href="#floor-plans-360" className="hover:text-[#0B63F6]">
                    Floor Plans
                  </a>
                  <a href="#emi-360" className="hover:text-[#0B63F6]">
                    Pricing &amp; EMI
                  </a>
                </nav>

                <div className="flex items-center gap-2.5">
                  <a
                    href="https://360views.services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#0B63F6] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm hover:bg-[#1D4ED8]"
                  >
                    <span>Visit 360views.services</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </header>

              {/* Section 2: Full-Bleed Luxury Property Hero + Search Filter Bar + Interactive 360° Room Viewer */}
              <div id="tour-360" className="bg-zinc-950 text-white py-10 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div className="space-y-2 max-w-2xl">
                      <div className="text-xs font-mono uppercase tracking-widest text-[#34D399] font-bold">
                        01 · INTERACTIVE SPATIAL PROPERTY TOURS
                      </div>
                      <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                        Experience Luxury Properties in True 360° Before You Visit.
                      </h1>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 max-w-md">
                      Walk through penthouses, villas, and commercial showrooms from your phone or desktop. Shortlist verified RERA properties in minutes.
                    </p>
                  </div>

                  {/* Interactive Property Search Filter Bar */}
                  <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/15 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1">
                        Location
                      </label>
                      <select
                        value={propFilterLocation}
                        onChange={(e) => setPropFilterLocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/15 text-white font-semibold"
                      >
                        <option value="Indore">Indore (Super Corridor / Vijay Nagar)</option>
                        <option value="Bhopal">Bhopal (Arera Colony)</option>
                        <option value="Mumbai">Mumbai (Worli / BKC)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1">
                        Property Type
                      </label>
                      <select
                        value={propFilterType}
                        onChange={(e) => setPropFilterType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/15 text-white font-semibold"
                      >
                        <option value="All">All Luxury Units (3BHK / 4BHK / Commercial)</option>
                        <option value="Villa">4BHK Sky Villa</option>
                        <option value="Penthouse">Sky Deck Penthouse</option>
                        <option value="Commercial">Grade-A Commercial Showroom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1">
                        Budget Range
                      </label>
                      <select
                        value={propFilterBudget}
                        onChange={(e) => setPropFilterBudget(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/15 text-white font-semibold"
                      >
                        <option>₹65L – ₹3.5Cr</option>
                        <option>₹85L – ₹1.5Cr</option>
                        <option>₹1.5Cr – ₹3.5Cr+</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => setActive360Room((prev) => (prev + 1) % rooms360.length)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0B63F6] hover:bg-[#1D4ED8] text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>Explore Next 360° Space</span>
                      </button>
                    </div>
                  </div>

                  {/* Interactive 360° Room Switcher & Spatial Hotspot Stage */}
                  <div className="relative h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-white/15">
                    <img
                      src={rooms360[active360Room].image}
                      alt={rooms360[active360Room].fullTitle}
                      style={{ transform: `scale(${fovZoom / 100})` }}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

                    {/* Top Room Switcher Tabs */}
                    <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        {rooms360.map((rm, idx) => (
                          <button
                            key={rm.name}
                            type="button"
                            onClick={() => setActive360Room(idx)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              active360Room === idx
                                ? 'bg-[#0B63F6] text-white shadow-lg'
                                : 'bg-black/70 text-white hover:bg-black'
                            }`}
                          >
                            {rm.name}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 bg-black/75 px-3 py-1.5 rounded-xl text-xs">
                        <Compass className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>FOV Zoom ({fovZoom}%):</span>
                        <button
                          type="button"
                          onClick={() => setFovZoom((z) => Math.max(100, z - 10))}
                          className="px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 cursor-pointer"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setFovZoom((z) => Math.min(135, z + 10))}
                          className="px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Interactive Spatial Hotspot Pins */}
                    {rooms360[active360Room].hotspots.map((spot) => (
                      <div
                        key={spot.label}
                        style={{ left: spot.x, top: spot.y }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-black/80 border border-emerald-400/60 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-lg"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                        <span>{spot.label}</span>
                      </div>
                    ))}

                    {/* Bottom Room Info Bar */}
                    <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-[11px] font-mono font-bold text-[#34D399]">
                          {rooms360[active360Room].tag} · {propFilterLocation.toUpperCase()}
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                          {rooms360[active360Room].fullTitle}
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-200">
                          {rooms360[active360Room].hotspotNote}
                        </p>
                      </div>
                      <div className="px-5 py-2.5 rounded-2xl bg-white text-zinc-950 font-display font-extrabold text-xl shrink-0">
                        {rooms360[active360Room].price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Featured Properties Grid & Floor Plans */}
              <div id="residences-360" className="max-w-7xl mx-auto py-12 px-6 sm:px-12 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B63F6]">
                      02 · VERIFIED RERA DEVELOPMENTS IN {propFilterLocation.toUpperCase()}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-1">
                      Featured Residences &amp; Floor Plans ({propFilterBudget})
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-zinc-500">
                    Click any residence card to switch the 360° room tour above
                  </span>
                </div>

                <div id="floor-plans-360" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'SkyLine Greens 4BHK Villa',
                      loc: `${propFilterLocation} · Super Corridor`,
                      price: '₹1.25 Cr',
                      area: '2,450 sq.ft · ₹5,102/sq.ft',
                      floorPlan: '4 Bed · 4 Bath · Private Deck · 2 Car Park',
                      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                      idx: 0,
                    },
                    {
                      title: 'Emerald Sky Penthouse',
                      loc: `${propFilterLocation} · AB Road Central`,
                      price: '₹1.65 Cr',
                      area: '3,100 sq.ft · ₹5,322/sq.ft',
                      floorPlan: '4 Bed + Study · Sky Terrace · Servant Room',
                      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
                      idx: 2,
                    },
                    {
                      title: 'Sapphire Commercial Plaza',
                      loc: `${propFilterLocation} · Vijay Nagar Square`,
                      price: '₹85 Lakh',
                      area: '1,400 sq.ft · ₹6,071/sq.ft',
                      floorPlan: 'Main Road Retail Frontage · 14ft Ceiling',
                      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
                      idx: 3,
                    },
                  ].map((prop) => (
                    <div
                      key={prop.title}
                      onClick={() => setActive360Room(prop.idx)}
                      className="rounded-3xl bg-white border border-zinc-200 hover:border-[#0B63F6] overflow-hidden shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <img
                          src={prop.img}
                          alt={prop.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono font-bold text-[#0B63F6]">
                              360° TOUR READY
                            </span>
                            <span className="font-display font-extrabold text-base text-zinc-900">
                              {prop.price}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-lg text-zinc-900">
                            {prop.title}
                          </h3>
                          <p className="text-xs text-zinc-500">{prop.loc}</p>
                          <div className="pt-2 border-t border-zinc-100 text-xs font-medium text-zinc-700">
                            <div>{prop.area}</div>
                            <div className="text-zinc-500 mt-0.5">{prop.floorPlan}</div>
                          </div>
                        </div>
                      </div>
                      <div className="px-5 pb-5">
                        <span className="w-full py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold flex items-center justify-center gap-1.5">
                          <span>Inspect in 360° Viewer</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section 4: Interactive EMI Calculator & Private Site Visit Booking Drawer */}
                <div
                  id="emi-360"
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4"
                >
                  <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-zinc-200 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B63F6]">
                      03 · HOME LOAN &amp; EMI CALCULATOR (8.65% P.A. · 20 YEARS)
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-zinc-700">
                        Loan Principal Amount:
                      </span>
                      <span className="font-display text-xl font-extrabold text-zinc-900">
                        ₹{loanAmountLakhs} Lakh
                      </span>
                    </div>
                    <input
                      type="range"
                      min={35}
                      max={250}
                      step={5}
                      value={loanAmountLakhs}
                      onChange={(e) => setLoanAmountLakhs(Number(e.target.value))}
                      className="w-full accent-[#0B63F6] cursor-pointer"
                    />
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-zinc-500">Estimated Monthly EMI</div>
                        <div className="font-display text-2xl font-extrabold text-[#0B63F6]">
                          ₹{monthlyEmi.toLocaleString('en-IN')} / month
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-700">
                        SBI / HDFC Approved
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 p-6 rounded-3xl bg-zinc-900 text-white space-y-4 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-[#34D399]">
                        04 · PRIVATE SITE VISIT &amp; WHATSAPP BROCHURE
                      </span>
                      <h3 className="font-display text-xl font-bold">
                        Schedule Private Visit for {rooms360[active360Room].fullTitle}
                      </h3>
                      <p className="text-xs text-zinc-300">
                        Get instant floor plan PDF + Google Maps location pin on your WhatsApp.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <select
                        value={visitDate}
                        onChange={(e) => {
                          setVisitDate(e.target.value);
                          setVisitBooked(false);
                        }}
                        className="px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-white/15 text-white"
                      >
                        <option>This Saturday, 11:30 AM</option>
                        <option>This Sunday, 4:00 PM</option>
                        <option>Tomorrow, 5:30 PM</option>
                      </select>
                      <input
                        type="text"
                        value={visitPhone}
                        onChange={(e) => {
                          setVisitPhone(e.target.value);
                          setVisitBooked(false);
                        }}
                        placeholder="Your WhatsApp Number (+91...)"
                        className="px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-white/15 text-white placeholder:text-zinc-400"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setVisitBooked(true)}
                      className="w-full py-3 rounded-xl bg-[#25D366] text-zinc-950 font-bold text-xs cursor-pointer"
                    >
                      {visitBooked
                        ? `✓ Private Visit Confirmed for ${visitDate} · Brochure Sent!`
                        : 'Schedule Private Visit & Get Brochure on WhatsApp'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 5: Client Footer */}
              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div>
                    <strong className="text-white">360° Views Spatial PropTech</strong> · Engineered by Sachin Sahu (SkyLine Digital Agency)
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://360views.services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#60A5FA] hover:underline font-semibold"
                    >
                      https://360views.services
                    </a>
                    <span>RERA Compliant Virtual Tours</span>
                  </div>
                </div>
              </footer>
            </div>
          )}

          {/* =================================================================
              2. A&A CHOCOLATES (https://aachocolates.in — Artisanal D2C Storefront)
             ================================================================= */}
          {currentId === 'aa-chocolates-d2c' && (
            <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-zinc-900">
              {/* Promo Bar */}
              <div className="px-4 py-2 bg-[#1C1412] text-amber-200 text-center text-xs font-medium">
                Handcrafted Belgian Couverture Truffles · Express Cold-Chain Pan-India Delivery · 1-Tap UPI Checkout
              </div>

              {/* Section 1: Client Store Navbar */}
              <header className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-amber-900/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#F59E0B] text-zinc-950 font-display font-black text-sm flex items-center justify-center">
                    A&amp;A
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-zinc-900">
                      A&amp;A ARTISAN CHOCOLATES
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Small-Batch Belgian Truffles &amp; Luxury Gift Hampers
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#aa-boxes" className="hover:text-amber-700">
                    Collections
                  </a>
                  <a href="#aa-customizer" className="hover:text-amber-700">
                    Custom Hamper Studio
                  </a>
                  <a href="#aa-reviews" className="hover:text-amber-700">
                    Corporate Gifting
                  </a>
                </nav>

                <a
                  href="#aa-cart-panel"
                  className="px-4 py-2 rounded-xl bg-[#1C1412] text-white text-xs font-bold flex items-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>
                    Cart ({cartItems.reduce((s, i) => s + i.qty, 0)}) · ₹
                    {cartTotal.toLocaleString('en-IN')}
                  </span>
                </a>
              </header>

              {/* Section 2: Storefront Hero */}
              <div className="relative bg-[#1C1412] text-white py-14 px-6 sm:px-12 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=1400&q=85"
                  alt="A&A Artisan Chocolates"
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />
                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#F59E0B]">
                      01 · SMALL-BATCH COUVERTURE · ZERO PRESERVATIVES
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                      Handcrafted Belgian Truffles &amp; Custom Gift Hampers Delivered Chilled Across India.
                    </h1>
                    <p className="text-sm text-zinc-200 max-w-xl">
                      Customize your 6, 12, or 24-piece luxury gift box with personalized satin ribbons and complete checkout in 10 seconds via 1-Tap UPI.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <a
                        href="#aa-customizer"
                        className="px-5 py-3 rounded-xl bg-[#F59E0B] text-zinc-950 font-bold text-xs sm:text-sm"
                      >
                        Build Custom Box ({boxSize})
                      </a>
                      <button
                        type="button"
                        onClick={() => addToChocolateCart('Royal Assorted Hamper', 1299)}
                        className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm cursor-pointer"
                      >
                        + Quick Add Royal Hamper (₹1,299)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Interactive Box Customizer, Product Grid & Slide-Out Cart / 1-Tap UPI Checkout */}
              <div
                id="aa-customizer"
                className="max-w-7xl mx-auto py-12 px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                <div className="lg:col-span-8 space-y-6">
                  {/* Box Size Selector */}
                  <div className="p-5 rounded-3xl bg-white border border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                        02 · SELECT YOUR GIFT BOX SIZE
                      </div>
                      <div className="font-display font-bold text-base text-zinc-900">
                        Custom Assorted Box Size: {boxSize}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {(['6-Piece', '12-Piece', '24-Piece'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setBoxSize(sz)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                            boxSize === sz
                              ? 'bg-[#1C1412] text-white'
                              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div id="aa-boxes" className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {[
                      {
                        name: 'Belgian Dark 70%',
                        price: 699,
                        tag: 'SINGLE-ORIGIN DARK GANACHE',
                        img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80',
                      },
                      {
                        name: 'Roasted Hazelnut Praline',
                        price: 899,
                        tag: 'PIEDMONT HAZELNUT & MILK',
                        img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
                      },
                      {
                        name: 'Royal Assorted Hamper',
                        price: 1299,
                        tag: '24-PIECE FESTIVE BOX + RIBBON',
                        img: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80',
                      },
                    ].map((prod) => (
                      <div
                        key={prod.name}
                        className="rounded-3xl bg-white border border-zinc-200 overflow-hidden flex flex-col justify-between shadow-xs"
                      >
                        <div>
                          <img
                            src={prod.img}
                            alt={prod.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4 space-y-1">
                            <div className="text-[10px] font-mono font-bold uppercase text-amber-700">
                              {prod.tag}
                            </div>
                            <h3 className="font-display font-bold text-base text-zinc-900">
                              {prod.name}
                            </h3>
                            <div className="font-display font-extrabold text-lg text-zinc-900">
                              ₹{prod.price}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 pt-0">
                          <button
                            type="button"
                            onClick={() => addToChocolateCart(prod.name, prod.price)}
                            className="w-full py-2.5 rounded-xl bg-[#1C1412] hover:bg-zinc-800 text-white text-xs font-bold cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Box (₹{prod.price})</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Section 4: Corporate Gifting & Cold-Chain Assurance */}
                  <div
                    id="aa-reviews"
                    className="p-6 rounded-3xl bg-white border border-zinc-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
                  >
                    <div>
                      <div className="font-bold text-amber-700">★★★★★ 4.9/5 Corporate Gifting</div>
                      <p className="text-zinc-600 mt-1">
                        "Ordered 45 corporate Diwali hampers — delivered chilled with custom gold-foil sleeves!"
                      </p>
                    </div>
                    <div>
                      <div className="font-bold text-emerald-700">1-Tap UPI Checkout</div>
                      <p className="text-zinc-600 mt-1">
                        Zero account password friction. Customers complete payment via GPay, PhonePe, or Paytm in 8 seconds.
                      </p>
                    </div>
                    <div>
                      <div className="font-bold text-[#0B63F6]">WhatsApp Cart Recovery</div>
                      <p className="text-zinc-600 mt-1">
                        Automated WhatsApp reminders recover abandoned gift boxes with a direct 1-tap checkout link.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Interactive Shopping Cart & 1-Tap UPI Checkout */}
                <div
                  id="aa-cart-panel"
                  className="lg:col-span-4 rounded-3xl bg-white border border-zinc-200 p-6 flex flex-col justify-between space-y-5 shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                      <div>
                        <h3 className="font-display font-bold text-base text-zinc-900">
                          Your Custom Gift Cart ({boxSize})
                        </h3>
                        <p className="text-[11px] text-zinc-500">
                          Includes complimentary ice-gel insulated packaging
                        </p>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700">
                        Free Shipping
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-56 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div
                          key={item.name}
                          className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-2 text-xs"
                        >
                          <div>
                            <div className="font-bold text-zinc-900">{item.name}</div>
                            <div className="text-zinc-500">
                              Qty: {item.qty} × ₹{item.price}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-900">
                              ₹{(item.qty * item.price).toLocaleString('en-IN')}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFromChocolateCart(item.name)}
                              className="p-1 text-zinc-400 hover:text-rose-600 cursor-pointer"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-zinc-200 space-y-2">
                      <div className="text-xs font-bold text-zinc-700">
                        Select 1-Tap UPI Payment App:
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(['GPay', 'PhonePe', 'Paytm'] as const).map((app) => (
                          <button
                            key={app}
                            type="button"
                            onClick={() => {
                              setSelectedUpiApp(app);
                              setCheckoutSuccess(false);
                            }}
                            className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                              selectedUpiApp === app
                                ? 'bg-[#0B63F6] text-white border-[#0B63F6]'
                                : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-zinc-200">
                    <div className="flex items-center justify-between font-display font-extrabold text-lg text-zinc-900">
                      <span>Total Payable</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCheckoutSuccess(true)}
                      className="w-full py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-zinc-950 font-bold text-xs sm:text-sm cursor-pointer shadow-sm"
                    >
                      {checkoutSuccess
                        ? `✓ Paid ₹${cartTotal.toLocaleString('en-IN')} via ${selectedUpiApp} · Tracking Sent on WhatsApp!`
                        : `Pay ₹${cartTotal.toLocaleString('en-IN')} via 1-Tap ${selectedUpiApp} UPI`}
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 5: Client Footer */}
              <footer className="mt-auto bg-[#1C1412] text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div>
                    <strong className="text-white">A&amp;A Artisan Chocolates</strong> · D2C Storefront &amp; 1-Tap UPI Engineered by SkyLine Digital Agency
                  </div>
                  <div>FSSAI Certified · Express Cold-Chain Delivery Across India</div>
                </div>
              </footer>
            </div>
          )}

          {/* =================================================================
              3. AURACARE CLINIC (https://auracareclinic.in — Healthcare & Dental Studio)
             ================================================================= */}
          {currentId === 'auracare-local' && (
            <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
              {/* Section 1: Clinic Navbar */}
              <header className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-zinc-900">
                      AuraCare Multispecialty &amp; Dental Studio
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Vijay Nagar, Indore · 4.9★ on Google Maps (420+ Verified Patient Reviews)
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#aura-treatments" className="hover:text-[#10B981]">
                    Treatments
                  </a>
                  <a href="#aura-treatments" className="hover:text-[#10B981]">
                    Our Specialists
                  </a>
                  <a href="#aura-reviews" className="hover:text-[#10B981]">
                    Patient Reviews (4.9★)
                  </a>
                </nav>

                <a
                  href="#aura-booker"
                  className="px-4 py-2 rounded-xl bg-[#10B981] text-zinc-950 text-xs font-bold"
                >
                  Book Appointment
                </a>
              </header>

              {/* Section 2: Clinic Hero & Google Maps Trust Bar */}
              <div className="bg-gradient-to-r from-[#09090B] via-[#111827] to-[#064E3B] text-white py-12 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-300">
                      01 · 4.9★ GOOGLE MAPS RATING · ZERO WAITING TIME
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                      Painless Dental &amp; Skin Care with Instant WhatsApp Slot Booking.
                    </h1>
                    <p className="text-sm text-zinc-200 max-w-xl">
                      Choose your treatment, pick a live consultation time slot, and receive instant appointment confirmation + Google Maps directions on your WhatsApp.
                    </p>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                      <div className="font-display text-2xl font-extrabold text-emerald-300">
                        420+
                      </div>
                      <div className="text-zinc-200 mt-1">5-Star Google Maps Patient Reviews</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                      <div className="font-display text-2xl font-extrabold text-white">
                        Under 30s
                      </div>
                      <div className="text-zinc-200 mt-1">Automated WhatsApp Slot Confirmation</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Interactive Appointment Booker & Treatments */}
              <div
                id="aura-booker"
                className="max-w-7xl mx-auto py-12 px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                <div id="aura-treatments" className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
                      02 · TRANSPARENT CLINICAL CARE · SELECT A TREATMENT
                    </div>
                    <h2 className="font-display text-2xl font-extrabold text-zinc-900 mt-1">
                      Specialized Treatments &amp; Lead Doctors
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        name: 'Root Canal / Dental Implant',
                        fee: '₹1,200 Consult',
                        doc: 'Dr. Ananya Verma (MDS)',
                        desc: 'Single-sitting painless microscopic root canal & digital 3D implant scan.',
                      },
                      {
                        name: 'Laser Skin Consultation',
                        fee: '₹800 Consult',
                        doc: 'Dr. Neha Bansal (MD Derm)',
                        desc: 'US-FDA approved hydra-facial, acne scar laser & pigmentation care.',
                      },
                      {
                        name: 'General Checkup',
                        fee: '₹500 Consult',
                        doc: 'Dr. Rajesh Kulkarni (MD)',
                        desc: 'Comprehensive family health screening, ECG & preventive diagnostics.',
                      },
                    ].map((tr) => {
                      const active = selectedTreatment === tr.name;
                      return (
                        <div
                          key={tr.name}
                          onClick={() => {
                            setSelectedTreatment(tr.name);
                            setSelectedDoctor(tr.doc);
                            setClinicBooked(false);
                          }}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                            active
                              ? 'bg-emerald-50/70 border-[#10B981] shadow-sm'
                              : 'bg-white border-zinc-200 hover:border-zinc-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono font-bold text-emerald-800">
                              {tr.fee}
                            </span>
                            {active && (
                              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                            )}
                          </div>
                          <h3 className="font-display font-bold text-sm text-zinc-900">
                            {tr.name}
                          </h3>
                          <div className="text-xs font-semibold text-zinc-700">{tr.doc}</div>
                          <p className="text-[11px] text-zinc-500 leading-relaxed">{tr.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Section 4: Digital Google Maps Review Automation Strip */}
                  <div
                    id="aura-reviews"
                    className="p-5 rounded-3xl bg-white border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                        <MapPin className="w-4 h-4 text-[#0B63F6]" />
                        <span>Automated Post-Visit WhatsApp Google Review Link</span>
                      </div>
                      <p className="text-xs text-zinc-500">
                        2 hours after consultation, patients receive a polite WhatsApp message with a direct 1-tap link to rate AuraCare on Google Maps.
                      </p>
                    </div>
                    <span className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 font-bold text-xs shrink-0">
                      ★ 4.9 Rating (420+ Reviews)
                    </span>
                  </div>
                </div>

                {/* Right: Live Appointment Slot Booker */}
                <div className="lg:col-span-5 rounded-3xl bg-white border border-zinc-200 p-6 space-y-4 shadow-md">
                  <div className="border-b border-zinc-200 pb-3">
                    <span className="text-[11px] font-mono font-bold text-[#10B981]">
                      03 · INSTANT WHATSAPP SLOT CONFIRMATION
                    </span>
                    <h3 className="font-display font-bold text-lg text-zinc-900">
                      Book Your Clinic Slot
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">
                        Selected Treatment
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={`${selectedTreatment} — ${selectedDoctor}`}
                        className="w-full p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 font-semibold text-zinc-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 mb-1.5">
                        Pick a Live Consultation Slot
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          'Today 5:30 PM',
                          'Today 7:00 PM',
                          'Tomorrow 11:00 AM',
                          'Tomorrow 4:30 PM',
                        ].map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedClinicSlot(slot);
                              setClinicBooked(false);
                            }}
                            className={`py-2.5 px-3 rounded-xl font-bold border cursor-pointer transition-all ${
                              selectedClinicSlot === slot
                                ? 'bg-[#0B63F6] text-white border-[#0B63F6]'
                                : 'bg-zinc-50 text-zinc-800 border-zinc-200'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-bold text-zinc-700 mb-1">
                          Patient Name
                        </label>
                        <input
                          type="text"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-zinc-700 mb-1">
                          WhatsApp Number
                        </label>
                        <input
                          type="text"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setClinicBooked(true)}
                      className="w-full py-3.5 rounded-2xl bg-[#25D366] text-zinc-950 font-bold text-xs sm:text-sm cursor-pointer"
                    >
                      {clinicBooked
                        ? `✓ Slot Confirmed (${selectedClinicSlot}) · WhatsApp Pass Sent!`
                        : `Confirm ${selectedClinicSlot} Appointment on WhatsApp`}
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 5: Clinic Footer */}
              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div>
                    <strong className="text-white">AuraCare Multispecialty &amp; Dental Studio</strong> · Local SEO &amp; WhatsApp Booking System by SkyLine Digital Agency
                  </div>
                  <div>Scheme No. 54, Vijay Nagar, Indore · Emergency: +91 86430 02478</div>
                </div>
              </footer>
            </div>
          )}

          {/* =================================================================
              4. FINVANTAGE SAAS (https://finvantage.in — B2B Cloud GST Billing & Cashflow SaaS Landing Page)
             ================================================================= */}
          {currentId === 'finvantage-saas' && (
            <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
              {/* Section 1: SaaS Product Navbar */}
              <header className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#0B63F6] text-white font-display font-black text-sm flex items-center justify-center">
                    FV
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-zinc-900">
                      FinVantage Cloud · GST &amp; Cashflow SaaS
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Multi-Tenant GST Billing, Razorpay Webhooks &amp; Automated WhatsApp Reminders
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#fv-studio" className="hover:text-[#0B63F6]">
                    Live GST Invoice Studio
                  </a>
                  <a href="#fv-ledger" className="hover:text-[#0B63F6]">
                    Multi-Tenant Ledger
                  </a>
                  <a href="#fv-pricing" className="hover:text-[#0B63F6]">
                    Transparent Pricing
                  </a>
                </nav>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Export Sample GSTR-1 PDF</span>
                </button>
              </header>

              {/* Section 2: B2B Fintech SaaS Hero */}
              <div className="bg-[#09090B] text-white py-14 px-6 sm:px-12 border-b border-white/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#60A5FA]">
                      01 · MULTI-TENANT B2B FINTECH · POSTGRESQL RLS ISOLATION
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                      Automate 18% GST Invoicing, 1-Tap UPI Recon &amp; Payment Reminders.
                    </h1>
                    <p className="text-sm text-zinc-300 max-w-xl">
                      Built for Indian distributors, agencies, and growing SMBs. Generate compliant CGST/SGST tax invoices in 10 seconds and reconcile incoming UPI payments automatically via server-verified webhooks.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <a
                        href="#fv-studio"
                        className="px-5 py-3 rounded-xl bg-[#0B63F6] text-white font-bold text-xs sm:text-sm"
                      >
                        Try Live 18% GST Calculator &amp; Ledger
                      </a>
                      <a
                        href="#fv-pricing"
                        className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm"
                      >
                        Compare SMB Plans
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10">
                      <div className="text-zinc-400">Monthly Billed Volume</div>
                      <div className="font-display text-2xl font-extrabold text-white mt-1">
                        ₹4,82,500
                      </div>
                      <div className="text-[11px] text-[#34D399] font-semibold mt-1">
                        18% CGST/SGST Auto-Split
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10">
                      <div className="text-zinc-400">Settled via UPI Webhooks</div>
                      <div className="font-display text-2xl font-extrabold text-[#60A5FA] mt-1">
                        ₹4,61,260
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-1">
                        Zero Manual Bank CSV Matching
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Interactive Live 18% GST Invoice Studio & Multi-Tenant Ledger */}
              <div id="fv-studio" className="max-w-7xl mx-auto py-12 px-6 sm:px-12 space-y-8">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 space-y-5 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B63F6]">
                        02 · INTERACTIVE GST TAX INVOICE GENERATOR
                      </div>
                      <h2 className="font-display font-extrabold text-xl text-zinc-900 mt-1">
                        Create &amp; Dispatch a 18% GST Invoice
                      </h2>
                    </div>
                    <span className="text-xs font-mono font-semibold text-zinc-600">
                      18% GST = ₹{Math.round(invoiceBaseAmount * 0.18).toLocaleString('en-IN')} · Total = ₹
                      {Math.round(invoiceBaseAmount * 1.18).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <input
                      type="text"
                      value={invoiceClient}
                      onChange={(e) => setInvoiceClient(e.target.value)}
                      placeholder="Client / Enterprise Name"
                      className="p-3 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 font-medium"
                    />
                    <input
                      type="number"
                      value={invoiceBaseAmount}
                      onChange={(e) => setInvoiceBaseAmount(Number(e.target.value) || 0)}
                      placeholder="Taxable Base Amount (₹)"
                      className="p-3 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 font-medium"
                    />
                    <button
                      type="button"
                      onClick={handleAddInvoice}
                      className="py-3 px-4 rounded-xl bg-[#0B63F6] hover:bg-[#1D4ED8] text-white font-bold cursor-pointer"
                    >
                      + Generate &amp; Dispatch GST Invoice
                    </button>
                  </div>

                  {/* Live Ledger Table */}
                  <div id="fv-ledger" className="rounded-2xl border border-zinc-200 overflow-hidden">
                    <div className="px-5 py-3.5 bg-zinc-50 border-b border-zinc-200 font-display font-bold text-xs text-zinc-900 flex items-center justify-between">
                      <span>Live Multi-Tenant GST Invoice Ledger</span>
                      <span className="font-mono text-[11px] text-zinc-500">GSTIN: 23AABCF4821M1Z5</span>
                    </div>
                    <div className="divide-y divide-zinc-200 text-xs">
                      {invoicesList.map((inv) => (
                        <div
                          key={inv.id}
                          className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3"
                        >
                          <div>
                            <span className="font-mono font-bold text-zinc-900">{inv.id}</span>
                            <span className="mx-2 text-zinc-400">·</span>
                            <span className="font-bold text-zinc-800">{inv.client}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4">
                            <span className="text-zinc-500">
                              Taxable: ₹{inv.base.toLocaleString('en-IN')} + 18% GST: ₹
                              {inv.gst.toLocaleString('en-IN')}
                            </span>
                            <span className="font-display font-extrabold text-sm text-zinc-900">
                              ₹{inv.total.toLocaleString('en-IN')}
                            </span>
                            <span className="font-mono font-bold text-[11px] text-emerald-700">
                              {inv.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 4: Transparent Indian SMB SaaS Pricing Tiers */}
                <div id="fv-pricing" className="space-y-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B63F6]">
                        03 · BUILT FOR INDIAN BUSINESSES
                      </div>
                      <h2 className="font-display text-2xl font-extrabold text-zinc-900 mt-1">
                        Simple, Predictable GST Billing Plans
                      </h2>
                    </div>
                    <div className="inline-flex p-1 rounded-xl bg-zinc-200 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setFinBillingCycle('monthly')}
                        className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                          finBillingCycle === 'monthly' ? 'bg-white text-zinc-900' : 'text-zinc-600'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => setFinBillingCycle('annual')}
                        className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                          finBillingCycle === 'annual' ? 'bg-white text-zinc-900' : 'text-zinc-600'
                        }`}
                      >
                        Annual (Save 20%)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        tier: 'Starter SMB',
                        price: finBillingCycle === 'annual' ? '₹799/mo' : '₹999/mo',
                        desc: 'For solo founders, consultants, and retail shops.',
                        features: 'Unlimited 18% GST Invoices · 1-Tap UPI Links · GSTR-1 CSV Export',
                      },
                      {
                        tier: 'Growth Business',
                        price: finBillingCycle === 'annual' ? '₹1,999/mo' : '₹2,499/mo',
                        desc: 'For growing agencies, clinics, and regional distributors.',
                        features: 'Multi-User RBAC · Automated WhatsApp Payment Reminders · CA Audit Portal',
                      },
                      {
                        tier: 'Enterprise Multi-Branch',
                        price: 'Custom License',
                        desc: 'Dedicated database isolation & custom ERP integrations.',
                        features: 'Multi-GSTIN Branches · Webhook API Access · Dedicated SLA Support',
                      },
                    ].map((plan) => (
                      <div
                        key={plan.tier}
                        className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="font-display font-bold text-lg text-zinc-900">
                            {plan.tier}
                          </div>
                          <div className="font-display font-extrabold text-2xl text-[#0B63F6]">
                            {plan.price}
                          </div>
                          <p className="text-xs text-zinc-500">{plan.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-zinc-100 text-xs text-zinc-700 font-medium">
                          {plan.features}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <strong className="text-white">FinVantage Cloud SaaS</strong> · Engineered by Sachin Sahu &amp; Aashif Khan (SkyLine Digital Agency)
                </div>
                <div>PostgreSQL Row-Level Security · Automated GSTR-1 &amp; UPI Recon</div>
              </footer>
            </div>
          )}

          {/* =================================================================
              5. NEXAPROP WHATSAPP AI & CRM (https://nexaprop.in — Conversational PropTech Landing Page)
             ================================================================= */}
          {currentId === 'nexaprop-crm' && (
            <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
              {/* Section 1: NexaProp Brand Navbar */}
              <header className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#25D366] text-zinc-950 font-display font-black text-sm flex items-center justify-center">
                    NP
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-zinc-900">
                      NexaProp · WhatsApp Cloud AI for Builders
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      24/7 Brochure Dispatch, Site-Visit Scheduling &amp; Sales Advisor Routing
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#nexa-live-bot" className="hover:text-[#059669]">
                    Live WhatsApp Bot Demo
                  </a>
                  <a href="#nexa-pipeline" className="hover:text-[#059669]">
                    Lead Routing Pipeline
                  </a>
                </nav>

                <a
                  href="#nexa-live-bot"
                  className="px-4 py-2 rounded-xl bg-[#09090B] text-white text-xs font-bold"
                >
                  Test Live Bot
                </a>
              </header>

              {/* Section 2: Conversational PropTech Hero */}
              <div className="bg-gradient-to-br from-[#071A12] via-[#09090B] to-[#0B1F17] text-white py-14 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#34D399]">
                      01 · OFFICIAL META WHATSAPP CLOUD API · REAL ESTATE CRM
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                      Turn Every Facebook &amp; Google Property Lead into a Confirmed Weekend Site Visit.
                    </h1>
                    <p className="text-sm text-zinc-300 max-w-xl">
                      Buyers don't wait 6 hours for a callback. NexaProp replies on WhatsApp in 2 seconds with RERA floor plans, pricing sheets, and an interactive weekend site-visit calendar.
                    </p>
                  </div>
                  <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="font-display text-2xl font-extrabold text-[#34D399]">
                        Under 3s
                      </div>
                      <div className="text-zinc-300 mt-1">Instant Brochure &amp; Price Sheet Reply</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="font-display text-2xl font-extrabold text-white">
                        24/7
                      </div>
                      <div className="text-zinc-300 mt-1">Automated Lead Qualification &amp; Alerts</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Live Interactive WhatsApp Simulator & Property Trigger Studio */}
              <div id="nexa-live-bot" className="max-w-7xl mx-auto py-12 px-6 sm:px-12 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className="lg:col-span-7 rounded-3xl bg-white border border-zinc-200 p-6 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                        <div>
                          <div className="text-xs font-mono font-bold text-[#059669]">
                            02 · INTERACTIVE BUYER TRIGGER STUDIO
                          </div>
                          <div className="font-display font-extrabold text-base text-zinc-900">
                            SkyLine One Luxury 3BHK &amp; 4BHK Residences
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-700">
                          Meta Cloud API Connected
                        </span>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1000&q=80"
                        alt="SkyLine One Residences"
                        className="w-full h-52 object-cover rounded-2xl"
                      />
                      <p className="text-xs sm:text-sm text-zinc-600">
                        Click any buyer action below to watch the live WhatsApp bot respond on the right:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => triggerNexaAction('brochure')}
                          className="py-3 px-3 rounded-xl bg-[#0B63F6] text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Send PDF Brochure</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => triggerNexaAction('visit')}
                          className="py-3 px-3 rounded-xl bg-zinc-900 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Site Visit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => triggerNexaAction('price')}
                          className="py-3 px-3 rounded-xl bg-zinc-100 text-zinc-900 font-bold text-xs cursor-pointer"
                        >
                          Check 3BHK Price
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-700">
                        Need instant human sales advisor takeover?
                      </span>
                      <button
                        type="button"
                        onClick={() => setNexaHandoverActive((prev) => !prev)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold cursor-pointer"
                      >
                        {nexaHandoverActive
                          ? '✓ Connected to Senior Sales Advisor'
                          : 'Simulate Human Handover'}
                      </button>
                    </div>
                  </div>

                  {/* Live WhatsApp Phone Frame */}
                  <div className="lg:col-span-5 rounded-3xl bg-[#0B141A] text-white border-4 border-zinc-800 overflow-hidden flex flex-col justify-between shadow-xl">
                    <div className="px-4 py-3.5 bg-[#1F2C34] flex items-center gap-2.5">
                      <WhatsAppBrandBadge size="sm" />
                      <div>
                        <div className="text-xs font-bold text-white">
                          NexaProp Official Bot
                        </div>
                        <div className="text-[10px] text-[#34D399]">
                          {nexaHandoverActive
                            ? 'Human Sales Advisor Active'
                            : '24/7 Automated Lead Qualification'}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-3 max-h-80 overflow-y-auto flex-1">
                      {nexaChatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${
                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`px-3.5 py-2.5 rounded-2xl text-xs max-w-[85%] ${
                              msg.sender === 'user'
                                ? 'bg-[#005C4B] text-white'
                                : 'bg-[#1F2C34] text-zinc-100'
                            }`}
                          >
                            <div>{msg.text}</div>
                            <div className="text-[9px] text-zinc-400 text-right mt-1">
                              {msg.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 4: 3-Step Lead Routing Architecture */}
                <div id="nexa-pipeline" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      step: '01 · INSTANT CAPTURE',
                      title: 'Meta Ad & Website Webhook Sync',
                      desc: 'The moment a buyer clicks your Instagram/Facebook ad or website button, NexaProp initiates a verified WhatsApp conversation.',
                    },
                    {
                      step: '02 · QUALIFICATION',
                      title: 'Budget, BHK & Timeline Tagging',
                      desc: 'Interactive WhatsApp buttons capture whether the buyer wants a 3BHK, 4BHK, or commercial unit without manual cold-calling.',
                    },
                    {
                      step: '03 · SALES CLOSING',
                      title: 'Instant Closer Alert & Calendar Lock',
                      desc: 'High-intent site visits are assigned to your senior sales manager with one-tap CRM stage tracking.',
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-2"
                    >
                      <div className="text-xs font-mono font-bold text-[#059669]">{item.step}</div>
                      <h3 className="font-display font-bold text-base text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <strong className="text-white">NexaProp WhatsApp AI &amp; CRM</strong> · Engineered by Sachin Sahu (SkyLine Digital Agency)
                </div>
                <div>Official WhatsApp Cloud API · Real Estate Lead Automation</div>
              </footer>
            </div>
          )}

          {/* =================================================================
              6. FILEGUARD AI (https://fileguard.ai — Zero-Trust Document Verification Landing Page)
             ================================================================= */}
          {currentId === 'fileguard-security' && (
            <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
              {/* Section 1: FileGuard Security Navbar */}
              <header className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#09090B] text-[#10B981] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-zinc-900">
                      FileGuard AI · Cryptographic Contract Verifier
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      SHA-256 Document Integrity, Tamper Detection &amp; Zero-Trust AST Scanning
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#fg-tamper-lab" className="hover:text-[#0B63F6]">
                    Live SHA-256 Tamper Lab
                  </a>
                  <a href="#fg-architecture" className="hover:text-[#0B63F6]">
                    Zero-Trust Pipeline
                  </a>
                </nav>

                <span className="text-xs font-mono font-bold text-emerald-700">
                  OriginStamp Ledger Active
                </span>
              </header>

              {/* Section 2: Enterprise Cybersecurity Hero */}
              <div className="bg-[#09090B] text-white py-14 px-6 sm:px-12 border-b border-white/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#34D399]">
                      01 · CRYPTOGRAPHIC DOCUMENT INTEGRITY · OWASP &amp; AGENTSHIELD HARDENED
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                      Detect Unauthorized Contract Edits &amp; Forged PDFs in Real Time.
                    </h1>
                    <p className="text-sm text-zinc-300 max-w-2xl">
                      Built for legal teams, real estate registries, and financial institutions. FileGuard anchors every signed agreement to a cryptographic SHA-256 digest so even a single character edit triggers an instant tamper alert.
                    </p>
                  </div>
                  <div className="lg:col-span-4 p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-2 text-xs font-mono">
                    <div className="text-[#34D399] font-bold">VERIFICATION ENGINE</div>
                    <div className="text-zinc-300">Algorithm: SHA-256 + Merkle Proof</div>
                    <div className="text-zinc-400">MIME Guard: Strict PDF/DOCX Allowlist</div>
                  </div>
                </div>
              </div>

              {/* Section 3: Live Interactive SHA-256 Document Tamper Lab */}
              <div id="fg-tamper-lab" className="max-w-7xl mx-auto py-12 px-6 sm:px-12 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-zinc-200 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-mono font-bold text-[#0B63F6]">
                          02 · INTERACTIVE SHA-256 TAMPER INSPECTOR
                        </div>
                        <h2 className="font-display font-bold text-lg text-zinc-900 mt-1">
                          Edit Contract Payload Below to Test Tamper Detection
                        </h2>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                          tamperedMode
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {tamperedMode
                          ? 'ALERT · HASH MISMATCH DETECTED'
                          : '✓ VERIFIED AUTHENTIC SIGNATURE'}
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={docContent}
                      onChange={(e) => {
                        setDocContent(e.target.value);
                        setTamperedMode(true);
                      }}
                      className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-300 text-xs font-mono text-zinc-900"
                    />
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setDocContent(
                            'Commercial Lease Agreement #IND-2026-884 · Monthly Rent: ₹65,000 · Signed by Both Parties'
                          );
                          setTamperedMode(false);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[#0B63F6] text-white text-xs font-bold cursor-pointer"
                      >
                        Restore Original Signed Contract
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDocContent(
                            'Commercial Lease Agreement #IND-2026-884 · Monthly Rent: ₹95,000 · Signed by Both Parties'
                          );
                          setTamperedMode(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold cursor-pointer"
                      >
                        Simulate Unauthorized Rent Alteration
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-zinc-200 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                        CRYPTOGRAPHIC AUDIT LEDGER
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-950 text-emerald-300 border border-zinc-800 font-mono text-xs break-all">
                        {tamperedMode
                          ? '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08 (TAMPERED DIGEST)'
                          : 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 (VERIFIED DIGEST)'}
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Anchored to OriginStamp Ledger Block #19482104 · Strict MIME &amp; Macro Sanitization prevents malicious SVG/HTML payload execution.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-700">
                      Lead Security Architect: <strong>Aashif Khan</strong>
                    </div>
                  </div>
                </div>

                {/* Section 4: 3-Pillar Security Architecture */}
                <div id="fg-architecture" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      code: '01 · ZERO-TRUST INGESTION',
                      title: 'Strict MIME & Payload Sanitization',
                      desc: 'Blocks disguised executable uploads, embedded PDF scripts, and XXE injection vectors before storage.',
                    },
                    {
                      code: '02 · IMMUTABLE PROOF',
                      title: 'SHA-256 & Merkle Tree Anchoring',
                      desc: 'Generates deterministic cryptographic certificates so clients can verify document authenticity without exposing private contents.',
                    },
                    {
                      code: '03 · RBAC AUDIT TRAIL',
                      title: 'Per-Tenant Access & Download Logs',
                      desc: 'Every view, signature verification, and download is logged with IP, timestamp, and role-based tenant isolation.',
                    },
                  ].map((item) => (
                    <div
                      key={item.code}
                      className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-2"
                    >
                      <div className="text-xs font-mono font-bold text-[#0B63F6]">{item.code}</div>
                      <h3 className="font-display font-bold text-base text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <strong className="text-white">FileGuard AI · Zero-Trust Verifier</strong> · Engineered by Aashif Khan (SkyLine Digital Agency)
                </div>
                <div>SHA-256 Cryptographic Verification · OWASP Top 10 Compliant</div>
              </footer>
            </div>
          )}

          {/* =================================================================
              7. GRIDWEAVER IOT (https://gridweaver.io — Smart Microgrid & CleanTech Landing Page)
             ================================================================= */}
          {currentId === 'gridweaver-iot' && (
            <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
              {/* Section 1: GridWeaver CleanTech Navbar */}
              <header className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#0B63F6] text-white flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-zinc-900">
                      GridWeaver · Smart Microgrid &amp; Energy Telemetry
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Java 21 Project Loom Virtual Threads · Apache Kafka · Industrial Solar GIS
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#gw-substation" className="hover:text-[#0B63F6]">
                    Live Substation Control
                  </a>
                  <a href="#gw-architecture" className="hover:text-[#0B63F6]">
                    Java 21 + Kafka Architecture
                  </a>
                </nav>

                <button
                  type="button"
                  onClick={() =>
                    setVirtualThreadLoad((prev) => (prev >= 50000 ? 12400 : 50000))
                  }
                  className="px-4 py-2 rounded-xl bg-[#0B63F6] text-white text-xs font-bold cursor-pointer"
                >
                  {virtualThreadLoad >= 50000
                    ? 'Reset Thread Load (12.4k)'
                    : 'Simulate 50k Telemetry Spike'}
                </button>
              </header>

              {/* Section 2: CleanTech Industrial Hero */}
              <div className="bg-gradient-to-r from-[#09090B] via-[#0F172A] to-[#1E3A8A] text-white py-14 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#60A5FA]">
                      01 · INDUSTRIAL IOT &amp; SOLAR MICROGRID GIS · JAVA 21 LOOM
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                      Real-Time Substation Telemetry &amp; Automated Grid Load Balancing.
                    </h1>
                    <p className="text-sm text-zinc-200 max-w-xl">
                      Engineered for solar parks, industrial feeders, and EV charging networks. Ingest tens of thousands of concurrent inverter streams over Java 21 virtual threads and Apache Kafka.
                    </p>
                  </div>
                  <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-5 rounded-2xl bg-white/10 border border-white/15">
                      <div className="font-display text-2xl font-extrabold text-[#34D399]">
                        {virtualThreadLoad.toLocaleString('en-IN')}
                      </div>
                      <div className="text-zinc-200 mt-1">Concurrent Java 21 Virtual Threads</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/10 border border-white/15">
                      <div className="font-display text-2xl font-extrabold text-white">
                        1,925 kW
                      </div>
                      <div className="text-zinc-200 mt-1">Active Regional Feeder Output</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Interactive Regional Substation Control Matrix */}
              <div id="gw-substation" className="max-w-7xl mx-auto py-12 px-6 sm:px-12 space-y-10">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B63F6]">
                        02 · INTERACTIVE REGIONAL SUBSTATION CONTROL
                      </div>
                      <h2 className="font-display text-2xl font-extrabold text-zinc-900 mt-1">
                        Switch Feeder Nodes Between Charging, Discharging &amp; Fault Isolation
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {gridNodes.map((node, idx) => (
                      <div
                        key={node.id}
                        className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-display font-bold text-base text-zinc-900">
                              {node.name}
                            </h3>
                            <p className="text-xs font-mono text-zinc-500">
                              {node.id} · {node.zone}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                              node.state === 'FAULT'
                                ? 'bg-rose-100 text-rose-700'
                                : node.state === 'CHARGING'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-zinc-900 text-white'
                            }`}
                          >
                            {node.state}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-zinc-700 pt-1">
                          <span>
                            Feeder Load: <strong>{node.kw} kW</strong>
                          </span>
                          <span>
                            Battery Storage SoC: <strong>{node.soc}%</strong>
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {(['CHARGING', 'DISCHARGING', 'IDLE', 'FAULT'] as const).map(
                            (st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={() =>
                                  setGridNodes((prev) =>
                                    prev.map((n, i) =>
                                      i === idx ? { ...n, state: st } : n
                                    )
                                  )
                                }
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                                  node.state === st
                                    ? 'bg-[#0B63F6] text-white'
                                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                                }`}
                              >
                                {st}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Hardware-to-Cloud Architecture Grid */}
                <div id="gw-architecture" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      code: '01 · EDGE INGESTION',
                      title: 'Java 21 Virtual Thread Collectors',
                      desc: 'Handles thousands of non-blocking inverter and smart-meter socket connections without OS thread exhaustion.',
                    },
                    {
                      code: '02 · EVENT BACKBONE',
                      title: 'Apache Kafka Telemetry Partitions',
                      desc: 'Buffers regional substation events by feeder ID for real-time anomaly detection and replayable audit logs.',
                    },
                    {
                      code: '03 · GIS DISPATCH',
                      title: 'Automated Fault Isolation',
                      desc: 'Instantly reroutes power loads across neighboring microgrid reserves when an industrial feeder reports a fault.',
                    },
                  ].map((item) => (
                    <div
                      key={item.code}
                      className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-2"
                    >
                      <div className="text-xs font-mono font-bold text-[#0B63F6]">{item.code}</div>
                      <h3 className="font-display font-bold text-base text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <strong className="text-white">GridWeaver Smart Microgrid Platform</strong> · Engineered by Sachin Sahu (SkyLine Digital Agency)
                </div>
                <div>Java 21 Project Loom · Apache Kafka · TimescaleDB</div>
              </footer>
            </div>
          )}

          {/* =================================================================
              8. SHADOWBASE CDC (https://shadowbase.dev — Zero-Downtime SQL DevTools Landing Page)
             ================================================================= */}
          {currentId === 'shadowbase-cdc' && (
            <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
              {/* Section 1: ShadowBase DevTools Navbar */}
              <header className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#09090B] text-[#60A5FA] flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-zinc-900">
                      ShadowBase · Zero-Downtime SQL Migration Studio
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Debezium WAL Change Data Capture · Testcontainers · 0ms Table Lock Cutover
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#sb-sandbox" className="hover:text-[#0B63F6]">
                    Interactive Migration Sandbox
                  </a>
                  <a href="#sb-workflow" className="hover:text-[#0B63F6]">
                    How Zero-Lock Cutover Works
                  </a>
                </nav>

                <span className="px-3 py-1.5 rounded-xl bg-zinc-900 text-emerald-300 font-mono text-xs">
                  $ npx shadowbase verify --pg16
                </span>
              </header>

              {/* Section 2: Developer Infrastructure Hero */}
              <div className="bg-[#09090B] text-white py-14 px-6 sm:px-12 border-b border-white/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#60A5FA]">
                      01 · DATABASE RELIABILITY ENGINEERING · DEBEZIUM + TESTCONTAINERS
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                      Run High-Risk PostgreSQL Schema Migrations with Zero Production Table Locks.
                    </h1>
                    <p className="text-sm text-zinc-300 max-w-xl">
                      Never bring down checkout during an `ALTER TABLE` again. ShadowBase provisions an isolated shadow container, streams live WAL changes via Debezium CDC, verifies row-hash parity, and executes atomic cutover.
                    </p>
                  </div>
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-2 font-mono text-xs">
                    <div className="text-zinc-400"># Live CDC Replication Status</div>
                    <div className="text-emerald-300">
                      ✓ {shadowRowsSynced.toLocaleString('en-IN')} WAL Events Replayed
                    </div>
                    <div className="text-zinc-300">Production Lock Duration: 0.00 ms</div>
                  </div>
                </div>
              </div>

              {/* Section 3: Interactive SQL Migration & CDC Replay Sandbox */}
              <div id="sb-sandbox" className="max-w-7xl mx-auto py-12 px-6 sm:px-12 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 p-6 rounded-3xl bg-[#09090B] text-white space-y-4">
                    <div className="text-xs font-mono font-bold text-[#60A5FA]">
                      02 · SELECT SQL MIGRATION TO REPLAY ON ISOLATED SHADOW CONTAINER
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'V14__add_gst_invoice_index.sql',
                        'V15__partition_orders_by_month.sql',
                      ].map((script, idx) => (
                        <button
                          key={script}
                          type="button"
                          onClick={() => {
                            setSelectedMigrationIdx(idx);
                            setMigrationVerified(true);
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-mono cursor-pointer ${
                            selectedMigrationIdx === idx
                              ? 'bg-[#0B63F6] text-white'
                              : 'bg-white/10 text-zinc-300'
                          }`}
                        >
                          {script}
                        </button>
                      ))}
                    </div>
                    <pre className="p-4 rounded-2xl bg-black/60 text-xs font-mono text-emerald-300 overflow-x-auto">
                      {selectedMigrationIdx === 0
                        ? 'CREATE INDEX CONCURRENTLY idx_invoices_gstin\nON invoices (customer_gstin, invoice_date)\nWHERE status = \'PAID\';'
                        : "ALTER TABLE customer_orders\nATTACH PARTITION orders_2026_11\nFOR VALUES FROM ('2026-11-01') TO ('2026-12-01');"}
                    </pre>
                  </div>

                  <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-zinc-200 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold text-[#0B63F6]">
                        03 · PARITY VERIFICATION GATE
                      </div>
                      <h3 className="font-display font-bold text-base text-zinc-900">
                        Debezium CDC + Testcontainers Verification
                      </h3>
                      <p className="text-xs text-zinc-600">
                        Replays live production mutations against a disposable PostgreSQL 16 container with 0ms production table lock time.
                      </p>
                      {migrationVerified && (
                        <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-mono font-bold">
                          ✓ 0ms Lock Time · {shadowRowsSynced.toLocaleString('en-IN')} Rows Checksum Verified
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setMigrationVerified(true);
                        setShadowRowsSynced((prev) => prev + 1250);
                      }}
                      className="w-full py-3 rounded-xl bg-[#0B63F6] hover:bg-[#1D4ED8] text-white font-bold text-xs cursor-pointer"
                    >
                      Run Kafka + Debezium CDC ReplayBatch (+1,250 Rows)
                    </button>
                  </div>
                </div>

                {/* Section 4: 3-Step Zero-Downtime Cutover Workflow */}
                <div id="sb-workflow" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      step: '01 · SHADOW CLONE',
                      title: 'Ephemeral Testcontainers Provisioning',
                      desc: 'Spins up an isolated PostgreSQL 16 container mirroring your production schema before applying DDL changes.',
                    },
                    {
                      step: '02 · WAL STREAMING',
                      title: 'Debezium CDC Dual-Write Sync',
                      desc: 'Streams live INSERT, UPDATE, and DELETE transactions from primary WAL so the shadow table never falls behind.',
                    },
                    {
                      step: '03 · ATOMIC CUTOVER',
                      title: 'Row-Hash Parity & Pointer Swap',
                      desc: 'Verifies CRC32 row checksums across both tables before swapping connection pool routing with zero downtime.',
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-2"
                    >
                      <div className="text-xs font-mono font-bold text-[#0B63F6]">{item.step}</div>
                      <h3 className="font-display font-bold text-base text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <strong className="text-white">ShadowBase · Zero-Downtime SQL Studio</strong> · Engineered by Sachin Sahu (SkyLine Digital Agency)
                </div>
                <div>PostgreSQL 16 · Debezium CDC · Docker Testcontainers</div>
              </footer>
            </div>
          )}

          {/* =================================================================
              9. AI CAREER MENTOR (https://aicareerguide.in — EdTech & Mock Viva Landing Page)
             ================================================================= */}
          {currentId === 'ai-career-mentor' && (
            <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
              {/* Section 1: EdTech Navbar */}
              <header className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#0B63F6] text-white flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-zinc-900">
                      AI Career Guide &amp; Engineering Viva Lab
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Personalized Skill Roadmaps, System Design Defense &amp; Mock Viva Engine
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#ac-roadmap" className="hover:text-[#0B63F6]">
                    Interactive Track Roadmap
                  </a>
                  <a href="#ac-viva" className="hover:text-[#0B63F6]">
                    Live Mock Viva Lab
                  </a>
                </nav>

                <a
                  href="#ac-roadmap"
                  className="px-4 py-2 rounded-xl bg-[#09090B] text-white text-xs font-bold"
                >
                  Explore Tracks
                </a>
              </header>

              {/* Section 2: EdTech Hero */}
              <div className="bg-gradient-to-r from-[#09090B] via-[#1E1B4B] to-[#0F172A] text-white py-14 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#60A5FA]">
                      01 · OUTCOME-DRIVEN ENGINEERING MENTORSHIP · RAG VIVA ENGINE
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                      Master Production System Design &amp; Ace Technical Interviews with Live AI Viva.
                    </h1>
                    <p className="text-sm text-zinc-200 max-w-2xl">
                      Stop watching passive tutorial playlists. Pick your engineering track, complete weekly architecture sprints, and defend your code decisions in an interactive technical viva.
                    </p>
                  </div>
                  <div className="lg:col-span-4 p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2 text-xs">
                    <div className="font-mono font-bold text-[#34D399]">TRACK COMPLETION</div>
                    <div className="font-display text-2xl font-extrabold text-white">
                      {completedWeeks.length} / 3 Sprints Done
                    </div>
                    <div className="text-zinc-300">Active Track: {selectedCareerTrack}</div>
                  </div>
                </div>
              </div>

              {/* Section 3: Interactive Career Track Selector & Weekly Sprint Checklist */}
              <div id="ac-roadmap" className="max-w-7xl mx-auto py-12 px-6 sm:px-12 space-y-10">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B63F6]">
                        02 · SELECT YOUR ENGINEERING SPECIALIZATION
                      </div>
                      <h2 className="font-display text-2xl font-extrabold text-zinc-900 mt-1">
                        Interactive 3-Sprint Production Curriculum
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          'Full-Stack Next.js',
                          'Java 21 & Kafka',
                          'AI & Cybersecurity',
                        ] as const
                      ).map((tr) => (
                        <button
                          key={tr}
                          type="button"
                          onClick={() => {
                            setSelectedCareerTrack(tr);
                            setVivaAnswerSubmitted(false);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                            selectedCareerTrack === tr
                              ? 'bg-[#0B63F6] text-white'
                              : 'bg-white border border-zinc-200 text-zinc-700'
                          }`}
                        >
                          {tr}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {[
                      {
                        week: 1,
                        title: `Foundations of ${selectedCareerTrack}`,
                        task: 'System Architecture, Strict Schema Validation & Clean Domain Modeling',
                      },
                      {
                        week: 2,
                        title: 'Authentication, RBAC & AppSec',
                        task: 'JWT Sessions, Row-Level Security, Rate Limiting & OWASP Hardening',
                      },
                      {
                        week: 3,
                        title: 'Cloud Deployment & Live Mock Viva',
                        task: 'Docker CI/CD Pipeline & Interactive System Architecture Defense',
                      },
                    ].map((mod) => {
                      const done = completedWeeks.includes(mod.week);
                      return (
                        <div
                          key={mod.week}
                          onClick={() =>
                            setCompletedWeeks((prev) =>
                              prev.includes(mod.week)
                                ? prev.filter((w) => w !== mod.week)
                                : [...prev, mod.week]
                            )
                          }
                          className="p-6 rounded-3xl bg-white border border-zinc-200 hover:border-[#0B63F6] cursor-pointer space-y-2 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-[#0B63F6]">
                              SPRINT 0{mod.week}
                            </span>
                            <span
                              className={`text-[11px] font-mono font-bold ${
                                done ? 'text-emerald-700' : 'text-zinc-500'
                              }`}
                            >
                              {done ? '✓ COMPLETED' : 'CLICK TO COMPLETE'}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-base text-zinc-900">
                            {mod.title}
                          </h3>
                          <p className="text-xs text-zinc-600 leading-relaxed">{mod.task}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 4: Interactive Mock Viva Simulator */}
                <div
                  id="ac-viva"
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  <div className="lg:col-span-8 space-y-2">
                    <div className="text-xs font-mono font-bold text-[#0B63F6]">
                      03 · LIVE TECHNICAL VIVA CHALLENGE ({selectedCareerTrack.toUpperCase()})
                    </div>
                    <h3 className="font-display font-bold text-lg text-zinc-900">
                      "How do you prevent race conditions and double-charging during a high-concurrency payment webhook callback?"
                    </h3>
                    <p className="text-xs text-zinc-600">
                      {vivaAnswerSubmitted
                        ? '✓ AI Rubric Evaluation (9.4/10): Strong explanation of idempotency keys, HMAC signature verification, and atomic database transactions.'
                        : 'Test the instant AI Viva evaluation rubric with our reference architectural answer.'}
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setVivaAnswerSubmitted((prev) => !prev)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#09090B] text-white text-xs font-bold cursor-pointer"
                    >
                      {vivaAnswerSubmitted
                        ? 'Reset Viva Challenge'
                        : 'Evaluate Reference Viva Answer'}
                    </button>
                  </div>
                </div>
              </div>

              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <strong className="text-white">AI Career Guide &amp; Viva Lab</strong> · Engineered by Aashif Khan (SkyLine Digital Agency)
                </div>
                <div>RAG Curriculum Engine · Technical Interview Simulator</div>
              </footer>
            </div>
          )}

          {/* =================================================================
              10. SOCIALITE CREATOR NETWORK (https://socialite.club — Creator Community Landing Page)
             ================================================================= */}
          {currentId === 'socialite-network' && (
            <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
              {/* Section 1: Socialite Brand Navbar */}
              <header className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#DC2626] text-white flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-zinc-900">
                      Socialite · Creator &amp; Builder Community Graph
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Real-Time WebSocket Channels, Cohort Drops &amp; Verified Builder Profiles
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#soc-feed" className="hover:text-[#DC2626]">
                    Live Community Feed
                  </a>
                  <a href="#soc-cohorts" className="hover:text-[#DC2626]">
                    Creator Perks
                  </a>
                </nav>

                <a
                  href="#soc-feed"
                  className="px-4 py-2 rounded-xl bg-[#09090B] text-white text-xs font-bold"
                >
                  Publish Update
                </a>
              </header>

              {/* Section 2: Creator Community Hero */}
              <div className="bg-gradient-to-r from-[#09090B] via-[#1F1218] to-[#3B0A1E] text-white py-14 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
                      01 · REAL-TIME CREATOR GRAPH · WEBSOCKET CHANNELS
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                      Where India’s Top Product Builders, Designers &amp; Founders Ship in Public.
                    </h1>
                    <p className="text-sm text-zinc-200 max-w-2xl">
                      Host private member channels, share live build milestones, and run cohort launches without noisy algorithmic feeds.
                    </p>
                  </div>
                  <div className="lg:col-span-4 p-5 rounded-2xl bg-white/10 border border-white/15 space-y-1 text-xs">
                    <div className="font-mono font-bold text-rose-300">ACTIVE COMMUNITY</div>
                    <div className="font-display text-2xl font-extrabold text-white">
                      2,400+ Builders
                    </div>
                    <div className="text-zinc-300">3 Curated Engineering &amp; Design Channels</div>
                  </div>
                </div>
              </div>

              {/* Section 3: Interactive Channel Switcher, Live Post Composer & Feed */}
              <div id="soc-feed" className="max-w-7xl mx-auto py-12 px-6 sm:px-12 space-y-10">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#DC2626]">
                        02 · LIVE COMMUNITY CHANNELS
                      </div>
                      <h2 className="font-display text-2xl font-extrabold text-zinc-900 mt-1">
                        Filter by Channel or Publish a Build Update
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(['All Creators', 'Web Builders', 'UI/UX Design'] as const).map(
                        (ch) => (
                          <button
                            key={ch}
                            type="button"
                            onClick={() => setSocialChannel(ch)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                              socialChannel === ch
                                ? 'bg-[#09090B] text-white'
                                : 'bg-white border border-zinc-200 text-zinc-700'
                            }`}
                          >
                            {ch}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      placeholder="Publish a live milestone to the Socialite builder feed..."
                      className="flex-1 p-3.5 rounded-2xl bg-white border border-zinc-300 text-xs text-zinc-900"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newPostText.trim()) return;
                        setSocialPosts((prev) => [
                          {
                            id: Date.now(),
                            author: 'You (Visiting Founder)',
                            role: 'SkyLine Partner',
                            channel:
                              socialChannel === 'All Creators' ? 'Web Builders' : socialChannel,
                            content: newPostText.trim(),
                            likes: 1,
                          },
                          ...prev,
                        ]);
                        setNewPostText('');
                      }}
                      className="px-5 py-3.5 rounded-2xl bg-[#DC2626] hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                    >
                      Publish Live
                    </button>
                  </div>

                  <div className="space-y-3">
                    {socialPosts
                      .filter(
                        (p) =>
                          socialChannel === 'All Creators' || p.channel === socialChannel
                      )
                      .map((post) => (
                        <div
                          key={post.id}
                          className="p-5 rounded-3xl bg-white border border-zinc-200 flex items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-zinc-900">
                              {post.author} <span className="text-zinc-400">·</span>{' '}
                              <span className="text-zinc-500 font-normal">{post.role}</span>{' '}
                              <span className="text-zinc-400">·</span>{' '}
                              <span className="font-mono text-[11px] text-[#DC2626]">
                                {post.channel}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-700">{post.content}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setSocialPosts((prev) =>
                                prev.map((item) =>
                                  item.id === post.id
                                    ? { ...item, likes: item.likes + 1 }
                                    : item
                                )
                              )
                            }
                            className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold cursor-pointer shrink-0"
                          >
                            ♥ {post.likes}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Section 4: Community Perks */}
                <div id="soc-cohorts" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      code: '01 · REAL-TIME ROOMS',
                      title: 'Instant WebSocket Topic Feeds',
                      desc: 'Zero page refreshes. Posts, reactions, and cohort announcements stream live across connected browsers.',
                    },
                    {
                      code: '02 · VERIFIED PROFILES',
                      title: 'Proof-of-Work Builder Portfolios',
                      desc: 'Members link shipped repositories, live domains, and case studies directly to their creator profile.',
                    },
                    {
                      code: '03 · COHORT MONETIZATION',
                      title: 'Paid Micro-Communities & Drops',
                      desc: 'Launch gated workshops and member-only channels with integrated UPI & card subscriptions.',
                    },
                  ].map((item) => (
                    <div
                      key={item.code}
                      className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-2"
                    >
                      <div className="text-xs font-mono font-bold text-[#DC2626]">{item.code}</div>
                      <h3 className="font-display font-bold text-base text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <strong className="text-white">Socialite Creator Network</strong> · Engineered by Aashif Khan (SkyLine Digital Agency)
                </div>
                <div>WebSocket Event Graph · Role-Based Community Channels</div>
              </footer>
            </div>
          )}

          {/* =================================================================
              11. SEARCHPULSE LOCAL SEO ENGINE (https://searchpulse.in — Google Map Pack Growth Landing Page)
             ================================================================= */}
          {currentId === 'searchpulse-seo' && (
            <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
              {/* Section 1: SearchPulse Brand Navbar */}
              <header className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#10B981] text-zinc-950 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-zinc-900">
                      SearchPulse · Local Google Map Pack &amp; Review Engine
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Top-3 Google Business Profile Ranking, Local Citations &amp; WhatsApp Review Links
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#sp-calculator" className="hover:text-[#059669]">
                    Map Pack Call Estimator
                  </a>
                  <a href="#sp-review-flow" className="hover:text-[#059669]">
                    WhatsApp Review Flow
                  </a>
                </nav>

                <a
                  href="#sp-calculator"
                  className="px-4 py-2 rounded-xl bg-[#09090B] text-white text-xs font-bold"
                >
                  Run Local Audit
                </a>
              </header>

              {/* Section 2: Local SEO Dominance Hero */}
              <div className="bg-gradient-to-r from-[#09090B] via-[#064E3B] to-[#09090B] text-white py-14 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#34D399]">
                      01 · LOCAL GOOGLE MAPS SEO · AUTOMATED 5-STAR REVIEW VELOCITY
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                      Rank in the Top-3 Google Map Pack When High-Intent Local Customers Search Near You.
                    </h1>
                    <p className="text-sm text-zinc-200 max-w-2xl">
                      78% of local clinic visits, showroom walk-ins, and property inquiries go to the top 3 Google Maps results. SearchPulse optimizes your Google Business Profile and automates post-visit WhatsApp review links.
                    </p>
                  </div>
                  <div className="lg:col-span-4 p-5 rounded-2xl bg-white/10 border border-white/15 space-y-1 text-xs">
                    <div className="font-mono font-bold text-[#34D399]">TARGET MAP POSITION</div>
                    <div className="font-display text-2xl font-extrabold text-white">
                      Top #1 – #3 Pack
                    </div>
                    <div className="text-zinc-200">Direct Phone Calls &amp; Map Direction Taps</div>
                  </div>
                </div>
              </div>

              {/* Section 3: Interactive Local Map Pack Audit & Call Volume Calculator */}
              <div id="sp-calculator" className="max-w-7xl mx-auto py-12 px-6 sm:px-12 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-zinc-200 space-y-5">
                    <div>
                      <div className="text-xs font-mono font-bold text-[#059669]">
                        02 · INTERACTIVE LOCAL MAP PACK CALL &amp; WALK-IN ESTIMATOR
                      </div>
                      <h2 className="font-display font-bold text-xl text-zinc-900 mt-1">
                        Select Your Business Category &amp; Current Review Count
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-bold text-zinc-700 mb-1">
                          Business Category
                        </label>
                        <select
                          value={seoBusinessCategory}
                          onChange={(e) =>
                            setSeoBusinessCategory(
                              e.target.value as typeof seoBusinessCategory
                            )
                          }
                          className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-300 font-semibold text-zinc-900"
                        >
                          <option value="Dental & Multispecialty Clinic">
                            Dental &amp; Multispecialty Clinic
                          </option>
                          <option value="Real Estate Developer">
                            Real Estate Developer / Broker
                          </option>
                          <option value="Jewellery & Retail Showroom">
                            Jewellery &amp; Retail Showroom
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-zinc-700 mb-1">
                          Target City / Micro-Market
                        </label>
                        <input
                          type="text"
                          value={seoCity}
                          onChange={(e) => setSeoCity(e.target.value)}
                          className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-300 font-semibold text-zinc-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-zinc-700">Current Google Maps Reviews:</span>
                        <span className="text-[#0B63F6] font-mono">
                          {seoCurrentReviews} Reviews → Target: {seoCurrentReviews + 180} Reviews
                        </span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={300}
                        step={5}
                        value={seoCurrentReviews}
                        onChange={(e) => setSeoCurrentReviews(Number(e.target.value))}
                        className="w-full accent-[#10B981] cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                        <div className="text-xs text-zinc-500">Projected Monthly Map Calls</div>
                        <div className="font-display text-2xl font-extrabold text-zinc-900 mt-1">
                          +{Math.round(seoCurrentReviews * 1.8 + 95)} Calls/mo
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                        <div className="text-xs text-emerald-800">Estimated Direction Taps</div>
                        <div className="font-display text-2xl font-extrabold text-emerald-900 mt-1">
                          +{Math.round(seoCurrentReviews * 2.4 + 140)} Visits/mo
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Automated WhatsApp Google Review Dispatch Simulator */}
                  <div
                    id="sp-review-flow"
                    className="lg:col-span-5 p-6 rounded-3xl bg-white border border-zinc-200 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="text-xs font-mono font-bold text-[#0B63F6]">
                        03 · 1-TAP WHATSAPP GOOGLE REVIEW AUTOMATION
                      </div>
                      <h3 className="font-display font-bold text-lg text-zinc-900">
                        Turn Happy Walk-In Customers into 5-Star Google Reviews
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Instead of asking customers to search your business name manually, SearchPulse sends an automated WhatsApp message after billing with a direct 1-tap Google Review modal link.
                      </p>
                      <div className="p-4 rounded-2xl bg-zinc-900 text-white text-xs space-y-1.5">
                        <div className="font-mono text-[10px] text-[#34D399]">
                          WHATSAPP PREVIEW · {seoCity.toUpperCase()}
                        </div>
                        <p className="text-zinc-200">
                          "Thank you for visiting our {seoBusinessCategory}! Tap below to share your 30-second experience on Google Maps: ★★★★★"
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSeoReviewDispatched(true);
                        setSeoCurrentReviews((prev) => prev + 1);
                      }}
                      className="w-full py-3.5 rounded-2xl bg-[#25D366] text-zinc-950 font-bold text-xs cursor-pointer"
                    >
                      {seoReviewDispatched
                        ? `✓ 5-Star Review Added (${seoCurrentReviews} Total Reviews)`
                        : 'Simulate 1-Tap Customer Review (+1 Review)'}
                    </button>
                  </div>
                </div>

                {/* Section 4: Local SEO Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      code: '01 · GBP SCHEMA & CATEGORIES',
                      title: 'Primary Category & Keyword Alignment',
                      desc: 'Optimizes primary and secondary Google Business Profile categories, service catalogs, and geo-tagged clinic/showroom photos.',
                    },
                    {
                      code: '02 · NAP CITATION CONSISTENCY',
                      title: '40+ Verified Indian Directory Citations',
                      desc: 'Synchronizes your exact Name, Address, and Phone number across Justdial, Practo, IndiaMART, and local chamber listings.',
                    },
                    {
                      code: '03 · REVIEW VELOCITY ENGINE',
                      title: 'QR Standee + WhatsApp Review Link',
                      desc: 'Combines reception desk QR standees with automated post-visit WhatsApp links for steady, authentic 5-star review growth.',
                    },
                  ].map((item) => (
                    <div
                      key={item.code}
                      className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-2"
                    >
                      <div className="text-xs font-mono font-bold text-[#059669]">{item.code}</div>
                      <h3 className="font-display font-bold text-base text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <strong className="text-white">SearchPulse Local SEO Engine</strong> · Engineered by Sachin Sahu &amp; Aashif Khan (SkyLine Digital Agency)
                </div>
                <div>Google Business Profile Optimization · Automated WhatsApp Review Flow</div>
              </footer>
            </div>
          )}

          {/* =================================================================
              12. SHIVANGI HAIR SALON — FULL SINGLE-PAGE HTML LANDING WEBSITE
                 (Pradeep Sen • React & Node.js • https://shivangi-hair-salon.vercel.app/)
             ================================================================= */}
          {currentId === 'shivangi-salon' && (
            <div
              data-testid="prototype-page-shivangi-salon"
              className="min-h-full bg-[#FAF9F6] text-zinc-900 flex flex-col font-sans"
            >
              {/* Top Salon Navigation Bar */}
              <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-6 sm:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-white font-display font-extrabold text-sm flex items-center justify-center">
                    SH
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-base tracking-tight text-zinc-950">
                      Shivangi Hair Salon &amp; Bridal Studio
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500">
                      Founded by Pradeep Sen • React &amp; Node.js Online Booking Portal
                    </div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-700">
                  <a href="#shivangi-services" className="hover:text-zinc-950">
                    Styling Menu &amp; Packages
                  </a>
                  <a href="#shivangi-booking" className="hover:text-zinc-950">
                    Book Chair Slot
                  </a>
                  <a href="#shivangi-reviews" className="hover:text-zinc-950">
                    Client Reviews
                  </a>
                </nav>

                <div className="flex items-center gap-2.5">
                  <a
                    href="https://shivangi-hair-salon.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <span>Visit Live Vercel Site</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#shivangi-booking"
                    className="px-4 py-2 rounded-xl bg-zinc-950 text-white text-xs font-bold"
                  >
                    Book Appointment
                  </a>
                </div>
              </header>

              {/* Section 1: Hero Banner */}
              <div className="bg-zinc-950 text-white py-14 px-6 sm:px-12 border-b border-zinc-800">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-200">
                      <span>★ 4.9 RATED UNISEX HAIR &amp; BRIDAL STUDIO</span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-[1.12] tracking-tight">
                      Signature Hair Styling, Keratin Therapy &amp; Luxury Bridal Makeovers.
                    </h1>
                    <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                      Skip the waiting lounge. Browse transparent service packages curated by Master Stylist Pradeep Sen, reserve your preferred chair time slot online, and receive instant WhatsApp booking confirmation.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        href="#shivangi-booking"
                        className="px-6 py-3.5 rounded-full bg-white text-zinc-950 font-display font-bold text-xs sm:text-sm"
                      >
                        Reserve Stylist Slot Now
                      </a>
                      <a
                        href="https://shivangi-hair-salon.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-display font-semibold text-xs sm:text-sm inline-flex items-center gap-2"
                      >
                        <span>Open shivangi-hair-salon.vercel.app</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-3xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85"
                        alt="Shivangi Hair Salon Interior"
                        className="w-full h-56 object-cover"
                      />
                      <div className="p-5 grid grid-cols-3 gap-3 text-center bg-zinc-900">
                        <div>
                          <div className="font-display font-extrabold text-lg text-white">2,800+</div>
                          <div className="text-[11px] text-zinc-400">Happy Clients</div>
                        </div>
                        <div>
                          <div className="font-display font-extrabold text-lg text-white">100%</div>
                          <div className="text-[11px] text-zinc-400">Authentic Products</div>
                        </div>
                        <div>
                          <div className="font-display font-extrabold text-lg text-white">Instant</div>
                          <div className="text-[11px] text-zinc-400">WhatsApp Slot Lock</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Interactive Service Menu & Chair Slot Booking */}
              <div
                id="shivangi-services"
                className="max-w-7xl mx-auto py-12 px-6 sm:px-12 space-y-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Salon Packages Catalog */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                        01 · TRANSPARENT SALON SERVICE MENU
                      </div>
                      <h2 className="font-display text-2xl font-extrabold text-zinc-950 mt-1">
                        Select Your Styling or Treatment Package
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          title: 'Signature Haircut, Wash & Blowdry',
                          price: '₹699',
                          duration: '45 Mins',
                          tag: 'BESTSELLER',
                          desc: ' precision haircut, nourishing argan wash, scalp massage & professional blowdry finish.',
                        },
                        {
                          title: 'Keratin Smooth & Hair Spa Package (₹2,499)',
                          price: '₹2,499',
                          duration: '90 Mins',
                          tag: 'FRIZZ CONTROL',
                          desc: 'Deep protein keratin infusion, steam hydration therapy & mirror-shine smoothing.',
                        },
                        {
                          title: 'Global Balayage & Gloss Color Studio',
                          price: '₹3,999',
                          duration: '120 Mins',
                          tag: 'COLOR STUDIO',
                          desc: 'Ammonia-free dimensional highlights, bond-protection treatment & gloss toner.',
                        },
                        {
                          title: 'HD Bridal & Groom Makeover Suite',
                          price: '₹8,499',
                          duration: '180 Mins',
                          tag: 'BRIDAL SUITE',
                          desc: 'Complete HD airbrush makeup, floral/classic hairstyling, draping & pre-bridal glow facial.',
                        },
                      ].map((pkg) => {
                        const isChosen = salonSelectedPackage.includes(pkg.title.split(' ')[0]);
                        return (
                          <button
                            key={pkg.title}
                            type="button"
                            onClick={() => {
                              setSalonSelectedPackage(`${pkg.title} (${pkg.price})`);
                              setSalonBookingConfirmed(false);
                            }}
                            className={`p-5 rounded-3xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                              isChosen
                                ? 'bg-zinc-950 text-white border-zinc-950 shadow-xl'
                                : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-900'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                    isChosen
                                      ? 'bg-white/15 text-white'
                                      : 'bg-zinc-100 text-zinc-800'
                                  }`}
                                >
                                  {pkg.tag} · {pkg.duration}
                                </span>
                                <span className="font-display font-extrabold text-base">
                                  {pkg.price}
                                </span>
                              </div>
                              <div className="font-display font-bold text-sm mb-1">
                                {pkg.title}
                              </div>
                              <p
                                className={`text-xs leading-relaxed ${
                                  isChosen ? 'text-zinc-300' : 'text-zinc-600'
                                }`}
                              >
                                {pkg.desc}
                              </p>
                            </div>
                            <div className="text-[11px] font-mono font-bold">
                              {isChosen ? '✓ Selected for Booking' : 'Select Package →'}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Live Appointment Slot Booker */}
                  <div
                    id="shivangi-booking"
                    className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border-2 border-zinc-900 shadow-xl space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                      <div>
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                          02 · INSTANT CHAIR RESERVATION
                        </div>
                        <h3 className="font-display font-extrabold text-lg text-zinc-950">
                          Book Your Salon Time Slot
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-zinc-950 text-white font-mono text-[10px] font-bold">
                        React + Node.js API
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-zinc-700 mb-1">
                          Selected Service Package
                        </label>
                        <div className="p-3 rounded-xl bg-zinc-100 font-bold text-zinc-950">
                          {salonSelectedPackage}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-zinc-700 mb-1">
                          Choose Master Stylist
                        </label>
                        <select
                          value={salonSelectedStylist}
                          onChange={(e) => setSalonSelectedStylist(e.target.value)}
                          className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-300 font-semibold text-zinc-900"
                        >
                          <option value="Pradeep Sen (Master Stylist & Founder)">
                            Pradeep Sen (Master Stylist &amp; Founder)
                          </option>
                          <option value="Shivangi Senior Bridal & Color Specialist">
                            Shivangi Senior Bridal &amp; Color Specialist
                          </option>
                          <option value="Aryan Keratin & Hair Spa Expert">
                            Aryan Keratin &amp; Hair Spa Expert
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-zinc-700 mb-1">
                          Pick Chair Time Slot
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            'Today • 11:30 AM',
                            'Today • 4:00 PM',
                            'Today • 6:30 PM',
                            'Tomorrow • 12:00 PM',
                          ].map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => {
                                setSalonSelectedSlot(slot);
                                setSalonBookingConfirmed(false);
                              }}
                              className={`py-2 px-3 rounded-xl font-mono text-[11px] font-bold border cursor-pointer ${
                                salonSelectedSlot === slot
                                  ? 'bg-zinc-950 text-white border-zinc-950'
                                  : 'bg-zinc-50 text-zinc-800 border-zinc-300'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block font-bold text-zinc-700 mb-1">Your Name</label>
                          <input
                            type="text"
                            value={salonClientName}
                            onChange={(e) => setSalonClientName(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-300 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-zinc-700 mb-1">
                            WhatsApp Number
                          </label>
                          <input
                            type="text"
                            value={salonClientPhone}
                            onChange={(e) => setSalonClientPhone(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-300 font-semibold"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      data-testid="shivangi-confirm-slot-btn"
                      onClick={() => setSalonBookingConfirmed(true)}
                      className="w-full py-3.5 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-display font-bold text-xs sm:text-sm cursor-pointer"
                    >
                      {salonBookingConfirmed
                        ? `✓ Chair Reserved for ${salonClientName} (${salonSelectedSlot})`
                        : 'Confirm Salon Appointment & Send WhatsApp Pass'}
                    </button>

                    {salonBookingConfirmed && (
                      <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs space-y-1">
                        <div className="font-bold">
                          ✓ Appointment Pass Generated (#SHV-2026-419)
                        </div>
                        <div>
                          Stylist: <strong>{salonSelectedStylist}</strong> · Slot:{' '}
                          <strong>{salonSelectedSlot}</strong>. WhatsApp confirmation dispatched to{' '}
                          {salonClientPhone}.
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 3: Customer Reviews Strip */}
                <div
                  id="shivangi-reviews"
                  className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-zinc-200"
                >
                  {[
                    {
                      name: 'Priya Chouhan',
                      service: 'Keratin & Hair Spa',
                      text: 'Booked my 4 PM slot online in 30 seconds and walked straight into the chair. My hair feels super silky!',
                    },
                    {
                      name: 'Rohit Patidar',
                      service: 'Groom Styling Package',
                      text: 'Pradeep Sen gave the best fade and beard contour before my engagement ceremony. Super clean website!',
                    },
                    {
                      name: 'Neha Sharma',
                      service: 'HD Bridal Makeover',
                      text: 'Transparent pricing on the website helped me pick our complete bridal and family styling package easily.',
                    },
                  ].map((r) => (
                    <div
                      key={r.name}
                      className="p-5 rounded-3xl bg-white border border-zinc-200 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>{r.name}</span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-100">
                          {r.service}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">"{r.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <strong className="text-white">Shivangi Hair Salon (Pradeep Sen)</strong> · React &amp; Node.js Production Website by SkyLine Digital Agency
                </div>
                <a
                  href="https://shivangi-hair-salon.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline font-mono"
                >
                  https://shivangi-hair-salon.vercel.app/ ↗
                </a>
              </footer>
            </div>
          )}

          {/* =================================================================
              13. LOCALLOOM — FULL SINGLE-PAGE HTML LANDING WEBSITE + ADMIN PANEL
                 (Akram Khan • Admin Panel & E-Commerce • https://localloom-nu.vercel.app/)
             ================================================================= */}
          {currentId === 'localloom-store' && (
            <div
              data-testid="prototype-page-localloom-store"
              className="min-h-full bg-[#F8F8F7] text-zinc-900 flex flex-col font-sans"
            >
              {/* Top LocalLoom Navbar with Storefront / Admin Panel Switcher */}
              <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-6 sm:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-white font-display font-extrabold text-sm flex items-center justify-center">
                    LL
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-base tracking-tight text-zinc-950">
                      LocalLoom · Artisanal Handloom &amp; Weaver Portal
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500">
                      Founded by Akram Khan • Storefront &amp; Live Inventory Admin Panel
                    </div>
                  </div>
                </div>

                {/* Live View Switcher: Customer Storefront vs Weaver Admin Panel */}
                <div className="inline-flex items-center rounded-xl p-1 bg-zinc-100 border border-zinc-300">
                  <button
                    type="button"
                    data-testid="localloom-tab-storefront"
                    onClick={() => setLoomViewMode('storefront')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      loomViewMode === 'storefront'
                        ? 'bg-zinc-950 text-white shadow-xs'
                        : 'text-zinc-700 hover:text-zinc-950'
                    }`}
                  >
                    Handloom Storefront
                  </button>
                  <button
                    type="button"
                    data-testid="localloom-tab-admin"
                    onClick={() => setLoomViewMode('admin-panel')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      loomViewMode === 'admin-panel'
                        ? 'bg-zinc-950 text-white shadow-xs'
                        : 'text-zinc-700 hover:text-zinc-950'
                    }`}
                  >
                    Admin Inventory Panel
                  </button>
                </div>

                <div className="flex items-center gap-2.5">
                  <a
                    href="https://localloom-nu.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <span>Visit Live Vercel Site</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="px-3.5 py-2 rounded-xl bg-zinc-950 text-white text-xs font-mono font-bold">
                    Cart ({loomCartCount})
                  </span>
                </div>
              </header>

              {/* Section 1: Hero Banner */}
              <div className="bg-zinc-950 text-white py-12 px-6 sm:px-12 border-b border-zinc-800">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-200">
                      <span>DIRECT FROM CHANDERI &amp; MAHESHWAR MASTER WEAVERS</span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-[1.12] tracking-tight">
                      Authentic Handloom Weaves Paired with Real-Time Weaver Inventory Control.
                    </h1>
                    <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
                      LocalLoom connects heritage Indian handloom clusters directly to modern buyers with 1-Tap UPI checkout and a dedicated Admin Panel for SKU stock synchronization, order fulfillment, and weaver payouts.
                    </p>
                  </div>
                  <div className="lg:col-span-4 p-5 rounded-3xl bg-white/10 border border-white/15 space-y-2 text-xs">
                    <div className="font-mono font-bold text-zinc-300">LIVE PRODUCTION DEPLOYMENT</div>
                    <div className="font-display text-2xl font-extrabold text-white">
                      localloom-nu.vercel.app
                    </div>
                    <div className="text-zinc-300">
                      Switch between <strong>Handloom Storefront</strong> and <strong>Admin Inventory Panel</strong> in the top bar.
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Storefront OR Admin Panel */}
              <div className="max-w-7xl mx-auto py-12 px-6 sm:px-12 w-full space-y-10">
                {loomViewMode === 'storefront' ? (
                  <>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                          01 · CURATED HANDLOOM COLLECTION
                        </div>
                        <h2 className="font-display text-2xl font-extrabold text-zinc-950 mt-1">
                          Shop Heritage Chanderi, Maheshwari &amp; Tussar Weaves
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLoomViewMode('admin-panel')}
                        className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold cursor-pointer"
                      >
                        Open Admin Inventory Panel →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {loomProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="rounded-3xl bg-white border border-zinc-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
                        >
                          <div>
                            <div className="relative h-52 bg-zinc-100 overflow-hidden">
                              <img
                                src={prod.image}
                                alt={prod.title}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-zinc-950/85 text-white font-mono text-[10px] font-bold">
                                SKU: {prod.sku}
                              </span>
                              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/95 text-zinc-950 font-mono text-[10px] font-bold">
                                {prod.stock} in Stock
                              </span>
                            </div>
                            <div className="p-5 space-y-2">
                              <div className="text-[11px] font-mono text-zinc-500">
                                {prod.weave}
                              </div>
                              <h3 className="font-display font-bold text-base text-zinc-950">
                                {prod.title}
                              </h3>
                              <div className="font-display font-extrabold text-xl text-zinc-950">
                                ₹{prod.price.toLocaleString('en-IN')}
                              </div>
                            </div>
                          </div>

                          <div className="p-5 pt-0">
                            <button
                              type="button"
                              onClick={() => {
                                setLoomCartCount((c) => c + 1);
                                setLoomOrderConfirmed(true);
                              }}
                              className="w-full py-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-display font-bold text-xs cursor-pointer"
                            >
                              Add to Handloom Bag + 1-Tap UPI
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {loomOrderConfirmed && (
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex flex-wrap items-center justify-between gap-2">
                        <span>
                          ✓ Item added to LocalLoom Cart ({loomCartCount} items). Weaver authenticity certificate &amp; GST invoice ready for 1-Tap UPI checkout.
                        </span>
                        <button
                          type="button"
                          onClick={() => setLoomViewMode('admin-panel')}
                          className="px-3 py-1.5 rounded-lg bg-zinc-950 text-white font-bold cursor-pointer"
                        >
                          Inspect in Admin Panel
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  /* LOCALLOOM ADMIN INVENTORY & ORDER DISPATCH PANEL */
                  <div
                    data-testid="localloom-admin-inventory-view"
                    className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-zinc-900 shadow-xl space-y-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200">
                      <div>
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                          LOCALLOOM ADMIN PANEL · AKRAM KHAN · LIVE SKU LEDGER
                        </div>
                        <h2 className="font-display text-2xl font-extrabold text-zinc-950 mt-0.5">
                          Handloom Inventory, Weaver Stock &amp; Dispatch Console
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLoomViewMode('storefront')}
                        className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold cursor-pointer"
                      >
                        ← Back to Storefront
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                        <div className="text-xs text-zinc-500">Total Active Handloom SKUs</div>
                        <div className="font-display text-2xl font-extrabold text-zinc-950 mt-1">
                          {loomProducts.reduce((acc, p) => acc + p.stock, 0)} Units
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                        <div className="text-xs text-zinc-500">Verified Weaver Clusters</div>
                        <div className="font-display text-2xl font-extrabold text-zinc-950 mt-1">
                          Chanderi &amp; Maheshwar
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-950 text-white">
                        <div className="text-xs text-zinc-400">Live Cart / Orders Queued</div>
                        <div className="font-display text-2xl font-extrabold mt-1">
                          {loomCartCount} Active Orders
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {loomProducts.map((item, idx) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-wrap items-center justify-between gap-4"
                        >
                          <div>
                            <div className="font-mono text-[11px] text-zinc-500">
                              {item.sku} · {item.weave}
                            </div>
                            <div className="font-display font-bold text-sm text-zinc-950">
                              {item.title}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold px-3 py-1 rounded-lg bg-white border border-zinc-300">
                              Stock: {item.stock} Looms
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setLoomProducts((prev) =>
                                  prev.map((p, i) =>
                                    i === idx ? { ...p, stock: p.stock + 5 } : p
                                  )
                                )
                              }
                              className="px-3 py-1.5 rounded-xl bg-zinc-950 text-white text-xs font-bold cursor-pointer"
                            >
                              +5 Restock Batch
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <footer className="mt-auto bg-zinc-950 text-zinc-400 py-8 px-6 sm:px-12 border-t border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <strong className="text-white">LocalLoom (Akram Khan)</strong> · Admin Panel &amp; Handloom Storefront by SkyLine Digital Agency
                </div>
                <a
                  href="https://localloom-nu.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline font-mono"
                >
                  https://localloom-nu.vercel.app/ ↗
                </a>
              </footer>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalTree, document.body) : modalTree;
};
