const features = [
  {
    title: "Fully Customizable",
    description: "Configure thumb color, hover color, track colors, and variants via props.",
    icon: "?",
  },
  {
    title: "Desktop-Only Smart Show",
    description: "Automatically hides on mobile and when content fits the viewport.",
    icon: "?",
  },
  {
    title: "Draggable Thumb",
    description: "Click and drag the thumb to scroll with precision. Minimum 40px hit area.",
    icon: "|",
  },
  {
    title: "Auto-Responsive",
    description: "Uses ResizeObserver and MutationObserver to adapt to content changes.",
    icon: "?",
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-12 md:px-10">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-emerald-400/25 bg-[#101a16]/85 p-5 shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
          >
            <div className="text-lg font-semibold text-emerald-300">{feature.icon}</div>
            <h3 className="mt-3 text-lg font-semibold text-emerald-50">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-emerald-100/75">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
