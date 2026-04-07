function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9.2 16.3-4-4 1.4-1.4 2.6 2.6 8-8 1.4 1.4-9.4 9.4Z" />
    </svg>
  );
}

const bullets = [
  "Deploy in one click with automated CI/CD pipelines",
  "Real-time dashboards that show exactly what's happening",
  "All your tools integrated in a single workspace",
] as const;

export default function SolutionSection() {
  return (
    <div className="v9-shell">
      <header className="v9-section-header v9-reveal v9-delay-0">
        <h2 className="v9-display-title v9-section-title">There&apos;s a Better Way</h2>
        <p className="v9-section-subtitle">One platform that brings everything together.</p>
      </header>

      <div className="v9-solution-image v9-reveal v9-delay-1" role="img" aria-label="Product dashboard screenshot placeholder">
        <div className="v9-solution-dashboard">
          <span>Product Screenshot</span>
          <div className="v9-solution-dashboard-grid">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>

      <ul className="v9-solution-list v9-reveal v9-delay-2">
        {bullets.map((bullet) => (
          <li key={bullet}>
            <span className="v9-check-icon" aria-hidden="true">
              <CheckIcon />
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
