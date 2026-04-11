"use client";

import type { Service } from "./data/services";

interface ResultCardProps {
  service: Service;
  reasoningText: string;
  alternatives: Service[];
  onReview: () => void;
  onRestart: () => void;
}

function AccentIcon({ icon }: { icon: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "rocket":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M7 14c-2 0-3 1-4 3 2 0 3-1 4-3Zm3 3c0 1-1 2-3 3 0-2 1-3 3-3Zm8-13c-3 0-6 1-8 4l-2 2 4 4 2-2c3-2 4-5 4-8Zm-7 5 4 4" />
        </svg>
      );
    case "trending-up":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M4 16l6-6 4 4 6-7" />
          <path {...common} d="M14 7h6v6" />
        </svg>
      );
    case "shopping-cart":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M3 4h2l2.4 10h10.6l2-7H7.2M10 20a1 1 0 1 0 0-.01M18 20a1 1 0 1 0 0-.01" />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M3 9 9 3h6l6 6-9 12L3 9Z" />
        </svg>
      );
    case "zap":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M13 2 4 13h6l-1 9 9-11h-6l1-9Z" />
        </svg>
      );
    case "plug":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M8 7V3M16 7V3M7 9h10v3a5 5 0 0 1-5 5v4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle {...common} cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

function PriceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M16 6a5 5 0 1 0 0 12M7 10h8M7 14h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TimelineIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v6l4 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 13 4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ResultCard({ service, reasoningText, alternatives, onReview, onRestart }: ResultCardProps) {
  return (
    <section className="v12-result-shell" role="status" aria-live="polite" aria-label="Your service recommendation">
      <div className="v12-result-confetti" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index} style={{ ["--v12-particle-index" as string]: index }} />
        ))}
      </div>

      <article className="v12-result-card">
        <p className="v12-result-label">WE RECOMMEND</p>

        <div className="v12-result-icon">
          <AccentIcon icon={service.accentIcon} />
        </div>

        <h2 className="v12-result-title">{service.name}</h2>
        <p className="v12-result-tagline">{service.tagline}</p>

        {service.badge ? <span className="v12-result-badge">{service.badge}</span> : null}

        <hr className="v12-result-divider" />

        <p className="v12-result-description">{service.description}</p>

        <div className="v12-result-meta-row">
          <p>
            <PriceIcon />
            <span>Price Range</span>
            <strong>{service.priceRange}</strong>
          </p>
          <p>
            <TimelineIcon />
            <span>Timeline</span>
            <strong>{service.timeline}</strong>
          </p>
        </div>

        <ul className="v12-result-features" aria-label="Included features">
          {service.features.map((feature) => (
            <li key={feature}>
              <CheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <p className="v12-result-reasoning">{reasoningText}</p>

        <a className="v12-btn v12-btn-primary v12-result-cta" href={service.ctaHref}>
          {service.ctaText}
        </a>

        <div className="v12-result-secondary-actions">
          <button type="button" className="v12-link-action" onClick={onReview}>
            Review My Answers
          </button>
          <button type="button" className="v12-link-action" onClick={onRestart}>
            Start Over
          </button>
        </div>
      </article>

      <section className="v12-alternatives" aria-label="Alternative options">
        <h3>You Might Also Consider</h3>
        <div className="v12-alt-grid">
          {alternatives.map((alternative) => (
            <article key={alternative.id} className="v12-alt-card">
              <p className="v12-alt-name">{alternative.name}</p>
              <p className="v12-alt-tagline">{alternative.tagline}</p>
              <p className="v12-alt-price">{alternative.priceRange}</p>
              <a href={alternative.ctaHref} className="v12-alt-link">
                View Details
              </a>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
