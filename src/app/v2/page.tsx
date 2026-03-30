"use client";

import { useEffect, useRef, useState } from "react";

export default function VersionTwoPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleReducedMotion = (event?: MediaQueryListEvent) => {
      const shouldReduce = event ? event.matches : mediaQuery.matches;
      const video = videoRef.current;
      if (!video || !shouldReduce) return;
      video.pause();
      setIsPaused(true);
    };

    handleReducedMotion();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleReducedMotion);
      return () => mediaQuery.removeEventListener("change", handleReducedMotion);
    }

    mediaQuery.addListener(handleReducedMotion);
    return () => mediaQuery.removeListener(handleReducedMotion);
  }, []);

  const handleTogglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {
        setIsPaused(true);
      });
      return;
    }

    video.pause();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#7c3aed] via-[#2563eb] to-[#0d9488] text-white">
      <div className="pointer-events-none absolute -top-16 -left-10 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl [animation:drift_7s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-80 w-80 rounded-full bg-cyan-300/35 blur-3xl [animation:drift_9s_ease-in-out_infinite] [animation-delay:0.6s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl [animation:drift_8s_ease-in-out_infinite] [animation-delay:1.2s]" />

      <section className="v2-hero">
        <video
          ref={videoRef}
          className="v2-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/globe.svg"
          onPlay={() => setIsPaused(false)}
          onPause={() => setIsPaused(true)}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
        <div className="v2-hero-overlay" />

        <div className="v2-hero-content mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl md:p-12">
            <p className="mb-5 text-sm font-semibold tracking-[0.18em] text-cyan-100 uppercase">Glassmorphism + Gradient</p>
            <h1 className="max-w-3xl text-5xl leading-[0.95] font-bold md:text-7xl">
              <span className="bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                The Future is Transparent
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/85">
              Crafted interfaces that float, breathe, and adapt to motion-first product ecosystems.
            </p>
            <a
              href="#services"
              className="mt-8 inline-flex rounded-2xl border border-white/30 bg-white/15 px-6 py-3 text-sm font-semibold transition hover:bg-white/25"
            >
              Explore Services
            </a>
          </div>
        </div>

        <button
          type="button"
          className="v2-hero-toggle"
          onClick={handleTogglePlayback}
          aria-label={isPaused ? "Play background video" : "Pause background video"}
        >
          <span aria-hidden="true">{isPaused ? "\u25B6" : "||"}</span>
        </button>
      </section>

      <section id="services" className="relative mx-auto mt-12 grid max-w-6xl gap-6 px-6 pb-12 md:grid-cols-3 md:px-10">
        {[
          ["?", "Interface Systems", "Adaptive UI kits with production-ready tokens and components."],
          ["?", "Brand Motion", "Narrative-driven interactions with cinematic timing and pace."],
          ["?", "Launch Strategy", "Landing funnels, testing plans, and experiment dashboards."],
        ].map(([icon, title, copy]) => (
          <article
            key={title}
            className="rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"
          >
            <div className="text-3xl">{icon}</div>
            <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}