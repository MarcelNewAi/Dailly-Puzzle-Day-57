import type { CSSProperties } from "react";
import type { Location } from "../data/locations";

interface LocationDetailsProps {
  location: Location;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

function getDirectionsUrl(location: Location): string {
  return `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`;
}

function toTelHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export default function LocationDetails({ location }: LocationDetailsProps) {
  const todayName = DAY_NAMES[new Date().getDay()];
  const coordinatesLabel = `${location.coordinates.lat.toFixed(4)}, ${location.coordinates.lng.toFixed(4)}`;

  return (
    <section className="v20-details v20-anim-enter" aria-live="polite">
      <p className="v20-currently-viewing v20-stagger" style={{ "--v20-delay": "0ms" } as CSSProperties}>
        <span className="v20-current-dot" aria-hidden="true" />
        Currently viewing: <strong>{location.city}, {location.country}</strong>
      </p>

      <div className="v20-details-grid">
        <section className="v20-details-column v20-stagger" style={{ "--v20-delay": "50ms" } as CSSProperties}>
          <h2 className="v20-section-label">ADDRESS</h2>
          <address className="v20-address">
            <span>{location.address.street}</span>
            <span>{location.address.postal}</span>
            <span>{location.address.region}</span>
            <span className="v20-address-coords">[{coordinatesLabel}]</span>
          </address>
          <a href={getDirectionsUrl(location)} target="_blank" rel="noreferrer" className="v20-inline-link">
            Get Directions →
          </a>

          <hr className="v20-divider" />

          <h2 className="v20-section-label">PHONE</h2>
          <a href={toTelHref(location.phone)} className="v20-phone-link">
            {location.phone}
          </a>

          <hr className="v20-divider" />

          <h2 className="v20-section-label">EMAIL</h2>
          <a href={`mailto:${location.email}`} className="v20-email-link">
            {location.email}
          </a>
        </section>

        <section className="v20-details-column v20-stagger" style={{ "--v20-delay": "100ms" } as CSSProperties}>
          <h2 className="v20-section-label">HOURS</h2>
          <ul className="v20-hours-list">
            {location.hours.map((entry) => {
              const isToday = entry.day === todayName;
              return (
                <li key={entry.day} className={`v20-hours-row ${isToday ? "is-today" : ""}`}>
                  <span>{entry.day}</span>
                  <span>{entry.hours}</span>
                </li>
              );
            })}
          </ul>

          <hr className="v20-divider" />

          <h2 className="v20-section-label">SERVICES AT THIS LOCATION</h2>
          <div className="v20-services">
            {location.services.map((service) => (
              <span key={service} className="v20-service-pill">
                {service}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
