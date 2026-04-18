"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";

type NetNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  seed: number;
};

type SignalPulse = { ia: number; ib: number; u: number; speed: number };

const BG_RGB = { r: 8, g: 12, b: 18 };
const NODE_R = 1.65;
const PAD = 48;
const CONNECT = 188;
const MAX_NEIGHBOR = 2;
const MOUSE_RADIUS = 118;
const MOUSE_STRENGTH = 0.055;

function nodeCountFor(w: number, h: number) {
  const area = w * h;
  return Math.min(36, Math.max(11, Math.round(Math.sqrt(area) / 58)));
}

function initNodes(w: number, h: number): NetNode[] {
  const n = nodeCountFor(w, h);
  return Array.from({ length: n }, () => ({
    x: PAD + Math.random() * Math.max(1, w - PAD * 2),
    y: PAD + Math.random() * Math.max(1, h - PAD * 2),
    vx: (Math.random() - 0.5) * 0.09,
    vy: (Math.random() - 0.5) * 0.09,
    seed: Math.random() * Math.PI * 2,
  }));
}

/** Sparse anchors, dissolving links, rare signal pulses: infrastructure tone (not matrix rain). */
export function HeroMatrixCanvas({ style }: { style?: CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = canvasRef.current;
    if (!el) return;
    const canvasEl: HTMLCanvasElement = el;

    const dims = { width: 0, height: 0 };
    let nodes: NetNode[] = [];
    const pulses: SignalPulse[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let time = 0;
    let last = performance.now();
    let raf: number | null = null;

    function init() {
      const w = (dims.width = canvasEl.offsetWidth);
      const h = (dims.height = canvasEl.offsetHeight);
      if (w < 2 || h < 2) return;
      canvasEl.width = w;
      canvasEl.height = h;
      nodes = initNodes(w, h);
      pulses.length = 0;
    }

    function pickEdgeForPulse(w: number, h: number): { ia: number; ib: number } | null {
      if (nodes.length < 2) return null;
      const cx = w * 0.5;
      const cy = h * 0.42;
      let best: { ia: number; ib: number; d: number } | null = null;
      for (let tries = 0; tries < 28; tries++) {
        const ia = Math.floor(Math.random() * nodes.length);
        let ib = Math.floor(Math.random() * nodes.length);
        if (ib === ia) ib = (ib + 1) % nodes.length;
        const ax = nodes[ia].x;
        const ay = nodes[ia].y;
        const bx = nodes[ib].x;
        const by = nodes[ib].y;
        const len = Math.hypot(bx - ax, by - ay);
        if (len < 40 || len > CONNECT * 1.05) continue;
        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2;
        const d = Math.hypot(mx - cx, my - cy);
        if (!best || d < best.d) best = { ia, ib, d };
      }
      return best ? { ia: best.ia, ib: best.ib } : null;
    }

    function tick(now: number) {
      const ctx = canvasEl.getContext("2d");
      if (!ctx) return;
      const w = dims.width;
      const h = dims.height;
      if (w < 2 || h < 2) return;

      const prev = last || now;
      const dt = Math.min(48, now - prev);
      last = now;
      time += dt * 0.001;
      const t = time;
      const mx = mouse.x;
      const my = mouse.y;
      const mouseOn = mouse.active;

      for (const p of nodes) {
        p.vx += Math.sin(t * 0.38 + p.seed) * 0.0009 + 0.00035;
        p.vy += Math.cos(t * 0.29 + p.seed * 0.8) * 0.00075;
        p.vx *= 0.992;
        p.vy *= 0.992;

        if (mouseOn) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d = Math.hypot(dx, dy) || 1;
          if (d < MOUSE_RADIUS) {
            const k = (1 - d / MOUSE_RADIUS) ** 2 * MOUSE_STRENGTH;
            p.vx += (dx / d) * k * 0.35;
            p.vy += (dy / d) * k * 0.35;
          }
        }

        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        if (p.x < PAD) {
          p.x = PAD;
          p.vx *= -0.35;
        } else if (p.x > w - PAD) {
          p.x = w - PAD;
          p.vx *= -0.35;
        }
        if (p.y < PAD) {
          p.y = PAD;
          p.vy *= -0.35;
        } else if (p.y > h - PAD) {
          p.y = h - PAD;
          p.vy *= -0.35;
        }
      }

      if (Math.random() < 0.0065 * (dt / 16) && pulses.length < 4) {
        const edge = pickEdgeForPulse(w, h);
        if (edge) {
          pulses.push({
            ia: edge.ia,
            ib: edge.ib,
            u: 0,
            speed: 0.22 + Math.random() * 0.16,
          });
        }
      }

      ctx.fillStyle = `rgba(${BG_RGB.r}, ${BG_RGB.g}, ${BG_RGB.b}, 1)`;
      ctx.fillRect(0, 0, w, h);

      const pairs = new Map<string, { i: number; j: number; dist: number }>();
      for (let i = 0; i < nodes.length; i++) {
        const dists: { j: number; d: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < CONNECT) dists.push({ j, d });
        }
        dists.sort((a, b) => a.d - b.d);
        for (let k = 0; k < Math.min(MAX_NEIGHBOR, dists.length); k++) {
          const j = dists[k].j;
          const a = Math.min(i, j);
          const b = Math.max(i, j);
          const key = `${a}-${b}`;
          const d = dists[k].d;
          const prevD = pairs.get(key)?.dist;
          if (prevD == null || d < prevD) pairs.set(key, { i: a, j: b, dist: d });
        }
      }

      for (const { i, j, dist } of pairs.values()) {
        const ni = nodes[i];
        const nj = nodes[j];
        const falloff = 1 - dist / CONNECT;
        const breathe = 0.45 + 0.55 * Math.sin(t * 0.42 + ni.seed * 1.3 + nj.seed * 0.9);
        const alpha = Math.max(0, 0.052 * falloff * breathe * falloff);
        ctx.strokeStyle = `rgba(72, 152, 218, ${alpha})`;
        ctx.lineWidth = 1.05;
        ctx.beginPath();
        ctx.moveTo(ni.x, ni.y);
        ctx.lineTo(nj.x, nj.y);
        ctx.stroke();
      }

      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        const na = nodes[pulse.ia];
        const nb = nodes[pulse.ib];
        if (!na || !nb) {
          pulses.splice(p, 1);
          continue;
        }
        pulse.u += pulse.speed * (dt / 16);
        if (pulse.u > 1.12) {
          pulses.splice(p, 1);
          continue;
        }
        const u = Math.min(1, pulse.u);
        const px = na.x + (nb.x - na.x) * u;
        const py = na.y + (nb.y - na.y) * u;
        const head = 0.04 + 0.05 * Math.sin(t * 6 + u * 8);
        ctx.strokeStyle = `rgba(150, 214, 255, ${0.28 + 0.38 * (1 - Math.abs(u - 0.5) * 2)})`;
        ctx.lineWidth = 1.35;
        ctx.beginPath();
        ctx.moveTo(px - (nb.x - na.x) * head, py - (nb.y - na.y) * head);
        ctx.lineTo(px + (nb.x - na.x) * head, py + (nb.y - na.y) * head);
        ctx.stroke();
        ctx.fillStyle = `rgba(200, 232, 255, ${0.35 + 0.35 * Math.sin(t * 5 + u * 12)})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.55, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of nodes) {
        const tw = 0.35 + 0.25 * Math.sin(t * 0.9 + p.seed);
        ctx.fillStyle = `rgba(110, 185, 238, ${0.22 + tw * 0.16})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, NODE_R, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    init();

    const onMouse = (e: MouseEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    canvasEl.addEventListener("mouseleave", onLeave);

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
      window.removeEventListener("mousemove", onMouse);
      canvasEl.removeEventListener("mouseleave", onLeave);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.52]"
      style={style}
      aria-hidden
    />
  );
}
