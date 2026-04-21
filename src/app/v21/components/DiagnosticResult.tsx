import { services, type DiagnosticOutcome } from "../data/diagnosticFlow";
import IssueSummary from "./IssueSummary";

interface DiagnosticResultProps {
  answers: Record<string, string>;
  history: string[];
  outcome: DiagnosticOutcome;
  onRestart: () => void;
}

function ResultIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 3 7 3v5c0 5-3.5 8.6-7 10-3.5-1.4-7-5-7-10V6l7-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m8.5 12 2.3 2.3 4.7-4.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function urgencyLabel(urgency: DiagnosticOutcome["urgency"]) {
  if (urgency === "critical") {
    return "CRITICAL URGENCY - ACT TODAY";
  }
  if (urgency === "high") {
    return "HIGH URGENCY - WITHIN 24 HOURS";
  }
  if (urgency === "medium") {
    return "MEDIUM URGENCY - WITHIN 1 WEEK";
  }
  return "LOW URGENCY - WHEN READY";
}

export default function DiagnosticResult({ answers, history, outcome, onRestart }: DiagnosticResultProps) {
  const service = services[outcome.serviceId as keyof typeof services];
  if (!service) {
    return null;
  }

  return (
    <article className="v21-result-card" aria-live="polite">
      <div className={`v21-urgency-banner is-${outcome.urgency}`}>{urgencyLabel(outcome.urgency)}</div>

      <section className="v21-result-content">
        <span className="v21-result-icon" aria-hidden="true">
          <ResultIcon />
        </span>

        <h2>{service.name}</h2>
        <p className="v21-result-description">{service.description}</p>

        <div className="v21-result-meta">
          <p>
            <span>PRICE RANGE</span>
            <strong>{service.price}</strong>
          </p>
          <p>
            <span>TIMEFRAME</span>
            <strong>{service.timeframe}</strong>
          </p>
          <p>
            <span>DIAGNOSIS</span>
            <strong>{outcome.title}</strong>
          </p>
        </div>

        <hr className="v21-divider" />

        <section className="v21-next-steps">
          <h3>Next Steps</h3>
          <ol>
            {outcome.nextSteps.map((step, index) => (
              <li key={step}>
                <span className="v21-step-badge">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <hr className="v21-divider" />

        <IssueSummary answers={answers} history={history} outcome={outcome} onRestart={onRestart} />
      </section>
    </article>
  );
}

