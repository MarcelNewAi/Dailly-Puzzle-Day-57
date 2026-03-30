import { systemStats } from "../../data";

function LightningIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 5 13h6l-1 9 9-13h-6z" />
    </svg>
  );
}

function ChipIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 1v4" />
      <path d="M15 1v4" />
      <path d="M9 19v4" />
      <path d="M15 19v4" />
      <path d="M1 9h4" />
      <path d="M1 15h4" />
      <path d="M19 9h4" />
      <path d="M19 15h4" />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 18a11 11 0 0 1 16 0" />
      <path d="M7 15a7 7 0 0 1 10 0" />
      <path d="M10 12a3 3 0 0 1 4 0" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const statusCards = [
  {
    icon: <LightningIcon />,
    value: `${systemStats.activeNodes}/${systemStats.totalNodes}`,
    label: "Active Nodes",
  },
  {
    icon: <ChipIcon />,
    value: `${systemStats.qCreditsPerHour}`,
    label: "Q-Credits/Hour",
  },
  {
    icon: <SignalIcon />,
    value: systemStats.avgLatency,
    label: "Avg Latency",
  },
];

export default function SystemStatus() {
  return (
    <section className="nq-status" aria-label="System status overview">
      <div className="nq-status-grid">
        {statusCards.map((card, index) => (
          <article key={card.label} className="nq-card nq-status-card nq-anim-status" style={{ animationDelay: `${600 + index * 100}ms` }}>
            <div className="nq-status-icon" aria-hidden="true">
              {card.icon}
            </div>
            <div className="nq-stat-value">{card.value}</div>
            <p className="nq-stat-label">{card.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
