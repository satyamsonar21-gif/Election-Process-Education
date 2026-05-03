"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Minus,
} from "lucide-react";

/**
 * Floating AI Chat Assistant — premium dark glassmorphic bubble.
 * Falls back to a local knowledge base when no OpenAI API key is configured.
 */

const localAnswers: Record<string, string> = {
  "voting age":
    "The minimum voting age in India is **18 years**. This was set by the 61st Amendment Act of 1989, which lowered it from 21 to 18 to encourage youth participation in democracy.",
  evm: "**EVM (Electronic Voting Machine)** is an electronic device used for recording votes in Indian elections. It consists of a Control Unit and a Ballot Unit. EVMs were first used in 1982 in Kerala and have been used nationwide since 2004.",
  nota: '**NOTA (None Of The Above)** is an option on the ballot that allows voters to officially reject all candidates. It was introduced in India in 2013 following a Supreme Court ruling.',
  "election commission":
    "The **Election Commission of India (ECI)** is an autonomous constitutional body responsible for administering elections in India. Established on January 25, 1950, it ensures free and fair elections.",
  vvpat:
    "**VVPAT (Voter Verifiable Paper Audit Trail)** provides feedback to voters using a printed paper slip. The slip shows the candidate's name, serial number, and party symbol, visible for 7 seconds.",
  "lok sabha":
    "The **Lok Sabha** (House of the People) is the lower house of India's Parliament with 543 elected members. A party needs at least **272 seats** to form the government.",
  "voter id":
    "The **Voter ID (EPIC)** is the primary document for voter identification. Citizens must fill Form 6 online via the NVSP portal or at the local Electoral Registration Office.",
  "model code":
    "The **Model Code of Conduct (MCC)** is a set of guidelines issued by the Election Commission for political parties and candidates during elections.",
  "first past the post":
    '**FPTP** is the electoral system used in India. The candidate who receives the most votes wins, even without an absolute majority.',
  "how to vote":
    "To vote in India: 1) Register on the electoral roll, 2) Get your Voter ID, 3) Go to your polling booth on election day, 4) Show your ID and get inked, 5) Press the button on the EVM, 6) Check the VVPAT slip!",
};

