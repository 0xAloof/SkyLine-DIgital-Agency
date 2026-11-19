import React, { useState } from 'react';

export interface SkylineLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  subtitle?: string;
  className?: string;
  preferUploadedAsset?: boolean;
}

/**
 * SkyLine Digital Agency — Official Redesigned Brand Mark
 * Vibrant geometric ribbon-style 'S' with an upward-pointing origami crown/arrow on top right,
 * constructed from faceted translucent segments of Royal Blue (#0B63F6), Crimson Red (#DC2626),
 * Amber Gold (#F59E0B), and Emerald Green (#10B981).
 *
 * Supports rendering the uploaded asset (/assets/aistudio/logo_718e7c56.png) AND a razor-sharp
 * inline SVG recreation that loads in 0ms and never breaks.
 */
export const SkylineLogoSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  const uid = React.useId().replace(/:/g, '');
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SkyLine Digital Agency geometric ribbon S mark"
    >
      <defs>
        {/* Royal Blue Facet Gradients (#0B63F6) */}
        <linearGradient id={`sl-blue-main-${uid}`} x1="20" y1="30" x2="62" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0088FF" />
          <stop offset="55%" stopColor="#0B63F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id={`sl-blue-inner-${uid}`} x1="26" y1="34" x2="54" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#0B63F6" stopOpacity="0.95" />
        </linearGradient>

        {/* Crimson Red Facet Gradients (#DC2626) */}
        <linearGradient id={`sl-red-core-${uid}`} x1="42" y1="30" x2="62" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id={`sl-red-tail-${uid}`} x1="26" y1="98" x2="54" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B91C1C" />
          <stop offset="55%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>

        {/* Amber Gold Facet Gradients (#F59E0B) */}
        <linearGradient id={`sl-amber-crown-${uid}`} x1="60" y1="14" x2="78" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id={`sl-amber-loop-${uid}`} x1="60" y1="54" x2="96" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        {/* Emerald Green Facet Gradients (#10B981) */}
        <linearGradient id={`sl-green-wing-${uid}`} x1="76" y1="30" x2="96" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id={`sl-green-base-${uid}`} x1="42" y1="76" x2="94" y2="98" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="55%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
      </defs>

      {/* 1. LEFT ROYAL BLUE RIBBON CURVE (#0B63F6) */}
      <path
        d="M60 30H48C33.64 30 22 41.04 22 53C22 64.96 33.64 76 48 76H60V56H48C44.5 56 42 54.6 42 53C42 51.4 44.5 50 48 50H60V30Z"
        fill={`url(#sl-blue-main-${uid})`}
      />
      {/* Translucent geometric inner fold on blue curve */}
      <path
        d="M52 30C37.5 30 27 40.2 27 51.5C27 59.5 33.2 66.8 43 70.5L50 56H48C44.5 56 42 54.6 42 53C42 51.4 44.5 50 48 50H54L52 30Z"
        fill={`url(#sl-blue-inner-${uid})`}
        opacity="0.72"
      />

      {/* 2. CRIMSON RED INTERLOCKING FACET (#DC2626) */}
      <path
        d="M60 30C47.5 32.5 39 41.8 39 53C39 64.2 47.5 73.5 60 76V56H48C44.5 56 42 54.6 42 53C42 51.4 44.5 50 48 50H60V30Z"
        fill={`url(#sl-red-core-${uid})`}
        opacity="0.92"
      />
      {/* Faceted diagonal ruby shard across middle spine */}
      <polygon
        points="44,39 60,30 60,50 42,50"
        fill="#DC2626"
        opacity="0.75"
      />
      <polygon
        points="41,56 60,56 60,76 47,71"
        fill="#991B1B"
        opacity="0.82"
      />

      {/* 3. TOP-RIGHT ORIGAMI CROWN / UPWARD ARROW (AMBER GOLD #F59E0B & EMERALD #10B981) */}
      {/* Emerald right wing tip (#10B981) */}
      <polygon
        points="76,30 95,30 76,50"
        fill={`url(#sl-green-wing-${uid})`}
      />
      <polygon
        points="76,30 95,30 76,41"
        fill="#10B981"
        opacity="0.65"
      />
      {/* Amber upward origami peak (#F59E0B) */}
      <polygon
        points="60,30 76,12 76,50 60,50"
        fill={`url(#sl-amber-crown-${uid})`}
      />
      {/* Translucent geometric highlight facet on upward arrow */}
      <polygon
        points="60,30 76,12 71,44 60,50"
        fill="#FBBF24"
        opacity="0.78"
      />
      <polygon
        points="60,37 69,30 65,46 60,50"
        fill="#FDE68A"
        opacity="0.48"
      />

      {/* 4. RIGHT AMBER-ORANGE S-BELLY CURVE (#F59E0B) */}
      <path
        d="M60 56H72C86.36 56 97 66.4 97 78.5C97 83.2 95.3 87.6 92.2 91.2L77 77.5C77.6 76.6 78 75.6 78 74.5C78 72.8 75.5 71.5 72 71.5H60V56Z"
        fill={`url(#sl-amber-loop-${uid})`}
      />
      {/* Faceted diagonal fold inside the amber curve */}
      <polygon
        points="60,56 79,57 69,71.5 60,71.5"
        fill="#EA580C"
        opacity="0.72"
      />

      {/* 5. BOTTOM-LEFT CRIMSON RED TERMINAL TAIL (#DC2626) */}
      <polygon
        points="42,78 58,78 46,98 25,98"
        fill={`url(#sl-red-tail-${uid})`}
      />
      <polygon
        points="34,88 54,84 46,98 25,98"
        fill="#991B1B"
        opacity="0.6"
      />

      {/* 6. BOTTOM EMERALD GREEN RIBBON SWEEP (#10B981) */}
      <path
        d="M55 78H73C76.2 78 78 76.5 78 74.5C78 73.2 77 72 74.8 71.5H90.5C94.6 74.8 97 79.4 97 84.5C97 92.5 88.2 98 74 98H45L55 78Z"
        fill={`url(#sl-green-base-${uid})`}
      />
      {/* Faceted translucent emerald overlap curves */}
      <path
        d="M66 78H78C86 78 93.5 82 95 88.5C92.5 94.2 84.5 98 74 98H56C63.5 93 66.5 86 66 78Z"
        fill="#047857"
        opacity="0.58"
      />
      <path
        d="M55 78H68C68 86.5 63.5 93.5 55.5 98H45L55 78Z"
        fill="#10B981"
        opacity="0.55"
      />
    </svg>
  );
};

