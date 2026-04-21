"use client";

import { DM_Sans, Lora } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import PagePreview from "./components/PagePreview";
import ServiceSelector from "./components/ServiceSelector";
import { buildPageData, locations, services } from "./data";

const headingFont = Lora({
  subsets: ["latin"],
  variable: "--v22-font-heading",
  weight: ["600", "700"],
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--v22-font-body",
  weight: ["400", "500"],
});

const PREVIEW_FADE_MS = 200;

export default function V22Page() {
  const previewRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const [selectedServiceId, setSelectedServiceId] = useState("emergency-plumbing");
  const [selectedLocationId, setSelectedLocationId] = useState("austin-tx");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const selectedService = useMemo(
    () => services.find((service) => service.id === selectedServiceId) ?? services[0],
    [selectedServiceId],
  );
  const selectedLocation = useMemo(
    () => locations.find((location) => location.id === selectedLocationId) ?? locations[0],
    [selectedLocationId],
  );

  const pageData = useMemo(
    () => buildPageData(selectedService, selectedLocation),
    [selectedService, selectedLocation],
  );

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    setIsTransitioning(true);
    const timer = window.setTimeout(() => {
      setIsTransitioning(false);
    }, PREVIEW_FADE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [selectedServiceId, selectedLocationId]);

  return (
    <div className={`${headingFont.variable} ${bodyFont.variable} v22-root`}>
      <main className="v22-layout">
        <aside className="v22-selector-panel">
          <ServiceSelector
            services={services}
            locations={locations}
            selectedServiceId={selectedServiceId}
            selectedLocationId={selectedLocationId}
            onServiceChange={setSelectedServiceId}
            onLocationChange={setSelectedLocationId}
          />
        </aside>

        <section
          ref={previewRef}
          className={`v22-preview-panel ${isTransitioning ? "v22-preview-fade" : ""}`}
        >
          <PagePreview pageData={pageData} />
          <CustomScrollbar
            scrollContainerRef={previewRef}
            variant="card"
            thumbColor="#3a6fdb"
            thumbHoverColor="#2c4a87"
          />
        </section>
      </main>

      <ExplanationTriggerButton versionId="v22" />
    </div>
  );
}
