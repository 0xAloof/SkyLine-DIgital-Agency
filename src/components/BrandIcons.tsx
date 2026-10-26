import React from 'react';
import { SKYLINE_INSTAGRAM_URL, SKYLINE_SOCIAL_LINKS } from '../data/agencyData';

/**
 * Official SkyLine Digital Agency Brand Mark & Wordmark
 * 3D Metallic "S + A" Interlocking Monogram:
 *  - Back Layer ("S") & Front Layer ("A"): Both rendered in the exact same high-contrast bright brushed silver-white metallic gradient (#FFFFFF -> #F4F4F5 -> #D4D8E0) against the #050505 badge
 *  - Overlap Cutout: Crisp 2.5px #050505 cutout stroke where the front "A" crosses over the back "S"
 *  - 3 Square Pixels: Detaching in a stepped diagonal pattern outward from the bottom-right leg/foot of the front "A"
 *  - Wordmark: Bold metallic "Skyline" (Montserrat ExtraBold) + spaced "DIGITAL AGENCY" (Montserrat SemiBold, tracking-[0.28em])
 */
export const SkyLineLogo: React.FC<{
  className?: string;
  iconClassName?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  dockStyle?: boolean;
}> = ({
  className = '',
  iconClassName = '',
  showWordmark = true,
  size = 'md',
  dockStyle = false,
}) => {
  const dimensions =
    size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div
        className={`relative ${
          iconClassName || dimensions
        } rounded-xl bg-[#050505] border border-white/15 shadow-[0_6px_18px_rgba(0,0,0,0.45)] flex items-center justify-center shrink-0 overflow-hidden`}
      >
        {/* Subtle top radial metallic sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 25% 15%, rgba(255,255,255,0.16), transparent 62%)',
          }}
        />
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[88%] h-[88%] relative z-10"
          aria-hidden="true"
        >
          <defs>
            {/* Unified Bright Brushed Silver-White Metallic Gradient (#FFFFFF -> #F4F4F5 -> #D4D8E0) for Both "S", "A", and Pixels */}
            <linearGradient id="skylineBrightSilverGrad" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F4F4F5" />
              <stop offset="100%" stopColor="#D4D8E0" />
            </linearGradient>

            {/* Subtle 3D Facet Highlight on "A" */}
            <linearGradient id="skylineABevelGrad" x1="28" y1="10" x2="48" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#F4F4F5" />
              <stop offset="100%" stopColor="#D4D8E0" />
            </linearGradient>
          </defs>

          {/* BACK LAYER: Bright Brushed Silver-White "S" Ribbon */}
          <path
            d="M44.5 16C39.8 11.2 31.2 10 23.2 11.8C15.2 13.6 11.2 19.2 13 25.4C14.6 30.8 21.2 33 29.8 34.8C38.2 36.5 42.2 39 41 44.2C39.8 49.2 32.4 51.4 23.8 49.8C18.2 48.8 13.8 46.2 11.2 43"
            stroke="url(#skylineBrightSilverGrad)"
            strokeWidth="7.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* FRONT LAYER: Razor-Sharp Brushed Silver-White "A" with Crisp 2.5px #050505 Overlap Cutout Stroke */}
          <g>
            {/* 2.5px #050505 Overlap Cutout Underlay so "A" Crossing Over "S" is 100% Distinct */}
            <path
              d="M30.5 9.5L13.5 52H22.2L30.5 28.5L39.2 52H47.5L30.5 9.5Z"
              fill="url(#skylineBrightSilverGrad)"
              stroke="#050505"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Right Bevel Chisel Facet of "A" */}
            <path
              d="M30.5 9.5L34.2 19.5L42.8 52H47.5L30.5 9.5Z"
              fill="url(#skylineABevelGrad)"
            />
            {/* Dynamic Ascending Crossbar of "A" with 2.5px #050505 Overlap Cutout Stroke */}
            <path
              d="M19.5 39.5L41.5 34.5L43.8 40.5L17.2 45.2L19.5 39.5Z"
              fill="url(#skylineBrightSilverGrad)"
              stroke="#050505"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>

          {/* CRITICAL DETAIL: 3 Square Pixels Detaching Outward from the Bottom-Right Leg/Foot of "A" */}
          <rect
            x="48.5"
            y="46.5"
            width="4.4"
            height="4.4"
            rx="0.7"
            fill="url(#skylineBrightSilverGrad)"
          />
          <rect
            x="54.2"
            y="41.8"
            width="3.6"
            height="3.6"
            rx="0.6"
            fill="url(#skylineBrightSilverGrad)"
          />
          <rect
            x="58.8"
            y="37.5"
            width="2.8"
            height="2.8"
            rx="0.5"
            fill="url(#skylineBrightSilverGrad)"
          />
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
            className={`font-extrabold tracking-tight ${
              size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-[18px]'
            } ${
              dockStyle
                ? 'text-[#F8F9FA]'
                : 'text-[var(--text-primary)]'
            }`}
          >
            Skyline
          </span>
          <span
            style={{ fontFamily: "'Montserrat', 'Inter', sans-serif" }}
            className={`text-[9px] uppercase tracking-[0.28em] font-semibold mt-1 ${
              dockStyle ? 'text-zinc-400' : 'text-[var(--text-muted)]'
            }`}
          >
            DIGITAL AGENCY
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Custom Sky Bot Chat-Monogram Icon
 * Renders a sleek Chat-Bubble silhouette with a glowing #10B981 active AI node
 * and the bright brushed silver-white "SA" monogram seamlessly integrated inside
 * the chat bubble so it is immediately recognizable as an AI chat assistant
 * rather than a duplicate of the top-left navbar logo.
 */
