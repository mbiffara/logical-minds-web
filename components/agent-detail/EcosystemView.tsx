"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

const capabilityKeys = [
  "deployments",
  "analytics",
  "sprint",
  "monitoring",
  "codeReview",
  "tasks",
] as const;

const capabilityIcons: Record<string, React.ReactNode> = {
  deployments: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  analytics: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  sprint: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  monitoring: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  codeReview: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  tasks: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
};

// Map demo message indices to which capability they highlight
const demoCapabilityMap: Record<number, string> = {
  0: "monitoring",
  1: "deployments",
  2: "deployments",
  3: "analytics",
  4: "analytics",
};

// Keyword lists for topic matching
const topicKeywords: Record<string, string[]> = {
  deployments: ["deploy", "staging", "production", "release", "ship", "launch", "rollback", "pipeline", "build", "ci/cd"],
  analytics: ["analytics", "conversion", "metric", "kpi", "performance", "traffic", "user", "revenue", "data", "dashboard", "bounce", "session"],
  sprint: ["sprint", "velocity", "backlog", "story", "standup", "planning", "retro", "scrum", "iteration", "agile"],
  monitoring: ["monitor", "alert", "uptime", "error", "log", "incident", "health", "status", "cpu", "memory", "system"],
  codeReview: ["pr", "pull request", "code review", "merge", "branch", "diff", "commit", "review", "coverage"],
  tasks: ["task", "assign", "team", "priority", "deadline", "blocker", "workload", "who", "member", "progress"],
};

const greetingPatterns = ["hello", "hi", "hey", "hola", "buenos", "good morning", "sup", "what's up", "howdy", "yo"];

function matchTopic(input: string): string {
  const lower = input.toLowerCase();
  if (greetingPatterns.some((g) => lower.includes(g))) return "greeting";
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) return topic;
  }
  return "fallback";
}

interface ChatMessage {
  type: "bot" | "user";
  text: string;
  key: string;
}

let msgIdCounter = 0;

