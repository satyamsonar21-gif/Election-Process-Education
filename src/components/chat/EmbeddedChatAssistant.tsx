"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Bot,
  User,
  Send,
  Sparkles,
  Zap,
  HelpCircle,
  Vote,
  BookOpen,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

/**
 * Embedded AI Chat Assistant — redesigned full-width conversational UI.
 * Falls back to a local knowledge base when no OpenAI API key is configured.
 */

/* ── Local knowledge base (offline fallback) ── */
const localAnswers: Record<string, string> = {
  "voting age":
    "The minimum voting age in India is **18 years**. This was set by the 61st Amendment Act of 1989, which lowered it from 21 to 18 to encourage youth participation in democracy.",
  evm: "**EVM (Electronic Voting Machine)** is an electronic device used for recording votes in Indian elections. It consists of a Control Unit and a Ballot Unit. EVMs were first used in 1982 in Kerala and have been used nationwide since 2004. Each EVM can store up to 2,000 votes and runs on a single battery.",
  nota: '**NOTA (None Of The Above)** is an option on the ballot that allows voters to officially reject all candidates. It was introduced in India in 2013 following a Supreme Court ruling. If NOTA gets the highest votes, the candidate with the next highest votes still wins.',
  "election commission":
    "The **Election Commission of India (ECI)** is an autonomous constitutional body responsible for administering elections in India. It was established on January 25, 1950. It ensures free and fair elections and enforces the Model Code of Conduct.",
  vvpat:
    "**VVPAT (Voter Verifiable Paper Audit Trail)** is a method that provides feedback to voters using a printed paper slip. When a vote is cast on the EVM, the VVPAT printer prints a slip showing the candidate's name, serial number, and party symbol. The slip is visible for 7 seconds.",
  "lok sabha":
    "The **Lok Sabha** (House of the People) is the lower house of India's Parliament. It has 543 elected members. A party or coalition needs at least **272 seats** to form the government. Members are elected through direct elections using the First-Past-The-Post system.",
  "voter id":
    "The **Voter ID (EPIC - Elector's Photo Identity Card)** is the primary document for voter identification. To get one, citizens must fill Form 6 online via the NVSP portal or at the local Electoral Registration Office. You must be at least 18 years old and a citizen of India.",
  "model code":
    "The **Model Code of Conduct (MCC)** is a set of guidelines issued by the Election Commission for political parties and candidates during elections. It comes into effect from the announcement of elections and remains until results are declared. It covers areas like speeches, polling day conduct, and use of government resources.",
  "first past the post":
    '**FPTP (First-Past-The-Post)** is the electoral system used in India. The candidate who receives the most votes in a constituency wins the seat, even without an absolute majority. This is a simple plurality system.',
  "how to vote":
    "To vote in India: 1) Register on the electoral roll (NVSP portal or local office), 2) Get your Voter ID card (EPIC), 3) On election day, go to your assigned polling booth, 4) Show your ID, get your finger marked with indelible ink, 5) Press the button next to your candidate on the EVM, 6) Check the VVPAT slip, 7) Done!",
};

function findLocalAnswer(query: string): string | null {
  const q = query.toLowerCase();
  for (const [key, answer] of Object.entries(localAnswers)) {
    if (q.includes(key)) return answer;
  }
  if (q.includes("hello") || q.includes("hi")) {
    return "Hello! 👋 I'm ElectionEdu AI. Ask me anything about elections, voting, EVMs, the Election Commission, or the democratic process in India!";
  }
  if (q.includes("help")) {
    return "I can help you learn about: **Voting age**, **EVMs**, **NOTA**, **Election Commission**, **VVPAT**, **Lok Sabha**, **Voter ID**, **Model Code of Conduct**, **How to vote**, and more! Just ask a question.";
  }
  return null;
}

/* ── Suggested questions ── */
const suggestions = [
  { text: "How do EVMs work?", icon: Zap, category: "Technology" },
  { text: "What is NOTA?", icon: HelpCircle, category: "Voting" },
  { text: "How to register to vote?", icon: Vote, category: "Getting Started" },
  { text: "What is VVPAT?", icon: BookOpen, category: "Technology" },
  { text: "What is the Model Code of Conduct?", icon: BookOpen, category: "Rules" },
  { text: "Who runs elections in India?", icon: HelpCircle, category: "Governance" },
];