export const SkyLineAiChatIcon: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ className = '', size = 'md' }) => {
  const dim =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';

  return (
    <div
      className={`relative ${
        className || dim
      } rounded-full bg-[#050505] text-[#F8F8F6] border border-white/20 shadow-md flex items-center justify-center shrink-0 overflow-hidden select-none`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 28% 20%, rgba(255,255,255,0.18), transparent 60%)',
        }}
      />
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[82%] h-[82%] relative z-10 overflow-visible"
      >
        <defs>
          <linearGradient id="skyBotBrightSilverGrad" x1="12" y1="8" x2="52" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F4F4F5" />
            <stop offset="100%" stopColor="#D4D8E0" />
          </linearGradient>
          <linearGradient id="skyBotBubbleShell" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E1E24" />
            <stop offset="100%" stopColor="#09090D" />
          </linearGradient>
        </defs>

        {/* Sleek Chat-Bubble Silhouette with Tail */}
        <path
          d="M11 14C11 10.134 14.134 7 18 7H46C49.866 7 53 10.134 53 14V38C53 41.866 49.866 45 46 45H25.5L14 54.5V45H18C14.134 45 11 41.866 11 38V14Z"
          fill="url(#skyBotBubbleShell)"
          stroke="url(#skyBotBrightSilverGrad)"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />

        {/* Subtle AI Chat Signal Dots Inside Top-Left of Bubble */}
        <circle cx="17.5" cy="14" r="1.4" fill="#10B981" />
        <circle cx="22" cy="14" r="1.4" fill="#A1A1AA" />

        {/* Seamlessly Integrated "SA" Monogram Inside the Chat Bubble */}
        <g transform="translate(5.5, 4) scale(0.82)">
          {/* Back "S" Bright Brushed Silver-White Curve */}
          <path
            d="M40 17C36.2 14 29.8 13.4 24.2 14.8C18.6 16.2 16.2 20 17.5 24.2C18.6 27.8 23.2 29.4 29.2 30.8C35 32.1 38 34 37.2 37.4C36.4 40.8 31.2 42.4 25 41.2C21 40.5 18 38.8 16.2 36.8"
            stroke="url(#skyBotBrightSilverGrad)"
            strokeWidth="5.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Front "A" Bright Brushed Silver-White Monogram with 2.5px #050505 Overlap Cutout Stroke */}
          <path
            d="M29.8 13L18 41.5H23.8L29.8 25.8L35.8 41.5H41.5L29.8 13Z"
            fill="url(#skyBotBrightSilverGrad)"
            stroke="#050505"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M21.8 33L37.5 29.5L39 33.6L20.4 37L21.8 33Z"
            fill="url(#skyBotBrightSilverGrad)"
            stroke="#050505"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* 3 Square Pixels Detaching from Bottom-Right Foot of "A" */}
          <rect x="42.5" y="37.5" width="3.2" height="3.2" rx="0.5" fill="url(#skyBotBrightSilverGrad)" />
          <rect x="46.5" y="34" width="2.6" height="2.6" rx="0.4" fill="url(#skyBotBrightSilverGrad)" />
          <rect x="49.8" y="30.8" width="2.1" height="2.1" rx="0.4" fill="url(#skyBotBrightSilverGrad)" />
        </g>

        {/* Glowing #10B981 Active AI Node on Top-Right Corner of Chat Bubble */}
        <circle cx="50" cy="11" r="7.5" fill="#10B981" fillOpacity="0.28" />
        <circle
          cx="50"
          cy="11"
          r="4.8"
          fill="#10B981"
          stroke="#050505"
          strokeWidth="2"
        />
        <circle cx="48.8" cy="9.8" r="1.4" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

