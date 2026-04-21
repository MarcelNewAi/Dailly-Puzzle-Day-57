"use client";

interface PreviewToggleProps {
  isPreviewMode: boolean;
  onToggle: () => void;
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6-9.5-6-9.5-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ArrowBackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M19 12H5m0 0 5-5m-5 5 5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PreviewToggle({ isPreviewMode, onToggle }: PreviewToggleProps) {
  return (
    <button
      type="button"
      className={`v17-preview-toggle ${isPreviewMode ? "is-preview" : "is-lab"}`}
      onClick={onToggle}
      aria-label={isPreviewMode ? "Exit preview mode" : "Open preview mode"}
      title={isPreviewMode ? "Exit Preview" : "Preview"}
    >
      <span className="v17-preview-toggle-icon">{isPreviewMode ? <ArrowBackIcon /> : <EyeIcon />}</span>
      <span className="v17-preview-toggle-label">{isPreviewMode ? "← Exit Preview" : "Preview"}</span>
    </button>
  );
}
