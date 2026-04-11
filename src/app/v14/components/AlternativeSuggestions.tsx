import type { ServiceArea } from "../data/serviceAreas";

interface AlternativeSuggestionsProps {
  areas: ServiceArea[];
  onSelect: (areaName: string) => void;
}

export default function AlternativeSuggestions({ areas, onSelect }: AlternativeSuggestionsProps) {
  return (
    <section className="v14-alt-wrap" aria-label="Nearest covered areas">
      <h3>Nearest Covered Areas</h3>
      <div className="v14-alt-grid">
        {areas.map((area) => (
          <button key={area.id} type="button" className="v14-alt-card" onClick={() => onSelect(area.name)}>
            <strong>{area.name}</strong>
            <span>{area.region}</span>
            <span className="v14-alt-pill">We serve here</span>
          </button>
        ))}
      </div>
    </section>
  );
}
