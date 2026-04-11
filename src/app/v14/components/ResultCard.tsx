"use client";

import { useMemo, useState } from "react";
import type { MatchResult } from "../data/serviceAreas";
import AlternativeSuggestions from "./AlternativeSuggestions";

interface ResultCardProps {
  result: MatchResult;
  onSelectArea: (areaName: string) => void;
}

interface CtaConfig {
  text: string;
  variant: "emerald-filled" | "amber-outlined" | "emerald-outlined";
  icon: "calendar" | "clock" | "bell";
}

function getCTA(result: MatchResult): CtaConfig | null {
  switch (result.status) {
    case "covered":
      return { text: "Book Your Free Consultation", variant: "emerald-filled", icon: "calendar" };
    case "partial":
      return { text: "Check Availability", variant: "amber-outlined", icon: "clock" };
    case "not-covered":
      return { text: "Join Our Waitlist", variant: "emerald-outlined", icon: "bell" };
    default:
      return null;
  }
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3c-3.7 0-6.8 2.9-6.8 6.7 0 4.6 6.8 10.3 6.8 10.3S18.8 14.3 18.8 9.7C18.8 5.9 15.7 3 12 3Zm0 9.2a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path className="v14-stroke-draw" d="m5 12.5 4 4 10-10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path className="v14-stroke-draw" d="M12 11v5M12 8.2h.01" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path className="v14-stroke-draw" d="M9 9 15 15M15 9 9 15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CtaIcon({ icon }: { icon: CtaConfig["icon"] }) {
  if (icon === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="6" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v5M16 3v5M4 10h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7.4V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20c3.7 0 6.8-2.7 6.8-6.3 0-3.5-3-6.3-6.8-6.3S5.2 10.2 5.2 13.7V16l-2 2h8.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ResultCard({ result, onSelectArea }: ResultCardProps) {
  const [email, setEmail] = useState("");
  const cta = useMemo(() => getCTA(result), [result]);
  const stateKey = result.status === "not-covered" ? `${result.status}-${result.query}` : result.status;

  return (
    <section className="v14-result-wrap" aria-live="polite" aria-atomic="true">
      <article key={stateKey} className="v14-result-card v14-result-transition">
        {result.status === "empty" ? (
          <div className="v14-result-state">
            <div className="v14-result-icon is-muted">
              <PinIcon />
            </div>
            <h2>Enter your location to check coverage</h2>
          </div>
        ) : null}

        {result.status === "covered" ? (
          <div className="v14-result-state">
            <div className="v14-result-icon is-covered">
              <CheckIcon />
            </div>
            <h2>Great News! We Serve {result.area.name}</h2>
            <p>Your area is fully covered with our premium service.</p>
            <div className="v14-meta-row">
              <span className="v14-pill">{result.area.region}</span>
              <span className="v14-pill">{result.matchType} match</span>
              <span className="v14-pill is-covered">Full Service</span>
            </div>
            <hr className="v14-divider" />
            {cta ? (
              <button type="button" className={`v14-cta v14-cta-${cta.variant}`}>
                <CtaIcon icon={cta.icon} />
                <span>{cta.text}</span>
              </button>
            ) : null}
            <p className="v14-subtle">Typical response within 24 hours</p>
          </div>
        ) : null}

        {result.status === "partial" ? (
          <div className="v14-result-state">
            <div className="v14-result-icon is-partial">
              <InfoIcon />
            </div>
            <h2>We Serve {result.area.name}, With Limits</h2>
            <p>{result.area.note ?? "Limited availability for this area."}</p>
            <div className="v14-meta-row">
              <span className="v14-pill">{result.area.region}</span>
              <span className="v14-pill is-partial">Partial Coverage</span>
            </div>
            <hr className="v14-divider" />
            {cta ? (
              <button type="button" className={`v14-cta v14-cta-${cta.variant}`}>
                <CtaIcon icon={cta.icon} />
                <span>{cta.text}</span>
              </button>
            ) : null}
            <p className="v14-subtle">Contact us to confirm your project timeline</p>
          </div>
        ) : null}

        {result.status === "not-covered" ? (
          <div className="v14-result-state">
            <div className="v14-result-icon is-not-covered">
              <CrossIcon />
            </div>
            <h2>We Don&apos;t Serve {result.query} Yet</h2>
            <p>But we&apos;re expanding! Your area is on our roadmap.</p>
            <hr className="v14-divider" />

            <AlternativeSuggestions areas={result.nearest} onSelect={onSelectArea} />

            <hr className="v14-divider" />
            {cta ? (
              <button type="button" className={`v14-cta v14-cta-${cta.variant}`}>
                <CtaIcon icon={cta.icon} />
                <span>{cta.text}</span>
              </button>
            ) : null}
            <p className="v14-subtle">Get notified when we expand to your area</p>

            <form
              className="v14-email-form"
              onSubmit={(event) => {
                event.preventDefault();
                setEmail("");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                aria-label="Email for waitlist updates"
              />
              <button type="submit">Notify Me</button>
            </form>
          </div>
        ) : null}
      </article>
    </section>
  );
}
