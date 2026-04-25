import UndoRedoButtons from "./UndoRedoButtons";

interface ToolbarProps {
  cardCount: number;
  canUndo: boolean;
  canRedo: boolean;
  historyLength: number;
  currentIndex: number;
  onUndo: () => void;
  onRedo: () => void;
}

function BoardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="4" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="4" width="7" height="4" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="11" width="7" height="9" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3.5" y="14" width="7" height="6" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Toolbar({
  cardCount,
  canUndo,
  canRedo,
  historyLength,
  currentIndex,
  onUndo,
  onRedo,
}: ToolbarProps) {
  return (
    <header className="v29-toolbar">
      <div className="v29-toolbar-left">
        <span className="v29-toolbar-mark" aria-hidden="true">
          <BoardIcon />
        </span>
        <p className="v29-brand">Slate</p>
        <span className="v29-separator" aria-hidden="true">
          ·
        </span>
        <p className="v29-brand-sub">Product Board</p>
      </div>

      <div className="v29-toolbar-center">
        <UndoRedoButtons canUndo={canUndo} onUndo={onUndo} canRedo={canRedo} onRedo={onRedo} />
      </div>

      <div className="v29-toolbar-right">
        <span className="v29-card-count-pill">{cardCount} cards</span>
        <span className="v29-state-count">
          {currentIndex + 1} / {historyLength} states
        </span>
      </div>
    </header>
  );
}
