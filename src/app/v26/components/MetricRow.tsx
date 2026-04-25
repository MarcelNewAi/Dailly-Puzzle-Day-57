import type React from "react";
import {
  buildAsciiBar,
  formatNumber,
  getPct,
  type Metric,
  type MetricStatus,
} from "../data";

interface MetricRowProps {
  metric: Metric;
  status: MetricStatus;
  index: number;
}

const statusBadge: Record<MetricStatus, string> = {
  ok: "[OK ]",
  warn: "[!! ]",
  crit: "[###]",
};

export default function MetricRow({ metric, status, index }: MetricRowProps) {
  const pct = getPct(metric);
  const pctInt = Math.round(pct * 100);
  const asciiBar = buildAsciiBar(pct);
  const filledMatch = asciiBar.match(/^█+/);
  const filled = filledMatch?.[0] ?? "";
  const empty = asciiBar.slice(filled.length);
  const label = metric.label.padEnd(22, " ");

  return (
    <article className="v26-metric-row v26-row-fade-in" style={{ "--row-index": index } as React.CSSProperties}>
      <div className="v26-metric-grid">
        <span className="v26-metric-index">[{String(index + 1).padStart(2, "0")}]</span>

        <span className="v26-metric-label" title={metric.label}>
          {label}
        </span>

        <span className={`v26-metric-bar v26-metric-bar--${status}`} aria-label={`${pctInt}% used`}>
          <span className={status === "crit" ? "v26-metric-bar-fill v26-metric-bar-fill--crit" : "v26-metric-bar-fill"}>
            {filled}
          </span>
          <span className="v26-metric-bar-empty">{empty}</span>
        </span>

        <span className="v26-metric-numbers">
          {formatNumber(metric.used)} / {formatNumber(metric.limit)}
        </span>

        <span className={`v26-metric-pct v26-metric-pct--${status}`}>{pctInt}%</span>

        <span className={`v26-metric-badge v26-metric-badge--${status}`}>{statusBadge[status]}</span>

        <span className="v26-metric-reset">{status === "crit" ? "Upgrade required" : metric.resetLabel}</span>
      </div>

      <p className="v26-metric-desc">
        <span className="v26-metric-desc-prefix">&gt;</span> {metric.description}
      </p>
    </article>
  );
}
