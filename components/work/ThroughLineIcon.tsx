/** Line icons for the Work page through-line principles. */
export function ThroughLineIcon({ n }: { n: string }) {
  const common = {
    className: "text-bd-accent",
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };

  if (n === "01") {
    return (
      <svg {...common}>
        <rect x="9" y="2.5" width="6" height="4.5" rx="1.2" />
        <path d="M12 7v3M5 10h14M5 10v3M12 10v3M19 10v3" />
        <circle cx="5" cy="16.5" r="2.5" />
        <rect x="9.5" y="14" width="5" height="5" rx="1.1" />
        <path d="m19 14-2.5 2.5L19 19l2.5-2.5L19 14Z" />
      </svg>
    );
  }
  if (n === "02") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3" />
        <path d="M5.5 19c.5-3.6 2.7-5.5 6.5-5.5s6 1.9 6.5 5.5" />
        <circle cx="5" cy="10" r="2" />
        <circle cx="19" cy="10" r="2" />
        <path d="M2.8 18c.3-2.4 1.6-3.7 4.2-4M21.2 18c-.3-2.4-1.6-3.7-4.2-4" />
      </svg>
    );
  }
  if (n === "03") {
    return (
      <svg {...common}>
        <path d="M9.5 14.5 7 17a4 4 0 0 1-5.7-5.7l3.2-3.2a4 4 0 0 1 5.7 0" />
        <path d="m14.5 9.5 2.5-2.5a4 4 0 0 1 5.7 5.7l-3.2 3.2a4 4 0 0 1-5.7 0" />
        <path d="m8.5 15.5 7-7" />
      </svg>
    );
  }
  if (n === "04") {
    return (
      <svg {...common}>
        <path d="M14.8 4.2c2.2-.8 4.3-.7 5.2-.2.5.9.6 3-.2 5.2l-5.2 5.2-5-5 5.2-5.2Z" />
        <path d="m9.5 9.5-3.4.4-2 2 4 1M14.5 14.5l-.4 3.4-2 2-1-4" />
        <circle cx="16.4" cy="7.6" r="1.3" />
        <path d="M6.5 17.5c-1.8.2-3 1.5-3.3 3.3 1.8-.3 3.1-1.5 3.3-3.3Z" />
        <circle cx="18" cy="18" r="3.2" />
        <path d="m16.6 18 1 1 1.8-2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 19V9M9 19v-5M14 19V6M19 19v-9" />
      <path d="M3 21h18" />
      <path d="M5 7.5c2-2 4.4-2.5 6.3-.9 1.5 1.3 3 1.4 4.4.5l2.8-1.8" />
      <path d="M17.2 3.8 20 5l-1.1 2.8" />
    </svg>
  );
}
