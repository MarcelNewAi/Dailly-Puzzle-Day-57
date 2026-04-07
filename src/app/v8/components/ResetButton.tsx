"use client";

type ResetButtonProps = {
  onReset: () => void;
};

export default function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button type="button" className="v8-reset-btn" onClick={onReset} aria-label="Reset all theme settings to defaults">
      Reset to Defaults
    </button>
  );
}

