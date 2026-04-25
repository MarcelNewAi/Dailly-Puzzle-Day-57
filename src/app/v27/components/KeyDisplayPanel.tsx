import type { ApiKey } from "../keyGen";
import { formatKeyDisplay, maskKey } from "../keyGen";
import CopyButton from "./CopyButton";
import EnvironmentBadge from "./EnvironmentBadge";

interface KeyDisplayPanelProps {
  apiKey: ApiKey;
  revealed: boolean;
  copied: boolean;
  onReveal: () => void;
  onCopy: () => void;
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="v27-btn-icon" aria-hidden="true">
      <path d="M2.8 12s3.3-5.5 9.2-5.5 9.2 5.5 9.2 5.5-3.3 5.5-9.2 5.5S2.8 12 2.8 12Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="v27-btn-icon" aria-hidden="true">
      <path d="M3 3 21 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.5 6.7a9.4 9.4 0 0 1 1.5-.2c5.9 0 9.2 5.5 9.2 5.5a16 16 0 0 1-3 3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6.3 9.5A15.7 15.7 0 0 0 2.8 12s3.3 5.5 9.2 5.5c1.8 0 3.4-.5 4.7-1.3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="v27-note-icon" aria-hidden="true">
      <path d="M12 3.6 21 19.5H3L12 3.6Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 9v5.3M12 17.3h.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function KeyDisplayPanel({ apiKey, revealed, copied, onReveal, onCopy }: KeyDisplayPanelProps) {
  return (
    <section className="v27-panel">
      <div className="v27-key-top">
        <p className="v27-panel-label">API KEY</p>
        <EnvironmentBadge environment={apiKey.environment} />
      </div>

      <div className="v27-key-id-row">
        <span className="v27-key-id-label">Key ID:</span>
        <span className="v27-key-id-value">{apiKey.id}</span>
      </div>

      <div className="v27-key-block">
        <p className={`v27-key-string ${revealed ? "v27-key-string--revealed" : "v27-key-string--masked"}`}>
          {revealed ? formatKeyDisplay(apiKey.full) : maskKey(apiKey.full)}
        </p>

        <hr className="v27-key-divider" />

        <div className="v27-key-actions">
          <button type="button" onClick={onReveal} className="v27-btn v27-btn--outline v27-btn--reveal">
            {revealed ? <EyeOffIcon /> : <EyeIcon />}
            <span>{revealed ? "Hide key" : "Reveal key"}</span>
          </button>

          <CopyButton onCopy={onCopy} copied={copied} disabled={!revealed} />
        </div>
      </div>

      <p className="v27-security-note">
        <WarningIcon />
        <span>Treat this key like a password. Do not share it or commit it to version control.</span>
      </p>
    </section>
  );
}

