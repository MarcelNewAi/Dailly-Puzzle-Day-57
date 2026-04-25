import type { AccountHealth, Plan } from "../data";

interface TerminalHeaderProps {
  health: AccountHealth;
  plan: Plan;
}

const statusMap: Record<AccountHealth, { icon: string; label: string; tone: "ok" | "warn" | "crit"; blink: boolean }> = {
  NOMINAL: { icon: "██", label: "Nominal", tone: "ok", blink: false },
  DEGRADED: { icon: "!!", label: "Degraded", tone: "warn", blink: true },
  CRITICAL: { icon: "##", label: "Critical", tone: "crit", blink: true },
};

export default function TerminalHeader({ health, plan }: TerminalHeaderProps) {
  const current = statusMap[health];

  return (
    <header className="v26-terminal-header-wrap">
      <div className="v26-terminal-header">
        <div className="v26-header-left">
          <h1 className="v26-header-title">
            Pulse// Dashboard v2.6.0
            <span className="v26-cursor" aria-hidden="true">
              _
            </span>
          </h1>
        </div>

        <p className="v26-header-center">
          [{plan.name} plan] - tier {plan.tier}/4 - renews {plan.renewalDate}
        </p>

        <div className={`v26-header-status v26-header-status--${current.tone}`}>
          <span className={current.blink ? "v26-status--blink" : undefined}>{current.icon}</span>
          <span>status: {current.label}</span>
        </div>
      </div>

      <p className="v26-header-border" aria-hidden="true">
        ┌─────────────────────────────────────────────────────────────────────────────────┐
      </p>
    </header>
  );
}