export default function EcosystemView() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [activeCapability, setActiveCapability] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [inputEnabled, setInputEnabled] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const finalTypingRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasAnimated = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Build demo messages from translations
  const demoMessages: ChatMessage[] = [
    { type: "bot", text: t("agentDetail.ecosystem.chat.welcome"), key: "welcome" },
    { type: "user", text: t("agentDetail.ecosystem.chat.userDeploy"), key: "userDeploy" },
    { type: "bot", text: t("agentDetail.ecosystem.chat.botDeploy"), key: "botDeploy" },
    { type: "user", text: t("agentDetail.ecosystem.chat.userAnalytics"), key: "userAnalytics" },
    { type: "bot", text: t("agentDetail.ecosystem.chat.botAnalytics"), key: "botAnalytics" },
  ];

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
    }
  }, []);

  const animateLastMessage = useCallback((isUser: boolean) => {
    requestAnimationFrame(() => {
      const msgs = messagesRef.current?.querySelectorAll("[data-chat-msg]");
      if (msgs && msgs.length > 0) {
        const el = msgs[msgs.length - 1];
        gsap.fromTo(
          el,
          { opacity: 0, x: isUser ? 30 : -30, y: 10, scale: 0.92, filter: "blur(8px)" },
          { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }
        );
      }
      scrollToBottom();
    });
  }, [scrollToBottom]);

  const animateDemoMessage = useCallback((index: number, isUser: boolean) => {
    requestAnimationFrame(() => {
      const msgs = messagesRef.current?.querySelectorAll("[data-chat-msg]");
      if (msgs && msgs[index]) {
        gsap.fromTo(
          msgs[index],
          { opacity: 0, x: isUser ? 30 : -30, y: 10, scale: 0.92, filter: "blur(8px)" },
          { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }
        );
      }
      scrollToBottom();
    });
  }, [scrollToBottom]);

  // Get a random response for a topic
  const getResponse = useCallback((topic: string): string => {
    const responses: string[] = t(`agentDetail.ecosystem.chat.responses.${topic}`);
    if (Array.isArray(responses) && responses.length > 0) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
    const fallback: string[] = t("agentDetail.ecosystem.chat.responses.fallback");
    return Array.isArray(fallback) ? fallback[0] : "";
  }, [t]);

  // Send a message (from input or from clicking a capability/suggestion)
  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isSending) return;

    const topic = matchTopic(text);
    const capabilityKey = topic !== "greeting" && topic !== "fallback" ? topic : null;

    const userKey = `user-${++msgIdCounter}`;
    const userMsg: ChatMessage = { type: "user", text: text.trim(), key: userKey };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsSending(true);

    if (capabilityKey) setActiveCapability(capabilityKey);

    requestAnimationFrame(() => animateLastMessage(true));

    const typingDelay = setTimeout(() => {
      setShowTyping(true);
      scrollToBottom();
    }, 300);

    const responseDelay = setTimeout(() => {
      const botText = getResponse(topic);
      const botKey = `bot-${++msgIdCounter}`;
      const botMsg: ChatMessage = { type: "bot", text: botText, key: botKey };

      setShowTyping(false);
      setMessages((prev) => [...prev, botMsg]);
      setIsSending(false);

      requestAnimationFrame(() => animateLastMessage(false));
    }, 1200 + Math.random() * 600);

    timeoutsRef.current.push(typingDelay, responseDelay);
  }, [isSending, animateLastMessage, scrollToBottom, getResponse]);

  const handleSend = useCallback(() => {
    sendMessage(inputValue);
  }, [inputValue, sendMessage]);

  // Click a capability card → send its command
  const handleCapabilityClick = useCallback((key: string) => {
    if (!inputEnabled || isSending) return;
    const command: string = t(`agentDetail.ecosystem.capabilities.${key}.command`);
    sendMessage(command);
  }, [inputEnabled, isSending, t, sendMessage]);

  // Autoplay demo chat messages with typing indicator
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    setMessages(demoMessages);

    const schedule = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timeoutsRef.current.push(id);
    };

    let elapsed = 0;

    demoMessages.forEach((msg, index) => {
      if (msg.type === "bot") {
        const typingStart = elapsed + 400;
        schedule(() => {
          setShowTyping(true);
          scrollToBottom();
        }, typingStart);

        const typingDuration = index === 0 ? 1000 : 1400;
        const msgReveal = typingStart + typingDuration;
        schedule(() => {
          setShowTyping(false);
          setVisibleMessages(index + 1);
          setActiveCapability(demoCapabilityMap[index] || null);
          animateDemoMessage(index, false);
        }, msgReveal);

        elapsed = msgReveal + 600;
      } else {
        const msgReveal = elapsed + 700;
        schedule(() => {
          setVisibleMessages(index + 1);
          setActiveCapability(demoCapabilityMap[index] || null);
          animateDemoMessage(index, true);
        }, msgReveal);

        elapsed = msgReveal + 400;
      }
    });

    // After demo: brief typing then enable input
    schedule(() => {
      setShowTyping(true);
      scrollToBottom();
      requestAnimationFrame(() => {
        if (finalTypingRef.current) {
          gsap.fromTo(finalTypingRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 });
        }
      });
    }, elapsed + 500);

    schedule(() => {
      setShowTyping(false);
      setInputEnabled(true);
      setVisibleMessages(demoMessages.length);
    }, elapsed + 2000);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      hasAnimated.current = false;
      setVisibleMessages(0);
      setShowTyping(false);
      setActiveCapability(null);
      setInputEnabled(false);
      setMessages([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus input when enabled
  useEffect(() => {
    if (inputEnabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputEnabled]);

  // All messages to render
  const demoCount = demoMessages.length;
  const visibleDemos = messages.slice(0, Math.min(visibleMessages, demoCount));
  const interactiveMessages = messages.slice(demoCount);
  const displayMessages = [...visibleDemos, ...interactiveMessages];

  // Suggestion chips — shown when input is enabled
  const suggestions = [
    { key: "deployments", label: t("agentDetail.ecosystem.capabilities.deployments.command") },
    { key: "sprint", label: t("agentDetail.ecosystem.capabilities.sprint.command") },
    { key: "monitoring", label: t("agentDetail.ecosystem.capabilities.monitoring.command") },
  ];

  return (
    <div>
      {/* Title */}
      <h3 className="bg-gradient-to-r from-white via-violet-200 to-purple-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
        {t("agentDetail.ecosystem.title")}
      </h3>
      <p className="mt-2 text-sm text-gray-400">{t("agentDetail.ecosystem.subtitle")}</p>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Left: Capability cards */}
        <div className="lg:w-[40%]">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-3 lg:overflow-x-visible lg:pb-0">
            {capabilityKeys.map((key) => {
              const isActive = activeCapability === key;
              const label: string = t(`agentDetail.ecosystem.capabilities.${key}.label`);
              const command: string = t(`agentDetail.ecosystem.capabilities.${key}.command`);

              return (
                <div
                  key={key}
                  onClick={() => handleCapabilityClick(key)}
                  className={`group relative shrink-0 overflow-hidden rounded-xl border px-4 py-3 transition-all duration-500 lg:w-full ${
                    inputEnabled ? "cursor-pointer" : "cursor-default"
                  } ${
                    isActive
                      ? "border-violet-500/40 bg-violet-500/10 shadow-[0_0_25px_rgba(124,58,237,0.12)]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/[0.08] blur-2xl" />
                  )}
                  <div className="relative flex items-center gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                      isActive ? "bg-violet-500/20 text-violet-400" : "bg-white/[0.04] text-gray-500 group-hover:text-gray-400"
                    }`}>
                      {capabilityIcons[key]}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium ${isActive ? "text-white" : "text-gray-300"}`}>{label}</p>
                      <p className="truncate text-xs text-gray-500">&quot;{command}&quot;</p>
                    </div>
                    {inputEnabled && (
                      <svg className="ml-auto h-3.5 w-3.5 shrink-0 text-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Chatbot interface */}
        <div className="flex-1">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
                  <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t("agentDetail.ecosystem.title")}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-medium text-emerald-400">{t("agentDetail.ecosystem.status")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat messages — fixed height */}
            <div
              ref={messagesRef}
              className="flex h-[380px] flex-col gap-3 overflow-y-auto p-5"
            >
              {displayMessages.map((msg) => (
                <div
                  key={msg.key}
                  data-chat-msg
                  className={`flex shrink-0 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  style={{ opacity: 0 }}
                >
                  {msg.type === "bot" && (
                    <div className="mr-2 mt-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/15">
                      <svg className="h-3.5 w-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.type === "bot"
                        ? "rounded-bl-md border border-violet-500/10 bg-violet-500/[0.08] text-gray-200"
                        : "rounded-br-md border border-white/[0.08] bg-white/[0.06] text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {showTyping && (
                <div ref={visibleMessages >= demoCount ? finalTypingRef : typingRef} className="flex shrink-0 items-end justify-start">
                  <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/15">
                    <svg className="h-3.5 w-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-violet-500/10 bg-violet-500/[0.08] px-4 py-3.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400/60" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400/60" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400/60" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestion chips */}
            {inputEnabled && !isSending && (
              <div className="flex gap-2 overflow-x-auto border-t border-white/[0.04] px-5 py-2.5">
                {suggestions.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => sendMessage(s.label as string)}
                    className="shrink-0 rounded-full border border-violet-500/15 bg-violet-500/[0.05] px-3 py-1 text-[11px] text-violet-400/80 transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div className="border-t border-white/[0.06] px-5 py-3.5">
              <div className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 transition-colors duration-300 ${
                inputEnabled
                  ? "border-white/[0.12] bg-white/[0.05]"
                  : "border-white/[0.08] bg-white/[0.03]"
              }`}>
                {inputEnabled ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                    placeholder={t("agentDetail.ecosystem.inputPlaceholder")}
                    disabled={isSending}
                    className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500 disabled:opacity-50"
                  />
                ) : (
                  <span className="flex-1 text-sm text-gray-600">{t("agentDetail.ecosystem.inputPlaceholder")}</span>
                )}
                <button
                  onClick={handleSend}
                  disabled={!inputEnabled || isSending || !inputValue.trim()}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                    inputEnabled && inputValue.trim() && !isSending
                      ? "bg-violet-500/30 text-violet-300 hover:bg-violet-500/40 hover:text-violet-200"
                      : "bg-violet-500/20 text-violet-400 opacity-50"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
