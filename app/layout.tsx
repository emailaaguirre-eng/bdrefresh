import type { Metadata } from "next";
import { IBM_Plex_Sans, Instrument_Sans, Inter, Libre_Baskerville, Space_Mono } from "next/font/google";
import Script from "next/script";
import { ConsentGatedAnalytics } from "@/components/analytics/ConsentGatedAnalytics";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { defaultDescription, getSiteUrl, siteName, siteTagline } from "@/lib/site";
import "./globals.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const hasGaMeasurementId =
  typeof gaMeasurementId === "string" && /^G-[A-Z0-9]+$/i.test(gaMeasurementId);

const bdccVtSiteKey = process.env.NEXT_PUBLIC_BDCC_VT_SITE_KEY?.trim();
const bdccVtScriptSrc = (
  process.env.NEXT_PUBLIC_BDCC_VT_SCRIPT_URL?.trim() ||
  "https://bdcc.banddservicing.com/t.js"
).replace(/\/$/, "");
const hasBdccVisitorTracking =
  typeof bdccVtSiteKey === "string" && /^bdcc_[a-z0-9]+$/i.test(bdccVtSiteKey);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Architectural / structural headings (replaces DM Sans). */
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-plex",
  display: "swap",
});

/** Compact / editorial UI text (card titles, dense interface labels). */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

/** Classic serif for CoDre-X wordmark (aligned with logo typography). */
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-codrex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteName} | ${siteTagline}`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: siteName,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexSans.variable} ${instrumentSans.variable} ${spaceMono.variable} ${libreBaskerville.variable}`}
    >
      <body>
        {hasGaMeasurementId ? <ConsentGatedAnalytics measurementId={gaMeasurementId!} /> : null}
        {hasBdccVisitorTracking ? (
          <Script
            id="bdcc-visitor-tracking"
            src={bdccVtScriptSrc}
            strategy="afterInteractive"
            data-site={bdccVtSiteKey}
          />
        ) : null}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
