"use client";

import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import LocationCTA from "./components/LocationCTA";
import LocationDetails from "./components/LocationDetails";
import LocationHeader from "./components/LocationHeader";
import LocationMap from "./components/LocationMap";
import LocationSwitcher from "./components/LocationSwitcher";
import TeamCard from "./components/TeamCard";
import { DEFAULT_LOCATION_ID, locations } from "./data/locations";

const headingFont = Outfit({
  subsets: ["latin"],
  variable: "--font-v20-heading",
  weight: ["500", "600", "700", "800"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-v20-body",
  weight: ["400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-v20-mono",
  weight: ["500", "600"],
});

const STORAGE_KEY = "v20_selected_location";

export default function V20Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_LOCATION_ID);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved || !locations.find((location) => location.id === saved)) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      setSelectedId(saved);
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedId);
  }, [selectedId]);

  const selected = locations.find((location) => location.id === selectedId) ?? locations[0];

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} v20-page`}>
          <LocationHeader location={selected} />

          <LocationSwitcher locations={locations} selectedId={selected.id} onSelect={setSelectedId} />

          <section className="v20-main">
            <LocationDetails key={selected.id} location={selected} />

            <section className="v20-lower-grid">
              <LocationMap location={selected} allLocations={locations} />
              <TeamCard location={selected} />
            </section>

            <LocationCTA location={selected} />
          </section>

          <ExplanationTriggerButton versionId="v20" />
        </main>
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor="#FB7185"
        thumbHoverColor="#F43F5E"
      />
    </>
  );
}
