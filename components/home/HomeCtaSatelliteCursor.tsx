"use client";

import { useEffect, useRef, type RefObject } from "react";

const LERP = 0.062;

type Props = {
  boundaryRef: RefObject<HTMLElement | null>;
  enabled: boolean;
};

/**
 * Single faint “satellite” dot, eased toward the pointer (not 1:1).
 * Sits behind copy (z-8); host uses cursor:none on fine pointers only.
 */
export function HomeCtaSatelliteCursor({ boundaryRef, enabled }: Props) {
  const layerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const insideRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const wrap = boundaryRef.current;
    const layer = layerRef.current;
    if (!wrap || !layer) return;

    const setLayerVisible = (v: boolean) => {
      layer.style.opacity = v ? "1" : "0";
    };

    const onEnter = (e: PointerEvent) => {
      insideRef.current = true;
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      targetRef.current = { x, y };
      posRef.current = { x, y };
      setLayerVisible(true);
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      targetRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onLeave = () => {
      insideRef.current = false;
      setLayerVisible(false);
    };

    wrap.addEventListener("pointerenter", onEnter, { passive: true });
    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);

    const tick = () => {
      const t = targetRef.current;
      const p = posRef.current;
      p.x += (t.x - p.x) * LERP;
      p.y += (t.y - p.y) * LERP;

      const head = headRef.current;
      if (head && insideRef.current) {
        head.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, boundaryRef]);

  if (!enabled) return null;

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 z-[8] opacity-0 transition-opacity duration-300"
      aria-hidden
    >
      <div
        ref={headRef}
        className="absolute left-0 top-0 h-[4px] w-[4px] rounded-full bg-[rgba(235,248,255,0.92)] shadow-[0_0_8px_rgba(140,200,255,0.5),0_0_18px_rgba(90,171,238,0.22)] will-change-transform"
        style={{ transform: "translate(-9999px,-9999px)" }}
      />
    </div>
  );
}
