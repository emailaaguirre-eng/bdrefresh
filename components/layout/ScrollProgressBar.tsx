"use client";

import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max <= 0 ? 0 : (el.scrollTop / max) * 100);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[10050] h-[3px] w-full"
      aria-hidden
      style={{
        boxShadow: "0 0 8px rgba(58, 143, 212, 0.35)",
      }}
    >
      <div
        className="h-full rounded-r-sm bg-gradient-to-r from-[#2a70aa] via-[#3a8fd4] to-[#5aabee]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
