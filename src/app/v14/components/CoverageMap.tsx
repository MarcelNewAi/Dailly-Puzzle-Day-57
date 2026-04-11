import { useMemo } from "react";
import type { MatchResult } from "../data/serviceAreas";
import { serviceAreas } from "../data/serviceAreas";

interface CoverageMapProps {
  result: MatchResult;
}

interface MappedPoint {
  id: string;
  name: string;
  region: string;
  coverage: "full" | "partial";
  x: number;
  y: number;
}

const VIEWBOX_WIDTH = 640;
const VIEWBOX_HEIGHT = 460;

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

export default function CoverageMap({ result }: CoverageMapProps) {
  const activeAreaId = result.status === "covered" || result.status === "partial" ? result.area.id : null;

  const points = useMemo<MappedPoint[]>(() => {
    const lats = serviceAreas.map((area) => area.coordinates.lat);
    const lngs = serviceAreas.map((area) => area.coordinates.lng);

    const latMin = Math.min(...lats);
    const latMax = Math.max(...lats);
    const lngMin = Math.min(...lngs);
    const lngMax = Math.max(...lngs);

    return serviceAreas.map((area) => {
      const mapped = mapToPoint(area.coordinates.lat, area.coordinates.lng, latMin, latMax, lngMin, lngMax);
      return {
        id: area.id,
        name: area.name,
        region: area.region,
        coverage: area.coverage,
        x: mapped.x,
        y: mapped.y,
      };
    });
  }, []);

  return (
    <section className="v14-map-card" aria-label="Service coverage map">
      <div className="v14-map-head">
        <h2>Coverage Map</h2>
        <p>Overview of active service regions across Slovenia</p>
      </div>

      <div className="v14-map-shell" role="img" aria-label="Slovenia map with coverage dots">
        <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} className="v14-map-svg">
          <path
            className="v14-map-outline"
            d="M110 270 130 220 180 190 220 145 280 135 340 118 390 130 450 122 510 152 548 212 530 260 500 300 458 332 408 350 344 342 282 354 228 332 172 330 128 302Z"
          />

          {points.map((point) => {
            const isActive = activeAreaId === point.id;
            return (
              <g key={point.id} transform={`translate(${point.x} ${point.y})`}>
                {isActive ? <circle className="v14-map-active-ring" r="13" /> : null}
                <circle className={`v14-map-dot ${point.coverage === "full" ? "is-full" : "is-partial"}`} r="5.5" />
                <text className="v14-map-label" x="9" y="-7">
                  {point.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="v14-map-list" aria-hidden="true">
        {serviceAreas.map((area) => (
          <div key={area.id} className="v14-map-list-item">
            <span className={`v14-dot ${area.coverage === "full" ? "is-full" : "is-partial"}`} />
            <span>{area.name}</span>
            <span>{area.region}</span>
          </div>
        ))}
      </div>

      <div className="v14-map-legend">
        <span>
          <span className="v14-dot is-full" /> Full Coverage
        </span>
        <span>
          <span className="v14-dot is-partial" /> Partial Coverage
        </span>
      </div>
    </section>
  );
}
