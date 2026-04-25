"use client";

import { useEffect, useRef, useState } from "react";
import { formatHistoryTime, type Card } from "../history";

interface BoardCardProps {
  card: Card;
  onUpdate: (id: string, text: string) => void;
  onChangeColour: (id: string, colour: Card["colour"]) => void;
  onDelete: (id: string) => void;
}

const COLOUR_META: Record<Card["colour"], { bg: string; accent: string }> = {
  default: { bg: "var(--v29-card-default)", accent: "var(--v29-border-bright)" },
  blue: { bg: "var(--v29-card-blue)", accent: "#4a7fc1" },
  green: { bg: "var(--v29-card-green)", accent: "#2d9e6b" },
  amber: { bg: "var(--v29-card-amber)", accent: "#d4900a" },
  rose: { bg: "var(--v29-card-rose)", accent: "#d45c7a" },
};

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7h16M9.5 3h5l.7 2H20M8 7l.8 11.2a2 2 0 0 0 2 1.8h2.4a2 2 0 0 0 2-1.8L16 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function BoardCard({ card, onUpdate, onChangeColour, onDelete }: BoardCardProps) {
  const [text, setText] = useState(card.text);
  const [isEditing, setIsEditing] = useState(false);
  const [showColourPicker] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const debounceTimerRef = useRef<number | null>(null);
  const lastCommittedTextRef = useRef(card.text);

  useEffect(() => {
    setText(card.text);
    lastCommittedTextRef.current = card.text;
  }, [card.text]);

  useEffect(() => {
    if (!isEditing) {
      return;
    }
    textareaRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const commitUpdate = (nextText: string) => {
    if (nextText === lastCommittedTextRef.current) {
      return;
    }
    lastCommittedTextRef.current = nextText;
    onUpdate(card.id, nextText);
  };

  const scheduleDebouncedCommit = (nextText: string) => {
    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = window.setTimeout(() => {
      commitUpdate(nextText);
    }, 600);
  };

  const colourMeta = COLOUR_META[card.colour];

  return (
    <article className="v29-board-card" style={{ background: colourMeta.bg, borderTopColor: colourMeta.accent }}>
      <div className="v29-card-top">
        <span className="v29-card-created">{formatHistoryTime(card.createdAt)}</span>
        <span className="v29-card-menu" aria-hidden="true">
          <DotsIcon />
        </span>
      </div>

      <div className="v29-card-body">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="v29-card-textarea"
            value={text}
            rows={3}
            onChange={(event) => {
              const nextText = event.target.value;
              setText(nextText);
              scheduleDebouncedCommit(nextText);
            }}
            onBlur={() => {
              if (debounceTimerRef.current !== null) {
                window.clearTimeout(debounceTimerRef.current);
              }
              commitUpdate(text);
              setIsEditing(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape" || (event.key === "Enter" && !event.shiftKey)) {
                event.preventDefault();
                event.currentTarget.blur();
              }
            }}
          />
        ) : (
          <div
            className="v29-card-text"
            role="button"
            tabIndex={0}
            onClick={() => setIsEditing(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setIsEditing(true);
              }
            }}
          >
            {text}
          </div>
        )}
      </div>

      <div className="v29-card-footer">
        <button
          type="button"
          className="v29-card-delete"
          onClick={() => onDelete(card.id)}
          aria-label={`Delete card: ${card.text}`}
        >
          <TrashIcon />
        </button>

        {showColourPicker ? (
          <div className="v29-colour-swatches" role="group" aria-label="Card colour">
            {(Object.keys(COLOUR_META) as Card["colour"][]).map((colour) => {
              const active = colour === card.colour;
              return (
                <button
                  key={colour}
                  type="button"
                  className={`v29-colour-swatch ${active ? "v29-colour-swatch--active" : ""}`}
                  style={{ background: COLOUR_META[colour].accent }}
                  onClick={() => onChangeColour(card.id, colour)}
                  aria-label={`Set ${colour} colour`}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </article>
  );
}
