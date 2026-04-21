import type { Location } from "../data/locations";

interface LocationMapProps {
  location: Location;
  allLocations: Location[];
}

const VIEWBOX_WIDTH = 640;
const VIEWBOX_HEIGHT = 360;

interface MappedPoint {
  id: string;
  city: string;
  x: number;
  y: number;
}

function mapToPoint(lat: number, lng: number, latMin: number, latMax: number, lngMin: number, lngMax: number) {
  const xPadding = 90;
  const yPadding = 70;
  const usableWidth = VIEWBOX_WIDTH - xPadding * 2;
  const usableHeight = VIEWBOX_HEIGHT - yPadding * 2;

  const xRatio = (lng - lngMin) / (lngMax - lngMin || 1);
  const yRatio = (lat - latMin) / (latMax - latMin || 1);

  const x = xPadding + usableWidth * xRatio;
  const y = VIEWBOX_HEIGHT - yPadding - usableHeight * yRatio;

  return { x, y };
}

function mapsHref(location: Location) {
  return `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`;
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 12h17M12 3.5c2.2 2.1 3.5 5.2 3.5 8.5S14.2 18.4 12 20.5M12 3.5C9.8 5.6 8.5 8.7 8.5 12s1.3 6.4 3.5 8.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export default function LocationMap({ location, allLocations }: LocationMapProps) {
  if (location.id === "remote") {
    return (
      <section className="v20-map-panel">
        <h2 className="v20-section-label">LOCATION MAP</h2>
        <div className="v20-remote-map">
          <span className="v20-remote-icon" aria-hidden="true">
            <GlobeIcon />
          </span>
          <p>Distributed across Europe</p>
          <p className="v20-remote-subline">Async collaboration with CET overlap hours</p>
          <a
            href="https://www.google.com/maps/search/Europe"
            target="_blank"
            rel="noreferrer"
            className="v20-inline-link"
          >
            VIEW ON GOOGLE MAPS
          </a>
        </div>
      </section>
    );
  }

  const fixedLocations = allLocations.filter((item) => item.id !== "remote");
  const lats = fixedLocations.map((item) => item.coordinates.lat);
  const lngs = fixedLocations.map((item) => item.coordinates.lng);
  const latMin = Math.min(...lats);
  const latMax = Math.max(...lats);
  const lngMin = Math.min(...lngs);
  const lngMax = Math.max(...lngs);
  const points: MappedPoint[] = fixedLocations.map((item) => {
    const mapped = mapToPoint(item.coordinates.lat, item.coordinates.lng, latMin, latMax, lngMin, lngMax);
    return {
      id: item.id,
      city: item.city,
      x: mapped.x,
      y: mapped.y,
    };
  });

  return (
    <section className="v20-map-panel">
      <h2 className="v20-section-label">LOCATION MAP</h2>
      <div className="v20-map-shell" role="img" aria-label={`Map showing ${location.city}`}>
        <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} className="v20-map-svg">
          <path
            className="v20-map-outline"
            d="M86 265 148 206 199 180 278 151 344 132 435 136 513 170 551 220 526 258 470 274 401 269 333 283 251 283 176 302 120 291Z"
          />

          {points.map((point) => {
            const isSelected = point.id === location.id;
            return (
              <g key={point.id} transform={`translate(${point.x} ${point.y})`}>
                {isSelected ? <circle className="v20-map-pulse-ring" r="14" /> : null}
                {isSelected ? (
                  <>
                    <path className="v20-map-pin" d="M0 -14c4.2 0 7.6 3.4 7.6 7.6 0 5.8-7.6 13.8-7.6 13.8S-7.6-.6-7.6-6.4c0-4.2 3.4-7.6 7.6-7.6Z" />
                    <circle className="v20-map-pin-center" r="2.7" />
                  </>
                ) : (
                  <circle className="v20-map-dot" r="4.2" />
                )}
                <text className="v20-map-label" x="10" y="-8">
                  {point.city}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <a href={mapsHref(location)} target="_blank" rel="noreferrer" className="v20-inline-link">
        VIEW ON GOOGLE MAPS
      </a>
    </section>
  );
}
