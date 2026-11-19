import React from 'react';
import { PhoneCall } from 'lucide-react';
import {
  SKYLINE_LINKEDIN_URL,
  SKYLINE_GITHUB_URL,
  SKYLINE_INSTAGRAM_URL,
  SKYLINE_WHATSAPP_DIRECT_URL,
  SKYLINE_EMAIL_INQUIRY_URL,
  SKYLINE_CALL_NUMBER,
} from '../data/agencyData';
import { SkylineLogo, SkylineLogoSvg } from './SkylineLogo';

/**
 * 1. OFFICIAL SKYLINE DIGITAL AGENCY BRAND MARK & EDITORIAL WORDMARK
 * Uses the redesigned 4-color geometric ribbon 'S' with origami upward arrow/crown
 * (#0B63F6 Royal Blue, #DC2626 Crimson Red, #F59E0B Amber Gold, #10B981 Emerald Green)
 * paired with crisp editorial typography: "SkyLine" (-0.03em) & "DIGITAL AGENCY" (0.14em).
 */
export const SkyLineLogo: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  subtitle?: string;
  iconClassName?: string;
  dockStyle?: boolean;
  className?: string;
}> = ({ size = 'md', showText = true, subtitle = 'DIGITAL AGENCY', className = '' }) => {
  return (
    <SkylineLogo
      size={size}
      showWordmark={showText}
      subtitle={subtitle}
      className={className}
    />
  );
};

/**
 * 2. CUSTOM SKY BOT AI CHAT LAUNCHER & HEADER AVATAR ICON
 * Renders the new 4-color geometric ribbon 'S' mark inside a sleek container with live status indicator.
 */
export const SkyLineAiChatIcon: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className }) => {
  const defaultSize =
    size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-12 h-12' : 'w-11 h-11';
  const boxClass = className || defaultSize;

  return (
    <span
      className={`relative ${boxClass} rounded-xl bg-white dark:bg-[#0D1017] border border-white/20 shadow-md inline-flex items-center justify-center p-1 shrink-0 select-none overflow-hidden`}
    >
      <SkylineLogoSvg className="w-full h-full" />
      <span
        className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#10B981] ring-1 ring-[#050505]"
        aria-hidden="true"
      />
    </span>
  );
};

/**
 * 3. OFFICIAL WHATSAPP VECTOR LOGO ICON (#25D366 GREEN CIRCLE + WHITE PHONE)
 */
export const WhatsAppLogoIcon: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 block ${className}`}
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.02 6.2c-5.36 0-9.72 4.35-9.72 9.71 0 1.83.51 3.61 1.48 5.15L6.2 26l5.08-1.52a9.7 9.7 0 0 0 4.74 1.23h.01c5.36 0 9.72-4.35 9.72-9.71 0-2.6-1.01-5.04-2.85-6.87A9.66 9.66 0 0 0 16.02 6.2Zm0 17.75h-.01a8.02 8.02 0 0 1-4.19-1.17l-.3-.18-3.01.9.91-2.94-.2-.31a8.01 8.01 0 0 1-1.26-4.34c0-4.44 3.62-8.05 8.06-8.05 2.15 0 4.17.84 5.69 2.36a8.01 8.01 0 0 1 2.36 5.69c0 4.44-3.62 8.04-8.05 8.04Zm4.42-6.02c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.65.3-.22.24-.85.83-.85 2.02 0 1.2.87 2.35.99 2.51.12.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.38.51.59.18 1.11.15 1.53.09.47-.07 1.43-.59 1.63-1.15.2-.57.2-1.06.14-1.15-.06-.1-.22-.16-.47-.28Z"
      fill="#FFFFFF"
    />
  </svg>
);

/**
 * Official WhatsApp Brand Badge
 */
export const WhatsAppBrandBadge: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const sizeClass =
    size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden ${sizeClass} ${className}`}
      aria-hidden="true"
    >
      <WhatsAppLogoIcon className="w-full h-full" />
    </span>
  );
};

/**
 * 4. OFFICIAL 4-COLOR GOOGLE GMAIL "M" ICON
 */