/* ── Main Component ── */
export default function EmbeddedChatAssistant() {
  const [messages, setMessages] = useState<
    { role: string; content: string; timestamp: Date }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /* Auto-resize textarea */
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height =
        Math.min(inputRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  /* Scroll detection */
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    setShowScrollBtn(!atBottom && messages.length > 2);
  }, [messages.length]);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: "user", content: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { ...data, timestamp: new Date() },
        ]);
        setIsLoading(false);
        return;
      }
    } catch {
      // API unavailable — fall through to local
    }

    const localAnswer = findLocalAnswer(text);
    const fallback =
      localAnswer ||
      "I'm sorry, I don't have a specific answer for that yet. Try asking about **voting age**, **EVMs**, **NOTA**, **Election Commission**, **VVPAT**, or **how to vote**!";

    await new Promise((r) => setTimeout(r, 600));
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: fallback, timestamp: new Date() },
    ]);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
  };

  /* ── Render markdown bold ── */
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const isEmpty = messages.length === 0;

  return (
    <div
      className="rounded-3xl overflow-hidden mb-12 flex flex-col shadow-2xl"
      style={{
        height: "640px",
        background: "linear-gradient(160deg, #0c0c1d 0%, #141432 40%, #0e0e24 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ─── Top Bar ─── */}
      <div
        className="relative px-6 py-4 flex items-center justify-between flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.5), transparent)",
          }}
        />

        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0c0c1d]">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
            </span>
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-white tracking-tight">
              ElectionEdu AI
            </h2>
            <p className="text-[11px] text-slate-400">
              Powered by GPT-4o • Your election knowledge companion
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={resetChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-400 hover:text-white transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              title="New conversation"
            >
              <RotateCcw className="w-3 h-3" />
              New chat
            </button>
          )}
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wider"
            style={{
              background: "rgba(16,185,129,0.1)",
              color: "rgb(52,211,153)",
              border: "1px solid rgba(16,185,129,0.15)",
            }}
          >
            ● ONLINE
          </span>
        </div>
      </div>

      {/* ─── Messages Area ─── */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-5 py-5 relative"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(99,102,241,0.2) transparent",
        }}
      >
        {/* Empty state — welcome + suggestions */}
        {isEmpty && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
            {/* Floating orb */}
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 animate-pulse-glow"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))",
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              <MessageCircle className="w-9 h-9 text-indigo-400" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Ask me anything about Indian elections
            </h3>
            <p className="text-sm text-slate-400 max-w-sm mb-8 leading-relaxed">
              I can help with voter registration, EVMs, election rules,
              constitutional provisions, and more.
            </p>

            {/* Suggestion chips — 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
              {suggestions.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.text}
                    onClick={() => sendMessage(s.text)}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(99,102,241,0.1)";
                      e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(99,102,241,0.1)",
                      }}
                    >
                      <Icon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-slate-300 group-hover:text-white transition-colors truncate">
                        {s.text}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {s.category}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Chat messages */}
        {!isEmpty && (
          <div className="space-y-5">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                <div
                  className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg, #6366f1, #818cf8)"
                          : "linear-gradient(135deg, #059669, #10b981)",
                      boxShadow:
                        msg.role === "user"
                          ? "0 2px 10px rgba(99,102,241,0.25)"
                          : "0 2px 10px rgba(16,185,129,0.25)",
                    }}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div className="flex flex-col gap-1.5">
                    <div
                      className="px-4 py-3 text-[13.5px] leading-relaxed"
                      style={
                        msg.role === "user"
                          ? {
                              background: "linear-gradient(135deg, #4338ca, #6366f1)",
                              color: "#fff",
                              borderRadius: "18px 18px 4px 18px",
                              boxShadow: "0 2px 12px rgba(67,56,202,0.2)",
                            }
                          : {
                              background: "rgba(255,255,255,0.04)",
                              color: "#d1d5db",
                              border: "1px solid rgba(255,255,255,0.07)",
                              borderRadius: "18px 18px 18px 4px",
                            }
                      }
                    >
                      {renderText(msg.content)}
                    </div>

                    {/* Meta row — timestamp + copy */}
                    <div
                      className={`flex items-center gap-2 px-1 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <span className="text-[10px] text-slate-500">
                        {msg.timestamp.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {msg.role === "assistant" && (
                        <button
                          onClick={() => copyToClipboard(msg.content, idx)}
                          className="text-slate-500 hover:text-indigo-400 transition-colors p-0.5"
                          title="Copy answer"
                        >
                          {copiedIdx === idx ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start animate-slide-up">
                <div className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: "linear-gradient(135deg, #059669, #10b981)",
                    }}
                  >
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div
                    className="px-5 py-4 flex items-center gap-3"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "18px 18px 18px 4px",
                    }}
                  >
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <span className="text-[12px] text-slate-500">
                      Thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Scroll-to-bottom FAB */}
        {showScrollBtn && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10"
            style={{
              background: "rgba(99,102,241,0.25)",
              border: "1px solid rgba(99,102,241,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ChevronDown className="w-4 h-4 text-indigo-300" />
          </button>
        )}
      </div>

      {/* ─── Input Area ─── */}
      <div
        className="px-5 py-4 flex-shrink-0"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <div
            className="flex-1 relative rounded-xl overflow-hidden transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Indian elections..."
              rows={1}
              className="w-full px-4 py-3 text-[13.5px] text-white placeholder-slate-500 bg-transparent focus:outline-none resize-none"
              style={{
                maxHeight: "120px",
                lineHeight: "1.5",
              }}
              onFocus={(e) => {
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.borderColor = "rgba(99,102,241,0.4)";
                  parent.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
                }
              }}
              onBlur={(e) => {
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.borderColor = "rgba(255,255,255,0.07)";
                  parent.style.boxShadow = "none";
                }
              }}
              aria-label="Type your election question"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all duration-200 flex-shrink-0 disabled:opacity-25 disabled:cursor-not-allowed"
            style={{
              background:
                !input.trim() || isLoading
                  ? "rgba(99,102,241,0.2)"
                  : "linear-gradient(135deg, #4338ca, #6366f1)",
              boxShadow:
                !input.trim() || isLoading
                  ? "none"
                  : "0 4px 15px rgba(67,56,202,0.35)",
            }}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-slate-600 text-center mt-2.5">
          ElectionEdu AI may occasionally provide inaccurate information. Verify important facts.
        </p>
      </div>
    </div>
  );
}
