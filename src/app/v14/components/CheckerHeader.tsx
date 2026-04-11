import type { MatchResult, ServiceArea } from "../data/serviceAreas";
import AreaSearchInput from "./AreaSearchInput";
import PopularAreasChips from "./PopularAreasChips";

interface CheckerHeaderProps {
  query: string;
  result: MatchResult;
  suggestions: ServiceArea[];
  isDropdownOpen: boolean;
  activeSuggestionIndex: number;
  onQueryChange: (value: string) => void;
  onSuggestionSelect: (area: ServiceArea) => void;
  onSuggestionHover: (index: number) => void;
  onDropdownClose: () => void;
  onClear: () => void;
  onChipSelect: (city: string) => void;
  popularAreas: string[];
}

export default function CheckerHeader({
  query,
  result,
  suggestions,
  isDropdownOpen,
  activeSuggestionIndex,
  onQueryChange,
  onSuggestionSelect,
  onSuggestionHover,
  onDropdownClose,
  onClear,
  onChipSelect,
  popularAreas,
}: CheckerHeaderProps) {
  return (
    <header className="v14-header">
      <div className="v14-hero-shell">
        <p className="v14-header-badge">V14 - SERVICE AREA CHECKER</p>
        <h1 className="v14-hero-title">Do We Serve Your Area?</h1>
        <p className="v14-hero-subtitle">
          Enter your postcode, city, or area name below. We&apos;ll tell you instantly if we cover your location.
        </p>

        <AreaSearchInput
          query={query}
          result={result}
          suggestions={suggestions}
          isDropdownOpen={isDropdownOpen}
          activeSuggestionIndex={activeSuggestionIndex}
          onQueryChange={onQueryChange}
          onSuggestionSelect={onSuggestionSelect}
          onSuggestionHover={onSuggestionHover}
          onDropdownClose={onDropdownClose}
          onClear={onClear}
        />

        <PopularAreasChips areas={popularAreas} onSelect={onChipSelect} />
      </div>
    </header>
  );
}
