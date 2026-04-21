import type { TrustSignal } from "../../data";

interface TrustSignalsBlockProps {
  trustSignals: TrustSignal[];
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m5.6 12.5 4 4.1 8.8-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TrustSignalsBlock({ trustSignals }: TrustSignalsBlockProps) {
  return (
    <section className="v22-block">
      <p className="v22-block-label">Why trust us</p>
      <h2 className="v22-block-title">Proof points that reduce risk</h2>

      <div className="v22-trust-row">
        {trustSignals.map((signal) => (
          <article key={signal.label} className="v22-trust-card">
            <span className="v22-trust-icon">
              <CheckIcon />
            </span>
            <p className="v22-trust-label">{signal.label}</p>
            <p className="v22-trust-detail">{signal.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
