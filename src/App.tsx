import React, { useCallback, useEffect, useState } from 'react';
import { PhoneCall } from 'lucide-react';
import { AdminDashboard } from './admin/AdminDashboard';
import {
  fetchPublicCms,
  createLeadInquiry,
  createPartnerReferral,
} from './api/client';
import { Navbar, PageId } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesMatrix } from './components/CapabilitiesMatrix';
import { SystemArchitectSimulator } from './components/SystemArchitectSimulator';
import { ExecutionRoadmap } from './components/ExecutionRoadmap';
import { ClientProofAndReferral } from './components/ClientProofAndReferral';
import { FaqSection } from './components/FaqSection';
import { ContactDispatchFooter } from './components/ContactDispatchFooter';
import { SkylineAiChatbot } from './components/SkylineAiChatbot';
import { WhatsAppBrandBadge } from './components/BrandIcons';
import {
  CAPABILITY_PILLARS,
  CapabilityPillar,
  ClientReview,
  FAQ_ITEMS,
  FaqItem,
  SHOWCASE_PROJECTS,
  ShowcaseProject,
  VERIFIED_REVIEWS,
} from './data/agencyData';

export type ThemeMode = 'light' | 'dark';

function resolvePageFromHash(hash: string): PageId {
  const clean = hash.replace(/^#/, '').trim().toLowerCase();
  if (
    clean === 'services' ||
    clean === 'solutions' ||
    clean === 'expertise' ||
    clean === 'simulator' ||
    clean === 'local-business'
  ) {
    return 'services';
  }
  if (clean === 'work' || clean === 'proof') {
    return 'work';
  }
  if (clean === 'how-we-deliver' || clean === 'process' || clean === 'roadmap') {
    return 'how-we-deliver';
  }
  if (clean === 'who-we-are' || clean === 'founders') {
    return 'who-we-are';
  }
  if (clean === 'referral' || clean === 'faq') {
    return 'referral';
  }
  if (clean === 'contact') {
    return 'contact';
  }
  return 'home';
}

export function App() {
  // Light mode ("Minimalist Warm Alabaster #F4F3EF") by default
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = window.localStorage.getItem('skyline-theme');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'light';
  });

  const [viewMode, setViewMode] = useState<'website' | 'admin'>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === '1' || window.location.hash === '#admin') {
        return 'admin';
      }
    } catch {
      // ignore
    }
    return 'website';
  });

  const [activePage, setActivePage] = useState<PageId>(() => {
    try {
      return resolvePageFromHash(window.location.hash);
    } catch {
      return 'home';
    }
  });

  // Live CMS state backed by Full-Stack API (/api/cms)
  const [projects, setProjects] = useState<ShowcaseProject[]>(SHOWCASE_PROJECTS);
  const [services, setServices] = useState<CapabilityPillar[]>(CAPABILITY_PILLARS);
  const [testimonials, setTestimonials] = useState<ClientReview[]>(VERIFIED_REVIEWS);
  const [faqs, setFaqs] = useState<FaqItem[]>(FAQ_ITEMS);

  const [prefilledScope, setPrefilledScope] = useState<string>('');
  const [prefilledPillars, setPrefilledPillars] = useState<string[]>([]);
  const [isScrolledNearBottom, setIsScrolledNearBottom] = useState<boolean>(false);

  useEffect(() => {
    const handleScrollBottomCheck = () => {
      const docHeight = document.documentElement.scrollHeight;
      const scrolled = window.scrollY + window.innerHeight;
      setIsScrolledNearBottom(docHeight > window.innerHeight + 120 && scrolled >= docHeight - 220);
    };
    handleScrollBottomCheck();
    window.addEventListener('scroll', handleScrollBottomCheck, { passive: true });
    window.addEventListener('resize', handleScrollBottomCheck);
    return () => {
      window.removeEventListener('scroll', handleScrollBottomCheck);
      window.removeEventListener('resize', handleScrollBottomCheck);
    };
  }, [activePage]);

  const syncLiveCms = useCallback(async () => {
    try {
      const cms = await fetchPublicCms();
      if (cms.projects && cms.projects.length > 0) setProjects(cms.projects);
      if (cms.services && cms.services.length > 0) setServices(cms.services);
      if (cms.testimonials && cms.testimonials.length > 0) {
        const mergedReviews = [
          ...VERIFIED_REVIEWS,
          ...cms.testimonials.filter(
            (item) => !VERIFIED_REVIEWS.some((v) => v.id === item.id)
          ),
        ];
        setTestimonials(mergedReviews);
      }
      if (cms.faqs && cms.faqs.length > 0) setFaqs(cms.faqs);
    } catch {
      // Keep default seed if offline
    }
  }, []);

  useEffect(() => {
    void syncLiveCms();
  }, [syncLiveCms]);

  // Internal founder access via #admin hash or Ctrl+Shift+A keyboard shortcut + SPA hash sync
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setViewMode('admin');
        return;
      }
      setViewMode('website');
      const nextPage = resolvePageFromHash(window.location.hash);
      setActivePage(nextPage);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setViewMode((prev) => (prev === 'admin' ? 'website' : 'admin'));
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('skyline-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNavigate = useCallback(
    (target: string) => {
      const cleanTarget = target.replace(/^#/, '').trim().toLowerCase();
      if (cleanTarget === 'simulator' || cleanTarget === 'estimator') {
        const existingEl =
          document.getElementById('estimator') || document.getElementById('simulator');
        if (existingEl) {
          existingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }

      const resolvedPage = resolvePageFromHash(target);
      setActivePage(resolvedPage);
      try {
        const targetHash = `#${resolvedPage}`;
        if (window.location.hash !== targetHash) {
          window.history.pushState(null, '', targetHash);
        }
      } catch {
        // ignore history errors
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // If a specific sub-anchor on that page was requested (e.g., simulator/estimator), scroll to it after mount
      if (cleanTarget === 'simulator' || cleanTarget === 'estimator') {
        setTimeout(() => {
          const el =
            document.getElementById('estimator') || document.getElementById('simulator');
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    },
    []
  );

  const handleSelectCapability = (pillarTitle: string) => {
    setPrefilledPillars([pillarTitle]);
    setPrefilledScope(`Interested in custom architecture and deployment for: ${pillarTitle}`);
    handleNavigate('contact');
  };

  const handleLockBlueprint = (summaryText: string, selectedDomains: string[]) => {
    setPrefilledScope(summaryText);
    setPrefilledPillars(selectedDomains);
    handleNavigate('contact');
  };

  const handleEstimatorLeadSubmit = async (payload: {
    name: string;
    phoneOrEmail: string;
    selectedPillars: string[];
    budgetTier: string;
    projectSummary: string;
  }) => {
    await createLeadInquiry({
      nameOrCompany: payload.name,
      contact: payload.phoneOrEmail,
      inquiryType: 'inquiry',
      budget: payload.budgetTier,
      selectedPillars: payload.selectedPillars,
      projectScope: payload.projectSummary,
      source: '60s Price Estimator',
    });
    await syncLiveCms();
  };

  const handleBackToWebsite = () => {
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', '#home');
    }
    setViewMode('website');
    setActivePage('home');
    void syncLiveCms();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'admin') {
    return (
      <AdminDashboard
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onBackToWebsite={handleBackToWebsite}
        onCmsMutated={() => void syncLiveCms()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] overflow-x-hidden transition-colors duration-250 flex flex-col justify-between">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main key={activePage} className="pt-24 sm:pt-28 flex-1 animate-page-enter">
        {/* 1. HOME PAGE: Clean Hero + Tech Marquee + Featured Case Studies + 6-Stage Delivery Pipeline + 60s Price Estimator + Hinglish FAQs */}
        {activePage === 'home' && (
          <>
            <HeroSection
              pageView="home"
              onNavigate={handleNavigate}
              projects={projects}
            />
            <ExecutionRoadmap onNavigate={handleNavigate} />
            <SystemArchitectSimulator
              onLockBlueprint={handleLockBlueprint}
              onSubmitLead={handleEstimatorLeadSubmit}
            />
            <FaqSection onNavigate={handleNavigate} faqs={faqs} />
          </>
        )}

        {/* 2. SERVICES PAGE: 7-Track Service Architecture + Local Business Package + 60s Project Estimator + FAQs */}
        {activePage === 'services' && (
          <>
            <CapabilitiesMatrix
              onSelectCapability={handleSelectCapability}
              pillars={services}
            />
            <SystemArchitectSimulator
              onLockBlueprint={handleLockBlueprint}
              onSubmitLead={handleEstimatorLeadSubmit}
            />
            <FaqSection onNavigate={handleNavigate} faqs={faqs} />
          </>
        )}

        {/* 3. OUR WORK PAGE: Full Case Studies Showcase + Proven Client Impact Metrics + Verified Client Reviews */}
        {activePage === 'work' && (
          <>
            <HeroSection
              pageView="work"
              onNavigate={handleNavigate}
              projects={projects}
            />
            <ClientProofAndReferral
              viewMode="proof-only"
              reviews={testimonials}
            />
          </>
        )}

        {/* 4. WHO WE ARE PAGE: The SkyLine Doctrine + Founding Architects Cards + 6-Phase Delivery Roadmap */}
        {activePage === 'who-we-are' && (
          <>
            <HeroSection
              pageView="who-we-are"
              onNavigate={handleNavigate}
              projects={projects}
            />
            <ExecutionRoadmap onNavigate={handleNavigate} />
          </>
        )}

        {/* 4B. HOW WE DELIVER PAGE: Dedicated 6-Stage Engineering & Growth Delivery System + FAQs */}
        {activePage === 'how-we-deliver' && (
          <>
            <ExecutionRoadmap
              isDedicatedPage={true}
              onNavigate={handleNavigate}
            />
            <FaqSection onNavigate={handleNavigate} faqs={faqs} />
          </>
        )}

        {/* 5. OFFER & REFERRAL PAGE: 15% Partner Commission Program + INR Calculator + Referral Form + Common Questions (FAQ) */}
        {activePage === 'referral' && (
          <>
            <ClientProofAndReferral
              viewMode="referral-only"
              reviews={testimonials}
              onSubmitReferral={async (payload) => {
                await createPartnerReferral(payload);
                await syncLiveCms();
              }}
            />
            <FaqSection onNavigate={handleNavigate} faqs={faqs} />
          </>
        )}
      </main>

      {/* 6. CONTACT PAGE (Full Dispatch Form + Footer) OR SHARED FOOTER ON OTHER PAGES */}
      <ContactDispatchFooter
        showContactSection={activePage === 'contact'}
        onNavigate={handleNavigate}
        prefilledScope={prefilledScope}
        prefilledPillars={prefilledPillars}
        onSubmitLead={async (payload) => {
          await createLeadInquiry(payload);
          await syncLiveCms();
        }}
      />

      {/* 7. FLOATING BOTTOM-RIGHT CTAs: STRICT VERTICAL STACK (1. WHATSAPP -> 2. DIRECT CALL -> 3. SKYBOT) */}
      <div
        data-testid="floating-cta-dock"
        className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 pointer-events-none"
      >
        {/* 1st (TOP): WhatsApp Floating CTA (#25D366 Official WhatsApp Green) */}
        <a
          href="https://wa.me/918643002478?text=Hi%20SkyLine%20Team%2C%20I%20visited%20your%20website%20and%20want%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          data-testid="floating-whatsapp-cta"
          aria-label="Chat on WhatsApp • Sachin Sahu (Founder & CEO)"
          className={`group pointer-events-auto h-12 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center transition-all duration-300 ease-out overflow-hidden whitespace-nowrap border border-white/25 ${
            isScrolledNearBottom
              ? 'max-w-[290px] px-4 gap-2.5'
              : 'w-12 max-w-[48px] px-0 gap-0 hover:w-auto hover:max-w-[290px] hover:px-4 hover:gap-2.5'
          }`}
        >
          <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
            <WhatsAppBrandBadge size="sm" className="border-0 bg-transparent" />
          </span>
          <span
            className={`flex flex-col text-left leading-tight transition-all duration-300 ease-out overflow-hidden ${
              isScrolledNearBottom
                ? 'max-w-[220px] opacity-100'
                : 'max-w-0 opacity-0 group-hover:max-w-[220px] group-hover:opacity-100'
            }`}
          >
            <span className="text-[11px] font-bold text-white">
              Chat on WhatsApp • Sachin Sahu
            </span>
            <span className="text-[9px] font-medium text-white/90">
              Founder &amp; CEO
            </span>
          </span>
        </a>

        {/* 2nd (MIDDLE): Direct Voice Call Floating CTA (#000000 Pure Full Black) */}
        <a
          href="tel:+918959144686"
          data-testid="floating-call-cta"
          aria-label="Direct Voice Call • Aashif Khan (Co-Founder & System Architect)"
          className={`group pointer-events-auto h-12 rounded-full bg-[#000000] text-white shadow-lg flex items-center justify-center transition-all duration-300 ease-out overflow-hidden whitespace-nowrap border border-white/15 ${
            isScrolledNearBottom
              ? 'max-w-[290px] px-4 gap-2.5'
              : 'w-12 max-w-[48px] px-0 gap-0 hover:w-auto hover:max-w-[290px] hover:px-4 hover:gap-2.5'
          }`}
        >
          <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
            <PhoneCall className="w-4 h-4 text-white" />
          </span>
          <span
            className={`flex flex-col text-left leading-tight transition-all duration-300 ease-out overflow-hidden ${
              isScrolledNearBottom
                ? 'max-w-[220px] opacity-100'
                : 'max-w-0 opacity-0 group-hover:max-w-[220px] group-hover:opacity-100'
            }`}
          >
            <span className="text-[11px] font-bold text-white">
              Direct Voice Call • Aashif Khan
            </span>
            <span className="text-[9px] font-medium text-zinc-300">
              Co-Founder &amp; System Architect
            </span>
          </span>
        </a>

        {/* 3rd (BOTTOM): SkyBot Compact Launcher Button */}
        <div className="pointer-events-auto">
          <SkylineAiChatbot
            activePage={activePage}
            onScrollToEstimator={() => {
              const el = document.getElementById('estimator');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                handleNavigate('how-we-deliver');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