/**
 * Official WhatsApp Vector Icon (Clean Transparent Glyph for Buttons & Badges)
 */
export const WhatsAppLogoIcon: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path d="M12.031 2C6.508 2 2.023 6.485 2.023 12.008c0 1.766.461 3.49 1.337 5.01L2 22l5.122-1.343a9.963 9.963 0 0 0 4.909 1.298h.004c5.522 0 10.006-4.485 10.006-10.008C22.041 6.485 17.553 2 12.031 2Zm5.828 14.129c-.246.693-1.432 1.326-1.988 1.409-.51.076-1.155.108-1.868-.118-.434-.137-.991-.322-1.703-.63-2.996-1.293-4.952-4.312-5.101-4.512-.149-.199-1.218-1.621-1.218-3.092 0-1.471.77-2.194 1.044-2.493.274-.299.597-.374.796-.374.199 0 .398.002.572.01.183.009.429-.07.671.512.249.598.845 2.068.92 2.218.075.149.125.324.025.523-.099.2-.149.324-.298.498-.149.175-.314.391-.448.524-.149.149-.304.311-.131.61.174.299.773 1.275 1.66 2.066 1.141 1.017 2.103 1.332 2.401 1.481.299.15.473.125.647-.075.175-.199.746-.872.945-1.171.199-.299.398-.249.672-.149.274.099 1.741.822 2.039.971.299.15.498.225.572.349.075.125.075.723-.171 1.416Z" />
  </svg>
);

/**
 * Official WhatsApp Green (#25D366) Circular Brand Badge
 */
export const WhatsAppBrandBadge: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const dims =
    size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const iconDims =
    size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-xs shrink-0 ${dims} ${className}`}
      aria-hidden="true"
    >
      <WhatsAppLogoIcon className={iconDims} />
    </span>
  );
};

/**
 * Official 4-Color Google Gmail Envelope Mark.
 * When `size === 'nav'`, renders a crisp unboxed `w-5 h-5` 4-color `M` glyph
 * designed to sit inside the circular `w-10 h-10 rounded-full` navbar action button.
 */
export const GmailBrandIcon: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'nav';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  if (size === 'nav') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 shrink-0 ${className}`}
        aria-hidden="true"
      >
        <path
          d="M2 6.2V18c0 1.1.9 2 2 2h2V9.8l6 4.5 6-4.5V20h2c1.1 0 2-.9 2-2V6.2c0-1.8-2.1-2.8-3.5-1.7L12 10 5.5 4.5C4.1 3.4 2 4.4 2 6.2Z"
          fill="#EA4335"
        />
        <path d="M2 6.2V18c0 1.1.9 2 2 2h2V9.8L2 6.2Z" fill="#4285F4" />
        <path d="M22 6.2V18c0 1.1-.9 2-2 2h-2V9.8l4-3.6Z" fill="#34A853" />
        <path
          d="M18 9.8V4.8l-6 4.5-6-4.5v5l6 4.5 6-4.5Z"
          fill="#FBBC05"
        />
      </svg>
    );
  }

  const containerDims =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const svgDims =
    size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-7 h-7' : 'w-6 h-6';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-white dark:bg-[#141518] border border-black/12 dark:border-white/15 shadow-xs shrink-0 ${containerDims} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={svgDims}
      >
        <path
          d="M2 6.2V18c0 1.1.9 2 2 2h2V9.8l6 4.5 6-4.5V20h2c1.1 0 2-.9 2-2V6.2c0-1.8-2.1-2.8-3.5-1.7L12 10 5.5 4.5C4.1 3.4 2 4.4 2 6.2Z"
          fill="#EA4335"
        />
        <path d="M2 6.2V18c0 1.1.9 2 2 2h2V9.8L2 6.2Z" fill="#4285F4" />
        <path d="M22 6.2V18c0 1.1-.9 2-2 2h-2V9.8l4-3.6Z" fill="#34A853" />
        <path
          d="M18 9.8V4.8l-6 4.5-6-4.5v5l6 4.5 6-4.5Z"
          fill="#FBBC05"
        />
      </svg>
    </span>
  );
};

