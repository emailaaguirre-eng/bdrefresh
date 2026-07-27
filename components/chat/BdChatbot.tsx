"use client";

import keywordRows from "@/lib/bdChatKeywords.json";
import responses from "@/lib/bdChatResponses.json";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type Opt = { label: string; action: string };

type ChatLine =
  | { kind: "bot"; id: number; text: string }
  | { kind: "user"; id: number; text: string }
  | { kind: "options"; id: number; options: Opt[]; disabled: boolean };

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function keywordMatches(input: string, key: string): boolean {
  const normalizedKey = key.toLowerCase().trim();

  if (normalizedKey.length <= 3 && /^[a-z0-9+#.]+$/.test(normalizedKey)) {
    return new RegExp(`\\b${escapeRegExp(normalizedKey)}\\b`, "i").test(input);
  }

  return input.includes(normalizedKey);
}

function matchKeywords(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const row of keywordRows) {
    for (const key of row.keys) {
      if (keywordMatches(lower, key)) return row.response;
    }
  }
  return "fallback";
}

function getResp(action: string): { text: string; options?: Opt[] } {
  const r = (responses as Record<string, { text: string; options?: Opt[] }>)[action];
  return r ?? (responses as Record<string, { text: string; options?: Opt[] }>).fallback;
}

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),textarea,input:not([disabled]),select,[tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
}

/** Legacy index.html + script.js §19 — same copy, options, keyword routing, and special actions. */
export function BdChatbot() {
  const router = useRouter();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<ChatLine[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [liveAnnounce, setLiveAnnounce] = useState("");
  const idRef = useRef(0);
  const bootedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const scrollChat = useCallback(() => {
    window.setTimeout(() => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      messagesEndRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }, 50);
  }, []);

  const disablePreviousOptions = useCallback(() => {
    setLines((prev) =>
      prev.map((line) => (line.kind === "options" ? { ...line, disabled: true } : line)),
    );
  }, []);

  const addBot = useCallback(
    (text: string) => {
      const id = ++idRef.current;
      setLines((prev) => [...prev, { kind: "bot", id, text }]);
      setLiveAnnounce(text);
      scrollChat();
    },
    [scrollChat],
  );

  const addUser = useCallback(
    (text: string) => {
      const id = ++idRef.current;
      setLines((prev) => [...prev, { kind: "user", id, text }]);
      scrollChat();
    },
    [scrollChat],
  );

  const addOptions = useCallback(
    (options: Opt[]) => {
      const id = ++idRef.current;
      setLines((prev) => [...prev, { kind: "options", id, options, disabled: false }]);
      scrollChat();
    },
    [scrollChat],
  );

  const closeChat = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => {
      (previouslyFocused.current ?? toggleRef.current)?.focus();
    }, 0);
  }, []);

  const handleAction = useCallback(
    (action: string, label: string | null) => {
      disablePreviousOptions();
      if (label) addUser(label);

      if (action === "scroll_contact") {
        addBot("I'll take you to the contact form now. Looking forward to hearing about your project!");
        window.setTimeout(() => {
          const contact = document.getElementById("contact");
          const header = document.querySelector("[data-bd-site-header]");
          if (contact && header) {
            const navH = (header as HTMLElement).offsetHeight;
            const top = contact.getBoundingClientRect().top + window.scrollY - navH;
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
          } else {
            router.push("/#contact");
          }
          closeChat();
        }, 800);
        return;
      }

      if (action === "phone") {
        addBot("Give us a call at 602-456-9889. We'd love to hear from you!");
        window.setTimeout(() => {
          window.location.href = "tel:6024569889";
        }, 600);
        return;
      }

      const resp = getResp(action);
      setTyping(true);
      setLiveAnnounce("Assistant is typing");
      scrollChat();
      const delay = 400 + Math.random() * 400;
      window.setTimeout(() => {
        setTyping(false);
        addBot(resp.text);
        if (resp.options?.length) {
          window.setTimeout(() => addOptions(resp.options!), 200);
        }
      }, delay);
    },
    [addBot, addOptions, addUser, closeChat, disablePreviousOptions, router, scrollChat],
  );

  const handleUserInput = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    disablePreviousOptions();
    addUser(text);
    const action = matchKeywords(text);
    const resp = getResp(action);
    setTyping(true);
    setLiveAnnounce("Assistant is typing");
    scrollChat();
    const delay = 500 + Math.random() * 500;
    window.setTimeout(() => {
      setTyping(false);
      addBot(resp.text);
      if (resp.options?.length) {
        window.setTimeout(() => addOptions(resp.options!), 200);
      }
    }, delay);
  }, [addBot, addOptions, addUser, disablePreviousOptions, input, scrollChat]);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeChat();
        return;
      }
      if (e.key !== "Tab" || !windowRef.current) return;
      const list = getFocusable(windowRef.current);
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    window.setTimeout(() => document.getElementById("bd-chat-input")?.focus(), 50);

    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeChat]);

  useEffect(() => {
    if (open && !bootedRef.current) {
      bootedRef.current = true;
      window.setTimeout(() => handleAction("greeting", null), 300);
    }
  }, [open, handleAction]);

  return (
    <>
      <button
        type="button"
        id="chatbotToggle"
        ref={toggleRef}
        className={`bd-chatbot-toggle ${open ? "bd-chatbot-toggle--active" : ""}`}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        aria-controls="chatbotWindow"
        onClick={() => {
          if (open) closeChat();
          else setOpen(true);
        }}
      >
        <svg className="bd-chatbot-toggle__icon bd-chatbot-toggle__icon--chat" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <svg className="bd-chatbot-toggle__icon bd-chatbot-toggle__icon--close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {open ? (
        <div
          id="chatbotWindow"
          ref={windowRef}
          className="bd-chatbot-window bd-chatbot-window--open"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className="bd-chatbot-header">
            <div className="bd-chatbot-avatar" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="text-[0.92rem] font-semibold text-white">
                B&amp;D Assistant
              </h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-[0.75rem] text-bd-dark-muted">
                <span className="bd-online-dot" aria-hidden />
                Online now
              </p>
            </div>
            <button
              type="button"
              className="ml-auto rounded-md px-2 py-1 text-sm font-medium text-bd-dark-muted hover:text-white"
              aria-label="Close chat assistant"
              onClick={closeChat}
            >
              Close
            </button>
          </div>

          <div className="bd-chatbot-messages" id="chatMessages">
            <span className="sr-only" aria-live="polite" aria-atomic="true">
              {liveAnnounce}
            </span>
            {lines.map((line) => {
              if (line.kind === "bot")
                return (
                  <div key={line.id} className="bd-chat-msg bd-chat-msg--bot">
                    {line.text}
                  </div>
                );
              if (line.kind === "user")
                return (
                  <div key={line.id} className="bd-chat-msg bd-chat-msg--user">
                    {line.text}
                  </div>
                );
              return (
                <div key={line.id} className="bd-chat-options" role="group" aria-label="Suggested replies">
                  {line.options.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      className="bd-chat-opt-btn"
                      disabled={line.disabled}
                      onClick={() => !line.disabled && handleAction(opt.action, opt.label)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              );
            })}
            {typing ? (
              <div className="bd-chat-typing" role="status" aria-label="Assistant is typing">
                <span aria-hidden />
                <span aria-hidden />
                <span aria-hidden />
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="bd-chatbot-input">
            <label htmlFor="bd-chat-input" className="sr-only">
              Message
            </label>
            <input
              id="bd-chat-input"
              type="text"
              placeholder="Type a message..."
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
            />
            <button type="button" aria-label="Send message" onClick={handleUserInput}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
