"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  sparkle: number;
  tint: [number, number, number];
};

type Planet = {
  x: number;
  y: number;
  r: number;
  color: [number, number, number];
  glow: number;
  name: string;
};

/** Parametric orbital arc across the sky (great-circle-ish pass). */
type Satellite = {
  active: boolean;
  nextAt: number;
  t: number;
  speed: number;
  x0: number;
  y0: number;
  cx: number;
  cy: number;
  x1: number;
  y1: number;
};

type Comet = {
  active: boolean;
  nextAt: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  tail: number;
};

type GhostMode = "idle" | "drift" | "approach" | "split" | "jet" | "hidden";

type Uap = {
  kind: "disc" | "ghost";
  x: number;
  y: number;
  vx: number;
  vy: number;
  nextTurnAt: number;
  burstUntil: number;
  pulsePhase: number;
  alpha: number;
  scale: number;
  color: [number, number, number];
  colorPhase: number;
  mode: GhostMode;
  modeUntil: number;
  /** Split fragments jet away and fade */
  isFragment: boolean;
  life: number;
  maxLife: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  len: number;
};

type Hazard = { x: number; y: number; r: number };

const STATIC_COUNT = 48;
const AVOID_STRENGTH = 0.55;
const AVOID_PAD = 36;

const GHOST_PALETTE: [number, number, number][] = [
  [220, 230, 255],
  [180, 255, 220],
  [255, 180, 200],
  [200, 190, 255],
  [255, 230, 160],
  [160, 220, 255],
];

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function lerpColor(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function makeStars(w: number, h: number): Star[] {
  const tints: [number, number, number][] = [
    [230, 236, 255],
    [220, 230, 255],
    [255, 248, 235],
    [210, 225, 255],
    [255, 240, 220],
  ];
  return Array.from({ length: STATIC_COUNT }, () => {
    const bright = Math.random();
    const isBright = bright > 0.82;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: isBright ? 1.05 + Math.random() * 0.55 : 0.28 + Math.random() * 0.7,
      baseAlpha: 0.22 + bright * 0.55,
      phase: Math.random() * Math.PI * 2,
      speed: 0.55 + Math.random() * 1.8,
      sparkle: isBright ? 0.65 + Math.random() * 0.35 : bright > 0.55 ? 0.25 + Math.random() * 0.35 : 0,
      tint: tints[Math.floor(Math.random() * tints.length)],
    };
  });
}

function makePlanets(w: number, h: number): Planet[] {
  const band = (u: number) => {
    const x = w * (0.08 + u * 0.84);
    const y = h * (0.22 + u * 0.18) + Math.sin(u * Math.PI) * h * 0.04;
    return { x, y };
  };
  const v = band(0.18);
  const m = band(0.38);
  const j = band(0.62);
  const s = band(0.78);
  return [
    { ...v, r: 2.6, color: [255, 250, 235], glow: 14, name: "Venus" },
    { ...m, r: 1.7, color: [255, 170, 120], glow: 8, name: "Mars" },
    { ...j, r: 2.35, color: [255, 245, 220], glow: 12, name: "Jupiter" },
    { ...s, r: 1.85, color: [245, 230, 190], glow: 9, name: "Saturn" },
  ];
}

function idleSatellite(now: number): Satellite {
  return {
    active: false,
    nextAt: now + 9000 + Math.random() * 12000,
    t: 0,
    speed: 0,
    x0: 0,
    y0: 0,
    cx: 0,
    cy: 0,
    x1: 0,
    y1: 0,
  };
}

/** West → east (left → right) orbital arc. */
function spawnSatellite(w: number, h: number, now: number): Satellite {
  const yStart = h * (0.08 + Math.random() * 0.35);
  const yEnd = h * (0.2 + Math.random() * 0.45);
  const midY = Math.min(yStart, yEnd) - h * (0.08 + Math.random() * 0.12);
  return {
    active: true,
    nextAt: now,
    t: 0,
    speed: 0.0011 + Math.random() * 0.0005,
    x0: -12,
    y0: yStart,
    cx: w * (0.35 + Math.random() * 0.3),
    cy: midY,
    x1: w + 12,
    y1: yEnd,
  };
}

