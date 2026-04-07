"use client";

type CardData = {
  title: string;
  description: string;
  icon: "star" | "heart" | "bookmark";
};

const cards: CardData[] = [
  { title: "Feature Card", description: "Rounded corners adapt to your settings", icon: "star" },
  { title: "Content Card", description: "Colors change with your theme", icon: "heart" },
  { title: "Info Card", description: "Spacing adjusts dynamically", icon: "bookmark" },
];

function CardIcon({ icon }: { icon: CardData["icon"] }) {
  if (icon === "heart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21 3.5 12.7a5.6 5.6 0 0 1 0-8 5.8 5.8 0 0 1 8.1 0l.4.4.4-.4a5.8 5.8 0 0 1 8.1 8L12 21Z" />
      </svg>
    );
  }

  if (icon === "bookmark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-3-7 3V4a1 1 0 0 1 1-1Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.2 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
    </svg>
  );
}

export default function PreviewCards() {
  return (
    <section className="v8-preview-section">
      <h3 className="v8-preview-title">Cards &amp; Panels</h3>
      <div className="v8-card-grid">
        {cards.map((card) => (
          <article key={card.title} className="v8-preview-card">
            <span className="v8-preview-card-icon">
              <CardIcon icon={card.icon} />
            </span>
            <h4 className="v8-preview-card-title">{card.title}</h4>
            <p className="v8-preview-card-description">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

