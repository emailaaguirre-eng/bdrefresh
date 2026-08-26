/**
 * CoDre-X brand mark in body copy: site sans, blue hyphen+X.
 * Reads as "CoDre-X" to assistive tech.
 */
export function CodreXWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-normal ${className}`.trim()}>
      CoDre<span className="text-bd-codrex">-X</span>
    </span>
  );
}
