import type { BusinessStatus } from "../lib/businessStatus";

interface StatusBadgeProps {
  status: BusinessStatus;
}

function formatRemaining(minutesUntilClose: number): string {
  const hours = Math.floor(minutesUntilClose / 60);
  const minutes = minutesUntilClose % 60;
  if (hours <= 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} remaining`;
  }
  return `${hours} hour${hours === 1 ? "" : "s"} and ${minutes} minute${minutes === 1 ? "" : "s"} remaining`;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <section className="v18-status-wrap is-visible">
      <div key={status.state} className={`v18-status-card is-${status.state} v18-state-swap`}>
        {status.state === "open-regular" ? (
          <>
            <div className="v18-status-title-row">
              <span className="v18-status-dot is-open-regular is-pulsing" aria-hidden="true" />
              <h2>WE&apos;RE OPEN</h2>
            </div>
            <p className="v18-status-subtitle">
              Closing at {status.closesAt} - {formatRemaining(status.minutesUntilClose)}
            </p>
          </>
        ) : null}

        {status.state === "open-emergency" ? (
          <>
            <div className="v18-status-title-row">
              <span className="v18-status-dot is-open-emergency is-pulsing" aria-hidden="true" />
              <h2>EMERGENCY SUPPORT AVAILABLE</h2>
            </div>
            <p className="v18-status-subtitle">
              For urgent issues only - available until {status.closesAt}
            </p>
            <p className="v18-status-note">Regular consultations resume tomorrow at 08:00.</p>
          </>
        ) : null}

        {status.state === "closed" ? (
          <>
            <div className="v18-status-title-row">
              <span className="v18-status-dot is-closed" aria-hidden="true" />
              <h2>WE&apos;RE CLOSED</h2>
            </div>
            <p className="v18-status-subtitle">
              {status.nextOpen.type === "emergency"
                ? `Emergency support opens ${status.nextOpen.day} at ${status.nextOpen.time}`
                : `Opens ${status.nextOpen.day} at ${status.nextOpen.time}`}
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
