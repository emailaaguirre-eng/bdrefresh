"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const PRIMARY = "Insights.";
const FLASH = "The ideas are out there.";

/** Long settle on Insights, then a blink-and-you-miss-it catch. */
const HOLD_MS = 11000;
const PRE_FLICKER_MS = 45;
const FLASH_MS = 280;
const POST_FLICKER_MS = 55;
const SETTLE_MS = 180;

type Phase = "hold" | "pre" | "flash" | "post" | "settle";

/**
 * Insights hero eyebrow: mostly just sits on Insights.
 * Once in a while something strange flickers through — maybe.
 */
export function InsightsEyebrowTransmission() {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(PRIMARY);
  const [phase, setPhase] = useState<Phase>("hold");
  const [odd, setOdd] = useState(false);

  useEffect(() => {
    if (reduce) return;

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "hold") {
      setDisplay(PRIMARY);
      setOdd(false);
      timer = setTimeout(() => setPhase("pre"), HOLD_MS);
    } else if (phase === "pre") {
      // One hard frame of emptiness / offset — something skipped.
      setDisplay("");
      setOdd(true);
      timer = setTimeout(() => setPhase("flash"), PRE_FLICKER_MS);
    } else if (phase === "flash") {
      setDisplay(FLASH);
      setOdd(true);
      timer = setTimeout(() => setPhase("post"), FLASH_MS);
    } else if (phase === "post") {
      setDisplay("");
      setOdd(true);
      timer = setTimeout(() => setPhase("settle"), POST_FLICKER_MS);
    } else {
      setDisplay(PRIMARY);
      setOdd(false);
      timer = setTimeout(() => setPhase("hold"), SETTLE_MS);
    }

    return () => clearTimeout(timer);
  }, [reduce, phase]);

  if (reduce) {
    return (
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bd-accent-lighter">
        Insights.
      </span>
    );
  }

  return (
    <span
      className="inline-flex min-h-[1.25em] min-w-[12ch] items-center font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bd-accent-lighter/90"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">Insights. The ideas are out there.</span>
      <span
        aria-hidden
        className={[
          "inline-block will-change-transform",
          odd
            ? "translate-x-[1px] opacity-75 [text-shadow:0.5px_0_0_rgba(37,104,160,0.45),-0.5px_0_0_rgba(160,160,160,0.25)]"
            : "",
        ].join(" ")}
      >
        {display || "\u00a0"}
      </span>
    </span>
  );
}
