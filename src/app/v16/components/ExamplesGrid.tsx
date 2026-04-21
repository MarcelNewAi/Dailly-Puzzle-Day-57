import ComparisonSlider from "./ComparisonSlider";

const examples = [
  {
    title: "Design Revamp",
    description: "Compare outdated interfaces to polished redesigns with immediate visual clarity.",
    beforeImage: "https://picsum.photos/seed/old1/800/600?grayscale&blur=2",
    afterImage: "https://picsum.photos/seed/new1/800/600",
    beforeLabel: "OLD",
    afterLabel: "NEW",
    aspectRatio: "4/3",
  },
  {
    title: "Photo Retouching",
    description: "Show raw captures beside the final edit to highlight precision adjustments.",
    beforeImage: "https://picsum.photos/seed/raw1/800/800?grayscale",
    afterImage: "https://picsum.photos/seed/edited1/800/800",
    beforeLabel: "RAW",
    afterLabel: "EDITED",
    aspectRatio: "1/1",
  },
  {
    title: "Renovation",
    description: "Demonstrate room and property transformations from initial to completed state.",
    beforeImage: "https://picsum.photos/seed/reno1/900/600?grayscale&blur=1",
    afterImage: "https://picsum.photos/seed/reno2/900/600",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER",
    aspectRatio: "3/2",
  },
];

export default function ExamplesGrid() {
  return (
    <section className="v16-section v16-examples">
      <div className="v16-section-heading">
        <h2>Real-World Examples</h2>
        <p>Common use cases for before-and-after comparisons</p>
      </div>

      <div className="v16-examples-grid">
        {examples.map((example) => (
          <article key={example.title} className="v16-example-card">
            <ComparisonSlider
              beforeImage={example.beforeImage}
              afterImage={example.afterImage}
              beforeLabel={example.beforeLabel}
              afterLabel={example.afterLabel}
              aspectRatio={example.aspectRatio}
            />
            <div className="v16-example-content">
              <h3>{example.title}</h3>
              <p>{example.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
