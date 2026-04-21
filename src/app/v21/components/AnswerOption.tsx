import type { AnswerOption as DiagnosticAnswerOption } from "../data/diagnosticFlow";

interface AnswerOptionProps {
  option: DiagnosticAnswerOption;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
}

function OptionIcon({ icon }: { icon: string }) {
  const sharedProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "alert-triangle":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M12 4 3.5 19.5h17L12 4Z" />
          <path {...sharedProps} d="M12 9v5m0 3h.01" />
        </svg>
      );
    case "gauge":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M5 15a7 7 0 1 1 14 0" />
          <path {...sharedProps} d="m12 12 4-2" />
          <path {...sharedProps} d="M4 18h16" />
        </svg>
      );
    case "shield-alert":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="m12 3 7 3v5c0 5-3.5 8.6-7 10-3.5-1.4-7-5-7-10V6l7-3Z" />
          <path {...sharedProps} d="M12 8v5m0 3h.01" />
        </svg>
      );
    case "trending-down":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M4 7h6m10 10H4" />
          <path {...sharedProps} d="m20 8-6 6-4-4-4 4" />
        </svg>
      );
    case "palette":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M12 4a8 8 0 1 0 0 16h1.8a2.2 2.2 0 1 0 0-4.4H12" />
          <circle cx="8" cy="10" r="1.2" />
          <circle cx="12" cy="8" r="1.2" />
          <circle cx="16" cy="10" r="1.2" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle {...sharedProps} cx="12" cy="12" r="8.5" />
          <path {...sharedProps} d="M12 7v5l3 2" />
        </svg>
      );
    case "calendar-x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect {...sharedProps} x="3.5" y="5" width="17" height="15.5" rx="2.2" />
          <path {...sharedProps} d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17m-10.5 4.5 4 4m0-4-4 4" />
        </svg>
      );
    case "git-commit":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle {...sharedProps} cx="12" cy="12" r="3.4" />
          <path {...sharedProps} d="M3 12h5M16 12h5" />
        </svg>
      );
    case "help-circle":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle {...sharedProps} cx="12" cy="12" r="8.5" />
          <path {...sharedProps} d="M9.5 9.3a2.6 2.6 0 0 1 4.9 1c0 1.7-2.4 2-2.4 3.7" />
          <path {...sharedProps} d="M12 17h.01" />
        </svg>
      );
    case "server":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect {...sharedProps} x="4" y="5" width="16" height="5.5" rx="1.5" />
          <rect {...sharedProps} x="4" y="13.5" width="16" height="5.5" rx="1.5" />
          <path {...sharedProps} d="M8 8h.01M8 16.5h.01" />
        </svg>
      );
    case "file-x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M8 3h7l5 5v13H8z" />
          <path {...sharedProps} d="M15 3v5h5m-8 5 4 4m0-4-4 4" />
        </svg>
      );
    case "form-input":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect {...sharedProps} x="3.5" y="4.5" width="17" height="15" rx="2.2" />
          <path {...sharedProps} d="M7 9h10M7 13h4m7.5 0h.01" />
        </svg>
      );
    case "history":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M4.5 10.5H2V4m2.5 2.5A8.5 8.5 0 1 1 12 20.5" />
          <path {...sharedProps} d="M12 7.5V12l3 2" />
        </svg>
      );
    case "file-warning":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M8 3h7l5 5v13H8z" />
          <path {...sharedProps} d="M15 3v5h5M12 11v4m0 2h.01" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M4 12h16m-6-6 6 6-6 6" />
        </svg>
      );
    case "calendar-clock":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect {...sharedProps} x="3.5" y="5" width="17" height="15.5" rx="2.2" />
          <path {...sharedProps} d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17" />
          <circle {...sharedProps} cx="12" cy="15.3" r="2.5" />
          <path {...sharedProps} d="M12 13.9v1.7l1.2.6" />
        </svg>
      );
    case "paintbrush":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="m14 4 6 6-8 8a4 4 0 0 1-5.7 0l-.3-.3a2.5 2.5 0 1 0-3.5-3.5l.3.3a4 4 0 0 0 0 5.7" />
        </svg>
      );
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="m12 3 1.5 3.6L17 8l-3.5 1.4L12 13l-1.5-3.6L7 8l3.5-1.4L12 3Z" />
          <path {...sharedProps} d="m5 14 .8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Zm13 1 .6 1.4L20 17l-1.4.6L18 19l-.6-1.4L16 17l1.4-.6L18 15Z" />
        </svg>
      );
    case "wrench":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M14.5 5a4 4 0 0 0-5.2 5.2l-5.8 5.8a1.7 1.7 0 1 0 2.4 2.4l5.8-5.8A4 4 0 0 0 17 7.5l-2.3 2.3-2.5-2.5L14.5 5Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle {...sharedProps} cx="12" cy="12" r="8.5" />
        </svg>
      );
  }
}

export default function AnswerOption({ option, isSelected, onSelect, disabled = false }: AnswerOptionProps) {
  return (
    <button
      type="button"
      className={`v21-answer-option${isSelected ? " is-selected" : ""}`}
      onClick={() => onSelect(option.id)}
      disabled={disabled}
      aria-label={`${option.label}: ${option.description}`}
      aria-pressed={isSelected}
      data-v21-option="true"
    >
      <span className="v21-answer-icon" aria-hidden="true">
        <OptionIcon icon={option.icon} />
      </span>

      <span className="v21-answer-copy">
        <span className="v21-answer-label">{option.label}</span>
        <span className="v21-answer-description">{option.description}</span>
      </span>

      <span className="v21-answer-arrow" aria-hidden="true">
        {"->"}
      </span>
    </button>
  );
}
