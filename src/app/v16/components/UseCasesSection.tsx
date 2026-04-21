const useCases = [
  {
    title: "Web Design Portfolios",
    description: "Present redesigns side-by-side so clients instantly see the quality lift.",
    icon: (
      <path
        d="M3 5h18v14H3V5Zm0 4h18M8 3v4M16 3v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Photo Editors",
    description: "Show retouching impact with direct comparison of source and final image.",
    icon: (
      <path
        d="M4 7h4l2-2h4l2 2h4v10H4V7Zm6 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Construction/Renovation",
    description: "Document project transformations from demolition to finished delivery.",
    icon: (
      <path
        d="M3 19h18M5 19V9l7-5 7 5v10M9 19v-4h6v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Product Marketing",
    description: "Highlight feature and UI improvements in launch campaigns and case studies.",
    icon: (
      <path
        d="M4 12h6l2-4 2 8 2-4h4M4 6h16M4 18h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function UseCasesSection() {
  return (
    <section className="v16-section">
      <div className="v16-section-heading">
        <h2>Perfect For</h2>
      </div>
      <div className="v16-use-cases-grid">
        {useCases.map((item) => (
          <article key={item.title} className="v16-use-case-card">
            <span className="v16-use-case-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">{item.icon}</svg>
            </span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
