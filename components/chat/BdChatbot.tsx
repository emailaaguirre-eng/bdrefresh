"use client";

import keywordRows from "@/lib/bdChatKeywords.json";
import responses from "@/lib/bdChatResponses.json";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Opt = { label: string; action: string };

type ChatLine =
  | { kind: "bot"; id: number; text: string }
  | { kind: "user"; id: number; text: string }
  | { kind: "options"; id: number; options: Opt[]; disabled: boolean };

function matchKeywords(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const row of keywordRows) {
    for (const key of row.keys) {
      if (lower.includes(key)) return row.response;
    }
  }
  return "fallback";
}

function getResp(action: string): { text: string; options?: Opt[] } {
  const r = (responses as Record<string, { text: string; options?: Opt[] }>)[action];
  return r ?? (responses as Record<string, { text: string; options?: Opt[] }>).fallback;
}

/** Legacy index.html + script.js §19 — same copy, options, keyword routing, and special actions. */
export function BdChatbot() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<ChatLine[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const idRef = useRef(0);
  const bootedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollChat = useCallback(() => {
    window.setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
            window.scrollTo({ top, behavior: "smooth" });
          } else {
            router.push("/#contact");
          }
          setOpen(false);
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
    [addBot, addOptions, addUser, disablePreviousOptions, router, scrollChat],
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open && !bootedRef.current) {
      bootedRef.current = true;
      window.setTimeout(() => handleAction("greeting", null), 300);
    }
  }, [open, handleAction]);

  useEffect(() => {
    if (open) window.setTimeout(() => document.getElementById("bd-chat-input")?.focus(), 400);
  }, [open]);

  return (
    <>
      <button
        type="button"
        id="chatbotToggle"
        className={`bd-chatbot-toggle ${open ? "bd-chatbot-toggle--active" : ""}`}
        aria-label="Open chat assistant"
        aria-expanded={open}
        aria-controls="chatbotWindow"
        onClick={() => setOpen((o) => !o)}
      >
        <svg className="bd-chatbot-toggle__icon bd-chatbot-toggle__icon--chat" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <svg className="bd-chatbot-toggle__icon bd-chatbot-toggle__icon--close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div
        id="chatbotWindow"
        className={`bd-chatbot-window ${open ? "bd-chatbot-window--open" : ""}`}
        role="dialog"
        aria-label="Chat assistant"
      >
        <div className="bd-chatbot-header">
          <div className="bd-chatbot-avatar" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div>
            <h4 className="text-[0.92rem] font-semibold text-white">B&amp;D Assistant</h4>
            <p className="mt-0.5 flex items-center gap-1.5 text-[0.75rem] text-bd-dark-muted">
              <span className="bd-online-dot" />
              Online now
            </p>
          </div>
        </div>

        <div className="bd-chatbot-messages" id="chatMessages">
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
              <div key={line.id} className="bd-chat-options">
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
            <div className="bd-chat-typing" aria-hidden>
              <span />
              <span />
              <span />
            </div>
          ) : null}
          <div ref={messagesEndRef} />
        </div>

        <div className="bd-chatbot-input">
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
