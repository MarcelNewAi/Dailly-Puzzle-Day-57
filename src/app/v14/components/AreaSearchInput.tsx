import { useMemo, useRef } from "react";
import type { MatchResult, ServiceArea } from "../data/serviceAreas";

interface AreaSearchInputProps {
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
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16.2 16.2 4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m11 8-1.8 2.4h3.6Z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function AreaSearchInput({
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
}: AreaSearchInputProps) {
  const blurTimer = useRef<number | null>(null);

  const statusText = useMemo(() => {
    if (result.status === "covered" || result.status === "partial") {
      return `${result.area.name} matched`;
    }
    if (result.status === "not-covered") {
      return `No coverage for ${result.query}`;
    }
    return "";
  }, [result]);

  const openDropdown = isDropdownOpen && suggestions.length > 0;

  return (
    <div className="v14-input-wrap">
      <label htmlFor="v14-area-input" className="v14-sr-only">
        Enter a postcode, city, or area name
      </label>

      <div className="v14-input-shell">
        <span className="v14-input-icon" aria-hidden="true">
          <SearchIcon />
        </span>

        <input
          id="v14-area-input"
          className="v14-input"
          type="text"
          value={query}
          placeholder="e.g. 1000, Ljubljana, or Maribor"
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => onQueryChange(event.target.value)}
          onFocus={() => {
            if (blurTimer.current !== null) {
              window.clearTimeout(blurTimer.current);
              blurTimer.current = null;
            }
          }}
          onBlur={() => {
            blurTimer.current = window.setTimeout(() => {
              onDropdownClose();
            }, 120);
          }}
          onKeyDown={(event) => {
            if (!openDropdown) {
              if (event.key === "Escape") {
                onDropdownClose();
              }
              return;
            }

            if (event.key === "ArrowDown") {
              event.preventDefault();
              const nextIndex = activeSuggestionIndex + 1 >= suggestions.length ? 0 : activeSuggestionIndex + 1;
              onSuggestionHover(nextIndex);
              return;
            }

            if (event.key === "ArrowUp") {
              event.preventDefault();
              const nextIndex = activeSuggestionIndex <= 0 ? suggestions.length - 1 : activeSuggestionIndex - 1;
              onSuggestionHover(nextIndex);
              return;
            }

            if (event.key === "Enter" && activeSuggestionIndex >= 0) {
              event.preventDefault();
              onSuggestionSelect(suggestions[activeSuggestionIndex]);
              return;
            }

            if (event.key === "Escape") {
              event.preventDefault();
              onDropdownClose();
            }
          }}
          role="combobox"
          aria-expanded={openDropdown}
          aria-autocomplete="list"
          aria-controls={openDropdown ? "v14-suggestions" : undefined}
          aria-activedescendant={
            openDropdown && activeSuggestionIndex >= 0 ? `v14-suggestion-${suggestions[activeSuggestionIndex].id}` : undefined
          }
        />

        {query.trim().length > 0 ? (
          <button
            type="button"
            className="v14-clear-btn"
            onClick={onClear}
            aria-label="Clear location query"
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>

      <p className="v14-input-status" aria-live="polite">
        {statusText}
      </p>

      {openDropdown ? (
        <ul id="v14-suggestions" className="v14-suggestions" role="listbox" aria-label="Suggested areas">
          {suggestions.map((area, index) => {
            const isActive = activeSuggestionIndex === index;
            return (
              <li key={area.id}>
                <button
                  type="button"
                  id={`v14-suggestion-${area.id}`}
                  role="option"
                  aria-selected={isActive}
                  className={`v14-suggestion-item${isActive ? " is-active" : ""}`}
                  onMouseEnter={() => onSuggestionHover(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => onSuggestionSelect(area)}
                >
                  <span className="v14-suggestion-main">
                    <span>{area.name}</span>
                    <span className="v14-suggestion-region">{area.region}</span>
                  </span>
                  <span className="v14-suggestion-coverage">
                    <span className={`v14-dot ${area.coverage === "full" ? "is-full" : "is-partial"}`} />
                    {area.coverage === "full" ? "Full" : "Partial"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
