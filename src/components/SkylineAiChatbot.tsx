import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  PhoneCall,
  Loader2,
  User,
} from 'lucide-react';
import {
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
  SKYLINE_CALL_NUMBER,
  SKYLINE_EMAIL,
} from '../data/agencyData';
import {
  SkyLineAiChatIcon,
  WhatsAppLogoIcon,
} from './BrandIcons';
import { sendAiChatMessageApi, AiChatMessage } from '../api/client';

interface ChatTurn {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  showFallbackActions?: boolean;
}

const FOCUS_PROMPT_SUGGESTIONS: string[] = [
  'Mere business ke liye website aur bot ka kharcha kitna aayega?',
  'How do you get local clinics into the Google Maps #Top pack?',
  'Can I test a live demo of your WhatsApp AI bot?',
];

function isHinglishOrHindiQuery(raw: string): boolean {
  const q = raw.toLowerCase();
  const hinglishMarkers = [
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
    'banani',
    'dukan',
    'business ke',
    'paisa',
    'price kya',
    'naam',
    'aap',
    'karo',
  ];
  return hinglishMarkers.some((marker) => q.includes(marker));
}

function evaluateClientFallbackIntent(query: string): {
  reply: string;
  showFallbackActions: boolean;
} {
  const q = query.toLowerCase();
  const isHi = isHinglishOrHindiQuery(query);

  // Explicit human / founder / enterprise custom negotiation trigger
  if (
    q.includes('human') ||
    q.includes('founder') ||
    q.includes('call') ||
    q.includes('talk to') ||
    q.includes('baat kar') ||
    q.includes('negotiate') ||
    q.includes('custom contract') ||
    q.includes('enterprise sla')
  ) {
    return {
      reply: isHi
        ? `Bilkul! Aap seedhe hamare Founding Architects (Aashif Khan ya Sachin Sahu) se WhatsApp ya Direct Call par baat kar sakte hain. Niche diye gaye button par tap karein. Kya main aapke project ka brief unko forward kar doon?`
        : `You can connect directly with our Founding Architects (Aashif Khan or Sachin Sahu) via WhatsApp or Direct Call using the buttons below. Would you like me to note down your industry before you connect?`,
      showFallbackActions: true,
    };
  }

  if (
    q.includes('price') ||
    q.includes('cost') ||
    q.includes('budget') ||
    q.includes('rate') ||
    q.includes('charge') ||
    q.includes('kharcha') ||
    q.includes('kitna')
  ) {
    return {
      reply: isHi
        ? `Hamare fixed-scope packages bahut clear hain:\n• Local Growth & Google Maps #Top Pack: ₹15k se ₹35k\n• Custom Next.js Web App + WhatsApp AI Bot: ₹35k se ₹85k\n• Multi-Tenant SaaS, ERP & Cloud Systems: ₹90k se ₹2.5L+\n\nHar project 14 se 28 din mein deliver hota hai aur 100% source code ownership aapki hoti hai. Aapka business kis industry mein hai?`
        : `Our transparent milestone packages are:\n• Local Growth & Google Maps #Top Pack: ₹15k to ₹35k\n• Custom Next.js Web App + WhatsApp AI Bot: ₹35k to ₹85k\n• Multi-Tenant SaaS, ERP & Cloud Systems: ₹90k to ₹2.5L+\n\nAll builds ship in 14 to 28 days with 100% source code ownership. Which industry is your business in?`,
      showFallbackActions: false,
    };
  }

  if (
    q.includes('local') ||
    q.includes('clinic') ||
    q.includes('showroom') ||
    q.includes('shop') ||
    q.includes('map')
  ) {
    return {
      reply: isHi
        ? `Local clinics, showrooms, aur retail stores ke liye hum 14 se 21 din mein Google Business Profile entity schema, local citation hubs, aur Smart QR 5-Star Review stands lagate hain taaki aap Google Map Pack #Top mein rank karein. Saath hi 24/7 WhatsApp booking bot har inquiry ko 6 second mein capture karta hai. Aapka clinic ya store kis city mein hai?`
        : `For clinics, showrooms, and retail businesses, we deploy Google Business Profile entity schema, local citation hubs, and Smart QR 5-Star Review stands to rank you in the Google Map Pack #Top within 30 days, paired with a 24/7 WhatsApp booking bot. What city and category do you operate in?`,
      showFallbackActions: false,
    };
  }

  if (
    q.includes('demo') ||
    q.includes('bot') ||
    q.includes('whatsapp') ||
    q.includes('crm') ||
    q.includes('ai')
  ) {
    return {
      reply: isHi
        ? `Hamara Official WhatsApp Cloud AI Bot har nayi inquiry ko 6 second ke andar reply karta hai, unka budget aur requirement puchta hai, PDF brochure bhejta hai, aur calendar slot book kar deta hai. Aap is website ke 'Our Work' ya 'Services' section mein 'Launch Live Interactive Prototype' button daba kar abhi live demo test kar sakte hain! Kya aap real estate, clinic, ya e-commerce ke liye bot dekh rahe hain?`
        : `Our Official WhatsApp Cloud AI Bot greets inbound leads in under 6 seconds, qualifies budget and requirements, dispatches PDF brochures, and locks calendar slots automatically. You can test the live interactive simulator right now by clicking 'Launch Live Interactive Prototype' on our Services or Work cards. Are you looking to automate bookings or sales follow-ups?`,
      showFallbackActions: false,
    };
  }

  if (
    q.includes('refer') ||
    q.includes('15%') ||
    q.includes('commission') ||
    q.includes('student') ||
    q.includes('mentor')
  ) {
    return {
      reply: isHi
        ? `Hamare Offer & Referral page par 2 programs hain:\n1. 15% Partner Commission: Kisi bhi business ko refer karne par deal close hote hi 48 ghante mein 15% direct UPI/bank payout.\n2. 1-on-1 Engineering Mentorship & Project Lab (₹599 se ₹3,999): B.Tech/BCA/MCA students aur founders ke liye live code review aur architecture coaching.\n\nAap partner referral mein interested hain ya engineering mentorship mein?`
        : `We run two programs on our Offer & Referral page:\n1. 15% Partner Commission: Introduce a client and receive a 15% cash payout within 48 hours of invoice settlement.\n2. 1-on-1 Engineering Mentorship & Project Lab (₹599 to ₹3,999): Live architecture and code coaching for B.Tech/BCA/MCA builders and student founders.\n\nWhich program would you like to explore?`,
      showFallbackActions: false,
    };
  }

  return {
    reply: isHi
      ? `Main Sky Bot hoon, SkyLine Digital Agency (Indore, MP) ka AI SDR Agent. Hum sub-100ms Next.js websites, SaaS platforms, 24/7 WhatsApp booking bots, aur Google Maps #Top growth systems banate hain. Agar aap seedhe founders se baat karna chahte hain, toh niche WhatsApp ya Call चुन sakte hain. Aap abhi apne business mein kaunsa bottleneck solve karna chahte hain?`
      : `I am Sky Bot, the AI SDR Agent for SkyLine Digital Agency in Indore, MP. We build fast Next.js web apps, SaaS platforms, 24/7 WhatsApp booking bots, and Google Maps #Top growth systems. You can also connect with our founders below if you need a custom quote. What is the main bottleneck you want to solve right now?`,
    showFallbackActions: true,
  };
}

