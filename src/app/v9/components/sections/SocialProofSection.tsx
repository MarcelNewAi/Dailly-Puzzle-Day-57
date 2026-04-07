import TrustElements from "../TrustElements";

const logos = ["Acme Corp", "TechFlow", "Vertex AI", "CloudBase", "Nimbus", "Quantum Labs"] as const;

const testimonials = [
  {
    quote:
      "We cut our deployment time by 80%. This platform is a game-changer for our engineering team.",
    name: "Sarah Chen",
    role: "VP Engineering",
    company: "TechFlow",
  },
  {
    quote: "Finally, one tool that replaces our entire DevOps stack. The ROI was immediate.",
    name: "Marcus Rivera",
    role: "CTO",
    company: "Vertex AI",
  },
  {
    quote: "The best investment we've made this year. Our team productivity went through the roof.",
    name: "Emma Larsson",
    role: "Product Lead",
    company: "CloudBase",
  },
] as const;

const stats = [
  { value: "2,847+", label: "5-Star Reviews" },
  { value: "99.9%", label: "Uptime Guaranteed" },
  { value: "150+", label: "Enterprise Clients" },
] as const;

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2.4 2.9 6 6.6 1-4.8 4.6 1.2 6.6L12 17.2l-5.9 3.4 1.2-6.6-4.8-4.6 6.6-1 2.9-6Z" />
    </svg>
  );
}

function StarRating() {
  return (
    <span className="v9-testimonial-stars" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} />
      ))}
    </span>
  );
}

export default function SocialProofSection() {
  return (
    <div className="v9-shell">
      <header className="v9-section-header v9-reveal v9-delay-0">
        <h2 className="v9-display-title v9-section-title">Trusted by Teams That Ship Fast</h2>
        <p className="v9-section-subtitle">From startups to enterprise platforms, teams rely on LaunchFlow daily.</p>
      </header>

      <div className="v9-social-trust-inline v9-reveal v9-delay-1">
        <TrustElements variant="section" />
      </div>

      <div className="v9-logo-row v9-reveal v9-delay-2" aria-label="Client logos">
        {logos.map((logo) => (
          <span key={logo} className="v9-logo-chip">
            {logo}
          </span>
        ))}
      </div>

      <div className="v9-testimonial-grid v9-reveal v9-delay-3">
        {testimonials.map((item) => (
          <article key={item.name} className="v9-card v9-testimonial-card">
            <StarRating />
            <blockquote>{item.quote}</blockquote>
            <p className="v9-testimonial-author">{item.name}</p>
            <p className="v9-testimonial-role">
              {item.role} at {item.company}
            </p>
          </article>
        ))}
      </div>

      <div className="v9-stats-row v9-reveal v9-delay-4">
        {stats.map((stat) => (
          <article key={stat.label} className="v9-stat-card">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

