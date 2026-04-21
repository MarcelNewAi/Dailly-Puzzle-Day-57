import { useEffect, useState } from "react";

interface EmergencyBannerProps {
  show: boolean;
  emergencyPhone: string;
}

const DISMISS_KEY = "v18_emergency_banner_dismissed";

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3 2 21h20L12 3Zm0 6v5m0 3h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EmergencyBanner({ show, emergencyPhone }: EmergencyBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "true");
    } catch {
      setDismissed(false);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  if (!isHydrated || !show || dismissed) {
    return null;
  }

  return (
    <aside className="v18-emergency-banner" role="status">
      <p>
        <span className="v18-emergency-banner-icon">
          <AlertIcon />
        </span>
        For emergencies, call <a href={`tel:${emergencyPhone}`}>{emergencyPhone}</a> - available outside regular hours
      </p>
      <button
        type="button"
        aria-label="Dismiss emergency banner"
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem(DISMISS_KEY, "true");
          } catch {
            // no-op
          }
        }}
      >
        x
      </button>
    </aside>
  );
}
