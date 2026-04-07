function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 2 20h20L12 2Zm-1 7h2v6h-2V9Zm0 8h2v2h-2v-2Z" />
    </svg>
  );
}

const painPoints = [
  {
    title: "Slow Deployment",
    description: "Your team wastes hours on manual deployment processes that should take minutes.",
  },
  {
    title: "Poor Visibility",
    description: "You never know the real status of your projects until something breaks.",
  },
  {
    title: "Scattered Tools",
    description: "Switching between 10 different tools kills your team's productivity.",
  },
] as const;

export default function ProblemSection() {
  return (
    <div className="v9-shell">
      <h2 className="v9-display-title v9-section-title v9-reveal v9-delay-0">Sound Familiar?</h2>
      <div className="v9-problem-grid v9-reveal v9-delay-1">
        {painPoints.map((point) => (
          <article key={point.title} className="v9-card v9-problem-card">
            <span className="v9-problem-icon" aria-hidden="true">
              <WarningIcon />
            </span>
            <h3>{point.title}</h3>
            <p>{point.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

