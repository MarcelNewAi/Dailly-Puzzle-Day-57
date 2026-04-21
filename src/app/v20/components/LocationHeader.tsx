import type { Location } from "../data/locations";

interface LocationHeaderProps {
  location: Location;
}

export default function LocationHeader({ location }: LocationHeaderProps) {
  return (
    <header className="v20-header">
      <div className="v20-header-inner">
        <p className="v20-header-badge">V20 • LOCATIONS</p>
        <h1>Find Your Local Team</h1>
        <p className="v20-header-subtitle">
          Switch between our offices to see local contact info, hours, and the right person to reach.
        </p>
        <p className="v20-header-current">
          Now focused on <strong>{location.city}</strong>, {location.country}
        </p>
      </div>
    </header>
  );
}
