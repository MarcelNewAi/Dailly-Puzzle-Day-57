"use client";

export default function PreviewBadges() {
  return (
    <section className="v8-preview-section">
      <h3 className="v8-preview-title">Badges &amp; Tags</h3>
      <div className="v8-badge-row">
        <span className="v8-badge v8-badge-filled">New</span>
        <span className="v8-badge v8-badge-outlined">Popular</span>
        <span className="v8-badge v8-badge-muted">Draft</span>
        <span className="v8-badge v8-badge-success">Active</span>
        <span className="v8-badge v8-badge-warning">Pending</span>
      </div>
    </section>
  );
}

