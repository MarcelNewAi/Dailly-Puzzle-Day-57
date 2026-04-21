"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { ChecklistItem as ChecklistDataItem } from "../data/checklist";

interface ChecklistItemProps {
  item: ChecklistDataItem;
  checked: boolean;
  animationDelayMs: number;
  onToggle: (id: string) => void;
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11.2v4.8M12 8.1h.01" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="v19-checkbox-check" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m6.2 12.3 3.8 3.7 7.8-8.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ChecklistItem({ item, checked, animationDelayMs, onToggle }: ChecklistItemProps) {
  const [isTipOpen, setIsTipOpen] = useState(false);
  const [isTipPinned, setIsTipPinned] = useState(false);
  const tipWrapRef = useRef<HTMLDivElement>(null);

  const labelId = useId();
  const descriptionId = useId();
  const requiredId = useId();

  useEffect(() => {
    if (!isTipOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!tipWrapRef.current?.contains(event.target as Node)) {
        setIsTipOpen(false);
        setIsTipPinned(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      setIsTipOpen(false);
      setIsTipPinned(false);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isTipOpen]);

  const describedBy = item.required ? `${descriptionId} ${requiredId}` : descriptionId;

  return (
    <div
      role="checkbox"
      tabIndex={0}
      aria-checked={checked}
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      className={`v19-item-row ${checked ? "is-checked" : ""}`}
      style={{ "--v19-row-delay": `${animationDelayMs}ms` } as CSSProperties}
      onClick={() => onToggle(item.id)}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) {
          return;
        }
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }
        event.preventDefault();
        onToggle(item.id);
      }}
    >
      <span className={`v19-checkbox ${checked ? "is-checked" : ""}`} aria-hidden="true">
        <CheckIcon />
      </span>

      <span className="v19-item-content">
        <span className="v19-item-topline">
          <span id={labelId} className="v19-item-label">
            {item.label}
          </span>
          {item.required ? (
            <span id={requiredId} className="v19-required-pill">
              Required
            </span>
          ) : null}
        </span>
        <span id={descriptionId} className="v19-item-description">
          {item.description}
        </span>
      </span>

      <div
        ref={tipWrapRef}
        className="v19-tip-wrap"
        onMouseEnter={() => {
          if (!isTipPinned) {
            setIsTipOpen(true);
          }
        }}
        onMouseLeave={() => {
          if (!isTipPinned) {
            setIsTipOpen(false);
          }
        }}
      >
        <button
          type="button"
          className="v19-tip-button"
          aria-label={`Show tip for ${item.label}`}
          aria-expanded={isTipOpen}
          onClick={(event) => {
            event.stopPropagation();
            setIsTipPinned((previousPinned) => {
              const nextPinned = !previousPinned;
              setIsTipOpen(nextPinned);
              return nextPinned;
            });
          }}
        >
          <InfoIcon />
        </button>

        {isTipOpen ? (
          <div className="v19-tip-popover v19-tip-in" role="tooltip">
            {item.tip}
          </div>
        ) : null}
      </div>
    </div>
  );
}
