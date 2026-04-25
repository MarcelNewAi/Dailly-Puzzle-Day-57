"use client";

import { formatSavedTime, type Draft } from "../autosave";

interface DraftRecoveryBannerProps {
  draft: Draft;
  onDismiss: () => void;
  onDiscard: () => void;
}

function BannerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M12 3 4.8 10.2a2.4 2.4 0 0 0 0 3.4l5.6 5.6a2.4 2.4 0 0 0 3.4 0L21 12l-9-9Zm0 3.2 5.8 5.8-4 4-5.8-5.8 4-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DraftRecoveryBanner({ draft, onDismiss, onDiscard }: DraftRecoveryBannerProps) {
  return (
    <section className="v28-recovery-banner" role="status" aria-live="polite">
      <div className="v28-recovery-banner-left">
        <span className="v28-recovery-icon" aria-hidden="true">
          <BannerIcon />
        </span>
        <div>
          <p className="v28-recovery-title">Draft recovered</p>
          <p className="v28-recovery-meta">
            Your last session was saved {formatSavedTime(draft.savedAt)} · Version {draft.version} · {draft.wordCount} words
          </p>
        </div>
      </div>

      <div className="v28-recovery-actions">
        <button type="button" className="v28-btn v28-btn--accent" onClick={onDismiss}>
          Continue editing
        </button>
        <button type="button" className="v28-btn v28-btn--warn-outline" onClick={onDiscard}>
          Discard draft
        </button>
      </div>
    </section>
  );
}

