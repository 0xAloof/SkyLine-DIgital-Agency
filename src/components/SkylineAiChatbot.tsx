import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  X,
  PhoneCall,
  Mic,
  Square,
  Sparkles,
  MapPin,
  Calculator,
  ExternalLink,
} from 'lucide-react';
import { sendAiChatMessageApi, transcribeAudioApi } from '../api/client';
import {
  SkyLineMonogram,
  WhatsAppBrandBadge,
  GmailBrandIcon,
} from './BrandIcons';
import { InteractiveArtifactId } from '../data/agencyData';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  showFallbackActions?: boolean;
}

interface SkylineAiChatbotProps {
  activePage?: string;
  onLaunchArtifact?: (id: InteractiveArtifactId) => void;
  onScrollToEstimator?: () => void;
}

const CONTEXTUAL_CHIPS = [
  {
    id: 'calc-cost',
    label: 'Calculate my project cost',
    prompt: 'Calculate my project cost — what are your ₹10,000 starting packages and negotiable pricing tiers?',
  },
  {
    id: 'clinic-demo',
    label: 'Show clinic website demo',
    prompt: 'Show clinic website demo — how does the AuraCare Clinic website and WhatsApp slot booking work?',
  },
  {
    id: 'talk-sachin',
    label: 'Talk to Sachin on WhatsApp',
    prompt: 'I want to talk to Sachin Sahu on WhatsApp about my project requirements.',
  },
  {
    id: 'hinglish-price',
    label: 'Mere business ke liye kharcha?',
    prompt: 'Mere business ke liye website aur WhatsApp bot ka kharcha kitna aayega?',
  },
];

const SACHIN_WHATSAPP_URL =
  'https://wa.me/918643002478?text=Hi%20SkyLine%20Team%2C%20I%20visited%20your%20website%20and%20want%20to%20discuss%20a%20project.';
const AASHIF_CALL_URL = 'tel:+918959144686';

/**
 * Formats markdown-like bullet points and **bold** spans cleanly for "Gemini in Chrome" readability.
 */
const FormattedBotMessage: React.FC<{ text: string }> = ({ text }) => {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const renderBoldSpans = (input: string) => {
    const parts = input.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-[var(--text-primary)]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono-tech text-[11px]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  if (lines.length <= 1) {
    return <p className="leading-relaxed">{renderBoldSpans(text)}</p>;
  }

  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('* ');
        const cleaned = isBullet ? line.replace(/^[•\-*]\s*/, '') : line;
        return isBullet ? (
          <div key={i} className="flex items-start gap-2 leading-relaxed">
            <span className="text-[#0B63F6] dark:text-[#60A5FA] font-bold mt-0.5 shrink-0">•</span>
            <span>{renderBoldSpans(cleaned)}</span>
          </div>
        ) : (
          <p key={i} className="leading-relaxed">
            {renderBoldSpans(cleaned)}
          </p>
        );
      })}
    </div>
  );
};

