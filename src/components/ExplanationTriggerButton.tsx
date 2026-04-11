"use client";

import { useEffect, useMemo, useState } from "react";
import ComponentExplanationModal from "./ComponentExplanationModal";

interface ExplanationTriggerButtonProps {
  versionId: string;
}

function NotepadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export default function ExplanationTriggerButton({ versionId }: ExplanationTriggerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isMac = useMemo(() => {
    if (typeof navigator === "undefined") {
      return false;
    }
    return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifier = isMac ? event.metaKey : event.ctrlKey;

      if (!modifier || event.shiftKey || event.altKey) {
        return;
      }

      if (event.key.toLowerCase() !== "o") {
        return;
      }

      event.preventDefault();
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMac]);

  const shortcutHint = isMac ? "Explanation (O)" : "Explanation (Ctrl+O)";

  return (
    <>
      <button
        type="button"
        className="v-explanation-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Open component explanation"
        title={shortcutHint}
        data-shortcut={shortcutHint}
      >
        <NotepadIcon />
      </button>

      <ComponentExplanationModal isOpen={isOpen} onClose={() => setIsOpen(false)} versionId={versionId} />
    </>
  );
}
