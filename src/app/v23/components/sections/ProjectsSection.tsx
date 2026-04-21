interface ProjectsSectionProps {
  isVisible: boolean;
  isActive: boolean;
}

const projects = [
  {
    name: "Casa Mira",
    type: "Residential",
    location: "Bled, Slovenia",
    year: "2023",
    description:
      "A lakeside house that dissolves its boundary with the landscape through a continuous stone plinth and frameless glass.",
  },
  {
    name: "Atelier Nove",
    type: "Cultural",
    location: "Prague, Czech Republic",
    year: "2022",
    description:
      "A working artists' residency occupying a repurposed 1930s printing hall. Raw concrete and original skylights preserved throughout.",
  },
  {
    name: "Hotel Gorje",
    type: "Hospitality",
    location: "Kranjska Gora, Slovenia",
    year: "2023",
    description:
      "Twenty-two rooms built around a central courtyard. Local larch, hand-laid stone, and a bath house informed by Scandinavian precedent.",
  },
  {
    name: "Pavilion Riva",
    type: "Cultural",
    location: "Split, Croatia",
    year: "2024",
    description:
      "A temporary pavilion for the Split Architecture Festival. Constructed from reclaimed timber, disassembled and redistributed after the event.",
  },
];

export default function ProjectsSection({ isVisible, isActive }: ProjectsSectionProps) {
  const revealClass = isVisible ? "v23-reveal v23-revealed" : "v23-reveal";

  return (
    <section
      id="projects"
      data-section="projects"
      data-active={isActive ? "true" : "false"}
      className={`v23-section ${isActive ? "v23-section-active" : ""}`}
    >
      <div className="v23-section-inner v23-stagger">
        <p className={`v23-section-label v23-child ${revealClass}`}>03 / Selected Work</p>
        <h2 className={`v23-heading v23-child ${revealClass}`}>Recent projects.</h2>

        <div className="v23-project-grid">
          {projects.map((project) => (
            <article key={project.name} className={`v23-project-card v23-child ${revealClass}`}>
              <span className="v23-project-tag">{project.type}</span>
              <h3 className="v23-project-name">{project.name}</h3>
              <p className="v23-project-meta">
                {project.location} - {project.year}
              </p>
              <p className="v23-project-description">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

