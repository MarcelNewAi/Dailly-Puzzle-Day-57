"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    title: "Recover Lost Visitors",
    description: "Up to 53% of visitors leave without converting. Catch them at the right moment.",
    iconPath: "M12 2 3 7v6c0 5 3.8 9.8 9 11 5.2-1.2 9-6 9-11V7l-9-5Zm0 3.2 6 3.3V13c0 3.6-2.5 7-6 8-3.5-1-6-4.4-6-8V8.5l6-3.3Z",
  },
  {
    title: "Targeted Offers",
    description: "Show personalized incentives based on user behavior and time on site.",
    iconPath: "M4 5h16v4H4V5Zm0 6h10v8H4v-8Zm12 0h4v8h-4v-8Z",
  },
  {
    title: "Increase Conversions",
    description: "Average lift of 10-15% in email signups and lead capture rates.",
    iconPath: "M4 20h16v-2H4v2Zm2-4h3v-7H6v7Zm5 0h3V6h-3v10Zm5 0h3v-4h-3v4Z",
  },
];

const steps = [
  { title: "User Browses", copy: "Visitor explores your site normally" },
  { title: "Behavior Detected", copy: "We track mouse position and inactivity" },
  { title: "Modal Triggers", copy: "When exit intent is detected, show targeted offer" },
  { title: "Lead Captured", copy: "Convert leaving visitors into subscribers" },
];

const bestPractices = [
  "Effective lead capture starts with timing. Exit-intent and inactivity triggers work best when users have already consumed meaningful content and are close to dropping off.",
  "Keep offers specific and outcome-driven. Instead of generic newsletters, promise immediate value like playbooks, templates, or discounts aligned with what the visitor just viewed.",
  "Use one clear field, one primary CTA, and one supporting proof row. Simplicity removes friction and increases completion rates, especially on mobile screens.",
  "Measure dismissal reasons, trigger source, and post-capture conversion quality. The highest-volume modal is not always the best modal if lead quality drops.",
];

export default function ContentSections() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const targets = Array.from(root.querySelectorAll<HTMLElement>(".v11-reveal-on-scroll"));
    if (!targets.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="v11-content-shell">
      <section className="v11-section v11-reveal-on-scroll">
        <header className="v11-section-header">
          <h2>Why Exit-Intent Works</h2>
        </header>
        <div className="v11-features-grid">
          {features.map((feature) => (
            <article className="v11-card v11-feature-card" key={feature.title}>
              <span className="v11-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d={feature.iconPath} />
                </svg>
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="v11-section v11-reveal-on-scroll">
        <header className="v11-section-header">
          <h2>How It Works</h2>
        </header>
        <div className="v11-steps-flow" aria-label="Exit intent process">
          {steps.map((step, index) => (
            <div className="v11-step-item" key={step.title}>
              <span className="v11-step-index">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
              {index < steps.length - 1 ? (
                <span className="v11-step-connector" aria-hidden="true">
                  <svg viewBox="0 0 80 16">
                    <circle cx="6" cy="8" r="3" />
                    <path d="M14 8h56" />
                    <path d="m64 3 10 5-10 5" />
                  </svg>
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="v11-section v11-reveal-on-scroll">
        <div className="v11-stats-row">
          <article className="v11-stat-card">
            <h3>53%</h3>
            <p>Visitors leave without converting</p>
          </article>
          <article className="v11-stat-card">
            <h3>+15%</h3>
            <p>Average conversion lift</p>
          </article>
          <article className="v11-stat-card">
            <h3>2.3x</h3>
            <p>More email captures</p>
          </article>
        </div>
      </section>

      <section className="v11-section v11-reveal-on-scroll">
        <header className="v11-section-header">
          <h2>Lead Capture Best Practices</h2>
        </header>
        <div className="v11-long-form">
          {bestPractices.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
