"use client";

type DebugStatus = "watching" | "triggered" | "dismissed";
type TriggerSource = "exit" | "idle" | "manual" | null;

interface DebugPanelProps {
  status: DebugStatus;
  secondsUntilIdle: number;
  lastTriggerSource: TriggerSource;
  sessionDismissed: boolean;
  onResetSession: () => void;
  isTouchOnlyDevice: boolean;
  mobileExpanded: boolean;
  onToggleMobileExpanded: () => void;
}

function getCountdownClass(seconds: number): string {
  if (seconds <= 5) {
    return "is-red";
  }
  if (seconds <= 12) {
    return "is-amber";
  }
  return "is-emerald";
}

const statusLabel: Record<DebugStatus, string> = {
  watching: "Watching",
  triggered: "Triggered",
  dismissed: "Dismissed",
};

export default function DebugPanel({
  status,
  secondsUntilIdle,
  lastTriggerSource,
  sessionDismissed,
  onResetSession,
  isTouchOnlyDevice,
  mobileExpanded,
  onToggleMobileExpanded,
}: DebugPanelProps) {
  return (
    <aside className={`v11-debug-wrap${mobileExpanded ? " is-expanded" : ""}`}>
      <button
        className="v11-debug-toggle"
        type="button"
        onClick={onToggleMobileExpanded}
        aria-expanded={mobileExpanded}
        aria-controls="v11-debug-panel"
        aria-label="Toggle debug panel"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a2 2 0 0 0-2 2v1.1A7.2 7.2 0 0 0 4.2 11H3a2 2 0 1 0 0 2h1.2A7.2 7.2 0 0 0 10 18.9V20a2 2 0 1 0 4 0v-1.1A7.2 7.2 0 0 0 19.8 13H21a2 2 0 1 0 0-2h-1.2A7.2 7.2 0 0 0 14 5.1V4a2 2 0 0 0-2-2Zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
        </svg>
      </button>

      <section id="v11-debug-panel" className="v11-debug-panel" aria-label="Exit intent debug panel">
        <header className="v11-debug-header">
          <span className="v11-debug-pulse" aria-hidden="true" />
          <p>EXIT-INTENT DEBUG</p>
        </header>

        <dl className="v11-debug-grid">
          <div>
            <dt>Modal Status:</dt>
            <dd className={`v11-debug-status is-${status}`}>{statusLabel[status]}</dd>
          </div>
          <div>
            <dt>Idle in:</dt>
            <dd className={`v11-idle-value ${getCountdownClass(secondsUntilIdle)}`}>
              {sessionDismissed ? "--" : `${secondsUntilIdle}s`}
            </dd>
          </div>
          <div>
            <dt>Last trigger:</dt>
            <dd>{lastTriggerSource ?? "--"}</dd>
          </div>
          <div>
            <dt>Session dismissed:</dt>
            <dd>{sessionDismissed ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt>Pointer mode:</dt>
            <dd>{isTouchOnlyDevice ? "touch only" : "mouse enabled"}</dd>
          </div>
        </dl>

        <button className="v11-debug-reset" type="button" onClick={onResetSession}>
          Reset Session
        </button>
      </section>
    </aside>
  );
}
