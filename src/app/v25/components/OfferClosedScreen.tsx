"use client";

import { useState } from "react";

interface OfferClosedScreenProps {
  reason: "expired" | "sold-out";
}

export default function OfferClosedScreen({ reason }: OfferClosedScreenProps) {
  const [showWaitlistInput, setShowWaitlistInput] = useState(false);

  const heading = reason === "expired" ? "OFFER CLOSED" : "SOLD OUT";
  const message =
    reason === "expired"
      ? "The 48-hour early access window has closed. Follow @quantaapp for the next launch."
      : "All 5 early access spots have been claimed. You can join the waitlist below.";

  return (
    <section className="v25-closed-screen" aria-live="polite">
      <header className="v25-closed-header">
        <span>QUANTA / STATUS</span>
      </header>

      <div className="v25-closed-content">
        <div className="v25-closed-divider" aria-hidden="true" />
        <h1>{heading}</h1>
        <p>{message}</p>

        <button
          type="button"
          className="v25-closed-waitlist-btn"
          onClick={() => setShowWaitlistInput((previous) => !previous)}
        >
          JOIN WAITLIST -&gt;
        </button>

        {showWaitlistInput ? (
          <input
            type="email"
            className="v25-closed-input"
            placeholder="you@company.com"
            aria-label="Email address for waitlist"
          />
        ) : null}

        <p className="v25-closed-footnote">Next cohort opens Q3 2025 .. 48 spots available</p>
      </div>
    </section>
  );
}
