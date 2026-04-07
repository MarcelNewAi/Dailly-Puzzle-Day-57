type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$0/mo",
    description: "For individuals and small projects",
    features: ["3 projects", "1 team member", "Community support", "Basic analytics"],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "$49/mo",
    description: "For growing teams",
    features: ["Unlimited projects", "10 team members", "Priority support", "Advanced analytics", "Custom domains"],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$149/mo",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "24/7 dedicated support",
      "SSO & SAML",
      "SLA guarantee",
      "Custom integrations",
    ],
    cta: "Contact Sales",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9.2 16.3-4-4 1.4-1.4 2.6 2.6 8-8 1.4 1.4-9.4 9.4Z" />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <div className="v9-shell">
      <header className="v9-section-header v9-reveal v9-delay-0">
        <h2 className="v9-display-title v9-section-title">Simple, Transparent Pricing</h2>
        <p className="v9-section-subtitle">No hidden fees. Cancel anytime.</p>
      </header>

      <div className="v9-pricing-grid v9-reveal v9-delay-1">
        {tiers.map((tier) => (
          <article key={tier.name} className={`v9-card v9-pricing-card ${tier.featured ? "is-featured" : ""}`.trim()}>
            {tier.featured ? <span className="v9-popular-badge">Most Popular</span> : null}
            <h3>{tier.name}</h3>
            <p className="v9-pricing-price">{tier.price}</p>
            <p className="v9-pricing-description">{tier.description}</p>
            <ul>
              {tier.features.map((feature) => (
                <li key={feature}>
                  <span className="v9-pricing-check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a href="#final-cta" className={`v9-btn ${tier.featured ? "v9-btn-filled" : "v9-btn-outlined"}`.trim()}>
              {tier.cta}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

