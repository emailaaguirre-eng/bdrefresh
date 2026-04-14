"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";

const CHARS = "01";
const FONT_SIZE = 14;

export function HeroMatrixCanvas({ style }: { style?: CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const dropsRef = useRef<number[]>([]);
  const dimsRef = useRef({ width: 0, height: 0, columns: 0 });

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = (dimsRef.current.width = canvas.offsetWidth);
    dimsRef.current.height = canvas.offsetHeight;
    canvas.height = canvas.offsetHeight;
    canvas.width = width;
    const columns = Math.floor(width / FONT_SIZE);
    dimsRef.current.columns = columns;
    dropsRef.current = Array.from({ length: columns }, () => Math.random() * -100);
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (dimsRef.current.width === 0 || dimsRef.current.height === 0) {
      init();
    }
    const { width, height, columns } = dimsRef.current;
    if (width === 0 || height === 0 || columns === 0) return;
    const drops = dropsRef.current;

    ctx.fillStyle = "rgba(8, 12, 18, 0.06)";
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${FONT_SIZE}px ui-monospace, monospace`;

    for (let i = 0; i < columns; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x = i * FONT_SIZE;
      const y = drops[i] * FONT_SIZE;
      const brightness = Math.random();
      if (brightness > 0.95) {
        ctx.fillStyle = "rgba(90, 171, 238, 0.9)";
      } else if (brightness > 0.8) {
        ctx.fillStyle = "rgba(58, 143, 212, 0.5)";
      } else {
        ctx.fillStyle = "rgba(58, 143, 212, 0.15)";
      }
      ctx.fillText(char, x, y);
      if (y > height && Math.random() > 0.985) {
        drops[i] = 0;
      }
      drops[i] += 0.4 + Math.random() * 0.3;
    }
  }, [init]);

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    init();

    const loop = () => {
      drawFrame();
      rafRef.current = requestAnimationFrame(loop);
    };

    const section = canvas.closest("section");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (rafRef.current == null) {
              rafRef.current = requestAnimationFrame(loop);
            }
          } else if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        });
      },
      { threshold: 0 },
    );

    if (section) obs.observe(section);

    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(init, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      obs.disconnect();
      window.removeEventListener("resize", onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, init, drawFrame]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-50"
      style={style}
      aria-hidden
    />
  );
}
