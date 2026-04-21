import type { Location } from "../data/locations";

interface CTAStyle {
  variant: "coral-filled" | "coral-outlined" | "mint-filled";
  icon: "building" | "calendar" | "globe" | "handshake";
}

interface LocationCTAProps {
  location: Location;
}

function getCTAStyle(type: string): CTAStyle {
  switch (type) {
    case "office-visit":
      return { variant: "coral-filled", icon: "building" };
    case "consultation":
      return { variant: "coral-outlined", icon: "calendar" };
    case "remote":
      return { variant: "mint-filled", icon: "globe" };
    case "partner":
      return { variant: "coral-outlined", icon: "handshake" };
    default:
      return { variant: "coral-filled", icon: "building" };
  }
}

function getCTAHref(location: Location): string {
  if (location.cta.type === "office-visit") {
    return `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`;
  }

  if (location.cta.type === "consultation") {
    return `mailto:${location.email}?subject=Consultation%20request%20-%20${encodeURIComponent(location.city)}`;
  }

  if (location.cta.type === "partner") {
    return `mailto:${location.email}?subject=Partnership%20request%20-%20${encodeURIComponent(location.city)}`;
  }

  return `mailto:${location.email}?subject=Remote%20project%20inquiry`;
}

function CTAIcon({ icon }: { icon: CTAStyle["icon"] }) {
  if (icon === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="5.5" width="17" height="15" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7.5 3.5v4M16.5 3.5v4M3.5 10.5h17" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (icon === "globe") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.5 12h17M12 3.5c2 2 3.2 5 3.2 8.5S14 18.4 12 20.5M12 3.5C10 5.6 8.8 8.6 8.8 12s1.2 6.4 3.2 8.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }

  if (icon === "handshake") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.5 12.5 7.8 8.2a2.2 2.2 0 0 1 3.1 0l.8.8M20.5 11.5l-4.3-4.3a2.2 2.2 0 0 0-3.1 0l-4.4 4.4a1.9 1.9 0 0 0 0 2.7 1.9 1.9 0 0 0 2.7 0l2-2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m12.7 12.3 1.4 1.4a1.8 1.8 0 0 0 2.6 0l3.8-3.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 20.5h14M7 20.5V8.2l5-3.4 5 3.4v12.3M10 12h4M10 15.2h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LocationCTA({ location }: LocationCTAProps) {
  const ctaStyle = getCTAStyle(location.cta.type);
  const href = getCTAHref(location);
  const external = href.startsWith("https://");

  return (
    <section className="v20-cta-shell" aria-live="polite">
      <div key={location.id} className="v20-cta-card v20-cta-swap">
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className={`v20-cta-button is-${ctaStyle.variant}`}
        >
          <span className="v20-cta-icon" aria-hidden="true">
            <CTAIcon icon={ctaStyle.icon} />
          </span>
          <span>{location.cta.text}</span>
        </a>
        <p className="v20-cta-subtitle">{location.cta.subtext}</p>
      </div>
    </section>
  );
}
