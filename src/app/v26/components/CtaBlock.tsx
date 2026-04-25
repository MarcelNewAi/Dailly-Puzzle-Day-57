import type { AccountHealth, Plan } from "../data";

interface CtaBlockProps {
  health: AccountHealth;
  plan: Plan;
  warnCount: number;
  critCount: number;
}

export default function CtaBlock({ health, plan, warnCount, critCount }: CtaBlockProps) {
  if (health === "CRITICAL") {
    return (
      <section className="v26-cta-block v26-cta-block--critical" aria-label="Critical account action">
        <p className="v26-cta-message">
          <span className="v26-cta-prefix v26-cta-prefix--fast">##</span> critical: {critCount} metric(s) at maximum capacity.
        </p>
        <p className="v26-cta-message">
          <span className="v26-cta-prefix v26-cta-prefix--fast">##</span> service degradation imminent. immediate action required.
        </p>
        <p className="v26-cta-message">
          <span className="v26-cta-prefix v26-cta-prefix--fast">##</span> upgrade to restore full functionality.
        </p>

        <div className="v26-cta-actions">
          <button type="button" className="v26-cta-btn v26-cta-btn--crit">
            Upgrade now - {plan.nextPlanPrice} -&gt;
          </button>
          <button type="button" className="v26-cta-btn-secondary">
            Contact support
          </button>
        </div>
      </section>
    );
  }

  if (health === "DEGRADED") {
    return (
      <section className="v26-cta-block" aria-label="Warning account action">
        <p className="v26-cta-message">
          <span className="v26-cta-prefix">!!</span> warning: {warnCount} metric(s) approaching limit.
        </p>
        <p className="v26-cta-message">recommend reviewing usage or upgrading to {plan.nextPlanName} plan.</p>
        <p className="v26-cta-message">{plan.nextPlanName} includes 3x limits across all metrics.</p>

        <div className="v26-cta-actions">
          <button type="button" className="v26-cta-btn v26-cta-btn--warn">
            Upgrade to {plan.nextPlanName} - {plan.nextPlanPrice} -&gt;
          </button>
          <button type="button" className="v26-cta-btn-secondary">
            Review usage
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="v26-cta-block" aria-label="Nominal account action">
      <p className="v26-cta-message">&gt;&gt; system nominal. all limits within acceptable range.</p>
      <p className="v26-cta-message">current plan: {plan.name}. no action required.</p>

      <div className="v26-cta-actions">
        <button type="button" className="v26-cta-btn v26-cta-btn--nominal">
          Explore {plan.nextPlanName} plan -&gt;
        </button>
        <button type="button" className="v26-cta-btn-secondary">
          View billing
        </button>
      </div>
    </section>
  );
}
