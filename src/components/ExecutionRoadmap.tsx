import React, { useState } from 'react';
import {
  CheckCircle2,
  Shield,
  ArrowRight,
  Clock,
  FileCode2,
  Layers,
  Terminal,
  Rocket,
  PhoneCall,
} from 'lucide-react';
import {
  EXECUTION_ROADMAP,
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
  SKYLINE_CALL_NUMBER,
} from '../data/agencyData';
import { WhatsAppBrandBadge } from './BrandIcons';

interface ExecutionRoadmapProps {
  onNavigate: (sectionId: string) => void;
  isDedicatedPage?: boolean;
}

export const ExecutionRoadmap: React.FC<ExecutionRoadmapProps> = ({
  onNavigate,
  isDedicatedPage = false,
}) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const activeStage = EXECUTION_ROADMAP[selectedStageIndex] || EXECUTION_ROADMAP[0];

  return (
    <section
      id="how-we-deliver"
      className={`${
        isDedicatedPage ? 'pt-28 sm:pt-32 pb-20 sm:pb-28' : 'py-20 sm:py-28'
      } px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-architectural-grid`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--text-primary)]" />
              <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                HOW WE DELIVER • 6-STAGE ENGINEERING &amp; GROWTH SYSTEM
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08]">
              Transparent Milestones.{' '}
              <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                Zero Agency Surprises.
              </span>
            </h1>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed">
            No vague timelines, hidden subcontractors, or endless retainers. Every SkyLine engagement moves through our 6-stage verification pipeline led directly by Founder &amp; CEO <strong>Sachin Sahu</strong> and Co-Founder &amp; System Architect <strong>Aashif Khan</strong>.
          </p>
        </div>

        {/* Interactive Stage Inspector Bar */}
        <div className="surface-card rounded-3xl p-6 sm:p-8 border border-[var(--border-hairline)] border-t border-white/15 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
            <div className="flex items-center gap-2 font-mono-tech text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              <Terminal className="w-4 h-4 text-[var(--text-primary)]" />
              <span>INTERACTIVE STAGE INSPECTOR — CLICK ANY STAGE TO AUDIT DELIVERABLES &amp; SLA GATE</span>
            </div>
            <span className="px-3 py-1 rounded-full badge-platinum font-mono-tech text-[11px] font-semibold">
              14–21 DAYS END-TO-END LAUNCH
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {EXECUTION_ROADMAP.map((stage, idx) => {
              const isSelected = idx === selectedStageIndex;
              return (
                <button
                  key={stage.phase}
                  type="button"
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'btn-platinum-primary border-transparent shadow-md'
                      : 'surface-elevated border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="font-mono-tech text-[10px] font-bold uppercase tracking-widest opacity-80">
                    {stage.phase}
                  </div>
                  <div className="font-display text-xs sm:text-sm font-bold mt-1 line-clamp-1">
                    {stage.title}
                  </div>
                  <div className="font-mono-tech text-[10px] mt-1 opacity-75">
                    {stage.duration}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep Dive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="px-3 py-1 rounded-full badge-platinum font-mono-tech text-[10px] font-bold uppercase tracking-widest">
                  {activeStage.phase}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full surface-elevated font-mono-tech text-xs font-semibold text-[var(--text-primary)]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeStage.duration}</span>
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                {activeStage.title}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {activeStage.description}
              </p>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl surface-elevated border border-[var(--border-hairline)] space-y-3">
              <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                <span>STAGE DELIVERABLES &amp; VERIFICATION GATE</span>
              </div>
              <div className="space-y-2">
                {activeStage.deliverables.map((del) => (
                  <div
                    key={del}
                    className="flex items-start gap-2 text-xs text-[var(--text-primary)] font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--text-primary)] shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center gap-2 text-[11px] font-mono-tech text-[var(--text-primary)] font-semibold">
                <Shield className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                <span>{activeStage.verificationGate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* All 6 Stages Full Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXECUTION_ROADMAP.map((item, idx) => (
            <div
              key={item.phase}
              onClick={() => setSelectedStageIndex(idx)}
              className={`surface-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between relative group overflow-hidden cursor-pointer transition-all border ${
                idx === selectedStageIndex
                  ? 'border-[var(--text-primary)] shadow-lg'
                  : 'border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full font-mono-tech text-[10px] font-semibold uppercase tracking-widest badge-platinum">
                    {item.phase}
                  </span>
                  <span className="px-3 py-1 rounded-full surface-elevated font-mono-tech text-xs text-[var(--text-primary)] font-semibold">
                    {item.duration}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  {item.deliverables.map((del) => (
                    <div
                      key={del}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--text-secondary)] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-hairline)]">
                <div className="p-3 rounded-xl surface-elevated flex items-center gap-2 text-[11px] font-mono-tech text-[var(--text-primary)]">
                  <Shield className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0" />
                  <span>{item.verificationGate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Core Delivery Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              badge: 'GUARANTEE 01',
              title: '100% Source Code & Cloud Ownership',
              desc: 'Your GitHub repository, database, domain, and Meta/Google ad accounts stay in your name from Day 1. Zero vendor lock-in.',
            },
            {
              badge: 'GUARANTEE 02',
              title: 'Direct Founder Engineering Access',
              desc: 'You communicate directly on WhatsApp and voice call with Sachin Sahu (Founder & CEO) and Aashif Khan (Co-Founder & System Architect).',
            },
            {
              badge: 'GUARANTEE 03',
              title: '98+ Lighthouse & Security SLA',
              desc: 'Every release is load-tested, schema-validated, and audited for sub-second response times before final milestone sign-off.',
            },
          ].map((item) => (
            <div
              key={item.badge}
              className="surface-card rounded-2xl p-6 border border-[var(--border-hairline)] space-y-2"
            >
              <div className="font-mono-tech text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                {item.badge}
              </div>
              <div className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)]">
                {item.title}
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Conversion Bar */}
        <div className="surface-card rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-[var(--border-hairline)]">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2">
              <Rocket className="w-4 h-4 text-[var(--text-primary)]" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                START STAGE 01 TODAY
              </span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              Ready to lock your 21-day launch roadmap with our Founding Architects?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Get your system architecture blueprint, fixed INR milestone quote, and staging timeline within 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hi Sachin! I reviewed your 6-Stage Delivery System on SkyLine Digital Agency and want to discuss a project.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-whatsapp-official text-xs font-bold"
            >
              <WhatsAppBrandBadge size="sm" className="border border-white/30" />
              <span>WhatsApp Sachin Sahu</span>
            </a>

            <a
              href={`tel:${SKYLINE_CALL_NUMBER}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-call-black bg-[#000000] text-[#FFFFFF] text-xs font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FFFFFF]" />
              <span>Call Aashif Khan</span>
            </a>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-platinum-primary text-xs font-bold cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Book Discovery Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
