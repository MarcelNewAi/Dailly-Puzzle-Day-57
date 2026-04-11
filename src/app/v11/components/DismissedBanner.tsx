"use client";

interface DismissedBannerProps {
  visible: boolean;
  onReopen: () => void;
  onHide: () => void;
}

export default function DismissedBanner({ visible, onReopen, onHide }: DismissedBannerProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="v11-dismissed-banner" role="status" aria-live="polite">
      <div className="v11-dismissed-banner-inner">
        <span className="v11-dismissed-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 3 4 7v4c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V7l-8-4Zm0 3.2 5 2.5V11c0 3.6-2.2 6.9-5 8-2.8-1.1-5-4.4-5-8V8.7l5-2.5Z" />
          </svg>
        </span>
        <p>Still interested? Get your 15% discount</p>
        <button className="v11-banner-btn" type="button" onClick={onReopen}>
          Reopen
        </button>
      </div>
      <button className="v11-banner-close" type="button" onClick={onHide} aria-label="Hide banner">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m18.3 7.1-1.4-1.4-4.9 4.9-4.9-4.9-1.4 1.4 4.9 4.9-4.9 4.9 1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-4.9-4.9 4.9-4.9Z" />
        </svg>
      </button>
    </div>
  );
}
