const contentBlocks = [
  {
    title: "Scrollable Story Block",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Metrics Snapshot",
    text: "Suspendisse potenti. Integer elementum, tortor vitae tempor vestibulum, nisl urna finibus massa, sit amet ultricies mi lectus a ipsum.",
  },
  {
    title: "Design Notes",
    text: "Aliquam et neque id justo posuere bibendum. Cras efficitur, lacus a feugiat vulputate, mi mauris mattis nibh, in posuere neque est quis augue.",
  },
  {
    title: "Interaction Notes",
    text: "Quisque pharetra lorem in erat ullamcorper, vel vulputate neque tincidunt. Aenean id eros tincidunt, tempus est at, ultricies neque.",
  },
  {
    title: "Performance Notes",
    text: "Vivamus efficitur dui vel augue facilisis, non vulputate nisi cursus. Integer in nisl id lorem tristique laoreet vitae ut sem.",
  },
  {
    title: "Accessibility Notes",
    text: "Praesent hendrerit sem in erat mattis, in luctus enim dictum. Nam eu mi eu velit scelerisque suscipit at eget est.",
  },
];

export default function LongContentDemo() {
  return (
    <section className="rounded-2xl border border-emerald-400/25 bg-[#101a16]/85 p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)]">
      <h2 className="text-2xl font-semibold text-emerald-50">Long Scrollable Content Demo</h2>
      <p className="mt-2 text-sm text-emerald-100/75">This section intentionally adds depth so the scrollbar remains active and easy to test.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {contentBlocks.map((block) => (
          <article key={block.title} className="rounded-xl border border-emerald-400/20 bg-[#0d1713] p-4">
            <h3 className="text-lg font-semibold text-emerald-100">{block.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-emerald-100/75">{block.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-emerald-400/15 bg-[#0b1411] p-5">
            <h4 className="text-base font-semibold text-emerald-100">Additional Content Section {index + 1}</h4>
            <p className="mt-2 text-sm leading-relaxed text-emerald-100/70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nisl nisl aliquet nisl, vitae aliquam nisl nisl sit amet nisl. Curabitur vulputate sem at magna lacinia, at tempor lorem dictum.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