function findLocalAnswer(query: string): string | null {
  const q = query.toLowerCase();
  for (const [key, answer] of Object.entries(localAnswers)) {
    if (q.includes(key)) return answer;
  }
  if (q.includes("hello") || q.includes("hi")) {
    return "Hello! 👋 I'm ElectionEdu AI. Ask me anything about elections, voting, EVMs, or the democratic process in India!";
  }
  if (q.includes("help")) {
    return "I can help with: **Voting age**, **EVMs**, **NOTA**, **Election Commission**, **VVPAT**, **Voter ID**, **How to vote**, and more!";
  }
  return null;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: string; content: string; timestamp: Date }[]
  >([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm **ElectionEdu AI**. Ask me anything about elections, voting, EVMs, or the democratic process!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setHasUnread(false);
    }
  }, [isOpen]);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { role: "user", content: text, timestamp: new Date() };
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
        setMessages((prev) => [...prev, { ...data, timestamp: new Date() }]);
        if (!isOpen) setHasUnread(true);
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
    if (!isOpen) setHasUnread(true);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! 👋 I'm **ElectionEdu AI**. Ask me anything about elections, voting, EVMs, or the democratic process!",
        timestamp: new Date(),
      },
    ]);
    setInput("");
  };

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

  return (
    <>
      {/* ── FAB (Floating Action Button) ── */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-2xl shadow-2xl transition-all duration-300 z-40 group ${
          isOpen
            ? "scale-0 opacity-0 pointer-events-none"
            : "scale-100 opacity-100"
        }`}
        style={{
          background: "linear-gradient(135deg, #4338ca, #7c3aed)",
          boxShadow:
            "0 8px 30px rgba(67,56,202,0.4), 0 0 0 0 rgba(67,56,202,0.3)",
        }}
        aria-label="Open AI Chat Assistant"
      >
        <MessageSquare className="w-6 h-6 text-white mx-auto group-hover:scale-110 transition-transform" />

        {/* Pulse */}
        <span
          className="absolute inset-0 rounded-2xl animate-ping opacity-15"
          style={{ background: "linear-gradient(135deg, #4338ca, #7c3aed)" }}
        />

        {/* Unread badge */}
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">!</span>
          </span>
        )}
      </button>

      {/* ── Chat Window ── */}
      <div
        className={`fixed bottom-6 right-6 w-[380px] sm:w-[400px] flex flex-col z-50 transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
        style={{
          height: "560px",
          background: "linear-gradient(160deg, #0c0c1d 0%, #141432 40%, #0e0e24 100%)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.5), 0 0 50px rgba(99,102,241,0.08)",
        }}
        role="dialog"
        aria-label="AI Chat Assistant"
      >
        {/* ─ Header ─ */}
        <div
          className="relative px-5 py-3.5 flex justify-between items-center flex-shrink-0"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(99,102,241,0.04)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.4), transparent)",
            }}
          />

          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 2px 12px rgba(99,102,241,0.25)",
                }}
              >
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0c0c1d]" />
            </div>
            <div>
              <h3 className="font-bold text-[13px] text-white">
                ElectionEdu AI
              </h3>
              <p className="text-[10px] text-slate-500">
                Ask about Indian elections
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {messages.length > 1 && (
              <button
                onClick={resetChat}
                className="p-2 rounded-lg text-slate-500 hover:text-indigo-400 transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-slate-500 hover:text-white transition-all"
              style={{ background: "rgba(255,255,255,0.03)" }}
              aria-label="Minimize chat"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-slate-500 hover:text-rose-400 transition-all"
              style={{ background: "rgba(255,255,255,0.03)" }}
              aria-label="Close chat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ─ Messages ─ */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(99,102,241,0.2) transparent",
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
            >
              <div
                className={`flex gap-2.5 max-w-[88%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                  style={{
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #6366f1, #818cf8)"
                        : "linear-gradient(135deg, #059669, #10b981)",
                  }}
                >
                  {msg.role === "user" ? (
                    <User className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-white" />
                  )}
                </div>

                {/* Bubble + meta */}
                <div className="flex flex-col gap-1">
                  <div
                    className="px-3.5 py-2.5 text-[13px] leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, #4338ca, #6366f1)",
                            color: "#fff",
                            borderRadius: "16px 16px 4px 16px",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            color: "#d1d5db",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "16px 16px 16px 4px",
                          }
                    }
                  >
                    {renderText(msg.content)}
                  </div>

                  {/* Meta */}
                  <div
                    className={`flex items-center gap-1.5 px-1 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <span className="text-[9px] text-slate-600">
                      {msg.timestamp.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {msg.role === "assistant" && idx > 0 && (
                      <button
                        onClick={() => copyToClipboard(msg.content, idx)}
                        className="text-slate-600 hover:text-indigo-400 transition-colors"
                        title="Copy"
                      >
                        {copiedIdx === idx ? (
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-2.5 h-2.5" />
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
              <div className="flex gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                >
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px 16px 16px 4px",
                  }}
                >
                  <div className="flex gap-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ─ Input ─ */}
        <div
          className="px-4 py-3 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <div
              className="flex-1 rounded-xl overflow-hidden transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about elections..."
                rows={1}
                className="w-full px-4 py-2.5 text-[13px] text-white placeholder-slate-500 bg-transparent focus:outline-none resize-none"
                style={{ maxHeight: "80px", lineHeight: "1.5" }}
                onFocus={(e) => {
                  const p = e.currentTarget.parentElement;
                  if (p) {
                    p.style.borderColor = "rgba(99,102,241,0.4)";
                    p.style.boxShadow = "0 0 0 2px rgba(99,102,241,0.08)";
                  }
                }}
                onBlur={(e) => {
                  const p = e.currentTarget.parentElement;
                  if (p) {
                    p.style.borderColor = "rgba(255,255,255,0.06)";
                    p.style.boxShadow = "none";
                  }
                }}
                aria-label="Type your question"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-25 disabled:cursor-not-allowed flex-shrink-0"
              style={{
                background:
                  !input.trim() || isLoading
                    ? "rgba(99,102,241,0.2)"
                    : "linear-gradient(135deg, #4338ca, #6366f1)",
                boxShadow:
                  !input.trim() || isLoading
                    ? "none"
                    : "0 4px 12px rgba(67,56,202,0.3)",
              }}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
