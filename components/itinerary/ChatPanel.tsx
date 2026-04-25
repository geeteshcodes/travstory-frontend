"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import { Send, Plane, Hotel, Wallet } from "lucide-react";
import AttractionCard from "./AttractionCard";
import { sendChatMessage } from "@/lib/api";

const TEST_USER_ID = "8df20970-ea2d-40e1-8f5c-193dd7315b60";

type Role = "user" | "assistant";
type Attraction = { id: number; title: string; description: string; image: string };

type Message = {
  id: string;
  role: Role;
  content: string;
  attractions?: Attraction[];
};

interface ChatPanelProps {
  destination: string;
  sessionId?: string;
  attractions: Attraction[];
}

export type ChatPanelHandle = {
  sendPrompt: (text: string) => void;
};

function makeSessionId(seed?: string) {
  if (seed) return `chat-${seed}`;
  return `chat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const ChatPanel = forwardRef<ChatPanelHandle, ChatPanelProps>(function ChatPanel(
  { destination, sessionId: seedSession, attractions },
  ref
) {
  const [sessionId] = useState(() => makeSessionId(seedSession));
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "intro-1",
      role: "assistant",
      content: `Hi! I've drafted your trip to ${destination}. Want to tweak the itinerary, swap hotels, or check flight options?`,
    },
    {
      id: "intro-2",
      role: "assistant",
      content: "Here are some top picks for your trip:",
      attractions,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError(null);
    setInput("");

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const { response } = await sendChatMessage({
        user_id: TEST_USER_ID,
        session_id: sessionId,
        message: trimmed,
      });
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", content: response },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      sendPrompt: (text: string) => {
        void sendMessage(text);
      },
    }),
    // sendMessage is stable enough: its stateful bits use refs/state-setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel h-full rounded-3xl flex flex-col overflow-hidden min-h-0"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200/50 flex items-center justify-between bg-white/40 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-md shadow-brand-primary/20">
            <span className="font-bold text-lg italic">T</span>
          </div>
          <div className="min-w-0">
            <h1 className="font-semibold text-slate-800 text-sm truncate">
              TravStory AI Assistant
            </h1>
            <p className="text-[11px] text-slate-500 truncate">
              Ask me anything about your trip
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5 min-h-0"
      >
        {messages.map((m) => {
          if (m.role === "assistant") {
            return (
              <div key={m.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    AI
                  </div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-3.5 rounded-2xl rounded-tl-none border border-white/40 shadow-sm max-w-[85%] min-w-0">
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {m.content}
                  </p>
                  {m.attractions && m.attractions.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 mt-3 -mx-1 px-1 custom-scrollbar snap-x">
                      {m.attractions.map((a) => (
                        <AttractionCard
                          key={a.id}
                          title={a.title}
                          description={a.description}
                          image={a.image}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          }
          return (
            <div key={m.id} className="flex justify-end">
              <div className="bg-brand-primary p-3.5 rounded-2xl rounded-tr-none text-white shadow-lg shadow-brand-primary/20 max-w-[85%]">
                <p className="text-sm whitespace-pre-wrap break-words">{m.content}</p>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                AI
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm px-4 py-2.5 rounded-2xl rounded-tl-none border border-white/40 shadow-sm text-slate-500 text-sm">
              Thinking…
            </div>
          </div>
        )}

        {error && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
            {error}
          </div>
        )}
      </div>

      {/* Quick Actions & Input */}
      <div className="p-4 bg-white/40 border-t border-slate-200/50 space-y-3 shrink-0">
        <div className="flex flex-wrap gap-2">
          <QuickAction
            icon={<Plane size={14} />}
            label="Find Flights"
            disabled={loading}
            onClick={() => void sendMessage(`Find flights to ${destination}`)}
          />
          <QuickAction
            icon={<Hotel size={14} />}
            label="Book Hotels"
            disabled={loading}
            onClick={() => void sendMessage(`Find hotels in ${destination}`)}
          />
          <QuickAction
            icon={<Wallet size={14} />}
            label="Budget Check"
            disabled={loading}
            onClick={() =>
              void sendMessage(
                `Give me a budget breakdown for my trip to ${destination}.`
              )
            }
          />
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            disabled={loading}
            className="w-full bg-white/80 border border-slate-200 rounded-2xl py-3.5 pl-5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary/50 transition-all placeholder:text-slate-400 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-primary text-white rounded-xl flex items-center justify-center hover:bg-brand-secondary transition-colors shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </motion.div>
  );
});

export default ChatPanel;

function QuickAction({
  icon,
  label,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className="flex items-center gap-2 px-3 py-2 bg-white/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:bg-white hover:border-brand-primary transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="text-brand-primary">{icon}</span>
      {label}
    </button>
  );
}
