"use client";

import { useMemo, useState } from "react";

export interface AnswerSummaryItem {
  step: number;
  label: string;
  value: string | null;
  state: "completed" | "current" | "upcoming";
  editable: boolean;
}

interface AnswerSummaryProps {
  items: AnswerSummaryItem[];
  onEdit: (step: number) => void;
}

export default function AnswerSummary({ items, onEdit }: AnswerSummaryProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const completedCount = useMemo(() => items.filter((item) => item.state === "completed").length, [items]);

  return (
    <aside className="v12-summary-panel" aria-label="Your answers summary">
      <div className="v12-summary-header-row">
        <p className="v12-summary-header">YOUR ANSWERS</p>
        <button
          type="button"
          className="v12-summary-toggle"
          aria-expanded={mobileExpanded}
          onClick={() => setMobileExpanded((current) => !current)}
        >
          {mobileExpanded ? "Hide" : `Show (${completedCount}/${items.length})`}
        </button>
      </div>

      <div className={`v12-summary-list-wrap ${mobileExpanded ? "is-open" : "is-closed"}`}>
        <ol className="v12-summary-list">
          {items.map((item) => (
            <li key={item.step} className={`v12-summary-item is-${item.state}`}>
              <div className="v12-summary-step-badge" aria-hidden="true">
                {item.step}
              </div>

              <div className="v12-summary-content">
                <p className="v12-summary-label">{item.label}</p>

                {item.state === "completed" && item.value ? (
                  <p className="v12-summary-value">{item.value}</p>
                ) : null}

                {item.state === "current" ? (
                  <p className="v12-summary-current">
                    <span className="v12-current-dot" aria-hidden="true" />
                    In progress
                  </p>
                ) : null}

                {item.state === "upcoming" ? <p className="v12-summary-placeholder">—</p> : null}
              </div>

              {item.editable ? (
                <button
                  type="button"
                  className="v12-summary-edit"
                  onClick={() => onEdit(item.step)}
                  aria-label={`Edit step ${item.step}: ${item.label}`}
                >
                  Edit
                </button>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
