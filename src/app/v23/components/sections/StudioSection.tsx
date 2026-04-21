interface StudioSectionProps {
  isVisible: boolean;
  isActive: boolean;
}

const stats = [
  { value: "47", label: "Completed projects" },
  { value: "15", label: "Years in practice" },
  { value: "12", label: "Studio members" },
  { value: "6", label: "Countries" },
];

export default function StudioSection({ isVisible, isActive }: StudioSectionProps) {
  const revealClass = isVisible ? "v23-reveal v23-revealed" : "v23-reveal";

  return (
    <section
      id="studio"
      data-section="studio"
      data-active={isActive ? "true" : "false"}
      className={`v23-section ${isActive ? "v23-section-active" : ""}`}
    >
      <div className="v23-section-inner v23-studio-grid">
        <div className="v23-studio-copy v23-stagger">
          <p className={`v23-section-label v23-child ${revealClass}`}>01 / The Studio</p>
          <h2 className={`v23-heading v23-child ${revealClass}`}>Fifteen years of deliberate work.</h2>
          <div className={`v23-studio-body v23-child ${revealClass}`}>
            <p>
              Varro Studio was founded in 2009 by architects Maja Kos and Tomas Varro. What
              began as a two-person practice in a converted Ljubljana warehouse has grown into a
              studio of twelve, working across residential, cultural, and hospitality typologies.
            </p>
            <p>
              We are not a large firm. We choose our projects carefully, take on fewer commissions
              than we could, and give each one the attention it deserves. Every project is led by a
              founding partner from first sketch to final handover.
            </p>
            <p>
              Our work has been recognised by the Mies van der Rohe Award shortlist, the Slovenian
              Architecture Prize, and featured in Domus, Wallpaper*, and Dezeen.
            </p>
          </div>
        </div>

        <div className="v23-studio-stats v23-stagger">
          {stats.map((stat) => (
            <article key={stat.label} className={`v23-stat-block v23-child ${revealClass}`}>
              <p className="v23-stat-value">{stat.value}</p>
              <p className="v23-stat-label">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

