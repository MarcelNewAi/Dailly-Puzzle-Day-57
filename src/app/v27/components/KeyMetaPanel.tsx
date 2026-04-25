import type { ApiKey } from "../keyGen";
import { formatDate, formatRelativeTime } from "../keyGen";

interface KeyMetaPanelProps {
  apiKey: ApiKey;
  environment: "live" | "test";
  onEnvironmentSwitch: (env: "live" | "test") => void;
}

export default function KeyMetaPanel({ apiKey, environment, onEnvironmentSwitch }: KeyMetaPanelProps) {
  const keyPrefix = apiKey.environment === "live" ? "ks_live_" : "ks_test_";
  const usageLabel = `${apiKey.usageCount} ${apiKey.usageCount === 1 ? "request" : "requests"}`;

  return (
    <section className="v27-panel">
      <p className="v27-panel-label">KEY DETAILS</p>

      <div className="v27-meta-row">
        <span className="v27-meta-label">Created</span>
        <span className="v27-meta-value">{formatDate(apiKey.createdAt)}</span>
      </div>

      <div className="v27-meta-row">
        <span className="v27-meta-label">Last used</span>
        <span className="v27-meta-value">{apiKey.lastUsed ? formatRelativeTime(apiKey.lastUsed) : "Never"}</span>
      </div>

      <div className="v27-meta-row">
        <span className="v27-meta-label">Usage count</span>
        <span className="v27-meta-value">{usageLabel}</span>
      </div>

      <div className="v27-meta-row">
        <span className="v27-meta-label">Environment</span>
        <div className="v27-meta-value-group">
          <div className="v27-env-toggle" role="group" aria-label="Environment switch">
            <button
              type="button"
              onClick={() => onEnvironmentSwitch("live")}
              className={`v27-env-toggle-btn ${
                environment === "live" ? "v27-env-toggle-btn--active" : "v27-env-toggle-btn--inactive"
              }`}
            >
              Live
            </button>
            <button
              type="button"
              onClick={() => onEnvironmentSwitch("test")}
              className={`v27-env-toggle-btn ${
                environment === "test" ? "v27-env-toggle-btn--active" : "v27-env-toggle-btn--inactive"
              }`}
            >
              Test
            </button>
          </div>
          <p className="v27-env-switch-note">Switching environment generates a new key.</p>
        </div>
      </div>

      <div className="v27-meta-row">
        <span className="v27-meta-label">Key prefix</span>
        <span className="v27-meta-value">{keyPrefix}</span>
      </div>

      <div className="v27-meta-row v27-meta-row--last">
        <span className="v27-meta-label">Permissions</span>
        <span className="v27-perm-group">
          <span className="v27-perm-pill">Read</span>
          <span className="v27-perm-pill">Write</span>
        </span>
      </div>
    </section>
  );
}

