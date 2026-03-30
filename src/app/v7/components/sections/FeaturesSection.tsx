const featureCards = [
  {
    title: "Web Development",
    description: "Custom websites built with modern frameworks and best practices.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2 4 14h6l-1 8 11-14h-6l1-6h-2Z" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    description: "Intuitive interfaces designed for engagement and conversion.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a4 4 0 0 0-4 4v3h8V6a4 4 0 0 0-4-4Zm-9 11a7 7 0 0 1 14 0v2H3v-2Zm16.5 0h1.5a2 2 0 0 1 0 4h-3.2l1.7-4ZM6 19h12v3H6z" />
      </svg>
    ),
  },
  {
    title: "Performance",
    description: "Optimized for speed, SEO, and exceptional user experience.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4a9 9 0 0 0-9 9h2a7 7 0 1 1 7 7v2a9 9 0 0 0 0-18Zm1 9V8h-2v7h6v-2h-4Z" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="v7-site-section">
      <div className="v7-site-shell">
        <h2 className="v7-site-heading">What We Offer</h2>
        <div className="v7-feature-grid">
          {featureCards.map((feature) => (
            <article key={feature.title} className="v7-feature-card">
              <span className="v7-feature-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="v7-feature-title">{feature.title}</h3>
              <p className="v7-feature-description">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}