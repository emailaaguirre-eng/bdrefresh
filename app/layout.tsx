import type { Metadata } from "next";
import { DM_Sans, Inter, Space_Mono } from "next/font/google";
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

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-dm",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
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
    <html lang="en" className={`${inter.variable} ${dmSans.variable} ${spaceMono.variable}`}>
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
