import type { Location } from "../data/locations";

interface TeamCardProps {
  location: Location;
}

export default function TeamCard({ location }: TeamCardProps) {
  const initial = location.team.name.charAt(0).toUpperCase();

  return (
    <section className="v20-team-card">
      <h2 className="v20-section-label">LOCAL TEAM CONTACT</h2>
      <div className="v20-team-row">
        <span className="v20-team-avatar" aria-hidden="true">
          {initial}
        </span>
        <div className="v20-team-copy">
          <h3>{location.team.name}</h3>
          <p>{location.team.role}</p>
          <a href={`mailto:${location.team.email}`} className="v20-email-link">
            {location.team.email}
          </a>
        </div>
      </div>
      <a href={`mailto:${location.team.email}?subject=Message%20for%20${encodeURIComponent(location.city)}%20team`} className="v20-team-send">
        Send Email →
      </a>
    </section>
  );
}
