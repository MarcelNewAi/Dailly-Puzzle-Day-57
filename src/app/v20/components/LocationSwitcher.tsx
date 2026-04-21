"use client";

import { useEffect, useRef, useState } from "react";
import type { Location } from "../data/locations";

interface LocationSwitcherProps {
  locations: Location[];
  selectedId: string;
  onSelect: (id: string) => void;
}

interface IndicatorState {
  left: number;
  width: number;
  ready: boolean;
}

function FlagIcon({ code }: { code: string }) {
  if (code === "SI") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="5" fill="#ffffff" />
        <rect x="2" y="9.33" width="20" height="5.33" fill="#1D4ED8" />
        <rect x="2" y="14.66" width="20" height="5.34" fill="#DC2626" />
        <circle cx="8" cy="9.33" r="2.1" fill="#2563EB" />
      </svg>
    );
  }

  if (code === "HR") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="5" fill="#DC2626" />
        <rect x="2" y="9.33" width="20" height="5.33" fill="#ffffff" />
        <rect x="2" y="14.66" width="20" height="5.34" fill="#1E3A8A" />
        <rect x="10.2" y="8.6" width="3.6" height="6.8" rx="0.8" fill="#ffffff" />
        <path d="M10.2 10.9h3.6M12 8.6v6.8" stroke="#DC2626" strokeWidth="0.85" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.4 12h17.2M12 3.4c2.3 2.1 3.6 5.2 3.6 8.6S14.3 18.5 12 20.6M12 3.4C9.7 5.5 8.4 8.6 8.4 12s1.3 6.5 3.6 8.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
    </svg>
  );
}

export default function LocationSwitcher({ locations, selectedId, onSelect }: LocationSwitcherProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<IndicatorState>({
    left: 0,
    width: 0,
    ready: false,
  });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const updateIndicator = () => {
      const active = tabRefs.current[selectedId];
      if (!active) {
        setIndicator((previous) => ({ ...previous, ready: false }));
        return;
      }
      setIndicator({
        left: active.offsetLeft,
        width: active.offsetWidth,
        ready: true,
      });
    };

    const frame = window.requestAnimationFrame(updateIndicator);
    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateIndicator);
      resizeObserver.observe(rail);
      for (const location of locations) {
        const tab = tabRefs.current[location.id];
        if (tab) {
          resizeObserver.observe(tab);
        }
      }
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, [locations, selectedId]);

  useEffect(() => {
    const active = tabRefs.current[selectedId];
    if (!active) {
      return;
    }
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    active.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [selectedId]);

  return (
    <section className="v20-switcher-shell" aria-label="Select business location">
      <div ref={railRef} className="v20-switcher-rail hide-native-scrollbar" role="tablist" aria-orientation="horizontal">
        {locations.map((location) => {
          const isActive = location.id === selectedId;
          return (
            <button
              key={location.id}
              ref={(element) => {
                tabRefs.current[location.id] = element;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`v20-switcher-tab ${isActive ? "is-active" : ""}`}
              onClick={() => onSelect(location.id)}
            >
              <span className="v20-switcher-flag" aria-hidden="true">
                <FlagIcon code={location.countryFlag} />
              </span>
              <span className="v20-switcher-city">{location.city}</span>
              <span className="v20-switcher-country">{location.country}</span>
              {location.badge ? <span className="v20-switcher-badge">{location.badge}</span> : null}
            </button>
          );
        })}

        <div
          className="v20-switcher-indicator"
          style={{
            width: `${indicator.width}px`,
            transform: `translateX(${indicator.left}px)`,
            opacity: indicator.ready ? 1 : 0,
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
