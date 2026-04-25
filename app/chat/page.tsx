"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendChatMessage } from "@/lib/api";

type Role = "user" | "assistant";
type Message = { id: string; role: Role; content: string };

const TEST_USER_ID = "8df20970-ea2d-40e1-8f5c-193dd7315b60";

function makeSessionId() {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function ChatPageInner() {
  const searchParams = useSearchParams();
  // Prefill from `?q=` once at construction — don't clobber later edits.
  const [sessionId] = useState(makeSessionId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(() => searchParams.get("q") ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const { response } = await sendChatMessage({
        user_id: TEST_USER_ID,
        session_id: sessionId,
        message: trimmed,
      });
      const botMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounceDot {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.7); }
          50% { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .message-enter {
          animation: fadeSlideUp 0.3s ease-out forwards;
          opacity: 0;
        }
        .typing-dot {
          animation: bounceDot 1.4s infinite ease-in-out both;
        }
        .send-button {
          transition: all 0.2s ease;
        }
        .send-button:hover:not(:disabled) {
          transform: scale(1.02);
          filter: brightness(1.05);
        }
        .send-button:active:not(:disabled) {
          transform: scale(0.98);
        }
        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }
        .chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(59,130,246,0.6);
          border-radius: 10px;
        }
      `}</style>

      <div style={{
  minHeight: '100vh',
  backgroundImage: "url('/pexels-hugo-guillemard-2158157486-35536973.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  // remove the gradient line
  fontFamily: 'system-ui, -apple-system, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '70px',
}}>
        {/* Fixed header */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          zIndex: 50,
          padding: '16px 24px',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              animation: 'pulseGlow 2s infinite',
            }}>
              ✈️
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', margin: 0 }}>TravStory Agent</h1>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>AI travel planner · 24/7</p>
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <div style={{
            width: '100%',
            maxWidth: '800px',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '28px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            height: 'calc(100vh - 120px)',
          }}>
            {/* Messages */}
            <div ref={scrollRef} className="chat-scroll" style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {messages.length === 0 && !loading && (
                <div className="message-enter" style={{
                  textAlign: 'center',
                  padding: '48px 20px',
                  color: 'white',
                }}>
                  <div className="floating-icon" style={{ fontSize: '72px', marginBottom: '16px' }}>🌍</div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>Ready to explore?</h2>
                  <p style={{ opacity: 0.9, maxWidth: '400px', margin: '0 auto' }}>
                    Ask me to plan a trip, find hidden gems, or suggest destinations.
                  </p>
                  <div style={{
                    marginTop: '24px',
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: '40px',
                    padding: '8px 20px',
                    display: 'inline-block',
                    fontSize: '14px',
                  }}>
                    💡 Try: “3 days in Goa, budget ₹20000”
                  </div>
                </div>
              )}

              {messages.map((m: Message, idx: number) => (  // ✅ Explicit types
                <div
                  key={m.id}
                  className="message-enter"
                  style={{
                    display: 'flex',
                    justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                    animationDelay: `${idx * 60}ms`,
                  }}
                >
                  <div style={{
                    maxWidth: '80%',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: m.role === 'user' ? '#3b82f6' : '#ffffff',
                      borderRadius: '999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      flexShrink: 0,
                    }}>
                      {m.role === 'user' ? '🧑' : '🤖'}
                    </div>
                    <div style={{
                      background: m.role === 'user' ? '#3b82f6' : 'white',
                      color: m.role === 'user' ? 'white' : '#1f2937',
                      padding: '12px 18px',
                      borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      lineHeight: 1.5,
                      fontSize: '15px',
                    }}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message-enter" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'white',
                      borderRadius: '999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                    }}>🤖</div>
                    <div style={{
                      background: 'white',
                      padding: '12px 20px',
                      borderRadius: '20px 20px 20px 4px',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                    }}>
                      <div className="typing-dot" style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '999px', animationDelay: '0s' }}></div>
                      <div className="typing-dot" style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '999px', animationDelay: '0.2s' }}></div>
                      <div className="typing-dot" style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '999px', animationDelay: '0.4s' }}></div>
                      <span style={{ fontSize: '14px', color: '#4b5563', marginLeft: '4px' }}>typing...</span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    background: '#ef4444',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '40px',
                    fontSize: '14px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                  }}>
                    <span>⚠️</span> {error}
                  </div>
                </div>
              )}
            </div>

            {/* Input form */}
            <form onSubmit={handleSend} style={{
              padding: '16px 20px',
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(8px)',
              borderTop: '1px solid rgba(255,255,255,0.15)',
            }}>
              <div style={{ display: 'flex', gap: '12px', maxWidth: '800px', margin: '0 auto' }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about places, hotels, flights..."
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    background: 'white',
                    border: 'none',
                    borderRadius: '80px',
                    fontSize: '15px',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'box-shadow 0.2s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.5)')}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)')}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="send-button"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    border: 'none',
                    borderRadius: '80px',
                    padding: '0 28px',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                    opacity: loading || !input.trim() ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  <span>✈️</span> Send
                </button>
              </div>
              <div style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '10px' }}>
                Press Enter to send · Shift+Enter for new line
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569" }}>
          Loading chat…
        </div>
      }
    >
      <ChatPageInner />
    </Suspense>
  );
}
