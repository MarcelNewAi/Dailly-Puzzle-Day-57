"use client";

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <input
      type="text"
      className="v28-title-input"
      placeholder="Article title..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Article title"
    />
  );
}

