import type { ValidationRule } from "../data";

interface ValidationBannerProps {
  violations: ValidationRule[];
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 3 9 16H3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M12 8.8v5.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="12" cy="17.8" r="1" fill="currentColor" />
    </svg>
  );
}

export default function ValidationBanner({ violations }: ValidationBannerProps) {
  if (violations.length === 0) {
    return null;
  }

  return (
    <aside className="v24-validation-banner" role="alert" aria-live="polite">
      {violations.map((violation) => (
        <div key={violation.id} className="v24-violation-row">
          <span className="v24-violation-icon" aria-hidden="true">
            <WarningIcon />
          </span>
          <p className="v24-violation-message">{violation.message}</p>
          <span
            className={`v24-violation-pill ${
              violation.type === "requires" ? "v24-violation-pill--requires" : "v24-violation-pill--blocks"
            }`}
          >
            {violation.type === "requires" ? "Requires" : "Conflicts with"}
          </span>
        </div>
      ))}
    </aside>
  );
}
