export default function ShowcaseHeader() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-12 md:px-10">
      <span className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-emerald-300">
        V13 - CUSTOM SCROLLBAR
      </span>
      <h1 className="mt-5 text-4xl font-bold tracking-tight text-emerald-100 drop-shadow-[0_0_24px_rgba(16,185,129,0.45)] md:text-6xl">
        Scroll In Style
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-emerald-100/80 md:text-lg">
        A reusable, customizable scrollbar component with draggable thumb, auto-hide, and dynamic theming.
      </p>
      <p className="mt-4 text-sm font-medium text-emerald-300/90">Scroll this page to see it in action.</p>
    </section>
  );
}
