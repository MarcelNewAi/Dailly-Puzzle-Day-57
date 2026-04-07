type FeatureIconName = "rocket" | "chart" | "users" | "shield";

type Feature = {
  title: string;
  description: string;
  icon: FeatureIconName;
};

const features: Feature[] = [
  {
    title: "Automated Deployments",
    icon: "rocket",
    description: "Push to deploy with zero-downtime releases and automatic rollbacks.",
  },
  {
    title: "Real-time Analytics",
    icon: "chart",
    description: "Live metrics, error tracking, and performance monitoring in one dashboard.",
  },
  {
    title: "Team Collaboration",
    icon: "users",
    description: "Shared workspaces, code reviews, and async communication built in.",
  },
  {
    title: "Enterprise Security",
    icon: "shield",
    description: "SOC2 compliant, SSO, role-based access, and audit logs.",
  },
];

function FeatureIcon({ icon }: { icon: FeatureIconName }) {
  if (icon === "rocket") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.9 3.1c2.8-.9 5.5 1.8 4.6 4.6-.7 2.2-2.2 4.1-4 5.5l-1.1.9-3.2-3.2.9-1.1c1.4-1.8 3.3-3.3 5.5-4ZM10.8 12.5l2.7 2.7-1.8 3.8a1 1 0 0 1-1.7.2l-3-3a1 1 0 0 1 .2-1.7l3.6-2Zm-4.6 5 2.8 2.8-2.8.9a1.9 1.9 0 0 1-2.4-2.4l.9-2.8Z" />
      </svg>
    );
  }

  if (icon === "chart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20V9h3v11H4Zm6 0V4h3v16h-3Zm6 0v-7h3v7h-3Z" />
      </svg>
    );
  }

  if (icon === "users") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0 2c3 0 5.8 1.6 7.2 4.1.4.7-.1 1.9-1.1 1.9H2.9c-1 0-1.5-1.2-1.1-1.9A8.2 8.2 0 0 1 9 14Zm10-3a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 4 5.5v5.9c0 5 3.4 9.7 8 10.7 4.6-1 8-5.7 8-10.7V5.5L12 2Zm-1.2 13.9-3.2-3.2 1.4-1.4 1.8 1.8 4.2-4.2 1.4 1.4-5.6 5.6Z" />
    </svg>
  );
}

export default function FeaturesSection() {
  return (
    <div className="v9-shell">
      <header className="v9-section-header v9-reveal v9-delay-0">
        <h2 className="v9-display-title v9-section-title">Everything You Need</h2>
        <p className="v9-section-subtitle">Powerful features designed for modern development teams.</p>
      </header>

      <div className="v9-features-grid v9-reveal v9-delay-1">
        {features.map((feature) => (
          <article key={feature.title} className="v9-card v9-feature-card">
            <span className="v9-feature-icon" aria-hidden="true">
              <FeatureIcon icon={feature.icon} />
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

