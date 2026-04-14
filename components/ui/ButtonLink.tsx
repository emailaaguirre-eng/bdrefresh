import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

const styles: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent-lighter",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-bd-dark-text transition hover:border-white/35 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent-lighter",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-xl border border-bd-light-border bg-white px-5 py-3 text-sm font-semibold text-bd-light-text transition hover:border-bd-accent/40 hover:bg-bd-accent/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${styles[variant]} ${className}`.trim()}>
      {children}
    </Link>
  );
}
