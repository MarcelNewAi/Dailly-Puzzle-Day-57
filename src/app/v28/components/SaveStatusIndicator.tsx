"use client";

import { useEffect, useState } from "react";
import { formatSavedTime } from "../autosave";

interface SaveStatusIndicatorProps {
  saveStatus: "idle" | "unsaved" | "saving" | "saved";
  savedAt: number;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="m5 13 4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SaveStatusIndicator({ saveStatus, savedAt }: SaveStatusIndicatorProps) {
  const [mutedSavedAt, setMutedSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (saveStatus !== "saved" || !savedAt) {
      return;
    }

    const timer = window.setTimeout(() => {
      setMutedSavedAt(savedAt);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [saveStatus, savedAt]);

  const isMuted = saveStatus === "saved" && mutedSavedAt === savedAt;

  const indicatorClass = [
    "v28-save-indicator",
    saveStatus === "idle" ? "v28-save-indicator--idle" : "",
    saveStatus === "unsaved" ? "v28-save-indicator--unsaved" : "",
    saveStatus === "saving" ? "v28-save-indicator--saving" : "",
    saveStatus === "saved" ? "v28-save-indicator--saved" : "",
    saveStatus === "saved" && isMuted ? "v28-save-indicator--saved-muted" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={indicatorClass} aria-live="polite" role="status">
      {saveStatus === "unsaved" ? <span className="v28-save-dot" aria-hidden="true" /> : null}
      {saveStatus === "saving" ? <span className="v28-save-spinner" aria-hidden="true" /> : null}
      {saveStatus === "saved" ? <CheckIcon /> : null}
      <span className="v28-save-label">
        {saveStatus === "idle" ? "" : null}
        {saveStatus === "unsaved" ? "Unsaved changes" : null}
        {saveStatus === "saving" ? "Saving..." : null}
        {saveStatus === "saved" ? `Saved ${formatSavedTime(savedAt)}` : null}
      </span>
    </div>
  );
}
