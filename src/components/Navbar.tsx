import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowUpRight,
  Menu,
  X,
  Sun,
  Moon,
  Gift,
  PhoneCall,
} from 'lucide-react';
import {
  SKYLINE_CALL_NUMBER,
  SKYLINE_EMAIL_INQUIRY_URL,
  SKYLINE_WHATSAPP_DIRECT_URL,
  SKYLINE_LINKEDIN_URL,
  SKYLINE_GITHUB_URL,
  SKYLINE_INSTAGRAM_URL,
} from '../data/agencyData';
import {
  WhatsAppBrandBadge,
  GmailBrandIcon,
} from './BrandIcons';
import { SkylineLogo } from './SkylineLogo';

export type PageRoute =
  | 'home'
  | 'services'
  | 'work'
  | 'who-we-are'
  | 'how-we-deliver'
  | 'referral'
  | 'contact';

export type PageId = PageRoute;

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  activePage?: PageRoute;
  onNavigate?: (page: PageRoute) => void;
}

const NAV_ITEMS: { id: PageRoute; label: string; isPromo?: boolean }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Our Projects' },
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'how-we-deliver', label: 'How We Deliver' },
  { id: 'referral', label: 'Earn 15% Partner Offer', isPromo: true },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  activePage = 'home',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, closeMenu]);

  const handleNavClick = (page: PageRoute, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    closeMenu();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.hash = page === 'home' ? '#home' : `#${page}`;
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-10 pt-3 sm:pt-4 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <div className="h-16 sm:h-[68px] px-4 sm:px-6 rounded-2xl glass-header transition-all duration-300 flex items-center justify-between gap-2">
            {/* Brand Logo Mark + Editorial Wordmark */}
            <a
              href="#home"
              onClick={(e) => handleNavClick('home', e)}
              className="group shrink-0 focus:outline-none"
              aria-label="SkyLine Digital Agency Home"
            >
              <SkylineLogo size="md" showWordmark subtitle="DIGITAL AGENCY" />
            </a>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Primary Navigation"
              className="hidden xl:flex items-center gap-0.5 p-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-hairline)]"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.id;
                if (item.isPromo) {
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(item.id, e)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'btn-platinum-primary shadow-sm'
                          : 'badge-platinum hover:opacity-90'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </a>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                      isActive
                        ? 'btn-platinum-primary font-semibold shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Actions: Strategy Call CTA + Theme Toggle + Mobile Menu */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Primary Strategy Call / Project Brief CTA */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick('contact', e)}
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-full btn-platinum-primary"
              >
                <span>Strategy Call</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={
                  theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
                }
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-10 h-10 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[var(--text-primary)]" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--text-primary)]" />
                )}
              </button>

              {/* Hamburger Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                className="w-10 h-10 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-Over Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation Menu"
        >
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-xs"
            onClick={closeMenu}
          />

          <div className="fixed top-20 right-3 sm:right-6 w-[calc(100vw-1.5rem)] max-w-sm rounded-3xl surface-card p-5 shadow-2xl z-50 border border-[var(--border-strong)]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-hairline)]">
              <SkylineLogo size="sm" showWordmark subtitle="NAVIGATION" />
              <button
                type="button"
                onClick={closeMenu}
                className="text-xs font-mono-tech text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                ESC ✕
              </button>
            </div>

            <nav className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'btn-platinum-primary'
                        : 'surface-elevated text-[var(--text-primary)] hover:opacity-90'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.isPromo && <Gift className="w-4 h-4" />}
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </a>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-[var(--border-hairline)] grid grid-cols-1 gap-2">
              <a
                href={SKYLINE_WHATSAPP_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="w-full py-3 px-4 rounded-xl btn-whatsapp-official font-semibold text-xs flex items-center justify-center gap-2"
              >
                <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                <span>WhatsApp Strategy Desk</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${SKYLINE_CALL_NUMBER}`}
                  onClick={closeMenu}
                  className="w-full py-2.5 px-3 rounded-xl btn-call-black bg-[#000000] text-[#FFFFFF] font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#FFFFFF]" />
                  <span>Direct Call</span>
                </a>

                <a
                  href={SKYLINE_EMAIL_INQUIRY_URL}
                  onClick={closeMenu}
                  className="w-full py-2.5 px-3 rounded-xl btn-platinum-secondary font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <GmailBrandIcon size="sm" />
                  <span>Official Email</span>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <a
                  href={SKYLINE_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="py-2 px-2 rounded-xl surface-elevated font-mono-tech text-[11px] font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1"
                >
                  <span>LinkedIn ↗</span>
                </a>
                <a
                  href={SKYLINE_GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="py-2 px-2 rounded-xl surface-elevated font-mono-tech text-[11px] font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1"
                >
                  <span>GitHub ↗</span>
                </a>
                <a
                  href={SKYLINE_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="py-2 px-2 rounded-xl surface-elevated font-mono-tech text-[11px] font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1"
                >
                  <span>Instagram ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
