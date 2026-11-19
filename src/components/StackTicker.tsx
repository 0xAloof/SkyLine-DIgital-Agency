import React from 'react';
import {
  STACK_TICKER_ROW_1,
  STACK_TICKER_ROW_2,
} from '../data/agencyData';
import { TechStackBrandIcon } from './BrandIcons';

export const StackTicker: React.FC = () => {
  // Single unified deduplicated list of core engineering & growth tools
  const unifiedStack = [...STACK_TICKER_ROW_1, ...STACK_TICKER_ROW_2];

  return (
    <section
      aria-label="Technologies and Tools We Master"
      className="py-8 platinum-canvas border-b border-[var(--border-hairline)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <span className="text-xs font-semibold tracking-tight text-[var(--text-secondary)]">
            Production Engineering &amp; Growth Stack
          </span>
          <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">
            Cloud-Native • Zero-Downtime • Official APIs
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {unifiedStack.map((item) => (
            <div
              key={item.name}
              className="px-3.5 py-2 rounded-xl surface-card flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]"
            >
              <TechStackBrandIcon name={item.name} className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
              <span className="text-[10px] text-[var(--text-muted)]">
                • {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
