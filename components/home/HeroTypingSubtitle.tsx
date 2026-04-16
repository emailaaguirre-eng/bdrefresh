"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FULL_TEXT =
  "We build custom applications, internal tools, and automation with API integrations that reduce manual work and keep your systems connected—so day-to-day operations depend less on fragile glue between tools.";

export function HeroTypingSubtitle() {
  const reduce = useReducedMotion();
  const [animatedText, setAnimatedText] = useState("");
  const [animatedDone, setAnimatedDone] = useState(false);
  const text = reduce ? FULL_TEXT : animatedText;
  const done = reduce ? true : animatedDone;
  const rootRef = useRef<HTMLParagraphElement>(null);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduce) return;

    const el = rootRef.current;
    if (!el) return;

    const typeChar = () => {
      const i = indexRef.current;
      if (i >= FULL_TEXT.length) {
        setAnimatedDone(true);
        return;
      }
      const ch = FULL_TEXT[i];
      indexRef.current = i + 1;
      setAnimatedText(FULL_TEXT.slice(0, indexRef.current));
      const delay = ch === "," || ch === "." ? 80 : 22 + Math.random() * 18;
      timeoutRef.current = setTimeout(typeChar, delay);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutRef.current = setTimeout(typeChar, 800);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [reduce]);

  return (
    <p
      ref={rootRef}
      className="mt-8 min-h-[3.4em] max-w-[600px] text-[1.05rem] leading-[1.7] text-bd-dark-muted md:text-[1.15rem]"
      aria-label={FULL_TEXT}
    >
      {text}
      {!done ? (
        <span
          className="typing-cursor ml-0.5 inline-block h-[1.15em] w-0.5 bg-bd-accent-lighter [vertical-align:text-bottom]"
          aria-hidden
        />
      ) : null}
    </p>
  );
}
