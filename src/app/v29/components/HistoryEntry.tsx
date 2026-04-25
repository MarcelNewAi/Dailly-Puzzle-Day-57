import { formatHistoryTime, type HistoryEntry as HistoryEntryType } from "../history";

interface HistoryEntryProps {
  entry: HistoryEntryType;
  index: number;
  currentIndex: number;
  totalEntries: number;
  onClick: () => void;
}

export default function HistoryEntry({ entry, index, currentIndex, totalEntries, onClick }: HistoryEntryProps) {
  const isActive = index === currentIndex;
  const isPast = index < currentIndex;
  const isFuture = index > currentIndex;
  const isBaseline = index === 0;
  const entryClass = isActive ? "v29-history-entry--active" : isFuture ? "v29-history-entry--future" : "v29-history-entry--past";
  const dotClass = isActive ? "v29-history-dot--active" : isFuture ? "v29-history-dot--future" : "v29-history-dot--past";

  return (
    <button
      type="button"
      className={`v29-history-entry ${entryClass}`}
      onClick={onClick}
      disabled={isBaseline}
      aria-current={isActive ? "step" : undefined}
      aria-label={`History state ${totalEntries - index}: ${entry.description}`}
    >
      <span className={`v29-history-dot ${dotClass}`} aria-hidden="true" />
      <span className="v29-history-content">
        <span className="v29-history-desc">
          {entry.description}
          {isFuture ? <em className="v29-history-undone"> (undone)</em> : null}
        </span>
        <span className="v29-history-time">{formatHistoryTime(entry.timestamp)}</span>
      </span>
    </button>
  );
}
