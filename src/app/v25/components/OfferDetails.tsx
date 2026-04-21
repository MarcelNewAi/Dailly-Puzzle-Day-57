"use client";

import ClaimButton from "./ClaimButton";

type OfferPhase = "active" | "expired" | "sold-out";

interface OfferDetailsProps {
  spotsRemaining: number;
  phase: OfferPhase;
  onClaim: () => void;
}

const OFFER_ROWS = [
  { label: "Lifetime access", value: "$0 during beta" },
  { label: "Team seats", value: "Up to 10" },
  { label: "Early adopter pricing", value: "Locked forever" },
  { label: "Priority onboarding", value: "Personal setup call" },
  { label: "Private Slack channel", value: "Direct founder access" },
];

export default function OfferDetails({ spotsRemaining, phase, onClaim }: OfferDetailsProps) {
  return (
    <section className="v25-offer-details" aria-label="Offer details and included benefits">
      <div className="v25-offer-row">
        <div className="v25-offer-copy">
          <p className="v25-offer-eyebrow">COHORT_001 // EARLY ACCESS RELEASE</p>
          <h2>QUANTA EARLY ACCESS</h2>
          <p>AI analytics for product teams. No credit card. Ship faster.</p>
        </div>

        <ClaimButton onClaim={onClaim} spotsRemaining={spotsRemaining} phase={phase} />
      </div>

      <div className="v25-includes-section">
        <p className="v25-includes-label">WHAT&apos;S INCLUDED</p>

        <div className="v25-dot-leader-list">
          {OFFER_ROWS.map((row) => (
            <div className="v25-dot-leader-row" key={row.label}>
              <span className="v25-dot-leader-left">{row.label}</span>
              <span className="v25-dot-leader" aria-hidden="true" />
              <span className="v25-dot-leader-right">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
