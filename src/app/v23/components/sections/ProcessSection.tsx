interface ProcessSectionProps {
  isVisible: boolean;
  isActive: boolean;
}

const phases = [
  {
    number: "1",
    title: "Listen",
    description:
      "Every project begins with extended listening. We spend weeks understanding how you inhabit space before we draw a single line.",
  },
  {
    number: "2",
    title: "Research",
    description:
      "We study the site, its history, its light, its relationship to the surrounding fabric. Architecture without context is decoration.",
  },
  {
    number: "3",
    title: "Concept",
    description:
      "A single governing idea. Every decision in the project is tested against it. If it does not serve the idea, it does not stay.",
  },
  {
    number: "4",
    title: "Develop",
    description:
      "Detail is where architecture lives. We develop every element - material, junction, proportion - with the same rigor as the plan.",
  },
  {
    number: "5",
    title: "Deliver",
    description:
      "We remain on site through construction. The building you receive is the building we designed.",
  },
];

export default function ProcessSection({ isVisible, isActive }: ProcessSectionProps) {
  const revealClass = isVisible ? "v23-reveal v23-revealed" : "v23-reveal";

  return (
    <section
      id="process"
      data-section="process"
      data-active={isActive ? "true" : "false"}
      className={`v23-section ${isActive ? "v23-section-active" : ""}`}
    >
      <div className="v23-section-inner v23-stagger">
        <p className={`v23-section-label v23-child ${revealClass}`}>02 / Our Process</p>
        <h2 className={`v23-heading v23-child ${revealClass}`}>How we work.</h2>

        <div className="v23-process-list">
          {phases.map((phase) => (
            <article key={phase.number} className={`v23-process-item v23-child ${revealClass}`}>
              <p className="v23-process-number">{phase.number}</p>
              <div className="v23-process-content">
                <h3 className="v23-process-title">{phase.title}</h3>
                <p className="v23-process-description">{phase.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