/**
 * Standalone Original-Brand-Color Instagram Gradient Icon for Referral & Partner CTAs
 */
export const InstagramBrandIcon: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const dim =
    size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-7 h-7' : 'w-6 h-6';
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`${className || dim} block p-0 m-0 shrink-0 rounded-[5px] overflow-hidden`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="igCtaGrad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="100%" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="24" height="24" fill="url(#igCtaGrad)" />
      <rect x="4.5" y="4.5" width="15" height="15" rx="4.2" stroke="#FFFFFF" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="3.6" stroke="#FFFFFF" strokeWidth="1.9" />
      <circle cx="16.4" cy="7.6" r="1.15" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * Individual Social Brand SVG App Icons in Official Brand Colors with ZERO outer margin.
 * Strictly the 5 Official Platforms: GitHub, LinkedIn, Instagram, Telegram, X (Twitter)
 * Each SVG fills the entire 24x24 viewBox (0,0 to 24,24) edge-to-edge with zero margin outside the logo.
 */
export const SocialPlatformSvg: React.FC<{
  id: 'github' | 'linkedin' | 'instagram' | 'telegram' | 'x';
  className?: string;
}> = ({ id, className = 'w-full h-full block' }) => {
  switch (id) {
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${className} block p-0 m-0`} aria-hidden="true">
          <rect x="0" y="0" width="24" height="24" fill="#181717" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.3C7.03 3.3 3 7.33 3 12.3C3 16.28 5.58 19.65 9.16 20.84C9.61 20.92 9.77 20.64 9.77 20.4C9.77 20.18 9.76 19.47 9.76 18.7C7.5 19.12 6.92 18.15 6.74 17.63C6.64 17.37 6.2 16.56 5.82 16.34C5.5 16.17 5.06 15.75 5.81 15.74C6.51 15.73 7.02 16.4 7.19 16.66C8 18.02 9.29 17.64 9.81 17.4C9.89 16.81 10.12 16.42 10.38 16.19C8.39 15.96 6.3 15.19 6.3 11.75C6.3 10.77 6.65 9.96 7.22 9.33C7.13 9.1 6.82 8.17 7.31 6.92C7.31 6.92 8.07 6.68 9.79 7.85C10.5 7.65 11.26 7.55 12.02 7.55C12.78 7.55 13.54 7.65 14.26 7.85C15.98 6.67 16.73 6.92 16.73 6.92C17.23 8.17 16.91 9.1 16.82 9.33C17.4 9.96 17.74 10.76 17.74 11.75C17.74 15.2 15.64 15.96 13.65 16.19C13.97 16.47 14.25 17.01 14.25 17.85C14.25 19.05 14.24 20.02 14.24 20.4C14.24 20.64 14.4 20.93 14.86 20.84C18.43 19.65 21 16.28 21 12.3C21 7.33 16.97 3.3 12 3.3Z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${className} block p-0 m-0`} aria-hidden="true">
          <rect x="0" y="0" width="24" height="24" fill="#0A66C2" />
          <path
            d="M5.8 9.6H8.7V18.6H5.8V9.6ZM7.25 5C8.19 5 8.95 5.76 8.95 6.7C8.95 7.64 8.19 8.4 7.25 8.4C6.31 8.4 5.55 7.64 5.55 6.7C5.55 5.76 6.31 5 7.25 5ZM10.5 9.6H13.3V10.83C13.69 10.09 14.65 9.35 16.06 9.35C19 9.35 19.55 11.29 19.55 13.8V18.6H16.65V14.35C16.65 13.34 16.63 12.04 15.24 12.04C13.83 12.04 13.62 13.14 13.62 14.28V18.6H10.5V9.6Z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${className} block p-0 m-0`} aria-hidden="true">
          <defs>
            <linearGradient id="igSocialGrad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="50%" stopColor="#DD2A7B" />
              <stop offset="100%" stopColor="#8134AF" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="24" height="24" fill="url(#igSocialGrad)" />
          <rect x="4.5" y="4.5" width="15" height="15" rx="4.2" stroke="#FFFFFF" strokeWidth="1.95" />
          <circle cx="12" cy="12" r="3.6" stroke="#FFFFFF" strokeWidth="1.95" />
          <circle cx="16.4" cy="7.6" r="1.2" fill="#FFFFFF" />
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${className} block p-0 m-0`} aria-hidden="true">
          <rect x="0" y="0" width="24" height="24" fill="#26A5E4" />
          <path
            d="M18.65 6.4L5.15 11.6C4.23 11.97 4.24 12.48 4.99 12.71L8.45 13.79L16.46 8.74C16.84 8.51 17.19 8.64 16.9 8.89L10.42 14.74H10.41L10.42 14.75L10.18 18.3C10.53 18.3 10.69 18.14 10.88 17.95L12.58 16.3L16.11 18.91C16.76 19.27 17.23 19.08 17.39 18.31L19.7 7.42C19.94 6.48 19.34 6.05 18.65 6.4Z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${className} block p-0 m-0`} aria-hidden="true">
          <rect x="0" y="0" width="24" height="24" fill="#000000" />
          <path
            d="M13.52 10.77L18.84 4.59H17.58L12.96 9.95L9.27 4.59H5.02L10.6 12.71L5.02 19.19H6.28L11.16 13.52L15.05 19.19H19.3L13.52 10.77ZM11.79 12.78L11.23 11.97L6.73 5.54H8.67L12.3 10.72L12.86 11.53L17.58 18.28H15.64L11.79 12.78Z"
            fill="#FFFFFF"
          />
        </svg>
      );
  }
};

