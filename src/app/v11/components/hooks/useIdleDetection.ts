"use client";

import { useEffect, useRef, useState } from "react";

interface UseIdleDetectionOptions {
  enabled: boolean;
  idleTimeMs: number;
  onIdle: () => void;
}

export function useIdleDetection({ enabled, idleTimeMs, onIdle }: UseIdleDetectionOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const deadlineRef = useRef<number>(0);
  const [secondsUntilIdle, setSecondsUntilIdle] = useState(Math.ceil(idleTimeMs / 1000));

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      return;
    }

    function resetTimer() {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      deadlineRef.current = Date.now() + idleTimeMs;
      setSecondsUntilIdle(Math.ceil(idleTimeMs / 1000));
      timerRef.current = setTimeout(() => {
        onIdle();
      }, idleTimeMs);
    }

    const events: Array<keyof WindowEventMap> = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((eventName) => window.addEventListener(eventName, resetTimer, { passive: true }));

    countdownRef.current = setInterval(() => {
      const msLeft = Math.max(0, deadlineRef.current - Date.now());
      setSecondsUntilIdle(Math.ceil(msLeft / 1000));
    }, 1000);

    resetTimer();

    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, resetTimer));
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [enabled, idleTimeMs, onIdle]);

  return { secondsUntilIdle };
}