export const GmailBrandIcon: React.FC<{
  size?: 'sm' | 'nav' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  if (size === 'nav') {
    return (
      <span
        className={`w-10 h-10 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] inline-flex items-center justify-center shrink-0 shadow-xs transition-transform hover:scale-105 ${className}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 48 48" className="w-5 h-5" fill="none">
          <path d="M6 12.5V36c0 2.2 1.8 4 4 4h4V19.8l-8-6V12.5Z" fill="#4285F4" />
          <path d="M34 40h4c2.2 0 4-1.8 4-4V12.5l-8 7.3V40Z" fill="#34A853" />
          <path d="M34 11.2V21l8-6v-3.2c0-3.3-3.8-5.2-6.4-3.2L34 11.2Z" fill="#FBBC05" />
          <path d="M14 21v-9.8L24 18.7l10-7.5V21L24 28.5 14 21Z" fill="#EA4335" />
          <path d="M6 11.8v3.2l8 6v-9.8l-1.6-1.2C9.8 8 6 9.9 6 13.2v-1.4Z" fill="#C5221F" />
        </svg>
      </span>
    );
  }

  const dimClass =
    size === 'sm'
      ? 'w-5 h-5 rounded-md'
      : size === 'lg'
        ? 'w-11 h-11 rounded-2xl'
        : 'w-9 h-9 rounded-xl';

  return (
    <span
      className={`${dimClass} inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className="w-full h-full block" fill="none">
        <rect width="48" height="48" rx="10" fill="#FFFFFF" />
        <path d="M6 12.5V36c0 2.2 1.8 4 4 4h4V19.8l-8-6V12.5Z" fill="#4285F4" />
        <path d="M34 40h4c2.2 0 4-1.8 4-4V12.5l-8 7.3V40Z" fill="#34A853" />
        <path d="M34 11.2V21l8-6v-3.2c0-3.3-3.8-5.2-6.4-3.2L34 11.2Z" fill="#FBBC05" />
        <path d="M14 21v-9.8L24 18.7l10-7.5V21L24 28.5 14 21Z" fill="#EA4335" />
        <path d="M6 11.8v3.2l8 6v-9.8l-1.6-1.2C9.8 8 6 9.9 6 13.2v-1.4Z" fill="#C5221F" />
      </svg>
    </span>
  );
};

/**
 * 5. OFFICIAL INSTAGRAM GRADIENT ICON
 */
export const InstagramBrandIcon: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const uid = React.useId().replace(/:/g, '');
  const dim =
    size === 'sm'
      ? 'w-5 h-5 rounded-md'
      : size === 'lg'
        ? 'w-11 h-11 rounded-2xl'
        : 'w-9 h-9 rounded-xl';

  return (
    <span
      className={`${dim} inline-flex items-center justify-center shrink-0 overflow-hidden shadow-sm ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 36 36" className="w-full h-full block" fill="none">
        <defs>
          <radialGradient id={`ig-grad-${uid}`} cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#FDF497" />
            <stop offset="5%" stopColor="#FDF497" />
            <stop offset="45%" stopColor="#FD5949" />
            <stop offset="60%" stopColor="#D6249F" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect width="36" height="36" rx="8" fill={`url(#ig-grad-${uid})`} />
        <rect
          x="6.5"
          y="6.5"
          width="23"
          height="23"
          rx="6.2"
          stroke="#FFFFFF"
          strokeWidth="2.4"
        />
        <circle
          cx="18"
          cy="18"
          r="5.3"
          stroke="#FFFFFF"
          strokeWidth="2.4"
        />
        <circle cx="24.4" cy="11.6" r="1.5" fill="#FFFFFF" />
      </svg>
    </span>
  );
};

/**
 * 6. OFFICIAL VERIFIED 5-ICON SOCIAL BAR FOR FOOTER & CONTACT
 * Edge-to-edge full-bleed icons with zero outer margins inside each squircle:
 * 1) LinkedIn (#0A66C2 -> https://www.linkedin.com/in/skyline-digital-agency-678585450)
 * 2) GitHub (#181717 -> https://github.com/agencyskylinedigital-create)
 * 3) Instagram (Original Gradient -> https://www.instagram.com/sky_line_digital)
 * 4) Telegram (#26A5E4 -> https://t.me/+918959144686)
 * 5) X (#000000 -> https://x.com/skylinedigital)
 */
export const SocialIconBar: React.FC<{
  size?: 'sm' | 'md';
  showLabels?: boolean;
}> = ({ size = 'md', showLabels = false }) => {
  const uid = React.useId().replace(/:/g, '');
  const iconBox =
    size === 'sm' ? 'w-9 h-9 rounded-xl' : 'w-10 h-10 rounded-xl';

  const channels = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: SKYLINE_LINKEDIN_URL,
      external: true,
      icon: (
        <svg viewBox="0 0 36 36" className="w-full h-full block" fill="none">
          <rect width="36" height="36" fill="#0A66C2" />
          <path
            d="M11.2 14.8H7.4V27H11.2V14.8ZM9.3 13.1C10.5 13.1 11.5 12.1 11.5 10.9C11.5 9.7 10.5 8.7 9.3 8.7C8.1 8.7 7.1 9.7 7.1 10.9C7.1 12.1 8.1 13.1 9.3 13.1ZM28.6 27H24.8V21.1C24.8 19.7 24.8 17.9 22.8 17.9C20.8 17.9 20.5 19.4 20.5 21V27H16.7V14.8H20.3V16.5H20.4C20.9 15.5 22.2 14.5 24 14.5C27.8 14.5 28.6 17 28.6 20.3V27Z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    },
    {
      id: 'github',
      label: 'GitHub',
      href: SKYLINE_GITHUB_URL,
      external: true,
      icon: (
        <svg viewBox="0 0 36 36" className="w-full h-full block" fill="none">
          <rect width="36" height="36" fill="#181717" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 5.6C11.15 5.6 5.6 11.15 5.6 18C5.6 23.49 9.15 28.13 14.08 29.77C14.7 29.88 14.93 29.5 14.93 29.17C14.93 28.88 14.92 28.1 14.91 27.06C11.46 27.81 10.73 25.4 10.73 25.4C10.17 23.97 9.35 23.59 9.35 23.59C8.23 22.82 9.44 22.84 9.44 22.84C10.68 22.93 11.34 24.12 11.34 24.12C12.44 26.01 14.24 25.46 14.95 25.15C15.06 24.35 15.38 23.8 15.74 23.49C12.98 23.18 10.09 22.11 10.09 17.36C10.09 16 10.57 14.9 11.37 14.03C11.24 13.72 10.81 12.46 11.49 10.75C11.49 10.75 12.53 10.42 14.9 12.02C15.89 11.75 16.95 11.61 18 11.6C19.05 11.61 20.11 11.75 21.1 12.02C23.47 10.42 24.51 10.75 24.51 10.75C25.19 12.46 24.76 13.72 24.63 14.03C25.43 14.9 25.91 16 25.91 17.36C25.91 22.12 23.01 23.17 20.25 23.48C20.7 23.87 21.09 24.63 21.09 25.8C21.09 27.47 21.08 28.76 21.08 29.17C21.08 29.5 21.3 29.89 21.93 29.77C26.85 28.13 30.4 23.48 30.4 18C30.4 11.15 24.85 5.6 18 5.6Z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: SKYLINE_INSTAGRAM_URL,
      external: true,
      icon: (
        <svg viewBox="0 0 36 36" className="w-full h-full block" fill="none">
          <defs>
            <radialGradient id={`ig-bar-${uid}`} cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#FDF497" />
              <stop offset="5%" stopColor="#FDF497" />
              <stop offset="45%" stopColor="#FD5949" />
              <stop offset="60%" stopColor="#D6249F" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect width="36" height="36" fill={`url(#ig-bar-${uid})`} />
          <rect x="7" y="7" width="22" height="22" rx="6" stroke="#FFFFFF" strokeWidth="2.4" />
          <circle cx="18" cy="18" r="5.2" stroke="#FFFFFF" strokeWidth="2.4" />
          <circle cx="24.2" cy="11.8" r="1.5" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: 'https://t.me/+918959144686',
      external: true,
      icon: (
        <svg viewBox="0 0 36 36" className="w-full h-full block" fill="none">
          <rect width="36" height="36" fill="#26A5E4" />
          <path
            d="M27.4 10.3L23.9 26.8C23.6 28 22.9 28.3 21.9 27.7L16.4 23.7L13.7 26.3C13.4 26.6 13.2 26.8 12.6 26.8L13 21.2L23.2 12C23.6 11.6 23.1 11.4 22.5 11.8L9.9 19.7L4.5 18C3.3 17.6 3.3 16.8 4.7 16.2L26 8C27 7.6 27.8 8.2 27.4 10.3Z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    },
    {
      id: 'x',
      label: 'X',
      href: 'https://x.com/skylinedigital',
      external: true,
      icon: (
        <svg viewBox="0 0 36 36" className="w-full h-full block" fill="none">
          <rect width="36" height="36" fill="#000000" />
          <path
            d="M20.2 16.2L28.1 7H26.2L19.4 14.9L13.9 7H7.6L15.9 19.1L7.6 28.7H9.5L16.7 20.3L22.5 28.7H28.8L20.2 16.2ZM17.6 19.2L16.8 18L10.2 8.5H13.1L18.5 16.3L19.3 17.5L26.2 27.3H23.3L17.6 19.2Z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {channels.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          aria-label={`SkyLine Digital Agency on ${item.label}`}
          title={`SkyLine Digital Agency • ${item.label}`}
          className={
            showLabels
              ? 'inline-flex items-center gap-2 px-3 py-1.5 rounded-xl surface-elevated border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all text-xs font-semibold text-[var(--text-primary)]'
              : `${iconBox} p-0 inline-flex items-center justify-center overflow-hidden shadow-sm hover:-translate-y-0.5 hover:scale-105 transition-all duration-200`
          }
        >
          <span className={showLabels ? 'w-5 h-5 rounded-md overflow-hidden shrink-0 inline-flex' : 'w-full h-full block'}>
            {item.icon}
          </span>
          {showLabels && <span>{item.label}</span>}
        </a>
      ))}
    </div>
  );
};

/**
 * 7. TECH STACK BRAND ICON FOR MVP-STACK-2026 & CORE ENGINEERING TICKER
 */
export const TechStackBrandIcon: React.FC<{
  name: string;
  className?: string;
}> = ({ name, className = 'w-4 h-4' }) => {
  const n = name.toLowerCase();

  if (n.includes('next')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#09090B" stroke="#E4E4E7" strokeWidth="1.5" />
        <path d="M8.5 16V8L16.5 17.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15.5 8V13" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (n.includes('react')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          stroke="#61DAFB"
          strokeWidth="1.5"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          stroke="#61DAFB"
          strokeWidth="1.5"
          transform="rotate(120 12 12)"
        />
      </svg>
    );
  }
  if (n.includes('typescript')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" />
        <path
          d="M7 11H12M9.5 11V17.5M14 16.5C14.6 17.1 15.5 17.4 16.5 17.4C17.8 17.4 18.6 16.7 18.6 15.7C18.6 14.7 17.9 14.3 16.4 13.8C15 13.3 14.3 12.8 14.3 11.8C14.3 10.9 15.1 10.2 16.4 10.2C17.3 10.2 18 10.5 18.5 10.9"
          stroke="#FFFFFF"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (n.includes('java') && !n.includes('javascript')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M9 17.5C9 17.5 7 18.5 11 19C14.5 19.4 17 18.4 17 17.4M10.5 13C8.5 11.2 12.5 9.5 12.5 7C12.5 5.2 10.5 4 10.5 4C10.5 4 14.5 5 13.5 8C12.7 10.2 10 11.2 12 13M13.5 12.5C14.5 11 16 10 15 7.5"
          stroke="#EA4335"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M6.5 15H16.5C18 15 19 15.8 19 16.8C19 17.8 17.8 18.5 16.2 18.5H7.2C5.8 18.5 5 17.7 5 16.7C5 15.8 5.6 15 6.5 15Z"
          stroke="#3178C6"
          strokeWidth="1.6"
        />
      </svg>
    );
  }
  if (n.includes('spring')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M19.5 4.5C15 3.5 8 4.5 5 9.5C2.5 13.7 4.5 19 9.5 20.5C14.8 22 20 18.5 20.5 12.5C20.8 9 19.5 4.5 19.5 4.5Z"
          fill="#34A853"
        />
        <path
          d="M8.5 15.5C11.5 16 15 13.8 16.5 9.5"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="7.5" cy="15.5" r="1.2" fill="#FFFFFF" />
      </svg>
    );
  }
  if (n.includes('python')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M12 3C8.5 3 8 4.5 8 6.5V8.5H12.5V9.5H6.5C4.5 9.5 3 10.8 3 13.5C3 16.2 4.5 17.5 6.5 17.5H8V15.2C8 13.5 9.2 12.2 11 12.2H15C16.2 12.2 17 11.3 17 10V6.5C17 4.2 15.5 3 12 3Z"
          fill="#3776AB"
        />
        <path
          d="M12 21C15.5 21 16 19.5 16 17.5V15.5H11.5V14.5H17.5C19.5 14.5 21 13.2 21 10.5C21 7.8 19.5 6.5 17.5 6.5H16V8.8C16 10.5 14.8 11.8 13 11.8H9C7.8 11.8 7 12.7 7 14V17.5C7 19.8 8.5 21 12 21Z"
          fill="#FBBC05"
        />
      </svg>
    );
  }
  if (n.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <polygon
          points="12,2.5 20.5,7.3 20.5,16.7 12,21.5 3.5,16.7 3.5,7.3"
          fill="#339933"
        />
        <path
          d="M10 9.5V14.5L14.5 12L10 9.5Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }
  if (n.includes('postgres')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <ellipse cx="12" cy="6.5" rx="7" ry="3.2" fill="#336791" />
        <path
          d="M5 6.5V12C5 13.8 8.1 15.2 12 15.2C15.9 15.2 19 13.8 19 12V6.5"
          stroke="#336791"
          strokeWidth="1.8"
        />
        <path
          d="M5 12V17.5C5 19.3 8.1 20.7 12 20.7C15.9 20.7 19 19.3 19 17.5V12"
          stroke="#336791"
          strokeWidth="1.8"
        />
      </svg>
    );
  }
  if (n.includes('supabase')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" fill="#10B981" />
      </svg>
    );
  }
  if (n.includes('docker')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="4" y="10" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <rect x="7.5" y="10" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <rect x="11" y="10" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <rect x="7.5" y="7" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <rect x="11" y="7" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <path
          d="M2.5 13.5H17.5C18.8 13.5 20.2 12.6 21 11.4C21.5 12.6 21 14.5 19.8 15.6C18.2 17.2 15.2 18.5 11 18.5C6.2 18.5 3.2 16.6 2.5 13.5Z"
          fill="#2496ED"
        />
      </svg>
    );
  }
  if (n.includes('kafka')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="8" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 10.8L14.8 7.2M10 13.2L14.8 16.8M10.3 12H16.2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (n.includes('aws')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M4.5 15.5C8.5 18.5 15.5 18.5 19.5 15.5"
          stroke="#FF9900"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M17.5 14.5L20 15.2L19 17.6"
          stroke="#FF9900"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 12L8.2 7.5L9.9 12M7 10.8H9.4M11.5 7.5L12.6 12L13.8 8.8L15 12L16.1 7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (n.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M12 6.5C9.3 6.5 7.7 7.8 7 10.5C8 9.2 9.2 8.7 10.5 9C11.3 9.2 11.8 9.8 12.5 10.5C13.5 11.5 14.7 12.5 17 12.5C19.7 12.5 21.3 11.2 22 8.5C21 9.8 19.8 10.3 18.5 10C17.7 9.8 17.2 9.2 16.5 8.5C15.5 7.5 14.3 6.5 12 6.5ZM7 12.5C4.3 12.5 2.7 13.8 2 16.5C3 15.2 4.2 14.7 5.5 15C6.3 15.2 6.8 15.8 7.5 16.5C8.5 17.5 9.7 18.5 12 18.5C14.7 18.5 16.3 17.2 17 14.5C16 15.8 14.8 16.3 13.5 16C12.7 15.8 12.2 15.2 11.5 14.5C10.5 13.5 9.3 12.5 7 12.5Z"
          fill="#26A5E4"
        />
      </svg>
    );
  }
  if (n.includes('three') || n.includes('webgl')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <polygon
          points="5,4 20,8.5 9.5,20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <polygon
          points="10,7 16,9 11.5,14"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (n.includes('vercel')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <polygon points="12,4 21,19.5 3,19.5" fill="currentColor" />
      </svg>
    );
  }
  if (n.includes('razorpay') || n.includes('upi') || n.includes('dodo')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M14.5 3L7 13.5H12.5L9.5 21L18.5 9.5H13L14.5 3Z" fill="#0B63F6" />
      </svg>
    );
  }
  if (n.includes('whatsapp')) {
    return <WhatsAppLogoIcon className={className} />;
  }
  if (n.includes('cloudflare') || n.includes('turnstile')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M6.5 17.5H17.5C19.7 17.5 21 16 21 14C21 12.2 19.8 10.8 18 10.6C17.4 7.7 14.9 5.5 11.8 5.5C8.5 5.5 5.8 8 5.5 11.2C3.8 11.6 2.5 13.1 2.5 14.9C2.5 16.4 4.2 17.5 6.5 17.5Z"
          fill="#F59E0B"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#10B981" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" fill="#10B981" />
    </svg>
  );
};

/**
 * 8. SKYLINE MONOGRAM (4-Color Geometric Ribbon 'S' SVG Wrapper)
 */
export const SkyLineMonogram: React.FC<{ className?: string }> = ({
  className = 'w-8 h-8',
}) => (
  <span className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <SkylineLogoSvg className="w-full h-full" />
  </span>
);

export interface TechStackOfficialLogoItem {
  id: string;
  name: string;
  category: string;
  renderSvg: (className?: string) => React.ReactNode;
}

export const TECH_STACK_OFFICIAL_LOGOS: TechStackOfficialLogoItem[] = [
  {
    id: 'nextjs',
    name: 'Next.js 15',
    category: 'App Router & SSR',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="nextjs" className={cls} />,
  },
  {
    id: 'react',
    name: 'React 19',
    category: 'Interactive UI',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="react" className={cls} />,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Strict Type Safety',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="typescript" className={cls} />,
  },
  {
    id: 'java',
    name: 'Java 21',
    category: 'Enterprise Core',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="java" className={cls} />,
  },
  {
    id: 'springboot',
    name: 'Spring Boot 3',
    category: 'Microservices API',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="springboot" className={cls} />,
  },
  {
    id: 'python',
    name: 'Python & FastAPI',
    category: 'AI & Data Engine',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="python" className={cls} />,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Event Webhooks',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="nodejs" className={cls} />,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Relational ACID DB',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="postgresql" className={cls} />,
  },
  {
    id: 'supabase',
    name: 'Supabase RLS',
    category: 'Auth & Realtime',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="supabase" className={cls} />,
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Container Runtime',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="docker" className={cls} />,
  },
  {
    id: 'kafka',
    name: 'Apache Kafka',
    category: 'Event Streaming',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="kafka" className={cls} />,
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'EC2, S3 & RDS',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="aws" className={cls} />,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Design System',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="tailwind" className={cls} />,
  },
  {
    id: 'threejs',
    name: 'Three.js WebGL',
    category: '3D Spatial Engine',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="threejs" className={cls} />,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Cloud API',
    category: '24/7 Booking Bots',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="whatsapp" className={cls} />,
  },
  {
    id: 'vercel',
    name: 'Vercel Edge',
    category: 'Global CDN Deploy',
    renderSvg: (cls = 'w-4 h-4') => <TechStackBrandIcon name="vercel" className={cls} />,
  },
];

export const OfficialTechStackFloatingBar: React.FC = () => {
  return (
    <div
      data-testid="tech-stack-floating-grid"
      className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 py-2"
    >
      {TECH_STACK_OFFICIAL_LOGOS.map((item, idx) => {
        const floatClass =
          idx % 2 === 0 ? 'animate-tech-float-a' : 'animate-tech-float-b';
        return (
          <div
            key={item.id}
            data-testid={`tech-stack-card-${item.id}`}
            style={{ animationDelay: `${(idx % 8) * 260}ms` }}
            className={`${floatClass} group p-3 rounded-2xl surface-card border border-[var(--border-hairline)] hover:bg-[#09090B] hover:text-white dark:hover:bg-[#F4F4F5] dark:hover:text-[#09090B] transition-colors duration-200 flex flex-col justify-between gap-2.5 cursor-default shadow-xs`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#18181B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] group-hover:bg-white/15 group-hover:text-white dark:group-hover:bg-[#18181B] dark:group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                {item.renderSvg('w-4 h-4')}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#18181B] dark:bg-[#F4F4F5] group-hover:bg-white dark:group-hover:bg-[#09090B]" />
            </div>
            <div>
              <div className="font-display font-bold text-xs leading-tight">
                {item.name}
              </div>
              <div className="font-mono-tech text-[10px] opacity-75 mt-0.5 truncate">
                {item.category}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};




