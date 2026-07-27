"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "bdcc_vt_consent_v1";

function hasStatisticsConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { statistics?: boolean };
    return !!parsed.statistics;
  } catch {
    return false;
  }
}

/** Loads GA4 only after statistics consent is granted. */
export function ConsentGatedAnalytics({ measurementId }: { measurementId: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(hasStatisticsConsent());
    sync();
    window.addEventListener("bdcc-vt-consent", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bdcc-vt-consent", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
