"use client";

import { useCallback, useRef, type RefCallback } from "react";

type Options = {
  disabled?: boolean;
  maxTilt?: number;
  glowSelector?: string;
};

/** Matches legacy script.js service card tilt + .card-glow follow cursor. */
export function useCardTilt({
  disabled = false,
  maxTilt = 4,
  glowSelector = ".bd-service-card-glow",
}: Options = {}) {
  const elRef = useRef<HTMLElement | null>(null);

  const ref = useCallback<RefCallback<HTMLElement>>((node) => {
    elRef.current = node;
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const el = elRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -maxTilt;
      const rotateY = ((x - cx) / cx) * maxTilt;
      el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      const glow = el.querySelector<HTMLElement>(glowSelector);
      if (glow) {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
      }
    },
    [disabled, maxTilt, glowSelector],
  );

  const onMouseLeave = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "";
    const glow = el.querySelector<HTMLElement>(glowSelector);
    if (glow) {
      glow.style.left = "";
      glow.style.top = "";
    }
    window.setTimeout(() => {
      if (el) el.style.transition = "";
    }, 500);
  }, [glowSelector]);

  const onMouseEnter = useCallback(() => {
    const el = elRef.current;
    if (el) el.style.transition = "none";
  }, []);

  return {
    ref,
    handlers: {
      onMouseMove,
      onMouseLeave,
      onMouseEnter,
    },
  };
}
