"use client";

import { useState } from "react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function TagInput({ tags, onChange }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const next = inputValue.trim();
    if (!next) return;
    if (tags.some((tag) => tag.toLowerCase() === next.toLowerCase())) {
      setInputValue("");
      return;
    }
    if (tags.length >= 8) {
      setInputValue("");
      return;
    }
    onChange([...tags, next]);
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="v28-tag-row">
      {tags.map((tag) => (
        <span key={tag} className="v28-tag-chip">
          <span>{tag}</span>
          <button type="button" className="v28-tag-chip-remove" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
            <CloseIcon />
          </button>
        </span>
      ))}

      <input
        type="text"
        className="v28-tag-input"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addTag();
            return;
          }

          if (event.key === "Backspace" && inputValue.length === 0 && tags.length > 0) {
            onChange(tags.slice(0, -1));
          }
        }}
        onBlur={addTag}
        placeholder="Add tag..."
        aria-label="Add tags"
      />
    </div>
  );
}

