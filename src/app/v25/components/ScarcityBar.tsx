"use client";

interface ScarcityBarProps {
  spotsRemaining: number;
  totalSpots: number;
}

export default function ScarcityBar({ spotsRemaining, totalSpots }: ScarcityBarProps) {
  const isCritical = spotsRemaining <= 2;
  const hasSoldOut = spotsRemaining === 0;
  const spotText = hasSoldOut ? "ALL SPOTS CLAIMED" : `${spotsRemaining} OF ${totalSpots} SPOTS REMAINING`;

  return (
    <section className="v25-scarcity-section" aria-label="Availability and scarcity status">
      <p className="v25-scarcity-label">AVAILABILITY</p>
      <p className="v25-scarcity-meta">LIVE CLAIM FEED</p>

      <div className="v25-scarcity-row">
        <div className="v25-spot-blocks" aria-hidden="true">
          {Array.from({ length: totalSpots }, (_, index) => {
            const isFilled = index < spotsRemaining;

            return (
              <span
                key={`spot-${index}`}
                className={`v25-spot-block ${isFilled ? "v25-spot-block--filled" : "v25-spot-block--empty"}`}
              />
            );
          })}
        </div>

        <p className={`v25-spot-text ${isCritical ? "v25-spot-text--critical" : ""}`.trim()}>{spotText}</p>
      </div>
    </section>
  );
}
