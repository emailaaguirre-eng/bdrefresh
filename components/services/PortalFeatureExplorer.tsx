"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { portalFeatures } from "@/lib/hostingPage";

type Feature = (typeof portalFeatures)[number];

function FeatureIcon({ id }: { id: Feature["id"] }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    "aria-hidden": true as const,
  };

  switch (id) {
    case "status":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 1.5" strokeLinecap="round" />
        </svg>
      );
    case "completed-work":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "reports":
      return (
        <svg {...common}>
          <path d="M8 7h8M8 12h8M8 17h5" strokeLinecap="round" />
          <path d="M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" strokeLinejoin="round" />
        </svg>
      );
    case "support":
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.6-3.2A7.9 7.9 0 0 1 4 12z" strokeLinejoin="round" />
        </svg>
      );
    case "quotes":
      return (
        <svg {...common}>
          <path d="M9 11h6M9 15h4" strokeLinecap="round" />
          <path d="M7 3h8l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" strokeLinejoin="round" />
        </svg>
      );
    case "change-orders":
      return (
        <svg {...common}>
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
        </svg>
      );
    case "monitoring":
      return (
        <svg {...common}>
          <path d="M3 12h4l2-6 4 12 2-6h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "informed":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 10v6M12 7h.01" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Desktop-style portal mock (generic workstation chrome, not macOS).
 * Feature list drives the in-screen preview panel.
 */
export function PortalFeatureExplorer() {
  const listId = useId();
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<Feature["id"]>(portalFeatures[0].id);
  const active = portalFeatures.find((f) => f.id === activeId) ?? portalFeatures[0];

  return (
    <div className="mt-12">
      {/* Monitor bezel: flat workstation look */}
      <div className="mx-auto max-w-5xl rounded-[4px] border border-[#2a3340] bg-[#1a222d] p-2 shadow-[0_28px_80px_-28px_rgba(8,12,18,0.75)] sm:p-3">
        <div className="overflow-hidden rounded-[2px] border border-[#10151c] bg-[#0e141c]">
          {/* Title bar — Windows-style caption + square controls */}
          <div className="flex items-stretch border-b border-[#243041] bg-[#17202b]">
            <div className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2">
              <span className="inline-flex h-5 w-5 items-center justify-center bg-bd-accent font-mono text-[0.55rem] font-bold text-white">
                BD
              </span>
              <p className="truncate font-mono text-[0.72rem] text-[#9db0c5]">
                B&amp;D Client Portal — workspace
              </p>
            </div>
            <div className="flex" aria-hidden>
              <span className="flex w-10 items-center justify-center border-l border-[#243041] text-[#8fa3b8]">
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M1 5h8" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
              <span className="flex w-10 items-center justify-center border-l border-[#243041] text-[#8fa3b8]">
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <rect x="1.5" y="1.5" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
              <span className="flex w-10 items-center justify-center border-l border-[#243041] bg-[#3a4554] text-[#d7e0ea]">
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
            </div>
          </div>

          {/* Address / status strip */}
          <div className="flex items-center gap-2 border-b border-[#243041] bg-[#121a24] px-3 py-2">
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[#6f8298]">url</span>
            <div className="min-w-0 flex-1 truncate border border-[#2b3748] bg-[#0c121a] px-2.5 py-1 font-mono text-[0.72rem] text-[#b7c6d8]">
              portal.banddservicing.com / dashboard
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.65rem] text-emerald-400/90">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              secure
            </span>
          </div>

          {/* App shell */}
          <div className="grid min-h-[22rem] lg:grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)]">
            <nav
              className="border-b border-[#243041] bg-[#121922] lg:border-b-0 lg:border-r"
              aria-label="Portal modules"
            >
              <p className="px-3 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#6f8298]">
                Modules
              </p>
              <ul className="list-none space-y-0.5 p-2 pt-0" role="listbox" aria-label="Client portal features">
                {portalFeatures.map((feature) => {
                  const selected = feature.id === active.id;
                  return (
                    <li key={feature.id} role="presentation">
                      <button
                        type="button"
                        role="option"
                        id={`${listId}-${feature.id}`}
                        aria-selected={selected}
                        onClick={() => setActiveId(feature.id)}
                        className={[
                          "flex w-full items-center gap-2.5 px-2.5 py-2 text-left transition",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-bd-accent",
                          selected
                            ? "bg-bd-accent text-white"
                            : "text-[#b7c6d8] hover:bg-white/[0.05] hover:text-white",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-7 w-7 shrink-0 items-center justify-center",
                            selected ? "bg-white/15" : "bg-white/[0.04] text-bd-accent-lighter",
                          ].join(" ")}
                        >
                          <FeatureIcon id={feature.id} />
                        </span>
                        <span className="min-w-0 text-[0.8rem] font-medium leading-snug">{feature.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              role="region"
              aria-live="polite"
              aria-atomic="true"
              className="relative bg-[#0b1118] p-5 sm:p-7"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(37,104,160,0.12), transparent 42%), radial-gradient(circle at 85% 20%, rgba(46,196,162,0.12), transparent 35%)",
                }}
                aria-hidden
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border border-[#243041] bg-[#121922] px-3 py-2">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[#7f93a9]">
                      Active view
                    </p>
                    <p className="font-mono text-[0.65rem] text-[#9db0c5]">read-only preview</p>
                  </div>

                  <div className="mt-4 border border-[#243041] bg-[#101820] p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-bd-accent text-white">
                        <FeatureIcon id={active.id} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-editorial text-xl font-bold tracking-tight text-white sm:text-2xl">
                          {active.title}
                        </h3>
                        <p className="mt-3 text-[1.02rem] leading-relaxed text-[#c2d0e0]">{active.detail}</p>
                      </div>
                    </div>
                    <p className="mt-6 border-t border-[#243041] pt-4 text-sm leading-relaxed text-[#7f93a9]">
                      Available features depend on your active services and plan entitlements.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Stand / base — simple workstation foot, not Apple chin */}
      <div className="mx-auto mt-0 flex max-w-5xl flex-col items-center" aria-hidden>
        <div className="h-3 w-16 bg-[#2a3340]" />
        <div className="h-1.5 w-36 bg-[#1a222d]" />
      </div>
    </div>
  );
}
