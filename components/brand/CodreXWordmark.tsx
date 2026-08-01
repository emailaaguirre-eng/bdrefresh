/**
 * CoDre-X brand mark: classic serif, blue hyphen+X (matches logo wordmark).
 * Reads as "CoDre-X" to assistive tech.
 */
export function CodreXWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-codrex font-bold tracking-normal ${className}`.trim()}>
      CoDre<span className="text-bd-codrex">-X</span>
    </span>
  );
}
