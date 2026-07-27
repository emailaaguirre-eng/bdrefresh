"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/lib/nav";
import { brandLogoSrc } from "@/lib/site";

const SCROLL_THRESHOLD = 32;

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !mobileNavRef.current || !menuButtonRef.current) return;
      const list = [menuButtonRef.current, ...getFocusable(mobileNavRef.current)];
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    window.setTimeout(() => {
      const firstLink = mobileNavRef.current?.querySelector<HTMLElement>("a[href]");
      firstLink?.focus();
    }, 0);

    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = !isHome || scrolled || open;

  /* Transparent bottom border on all routes — visible border-bd-* was a light hairline over dark PageHero (home used transparent). */
  const bar = solid
    ? "border-transparent bg-bd-dark-bg/95 backdrop-blur-xl py-2.5 shadow-none"
    : "border-transparent bg-transparent py-4";

  const linkBase =
    "rounded-lg px-3.5 py-2 text-sm font-medium transition";
  const linkIdle = solid
    ? "text-bd-dark-muted hover:bg-white/5 hover:text-bd-dark-text"
    : "text-white/70 hover:bg-white/10 hover:text-white";
  const linkActive = solid
    ? "bg-white/10 text-white"
    : "bg-white/10 text-white";

  const ctaClass = solid
    ? "ml-2 rounded-full bg-bd-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-bd-accent-dark"
    : "ml-2 rounded-full bg-bd-accent px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(58,143,212,0.25)] transition hover:bg-bd-accent-dark";

  return (
    <header
      data-bd-site-header
      className={`fixed inset-x-0 top-0 z-[10040] border-b transition-[padding,background,border-color] duration-200 ${bar}`}
    >
      <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="B&D Servicing home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brandLogoSrc}
            alt=""
            width={320}
            height={84}
            className="h-[42px] w-auto opacity-95 transition hover:opacity-100"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {mainNav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${linkBase} ${active ? linkActive : linkIdle}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/start-project" className={ctaClass}>
            Start a Project
          </Link>
        </nav>

        <button
          type="button"
          ref={menuButtonRef}
          className={`inline-flex flex-col gap-1.5 rounded-lg p-2 lg:hidden ${solid ? "text-bd-dark-text" : "text-white"}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 rounded-sm bg-current" aria-hidden />
          <span className="h-0.5 w-6 rounded-sm bg-current" aria-hidden />
          <span className="h-0.5 w-6 rounded-sm bg-current" aria-hidden />
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          ref={mobileNavRef}
          className="border-t border-bd-dark-border bg-bd-dark-elevated px-6 py-4 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-bd-dark-text hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/start-project"
                className="mt-2 block rounded-full bg-bd-accent px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-bd-accent-dark"
                onClick={() => setOpen(false)}
              >
                Start a Project
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
