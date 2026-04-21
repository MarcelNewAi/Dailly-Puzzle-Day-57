"use client";

import { useEffect, useState } from "react";
import type { SectionMeta } from "../sections";

interface ContextualCtaProps {
  sectionMeta: SectionMeta;
}

export default function ContextualCta({ sectionMeta }: ContextualCtaProps) {
  const [displayedMeta, setDisplayedMeta] = useState(sectionMeta);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (sectionMeta.id === displayedMeta.id) {
      return;
    }

    setIsFading(true);
    const timeoutId = window.setTimeout(() => {
      setDisplayedMeta(sectionMeta);
      setIsFading(false);
    }, 200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [sectionMeta, displayedMeta.id]);

  return (
    <aside className={`v23-cta-card ${isFading ? "v23-cta-fading" : ""}`} aria-live="polite">
      <span className="v23-cta-top-line" aria-hidden="true" />
      <button type="button" className="v23-cta-btn" aria-label={displayedMeta.ctaLabel}>
        <span className="v23-cta-btn-text">{displayedMeta.ctaLabel}</span>
        <svg
          className="v23-cta-btn-icon"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 12H19M13 6L19 12L13 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="v23-cta-subtext">{displayedMeta.ctaSubtext}</p>
    </aside>
  );
}

