"use client";

import { useEffect, useRef } from "react";

interface BodyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BodyEditor({ value, onChange }: BodyEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className="v28-body-textarea"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Start writing your article..."
      aria-label="Article body"
    />
  );
}

