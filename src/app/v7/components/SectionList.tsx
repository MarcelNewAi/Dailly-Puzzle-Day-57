import type { ReactNode } from "react";
import { useRef } from "react";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import DraggableItem from "./DraggableItem";

type SectionListItem = {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
};

type SectionListProps = {
  sections: SectionListItem[];
  draggedIndex: number | null;
  dropIndex: number | null;
  isResetAnimating: boolean;
  showResetNotice: boolean;
  onDragStart: (index: number) => void;
  onDragHover: (dropIndex: number) => void;
  onDrop: (dropIndexOverride?: number) => void;
  onDragEnd: () => void;
  onKeyboardMove: (index: number, direction: -1 | 1) => void;
  onReset: () => void;
};

export default function SectionList({
  sections,
  draggedIndex,
  dropIndex,
  isResetAnimating,
  showResetNotice,
  onDragStart,
  onDragHover,
  onDrop,
  onDragEnd,
  onKeyboardMove,
  onReset,
}: SectionListProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  const getDropIndexFromPointer = (index: number, clientY: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const before = clientY < rect.top + rect.height / 2;
    return before ? index : index + 1;
  };

  return (
    <div className="v7-section-list-shell">
      <header className="v7-section-list-header">
        <h1 className="v7-section-list-title">Section Builder</h1>
        <p className="v7-section-list-subtitle">Drag to reorder • Drop to rebuild</p>
        <p className="v7-section-list-instruction">
          Rearrange the sections below and watch the preview update in real-time.
        </p>
      </header>

      <div className="relative flex-1 min-h-0">
        <div className="v7-section-list hide-native-scrollbar" role="list" ref={listRef}>
          {sections.map((section, index) => (
            <div key={section.id} className="v7-section-row">
              <div className={`v7-drop-indicator ${dropIndex === index ? "is-visible" : ""}`} aria-hidden="true" />
              <DraggableItem
                index={index}
                name={section.name}
                description={section.description}
                icon={section.icon}
                isDragging={draggedIndex === index}
                isResetAnimating={isResetAnimating}
                onDragStart={(event) => {
                  event.dataTransfer.effectAllowed = "move";
                  onDragStart(index);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  onDragHover(getDropIndexFromPointer(index, event.clientY, event.currentTarget as HTMLElement));
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  const targetDropIndex = getDropIndexFromPointer(index, event.clientY, event.currentTarget as HTMLElement);
                  onDrop(targetDropIndex);
                }}
                onDragEnd={onDragEnd}
                onTouchStart={() => {
                  onDragStart(index);
                }}
                onTouchMove={(event) => {
                  if (draggedIndex === null) {
                    return;
                  }

                  event.preventDefault();

                  const touch = event.touches[0];
                  if (!touch) {
                    return;
                  }

                  const target = document
                    .elementFromPoint(touch.clientX, touch.clientY)
                    ?.closest<HTMLElement>("[data-v7-item-index]");

                  if (target?.dataset.v7ItemIndex) {
                    const targetIndex = Number(target.dataset.v7ItemIndex);
                    const targetDropIndex = getDropIndexFromPointer(targetIndex, touch.clientY, target);
                    onDragHover(targetDropIndex);
                    return;
                  }

                  const listBounds = listRef.current?.getBoundingClientRect();
                  if (listBounds) {
                    onDragHover(touch.clientY < listBounds.top + 20 ? 0 : sections.length);
                  }
                }}
                onTouchEnd={() => {
                  onDrop();
                }}
                onKeyboardMove={(direction) => onKeyboardMove(index, direction)}
              />
            </div>
          ))}
          <div className={`v7-drop-indicator ${dropIndex === sections.length ? "is-visible" : ""}`} aria-hidden="true" />
        </div>
        <CustomScrollbar scrollContainerRef={listRef} variant="card" thumbColor="#C6F135" thumbHoverColor="#A8CC2A" />
      </div>

      <footer className="v7-section-list-footer">
        <button type="button" className="v7-reset-btn" onClick={onReset}>
          Reset to Default
        </button>
        <p className={`v7-reset-notice ${showResetNotice ? "is-visible" : ""}`} aria-live="polite">
          Order reset ?
        </p>
        <p className="v7-autosave-hint">
          <span aria-hidden="true">?</span> Layout saved automatically
        </p>
      </footer>
    </div>
  );
}
