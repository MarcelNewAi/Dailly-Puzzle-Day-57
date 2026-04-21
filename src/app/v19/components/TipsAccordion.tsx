"use client";

import { useState } from "react";

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export default function TipsAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={`v19-accordion ${isOpen ? "is-open" : ""}`}>
      <button
        type="button"
        className="v19-accordion-trigger"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <span>Not sure about something?</span>
        <span className="v19-accordion-chevron" aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>

      <div className="v19-accordion-panel" hidden={!isOpen}>
        <dl>
          <div>
            <dt>What if I don&apos;t have brand assets?</dt>
            <dd>That&apos;s fine, we can help you develop them as part of the project.</dd>
          </div>
          <div>
            <dt>Can I start without a decision-maker?</dt>
            <dd>We recommend looping them in early to avoid surprises later.</dd>
          </div>
          <div>
            <dt>How strict is the budget requirement?</dt>
            <dd>A realistic range is fine — we&apos;ll propose scope to match.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
