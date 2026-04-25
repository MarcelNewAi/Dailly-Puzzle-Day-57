import type { HistoryStack } from "../history";
import HistoryEntry from "./HistoryEntry";

interface HistoryPanelProps {
  historyStack: HistoryStack;
  onJumpTo: (index: number) => void;
}

export default function HistoryPanel({ historyStack, onJumpTo }: HistoryPanelProps) {
  const reversed = [...historyStack.entries].reverse();

  return (
    <aside className="v29-history-panel" aria-label="History timeline">
      <div className="v29-history-header">
        <p className="v29-history-title">History</p>
        <span className="v29-history-meta">{historyStack.entries.length} states</span>
      </div>
      <p className="v29-history-help">Click any state to jump to it</p>

      <div className="v29-history-list">
        <span className="v29-history-timeline-line" aria-hidden="true" />
        {reversed.map((entry, reverseIndex) => {
          const originalIndex = historyStack.entries.length - reverseIndex - 1;
          return (
            <HistoryEntry
              key={`${entry.timestamp}-${originalIndex}`}
              entry={entry}
              index={originalIndex}
              currentIndex={historyStack.currentIndex}
              totalEntries={historyStack.entries.length}
              onClick={() => onJumpTo(originalIndex)}
            />
          );
        })}
      </div>
    </aside>
  );
}
