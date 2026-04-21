import type { SectionMeta } from "../sections";

interface DotNavProps {
  sections: SectionMeta[];
  activeSection: string;
}

export default function DotNav({ sections, activeSection }: DotNavProps) {
  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeSection),
  );
  const progressPercent = sections.length > 1 ? (activeIndex / (sections.length - 1)) * 100 : 0;

  return (
    <nav className="v23-dot-nav" aria-label="Section navigation">
      <div className="v23-dot-line" aria-hidden="true">
        <div className="v23-dot-line-active" style={{ height: `${progressPercent}%` }} />
      </div>
      <ul className="v23-dot-list">
        {sections.map((section) => {
          const isActive = section.id === activeSection;

          return (
            <li key={section.id} className="v23-dot-item">
              <button
                type="button"
                className={`v23-dot ${isActive ? "v23-dot--active" : ""}`}
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? "true" : "false"}
              />
              <span className="v23-dot-label">{section.label}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

