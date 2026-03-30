import type { DragEvent, ReactNode, TouchEvent } from "react";
import { useEffect } from "react";

type DraggableItemProps = {
  index: number;
  name: string;
  description: string;
  icon: ReactNode;
  isDragging: boolean;
  isResetAnimating: boolean;
  onDragStart: (event: DragEvent<HTMLElement>) => void;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
  onTouchStart: () => void;
  onTouchMove: (event: TouchEvent<HTMLElement>) => void;
  onTouchEnd: () => void;
  onKeyboardMove: (direction: -1 | 1) => void;
};

export default function DraggableItem({
  index,
  name,
  description,
  icon,
  isDragging,
  isResetAnimating,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onKeyboardMove,
}: DraggableItemProps) {
  useEffect(() => {
    const root = document.documentElement;
    if (isDragging) {
      root.classList.add("v7-is-dragging");
      return;
    }

    root.classList.remove("v7-is-dragging");
    return undefined;
  }, [isDragging]);

  return (
    <article
      className={`v7-draggable-item ${isDragging ? "is-dragging" : ""} ${isResetAnimating ? "is-resetting" : ""}`}
      data-v7-item-index={index}
      draggable
      role="listitem"
      tabIndex={0}
      aria-label={`Section ${index + 1}: ${name}`}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onDragEnd}
      onKeyDown={(event) => {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          onKeyboardMove(-1);
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          onKeyboardMove(1);
        }
      }}
    >
      <span className="v7-drag-handle" aria-label={`Drag to reorder ${name}`} role="img">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="4" cy="3" r="1.2" />
          <circle cx="4" cy="8" r="1.2" />
          <circle cx="4" cy="13" r="1.2" />
          <circle cx="11.5" cy="3" r="1.2" />
          <circle cx="11.5" cy="8" r="1.2" />
          <circle cx="11.5" cy="13" r="1.2" />
        </svg>
      </span>

      <div className="v7-draggable-main">
        <p className="v7-draggable-index">#{index + 1}</p>
        <h3 className="v7-draggable-name">{name}</h3>
        <p className="v7-draggable-description">{description}</p>
      </div>

      <span className="v7-draggable-icon" aria-hidden="true">
        {icon}
      </span>
    </article>
  );
}