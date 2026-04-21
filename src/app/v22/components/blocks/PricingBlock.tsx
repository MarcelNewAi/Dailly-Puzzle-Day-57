import type { PricingTier } from "../../data";

interface PricingBlockProps {
  pricing: PricingTier[];
  heading: string;
}

export default function PricingBlock({ pricing, heading }: PricingBlockProps) {
  return (
    <section className="v22-block">
      <p className="v22-block-label">Pricing</p>
      <h2 className="v22-block-title">{heading}</h2>

      <div className="v22-pricing-table" role="table" aria-label={heading}>
        <div className="v22-pricing-head" role="row">
          <p role="columnheader">Service</p>
          <p role="columnheader">Typical range</p>
          <p role="columnheader">Notes</p>
        </div>

        {pricing.map((tier) => (
          <div key={tier.name} className="v22-pricing-row" role="row">
            <div className="v22-pricing-service">
              <p className="v22-pricing-service-name">{tier.name}</p>
              <p className="v22-pricing-description">{tier.description}</p>
            </div>
            <p className="v22-pricing-range">{tier.range}</p>
            <div className="v22-pricing-note-cell">
              {tier.note ? <span className="v22-note-badge">{tier.note}</span> : <span className="v22-pricing-note-placeholder">-</span>}
            </div>
          </div>
        ))}
      </div>

      <p className="v22-pricing-disclaimer">
        All prices are estimates. You receive a fixed quote before work begins.
      </p>
    </section>
  );
}
