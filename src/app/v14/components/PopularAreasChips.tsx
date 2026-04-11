interface PopularAreasChipsProps {
  areas: string[];
  onSelect: (city: string) => void;
}

export default function PopularAreasChips({ areas, onSelect }: PopularAreasChipsProps) {
  return (
    <section className="v14-popular" aria-label="Popular areas">
      <p className="v14-popular-label">POPULAR AREAS</p>
      <div className="v14-popular-row" role="list">
        {areas.map((city) => (
          <button key={city} type="button" className="v14-chip" role="listitem" onClick={() => onSelect(city)}>
            <span className="v14-chip-dot" aria-hidden="true" />
            <span>{city}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