function bezier(t: number, a: number, b: number, c: number) {
  const u = 1 - t;
  return u * u * a + 2 * u * t * b + t * t * c;
}

function bezierPoint(sat: Satellite) {
  return {
    x: bezier(sat.t, sat.x0, sat.cx, sat.x1),
    y: bezier(sat.t, sat.y0, sat.cy, sat.y1),
  };
}

function idleComet(now: number): Comet {
  return {
    active: false,
    nextAt: now + 18000 + Math.random() * 22000,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    life: 0,
    maxLife: 0,
    tail: 0,
  };
}

function spawnComet(w: number, h: number, now: number): Comet {
  const fromLeft = Math.random() > 0.5;
  const y = h * (0.05 + Math.random() * 0.35);
  const speed = 0.55 + Math.random() * 0.35;
  const angle = fromLeft ? 0.22 + Math.random() * 0.18 : Math.PI - (0.22 + Math.random() * 0.18);
  return {
    active: true,
    nextAt: now,
    x: fromLeft ? -40 : w + 40,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed * 0.35,
    life: 0,
    maxLife: 420 + Math.random() * 180,
    tail: 90 + Math.random() * 50,
  };
}

function baseUap(kind: "disc" | "ghost", w: number, h: number, now: number): Uap {
  return {
    kind,
    x: w * (0.15 + Math.random() * 0.7),
    y: h * (0.15 + Math.random() * 0.55),
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.15,
    nextTurnAt: now + 1200 + Math.random() * 1800,
    burstUntil: 0,
    pulsePhase: Math.random() * Math.PI * 2,
    alpha: kind === "ghost" ? 0 : 1,
    scale: 1,
    color: GHOST_PALETTE[Math.floor(Math.random() * GHOST_PALETTE.length)],
    colorPhase: Math.random() * Math.PI * 2,
    mode: kind === "ghost" ? "hidden" : "idle",
    modeUntil: kind === "ghost" ? now + 4000 + Math.random() * 6000 : Infinity,
    isFragment: false,
    life: 0,
    maxLife: 0,
  };
}

function makeUaps(w: number, h: number, now: number): Uap[] {
  const disc = baseUap("disc", w, h, now);
  disc.x = w * (0.55 + Math.random() * 0.25);
  disc.y = h * (0.25 + Math.random() * 0.4);
  const ghost = baseUap("ghost", w, h, now);
  return [disc, ghost];
}

function spawnMeteor(w: number, h: number): Meteor {
  const x = Math.random() * w * 0.7;
  const y = Math.random() * h * 0.35;
  const speed = 6.5 + Math.random() * 4;
  const angle = Math.PI / 5.5 + Math.random() * 0.35;
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    maxLife: 22 + Math.random() * 18,
    len: 70 + Math.random() * 90,
  };
}

function nextMeteorDelay(): number {
  const roll = Math.random();
  if (roll < 0.18) return 5000 + Math.random() * 4000;
  if (roll < 0.5) return 9000 + Math.random() * 7000;
  return 14000 + Math.random() * 12000;
}

function collectHazards(sat: Satellite, comet: Comet, meteors: Meteor[]): Hazard[] {
  const out: Hazard[] = [];
  if (sat.active) {
    const p = bezierPoint(sat);
    out.push({ x: p.x, y: p.y, r: AVOID_PAD });
  }
  if (comet.active) {
    out.push({ x: comet.x, y: comet.y, r: AVOID_PAD + 28 });
  }
  for (const m of meteors) {
    out.push({ x: m.x, y: m.y, r: AVOID_PAD + 20 });
  }
  return out;
}

