import { getPct, getStatus, type Metric } from "../data";

interface StatusTickerProps {
  metrics: Metric[];
}

function MetricTickerChunk({ metric }: { metric: Metric }) {
  const status = getStatus(metric);
  const pct = Math.round(getPct(metric) * 100);

  const message =
    status === "crit"
      ? `${metric.label}: at limit`
      : status === "warn"
        ? `${metric.label}: ${pct}% - warning`
        : `${metric.label}: ${pct}% used`;

  return (
    <span className={`v26-ticker-item v26-ticker-item--${status}`}>
      {message}
      <span className="v26-ticker-sep" aria-hidden="true">
        ···
      </span>
    </span>
  );
}

export default function StatusTicker({ metrics }: StatusTickerProps) {
  const stream = (
    <>
      {metrics.map((metric) => (
        <MetricTickerChunk key={metric.id} metric={metric} />
      ))}
      <span className="v26-cursor" aria-hidden="true">
        _
      </span>
    </>
  );

  return (
    <div className="v26-ticker-bar" role="status" aria-live="polite">
      <span className="v26-ticker-label">[status]</span>
      <span className="v26-ticker-divider" aria-hidden="true">
        │
      </span>
      <div className="v26-ticker-track">
        <div className="v26-ticker-content">
          <div className="v26-ticker-stream">{stream}</div>
          <div className="v26-ticker-stream" aria-hidden="true">
            {stream}
          </div>
        </div>
      </div>
    </div>
  );
}