export const SkylineAiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: 'Hi! I am Sky Bot, SkyLine Digital Agency’s AI SDR Agent. Ask me about project pricing, 24/7 WhatsApp bots, or Google Map Pack #Top growth (in English or Hinglish). What are you building right now?',
      showFallbackActions: false,
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, isOpen]);

  const sendMessage = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || loading) return;

    const userTurn: ChatTurn = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextMessages = [...messages, userTurn];
    setMessages(nextMessages);
    setInput('');
    setIsInputFocused(false);
    setLoading(true);

    try {
      const historyPayload: AiChatMessage[] = nextMessages
        .slice(-6)
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          text: m.text,
        }));

      const res = await sendAiChatMessageApi({
        message: trimmed,
        mode: 'fast',
        history: historyPayload,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: res.reply,
          showFallbackActions: Boolean(res.showFallbackActions),
        },
      ]);
    } catch {
      const fallback = evaluateClientFallbackIntent(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: fallback.reply,
          showFallbackActions: fallback.showFallbackActions,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Routes to Sachin's active WhatsApp (918959144686)
  const whatsappUrl = `https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi SkyLine Digital Agency! I was chatting with Sky Bot and would like to discuss my project.'
  )}`;

  return (
    <>
      {/* Floating Launcher Pill Button (Custom S+A Chat-Monogram Icon) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close Sky Bot Assistant' : 'Open Sky Bot Assistant'}
        className="inline-flex items-center gap-2.5 pl-2 pr-4 py-2 min-h-[48px] rounded-full bg-[#09090B] text-[#F4F4F5] border border-white/15 shadow-2xl hover:scale-[1.03] transition-transform cursor-pointer"
      >
        <SkyLineAiChatIcon size="sm" />
        <div className="text-left leading-tight">
          <div className="text-[11px] font-display font-bold tracking-tight flex items-center gap-1.5">
            <span>Sky Bot</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          </div>
          <div className="font-mono-tech text-[9px] text-zinc-400">
            Ask Pricing &amp; Scope
          </div>
        </div>
      </button>

      {/* Chat Drawer Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Sky Bot AI SDR Agent"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-h-[78vh] rounded-3xl surface-card border border-[var(--border-metallic)] shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Top Header — Zero Model Names, Clean Piper-Style SDR Header */}
          <div className="p-4 bg-[#09090B] text-[#F4F4F5] flex items-center justify-between gap-2 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <SkyLineAiChatIcon size="sm" />
              <div>
                <div className="font-display text-sm font-bold flex items-center gap-1.5">
                  <span>Sky Bot</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[9px] font-mono-tech uppercase text-zinc-200">
                    Online
                  </span>
                </div>
                <div className="text-[10px] font-mono-tech text-zinc-400">
                  SkyLine AI SDR Agent
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Sky Bot Window"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[360px] bg-[var(--bg-canvas)]"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col gap-2 ${
                  m.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-start gap-2 max-w-[90%]">
                  {m.role === 'assistant' && (
                    <div className="mt-0.5 shrink-0">
                      <SkyLineAiChatIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                      m.role === 'user'
                        ? 'bg-[#09090B] text-[#F4F4F5] dark:bg-[#F4F4F5] dark:text-[#09090B] font-medium'
                        : 'surface-card text-[var(--text-primary)]'
                    }`}
                  >
                    {m.text}
                  </div>

                  {m.role === 'user' && (
                    <div className="w-6 h-6 rounded-full surface-elevated flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                    </div>
                  )}
                </div>

                {/* Conditional Escalation Actions: ONLY rendered when showFallbackActions is true */}
                {m.role === 'assistant' && m.showFallbackActions && (
                  <div className="pl-8 flex flex-wrap items-center gap-2 pt-0.5">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-whatsapp-official text-[11px] font-semibold"
                    >
                      <WhatsAppLogoIcon className="w-3.5 h-3.5" />
                      <span>WhatsApp Us</span>
                    </a>
                    <a
                      href={`tel:${SKYLINE_CALL_NUMBER}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-platinum-primary text-[11px] font-semibold"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Call Us</span>
                    </a>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] pl-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--text-primary)]" />
                <span>Sky Bot is typing...</span>
              </div>
            )}
          </div>

          {/* Floating Input-Focus Prompt Suggestions Tray (Shown when input is focused) */}
          {isInputFocused && (
            <div className="px-3.5 py-2.5 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                  Ask me things like:
                </span>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsInputFocused(false);
                  }}
                  className="text-[10px] font-mono-tech text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Hide
                </button>
              </div>
              <div className="flex flex-col gap-1.5">
                {FOCUS_PROMPT_SUGGESTIONS.map((promptText) => (
                  <button
                    key={promptText}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      void sendMessage(promptText);
                    }}
                    className="w-full text-left text-[11px] px-3 py-2 rounded-xl surface-card hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-colors cursor-pointer font-medium"
                  >
                    {promptText}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage(input);
            }}
            className="p-3 bg-[var(--bg-canvas)] border-t border-[var(--border-hairline)] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => {
                setTimeout(() => setIsInputFocused(false), 180);
              }}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Sky Bot in English or Hinglish..."
              aria-label="Ask Sky Bot a question"
              className="flex-1 px-3.5 py-2.5 rounded-xl surface-elevated text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--text-primary)]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="w-10 h-10 rounded-xl btn-platinum-primary flex items-center justify-center disabled:opacity-40 cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Subtle Email Footer */}
          <div className="px-4 py-1.5 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)] flex items-center justify-between text-[10px] font-mono-tech text-[var(--text-muted)]">
            <span>Indore, MP • 24/7 SDR Desk</span>
            <a href={`mailto:${SKYLINE_EMAIL}`} className="hover:underline">
              {SKYLINE_EMAIL}
            </a>
          </div>
        </div>
      )}
    </>
  );
};
