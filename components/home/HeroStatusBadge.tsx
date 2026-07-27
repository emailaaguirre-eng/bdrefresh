"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "system.status: online",
  "accepting new projects",
  "serving clients nationwide",
  "response_time: < 24hrs",
] as const;

const CYCLE_MS = 3500;
const FADE_MS = 300;

export function HeroStatusBadge() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setIndex((i) => (i + 1) % MESSAGES.length);
        setOpacity(1);
      }, FADE_MS);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div
      className="mb-8 inline-flex max-w-max items-center gap-[10px] rounded-full border border-[rgba(46,196,162,0.18)] bg-[rgba(46,196,162,0.08)] px-5 py-2 font-mono text-[0.8rem] font-medium lowercase text-bd-teal-light"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="bd-badge-dot h-2 w-2 shrink-0 rounded-full bg-bd-teal-light" aria-hidden />
      <span
        className="transition-opacity duration-300 ease-in-out"
        style={{ opacity: reduce ? 1 : opacity }}
      >
        {MESSAGES[index]}
      </span>
    </div>
  );
}