export const SkylineAiChatbot: React.FC<SkylineAiChatbotProps> = ({
  activePage = 'home',
  onLaunchArtifact,
  onScrollToEstimator,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('Hero & 3D Overview');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: '• **Namaste! I am SkyBot** — your instant SkyLine AI Assistant.\n• **₹10,000 starting (Negotiable pricing):** Ask me about custom Next.js web apps, 24/7 WhatsApp booking bots, Local Google Maps SEO, or launch a live full-screen website demo below.',
      showFallbackActions: false,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Automatically detect which section the user is viewing ("Gemini in Chrome" Context Awareness)
  useEffect(() => {
    const detectActiveSection = () => {
      if (activePage === 'services') {
        setCurrentSection('Services');
        return;
      }
      if (activePage === 'work') {
        setCurrentSection('Our Work');
        return;
      }
      if (activePage === 'who-we-are') {
        setCurrentSection('Who We Are');
        return;
      }
      if (activePage === 'how-we-deliver') {
        setCurrentSection('Price Estimator');
        return;
      }
      if (activePage === 'referral') {
        setCurrentSection('Partner 15% Offer');
        return;
      }
      if (activePage === 'faq') {
        setCurrentSection('FAQs & Pricing');
        return;
      }
      if (activePage === 'contact') {
        setCurrentSection('Contact & Proposal');
        return;
      }

      // On the main Home view, inspect scroll position relative to key section landmarks
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const estimatorEl = document.getElementById('estimator');
      const workEl = document.getElementById('work');
      const servicesEl = document.getElementById('services');
      const foundersEl = document.getElementById('who-we-are');
      const faqEl = document.getElementById('faq');
      const contactEl = document.getElementById('contact');

      const checkInView = (el: HTMLElement | null) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= vh * 0.55 && rect.bottom >= vh * 0.25;
      };

      if (checkInView(contactEl)) {
        setCurrentSection('Contact & Proposal');
      } else if (checkInView(faqEl)) {
        setCurrentSection('FAQs & Pricing');
      } else if (checkInView(estimatorEl)) {
        setCurrentSection('Price Estimator');
      } else if (checkInView(foundersEl)) {
        setCurrentSection('Who We Are');
      } else if (checkInView(servicesEl)) {
        setCurrentSection('Services');
      } else if (checkInView(workEl)) {
        setCurrentSection('Our Work');
      } else if (scrollY < 650) {
        setCurrentSection('Hero & 3D Overview');
      } else {
        setCurrentSection('Our Work');
      }
    };

    detectActiveSection();
    window.addEventListener('scroll', detectActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', detectActiveSection);
  }, [activePage]);

  const handleSend = async (rawQuery?: string, chipId?: string) => {
    const query = (rawQuery ?? inputValue).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    if (!rawQuery) {
      setInputValue('');
    }
    setIsTyping(true);

    // Optional instant contextual helper triggers for chips
    if (chipId === 'calc-cost' && onScrollToEstimator) {
      onScrollToEstimator();
    }

    try {
      const conversationContext = nextMessages.slice(-6).map((m) => ({
        role: m.sender === 'bot' ? ('model' as const) : ('user' as const),
        text: m.text,
      }));

      const res = await sendAiChatMessageApi(
        query,
        'fast',
        conversationContext,
        currentSection
      );
      const botMsg: ChatMessage = {
        id: `bot-${Date.now() + 1}`,
        sender: 'bot',
        text: res.reply,
        showFallbackActions: res.showFallbackActions,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now() + 1}`,
        sender: 'bot',
        text: '• **₹10,000 starting (Negotiable pricing):** Starter websites & Google Maps SEO start at **₹10,000 – ₹18,000** (1–2 Weeks), and Custom Web Apps + WhatsApp Bots range from **₹18,000 – ₹45,000** (2–3 Weeks).\n• **Direct Connect:** Reach Sachin Sahu on WhatsApp (**+91 86430 02478**) or Aashif Khan via Direct Call (**+91 89591 44686**).',
        showFallbackActions: true,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleToggleVoiceRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      handleSend('Mere business ke liye website aur WhatsApp bot ka kharcha kitna aayega?');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = (reader.result as string)?.split(',')[1];
          if (base64String) {
            setIsTyping(true);
            try {
              const res = await transcribeAudioApi(base64String, 'audio/webm');
              setIsTyping(false);
              if (res.transcript) {
                handleSend(res.transcript);
              }
            } catch {
              setIsTyping(false);
            }
          }
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setIsRecording(false);
    }
  };

  return (
    <div className="relative flex flex-col items-end">
      {/* "Gemini in Chrome" Glassmorphic Side Panel */}
      {isOpen && (
        <div
          data-testid="skybot-gemini-panel"
          className="absolute bottom-14 right-0 w-[370px] sm:w-[400px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] rounded-3xl surface-card bg-white/95 dark:bg-[#09090B]/95 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col border border-[var(--border-strong)] z-50"
        >
          {/* Top Header Bar — Zero Model Name Clutter */}
          <div className="px-4 py-3.5 bg-[#09090B] text-white border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <SkyLineMonogram className="w-8 h-8" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#0B63F6] flex items-center justify-center ring-2 ring-[#09090B]">
                  <Sparkles className="w-2 h-2 text-white" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-xs sm:text-sm text-white truncate">
                    SkyBot • SkyLine AI Assistant
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Instant Ground-Truth Answers • EN / Hinglish</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer shrink-0"
              aria-label="Close SkyBot AI Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Context Awareness Pill at Top ("Gemini in Chrome" Page Context Bar) */}
          <div className="px-4 py-2 bg-[var(--bg-elevated)] border-b border-[var(--border-hairline)] flex items-center justify-between gap-2 shrink-0">
            <div
              data-testid="skybot-context-pill"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B63F6]/10 border border-[#0B63F6]/25 text-[11px] font-medium text-[#0B63F6] dark:text-[#60A5FA]"
            >
              <MapPin className="w-3 h-3 shrink-0" />
              <span>📍 Viewing: {currentSection}</span>
            </div>

            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              Starts at ₹10,000
            </span>
          </div>

          {/* Messages Stream */}
          <div className="px-4 py-3.5 flex-1 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 ${
                      msg.sender === 'user'
                        ? 'bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] font-medium'
                        : 'surface-elevated text-[var(--text-primary)] border border-[var(--border-hairline)]'
                    }`}
                  >
                    {msg.sender === 'bot' ? (
                      <FormattedBotMessage text={msg.text} />
                    ) : (
                      <p className="leading-relaxed">{msg.text}</p>
                    )}
                  </div>
                </div>

                {/* Direct Human Architect Handoff Card */}
                {msg.sender === 'bot' && msg.showFallbackActions && (
                  <div className="pl-1 flex flex-col gap-2">
                    <div className="p-3 rounded-2xl surface-elevated space-y-2 border border-[var(--border-strong)]">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                        Direct Founding Architect Access
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={SACHIN_WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-2.5 rounded-xl btn-whatsapp-official font-semibold text-[11px] flex items-center justify-center gap-1.5"
                        >
                          <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                          <span>WhatsApp Sachin</span>
                        </a>
                        <a
                          href={AASHIF_CALL_URL}
                          className="py-2 px-2.5 rounded-xl bg-[#000000] text-white font-semibold text-[11px] flex items-center justify-center gap-1.5"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-white" />
                          <span>Call Aashif</span>
                        </a>
                      </div>
                      <div className="pt-1 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                        <span className="inline-flex items-center gap-1.5">
                          <GmailBrandIcon size="sm" />
                          <span>Sachinsahuji06@gmail.com</span>
                        </span>
                        <span>Indore, MP</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-3.5 py-2.5 surface-elevated text-[var(--text-secondary)] text-[11px] flex items-center gap-2 border border-[var(--border-hairline)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#0B63F6] animate-spin" />
                  <span>SkyBot is generating an answer...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 1-Click Contextual Action Chips */}
          <div className="px-3.5 py-2 border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)]/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {onLaunchArtifact && (
              <button
                type="button"
                onClick={() => {
                  onLaunchArtifact('auracare-local');
                }}
                className="px-2.5 py-1 rounded-full bg-[#0B63F6] text-white text-[10px] font-semibold transition-all cursor-pointer inline-flex items-center gap-1 shrink-0 shadow-sm hover:opacity-95"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                <span>Open Clinic Website Demo</span>
              </button>
            )}
            {CONTEXTUAL_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                disabled={isTyping}
                onClick={() => handleSend(chip.prompt, chip.id)}
                className="px-2.5 py-1 rounded-full surface-card hover:border-[var(--text-primary)] text-[10px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer shrink-0 disabled:opacity-50 inline-flex items-center gap-1"
              >
                {chip.id === 'calc-cost' && <Calculator className="w-2.5 h-2.5" />}
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          {/* Input Bar + Voice Mic */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 border-t border-[var(--border-hairline)] flex items-center gap-1.5 bg-[var(--bg-surface)] shrink-0"
          >
            <button
              type="button"
              onClick={handleToggleVoiceRecording}
              title={isRecording ? 'Stop recording' : 'Ask by voice'}
              aria-label={isRecording ? 'Stop voice recording' : 'Start voice input'}
              className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'surface-elevated text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isRecording ? <Square className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                isRecording
                  ? 'Listening... click stop when done'
                  : 'Ask in English or Hinglish (e.g. Website cost?)...'
              }
              className="flex-1 px-3 py-2 rounded-xl surface-elevated text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--platinum-primary)]"
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              aria-label="Send message to SkyBot"
              className="p-2 rounded-xl btn-platinum-primary cursor-pointer shrink-0 disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* 3rd (BOTTOM) Floating Launcher Button: Compact Circular/Squircle Icon Button (w-12 h-12) */}
      <button
        type="button"
        data-testid="floating-cta-skybot"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative w-12 h-12 rounded-2xl bg-[#09090B] text-white border border-white/15 shadow-lg hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
        aria-label="Toggle SkyBot AI Assistant"
        title="SkyBot • SkyLine AI Assistant"
      >
        <SkyLineMonogram className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0B63F6] text-white flex items-center justify-center shadow ring-2 ring-white dark:ring-[#09090B]">
          <Sparkles className="w-2.5 h-2.5" />
        </span>
      </button>
    </div>
  );
};
