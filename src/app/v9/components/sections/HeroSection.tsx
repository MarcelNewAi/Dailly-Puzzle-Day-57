const heroLogos = ["Acme Corp", "TechFlow", "Vertex AI", "CloudBase", "Nimbus", "Quantum Labs"] as const;

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5a1 1 0 0 1 1.5-.9l9 5.5a1 1 0 0 1 0 1.8l-9 5.5A1 1 0 0 1 8 16.5v-11Z" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <div className="v9-shell v9-hero-shell">
      <div className="v9-hero-content">
        <p className="v9-trust-pill v9-reveal v9-delay-0">Rated #1 by TechReview 2025</p>
        <h1 className="v9-display-title v9-hero-title v9-reveal v9-delay-1">Build Better Products, Faster</h1>
        <p className="v9-hero-subtitle v9-reveal v9-delay-2">
          The all-in-one platform that helps teams ship high-quality software with confidence. From planning to
          deployment.
        </p>
        <div className="v9-hero-cta-row v9-reveal v9-delay-3">
          <a href="#pricing" className="v9-btn v9-btn-filled">
            Start Free Trial
          </a>
          <a href="#solution" className="v9-btn v9-btn-outlined">
            <span className="v9-btn-icon" aria-hidden="true">
              <PlayIcon />
            </span>
            Watch Demo
          </a>
        </div>
        <p className="v9-hero-meta v9-reveal v9-delay-4">No credit card required - Free for 14 days</p>
      </div>

      <div className="v9-logo-row v9-logo-row-hero v9-reveal v9-delay-5" aria-label="Trusted by leading companies">
        {heroLogos.map((logo) => (
          <span key={logo} className="v9-logo-chip">
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
