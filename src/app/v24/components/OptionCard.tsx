import type { ServiceOption } from "../data";

interface OptionCardProps {
  option: ServiceOption;
  isSelected: boolean;
  isBlocked: boolean;
  isRequired: boolean;
  isHinted?: boolean;
  showViolationIcon?: boolean;
  onToggle: () => void;
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="m7 12.5 3.1 3.2L17.2 8.8"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningTriangleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 2.8 10 18H2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 8.4v5.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="17.4" r="1" fill="currentColor" />
    </svg>
  );
}

function IncludeCheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="m3.2 8.4 2.4 2.4L12.8 3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OptionCard({
  option,
  isSelected,
  isBlocked,
  isHinted = false,
  showViolationIcon = false,
  onToggle,
}: OptionCardProps) {
  const className = [
    "v24-option-card",
    isSelected ? "v24-option-card--selected" : "",
    isBlocked ? "v24-option-card--blocked" : "",
    isHinted ? "v24-option-card--hinted" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={className}
      aria-pressed={isSelected}
      onClick={() => {
        if (isBlocked) {
          return;
        }
        onToggle();
      }}
    >
      <div className="v24-option-top">
        <h4 className="v24-option-name">{option.name}</h4>
        <div className="v24-option-meta">
          {option.popular ? <span className="v24-popular-badge">Popular</span> : null}
          {showViolationIcon ? (
            <span className="v24-option-inline-warning" aria-label="Validation warning applies">
              <WarningTriangleIcon />
            </span>
          ) : null}
        </div>
      </div>

      <p className="v24-option-tagline">{option.tagline}</p>
      <p className="v24-option-price">{option.priceLabel}</p>
      <p className="v24-option-detail">{option.detail}</p>

      <ul className="v24-includes-list">
        {option.includes.map((line) => (
          <li key={line}>
            <span className="v24-include-check">
              <IncludeCheckIcon />
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {isSelected ? (
        <span className="v24-option-check" aria-hidden="true">
          <CheckCircleIcon />
        </span>
      ) : null}

      {!isSelected && isBlocked ? (
        <span className="v24-option-warn" aria-hidden="true">
          <WarningTriangleIcon />
        </span>
      ) : null}
    </button>
  );
}
