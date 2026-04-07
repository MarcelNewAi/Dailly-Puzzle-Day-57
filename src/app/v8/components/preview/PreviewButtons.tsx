"use client";

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.2 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m19.4 13 .1-1-.1-1 2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-1.7-1L15 2h-6l-.3 3a7.5 7.5 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.5 7.5 0 0 0 1.7 1L9 22h6l.3-3a7.5 7.5 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
    </svg>
  );
}

export default function PreviewButtons() {
  return (
    <section className="v8-preview-section">
      <h3 className="v8-preview-title">Interactive Elements</h3>
      <div className="v8-button-row">
        <button type="button" className="v8-btn v8-btn-primary">
          <StarIcon />
          <span>Primary Action</span>
        </button>
        <button type="button" className="v8-btn v8-btn-secondary">
          <LightningIcon />
          <span>Secondary Action</span>
        </button>
        <button type="button" className="v8-btn v8-btn-outlined">
          <GearIcon />
          <span>Outlined</span>
        </button>
      </div>
    </section>
  );
}

