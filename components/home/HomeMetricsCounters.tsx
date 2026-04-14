"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type MetricProps = {
  target: number;
  suffix: string;
  label: string;
};

function MetricCounter({ target, suffix, label }: MetricProps) {
  const reduce = useReducedMotion();
  const [animatedValue, setAnimatedValue] = useState(0);
  const value = reduce ? target : animatedValue;
  const ref = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || ran.current) return;
          ran.current = true;
          const duration = 1800;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const tick = () => {
            current += increment;
            if (current >= target) {
              setAnimatedValue(target);
            } else {
              setAnimatedValue(Math.floor(current));
              requestAnimationFrame(() => setTimeout(tick, stepTime));
            }
          };
          tick();
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce, target]);

  return (
    <div ref={ref} className="relative">
      <div className="inline font-heading text-[2.2rem] font-extrabold tabular-nums tracking-tight text-bd-accent">
        {value}
      </div>
      <span className="inline font-heading text-[1.3rem] font-bold text-bd-accent">{suffix}</span>
      <div className="mt-1 text-[0.82rem] text-bd-light-muted">{label}</div>
    </div>
  );
}

export function HomeMetricsCounters() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 border-t border-bd-light-border pt-8 sm:grid-cols-3 sm:gap-8">
      <MetricCounter target={100} suffix="%" label="Client Satisfaction" />
      <MetricCounter target={24} suffix="/7" label="Support Available" />
      <MetricCounter target={50} suffix="+" label="Projects Delivered" />
    </div>
  );
}
