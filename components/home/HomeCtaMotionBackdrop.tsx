"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";

function AuroraBlobs({ animated }: { animated: boolean }) {
  const motion = animated ? "bd-home-cta-aurora--1" : "";
  const motion2 = animated ? "bd-home-cta-aurora--2" : "";
  const motion3 = animated ? "bd-home-cta-aurora--3" : "";
  return (
    <>
      <div
        className={`pointer-events-none absolute -left-[18%] -top-[22%] z-0 h-[min(100vw,600px)] w-[min(100vw,600px)] rounded-full blur-[90px] ${motion}`}
        style={{
          background: "radial-gradient(circle at 42% 42%, rgba(72, 145, 210, 0.72) 0%, rgba(37, 104, 160, 0.35) 42%, transparent 72%)",
        }}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute -right-[12%] top-[5%] z-0 h-[min(85vw,520px)] w-[min(85vw,520px)] rounded-full blur-[85px] ${motion2}`}
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(60, 210, 175, 0.5) 0%, rgba(27, 168, 133, 0.22) 48%, transparent 74%)",
        }}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute bottom-[-18%] left-[20%] z-0 h-[min(75vw,460px)] w-[min(75vw,460px)] rounded-full blur-[80px] ${motion3}`}
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(120, 190, 255, 0.55) 0%, rgba(37, 104, 160, 0.2) 52%, transparent 76%)",
        }}
        aria-hidden
      />
    </>
  );
}

/** Home-only CTA: aurora blobs + vignette + pointer spotlight (stack: blobs → vignette → glow on top). */
export function HomeCtaMotionBackdrop({ boundaryRef }: { boundaryRef: RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion();
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const wrap = boundaryRef.current;
    const spot = spotlightRef.current;
    if (!wrap || !spot) return;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = ((e.clientX - r.left) / Math.max(r.width, 1)) * 100;
      const y = ((e.clientY - r.top) / Math.max(r.height, 1)) * 100;
      spot.style.setProperty("--cta-x", `${x}%`);
      spot.style.setProperty("--cta-y", `${y}%`);
    };

    const onLeave = () => {
      spot.style.setProperty("--cta-x", "50%");
      spot.style.setProperty("--cta-y", "40%");
    };

    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);
    onLeave();

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, boundaryRef]);

  return (
    <>
      <AuroraBlobs animated={!reduce} />

      {/* Vignette sits above blobs but below pointer glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_rgba(37,104,160,0.14),_transparent_65%)]"
        aria-hidden
      />

      {!reduce ? (
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 50% 44% at var(--cta-x, 50%) var(--cta-y, 40%), rgba(90, 171, 238, 0.42) 0%, rgba(46, 196, 162, 0.14) 38%, transparent 72%)",
          }}
          aria-hidden
        />
      ) : (
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_50%_44%_at_50%_40%,rgba(90,171,238,0.22),transparent_72%)]"
          aria-hidden
        />
      )}
    </>
  );
}
