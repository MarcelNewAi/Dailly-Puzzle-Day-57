const pricingPlans = [
  {
    tier: "Basic",
    price: "$29/mo",
    subtitle: "For small projects",
    features: ["5 Pages", "Basic SEO", "Email Support", "1 Revision"],
    cta: "Get Started",
    featured: false,
  },
  {
    tier: "Pro",
    price: "$79/mo",
    subtitle: "For growing businesses",
    features: ["15 Pages", "Advanced SEO", "Priority Support", "5 Revisions", "Analytics"],
    cta: "Go Pro",
    featured: true,
  },
  {
    tier: "Enterprise",
    price: "$149/mo",
    subtitle: "For large organizations",
    features: ["Unlimited Pages", "Full SEO Suite", "24/7 Support", "Unlimited Revisions", "Custom Integrations"],
    cta: "Contact Us",
    featured: false,
  },
] as const;

export default function PricingSection() {
  return (
    <section className="v7-site-section">
      <div className="v7-site-shell">
        <h2 className="v7-site-heading">Choose Your Plan</h2>
        <div className="v7-pricing-grid">
          {pricingPlans.map((plan) => (
            <article key={plan.tier} className={`v7-pricing-card ${plan.featured ? "is-featured" : ""}`}>
              {plan.featured ? <span className="v7-popular-badge">Popular</span> : null}
              <h3 className="v7-pricing-tier">{plan.tier}</h3>
              <p className="v7-pricing-price">{plan.price}</p>
              <p className="v7-pricing-subtitle">{plan.subtitle}</p>
              <ul className="v7-pricing-list">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                type="button"
                className={`v7-site-btn ${plan.featured ? "v7-site-btn-filled" : "v7-site-btn-outline"}`}
              >
                {plan.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}