/** Steer clear of comet / meteors / satellite; text is fair game. */
function applyAvoidance(u: Uap, hazards: Hazard[]) {
  for (const hz of hazards) {
    const dx = u.x - hz.x;
    const dy = u.y - hz.y;
    const dist = Math.hypot(dx, dy) || 0.01;
    if (dist < hz.r) {
      const push = ((hz.r - dist) / hz.r) * AVOID_STRENGTH;
      u.vx += (dx / dist) * push * 2.2;
      u.vy += (dy / dist) * push * 2.2;
    }
  }
  const spd = Math.hypot(u.vx, u.vy);
  const max = u.kind === "ghost" && u.mode === "jet" ? 14 : u.kind === "ghost" ? 3.5 : 2.2;
  if (spd > max) {
    u.vx = (u.vx / spd) * max;
    u.vy = (u.vy / spd) * max;
  }
}

function softBounds(u: Uap, w: number, h: number) {
  // Soft wrap / bounce — allowed over hero copy
  if (u.x < -10) u.x = w + 10;
  if (u.x > w + 10) u.x = -10;
  if (u.y < -10) u.y = h + 10;
  if (u.y > h + 10) u.y = -10;
}

function pickGhostMode(now: number): { mode: GhostMode; until: number } {
  const roll = Math.random();
  if (roll < 0.28) return { mode: "approach", until: now + 1600 + Math.random() * 1400 };
  if (roll < 0.52) return { mode: "split", until: now + 80 };
  if (roll < 0.78) return { mode: "jet", until: now + 380 + Math.random() * 280 };
  return { mode: "drift", until: now + 1800 + Math.random() * 2200 };
}

function spawnGhostFragments(parent: Uap, now: number): Uap[] {
  const n = 2 + Math.floor(Math.random() * 3); // 2–4
  return Array.from({ length: n }, () => {
    const ang = Math.random() * Math.PI * 2;
    const spd = 3.5 + Math.random() * 5;
    return {
      ...parent,
      isFragment: true,
      mode: "jet" as const,
      modeUntil: now + 500 + Math.random() * 400,
      x: parent.x + (Math.random() - 0.5) * 6,
      y: parent.y + (Math.random() - 0.5) * 6,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd,
      scale: parent.scale * (0.45 + Math.random() * 0.35),
      alpha: parent.alpha * 0.9,
      life: 0,
      maxLife: 36 + Math.floor(Math.random() * 28),
      color: GHOST_PALETTE[Math.floor(Math.random() * GHOST_PALETTE.length)],
    };
  });
}

function ghostColor(u: Uap, now: number): [number, number, number] {
  const i = Math.floor(now * 0.0012 + u.colorPhase) % GHOST_PALETTE.length;
  const j = (i + 1) % GHOST_PALETTE.length;
  const t = (Math.sin(now * 0.0025 + u.colorPhase) + 1) / 2;
  return lerpColor(GHOST_PALETTE[i], GHOST_PALETTE[j], t);
}

function drawStar(ctx: CanvasRenderingContext2D, s: Star, now: number) {
  const wave = 0.55 + 0.45 * Math.sin(now * 0.0016 * s.speed + s.phase);
  const flicker = 0.5 + 0.5 * Math.sin(now * 0.007 * s.speed + s.phase * 1.9);
  const alpha = Math.min(1, s.baseAlpha * (0.4 + 0.6 * wave));
  const [cr, cg, cb] = s.tint;

  const bloom = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.2);
  bloom.addColorStop(0, rgba(cr, cg, cb, alpha * 0.55));
  bloom.addColorStop(0.45, rgba(cr, cg, cb, alpha * 0.2));
  bloom.addColorStop(1, rgba(cr, cg, cb, 0));
  ctx.fillStyle = bloom;
  ctx.beginPath();
  ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(s.x, s.y, s.r * (0.85 + 0.2 * wave), 0, Math.PI * 2);
  ctx.fillStyle = rgba(cr, cg, cb, alpha);
  ctx.fill();

  if (s.sparkle > 0.2) {
    const flare = s.sparkle * (0.2 + 0.8 * flicker * flicker);
    if (flare > 0.25) {
      const arm = s.r * (2.8 + flare * 4);
      ctx.save();
      ctx.globalAlpha = alpha * flare * 0.55;
      ctx.strokeStyle = rgba(255, 255, 255, 0.9);
      ctx.lineWidth = 0.55;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(s.x - arm, s.y);
      ctx.lineTo(s.x + arm, s.y);
      ctx.moveTo(s.x, s.y - arm * 0.9);
      ctx.lineTo(s.x, s.y + arm * 0.9);
      ctx.stroke();
      ctx.restore();
    }
  }
}

