interface RegeneratePanelProps {
  regenerating: boolean;
  oldKeyId: string | null;
  onRegenerate: () => void;
  onCancel: () => void;
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="v27-note-icon" aria-hidden="true">
      <path d="M12 3.6 21 19.5H3L12 3.6Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 9v5.3M12 17.3h.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function RegeneratePanel({ regenerating, oldKeyId, onRegenerate, onCancel }: RegeneratePanelProps) {
  return (
    <section className={`v27-panel ${regenerating ? "v27-regen-panel--confirming" : ""}`}>
      <p className="v27-panel-label">REGENERATE KEY</p>

      {!regenerating ? (
        <>
          <p className="v27-regen-warning">
            Regenerating your API key will immediately invalidate the current key. Any integrations using the old key will
            stop working.
          </p>
          <button type="button" className="v27-btn v27-btn--outline v27-btn--warn" onClick={onRegenerate}>
            Regenerate key
          </button>
        </>
      ) : (
        <>
          <p className="v27-regen-confirm-text">Are you sure? This cannot be undone.</p>
          <div className="v27-regen-confirm-btns">
            <button type="button" className="v27-btn v27-btn--danger" onClick={onRegenerate}>
              Yes, regenerate
            </button>
            <button type="button" className="v27-btn v27-btn--outline" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </>
      )}

      {oldKeyId ? (
        <p className="v27-old-key-notice">
          <WarningIcon />
          <span>
            Key <strong>{oldKeyId}</strong> has been invalidated.
          </span>
        </p>
      ) : null}
    </section>
  );
}
