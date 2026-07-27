"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="underline underline-offset-2 hover:text-bd-accent-lighter"
      onClick={() => {
        const api = (window as unknown as { BdccVt?: { openPreferences?: () => void } }).BdccVt;
        api?.openPreferences?.();
      }}
    >
      Cookie settings
    </button>
  );
}
