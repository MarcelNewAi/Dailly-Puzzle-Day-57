const stats = [
  { value: "2,847", label: "Design iterations generated" },
  { value: "99.9%", label: "Token consistency score" },
  { value: "+156%", label: "Prototype approval lift" },
];

export default function PreviewStats() {
  return (
    <section className="v17-preview-section">
      <h2 className="v17-section-title">STATS</h2>
      <div className="v17-stats-grid">
        {stats.map((item) => (
          <div key={item.value}>
            <p className="v17-stat-value">{item.value}</p>
            <p className="v17-stat-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
