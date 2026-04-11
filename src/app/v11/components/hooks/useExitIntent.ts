"use client";

import { useEffect } from "react";

interface UseExitIntentOptions {
  enabled: boolean;
  onExitIntent: () => void;
  threshold?: number;
}

export function useExitIntent({ enabled, onExitIntent, threshold = 10 }: UseExitIntentOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= threshold && event.relatedTarget === null) {
        onExitIntent();
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [enabled, onExitIntent, threshold]);
}