function drawPlanet(ctx: CanvasRenderingContext2D, p: Planet) {
  const [r, g, b] = p.color;
  const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glow);
  glow.addColorStop(0, rgba(r, g, b, 0.45));
  glow.addColorStop(0.4, rgba(r, g, b, 0.15));
  glow.addColorStop(1, rgba(r, g, b, 0));
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.glow, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  ctx.fillStyle = rgba(r, g, b, 0.95);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(p.x - p.r * 0.25, p.y - p.r * 0.25, p.r * 0.35, 0, Math.PI * 2);
  ctx.fillStyle = rgba(255, 255, 255, 0.35);
  ctx.fill();
}

function drawSatellite(ctx: CanvasRenderingContext2D, sat: Satellite) {
  const { x, y } = bezierPoint(sat);
  const t2 = Math.min(1, sat.t + 0.012);
  const ahead = {
    x: bezier(t2, sat.x0, sat.cx, sat.x1),
    y: bezier(t2, sat.y0, sat.cy, sat.y1),
  };
  const dx = ahead.x - x;
  const dy = ahead.y - y;
  const hyp = Math.hypot(dx, dy) || 1;
  const nx = dx / hyp;
  const ny = dy / hyp;

  ctx.save();
  ctx.strokeStyle = "rgba(240, 245, 255, 0.28)";
  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - nx * 4, y - ny * 4);
  ctx.lineTo(x + nx * 2, y + ny * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 1.3, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(248, 250, 255, 0.95)";
  ctx.fill();
  ctx.restore();
}

function drawComet(ctx: CanvasRenderingContext2D, c: Comet) {
  const t = c.life / c.maxLife;
  const fade = t < 0.12 ? t / 0.12 : t > 0.75 ? (1 - t) / 0.25 : 1;
  const alpha = Math.max(0, fade) * 0.9;
  const hyp = Math.hypot(c.vx, c.vy) || 1;
  const nx = c.vx / hyp;
  const ny = c.vy / hyp;
  const tx = c.x - nx * c.tail;
  const ty = c.y - ny * c.tail;

  const tail = ctx.createLinearGradient(tx, ty, c.x, c.y);
  tail.addColorStop(0, "rgba(180, 210, 255, 0)");
  tail.addColorStop(0.5, rgba(200, 220, 255, alpha * 0.2));
  tail.addColorStop(1, rgba(230, 240, 255, alpha * 0.55));

  ctx.beginPath();
  ctx.strokeStyle = tail;
  ctx.lineWidth = 3.5;
  ctx.lineCap = "round";
  ctx.moveTo(tx, ty);
  ctx.lineTo(c.x, c.y);
  ctx.stroke();

  const coma = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 8);
  coma.addColorStop(0, rgba(255, 255, 255, alpha * 0.9));
  coma.addColorStop(0.4, rgba(200, 220, 255, alpha * 0.35));
  coma.addColorStop(1, "rgba(180, 210, 255, 0)");
  ctx.fillStyle = coma;
  ctx.beginPath();
  ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
  ctx.fill();
}

