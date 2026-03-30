"use client";

import { useEffect, useState } from "react";

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 24, suffix: "/7", label: "Support Available" },
] as const;

export default function StatsSection() {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;

    const frame = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setCounts(stats.map((stat) => Math.floor(stat.value * progress)));
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, []);

  return (
    <section className="v7-site-section">
      <div className="v7-site-shell">
        <div className="v7-stats-grid">
          {stats.map((stat, index) => (
            <article key={stat.label} className="v7-stat-card">
              <p className="v7-stat-value">
                {counts[index]}
                {stat.suffix}
              </p>
              <p className="v7-stat-label">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}