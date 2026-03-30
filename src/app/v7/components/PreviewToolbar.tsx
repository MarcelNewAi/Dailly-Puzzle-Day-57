type PreviewToolbarProps = {
  sectionCount: number;
  isSavedHot: boolean;
  showScrollTop: boolean;
  onScrollToTop: () => void;
};

export default function PreviewToolbar({
  sectionCount,
  isSavedHot,
  showScrollTop,
  onScrollToTop,
}: PreviewToolbarProps) {
  return (
    <header className="v7-preview-toolbar">
      <p className="v7-preview-toolbar-title">Live Preview</p>
      <p className="v7-preview-toolbar-count">{sectionCount} sections</p>
      <div className="v7-preview-toolbar-actions">
        <span className={`v7-save-status ${isSavedHot ? "is-hot" : ""}`} aria-live="polite">
          Saved ?
        </span>
        {showScrollTop ? (
          <button type="button" className="v7-scroll-top-btn" onClick={onScrollToTop}>
            Scroll to top
          </button>
        ) : null}
      </div>
    </header>
  );
}