"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Projects Shipped", value: 120 },
  { label: "Global Clients", value: 34 },
  { label: "Years Crafting", value: 9 },
  { label: "Awards", value: 18 },
];

export default function Home() {
  const statsRef = useRef<HTMLElement | null>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const target = statsRef.current;
    if (!target) return;

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;

        const start = performance.now();
        const duration = 1400;

        const tick = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          setCounts(stats.map((s) => Math.floor(s.value * progress)));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="mx-auto grid max-w-6xl grid-cols-1 border-x border-white/30 px-6 pt-20 pb-16 md:grid-cols-12 md:px-10">
        <div className="border-b border-white/30 pb-12 md:col-span-8 md:border-r md:border-b-0 md:pb-0 md:pr-8">
          <p className="mb-8 font-mono text-xs tracking-[0.24em] text-[#c6f135]">MINIMAL BRUTALIST</p>
          <h1 className="font-mono text-5xl leading-[0.92] font-black tracking-tight text-white uppercase md:text-7xl">
            WE BUILD DIGITAL EXPERIENCES
          </h1>
          <p className="mt-8 max-w-lg text-base text-white/75">
            Digital products shaped by precise systems, unapologetic type, and brutal clarity.
          </p>
        </div>
        <div className="border-b border-white/30 pt-10 md:col-span-4 md:border-b-0 md:pl-8 md:pt-0">
          <p className="mb-4 font-mono text-xs uppercase text-white/70">Status</p>
          <p className="text-3xl font-bold text-[#c6f135]">Taking Q2 engagements</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-x border-b border-white/30 px-6 py-14 md:px-10">
        <h2 className="mb-8 font-mono text-3xl font-bold uppercase">Featured Work</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Atlas Commerce", "Headless storefront, 3x conversion lift"],
            ["Pulse Health", "Patient portal redesign in 9 weeks"],
            ["Northline AI", "Brand and dashboard for Series A launch"],
          ].map(([title, text]) => (
            <article
              key={title}
              className="border-4 border-white bg-transparent p-6 transition duration-300 hover:scale-[1.03] hover:bg-white hover:text-black"
            >
              <h3 className="mb-4 font-mono text-xl font-bold uppercase">{title}</h3>
              <p className="text-sm leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section ref={statsRef} className="mx-auto max-w-6xl border-x border-b border-white/30 px-6 py-12 md:px-10">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="border border-white/40 p-5">
              <div className="font-mono text-4xl font-bold text-[#c6f135]">{counts[idx]}</div>
              <div className="mt-2 text-xs tracking-[0.12em] text-white/70 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl border-x border-b border-white/30 px-6 py-8 font-mono text-xs tracking-[0.14em] text-white/70 uppercase md:px-10">
        Raw systems. Sharp choices. Zero fluff. 2026.
      </footer>
    </main>
  );
}
