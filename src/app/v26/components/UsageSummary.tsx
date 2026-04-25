import { getStatus, type AccountHealth, type Metric, type Plan } from "../data";

interface UsageSummaryProps {
  metrics: Metric[];
  health: AccountHealth;
  plan: Plan;
}

interface SummaryRowProps {
  label: string;
  value: string;
  tone?: "warn" | "crit";
}

function SummaryRow({ label, value, tone }: SummaryRowProps) {
  return (
    <div className="v26-summary-row">
      <span className="v26-summary-side-char" aria-hidden="true">
        │
      </span>
      <span className="v26-summary-label">{label}</span>
      <span className="v26-summary-dots" aria-hidden="true">
        ................................
      </span>
      <span className={`v26-summary-value ${tone ? `v26-summary-value--${tone}` : ""}`}>{value}</span>
      <span className="v26-summary-side-char" aria-hidden="true">
        │
      </span>
    </div>
  );
}

export default function UsageSummary({ metrics, health, plan }: UsageSummaryProps) {
  const statuses = metrics.map(getStatus);
  const warnCount = statuses.filter((status) => status === "warn").length;
  const critCount = statuses.filter((status) => status === "crit").length;

  const healthTone: "warn" | "crit" | undefined = health === "CRITICAL" ? "crit" : health === "DEGRADED" ? "warn" : undefined;

  return (
    <section className="v26-summary-block" aria-label="Account summary">
      <p className="v26-summary-border-line" aria-hidden="true">
        ┌─ Account summary ─────────────────────────────────────────────────┐
      </p>

      <div className="v26-summary-row v26-summary-row--blank" aria-hidden="true">
        <span className="v26-summary-side-char">│</span>
        <span className="v26-summary-blank" />
        <span className="v26-summary-side-char">│</span>
      </div>

      <SummaryRow label="Plan" value={`${plan.name} (tier ${plan.tier}/4)`} />
      <SummaryRow label="Metrics in warning" value={String(warnCount)} tone={warnCount > 0 ? "warn" : undefined} />
      <SummaryRow label="Metrics at limit" value={String(critCount)} tone={critCount > 0 ? "crit" : undefined} />
      <SummaryRow label="Overall status" value={`[${health}]`} tone={healthTone} />
      <SummaryRow label="Next billing date" value={plan.renewalDate} />
      <SummaryRow
        label="Upgrade path"
        value={`${plan.name} -> ${plan.nextPlanName} (${plan.nextPlanPrice})`}
        tone={health === "CRITICAL" ? "crit" : health === "DEGRADED" ? "warn" : undefined}
      />

      <div className="v26-summary-row v26-summary-row--blank" aria-hidden="true">
        <span className="v26-summary-side-char">│</span>
        <span className="v26-summary-blank" />
        <span className="v26-summary-side-char">│</span>
      </div>

      <p className="v26-summary-border-line" aria-hidden="true">
        └────────────────────────────────────────────────────────────────────┘
      </p>
    </section>
  );
}
