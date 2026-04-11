"use client";

import { Inter, Space_Grotesk } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import CheckerHeader from "./components/CheckerHeader";
import CoverageMap from "./components/CoverageMap";
import ResultCard from "./components/ResultCard";
import {
  checkServiceArea,
  getAutocompleteSuggestions,
  popularAreas,
  type MatchResult,
  type ServiceArea,
} from "./data/serviceAreas";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-v14-heading",
  weight: ["500", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-v14-body",
  weight: ["400", "500", "600", "700"],
});

const SESSION_STORAGE_KEY = "v14_last_query";

export default function V14Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<MatchResult>({ status: "empty" });
  const [suggestions, setSuggestions] = useState<ServiceArea[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!saved) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setQuery(saved);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nextResult = checkServiceArea(query);
      const nextSuggestions = getAutocompleteSuggestions(query);

      setResult(nextResult);
      setSuggestions(nextSuggestions);

      if (!query.trim() || nextSuggestions.length === 0 || !isDropdownOpen) {
        setActiveSuggestionIndex(-1);
      } else if (activeSuggestionIndex >= nextSuggestions.length) {
        setActiveSuggestionIndex(nextSuggestions.length - 1);
      }

      if (typeof window !== "undefined") {
        if (query.trim()) {
          sessionStorage.setItem(SESSION_STORAGE_KEY, query);
        } else {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    }, 150);

    return () => window.clearTimeout(timer);
  }, [query, isDropdownOpen, activeSuggestionIndex]);

  const applyQuery = (value: string, closeDropdown = true) => {
    setQuery(value);
    setIsDropdownOpen(!closeDropdown);
    setActiveSuggestionIndex(-1);
  };

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className={`${headingFont.variable} ${bodyFont.variable} v14-page`}>
          <CheckerHeader
            query={query}
            result={result}
            suggestions={suggestions}
            isDropdownOpen={isDropdownOpen}
            activeSuggestionIndex={activeSuggestionIndex}
            onQueryChange={(value) => {
              setQuery(value);
              setIsDropdownOpen(Boolean(value.trim()));
            }}
            onSuggestionSelect={(area) => applyQuery(area.name, true)}
            onSuggestionHover={setActiveSuggestionIndex}
            onDropdownClose={() => {
              setIsDropdownOpen(false);
              setActiveSuggestionIndex(-1);
            }}
            onClear={() => {
              setQuery("");
              setIsDropdownOpen(false);
              setActiveSuggestionIndex(-1);
            }}
            onChipSelect={(city) => applyQuery(city, true)}
            popularAreas={popularAreas}
          />

          <section className="v14-main-shell">
            <ResultCard result={result} onSelectArea={(areaName) => applyQuery(areaName, true)} />
            <CoverageMap result={result} />
          </section>

          <ExplanationTriggerButton versionId="v14" />
        </main>
      </div>

      <CustomScrollbar scrollContainerRef={scrollRef} variant="page" thumbColor="#10B981" thumbHoverColor="#34D399" />
    </>
  );
}