export const SkylineLogo: React.FC<SkylineLogoProps> = ({
  size = 'md',
  showWordmark = false,
  subtitle = 'DIGITAL AGENCY',
  className = '',
  preferUploadedAsset = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeMap: Record<NonNullable<SkylineLogoProps['size']>, string> = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const titleSizeMap: Record<NonNullable<SkylineLogoProps['size']>, string> = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg sm:text-[19px]',
    lg: 'text-xl sm:text-[21px]',
    xl: 'text-2xl',
  };

  const markBoxClass = sizeMap[size];

  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <span
        className={`relative ${markBoxClass} rounded-xl bg-white dark:bg-[#0D1017] border border-[var(--border-hairline)] shadow-sm flex items-center justify-center p-1 overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-[1.03]`}
      >
        {preferUploadedAsset && !imgError ? (
          <img
            src="/assets/aistudio/logo_718e7c56.png"
            alt="SkyLine Digital Agency Logo"
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <SkylineLogoSvg className="w-full h-full" />
        )}
      </span>

      {showWordmark && (
        <span className="flex flex-col text-left leading-none">
          <span
            className={`font-display font-bold tracking-[-0.03em] text-current ${titleSizeMap[size]}`}
          >
            SkyLine
          </span>
          {subtitle && (
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] opacity-75 mt-1">
              {subtitle}
            </span>
          )}
        </span>
      )}
    </span>
  );
};

export default SkylineLogo;
