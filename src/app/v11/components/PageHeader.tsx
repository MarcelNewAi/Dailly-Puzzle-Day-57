"use client";

type HeaderStatus = "watching" | "triggered" | "dismissed";

interface PageHeaderProps {
  status: HeaderStatus;
  onManualTrigger: () => void;
}

const statusCopy: Record<HeaderStatus, string> = {
  watching: "Watching for exit intent",
  triggered: "Modal triggered",
  dismissed: "Dismissed for this session",
};

export default function PageHeader({ status, onManualTrigger }: PageHeaderProps) {
  return (
    <header className="v11-header">
      <div className="v11-hero-shell">
        <p className="v11-header-badge v11-hero-animate v11-delay-0">V11  LEAD CAPTURE DEMO</p>
        <h1 className="v11-hero-title v11-hero-animate v11-delay-1">Don&apos;t Let Visitors Slip Away</h1>
        <p className="v11-hero-subtitle v11-hero-animate v11-delay-2">
          An exit-intent system that catches users right before they leave. Move your mouse toward the top of the page
          to trigger it.
        </p>

        <div className="v11-hero-actions v11-hero-animate v11-delay-3">
          <button className="v11-btn v11-btn-primary" type="button" onClick={onManualTrigger}>
            Try Exit Intent
          </button>
          <button className="v11-btn v11-btn-outline" type="button">
            Stay Idle to Trigger
          </button>
        </div>

        <p className="v11-hero-instruction v11-hero-animate v11-delay-4">
          Or stay still for 30 seconds to trigger via inactivity
        </p>

        <div className={`v11-status-row v11-hero-animate v11-delay-5 is-${status}`}>
          <span className="v11-status-dot" aria-hidden="true" />
          <span>{statusCopy[status]}</span>
        </div>
      </div>
    </header>
  );
}
