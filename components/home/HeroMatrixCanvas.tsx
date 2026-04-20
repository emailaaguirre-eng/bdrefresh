"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";

const BG_RGB = { r: 8, g: 12, b: 18 };

type RainColumn = {
  x: number;
  /** Leading edge (bottom of stream) in px from top */
  y: number;
  speed: number;
  chars: string[];
};

function randomBit() {
  return Math.random() < 0.5 ? "1" : "0";
}

function makeColumn(x: number, h: number): RainColumn {
  const len = 10 + Math.floor(Math.random() * 28);
  return {
    x,
    y: -Math.random() * h * 1.2,
    speed: 1.2 + Math.random() * 3.8,
    chars: Array.from({ length: len }, randomBit),
  };
}

function initColumns(w: number, h: number, line: number): RainColumn[] {
  const spacing = Math.max(11, line * 0.72);
  const count = Math.max(8, Math.ceil(w / spacing));
  const cols: RainColumn[] = [];
  for (let i = 0; i < count; i++) {
    const x = spacing * i + spacing * 0.35;
    cols.push(makeColumn(x, h));
  }
  return cols;
}

/** Binary rain: columns of 0/1 falling (cool blues to match the hero, not green “Matrix”). */
export function HeroMatrixCanvas({ style }: { style?: CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = canvasRef.current;
    if (!el) return;
    const canvasEl: HTMLCanvasElement = el;

    const dims = { width: 0, height: 0, dpr: 1, line: 14 };
    let columns: RainColumn[] = [];
    let last = performance.now();
    let raf: number | null = null;
    let time = 0;

    function init() {
      const rectW = canvasEl.offsetWidth;
      const rectH = canvasEl.offsetHeight;
      if (rectW < 2 || rectH < 2) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      dims.dpr = dpr;
      dims.width = rectW;
      dims.height = rectH;
      dims.line = 14;
      canvasEl.width = Math.floor(rectW * dpr);
      canvasEl.height = Math.floor(rectH * dpr);
      columns = initColumns(rectW, rectH, dims.line);
    }

    function tick(now: number) {
      const ctx = canvasEl.getContext("2d");
      if (!ctx) return;
      const w = dims.width;
      const h = dims.height;
      const dpr = dims.dpr;
      const line = dims.line;
      if (w < 2 || h < 2 || columns.length === 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(48, now - last);
      last = now;
      time += dt * 0.001;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgb(${BG_RGB.r},${BG_RGB.g},${BG_RGB.b})`;
      ctx.fillRect(0, 0, w, h);

      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const fontPx = Math.round(line * 0.92);
      ctx.font = `600 ${fontPx}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

      const tail = line * 1.05;

      for (const col of columns) {
        col.y += col.speed * (dt / 16) * 1.35;

        let n = col.chars.length;
        const streamH = n * tail;
        if (col.y - streamH > h + 40) {
          col.y = -streamH - Math.random() * h * 0.45;
          col.speed = 1.2 + Math.random() * 3.8;
          const len = 10 + Math.floor(Math.random() * 28);
          col.chars = Array.from({ length: len }, randomBit);
          n = col.chars.length;
        }

        for (let i = 0; i < n; i++) {
          const py = col.y - i * tail;
          if (py < -line || py > h + line) continue;

          const t = i / Math.max(1, n - 1);
          const baseA = 0.06 + 0.42 * (1 - t) ** 1.65;
          const headPulse = i === 0 ? 0.22 + 0.12 * Math.sin(time * 4 + col.x * 0.02) : 0;
          const a = Math.min(0.92, baseA + headPulse);

          const r = Math.round(70 + 120 * (1 - t));
          const g = Math.round(150 + 80 * (1 - t));
          const b = Math.round(220 + 30 * (1 - t));

          if (i === 0) {
            ctx.fillStyle = `rgba(200, 230, 255, ${0.07 * a})`;
            ctx.fillRect(col.x - line * 0.55, py - 2, line * 1.1, line + 4);
          }
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          ctx.fillText(col.chars[i] ?? "0", col.x, py);
        }

        if (Math.random() < 0.012) {
          const idx = Math.floor(Math.random() * col.chars.length);
          col.chars[idx] = randomBit();
        }
      }

      raf = requestAnimationFrame(tick);
    }

    init();

    const section = canvasEl.closest("section");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (raf == null) {
              last = performance.now();
              raf = requestAnimationFrame(tick);
            }
          } else if (raf != null) {
            cancelAnimationFrame(raf);
            raf = null;
          }
        });
      },
      { threshold: 0 },
    );
    if (section) obs.observe(section);

    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(init, 160);
    };
    window.addEventListener("resize", onResize);

    return () => {
      obs.disconnect();
      window.removeEventListener("resize", onResize);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.48]"
      style={style}
      aria-hidden
    />
  );
}
