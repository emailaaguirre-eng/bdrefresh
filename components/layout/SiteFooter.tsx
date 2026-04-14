import Link from "next/link";
import { footerNav } from "@/lib/nav";
import { siteName, siteTagline } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-bd-dark-border bg-bd-dark-bg text-bd-dark-muted" role="contentinfo">
      <div className="mx-auto max-w-container px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bd-logo.svg"
                alt={siteName}
                width={160}
                height={42}
                className="h-9 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-bd-dark-muted">
              Modern web software, built end-to-end. {siteTagline}
            </p>
          </div>
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-bd-dark-text">
              Company
            </p>
            <ul className="mt-4 space-y-2">
              {footerNav.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-bd-accent-lighter">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-bd-dark-text">
              Explore
            </p>
            <ul className="mt-4 space-y-2">
              {footerNav.services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-bd-accent-lighter">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-bd-dark-border pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <p>
            Powered by{" "}
            <Link href="/about#codrex" className="font-medium text-bd-accent-lighter hover:underline">
              CoDre-X
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
