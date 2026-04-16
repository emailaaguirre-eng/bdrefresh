"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, type RefObject } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; radius: number };

const COUNT = 60;
const LINK_DIST = 120;
const MOUSE_DIST = 180;

/** Matches legacy `banddservicing-website/script.js` §13 (NETWORK PARTICLE CANVAS): blue inter-particle links within connection distance; teal lines from dots to cursor within 180px; dots drift with bounce. */
export function CtaParticleCanvas({ boundaryRef }: { boundaryRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);
  const dimsRef = useRef({ w: 0, h: 0 });

  const init = useCallback(() => {
    const wrap = boundaryRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const w = (dimsRef.current.w = wrap.offsetWidth);
    const h = (dimsRef.current.h = wrap.offsetHeight);
    canvas.width = w;
    canvas.height = h;
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    }));
  }, [boundaryRef]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = dimsRef.current;
    if (w === 0 || h === 0) return;
    const particles = particlesRef.current;
    const { x: mouseX, y: mouseY } = mouseRef.current;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          const opacity = (1 - dist / LINK_DIST) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(90, 171, 238, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      const mdx = particles[i].x - mouseX;
      const mdy = particles[i].y - mouseY;
      const mDist = Math.hypot(mdx, mdy);
      if (mDist < MOUSE_DIST) {
        const opacity = (1 - mDist / MOUSE_DIST) * 0.3;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(46, 196, 162, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }
    }

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(90, 171, 238, 0.5)";
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    });
  }, []);

  useEffect(() => {
    if (reduce) return;
    const wrap = boundaryRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    init();

    const loop = () => {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (rafRef.current == null) rafRef.current = requestAnimationFrame(loop);
          } else if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        });
      },
      { threshold: 0 },
    );
    obs.observe(wrap);

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    wrap.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);

    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(init, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      obs.disconnect();
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, boundaryRef, init, draw]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
