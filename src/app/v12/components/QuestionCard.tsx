"use client";

import type { Question } from "./data/questions";

interface QuestionCardProps {
  question: Question;
  selectedValue: string | string[] | undefined;
  onSelect: (value: string | string[]) => void;
  disabled?: boolean;
  totalSteps: number;
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
    case "rocket":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M7 14c-2 0-3 1-4 3 2 0 3-1 4-3Zm3 3c0 1-1 2-3 3 0-2 1-3 3-3Zm8-13c-3 0-6 1-8 4l-2 2 4 4 2-2c3-2 4-5 4-8Zm-7 5 4 4" />
        </svg>
      );
    case "store":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M3 10h18l-1-5H4l-1 5Zm2 0v9h14v-9M9 14h6" />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M4 8h16v10H4zM9 8V6h6v2M4 12h16" />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M5 20V4h14v16M9 8h2M13 8h2M9 12h2M13 12h2M10 20v-4h4v4" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle {...sharedProps} cx="12" cy="12" r="9" />
          <path {...sharedProps} d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
      );
    case "refresh":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M20 6v5h-5M4 18v-5h5" />
          <path {...sharedProps} d="M6.5 9A7 7 0 0 1 18 7m-1 8a7 7 0 0 1-11 2" />
        </svg>
      );
    case "shopping-cart":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M3 4h2l2.4 10h10.6l2-7H7.2M10 20a1 1 0 1 0 0-.01M18 20a1 1 0 1 0 0-.01" />
        </svg>
      );
    case "trending-up":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M4 16l6-6 4 4 6-7" />
          <path {...sharedProps} d="M14 7h6v6" />
        </svg>
      );
    case "zap":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M13 2 4 13h6l-1 9 9-11h-6l1-9Z" />
        </svg>
      );
    case "zap-fast":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M13 2 4 13h6l-1 9 9-11h-6l1-9Z" />
          <path {...sharedProps} d="M2 6h4M1 10h3" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle {...sharedProps} cx="12" cy="12" r="9" />
          <path {...sharedProps} d="M12 7v6l4 2" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect {...sharedProps} x="3" y="5" width="18" height="16" rx="2" />
          <path {...sharedProps} d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      );
    case "hourglass":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M6 3h12M6 21h12M7 3c0 4 3 5 5 7-2 2-5 3-5 7M17 3c0 4-3 5-5 7 2 2 5 3 5 7" />
        </svg>
      );
    case "euro":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M16 6a5 5 0 1 0 0 12M7 10h8M7 14h8" />
        </svg>
      );
    case "euro-stack":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <ellipse {...sharedProps} cx="12" cy="6" rx="6" ry="3" />
          <path {...sharedProps} d="M6 6v8c0 1.7 2.7 3 6 3s6-1.3 6-3V6" />
          <path {...sharedProps} d="M10 10h4M10 13h4" />
        </svg>
      );
    case "gem":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M4 9 8 4h8l4 5-8 11L4 9Z" />
          <path {...sharedProps} d="M8 4l4 16L16 4" />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M3 9 9 3h6l6 6-9 12L3 9Z" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle {...sharedProps} cx="11" cy="11" r="7" />
          <path {...sharedProps} d="m20 20-3.5-3.5" />
        </svg>
      );
    case "edit":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M4 20h4l10-10-4-4L4 16v4Z" />
          <path {...sharedProps} d="m12 6 4 4" />
        </svg>
      );
    case "bar-chart":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M4 20V10M10 20V6M16 20v-8M22 20H2" />
        </svg>
      );
    case "languages":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M4 6h10M9 6c0 6-2 10-5 12M9 6c1.5 3.5 3.5 6.5 6 9M14 13h6M17 10l-3 9m3-9 3 9" />
        </svg>
      );
    case "plug":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...sharedProps} d="M8 7V3M16 7V3M7 9h10v3a5 5 0 0 1-5 5v4" />
        </svg>
      );
    case "lifebuoy":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle {...sharedProps} cx="12" cy="12" r="9" />
          <circle {...sharedProps} cx="12" cy="12" r="4" />
          <path {...sharedProps} d="M5.6 5.6l3.2 3.2M15.2 15.2l3.2 3.2M18.4 5.6l-3.2 3.2M8.8 15.2l-3.2 3.2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle {...sharedProps} cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 13 4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function QuestionCard({
  question,
  selectedValue,
  onSelect,
  disabled = false,
  totalSteps,
}: QuestionCardProps) {
  const selectedValues = Array.isArray(selectedValue)
    ? selectedValue
    : selectedValue
      ? [selectedValue]
      : [];

  const handleOptionToggle = (value: string) => {
    if (disabled) {
      return;
    }

    if (question.type === "multi-select") {
      const exists = selectedValues.includes(value);
      const nextValues = exists ? selectedValues.filter((item) => item !== value) : [...selectedValues, value];
      onSelect(nextValues);
      return;
    }

    onSelect(value);
  };

  return (
    <article className="v12-question-card" aria-label={`Question ${question.step} of ${totalSteps}`}>
      <p className="v12-question-step">QUESTION {question.step} OF {totalSteps}</p>
      <h2 className="v12-question-title">{question.title}</h2>
      <p className="v12-question-subtitle">{question.subtitle}</p>

      {question.type === "multi-select" ? (
        <p className="v12-multi-hint">Select all that apply</p>
      ) : null}

      <div
        className={`v12-options-grid ${question.type === "multi-select" ? "is-multi" : ""}`}
        role={question.type === "single-select" ? "radiogroup" : "group"}
        aria-label={question.title}
      >
        {question.options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isSingle = question.type === "single-select";

          return (
            <button
              key={option.id}
              type="button"
              className={`v12-option-card ${isSelected ? "is-selected" : ""}`}
              onClick={() => handleOptionToggle(option.value)}
              disabled={disabled}
              role={isSingle ? "radio" : undefined}
              aria-checked={isSingle ? isSelected : undefined}
              aria-pressed={!isSingle ? isSelected : undefined}
              aria-label={`${option.label}: ${option.description}`}
              data-v12-option="true"
            >
              <span className="v12-option-icon">
                <OptionIcon icon={option.icon} />
              </span>
              <span className="v12-option-label">{option.label}</span>
              <span className="v12-option-description">{option.description}</span>
              <span className={`v12-option-check ${isSelected ? "is-visible" : ""}`}>
                <CheckIcon />
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
