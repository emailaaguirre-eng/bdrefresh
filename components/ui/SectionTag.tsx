import type { ReactNode } from "react";

type SectionTagProps = {
  children: ReactNode;
  /** Legacy work-showcase: muted pill, no stripe fill */
  variant?: "default" | "quiet";
  className?: string;
};

/**
 * Legacy `.section-tag` + `.tag-bracket`: monospace pill, brackets muted,
 * label uppercase with vertical stripe text fill (see globals `.bd-section-tag-label`).
 */
export function SectionTag({ children, variant = "default", className = "" }: SectionTagProps) {
  const pill = variant === "quiet" ? "bd-section-tag bd-section-tag--quiet" : "bd-section-tag";

  return (
    <span className={`${pill} ${className}`.trim()}>
      <span className="bd-section-tag-inner">
        <span className="bd-section-tag-bracket" aria-hidden>
          [
        </span>
        <span className="bd-section-tag-label"> {children} </span>
        <span className="bd-section-tag-bracket" aria-hidden>
          ]
        </span>
      </span>
    </span>
  );
}
