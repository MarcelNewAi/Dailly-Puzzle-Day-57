import type { ReactNode } from "react";

type TrustBadgeProps = {
  icon: ReactNode;
  label: string;
  detail?: string;
};

export default function TrustBadge({ icon, label, detail }: TrustBadgeProps) {
  return (
    <div className="v9-trust-badge">
      <span className="v9-trust-badge-icon" aria-hidden="true">
        {icon}
      </span>
      <div className="v9-trust-badge-copy">
        <span className="v9-trust-badge-label">{label}</span>
        {detail ? <span className="v9-trust-badge-detail">{detail}</span> : null}
      </div>
    </div>
  );
}

