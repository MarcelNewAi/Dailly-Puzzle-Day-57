"use client";

import { useEffect, useRef, useState } from "react";
import type { ChecklistCategory } from "../data/checklist";
import ChecklistItem from "./ChecklistItem";

interface ChecklistGroupProps {
  category: ChecklistCategory;
  completed: Record<string, boolean>;
  startIndex: number;
  onToggle: (id: string) => void;
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 7.5a2 2 0 0 1 2-2h4.1l1.8 1.9H19a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3.5v4M16 3.5v4M4 9.5h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CategoryIcon({ icon }: { icon: string }) {
  if (icon === "folder") {
    return <FolderIcon />;
  }
  if (icon === "calendar") {
    return <CalendarIcon />;
  }
  return <TargetIcon />;
}

export default function ChecklistGroup({ category, completed, startIndex, onToggle }: ChecklistGroupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const groupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = groupRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.16 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const completedInCategory = category.items.filter((item) => completed[item.id]).length;

  return (
    <section ref={groupRef} className={`v19-group ${isVisible ? "is-visible" : ""}`}>
      <header className="v19-group-head">
        <div className="v19-group-title-wrap">
          <span className="v19-group-icon" aria-hidden="true">
            <CategoryIcon icon={category.icon} />
          </span>
          <div>
            <h3>{category.title}</h3>
            <p>{category.subtitle}</p>
          </div>
        </div>

        <p className="v19-group-progress">
          {completedInCategory}/{category.items.length}
        </p>
      </header>

      <hr className="v19-group-divider" />

      <div className="v19-group-list">
        {category.items.map((item, index) => (
          <ChecklistItem
            key={item.id}
            item={item}
            checked={Boolean(completed[item.id])}
            onToggle={onToggle}
            animationDelayMs={(startIndex + index) * 50}
          />
        ))}
      </div>
    </section>
  );
}
