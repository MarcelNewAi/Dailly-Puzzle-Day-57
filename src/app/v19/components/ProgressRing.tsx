type ReadinessState = "not-started" | "in-progress" | "almost-ready" | "ready";

interface ProgressRingProps {
  percentage: number;
  completedCount: number;
  totalCount: number;
  state: ReadinessState;
}

function resolveRingColor(percentage: number, state: ReadinessState): string {
  if (percentage === 0 || state === "not-started") {
    return "var(--v19-border-strong)";
  }
  if (percentage === 100 || state === "ready") {
    return "var(--v19-success)";
  }
  if (percentage >= 67) {
    return "var(--v19-purple-hover)";
  }
  return "var(--v19-purple)";
}

export default function ProgressRing({ percentage, completedCount, totalCount, state }: ProgressRingProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const ringColor = resolveRingColor(percentage, state);

  return (
    <div className="v19-ring-shell" aria-label={`Readiness ${percentage} percent`}>
      <svg className="v19-ring-svg" viewBox="0 0 180 180" role="presentation" aria-hidden="true">
        <circle cx="90" cy="90" r={radius} stroke="var(--v19-border)" strokeWidth="12" fill="none" />
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke={ringColor}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
          style={{
            transition:
              "stroke-dashoffset 600ms cubic-bezier(0.16, 1, 0.3, 1), stroke 300ms ease",
          }}
        />
      </svg>

      <div className="v19-ring-center" aria-live="polite">
        <p className="v19-ring-percentage">{percentage}%</p>
        <p className="v19-ring-meta">
          {completedCount} of {totalCount}
        </p>
      </div>
    </div>
  );
}
