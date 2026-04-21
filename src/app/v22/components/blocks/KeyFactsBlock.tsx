import type { KeyFact } from "../../data";

interface KeyFactsBlockProps {
  keyFacts: KeyFact[];
}

function FactIcon({ icon }: { icon: string }) {
  const normalized = icon.toLowerCase();

  if (normalized.includes("clock")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7.8v4.5l3 1.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes("calendar")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5.5" width="16" height="14" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7.5 3.8v3.2M16.5 3.8v3.2M4 9.5h16" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (normalized.includes("shield")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3.5 19 6v5.6c0 4-2.6 7.2-7 8.9-4.4-1.7-7-4.9-7-8.9V6z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (normalized.includes("check") || normalized.includes("checklist")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.5 7.5h13M5.5 12h13M5.5 16.5h13" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="m8 12 2 2.2 4-4.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes("filter")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 5.5h16l-6.8 7v5l-2.4 1.6v-6.6z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (normalized.includes("team")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="9" r="2.7" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 18a4.6 4.6 0 0 1 9.2 0" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 18a3.5 3.5 0 0 1 5 0" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (normalized.includes("leaf")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M19.5 4.5c-8.2.3-12.6 4.7-13 13 5.1-.3 8-2.2 9.5-5.3-1.8 1-3.9 1.6-6.4 1.6 1-4.5 4.1-7.5 9.9-9.3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (normalized.includes("spark")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 3.8 1.8 5 5 1.8-5 1.8-1.8 5-1.8-5-5-1.8 5-1.8z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12h8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function KeyFactsBlock({ keyFacts }: KeyFactsBlockProps) {
  return (
    <section className="v22-block">
      <p className="v22-block-label">Key facts</p>
      <h2 className="v22-block-title">Quick reference</h2>

      <div className="v22-fact-grid">
        {keyFacts.map((fact) => (
          <article key={fact.label} className="v22-fact-card">
            <span className="v22-fact-icon">
              <FactIcon icon={fact.icon} />
            </span>
            <p className="v22-fact-label">{fact.label}</p>
            <p className="v22-fact-value">{fact.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