/**
 * Social Media Brand Icon Bar (Strictly 5 Platforms in Original Brand Colors — Zero outer margin outside logo)
 * GitHub, LinkedIn, Instagram, Telegram, X (Twitter)
 */
export const SocialIconBar: React.FC<{
  className?: string;
  size?: 'sm' | 'md';
}> = ({ className = '', size = 'md' }) => {
  const btnDim = size === 'sm' ? 'w-9 h-9' : 'w-10 h-10';

  return (
    <div className={`inline-flex flex-wrap items-center gap-2.5 ${className}`}>
      {SKYLINE_SOCIAL_LINKS.map((item) => (
        <a
          key={item.id}
          href={SKYLINE_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow SkyLine Digital Agency on ${item.label}`}
          title={item.label}
          className={`${btnDim} rounded-xl overflow-hidden p-0 m-0 border-0 inline-flex items-center justify-center shrink-0 hover:scale-105 hover:shadow-md transition-all`}
        >
          <SocialPlatformSvg id={item.id} className="w-full h-full block" />
        </a>
      ))}
    </div>
  );
};

/**
 * Full-Size Original-Brand-Color Vector Icons for the Tech Stack Marquee & Service Cards.
 * Zero emojis, zero grey monochrome placeholders — every technology renders in its authentic brand color.
 */
export const TechStackBrandIcon: React.FC<{
  name: string;
  className?: string;
}> = ({ name, className = 'w-4 h-4' }) => {
  const n = name.toLowerCase();

  if (n.includes('whatsapp')) {
    return <WhatsAppLogoIcon className={`${className} text-[#25D366]`} />;
  }

  if (n.includes('next.js') || n.includes('nextjs')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#09090B" stroke="#E4E4E7" strokeWidth="1.4" />
        <path d="M8.5 16V8L16.5 18.2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M15.5 8V13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (n.includes('react')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          transform="rotate(60 12 12)"
          stroke="#61DAFB"
          strokeWidth="1.6"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          transform="rotate(120 12 12)"
          stroke="#61DAFB"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  if (n.includes('typescript')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" />
        <path
          d="M7 10H12.5M9.75 10V17.5M14.2 16.7C14.7 17.2 15.6 17.5 16.5 17.5C17.8 17.5 18.6 16.8 18.6 15.8C18.6 14.9 18 14.4 16.7 13.9C15.5 13.4 14.8 12.9 14.8 11.9C14.8 10.8 15.7 10 17 10C17.8 10 18.5 10.2 19 10.6"
          stroke="#FFFFFF"
          strokeWidth="1.85"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (n.includes('java')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M9.5 17.5C7 18.2 14.2 19.3 16.8 17.5M8.5 14.8C6.8 15.5 13.5 16.3 16.2 14.8"
          stroke="#5382A1"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M17.2 14.2C18.8 14.2 19.8 15.2 18.2 16.5"
          stroke="#5382A1"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M11.5 4.2C13.2 6.2 9.4 7.8 11.6 10.5C13.5 8.5 15.2 7.2 13.6 5.2"
          stroke="#F89820"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 19.8C10 21 15.5 20.8 18.5 19.4"
          stroke="#E76F00"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (n.includes('spring')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <polygon
          points="12,2 20.5,7 20.5,17 12,22 3.5,17 3.5,7"
          fill="#6DB33F"
        />
        <path
          d="M8.5 15.5C11.5 16.5 15.8 14.2 16.5 9C13 9.5 9.2 11.5 8.5 15.5Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (n.includes('kafka')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="9.5" cy="12" r="2.8" stroke="#00B4D8" strokeWidth="2" />
        <circle cx="16.5" cy="6.5" r="2.1" fill="#00B4D8" />
        <circle cx="16.5" cy="17.5" r="2.1" fill="#00B4D8" />
        <circle cx="9.5" cy="4.5" r="1.8" fill="#38BDF8" />
        <circle cx="9.5" cy="19.5" r="1.8" fill="#38BDF8" />
        <path
          d="M9.5 6.3V9.2M9.5 14.8V17.7M11.8 10.4L14.8 7.8M11.8 13.6L14.8 16.2"
          stroke="#00B4D8"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (n.includes('python') || n.includes('fastapi')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M11.9 3C8.5 3 8.2 4.5 8.2 4.5V7H12.2V8H6.5C6.5 8 4 7.7 4 11.8C4 15.9 6.2 15.7 6.2 15.7H8V13.4C8 13.4 7.9 11.2 10.2 11.2H14.5C14.5 11.2 16.5 11.2 16.5 9.2V5.2C16.5 5.2 16.8 3 11.9 3Z"
          fill="#3776AB"
        />
        <path
          d="M12.1 21C15.5 21 15.8 19.5 15.8 19.5V17H11.8V16H17.5C17.5 16 20 16.3 20 12.2C20 8.1 17.8 8.3 17.8 8.3H16V10.6C16 10.6 16.1 12.8 13.8 12.8H9.5C9.5 12.8 7.5 12.8 7.5 14.8V18.8C7.5 18.8 7.2 21 12.1 21Z"
          fill="#FFD43B"
        />
      </svg>
    );
  }

  if (n.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <polygon
          points="12,2 20.5,7 20.5,17 12,22 3.5,17 3.5,7"
          fill="#339933"
        />
        <path
          d="M9.5 15V9L14.5 15V9"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (n.includes('postgres') || n.includes('mysql') || n.includes('sql') || n.includes('redis')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7.5" ry="3.2" fill="#336791" />
        <path
          d="M4.5 6V12C4.5 13.8 7.86 15.2 12 15.2C16.14 15.2 19.5 13.8 19.5 12V6"
          stroke="#336791"
          strokeWidth="1.9"
        />
        <path
          d="M4.5 12V18C4.5 19.8 7.86 21.2 12 21.2C16.14 21.2 19.5 19.8 19.5 18V12"
          stroke="#5B9BD5"
          strokeWidth="1.9"
        />
      </svg>
    );
  }

  if (n.includes('docker')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="6" y="9" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <rect x="9.6" y="9" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <rect x="13.2" y="9" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <rect x="9.6" y="5.8" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <path
          d="M3 13.2H18.5C19.5 12.2 20.8 12.1 21.5 12.6C21 14.2 19.8 15 18.4 15.2C17.4 18.2 14.2 19.5 10.2 19.5C5.8 19.5 3.4 17.2 3 13.2Z"
          fill="#2496ED"
        />
      </svg>
    );
  }

  if (n.includes('aws') || n.includes('oracle') || n.includes('cloud')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M6.5 15.5H17.5C19.4 15.5 21 13.9 21 12C21 10.2 19.6 8.7 17.8 8.5C17.1 5.9 14.8 4 12 4C8.9 4 6.4 6.3 6.1 9.3C4.3 9.7 3 11.3 3 13.2C3 14.5 4.5 15.5 6.5 15.5Z"
          fill="#FF9900"
        />
        <path
          d="M6.5 18.2C10.2 20.4 14.8 20.4 18.2 18.2"
          stroke="#FF9900"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (n.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.69 11.8 9.24 12.41 9.85C13.4 10.85 14.55 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.31 17.2 8.76 16.59 8.15C15.6 7.15 14.45 6 12 6ZM7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.69 6.8 15.24 7.41 15.85C8.4 16.85 9.55 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.31 12.2 14.76 11.59 14.15C10.6 13.15 9.45 12 7 12Z"
          fill="#06B6D4"
        />
      </svg>
    );
  }

  if (n.includes('meta') || n.includes('capi')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M4.2 14.6C4.2 11.1 6.6 8 9.2 8C10.9 8 12.2 9.3 13.7 11.7L14.9 13.6C15.8 15 16.6 15.8 17.6 15.8C19 15.8 19.8 14.6 19.8 13C19.8 10.8 18.2 9 16.6 9C15.5 9 14.5 9.7 13.6 10.9M11.6 13.5C10.4 15.1 9.2 16 7.6 16C5.6 16 4.2 14.6 4.2 14.6Z"
          stroke="#0668E1"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (n.includes('google') || n.includes('map') || n.includes('seo') || n.includes('aeo')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2C7.86 2 4.5 5.36 4.5 9.5C4.5 14.8 12 22 12 22C12 22 19.5 14.8 19.5 9.5C19.5 5.36 16.14 2 12 2Z"
          fill="#EA4335"
        />
        <circle cx="12" cy="9.5" r="3.4" fill="#FBBC05" />
        <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5H8.6C8.6 7.62 10.12 6.1 12 6.1V2Z" fill="#4285F4" />
        <path d="M12 22C12 22 19.5 14.8 19.5 9.5H15.4C15.4 11.38 13.88 12.9 12 12.9V22Z" fill="#34A853" />
      </svg>
    );
  }

  if (n.includes('razorpay') || n.includes('upi')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <polygon points="11,3 5,14 11.5,14 9.5,21 19,10 12.5,10" fill="#3395FF" />
        <polygon points="14.5,5 12.5,10 19,10" fill="#10B981" />
      </svg>
    );
  }

  if (n.includes('sha-256') || n.includes('zero-trust') || n.includes('rbac') || n.includes('security')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2.5L4.5 5.8V11.4C4.5 16.35 7.7 20.92 12 22C16.3 20.92 19.5 16.35 19.5 11.4V5.8L12 2.5Z"
          fill="#10B981"
        />
        <path
          d="M9 12.2L11.1 14.3L15.4 10"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4.5" fill="#6366F1" />
      <path
        d="M8 15L11 9L14 15M9 13.5H13"
        stroke="#FFFFFF"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16.5" cy="8.5" r="1.4" fill="#38BDF8" />
    </svg>
  );
};

