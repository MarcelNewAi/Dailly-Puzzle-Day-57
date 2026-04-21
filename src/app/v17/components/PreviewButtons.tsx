export default function PreviewButtons() {
  return (
    <section className="v17-preview-section">
      <h2 className="v17-section-title">BUTTONS</h2>
      <div className="v17-button-grid">
        <button type="button" className="v17-btn v17-btn-primary">
          Primary CTA
        </button>
        <button type="button" className="v17-btn v17-btn-secondary">
          Secondary
        </button>
        <button type="button" className="v17-btn v17-btn-ghost">
          Ghost Link
        </button>
        <button type="button" className="v17-btn v17-btn-icon" aria-label="Settings">
          ⌘
        </button>
      </div>
    </section>
  );
}
