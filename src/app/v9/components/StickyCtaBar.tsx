"use client";

import { useEffect, useState } from "react";
import TrustElements from "./TrustElements";

type StickyCtaBarProps = {
  activeSection: string;
  onCtaClick: () => void;
};

type CtaIconKey = "rocket" | "lightning" | "sparkle" | "search" | "users" | "diamond" | "chat" | "target";

type CtaEntry = {
  text: string;
  icon: CtaIconKey;
};

const ctaTextMap: Record<string, CtaEntry> = {
  hero: { text: "Get Started Free", icon: "rocket" },
  problem: { text: "Solve This Now", icon: "lightning" },
  solution: { text: "See How It Works", icon: "sparkle" },
  features: { text: "Explore Features", icon: "search" },
  "social-proof": { text: "Join 2,000+ Clients", icon: "users" },
  pricing: { text: "Choose Your Plan", icon: "diamond" },
  faq: { text: "Still Have Questions?", icon: "chat" },
  "final-cta": { text: "Start Your Free Trial", icon: "target" },
};

function CtaIcon({ icon }: { icon: CtaIconKey }) {
  if (icon === "rocket") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.9 3.1c2.8-.9 5.5 1.8 4.6 4.6-.7 2.2-2.2 4.1-4 5.5l-1.1.9-3.2-3.2.9-1.1c1.4-1.8 3.3-3.3 5.5-4ZM10.8 12.5l2.7 2.7-1.8 3.8a1 1 0 0 1-1.7.2l-3-3a1 1 0 0 1 .2-1.7l3.6-2Zm-4.6 5 2.8 2.8-2.8.9a1.9 1.9 0 0 1-2.4-2.4l.9-2.8Zm-.8-7.3 3-3a1 1 0 0 1 1.7.2l.8 1.9-3.9 3.9-1.8-.8a1 1 0 0 1-.2-1.7Z" />
      </svg>
    );
  }

  if (icon === "lightning") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" />
      </svg>
    );
  }

  if (icon === "sparkle") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 2 1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2Zm7 10 1 2.8 2.8 1-2.8 1L19 20l-1-2.2-2.2-1 2.2-1L19 12ZM4.8 14l.8 2.2L8 17l-2.4.8L4.8 20l-.8-2.2L1.6 17l2.4-.8.8-2.2Z" />
      </svg>
    );
  }

  if (icon === "search") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10.5 3a7.5 7.5 0 0 1 6 12l4 4-1.5 1.5-4-4a7.5 7.5 0 1 1-4.5-13.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
      </svg>
    );
  }

  if (icon === "users") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0 2c3 0 5.8 1.6 7.2 4.1.4.7-.1 1.9-1.1 1.9H2.9c-1 0-1.5-1.2-1.1-1.9A8.2 8.2 0 0 1 9 14Zm10-3a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0 2c1.8 0 3.5.8 4.5 2.2.5.6 0 1.8-.9 1.8h-4.4a10.8 10.8 0 0 0-2-4h2.8Z" />
      </svg>
    );
  }

  if (icon === "diamond") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3h10l4 5-9 13L3 8l4-5Zm1.9 2L6.1 8H10l1-3H8.9Zm4.1 0-1 3h4l-2.8-3H13Zm4.3.2L18.9 8h1.8l-3.4-2.8ZM5.1 8 6.7 5.2 3.3 8h1.8Zm5 2H6.2l5.1 7.3L10.1 10Zm3.8 0-1.2 7.3L17.8 10h-3.9Z" />
      </svg>
    );
  }

  if (icon === "chat") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4.8 3.7c-.7.5-1.7 0-1.7-.9V6a2 2 0 0 1 2-2Zm1 3v8.8L8.3 14H20V7H5Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 0 1 10 10c0 5.6-4.4 10-10 10S2 17.6 2 12 6.4 2 12 2Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 3 2.6 5.4L20 15l-5.4 2.6L12 23l-2.6-5.4L4 15l5.4-2.6L12 7Z" />
    </svg>
  );
}

export default function StickyCtaBar({ activeSection, onCtaClick }: StickyCtaBarProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [displayedSection, setDisplayedSection] = useState("hero");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  useEffect(() => {
    const mountTimer = window.setTimeout(() => {
      setIsMounted(true);
    }, 20);

    return () => window.clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    const nextSection = ctaTextMap[activeSection] ? activeSection : "hero";
    if (nextSection === displayedSection) {
      return;
    }

    let fadeOutTimer: number | undefined;
    let fadeInTimer: number | undefined;

    const beginTimer = window.setTimeout(() => {
      setIsFadingOut(true);
      fadeOutTimer = window.setTimeout(() => {
        setDisplayedSection(nextSection);
        setIsFadingOut(false);
        setIsFadingIn(true);

        fadeInTimer = window.setTimeout(() => {
          setIsFadingIn(false);
        }, 75);
      }, 75);
    }, 0);

    return () => {
      window.clearTimeout(beginTimer);
      if (fadeOutTimer !== undefined) {
        window.clearTimeout(fadeOutTimer);
      }
      if (fadeInTimer !== undefined) {
        window.clearTimeout(fadeInTimer);
      }
    };
  }, [activeSection, displayedSection]);

  const currentEntry = ctaTextMap[displayedSection] ?? ctaTextMap.hero;

  return (
    <aside className={`v9-sticky-bar ${isMounted ? "is-mounted" : ""}`} aria-label="Sticky call-to-action">
      <div className="v9-sticky-bar-inner">
        <div className="v9-sticky-trust-wrap">
          <TrustElements variant="bar" />
        </div>
        <button
          type="button"
          className="v9-sticky-cta-button"
          onClick={onCtaClick}
          aria-label={`${currentEntry.text}. Scroll to pricing section.`}
        >
          <span
            className={`v9-sticky-cta-content ${isFadingOut ? "is-fading-out" : ""} ${isFadingIn ? "is-fading-in" : ""}`.trim()}
          >
            <span className="v9-sticky-cta-icon" aria-hidden="true">
              <CtaIcon icon={currentEntry.icon} />
            </span>
            <span>{currentEntry.text}</span>
          </span>
        </button>
      </div>
    </aside>
  );
}
