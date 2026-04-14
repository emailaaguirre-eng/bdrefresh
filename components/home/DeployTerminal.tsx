"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Legacy script.js: 300 + index * 120 ms, CSS transition opacity 0.3s ease */
const REVEAL_INITIAL_MS = 300;
const REVEAL_STEP_MS = 120;

type RevealRow =
  | { kind: "empty" }
  | { kind: "arg"; text: string }
  | { kind: "check"; text: string }
  | { kind: "status" };

const revealRows: RevealRow[] = [
  { kind: "empty" },
  { kind: "arg", text: "Building release..." },
  { kind: "check", text: "Architecture defined" },
  { kind: "check", text: "Application developed" },
  { kind: "check", text: "Tests passing" },
  { kind: "check", text: "Documentation included" },
  { kind: "check", text: "Deployed to production" },
  { kind: "empty" },
  { kind: "arg", text: "Running health checks..." },
  { kind: "check", text: "API responding" },
  { kind: "check", text: "Database connected" },
  { kind: "check", text: "SSL verified" },
  { kind: "empty" },
  { kind: "status" },
];

export function DeployTerminal() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [animatedVisible, setAnimatedVisible] = useState<boolean[]>(() => revealRows.map(() => false));
  const visible = reduce ? revealRows.map(() => true) : animatedVisible;

  useEffect(() => {
    if (reduce) return;
    const el = rootRef.current;
    if (!el) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealRows.forEach((_, i) => {
            timers.push(
              setTimeout(() => {
                setAnimatedVisible((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, REVEAL_INITIAL_MS + i * REVEAL_STEP_MS),
            );
          });
          obs.disconnect();
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  return (
    <div
      ref={rootRef}
      className="flex flex-col overflow-hidden rounded-2xl border border-[#21262d] bg-[#0d1117] shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
      role="img"
      aria-label="Terminal showing deploy output: release build, checks, health status, and live status"
    >
      <div className="flex items-center justify-between border-b border-[#21262d] bg-[#1e1e1e] px-4 py-2.5 md:px-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[0.8rem] font-bold text-[#6e7681]">&lt;/&gt;</span>
          <span className="font-mono text-[0.78rem] text-[#6e7681]">Code</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-[#6e7681]" aria-hidden>
          <span className="transition-colors hover:text-[#c9d1d9]">─</span>
          <span className="transition-colors hover:text-[#c9d1d9]">□</span>
          <span className="transition-colors hover:text-[#e05252]">×</span>
        </div>
      </div>
      <div className="flex-1 px-6 py-8 pb-6 font-mono text-[0.85rem] leading-[1.7] text-[#c9d1d9] md:px-9">
        <div className="terminal-line whitespace-pre-wrap">
          <span className="font-semibold text-[#2ec4a2]">$</span>{" "}
          <span className="text-[#79c0ff]">bd deploy</span>
        </div>
        {revealRows.map((row, i) => {
          const isOn = visible[i];
          const lineClass =
            "terminal-line bd-terminal-reveal whitespace-pre-wrap transition-opacity duration-300 ease-in-out";
          const visClass = reduce || isOn ? "opacity-100" : "opacity-0";

          if (row.kind === "empty") {
            return <div key={`e-${i}`} className={`${lineClass} ${visClass}`} aria-hidden />;
          }
          if (row.kind === "arg") {
            return (
              <div key={`a-${i}`} className={`terminal-line t-output text-[#8b949e] ${lineClass} ${visClass}`}>
                <span className="text-[#c9d1d9]">{row.text}</span>
              </div>
            );
          }
          if (row.kind === "check") {
            return (
              <div key={`c-${i}`} className={`terminal-line t-output text-[#8b949e] ${lineClass} ${visClass}`}>
                <span className="mr-1 font-semibold text-[#2ec4a2]">✓</span>
                {row.text}
              </div>
            );
          }
          return (
            <div key={`s-${i}`} className={`terminal-line ${lineClass} ${visClass}`}>
              <span className="text-[#79c0ff]">Status:</span>{" "}
              <span className="text-[#e5c07b]">Live</span>{" "}
              <span className="bd-terminal-cursor text-[#2ec4a2]">_</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
