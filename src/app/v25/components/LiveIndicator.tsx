"use client";

export default function LiveIndicator() {
  return (
    <div className="v25-live-indicator" aria-live="polite">
      <span className="v25-live-dot" aria-hidden="true" />
      <span>LIVE</span>
    </div>
  );
}
