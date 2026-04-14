"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useRef } from "react";

/** Legacy script.js §15: subtle pull toward cursor on primary CTAs. */
export function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    },
    [reduce],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "";
    window.setTimeout(() => {
      if (el) el.style.transition = "";
    }, 400);
  }, []);

  const onEnter = useCallback(() => {
    if (ref.current) ref.current.style.transition = "none";
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
    >
      {children}
    </Link>
  );
}
