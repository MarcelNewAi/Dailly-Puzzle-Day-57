"use client";

import { useMemo, useState } from "react";
import type { Category, OptionId, ValidationRule } from "../data";
import OptionCard from "./OptionCard";

interface CategoryPanelProps {
  category: Category;
  selectedIds: OptionId[];
  onToggle: (categoryId: string, optionId: OptionId) => void;
  violations: ValidationRule[];
  blockedOptionIds: Set<OptionId>;
  hintedOptionIds: Set<OptionId>;
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m6.8 9.6 5.2 5.2 5.2-5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CategoryPanel({
  category,
  selectedIds,
  onToggle,
  violations,
  blockedOptionIds,
  hintedOptionIds,
}: CategoryPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  const violationOptionIds = useMemo(() => {
    const ids = new Set<OptionId>();
    violations.forEach((violation) => {
      ids.add(violation.triggerOptionId);
      ids.add(violation.targetOptionId);
    });
    return ids;
  }, [violations]);

  return (
    <section className="v24-category-panel">
      <button
        type="button"
        className="v24-category-toggle"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
      >
        <div className="v24-category-header">
          <div className="v24-category-title-wrap">
            <h2 className="v24-category-title">{category.name}</h2>
            {category.required ? <span className="v24-required-badge">Required</span> : null}
          </div>
          <p className="v24-category-description">{category.description}</p>
          {category.maxSelections > 1 ? (
            <p className="v24-category-limit">Select up to {category.maxSelections}</p>
          ) : null}
        </div>

        <span className={`v24-category-chevron ${isOpen ? "is-open" : ""}`} aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>

      {isOpen ? (
        <div className="v24-options-grid">
          {category.options.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              isSelected={selectedIds.includes(option.id)}
              isBlocked={blockedOptionIds.has(option.id)}
              isRequired={category.required}
              isHinted={hintedOptionIds.has(option.id)}
              showViolationIcon={violationOptionIds.has(option.id)}
              onToggle={() => onToggle(category.id, option.id)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
