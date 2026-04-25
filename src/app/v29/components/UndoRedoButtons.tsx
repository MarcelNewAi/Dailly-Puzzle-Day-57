interface UndoRedoButtonsProps {
  canUndo: boolean;
  onUndo: () => void;
  canRedo: boolean;
  onRedo: () => void;
}

function LeftArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10.5 6 4.5 12l6 6M5 12h14.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RightArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m13.5 6 6 6-6 6M19 12H4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function UndoRedoButtons({ canUndo, onUndo, canRedo, onRedo }: UndoRedoButtonsProps) {
  return (
    <div className="v29-undo-redo-group" role="group" aria-label="Undo redo controls">
      <button
        type="button"
        className={`v29-undo-btn ${!canUndo ? "v29-undo-btn--disabled" : ""}`}
        onClick={onUndo}
        disabled={!canUndo}
      >
        <LeftArrowIcon />
        <span>Undo</span>
        <kbd className="v29-kbd">⌘Z</kbd>
      </button>
      <button
        type="button"
        className={`v29-redo-btn ${!canRedo ? "v29-redo-btn--disabled" : ""}`}
        onClick={onRedo}
        disabled={!canRedo}
      >
        <RightArrowIcon />
        <span>Redo</span>
        <kbd className="v29-kbd">⌘⇧Z</kbd>
      </button>
    </div>
  );
}
