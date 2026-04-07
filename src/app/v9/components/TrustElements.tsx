import TrustBadge from "./ui/TrustBadge";

type TrustElementsProps = {
  variant?: "bar" | "section";
};

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2.4 2.9 6 6.6 1-4.8 4.6 1.2 6.6L12 17.2l-5.9 3.4 1.2-6.6-4.8-4.6 6.6-1 2.9-6Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 4 5.5v5.9c0 5 3.4 9.7 8 10.7 4.6-1 8-5.7 8-10.7V5.5L12 2Zm-1.2 13.9-3.2-3.2 1.4-1.4 1.8 1.8 4.2-4.2 1.4 1.4-5.6 5.6Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 10h-1V7.8A4 4 0 0 0 12 4a4 4 0 0 0-4 3.8V10H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2Zm-7-2.2A2 2 0 0 1 12 6a2 2 0 0 1 2 1.8V10h-4V7.8Zm3.1 7.5V17h-2.2v-1.7a1.9 1.9 0 1 1 2.2 0Z" />
    </svg>
  );
}

function StarRow() {
  return (
    <span className="v9-star-row" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} />
      ))}
    </span>
  );
}

export default function TrustElements({ variant = "bar" }: TrustElementsProps) {
  return (
    <div
      className={`v9-trust-elements ${variant === "bar" ? "v9-trust-elements-bar" : "v9-trust-elements-section"}`}
      aria-label="Trust and security details"
    >
      <div className="v9-trust-badge v9-trust-rating">
        <StarRow />
        <div className="v9-trust-badge-copy">
          <span className="v9-trust-badge-label">4.9/5</span>
          <span className="v9-trust-badge-detail">(2,847 reviews)</span>
        </div>
      </div>

      <TrustBadge icon={<ShieldIcon />} label="30-Day Money-Back Guarantee" />
      <TrustBadge icon={<LockIcon />} label="256-bit SSL Secured" />
    </div>
  );
}