function drawMeteor(ctx: CanvasRenderingContext2D, m: Meteor) {
  const t = m.life / m.maxLife;
  const fade = t < 0.1 ? t / 0.1 : 1 - (t - 0.1) / 0.9;
  const alpha = Math.max(0, fade) * 0.95;
  const hyp = Math.hypot(m.vx, m.vy) || 1;
  const nx = m.vx / hyp;
  const ny = m.vy / hyp;
  const tailX = m.x - nx * m.len;
  const tailY = m.y - ny * m.len;

  const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
  grad.addColorStop(0, "rgba(255, 220, 180, 0)");
  grad.addColorStop(0.45, `rgba(255, 230, 200, ${alpha * 0.25})`);
  grad.addColorStop(0.85, `rgba(255, 255, 245, ${alpha * 0.75})`);
  grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

  ctx.beginPath();
  ctx.strokeStyle = grad;
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(m.x, m.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.fill();
}

function drawUap(ctx: CanvasRenderingContext2D, u: Uap, now: number) {
  if (u.alpha < 0.02) return;

  if (u.kind === "ghost") {
    const [cr, cg, cb] = ghostColor(u, now);
    const a = u.alpha * 0.65;
    const sc = u.scale;
    const glowR = 4.5 * sc;
    const g = ctx.createRadialGradient(u.x, u.y, 0, u.x, u.y, glowR);
    g.addColorStop(0, rgba(cr, cg, cb, a * 0.75));
    g.addColorStop(0.55, rgba(cr, cg, cb, a * 0.25));
    g.addColorStop(1, rgba(cr, cg, cb, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(u.x, u.y, glowR, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(u.x, u.y, 1.05 * sc, 0, Math.PI * 2);
    ctx.fillStyle = rgba(cr, cg, cb, a);
    ctx.fill();

    // Motion streak when jetting
    if (u.mode === "jet" || u.isFragment) {
      const hyp = Math.hypot(u.vx, u.vy) || 1;
      const nx = u.vx / hyp;
      const ny = u.vy / hyp;
      const len = 8 + Math.min(28, hyp * 3);
      const grad = ctx.createLinearGradient(u.x - nx * len, u.y - ny * len, u.x, u.y);
      grad.addColorStop(0, rgba(cr, cg, cb, 0));
      grad.addColorStop(1, rgba(cr, cg, cb, a * 0.55));
      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.1 * sc;
      ctx.lineCap = "round";
      ctx.moveTo(u.x - nx * len, u.y - ny * len);
      ctx.lineTo(u.x, u.y);
      ctx.stroke();
    }
    return;
  }

  const pulse = 0.75 + 0.25 * Math.sin(now * 0.004 + u.pulsePhase);
  const burst = u.burstUntil > now;
  const glowR = burst ? 10 : 7;
  const discW = burst ? 5.5 : 4.2;
  const discH = burst ? 2.2 : 1.7;

  const glow = ctx.createRadialGradient(u.x, u.y, 0, u.x, u.y, glowR);
  glow.addColorStop(0, `rgba(120, 220, 200, ${0.35 * pulse})`);
  glow.addColorStop(0.45, `rgba(90, 170, 230, ${0.18 * pulse})`);
  glow.addColorStop(1, "rgba(90, 170, 230, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(u.x, u.y, glowR, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(u.x, u.y);
  ctx.scale(1, discH / discW);
  ctx.beginPath();
  ctx.ellipse(0, 0, discW, discW, 0, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(180, 255, 235, ${0.75 * pulse})`;
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(u.x, u.y - 0.4, 1.1, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * pulse})`;
  ctx.fill();
}

/** Sparse night sky for Insights hero — not the home CTA particle network. */
export function InsightsStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const satRef = useRef<Satellite>(idleSatellite(0));
  const cometRef = useRef<Comet>(idleComet(0));
  const uapsRef = useRef<Uap[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const rafRef = useRef<number | null>(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  const nextMeteorAtRef = useRef(0);

  const paintStatic = useCallback((ctx: CanvasRenderingContext2D) => {
    const { w, h } = dimsRef.current;
    ctx.clearRect(0, 0, w, h);
    for (const p of planetsRef.current) drawPlanet(ctx, p);
    for (const s of starsRef.current) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = rgba(s.tint[0], s.tint[1], s.tint[2], s.baseAlpha);
      ctx.fill();
    }
  }, []);

  const resize = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const w = (dimsRef.current.w = wrap.offsetWidth);
    const h = (dimsRef.current.h = wrap.offsetHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const now = performance.now();
    starsRef.current = makeStars(w, h);
    planetsRef.current = makePlanets(w, h);
    satRef.current = idleSatellite(now + 3000 + Math.random() * 4000);
    cometRef.current = idleComet(now + 10000 + Math.random() * 8000);
    uapsRef.current = makeUaps(w, h, now);
    meteorsRef.current = [];
    nextMeteorAtRef.current = now + nextMeteorDelay();
    paintStatic(ctx);
  }, [paintStatic]);

  useEffect(() => {
    const root = wrapRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    resize();

    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(resize, 180);
    };
    window.addEventListener("resize", onResize);

    if (reduce) {
      return () => {
        window.removeEventListener("resize", onResize);
        clearTimeout(resizeT);
      };
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return () => {
        window.removeEventListener("resize", onResize);
        clearTimeout(resizeT);
      };
    }

    let running = false;

    const tick = (now: number) => {
      const { w, h } = dimsRef.current;
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Advance meteors / sat / comet first so hazards are current
      const sat = satRef.current;
      if (!sat.active) {
        if (now >= sat.nextAt) satRef.current = spawnSatellite(w, h, now);
      } else {
        sat.t += sat.speed;
        if (sat.t >= 1) satRef.current = idleSatellite(now);
      }

      const comet = cometRef.current;
      if (!comet.active) {
        if (now >= comet.nextAt) cometRef.current = spawnComet(w, h, now);
      } else {
        comet.life += 1;
        comet.x += comet.vx;
        comet.y += comet.vy;
        if (comet.life >= comet.maxLife || comet.x < -80 || comet.x > w + 80) {
          cometRef.current = idleComet(now);
        }
      }

      if (now >= nextMeteorAtRef.current && meteorsRef.current.length === 0) {
        meteorsRef.current.push(spawnMeteor(w, h));
        nextMeteorAtRef.current = now + nextMeteorDelay();
      }

      const aliveMeteors: Meteor[] = [];
      for (const m of meteorsRef.current) {
        m.life += 1;
        m.x += m.vx;
        m.y += m.vy;
        if (m.life / m.maxLife >= 1 || m.x > w + 50 || m.y > h + 50) continue;
        aliveMeteors.push(m);
      }
      meteorsRef.current = aliveMeteors;

      const hazards = collectHazards(satRef.current, cometRef.current, meteorsRef.current);
      const nextUaps: Uap[] = [];

      for (const u of uapsRef.current) {
        if (u.isFragment) {
          u.life += 1;
          u.x += u.vx;
          u.y += u.vy;
          u.alpha = Math.max(0, u.alpha - 0.03);
          applyAvoidance(u, hazards);
          if (u.life < u.maxLife && u.alpha > 0.02) {
            nextUaps.push(u);
          }
          continue;
        }

        if (u.kind === "ghost") {
          if (u.mode === "hidden") {
            u.alpha = Math.max(0, u.alpha - 0.05);
            if (now >= u.modeUntil) {
              u.mode = "drift";
              u.modeUntil = now + 2000 + Math.random() * 2500;
              u.x = w * (0.1 + Math.random() * 0.8);
              u.y = h * (0.1 + Math.random() * 0.7);
              u.scale = 0.7 + Math.random() * 0.3;
              u.vx = (Math.random() - 0.5) * 0.5;
              u.vy = (Math.random() - 0.5) * 0.4;
            }
            nextUaps.push(u);
            continue;
          }

          u.alpha = Math.min(0.9, u.alpha + 0.06);
          u.colorPhase += 0.02;

          if (now >= u.modeUntil) {
            if (Math.random() < 0.22) {
              u.mode = "hidden";
              u.modeUntil = now + 5000 + Math.random() * 12000;
              u.alpha = Math.min(u.alpha, 0.4);
            } else {
              const next = pickGhostMode(now);
              u.mode = next.mode;
              u.modeUntil = next.until;

              if (u.mode === "approach") {
                u.vx *= 0.4;
                u.vy *= 0.4;
              } else if (u.mode === "jet") {
                const ang = Math.random() * Math.PI * 2;
                const spd = 8 + Math.random() * 6;
                u.vx = Math.cos(ang) * spd;
                u.vy = Math.sin(ang) * spd;
              } else if (u.mode === "split") {
                nextUaps.push(...spawnGhostFragments(u, now));
                // Parent jets after splitting
                const ang = Math.random() * Math.PI * 2;
                u.mode = "jet";
                u.modeUntil = now + 320 + Math.random() * 200;
                u.vx = Math.cos(ang) * (7 + Math.random() * 5);
                u.vy = Math.sin(ang) * (7 + Math.random() * 5);
                u.scale *= 0.85;
              } else if (u.mode === "drift") {
                const ang = Math.random() * Math.PI * 2;
                const spd = 0.2 + Math.random() * 0.45;
                u.vx = Math.cos(ang) * spd;
                u.vy = Math.sin(ang) * spd;
              }
            }
          }

          if (u.mode === "approach") {
            u.scale = Math.min(2.4, u.scale + 0.018);
            u.vx *= 0.97;
            u.vy *= 0.97;
          } else if (u.mode === "drift") {
            u.scale += (1 - u.scale) * 0.04;
            if (now >= u.nextTurnAt) {
              const ang = Math.random() * Math.PI * 2;
              const spd = 0.25 + Math.random() * 0.55;
              u.vx = Math.cos(ang) * spd;
              u.vy = Math.sin(ang) * spd;
              u.nextTurnAt = now + 400 + Math.random() * 900;
            }
          } else if (u.mode === "jet") {
            // slight drag so it doesn’t leave forever mid-pass
            u.vx *= 0.995;
            u.vy *= 0.995;
            u.scale += (0.85 - u.scale) * 0.05;
          }

          applyAvoidance(u, hazards);
          u.x += u.vx;
          u.y += u.vy;
          softBounds(u, w, h);
          nextUaps.push(u);
          continue;
        }

        // Disc UAP
        if (now >= u.nextTurnAt) {
          if (Math.random() < 0.6) {
            const ang = Math.random() * Math.PI * 2;
            const spd = 1.1 + Math.random() * 1.6;
            u.vx = Math.cos(ang) * spd;
            u.vy = Math.sin(ang) * spd;
            u.burstUntil = now + 220 + Math.random() * 380;
          } else {
            const ang = Math.random() * Math.PI * 2;
            const spd = 0.08 + Math.random() * 0.18;
            u.vx = Math.cos(ang) * spd;
            u.vy = Math.sin(ang) * spd;
            u.burstUntil = 0;
          }
          u.nextTurnAt = now + 1100 + Math.random() * 3200;
        } else if (u.burstUntil && now >= u.burstUntil) {
          const ang = Math.atan2(u.vy, u.vx) + (Math.random() - 0.5) * 1.4;
          const spd = 0.08 + Math.random() * 0.16;
          u.vx = Math.cos(ang) * spd;
          u.vy = Math.sin(ang) * spd;
          u.burstUntil = 0;
        }

        applyAvoidance(u, hazards);
        u.x += u.vx;
        u.y += u.vy;
        softBounds(u, w, h);
        nextUaps.push(u);
      }

      uapsRef.current = nextUaps;

      // Draw: distant → near. UAPs last so they pass in front of planets.
      ctx.clearRect(0, 0, w, h);
      for (const p of planetsRef.current) drawPlanet(ctx, p);
      for (const s of starsRef.current) drawStar(ctx, s, now);
      if (satRef.current.active) drawSatellite(ctx, satRef.current);
      if (cometRef.current.active) drawComet(ctx, cometRef.current);
      for (const m of meteorsRef.current) drawMeteor(ctx, m);
      for (const u of uapsRef.current) drawUap(ctx, u, now);

      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafRef.current = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && document.visibilityState === "visible") start();
          else stop();
        }
      },
      { threshold: 0 },
    );
    obs.observe(root);

    const onVis = () => {
      if (document.visibilityState === "hidden") {
        stop();
        return;
      }
      const rect = root.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeT);
      stop();
    };
  }, [reduce, resize]);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c12]/20 via-transparent to-[#080c12]/70" />
    </div>
  );
}
