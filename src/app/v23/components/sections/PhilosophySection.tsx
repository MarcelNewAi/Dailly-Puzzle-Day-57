interface PhilosophySectionProps {
  isVisible: boolean;
  isActive: boolean;
}

const beliefs = [
  {
    label: "On Material",
    statement: "We use what is already there before we introduce anything new.",
  },
  {
    label: "On Scale",
    statement: "Every building must be understood at the scale of the hand as well as the sky.",
  },
  {
    label: "On Time",
    statement: "A good building improves with age. We design for fifty years, not five.",
  },
];

export default function PhilosophySection({ isVisible, isActive }: PhilosophySectionProps) {
  const revealClass = isVisible ? "v23-reveal v23-revealed" : "v23-reveal";

  return (
    <section
      id="philosophy"
      data-section="philosophy"
      data-active={isActive ? "true" : "false"}
      className={`v23-section ${isActive ? "v23-section-active" : ""}`}
    >
      <div className="v23-section-inner v23-philosophy-wrap v23-stagger">
        <p className={`v23-section-label v23-child ${revealClass}`}>04 / Philosophy</p>

        <blockquote className={`v23-philosophy-quote v23-child ${revealClass}`}>
          &quot;We do not believe in the architectural object. We believe in the architectural
          relationship - between building and ground, between interior and exterior, between the
          permanent and the transient.&quot;
        </blockquote>

        <span className={`v23-philosophy-rule v23-child ${revealClass}`} aria-hidden="true" />

        <div className="v23-belief-columns">
          {beliefs.map((belief) => (
            <article key={belief.label} className={`v23-belief-item v23-child ${revealClass}`}>
              <p className="v23-belief-label">{belief.label}</p>
              <p className="v23-belief-text">{belief.statement}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

