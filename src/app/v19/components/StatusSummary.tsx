import ProgressRing from "./ProgressRing";

type ReadinessState = "not-started" | "in-progress" | "almost-ready" | "ready";

interface StatusSummaryProps {
  percentage: number;
  completedCount: number;
  totalCount: number;
  completedRequired: number;
  totalRequired: number;
  state: ReadinessState;
  missingRequiredCount: number;
}

function getStatusCopy(state: ReadinessState, missingRequiredCount: number) {
  if (state === "not-started") {
    return {
      title: "Let's Get Started",
      description:
        "Work through the checklist below. Don't worry if you can't check everything — we'll help you figure out the rest.",
    };
  }

  if (state === "in-progress") {
    const plural = missingRequiredCount === 1 ? "" : "s";
    return {
      title: "You're Making Progress",
      description: `Keep going. You still have ${missingRequiredCount} required item${plural} to complete before we can kick off your project.`,
    };
  }

  if (state === "almost-ready") {
    return {
      title: "Almost There!",
      description:
        "All required items are complete. A few optional items would make your project even smoother, but you're ready to book a call whenever you want.",
    };
  }

  return {
    title: "You're Fully Ready!",
    description: "Every item is checked. Your project is set up for success from day one. Let's talk about how we can help.",
  };
}

export default function StatusSummary({
  percentage,
  completedCount,
  totalCount,
  completedRequired,
  totalRequired,
  state,
  missingRequiredCount,
}: StatusSummaryProps) {
  const copy = getStatusCopy(state, missingRequiredCount);

  return (
    <section className="v19-status-summary" aria-live="polite">
      <div className="v19-status-ring-column">
        <ProgressRing
          percentage={percentage}
          completedCount={completedCount}
          totalCount={totalCount}
          state={state}
        />
      </div>

      <div className="v19-status-content-column">
        <div className="v19-status-progress-meta">
          <span>
            Required: {completedRequired}/{totalRequired}
          </span>
          <span>Total: {completedCount}/{totalCount}</span>
        </div>

        <div className="v19-linear-progress" role="presentation" aria-hidden="true">
          <div className="v19-linear-progress-fill" style={{ width: `${percentage}%` }} />
        </div>

        <div key={`${state}-${missingRequiredCount}`} className="v19-state-swap">
          <h2 className="v19-status-title">{copy.title}</h2>
          <p className="v19-status-description">{copy.description}</p>
        </div>
      </div>
    </section>
  );
}
